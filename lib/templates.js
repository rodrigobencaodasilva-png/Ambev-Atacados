// Templates de email — Ambev S.A
// Layout em tabelas (compatível com Gmail, Outlook, Apple Mail e celulares).
// Placeholders {{...}} são preenchidos em lib/email.js.
//
// Comuns a todos: {{logoUrl}} {{companyName}} {{contactEmail}} {{whatsappUrl}} {{whatsappDisplay}} {{year}} {{deadlineMinutes}}

const C = {
  green: "#0A3F36",
  green2: "#0F5C4F",
  gold: "#F5B700",
  goldDark: "#C9930A",
  ink: "#1f2937",
  muted: "#6b7280",
  line: "#e5e7eb",
  bg: "#f2f4f5",
};

function row(label, value, opts = {}) {
  const strong = opts.strong ? "font-weight:800;font-size:18px;color:" + C.green + ";" : "font-weight:700;color:" + C.ink + ";";
  return `
      <tr>
        <td valign="top" style="padding:10px 12px 10px 0;border-bottom:1px solid ${C.line};font-size:14px;color:${C.muted};white-space:nowrap;">${label}</td>
        <td align="right" valign="top" style="padding:10px 0;border-bottom:1px solid ${C.line};font-size:14px;line-height:1.5;${strong}">${value}</td>
      </tr>`;
}

function button(label, url, color) {
  return `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:28px auto 8px;">
        <tr>
          <td align="center" bgcolor="${color}" style="border-radius:10px;">
            <a href="${url}" target="_blank" style="display:inline-block;padding:16px 36px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px;">${label}</a>
          </td>
        </tr>
      </table>`;
}

function shell({ accent, badge, title, intro, content, cta, secondary, preheader }) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};">
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:${C.bg};">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.bg};">
  <tr>
    <td align="center" style="padding:28px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(10,63,54,.08);">

        <!-- Logo -->
        <tr>
          <td align="center" style="padding:30px 24px 22px;background:#ffffff;">
            <img src="{{logoUrl}}" width="230" alt="{{companyName}}" style="display:block;width:230px;max-width:70%;height:auto;border:0;">
          </td>
        </tr>

        <!-- Faixa de status -->
        <tr>
          <td style="height:6px;background:${accent};font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- Conteúdo -->
        <tr>
          <td style="padding:34px 40px 12px;font-family:Arial,Helvetica,sans-serif;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr><td style="background:${accent}1A;color:${accent};font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:6px 12px;border-radius:999px;">${badge}</td></tr>
            </table>
            <h1 style="margin:18px 0 10px;font-size:26px;line-height:1.25;color:${C.green};font-weight:800;">${title}</h1>
            <p style="margin:0 0 6px;font-size:16px;line-height:1.6;color:${C.ink};">Olá, <strong>{{customerName}}</strong>.</p>
            <p style="margin:0;font-size:16px;line-height:1.6;color:#374151;">${intro}</p>
          </td>
        </tr>

        <tr>
          <td style="padding:8px 40px 8px;font-family:Arial,Helvetica,sans-serif;">
            ${content}
          </td>
        </tr>

        <tr>
          <td align="center" style="padding:4px 40px 36px;font-family:Arial,Helvetica,sans-serif;">
            ${cta || ""}
            ${secondary ? `<p style="margin:14px 0 0;font-size:13px;color:${C.muted};">${secondary}</p>` : ""}
          </td>
        </tr>

        <!-- Rodapé -->
        <tr>
          <td style="background:${C.green};padding:26px 40px;font-family:Arial,Helvetica,sans-serif;text-align:center;">
            <div style="font-size:15px;font-weight:800;color:#ffffff;letter-spacing:.5px;">{{companyName}}</div>
            <div style="font-size:12px;color:#cfe3de;margin-top:8px;line-height:1.7;">
              WhatsApp: <a href="{{whatsappUrl}}" style="color:${C.gold};text-decoration:none;font-weight:700;">{{whatsappDisplay}}</a> &nbsp;·&nbsp; E-mail: <a href="mailto:{{contactEmail}}" style="color:${C.gold};text-decoration:none;">{{contactEmail}}</a><br>
              Este é um e-mail automático sobre o seu pedido. Se tiver dúvidas, é só responder esta mensagem.
            </div>
            <div style="font-size:11px;color:#8fb3aa;margin-top:14px;">© {{year}} {{companyName}}. Todos os direitos reservados.</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// 1. AGUARDANDO CADASTRO
