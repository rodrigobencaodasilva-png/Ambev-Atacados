// Envio de emails via Resend — h Atacados
// 5 emails do fluxo: Cadastro → Pedido → Pagamento (20 min) → Baixa → NF
//
// Entregabilidade (para não cair em spam):
//  - remetente no domínio verificado (SENDER_EMAIL), com DKIM/SPF/DMARC
//  - assuntos sóbrios, versão em texto puro, reply-to real
//  - logotipo hospedado no próprio site (BASE_URL/brand/logo-light.png)
//  - botões levam ao WhatsApp (WHATSAPP_NUMBER) com mensagem pronta

const { Resend } = require("resend");
const T = require("./templates");

const SENDER_NAME = process.env.SENDER_NAME || "Ambev S.A";
// Sem domínio verificado no Resend, onboarding@resend.dev só entrega para o email da própria conta.
const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";
const REPLY_TO = process.env.REPLY_TO || "";
const COMPANY_NAME = process.env.COMPANY_NAME || SENDER_NAME;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || REPLY_TO || SENDER_EMAIL;
const BASE_URL = (process.env.BASE_URL || "https://ambev-atacados.vercel.app").replace(/\/$/, "");
const LOGO_URL = process.env.LOGO_URL || BASE_URL + "/brand/logo-light.png";
const DEADLINE_MINUTES = Number(process.env.PAYMENT_DEADLINE_MINUTES) > 0 ? Number(process.env.PAYMENT_DEADLINE_MINUTES) : 20;

// WhatsApp: só dígitos, com DDI (ex.: 554598464568)
const WHATSAPP_NUMBER = String(process.env.WHATSAPP_NUMBER || "").replace(/\D/g, "");

function whatsappDisplay() {
  if (!WHATSAPP_NUMBER) return "";
  const n = WHATSAPP_NUMBER.startsWith("55") ? WHATSAPP_NUMBER.slice(2) : WHATSAPP_NUMBER;
  const ddd = n.slice(0, 2), rest = n.slice(2);
  const local = rest.length === 9 ? rest.slice(0, 5) + "-" + rest.slice(5) : rest.length === 8 ? rest.slice(0, 4) + "-" + rest.slice(4) : rest;
  return `(${ddd}) ${local}`;
}

function whatsappUrl(message) {
  if (!WHATSAPP_NUMBER) return "mailto:" + CONTACT_EMAIL;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    const err = new Error("RESEND_API_KEY não configurada nas variáveis de ambiente.");
    err.code = "NO_API_KEY";
    throw err;
  }
  return new Resend(key);
}

function fill(template, vars) {
  const all = {
    year: String(new Date().getFullYear()),
    companyName: COMPANY_NAME,
    contactEmail: CONTACT_EMAIL,
    logoUrl: LOGO_URL,
    deadlineMinutes: String(DEADLINE_MINUTES),
    whatsappDisplay: whatsappDisplay() || CONTACT_EMAIL,
    whatsappUrl: whatsappUrl(`Olá! Sou ${vars.customerName || "cliente"} e gostaria de falar sobre meu pedido.`),
    itemsBlock: "",
    deliveryBlock: "",
    shippingLabel: vars.shippingCost && !/^0([.,]00?)?$/.test(String(vars.shippingCost).trim()) ? "R$ " + vars.shippingCost : "Grátis",
    ...vars,
  };
  let html = template;
  for (const [k, v] of Object.entries(all)) {
    html = html.split(`{{${k}}}`).join(String(v ?? ""));
  }
  return html;
}

// Versão em texto puro a partir do HTML
function toText(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<div style="display:none[^>]*>[\s\S]*?<\/div>/i, "")
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (m, href, txt) => `${txt.replace(/<[^>]+>/g, "")} (${href})`)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h[1-6]|li|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
}

async function deliver({ to, subject, html, type }) {
  const resend = getResend();
  const payload = {
    from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
    to,
    subject,
    html,
    text: toText(html),
    headers: { "X-Entity-Ref-ID": `${type}-${Date.now()}` },
  };
  if (REPLY_TO) payload.replyTo = REPLY_TO;

  const { data, error } = await resend.emails.send(payload);
  if (error) {
    const err = new Error(error.message || "Falha ao enviar email");
    err.code = error.name || "RESEND_ERROR";
    err.status = error.statusCode || 500;
    throw err;
  }
  return { id: data && data.id, type, to, subject, from: SENDER_EMAIL, sentAt: new Date().toISOString() };
}

