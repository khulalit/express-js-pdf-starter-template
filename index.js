import express from "express";
import morgan from "morgan";
import router from "./src/routes/pdfRoute.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.static("public"));

app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/pdf", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
