// src/components/IlustracionTarea.jsx
// Ilustraciones SVG planas y duotono, una por tarea de riesgo crítico.
// Heredan el color del contenedor mediante currentColor.

import React from 'react';

const ILUSTRACIONES = {
  // Trabajo en Altura: casco con barbiquejo + línea de vida y mosquetón
  altura: (
    <g>
      <path d="M38 48 a22 22 0 0 1 44 0 l5 11 H33 Z" fill="currentColor" />
      <rect x="31" y="61" width="58" height="5" rx="2.5" fill="currentColor" />
      <path d="M60 66 v20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 86 c0 7 -6 9 -9 5 M60 86 c0 7 6 9 9 5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="70" r="3" fill="#0f172a" />
    </g>
  ),
  // Excavación y Zanjas: superficie + zanja entibada
  excavacion: (
    <g>
      <path d="M12 40 h96" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <rect x="28" y="40" width="64" height="40" fill="currentColor" opacity="0.2" />
      <path d="M28 40 h64 M28 60 h64 M28 80 h64" stroke="currentColor" strokeWidth="3" />
      <path d="M48 40 v40 M72 40 v40" stroke="currentColor" strokeWidth="3" />
    </g>
  ),
  // Riesgo Eléctrico / LOTO: rayo
  electrico: (
    <g>
      <path d="M66 14 L36 62 h17 L50 106 L84 54 H66 Z" fill="currentColor" />
    </g>
  ),
  // Espacios Confinados: tanque con boca de acceso y venteo
  confinado: (
    <g>
      <circle cx="60" cy="66" r="34" stroke="currentColor" strokeWidth="5" fill="none" />
      <circle cx="60" cy="66" r="13" fill="currentColor" opacity="0.35" />
      <path d="M60 32 v-9 M50 23 h20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  // Trabajo en Caliente: llama
  caliente: (
    <g>
      <path
        d="M60 14 c11 14 20 22 20 36 a20 20 0 0 1 -40 0 c0 -8 6 -15 10 -21 c2 4 5 6 8 5 c-1 -7 0 -13 2 -20 Z"
        fill="currentColor"
      />
    </g>
  ),
  // Izaje de Cargas: gancho de grúa y carga
  izaje: (
    <g>
      <path d="M60 18 v34 M44 52 h32" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M46 52 a14 14 0 1 0 28 0" stroke="currentColor" strokeWidth="5" fill="none" />
      <path d="M47 66 l-9 20 M73 66 l9 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <rect x="42" y="88" width="36" height="18" rx="3" fill="currentColor" opacity="0.45" />
    </g>
  )
};

export default function IlustracionTarea({ id, className }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      {ILUSTRACIONES[id] || null}
    </svg>
  );
}
