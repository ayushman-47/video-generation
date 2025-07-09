const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Return index.html on root
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/api/prompt", async (req, res) => {
  const { prompt } = req.body;
  console.log("📥 Received Prompt:", prompt);

  // Send prompt to Make.com webhook
  const makeRes = await fetch("https://hook.eu2.make.com/wqq7h0h7dh7f17wwj4ob2qqltgu3ojio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await makeRes.json();
  res.send({ videoUrl: data.videoUrl });
});

// Use Render-assigned port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
