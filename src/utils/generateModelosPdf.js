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

export function nivelRiesgo(probabilidad, consecuencia) {
  const v = (Number(probabilidad) || 1) * (Number(consecuencia) || 1);
  if (v <= 4) return 'BAJO';
  if (v <= 9) return 'MEDIO';
  if (v <= 12) return 'ALTO';
  return 'CRÍTICO';
}

const NIVEL_RGB = {
  BAJO: [22, 101, 52],
  MEDIO: [180, 83, 9],
  ALTO: [194, 65, 12],
  'CRÍTICO': [185, 28, 28]
};

export function generarATSPDF({ obra, tarea, responsable, filas, signatureDataUrl }) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const fecha = new Date().toLocaleString('es-AR');
  const codigo = `ATS-${Date.now().toString().slice(-6)}`;

  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, 210, 24, 'F');
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text('ANÁLISIS DE TRABAJO SEGURO (ATS)', 14, 10);
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.text('Análisis paso a paso de la tarea: peligros asociados y medidas de control', 14, 18);
  doc.setFont('helvetica', 'bold');
  doc.text(`CÓDIGO: ${codigo}`, 155, 10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Fecha/Hora: ${fecha}`, 140, 18);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`TAREA ANALIZADA: ${(tarea || '').toUpperCase()}`, 14, 32);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Obra / frente: ${obra || 'No especificada'}`, 14, 38);
  doc.text(`Responsable del análisis: ${responsable || 'No especificado'}`, 105, 38);

  const body = filas.map((f, i) => [String(i + 1), f.paso || '', f.peligros || '', f.controles || '']);
  autoTable(doc, {
    startY: 43,
    theme: 'grid',
    headStyles: { fillColor: [245, 158, 11], textColor: [15, 23, 42], fontSize: 8, fontStyle: 'bold' },
    styles: { fontSize: 7.5, cellPadding: 2, valign: 'top' },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 55 },
      2: { cellWidth: 58 },
      3: { cellWidth: 59 }
    },
    head: [['#', 'Paso de la tarea', 'Peligro asociado', 'Medidas de control']],
    body,
    margin: { left: 14, right: 14 }
  });

  const yFirma = doc.lastAutoTable.finalY + 10;
  doc.setDrawColor(203, 213, 225);
  doc.rect(14, yFirma, 182, 30);
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('FIRMA Y ACLARACIÓN DEL RESPONSABLE DEL ANÁLISIS', 16, yFirma + 5);
  if (signatureDataUrl) {
    try {
      doc.addImage(signatureDataUrl, 'PNG', 20, yFirma + 8, 70, 20);
    } catch {
      doc.text('(Firma digital registrada)', 22, yFirma + 18);
    }
  }
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text('HABILITACIÓN OPERATIVA OTORGADA', 110, yFirma + 14);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text(`Registro Digital N° ${codigo}`, 110, yFirma + 20);

  doc.save(`ATS_${Date.now()}.pdf`);
  return codigo;
}

export function generarAPRPDF({ obra, actividad, responsable, filas, signatureDataUrl }) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const fecha = new Date().toLocaleString('es-AR');
  const codigo = `APR-${Date.now().toString().slice(-6)}`;

  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, 210, 24, 'F');
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text('ANÁLISIS DE RIESGOS (APR)', 14, 10);
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.text('Evaluación de probabilidad y consecuencia — matriz de riesgo', 14, 18);
  doc.setFont('helvetica', 'bold');
  doc.text(`CÓDIGO: ${codigo}`, 155, 10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Fecha/Hora: ${fecha}`, 140, 18);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`ACTIVIDAD ANALIZADA: ${(actividad || '').toUpperCase()}`, 14, 32);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Obra / frente: ${obra || 'No especificada'}`, 14, 38);
  doc.text(`Responsable: ${responsable || 'No especificado'}`, 105, 38);

  const body = filas.map((f, i) => {
    const nivel = nivelRiesgo(f.probabilidad, f.consecuencia);
    return [
      String(i + 1),
      f.peligro || '',
      String(f.probabilidad || 1),
      String(f.consecuencia || 1),
      nivel,
      f.medidas || ''
    ];
  });

  autoTable(doc, {
    startY: 43,
    theme: 'grid',
    headStyles: { fillColor: [51, 65, 85], textColor: [255, 255, 255], fontSize: 8, fontStyle: 'bold' },
    styles: { fontSize: 7.5, cellPadding: 2, valign: 'top' },
    columnStyles: {
      0: { cellWidth: 8, halign: 'center' },
      1: { cellWidth: 50 },
      2: { cellWidth: 12, halign: 'center' },
      3: { cellWidth: 12, halign: 'center' },
      4: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
      5: { cellWidth: 80 }
    },
    head: [['#', 'Peligro / riesgo', 'P', 'C', 'Nivel', 'Medidas preventivas']],
    body,
    margin: { left: 14, right: 14 },
    didParseCell: (data) => {
      if (data.column.index === 4) {
        data.cell.styles.textColor = NIVEL_RGB[data.cell.raw] || [15, 23, 42];
      }
    }
  });

  const yFirma = doc.lastAutoTable.finalY + 10;
  doc.setDrawColor(203, 213, 225);
  doc.rect(14, yFirma, 182, 30);
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('FIRMA Y ACLARACIÓN DEL RESPONSABLE DE LA EVALUACIÓN', 16, yFirma + 5);
  if (signatureDataUrl) {
    try {
      doc.addImage(signatureDataUrl, 'PNG', 20, yFirma + 8, 70, 20);
    } catch {
      doc.text('(Firma digital registrada)', 22, yFirma + 18);
    }
  }
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text('HABILITACIÓN OPERATIVA OTORGADA', 110, yFirma + 14);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text(`Registro Digital N° ${codigo}`, 110, yFirma + 20);

  doc.save(`APR_${Date.now()}.pdf`);
  return codigo;
}

