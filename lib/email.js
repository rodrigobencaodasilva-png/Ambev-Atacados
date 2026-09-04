// Envio de emails via Resend — Ambev Brasil
// 5 emails do fluxo: Cadastro → Pedido → Pagamento (20 min) → Baixa → NF

const { Resend } = require("resend");
const T = require("./templates");

const SENDER_NAME = process.env.SENDER_NAME || "Ambev Brasil";
// onboarding@resend.dev funciona sem verificar domínio (só entrega para o email da conta Resend).
// Para enviar para qualquer cliente, verifique um domínio no Resend e configure SENDER_EMAIL.
const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";

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
  let html = template;
  for (const [k, v] of Object.entries(vars)) {
    html = html.split(`{{${k}}}`).join(String(v ?? ""));
  }
  return html;
}

async function deliver({ to, subject, html, type }) {
  const resend = getResend();
  const { data, error } = await resend.emails.send({
    from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
    to,
    subject,
    html,
  });
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
    subject: "📋 Seu Cadastro Está Sendo Analisado - Ambev Brasil",
    html: fill(T.AWAITING_REGISTRATION_TEMPLATE, { customerName, customerEmail, referenceCode }),
  });
}

/** 2. Pedido Recebido */
async function sendOrderReceivedEmail(customerEmail, customerName, orderNumber, orderDate, subtotal, shippingCost, total) {
  return deliver({
    type: "order",
    to: customerEmail,
    subject: `✅ Seu Pedido foi Recebido! #${orderNumber}`,
    html: fill(T.ORDER_RECEIVED_TEMPLATE, { customerName, customerEmail, orderNumber, orderDate, subtotal, shippingCost, total }),
  });
}

/** 3. Aguardando Pagamento — URGENTE, prazo de 20 minutos */
async function sendAwaitingPaymentEmail(customerEmail, customerName, orderNumber, totalAmount, dueDate, paymentMethod) {
  return deliver({
    type: "payment",
    to: customerEmail,
    subject: "⚠️ URGENTE: Confirme seu Pagamento em 20 Minutos - Ambev Brasil",
    html: fill(T.AWAITING_PAYMENT_TEMPLATE, { customerName, orderNumber, totalAmount, dueDate, paymentMethod }),
  });
}

/** 4. Baixa em Sistema */
async function sendPaymentProcessingEmail(customerEmail, customerName, orderNumber, paidAmount, paymentMethod, paymentDate, emissionTime, estimatedTime) {
  return deliver({
    type: "processing",
    to: customerEmail,
    subject: "⚙️ Seu Pagamento Está Sendo Processado - Ambev Brasil",
    html: fill(T.PAYMENT_PROCESSING_TEMPLATE, { customerName, orderNumber, paidAmount, paymentMethod, paymentDate, emissionTime, estimatedTime }),
  });
}

/** 5. Emitindo NF */
async function sendEmittingInvoiceEmail(customerEmail, customerName, orderNumber, paidAmount, estimatedTime) {
  return deliver({
    type: "invoice",
    to: customerEmail,
    subject: "📄 Sua Nota Fiscal Está Sendo Emitida! - Ambev Brasil",
    html: fill(T.EMITTING_INVOICE_TEMPLATE, { customerName, orderNumber, paidAmount, estimatedTime }),
  });
}

module.exports = {
  SENDER_EMAIL,
  SENDER_NAME,
  sendAwaitingRegistrationEmail,
  sendOrderReceivedEmail,
  sendAwaitingPaymentEmail,
  sendPaymentProcessingEmail,
  sendEmittingInvoiceEmail,
};
