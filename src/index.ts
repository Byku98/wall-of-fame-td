import express, { Request, Response } from "express";
// import helmet from 'helmet';
import path from "path";
import pagesRoute from "./routes/pages.route";

const app = express();

const PORT = process.env.PORT || 3000

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// add external styling
app.use("/static", express.static(path.join(__dirname, "../node_modules/bootstrap/dist")));

// add external assets and images
app.use("/images", express.static(path.join(__dirname, "../public/assets/images")));
app.use('/client_scripts', express.static(path.join(__dirname, "../public/scripts")));
app.use('/scripts', express.static(path.join(__dirname, "../scripts")));
app.use('/styles', express.static(path.join(__dirname, "../public/assets/css")));
app.use('/evidences', express.static(path.join(__dirname, "../uploads/evidences")));
app.use('/utils', express.static(path.join(__dirname, "./utils")));

// Routes
app.use("/", pagesRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});