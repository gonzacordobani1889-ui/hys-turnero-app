// src/utils/busqueda.js
// Búsqueda global sobre toda la base de tareas: título, subtítulo, resoluciones,
// guía técnica (qué hacer / métodos / informes / prevención), protocolo y checklist.

import { TAREAS_CRITICAS } from '../data/tareas';

const normalizar = (texto) => String(texto ?? '').toLowerCase();

export function buscarEnTareas(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const resultados = [];

  for (const tarea of TAREAS_CRITICAS) {
    const coincidencias = [];

    const evaluar = (seccion, textos) => {
      const lista = Array.isArray(textos) ? textos : [textos];
      lista.forEach((texto) => {
        if (normalizar(texto).includes(q)) {
          coincidencias.push({ seccion, texto: String(texto) });
        }
      });
    };

    evaluar('Tarea', [tarea.titulo, tarea.subtitulo]);
    tarea.resoluciones?.forEach((r) => evaluar('Resolución', [r.norma, r.desc, r.detalle]));
    evaluar('Qué hacer', tarea.operativa?.queHacer);
    evaluar('Métodos de trabajo', tarea.operativa?.metodosTrabajo);
    evaluar('Informes y planillas', tarea.operativa?.tiposInforme);
    evaluar('Prevención', tarea.operativa?.prevencion);
    tarea.pasos?.forEach((p) => evaluar('Protocolo', [p.titulo, p.desc]));
    evaluar('Checklist', tarea.checklist);

    if (coincidencias.length > 0) {
      resultados.push({ tarea, coincidencias });
    }
  }

  return resultados;
}