// ---------------------------------------------------------------------------
const AWAITING_REGISTRATION_TEMPLATE = shell({
  accent: C.goldDark,
  badge: "Cadastro em análise",
  title: "Recebemos o seu cadastro",
  preheader: "Seu cadastro {{referenceCode}} foi recebido e está em análise.",
  intro: "Seu cadastro foi recebido com sucesso e já está em análise pela nossa equipe. Em breve você receberá a confirmação para começar a fazer pedidos.",
  content: `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafb;border-radius:12px;padding:6px 20px;margin-top:14px;">
      ${row("Código do cadastro", "{{referenceCode}}")}
      ${row("E-mail informado", "{{customerEmail}}")}
      ${row("Situação", '<span style="color:' + C.goldDark + ';">Em análise</span>')}
    </table>`,
  cta: button("Falar com a equipe no WhatsApp", "{{whatsappUrl}}", C.green2),
  secondary: "Se você não fez este cadastro, ignore este e-mail.",
});

// ---------------------------------------------------------------------------
// 2. PEDIDO RECEBIDO
// ---------------------------------------------------------------------------
const ORDER_RECEIVED_TEMPLATE = shell({
  accent: C.green2,
  badge: "Pedido recebido",
  title: "Seu pedido {{orderNumber}} foi recebido",
  preheader: "Pedido {{orderNumber}} no valor de R$ {{total}} recebido em {{orderDate}}.",
  intro: "Recebemos o seu pedido e ele já está registrado no nosso sistema. Confira abaixo o resumo e, em seguida, a instrução de pagamento.",
  content: `
    {{itemsBlock}}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafb;border-radius:12px;padding:6px 20px;margin-top:14px;">
      ${row("Número do pedido", "{{orderNumber}}")}
      ${row("Data", "{{orderDate}}")}
      ${row("Subtotal", "R$ {{subtotal}}")}
      ${row("Frete", "{{shippingLabel}}")}
      ${row("Total", "R$ {{total}}", { strong: true })}
    </table>
    {{deliveryBlock}}`,
  cta: button("Acompanhar pedido no WhatsApp", "{{whatsappUrl}}", C.green2),
});

// ---------------------------------------------------------------------------
// 3. AGUARDANDO PAGAMENTO — prazo de {{deadlineMinutes}} minutos
// ---------------------------------------------------------------------------
const AWAITING_PAYMENT_TEMPLATE = shell({
  accent: "#DC2626",
  badge: "Pagamento pendente",
  title: "Confirme o pagamento do pedido {{orderNumber}}",
  preheader: "Pedido {{orderNumber}}: R$ {{totalAmount}} via {{paymentMethod}}. Prazo de {{deadlineMinutes}} minutos.",
  intro: "Para emitir a nota fiscal e liberar o seu pedido, precisamos da confirmação do pagamento dentro do prazo abaixo. Assim que pagar, é só clicar no botão e nos avisar pelo WhatsApp.",
  content: `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">
      <tr>
        <td align="center" style="background:#FEF2F2;border:1px solid #FECACA;border-radius:12px;padding:18px 20px;">
          <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#991B1B;">Prazo para confirmar</div>
          <div style="font-size:40px;font-weight:800;color:#DC2626;line-height:1.1;margin:6px 0 4px;">{{deadlineMinutes}} minutos</div>
          <div style="font-size:13px;color:#7F1D1D;">até <strong>{{dueDate}}</strong>. Após o prazo, o pedido é cancelado automaticamente.</div>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafb;border-radius:12px;padding:6px 20px;margin-top:14px;">
      ${row("Número do pedido", "{{orderNumber}}")}
      ${row("Forma de pagamento", "{{paymentMethod}}")}
      ${row("Vencimento", "{{dueDate}}")}
      ${row("Valor a pagar", "R$ {{totalAmount}}", { strong: true })}
    </table>`,
  cta: button("Confirmar pagamento no WhatsApp", "{{whatsappUrl}}", "#DC2626"),
  secondary: 'Já pagou? <a href="{{whatsappUrl}}" style="color:' + C.green2 + ';font-weight:700;text-decoration:none;">Clique aqui para confirmar</a> e envie o comprovante.',
});

