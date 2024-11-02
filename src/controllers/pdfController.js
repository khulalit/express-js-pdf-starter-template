import ejs from "ejs";
import path from "path";
import fs from "fs";
import { generatePDF } from "../services/pdfGenService.js";

export const createPDF = async (req, res) => {
  try {
    const data = {
      invoiceNumber: "12345",
      date: "2024-11-02",
      customer: {
        name: "John Doe",
        address: "789 Customer St., City, ST 56789",
        email: "johndoe@example.com",
      },
      items: [
        { description: "Widget A", quantity: 2, unitPrice: 25.0 },
        { description: "Widget B", quantity: 1, unitPrice: 15.5 },
        { description: "Widget C", quantity: 3, unitPrice: 5.75 },
      ],
      subtotal: 77.25, // Calculate dynamically based on items
    };

    const templatePath = path.join(
      path.dirname(new URL(import.meta.url).pathname),
      "../views/templates/samplePdf.ejs"
    );

    const html = await ejs.renderFile(templatePath.substring(1), data);

    const tempFilePath = path
      .join(
        path.dirname(new URL(import.meta.url).pathname),
        "../../temp/generated.pdf"
      )
      .substring(1);

    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
      console.log("Previous PDF deleted");
    }

    await generatePDF(html, tempFilePath);
    console.log("New PDF saved to temp folder");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="generated.pdf"'
    );

    res.sendFile(tempFilePath, (err) => {
      if (err) {
        console.error("Error sending PDF:", err);
        res.status(500).json({ error: "Failed to send PDF" });
      } else {
        fs.unlink(tempFilePath, (unlinkErr) => {
          if (unlinkErr) console.error("Error deleting temp file:", unlinkErr);
        });
      }
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: error.message });
  }
};
