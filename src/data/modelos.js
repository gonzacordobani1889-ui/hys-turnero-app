// src/data/modelos.js
// Menú de "Documentos y Modelos" de gestión disponibles en el tótem.
// Cada entrada mapea a un formulario en App.jsx (renderModelo).

export const MODELOS = [
  {
    id: 'ats',
    titulo: 'ATS — Análisis de Trabajo Seguro',
    subtitulo: 'Desglose de la tarea en pasos, peligros y medidas de control',
    icono: 'ClipboardList',
    colorBg: 'bg-blue-700 hover:bg-blue-800',
    colorBadge: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'apr',
    titulo: 'APR — Análisis de Riesgos',
    subtitulo: 'Matriz de probabilidad y consecuencia con nivel de riesgo',
    icono: 'Gauge',
    colorBg: 'bg-slate-800 hover:bg-slate-900',
    colorBadge: 'bg-slate-100 text-slate-800'
  },
  {
    id: 'check-herramientas',
    titulo: 'Check de Herramientas',
    subtitulo: 'Verificación pre-uso de herramientas y equipos portátiles',
    icono: 'Wrench',
    colorBg: 'bg-slate-700 hover:bg-slate-800',
    colorBadge: 'bg-slate-100 text-slate-800'
  },
  {
    id: 'capacitacion',
    titulo: 'Modelos de Capacitación',
    subtitulo: 'Constancias con temario y planilla de asistencia',
    icono: 'GraduationCap',
    colorBg: 'bg-emerald-700 hover:bg-emerald-800',
    colorBadge: 'bg-emerald-100 text-emerald-800'
  }
];