// ---------------------------------------------------------------------------
// 4. BAIXA EM SISTEMA (pagamento confirmado)
// ---------------------------------------------------------------------------
const PAYMENT_PROCESSING_TEMPLATE = shell({
  accent: "#0366D6",
  badge: "Pagamento confirmado",
  title: "Pagamento do pedido {{orderNumber}} confirmado",
  preheader: "Recebemos R$ {{paidAmount}} do pedido {{orderNumber}}. Estamos processando.",
  intro: "Recebemos o seu pagamento. O pedido está em processamento e a nota fiscal já está sendo preparada. Você receberá um novo e-mail assim que a nota for emitida.",
  content: `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">
      <tr>
        <td style="padding:0 0 6px;font-size:12px;font-weight:700;color:${C.muted};text-transform:uppercase;letter-spacing:1px;">Andamento</td>
      </tr>
      <tr>
        <td>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="25%" style="height:8px;background:#16A34A;border-radius:6px 0 0 6px;font-size:0;">&nbsp;</td>
              <td width="25%" style="height:8px;background:#16A34A;font-size:0;">&nbsp;</td>
              <td width="25%" style="height:8px;background:#0366D6;font-size:0;">&nbsp;</td>
              <td width="25%" style="height:8px;background:${C.line};border-radius:0 6px 6px 0;font-size:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="font-size:11px;color:#16A34A;padding-top:6px;font-weight:700;">Pedido</td>
              <td style="font-size:11px;color:#16A34A;padding-top:6px;font-weight:700;">Pagamento</td>
              <td style="font-size:11px;color:#0366D6;padding-top:6px;font-weight:700;">Processando</td>
              <td style="font-size:11px;color:${C.muted};padding-top:6px;">Nota fiscal</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafb;border-radius:12px;padding:6px 20px;margin-top:18px;">
      ${row("Número do pedido", "{{orderNumber}}")}
      ${row("Forma de pagamento", "{{paymentMethod}}")}
      ${row("Data do pagamento", "{{paymentDate}}")}
      ${row("Previsão da nota fiscal", "{{estimatedTime}}")}
      ${row("Valor pago", "R$ {{paidAmount}}", { strong: true })}
    </table>`,
  cta: button("Acompanhar no WhatsApp", "{{whatsappUrl}}", "#0366D6"),
});

// ---------------------------------------------------------------------------
// 5. EMITINDO NOTA FISCAL
// ---------------------------------------------------------------------------
const EMITTING_INVOICE_TEMPLATE = shell({
  accent: "#16A34A",
  badge: "Nota fiscal",
  title: "Nota fiscal do pedido {{orderNumber}} em emissão",
  preheader: "A nota fiscal do pedido {{orderNumber}} está sendo emitida. Previsão: {{estimatedTime}}.",
  intro: "Última etapa: a nota fiscal do seu pedido está sendo emitida. Assim que estiver pronta, enviamos o documento e as instruções de retirada ou entrega.",
  content: `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafb;border-radius:12px;padding:6px 20px;margin-top:14px;">
      ${row("Pedido recebido", '<span style="color:#16A34A;">✓ concluído</span>')}
      ${row("Pagamento confirmado", '<span style="color:#16A34A;">✓ concluído</span>')}
      ${row("Baixa em sistema", '<span style="color:#16A34A;">✓ concluído</span>')}
      ${row("Emissão da nota fiscal", '<span style="color:#0366D6;">em andamento · {{estimatedTime}}</span>')}
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafb;border-radius:12px;padding:6px 20px;margin-top:12px;">
      ${row("Número do pedido", "{{orderNumber}}")}
      ${row("Valor pago", "R$ {{paidAmount}}", { strong: true })}
    </table>`,
  cta: button("Falar com a equipe no WhatsApp", "{{whatsappUrl}}", "#16A34A"),
});

// Bloco de itens do pedido (montado em lib/email.js quando há itens)
function itemsBlock(items) {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const lines = String(items || "").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  if (!lines.length) return "";
  const rows = lines.map((l) => {
    const m = l.match(/^(.*?)\s*(?:—|-)\s*(R\$\s*[\d.,]+)\s*$/);
    const name = m ? m[1] : l, price = m ? m[2] : "";
    return `<tr>
      <td style="padding:8px 0;border-bottom:1px solid ${C.line};font-size:14px;color:${C.ink};">${esc(name)}</td>
      <td align="right" style="padding:8px 0 8px 12px;border-bottom:1px solid ${C.line};font-size:14px;font-weight:700;color:${C.ink};white-space:nowrap;">${esc(price)}</td>
    </tr>`;
  }).join("");
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border:1px solid ${C.line};border-radius:12px;padding:6px 20px;margin-top:14px;">
      <tr><td colspan="2" style="padding:8px 0 4px;font-size:11px;font-weight:700;color:${C.muted};text-transform:uppercase;letter-spacing:1px;">Itens do pedido (${lines.length})</td></tr>
      ${rows}
    </table>`;
}

// Bloco de entrega / observações (montado em lib/email.js quando há dados)
function deliveryBlock({ delivery, notes, receiver } = {}) {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const parts = [];
  if (delivery && String(delivery).trim()) parts.push(row("Entrega", esc(String(delivery).trim()).replace(/\n/g, "<br>")));
  if (receiver && String(receiver).trim()) parts.push(row("Recebedor", esc(receiver)));
  if (notes && String(notes).trim()) parts.push(row("Observação", esc(notes)));
  if (!parts.length) return "";
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafb;border-radius:12px;padding:6px 20px;margin-top:12px;">
      ${parts.join("")}
    </table>`;
}

module.exports = {
  deliveryBlock,
  AWAITING_REGISTRATION_TEMPLATE,
  ORDER_RECEIVED_TEMPLATE,
  AWAITING_PAYMENT_TEMPLATE,
  PAYMENT_PROCESSING_TEMPLATE,
  EMITTING_INVOICE_TEMPLATE,
  itemsBlock,
};
