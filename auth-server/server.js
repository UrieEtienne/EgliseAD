const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const codes = {}; // stockage temporaire

// 🔐 générer code
function generateCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// 📩 ENVOI EMAIL (TEST GRATUIT)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tonemail@gmail.com",
    pass: "mot_de_passe_app_google",
  },
});

// ======================
// 📩 ENVOYER CODE
// ======================
app.post("/send-code", async (req, res) => {
  const { email, telephone } = req.body;

  const code = generateCode();

  // expiration 5 min
  const expiresAt = Date.now() + 5 * 60 * 1000;

  codes[email || telephone] = { code, expiresAt };

  try {
    await transporter.sendMail({
      from: "Eglise App <tonemail@gmail.com>",
      to: email,
      subject: "Code de vérification",
      text: `Votre code est : ${code}`,
    });

    res.json({ success: true, message: "Code envoyé" });
  } catch (error) {
    res.json({ success: false, error });
  }
});

// ======================
// 🔐 VERIFIER CODE
// ======================
app.post("/verify-code", (req, res) => {
  const { email, code } = req.body;

  const record = codes[email];

  if (!record) {
    return res.json({ success: false, message: "Code inexistant" });
  }

  if (Date.now() > record.expiresAt) {
    return res.json({ success: false, message: "Code expiré" });
  }

  if (record.code !== code) {
    return res.json({ success: false, message: "Code incorrect" });
  }

  res.json({ success: true, message: "Vérifié avec succès" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});