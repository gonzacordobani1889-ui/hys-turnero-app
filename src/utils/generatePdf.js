// src/utils/generatePdf.js
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generarPermisoPDF({ tarea, datosObra, checklistItems, signatureDataUrl }) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const fechaActual = new Date().toLocaleString('es-AR');
  const codigoPTS = `PTS-${Date.now().toString().slice(-6)}`;

  // 1. ENCABEZADO Y MARCO INSTITUCIONAL
  doc.setFillColor(30, 41, 59); // slate-800
  doc.rect(0, 0, 210, 24, 'F');

  doc.setTextColor(245, 158, 11); // amber-500
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('PERMISO DE TRABAJO SEGURO (PTS)', 14, 11);

  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.text('Sistema de Gestión de Seguridad e Higiene Laboral en Obra', 14, 18);

  doc.setFont('helvetica', 'bold');
  doc.text(`CÓDIGO: ${codigoPTS}`, 155, 11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Fecha/Hora: ${fechaActual}`, 140, 18);

  // 2. DATOS DE LA TAREA Y MARCO LEGAL
  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(`TAREA CRÍTICA: ${tarea.titulo.toUpperCase()}`, 14, 33);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(`Alcance: ${tarea.subtitulo}`, 14, 38);

  // Marco legal de referencia
  doc.setFillColor(241, 245, 249); // slate-100
  doc.roundedRect(14, 42, 182, 22, 2, 2, 'F');
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('MARCO LEGAL Y RESOLUCIONES APLICABLES (SRT / NORMAS IRAM):', 17, 47);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  const textoNormas = tarea.resoluciones.map(r => `• ${r.norma}: ${r.desc}`).join(' | ');
  const splitNormas = doc.splitTextToSize(textoNormas, 176);
  doc.text(splitNormas, 17, 52);

  // 3. DATOS DE LA OBRA Y RESPONSABLES (TABLA)
  autoTable(doc, {
    startY: 68,
    theme: 'grid',
    headStyles: { fillColor: [51, 65, 85], textColor: [255, 255, 255], fontSize: 8, fontStyle: 'bold' },
    bodyStyles: { fontSize: 8, textColor: [15, 23, 42] },
    head: [['Obra / Frente de Trabajo', 'Capataz / Maestro Mayor de Obra', 'DNI / Matrícula', 'Operarios', 'Horario']],
    body: [
      [
        datosObra.obra || 'N/A',
        datosObra.responsable || 'N/A',
        datosObra.matricula || 'N/A',
        `${datosObra.operarios || '0'} personas`,
        datosObra.horario || 'Jornada habitual'
      ]
    ],
    margin: { left: 14, right: 14 }
  });

  // 4. CHECKLIST OPERATIVO DE CAMPO
  const tableRows = tarea.checklist.map((item, index) => {
    const verificado = checklistItems.includes(index);
    return [
      (index + 1).toString(),
      item,
      verificado ? 'CUMPLE CONFORME' : 'NO VERIFICADO'
    ];
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 6,
    theme: 'striped',
    headStyles: { fillColor: [245, 158, 11], textColor: [15, 23, 42], fontSize: 8.5, fontStyle: 'bold' },
    styles: { fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 135 },
      2: { cellWidth: 37, fontStyle: 'bold', halign: 'center' }
    },
    head: [['#', 'Elemento / Condición de Seguridad Verificada', 'Estado de Inspección']],
    body: tableRows,
    margin: { left: 14, right: 14 },
    didParseCell: function(data) {
      if (data.column.index === 2) {
        if (data.cell.raw.includes('CUMPLE')) {
          data.cell.styles.textColor = [22, 101, 52]; // verde
        } else {
          data.cell.styles.textColor = [185, 28, 28]; // rojo
        }
      }
    }
  });

  // 5. DECLARACIÓN JURADA Y FIRMA DIGITAL
  const yFirma = doc.lastAutoTable.finalY + 8;

  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  const textoDJ = 'DECLARACIÓN: El suscrito declara que las condiciones de seguridad han sido verificadas en el frente de obra, los EPP certificados fueron entregados y los operarios se encuentran informados sobre los riesgos del procedimiento. Ante cualquier modificación riesgosa imprevista, rige la Autoridad de Detención de Tareas (Stop Work).';
  const splitDJ = doc.splitTextToSize(textoDJ, 182);
  doc.text(splitDJ, 14, yFirma);

  // Recuadro de firmas
  const yBoxFirma = yFirma + 12;
  
  // Firma Capataz / MMO
  doc.setDrawColor(203, 213, 225);
  doc.rect(14, yBoxFirma, 88, 32);
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('FIRMA Y ACLARACIÓN: CAPATAZ / M.M.O.', 16, yBoxFirma + 5);

  if (signatureDataUrl) {
    try {
      doc.addImage(signatureDataUrl, 'PNG', 20, yBoxFirma + 6, 75, 23);
    } catch {
      doc.text('(Firma digital registrada)', 25, yBoxFirma + 18);
    }
  }

  // Sello Técnico HyS
  doc.rect(108, yBoxFirma, 88, 32);
  doc.text('SELLO Y CONFORMIDAD: TÉCNICO EN HIGIENE Y SEGURIDAD', 110, yBoxFirma + 5);
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text('HABILITACIÓN OPERATIVA OTORGADA', 115, yBoxFirma + 16);
  doc.setFontSize(7);
  doc.text(`Constancia emitida automáticamente`, 115, yBoxFirma + 22);
  doc.text(`Registro Digital N° ${codigoPTS}`, 115, yBoxFirma + 26);

  // Descarga directa
  const nombreArchivo = `PTS_${tarea.id.toUpperCase()}_${Date.now()}.pdf`;
  doc.save(nombreArchivo);
  return codigoPTS;
}
