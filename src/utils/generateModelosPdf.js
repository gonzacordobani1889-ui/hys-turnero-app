// src/utils/generateModelosPdf.js
// Generadores de PDF para los documentos de gestión (check de herramientas, ATS, APR).

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const COLOR_ESTADO = {
  CONFORME: [22, 101, 52],
  'NO CONFORME': [185, 28, 28],
  'NO APLICA': [100, 116, 139]
};

export function generarCheckHerramientasPDF({ herramienta, resultados, obra, responsable, observaciones }) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const fecha = new Date().toLocaleString('es-AR');
  const codigo = `CHK-${Date.now().toString().slice(-6)}`;

  // 1. Encabezado
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, 210, 24, 'F');
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text('CHECK PRE-USO DE HERRAMIENTA / EQUIPO', 14, 10);

  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.text('Seguridad e Higiene Laboral — Verificación previa a la utilización', 14, 18);

  doc.setFont('helvetica', 'bold');
  doc.text(`CÓDIGO: ${codigo}`, 155, 10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Fecha/Hora: ${fecha}`, 140, 18);

  // 2. Datos generales
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`HERRAMIENTA: ${herramienta.nombre.toUpperCase()}`, 14, 32);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Obra / frente: ${obra || 'No especificada'}`, 14, 38);
  doc.text(`Responsable: ${responsable || 'No especificado'}`, 105, 38);

  // 3. Tabla de controles
  const filas = herramienta.checks.map((control, i) => [
    (i + 1).toString(),
    control,
    resultados[i] || 'SIN EVALUAR'
  ]);

  autoTable(doc, {
    startY: 43,
    theme: 'striped',
    headStyles: { fillColor: [51, 65, 85], textColor: [255, 255, 255], fontSize: 8.5, fontStyle: 'bold' },
    styles: { fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 138 },
      2: { cellWidth: 34, halign: 'center', fontStyle: 'bold' }
    },
    head: [['#', 'Control de verificación', 'Estado']],
    body: filas,
    margin: { left: 14, right: 14 },
    didParseCell: (data) => {
      if (data.column.index === 2) {
        const color = COLOR_ESTADO[data.cell.raw] || [15, 23, 42];
        data.cell.styles.textColor = color;
      }
    }
  });

  // 4. Observaciones y conclusión
  let y = doc.lastAutoTable.finalY + 8;
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('OBSERVACIONES:', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(8.5);
  const obs = doc.splitTextToSize(observaciones || 'Sin observaciones.', 182);
  doc.text(obs, 14, y + 6);

  const tieneNoConforme = resultados.includes('NO CONFORME');
  const yConclusion = y + (obs.length > 1 ? 6 + obs.length * 4 : 14);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  if (tieneNoConforme) {
    doc.setTextColor(185, 28, 28);
    doc.text('RESULTADO: EQUIPO NO APTO PARA SU USO — NO UTILIZAR hasta subsanar las no conformidades.', 14, yConclusion);
  } else {
    doc.setTextColor(22, 101, 52);
    doc.text('RESULTADO: EQUIPO APTO PARA SU USO — Verificación conforme.', 14, yConclusion);
  }

  // 5. Firma responsable
  const yFirma = yConclusion + 12;
  doc.setDrawColor(203, 213, 225);
  doc.rect(14, yFirma, 182, 26);
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('FIRMA Y ACLARACIÓN DEL RESPONSABLE DEL CONTROL', 16, yFirma + 6);
  doc.text('El suscrito declara haber realizado la verificación pre-uso aquí registrada.', 16, yFirma + 12);

  const nombreArchivo = `CHECK_${herramienta.id.toUpperCase()}_${Date.now()}.pdf`;
  doc.save(nombreArchivo);
  return codigo;
}
