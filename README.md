# 🍺 Ambev S.A — Gestor de Pedidos

Painel de clientes e pedidos com fluxo automático de **5 emails** (via [Resend](https://resend.com)):

1. 📋 **Aguardando Cadastro** — ao cadastrar o cliente
2. ✅ **Pedido Recebido** — ao criar o pedido
3. ⚠️ **Aguardando Pagamento** — junto com o pedido, prazo de **20 minutos** (countdown no painel)
4. ⚙️ **Baixa em Sistema** — ao clicar em "Confirmar pagamento"
5. 📄 **Emitindo NF** — ao clicar em "Emitir NF"

Pronto para a **Vercel** (serverless) e também roda localmente.

## Rodar localmente

```bash
npm install
cp .env.example .env   # coloque sua RESEND_API_KEY
npm start              # http://localhost:3000
```

## Deploy na Vercel

1. Importe este repositório em https://vercel.com/new
2. Em **Environment Variables** adicione:
   - `RESEND_API_KEY` — sua chave do Resend (obrigatória)
   - `SENDER_EMAIL` — opcional. Padrão `onboarding@resend.dev` (modo teste: só entrega para o email da conta Resend). Com domínio verificado no Resend use ex.: `noreply@seudominio.com.br`
   - `REPLY_TO` — opcional, caixa real para respostas dos clientes (ex.: seu Gmail)
   - `COMPANY_NAME` / `CONTACT_EMAIL` — opcionais, exibidos no rodapé dos emails
   - `WHATSAPP_NUMBER` — número (com DDI, só dígitos) para onde os botões "Confirmar pagamento" / "Já pagou?" levam, com mensagem pronta
   - `BASE_URL` — URL pública do site; o logotipo dos emails é carregado de `BASE_URL/brand/logo-light.png`
   - `PAYMENT_DEADLINE_MINUTES` — opcional, padrão `20`
3. Deploy. O painel abre na raiz do site.

### Entregabilidade (sair do spam)
- Envie sempre de um domínio verificado no Resend (SPF + DKIM) e mantenha um registro DMARC no domínio.
- Os assuntos são sóbrios (sem "URGENTE"/emojis) e todo email vai com versão em texto puro e `reply-to` real.
- Domínio novo: comece com poucos envios por dia e marque "não é spam" nos primeiros que chegarem.

## Estrutura

```
api/index.js        → API Express (Serverless Function na Vercel)
lib/email.js        → envio dos 5 emails via Resend
lib/templates.js    → templates HTML (tabelas, compatíveis com Gmail/Outlook)
public/brand/       → logotipo Ambev S.A (PNG) usado nos emails e no painel
public/index.html   → painel (dados salvos no navegador — localStorage)
server.js           → servidor local
```

## API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/health` | status da configuração |
| GET | `/api/emails/preview/:type` | pré-visualização (`registration`, `order`, `payment`, `processing`, `invoice`) |
| POST | `/api/emails/registration` | `{ email, name, referenceCode }` |
| POST | `/api/emails/order-received` | `{ email, name, orderNumber, orderDate, subtotal, shippingCost, total, items }` (`items`: um por linha) |
| POST | `/api/emails/awaiting-payment` | `{ email, name, orderNumber, totalAmount, dueDate, paymentMethod }` |
| POST | `/api/emails/payment-processing` | `{ email, name, orderNumber, paidAmount, paymentMethod, paymentDate, emissionTime, estimatedTime }` |
| POST | `/api/emails/emitting-invoice` | `{ email, name, orderNumber, paidAmount, estimatedTime }` |

Erros do Resend são devolvidos como `{ success: false, error, code }` e aparecem no histórico do painel.
