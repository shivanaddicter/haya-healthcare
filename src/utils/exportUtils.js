import html2pdf from 'html2pdf.js';

/**
 * Downloads data as a CSV file.
 * @param {string} filename 
 * @param {Array<Array<any>>|string} data 
 */
export const downloadCSV = (filename, data) => {
  let csvContent = "";
  if (Array.isArray(data)) {
    csvContent = data.map(row => 
      row.map(field => {
        const str = String(field ?? '').replace(/"/g, '""');
        return `"${str}"`;
      }).join(",")
    ).join("\n");
  } else {
    csvContent = String(data);
  }

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Downloads data as an Excel-compatible XML / CSV file.
 * @param {string} filename 
 * @param {Array<Array<any>>|string} data 
 */
export const downloadExcel = (filename, data) => {
  let csvContent = "";
  if (Array.isArray(data)) {
    csvContent = data.map(row => 
      row.map(field => {
        const str = String(field ?? '').replace(/"/g, '""');
        return `"${str}"`;
      }).join("\t")
    ).join("\n");
  } else {
    csvContent = String(data);
  }

  // Prepend UTF-8 BOM so Excel opens it with correct encoding and cell separation
  const blob = new Blob(["\ufeff" + csvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.xls') || filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Captures an HTML element by ID and downloads it as a PDF document.
 * @param {string} elementId 
 * @param {string} filename 
 */
export const downloadPDFFromElement = async (elementId, filename) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id '${elementId}' not found.`);
    alert(`Report template could not be located. Please make sure the assessment result is visible.`);
    return false;
  }

  // Show a non-intrusive processing toast
  const toast = document.createElement('div');
  toast.innerText = '📄 Generating Official PDF Report...';
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.backgroundColor = '#0284c7';
  toast.style.color = '#ffffff';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '10px';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
  toast.style.zIndex = '9999999';
  toast.style.fontWeight = 'bold';
  toast.style.fontSize = '13px';
  toast.style.fontFamily = 'sans-serif';
  document.body.appendChild(toast);

  // Clone element into an in-viewport container at (0, 0) with strict single-page dimensions
  const clone = element.cloneNode(true);
  clone.style.display = 'block';
  clone.style.visibility = 'visible';
  clone.style.height = '100%';
  clone.style.boxSizing = 'border-box';

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '780px';
  container.style.height = '930px';
  container.style.maxHeight = '930px';
  container.style.overflow = 'hidden';
  container.style.boxSizing = 'border-box';
  container.style.backgroundColor = '#ffffff';
  container.style.zIndex = '999999';
  container.style.pointerEvents = 'none';
  container.style.opacity = '1';
  container.appendChild(clone);
  document.body.appendChild(container);

  const opt = {
    margin:       [0.15, 0.15, 0.15, 0.15],
    filename:     filename.endsWith('.pdf') ? filename : `${filename}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, logging: false, scrollX: 0, scrollY: 0, windowWidth: 780, windowHeight: 930 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
  };

  try {
    await html2pdf().set(opt).from(clone).save();
    return true;
  } catch (err) {
    console.error("html2pdf failed, falling back to window print:", err);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${filename}</title>
            <style>
              body { font-family: sans-serif; padding: 20px; color: #000; background: #fff; }
              @media print { body { padding: 0; } }
            </style>
          </head>
          <body>
            ${element.innerHTML}
            <script>
              window.onload = function() { window.print(); window.close(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      alert("PDF download failed. Please allow popups to download reports.");
    }
    return false;
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
    if (document.body.contains(toast)) {
      document.body.removeChild(toast);
    }
  }
};
