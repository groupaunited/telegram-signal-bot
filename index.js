const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    const message = `
📡 *${data.pair || 'Pair'} Signal*
🟢 *Direction:* ${data.direction || 'N/A'}
🎯 *Entry:* ${data.entry || 'N/A'}
🛡️ *SL:* ${data.sl || 'N/A'}
🏁 *TP:* ${data.tp || 'N/A'}
🧠 *Reason:* ${data.reason || 'Not provided'}
    `.trim();

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown"
    });

    res.status(200).send("Signal sent to Telegram");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Failed to send signal");
  }
});

app.get("/", (req, res) => {
  res.send("Telegram Signal Bot is running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
