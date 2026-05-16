// src/utils/pdfExport.js
// PDF export using html2canvas + jsPDF

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

/**
 * Exports the resume preview element as a PDF.
 * @param {string} elementId - DOM ID of the resume preview container
 * @param {string} filename  - PDF file name (without extension)
 */
export const exportToPDF = async (elementId = 'resume-preview', filename = 'resume') => {
  const toastId = toast.loading('Generating PDF...');

  try {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Preview element not found');

    // Temporarily expand for full render
    const originalStyle = element.style.transform;
    element.style.transform = 'none';

    const canvas = await html2canvas(element, {
      scale: 2,           // 2x resolution for crisp PDF
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794,   // A4 width in px at 96dpi
    });

    element.style.transform = originalStyle;

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth  = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth  = canvas.width;
    const imgHeight = canvas.height;
    const ratio     = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const imgX = (pdfWidth  - imgWidth  * ratio) / 2;
    const imgY = 0;

    pdf.addImage(
      imgData, 'PNG',
      imgX, imgY,
      imgWidth * ratio, imgHeight * ratio
    );

    pdf.save(`${filename}.pdf`);
    toast.success('PDF downloaded! 🎉', { id: toastId });
  } catch (error) {
    console.error('PDF export error:', error);
    toast.error('Failed to export PDF', { id: toastId });
  }
};
