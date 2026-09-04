// Servidor local: npm start  →  http://localhost:3000
require("dotenv").config();
const app = require("./api/index.js");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🍺 Gestor Ambev rodando em http://localhost:${PORT}`);
  console.log(`   RESEND_API_KEY: ${process.env.RESEND_API_KEY ? "✅ configurada" : "❌ não configurada"}`);
  console.log(`   SENDER_EMAIL:   ${process.env.SENDER_EMAIL || "onboarding@resend.dev (padrão)"}`);
});