/** 1. Aguardando Cadastro */
async function sendAwaitingRegistrationEmail(customerEmail, customerName, referenceCode) {
  return deliver({
    type: "registration",
    to: customerEmail,
    subject: `Recebemos seu cadastro - ${COMPANY_NAME} (${referenceCode})`,
    html: fill(T.AWAITING_REGISTRATION_TEMPLATE, {
      customerName, customerEmail, referenceCode,
      whatsappUrl: whatsappUrl(`Olá! Sou ${customerName}, fiz o cadastro ${referenceCode} e gostaria de saber sobre a aprovação.`),
    }),
  });
}

/** 2. Pedido Recebido */
async function sendOrderReceivedEmail(customerEmail, customerName, orderNumber, orderDate, subtotal, shippingCost, total, items, extra = {}) {
  return deliver({
    type: "order",
    to: customerEmail,
    subject: `Pedido ${orderNumber} recebido - ${COMPANY_NAME}`,
    html: fill(T.ORDER_RECEIVED_TEMPLATE, {
      customerName, customerEmail, orderNumber, orderDate, subtotal, shippingCost, total,
      itemsBlock: T.itemsBlock(items),
      deliveryBlock: T.deliveryBlock(extra),
      whatsappUrl: whatsappUrl(`Olá! Sou ${customerName}. Quero acompanhar meu pedido ${orderNumber} (R$ ${total}).`),
    }),
  });
}

/** 3. Aguardando Pagamento — prazo de 20 minutos */
async function sendAwaitingPaymentEmail(customerEmail, customerName, orderNumber, totalAmount, dueDate, paymentMethod) {
  return deliver({
    type: "payment",
    to: customerEmail,
    subject: `Pedido ${orderNumber}: pagamento pendente - ${COMPANY_NAME}`,
    html: fill(T.AWAITING_PAYMENT_TEMPLATE, {
      customerName, orderNumber, totalAmount, dueDate, paymentMethod,
      whatsappUrl: whatsappUrl(`Olá! Sou ${customerName}. Fiz o pagamento do pedido ${orderNumber} no valor de R$ ${totalAmount} via ${paymentMethod}. Segue o comprovante.`),
    }),
  });
}

/** 4. Baixa em Sistema */
async function sendPaymentProcessingEmail(customerEmail, customerName, orderNumber, paidAmount, paymentMethod, paymentDate, emissionTime, estimatedTime) {
  return deliver({
    type: "processing",
    to: customerEmail,
    subject: `Pedido ${orderNumber}: pagamento confirmado - ${COMPANY_NAME}`,
    html: fill(T.PAYMENT_PROCESSING_TEMPLATE, {
      customerName, orderNumber, paidAmount, paymentMethod, paymentDate, emissionTime, estimatedTime,
      whatsappUrl: whatsappUrl(`Olá! Sou ${customerName}. Quero acompanhar o processamento do pedido ${orderNumber}.`),
    }),
  });
}

/** 5. Emitindo NF */
async function sendEmittingInvoiceEmail(customerEmail, customerName, orderNumber, paidAmount, estimatedTime) {
  return deliver({
    type: "invoice",
    to: customerEmail,
    subject: `Pedido ${orderNumber}: nota fiscal em emissão - ${COMPANY_NAME}`,
    html: fill(T.EMITTING_INVOICE_TEMPLATE, {
      customerName, orderNumber, paidAmount, estimatedTime,
      whatsappUrl: whatsappUrl(`Olá! Sou ${customerName}. Tenho uma dúvida sobre a nota fiscal do pedido ${orderNumber}.`),
    }),
  });
}

module.exports = {
  SENDER_EMAIL,
  SENDER_NAME,
  REPLY_TO,
  COMPANY_NAME,
  BASE_URL,
  LOGO_URL,
  WHATSAPP_NUMBER,
  DEADLINE_MINUTES,
  whatsappDisplay,
  whatsappUrl,
  fill,
  sendAwaitingRegistrationEmail,
  sendOrderReceivedEmail,
  sendAwaitingPaymentEmail,
  sendPaymentProcessingEmail,
  sendEmittingInvoiceEmail,
};
