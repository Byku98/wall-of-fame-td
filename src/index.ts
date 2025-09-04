import express, { Request, Response } from "express";
import path from "path";
import pagesRoute from "./routes/pages.route";

const app = express();

const PORT = 3000;

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// add external styling
app.use("/static", express.static(path.join(__dirname, "../node_modules/bootstrap/dist")));

// add external assets and images
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Routes
app.use("/", pagesRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});