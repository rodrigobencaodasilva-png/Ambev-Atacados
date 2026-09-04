// Envio de emails via Resend — Ambev Brasil
// 5 emails do fluxo: Cadastro → Pedido → Pagamento (20 min) → Baixa → NF
//
// Entregabilidade (para não cair em spam):
//  - remetente no domínio verificado (SENDER_EMAIL), com DKIM/SPF/DMARC
//  - assuntos sóbrios, sem "URGENTE"/emojis
//  - versão em texto puro junto do HTML
//  - reply-to real (REPLY_TO) e rodapé com identificação da empresa

const { Resend } = require("resend");
const T = require("./templates");

const SENDER_NAME = process.env.SENDER_NAME || "Ambev Brasil";
// Sem domínio verificado no Resend, onboarding@resend.dev só entrega para o email da própria conta.
const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";
const REPLY_TO = process.env.REPLY_TO || "";
const COMPANY_NAME = process.env.COMPANY_NAME || SENDER_NAME;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || REPLY_TO || SENDER_EMAIL;

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
    ...vars,
  };
  let html = template;
  for (const [k, v] of Object.entries(all)) {
    html = html.split(`{{${k}}}`).join(String(v ?? ""));
  }
  return html;
}

// Versão em texto puro a partir do HTML (clientes de email e filtros gostam disso)
function toText(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h[1-6]|li|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .split("\n").map((l) => l.trim()).filter(Boolean).join("\n");
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
    html: fill(T.AWAITING_REGISTRATION_TEMPLATE, { customerName, customerEmail, referenceCode }),
  });
}

/** 2. Pedido Recebido */
async function sendOrderReceivedEmail(customerEmail, customerName, orderNumber, orderDate, subtotal, shippingCost, total) {
  return deliver({
    type: "order",
    to: customerEmail,
    subject: `Pedido ${orderNumber} recebido - ${COMPANY_NAME}`,
    html: fill(T.ORDER_RECEIVED_TEMPLATE, { customerName, customerEmail, orderNumber, orderDate, subtotal, shippingCost, total }),
  });
}

/** 3. Aguardando Pagamento — prazo de 20 minutos */
async function sendAwaitingPaymentEmail(customerEmail, customerName, orderNumber, totalAmount, dueDate, paymentMethod) {
  return deliver({
    type: "payment",
    to: customerEmail,
    subject: `Pedido ${orderNumber}: pagamento pendente - ${COMPANY_NAME}`,
    html: fill(T.AWAITING_PAYMENT_TEMPLATE, { customerName, orderNumber, totalAmount, dueDate, paymentMethod }),
  });
}

/** 4. Baixa em Sistema */
async function sendPaymentProcessingEmail(customerEmail, customerName, orderNumber, paidAmount, paymentMethod, paymentDate, emissionTime, estimatedTime) {
  return deliver({
    type: "processing",
    to: customerEmail,
    subject: `Pedido ${orderNumber}: pagamento confirmado - ${COMPANY_NAME}`,
    html: fill(T.PAYMENT_PROCESSING_TEMPLATE, { customerName, orderNumber, paidAmount, paymentMethod, paymentDate, emissionTime, estimatedTime }),
  });
}

/** 5. Emitindo NF */
async function sendEmittingInvoiceEmail(customerEmail, customerName, orderNumber, paidAmount, estimatedTime) {
  return deliver({
    type: "invoice",
    to: customerEmail,
    subject: `Pedido ${orderNumber}: nota fiscal em emissão - ${COMPANY_NAME}`,
    html: fill(T.EMITTING_INVOICE_TEMPLATE, { customerName, orderNumber, paidAmount, estimatedTime }),
  });
}

module.exports = {
  SENDER_EMAIL,
  SENDER_NAME,
  REPLY_TO,
  COMPANY_NAME,
  fill,
  sendAwaitingRegistrationEmail,
  sendOrderReceivedEmail,
  sendAwaitingPaymentEmail,
  sendPaymentProcessingEmail,
  sendEmittingInvoiceEmail,
};
