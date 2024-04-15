const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT ?? 3000;
const server = http.createServer((req, res) => {
  const extensions = new Map();
  extensions.set(".css", "text/css");
  extensions.set(".png", "image/png");
  const extension = path.extname(req.url);
  const contentType = extensions.get(extension) ?? "text/html";
  const filePath =
    req.url != "/" && fs.existsSync(path.join(__dirname, "app", req.url))
      ? path.join(__dirname, "app", req.url)
      : path.join(__dirname, "app", "index.html");
  const data = fs.readFileSync(
    filePath, 
    { encoding: !contentType.includes("image") ? "utf-8" : ""  }
  );
  res.setHeader("Content-Type", contentType);
  res.end(data);
});
server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});