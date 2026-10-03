// src/data/herramientas.js
// Base de datos de herramientas y equipos portátiles con sus controles de pre-uso.
// Cada ítem del checklist se evalúa como CONFORME / NO CONFORME / NO APLICA.

export const HERRAMIENTAS = [
  {
    id: "amoladora",
    nombre: "Amoladora angular (esmeriladora)",
    icono: "Disc3",
    checks: [
      "Disco en buen estado: sin fisuras, quemaduras ni desgaste excesivo",
      "Carcasa protectora del disco colocada y firme",
      "Mango auxiliar instalado y ajustado",
      "Cable de alimentación y ficha sin cortes ni peladuras",
      "Llave de bloqueo de eje presente",
      "Interruptor acciona y retorna correctamente"
    ]
  },
  {
    id: "taladro",
    nombre: "Taladro / atornillador eléctrico",
    icono: "Drill",
    checks: [
      "Mecha o broca correcta para el material y afilada",
      "Mandril firme y sin juego",
      "Cable de alimentación y ficha en buen estado",
      "Interruptor y reversa funcionan correctamente",
      "Mango y empuñadura sin rajaduras"
    ]
  },
  {
    id: "escalera",
    nombre: "Escalera portátil",
    icono: "Rows3",
    checks: [
      "Peldaños sin fisuras, dobleces ni grasa",
      "Zapatas antideslizantes en buen estado",
      "Rieles laterales sin deformaciones ni rajaduras",
      "Sin nudos ni astillas (en escaleras de madera)",
      "Apoyo firme y relación de inclinación adecuada (4:1)"
    ]
  },
  {
    id: "prolongador",
    nombre: "Prolongador / tablero eléctrico portátil",
    icono: "PlugZap",
    checks: [
      "Cable sin empalmes, cortes ni peladuras",
      "Fichas y tomas en buen estado, sin sobrecalentamiento",
      "Puesta a tierra operativa",
      "Disyuntor diferencial de 30 mA funcionando (si aplica)",
      "Capacidad adecuada a la carga conectada"
    ]
  },
  {
    id: "eslinga",
    nombre: "Eslinga / estrobo y grilletes",
    icono: "Cable",
    checks: [
      "Etiqueta de capacidad de carga legible",
      "Sin cortes, quemaduras, nudos ni desgaste",
      "Ganchos y grilletes con pestillo de seguridad operativo",
      "Sin deformaciones ni corrosión en accesorios",
      "Ángulo de izaje dentro del rango seguro"
    ]
  },
  {
    id: "herramientas-golpe",
    nombre: "Herramientas de golpe y de mano",
    icono: "Hammer",
    checks: [
      "Cabo firme, sin astillas ni rajaduras",
      "Cabeza sin rebabas, fisuras ni deformaciones",
      "Filo de herramientas de corte correctamente afilado y sin mellas",
      "Sin uso inadecuado como palanca o extensión"
    ]
  }
];
