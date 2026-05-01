const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const africastalking = require("africastalking");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔥 CONFIG API SMS
const credentials = {
  apiKey: "TON_API_KEY",
  username: "sandbox", // ou ton username
};

const AT = africastalking(credentials);
const sms = AT.SMS;

// 🚀 ROUTE ENVOI SMS
app.post("/send-sms", async (req, res) => {
  const { message, recipients } = req.body;

  try {
    const response = await sms.send({
      to: recipients, // tableau de numéros
      message,
    });

    res.json({ success: true, response });

  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

app.listen(5000, () => {
  console.log("Serveur lancé sur http://localhost:5000");
});