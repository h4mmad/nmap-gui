import { PDFDocument, StandardFonts, rgb, PageSizes } from 'pdf-lib'
import { useState } from 'react';

const DownloadScanReport = ({scanReport, consoleText}) => {

    const [uri, setUri] = useState('');

    async function createPdf() {
        const pdfDoc = await PDFDocument.create()
        const bodyFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
        const headerFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

        const page = pdfDoc.addPage(PageSizes.Tabloid)
        const { height } = page.getSize()
        
        const headerFontSize = 40
        const fontSize = 15

        page.drawText('Port Scan Report', {
            x: 50,
            y: height - 4 * fontSize,
            size: headerFontSize,
            font: headerFont,
            color: rgb(0, 0, 0),
        })
        page.drawText(`${consoleText}`, {
            x: 50,
            y: height - 10 * fontSize,
            size: fontSize,
            font: bodyFont,
            color: rgb(0, 0, 0),
        })
        page.drawText(`${scanReport}`, {
            x: 50,
            y: height - 16 * fontSize,
            size: fontSize,
            font: bodyFont,
            color: rgb(0, 0, 0),
        })
        
        
        

        const pdfBytes = await pdfDoc.save();
        const file = new Blob([pdfBytes], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        setUri(fileURL);
    }



    return (
        <div className='mt-5 mb-2'>
            <button  onClick={createPdf} className="btn btn-primary">
                <a href={uri}  rel="noreferrer" target="_blank" style={{textDecoration: "none", color: "white"}}>Download scan report</a>
            </button>
        </div>
    );
}

export default DownloadScanReport;