export function generarCapacitacionPDF({ capacitacion, instructor, empresa, participantes, signatureDataUrl }) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const fecha = new Date().toLocaleString('es-AR');
  const codigo = `CAP-${Date.now().toString().slice(-6)}`;

  // 1. Encabezado
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, 210, 24, 'F');
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text('CONSTANCIA DE CAPACITACIÓN', 14, 10);
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.text('Seguridad e Higiene Laboral — Registro de formación del personal', 14, 18);
  doc.setFont('helvetica', 'bold');
  doc.text(`CÓDIGO: ${codigo}`, 155, 10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Fecha/Hora: ${fecha}`, 140, 18);

  // 2. Datos del módulo
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(`MÓDULO: ${capacitacion.titulo.toUpperCase()}`, 14, 33);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Duración: ${capacitacion.duracion}`, 14, 39);
  doc.text(`Empresa / obra: ${empresa || 'No especificada'}`, 14, 44);
  doc.text(`Instructor: ${instructor || 'No especificado'}`, 14, 49);
  doc.text(`Destinatarios: ${capacitacion.destinatarios}`, 14, 54);

  // 3. Objetivo
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('OBJETIVO:', 14, 61);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  const objetivo = doc.splitTextToSize(capacitacion.objetivo, 182);
  doc.text(objetivo, 14, 66);

  // 4. Contenidos
  let yContenidos = 66 + objetivo.length * 4.5 + 3;
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text('CONTENIDOS DESARROLLADOS:', 14, yContenidos);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  let y = yContenidos + 5;
  capacitacion.contenidos.forEach((c) => {
    doc.text(`•  ${c}`, 16, y);
    y += 4.5;
  });

  // 5. Planilla de asistencia
  const body = participantes.map((p, i) => [String(i + 1), p.nombre || '', p.dni || '', '']);
  autoTable(doc, {
    startY: y + 4,
    theme: 'grid',
    headStyles: { fillColor: [51, 65, 85], textColor: [255, 255, 255], fontSize: 8.5, fontStyle: 'bold' },
    styles: { fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 90 },
      2: { cellWidth: 40 },
      3: { cellWidth: 42, halign: 'center' }
    },
    head: [['#', 'Nombre y apellido', 'DNI', 'Firma']],
    body,
    margin: { left: 14, right: 14 }
  });

  // 6. Firma del instructor
  const yFirma = doc.lastAutoTable.finalY + 10;
  doc.setDrawColor(203, 213, 225);
  doc.rect(14, yFirma, 182, 30);
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('FIRMA Y ACLARACIÓN DEL INSTRUCTOR / RESPONSABLE', 16, yFirma + 5);
  if (signatureDataUrl) {
    try {
      doc.addImage(signatureDataUrl, 'PNG', 20, yFirma + 8, 70, 20);
    } catch {
      doc.text('(Firma digital registrada)', 22, yFirma + 18);
    }
  }
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text('CONSTANCIA EMITIDA', 110, yFirma + 14);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text(`Registro Digital N° ${codigo}`, 110, yFirma + 20);

  doc.save(`CAPACITACION_${capacitacion.id.toUpperCase()}_${Date.now()}.pdf`);
  return codigo;
}
