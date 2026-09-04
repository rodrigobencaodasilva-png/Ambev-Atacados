// API — Gestor de Clientes Ambev Brasil
// Roda como Serverless Function na Vercel (api/index.js) e também localmente (server.js).

const express = require("express");
const cors = require("cors");
const path = require("path");
const T = require("../lib/templates");
const mail = require("../lib/email");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const DEADLINE_MINUTES = Number(process.env.PAYMENT_DEADLINE_MINUTES || 20);

function fmtDate(d = new Date()) {
  return d.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
}
function fmtDateTime(d = new Date()) {
  return d.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
}
function fmtTime(d = new Date()) {
  return d.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit" });
}

function fail(res, error) {
  console.error("❌", error && error.message, error && error.code);
  const status = error && error.status && error.status >= 400 && error.status < 600 ? error.status : 500;
  res.status(status).json({
    success: false,
    error: (error && error.message) || "Erro ao enviar email",
    code: (error && error.code) || "UNKNOWN",
  });
}

function requireFields(body, fields) {
  const missing = fields.filter((f) => body[f] === undefined || body[f] === null || String(body[f]).trim() === "");
  if (missing.length) {
    const err = new Error("Campos obrigatórios: " + missing.join(", "));
    err.status = 400;
    err.code = "VALIDATION";
    throw err;
  }
}

// ---------- Saúde / configuração ----------
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    apiKeyConfigured: Boolean(process.env.RESEND_API_KEY),
    senderEmail: mail.SENDER_EMAIL,
    senderName: mail.SENDER_NAME,
    usingTestSender: mail.SENDER_EMAIL.endsWith("@resend.dev"),
    replyTo: mail.REPLY_TO || null,
    companyName: mail.COMPANY_NAME,
    deadlineMinutes: DEADLINE_MINUTES,
    time: new Date().toISOString(),
  });
});

// ---------- Pré-visualização dos templates (usado pelo painel) ----------
const PREVIEW = {
  registration: () =>
    T.AWAITING_REGISTRATION_TEMPLATE,
  order: () => T.ORDER_RECEIVED_TEMPLATE,
  payment: () => T.AWAITING_PAYMENT_TEMPLATE,
  processing: () => T.PAYMENT_PROCESSING_TEMPLATE,
  invoice: () => T.EMITTING_INVOICE_TEMPLATE,
};

app.get("/api/emails/preview/:type", (req, res) => {
  const get = PREVIEW[req.params.type];
  if (!get) return res.status(404).send("Template não encontrado");
  const q = req.query;
  const vars = {
    customerName: q.customerName || "Cliente Exemplo",
    customerEmail: q.customerEmail || "cliente@exemplo.com",
    referenceCode: q.referenceCode || "CLI-000001",
    orderNumber: q.orderNumber || "PED-000001",
    orderDate: q.orderDate || fmtDate(),
    subtotal: q.subtotal || "1.500,00",
    shippingCost: q.shippingCost || "50,00",
    total: q.total || "1.550,00",
    totalAmount: q.totalAmount || q.total || "1.550,00",
    dueDate: q.dueDate || fmtDateTime(new Date(Date.now() + DEADLINE_MINUTES * 60000)),
    paymentMethod: q.paymentMethod || "PIX",
    paidAmount: q.paidAmount || q.total || "1.550,00",
    paymentDate: q.paymentDate || fmtDateTime(),
    emissionTime: q.emissionTime || fmtTime(new Date(Date.now() + 30 * 60000)),
    estimatedTime: q.estimatedTime || "2-3 horas",
  };
  res.type("html").send(mail.fill(get(), vars));
});

// ---------- 1. Cadastro ----------
app.post("/api/emails/registration", async (req, res) => {
  try {
    requireFields(req.body, ["email", "name"]);
    const { email, name, referenceCode } = req.body;
    const sent = await mail.sendAwaitingRegistrationEmail(email, name, referenceCode || "CLI-" + Date.now());
    res.json({ success: true, email: sent });
  } catch (e) { fail(res, e); }
});

// ---------- 2. Pedido recebido ----------
app.post("/api/emails/order-received", async (req, res) => {
  try {
    requireFields(req.body, ["email", "name", "orderNumber", "total"]);
    const { email, name, orderNumber, orderDate, subtotal, shippingCost, total } = req.body;
    const sent = await mail.sendOrderReceivedEmail(
      email, name, orderNumber, orderDate || fmtDate(), subtotal || total, shippingCost || "0,00", total
    );
    res.json({ success: true, email: sent });
  } catch (e) { fail(res, e); }
});

// ---------- 3. Aguardando pagamento (20 min) ----------
app.post("/api/emails/awaiting-payment", async (req, res) => {
  try {
    requireFields(req.body, ["email", "name", "orderNumber", "totalAmount"]);
    const { email, name, orderNumber, totalAmount, dueDate, paymentMethod } = req.body;
    const due = dueDate || fmtDateTime(new Date(Date.now() + DEADLINE_MINUTES * 60000));
    const sent = await mail.sendAwaitingPaymentEmail(email, name, orderNumber, totalAmount, due, paymentMethod || "PIX");
    res.json({ success: true, email: sent, dueDate: due });
  } catch (e) { fail(res, e); }
});

// ---------- 4. Baixa em sistema ----------
app.post("/api/emails/payment-processing", async (req, res) => {
  try {
    requireFields(req.body, ["email", "name", "orderNumber", "paidAmount"]);
    const { email, name, orderNumber, paidAmount, paymentMethod, paymentDate, emissionTime, estimatedTime } = req.body;
    const sent = await mail.sendPaymentProcessingEmail(
      email, name, orderNumber, paidAmount,
      paymentMethod || "PIX",
      paymentDate || fmtDateTime(),
      emissionTime || fmtTime(new Date(Date.now() + 30 * 60000)),
      estimatedTime || "2-3 horas"
    );
    res.json({ success: true, email: sent });
  } catch (e) { fail(res, e); }
});

// ---------- 5. Emitindo NF ----------
app.post("/api/emails/emitting-invoice", async (req, res) => {
  try {
    requireFields(req.body, ["email", "name", "orderNumber", "paidAmount"]);
    const { email, name, orderNumber, paidAmount, estimatedTime } = req.body;
    const sent = await mail.sendEmittingInvoiceEmail(email, name, orderNumber, paidAmount, estimatedTime || "Até 30 minutos");
    res.json({ success: true, email: sent });
  } catch (e) { fail(res, e); }
});

// Painel (quando rodando localmente; na Vercel a pasta public é servida automaticamente)
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", (req, res) => res.status(404).json({ success: false, error: "Rota não encontrada" }));

module.exports = app;
