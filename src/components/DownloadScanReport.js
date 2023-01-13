import { PDFDocument, StandardFonts, rgb, PageSizes} from "pdf-lib";
import { useState } from "react";

const DownloadScanReport = ({ scanReport, consoleText }) => {
  const [uri, setUri] = useState("");
  const [disabled, setDisabled] = useState(false);

  async function createPdf() {
    setDisabled(true);
    const pdfDoc = await PDFDocument.create();
    const bodyFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const headerFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const page = pdfDoc.addPage(PageSizes.A4);    
    const { width, height } = page.getSize();

    const headerFontSize = 35;
    const fontSize = 13;
   

    page.drawText("Port Scan Report", {
      x: 50,
      y: height - 4 * fontSize,
      size: headerFontSize,
      font: headerFont,
      color: rgb(0, 0, 0),
      
    });
    console.log(page.getPosition());
    page.drawText(`${consoleText}`, {
      x: 50,
      y: height - 10 * fontSize,
      size: fontSize,
      font: bodyFont,
      color: rgb(0, 0, 0),
      maxWidth: width-50,
    });
    page.drawText(`${scanReport}`, {
      x: 50,
      y: height - 16 * fontSize,
      size: fontSize,
      font: bodyFont,
      color: rgb(0, 0, 0),
      maxWidth: width-50,
    });

    console.log(page.getPosition());
    console.log(page.doc);



    const pdfBytes = await pdfDoc.save();
    const file = new Blob([pdfBytes], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    setUri(fileURL);
    setDisabled(false);
  }

  return (
    <div className="mt-5">
      <button onClick={createPdf} className={`btn btn-primary ${disabled && "disabled"}`}>
        <a
          href={uri}
          rel="noreferrer"
          target="_blank"
          style={{ textDecoration: "none", color: "white" }}
        >
          Download scan report
        </a>
      </button>
    </div>
  );
};

export default DownloadScanReport;
