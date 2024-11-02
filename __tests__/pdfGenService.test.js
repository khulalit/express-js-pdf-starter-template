import { generatePDF } from "../src/services/pdfGenService";
import fs from "fs";
import path from "path";

describe("PDF Generation Service", () => {
  it("should generate a PDF and save it to the temp folder", async () => {
    const htmlContent = "<h1>Test PDF</h1>";
    const outputFilePath = path.join(__dirname, "../temp/test.pdf");
    if (fs.existsSync(outputFilePath)) {
      fs.unlinkSync(outputFilePath);
    }

    await generatePDF(htmlContent, outputFilePath);

    expect(fs.existsSync(outputFilePath)).toBe(true);

    fs.unlinkSync(outputFilePath);
  });
});
