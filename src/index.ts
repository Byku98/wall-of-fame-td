import express, { Request, Response } from "express";
import path from "path";

const app = express();

const PORT = 3000;

app.use("/static", express.static(path.join(__dirname, "../node_modules/bootstrap/dist")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});