import wkhtmltopdf from "wkhtmltopdf";
import fs from "fs";
import { options } from "../pdfConfig.js";

export const generatePDF = (html, outputFilePath) => {
  return new Promise((resolve, reject) => {
    wkhtmltopdf(html, options)
      .pipe(fs.createWriteStream(outputFilePath))
      .on("finish", () => resolve())
      .on("error", (err) => reject(err));
  });
};
