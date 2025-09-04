const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Proxy endpoint
app.get("/api/results", async (req, res) => {
  try {
    const apiRes = await axios.post(
      "https://api.bdg88zf.com/api/webapi/GetNoaverageEmerdList",
      {}, // Empty body
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
          "Origin": "https://bdg88zf.com",
          "Referer": "https://bdg88zf.com/"
        },
        timeout: 8000
      }
    );
    res.json(apiRes.data);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(502).json({ error: "Bad gateway", msg: err.message });
  }
});

app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));
