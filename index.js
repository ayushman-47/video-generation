const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/api/prompt", async (req, res) => {
  const { prompt } = req.body;
  console.log("📥 Received prompt:", prompt); // for logging

  try {
    const response = await fetch("https://hook.us2.make.com/3lc52acgcpcg6dvoy441sygniftcf7m2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    console.log("✅ Webhook response:", data);
    res.send({ videoUrl: data.videoUrl || "https://youtube.com" }); // default fallback
  } catch (err) {
    console.error("❌ Error sending to Make.com:", err);
    res.status(500).send({ error: "Failed to contact Make.com" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
