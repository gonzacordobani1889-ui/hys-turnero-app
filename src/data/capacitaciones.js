// src/data/capacitaciones.js
// Modelos de capacitación de Seguridad e Higiene con temario y destinatarios.
// Se utilizan para generar constancias de capacitación con planilla de asistencia.

export const CAPACITACIONES = [
  {
    id: 'induccion',
    titulo: 'Inducción de Seguridad',
    duracion: '2 horas',
    destinatarios: 'Todo el personal que ingresa a la obra o planta',
    objetivo: 'Incorporar las normas básicas de higiene y seguridad, la señalización y el uso de EPP antes del ingreso a los frentes de trabajo.',
    contenidos: [
      'Marco normativo: Ley 19.587, Dec. 911/96 y responsabilidades',
      'Identificación de riesgos generales de la obra',
      'Señalización de seguridad (colores y significado)',
      'Uso, cuidado y conservación de los EPP',
      'Autoridad de Detención de Tareas (Stop Work)',
      'Actuación ante emergencias y vías de evacuación'
    ]
  },
  {
    id: 'altura',
    titulo: 'Trabajo en Altura',
    duracion: '4 horas',
    destinatarios: 'Operarios y supervisores que realizan tareas a más de 2 m',
    objetivo: 'Capacitar en el uso de sistemas anticaídas, selección de puntos de anclaje y operación segura en andamios y plataformas.',
    contenidos: [
      'Dec. 911/96 (Arts. 53-61) e IRAM 3622-1',
      'Selección y verificación de puntos de anclaje (22 kN)',
      'Colocación y ajuste del arnés de cuerpo completo',
      'Cabo doble en "Y" y absorbedores de energía',
      'Andamios, escaleras y plataformas elevadoras',
      'Rescate básico y suspensión inerte'
    ]
  },
  {
    id: 'izaje',
    titulo: 'Izaje de Cargas y Señalero',
    duracion: '3 horas',
    destinatarios: 'Operadores, señaleros y personal de maniobras de izaje',
    objetivo: 'Formar en la planificación del izaje, la inspección de eslingas y la comunicación estandarizada entre señalero y operador.',
    contenidos: [
      'Dec. 911/96 (Arts. 106-130) e IRAM 5378',
      'Inspección y descarte de eslingas, cables y grilletes',
      'Tabla de cargas y ángulos de izaje',
      'Señales normalizadas de maniobra',
      'Zona de exclusión y prohibición de cargas suspendidas'
    ]
  },
  {
    id: 'electrico',
    titulo: 'Riesgo Eléctrico y LOTO',
    duracion: '3 horas',
    destinatarios: 'Electricistas y personal que interviene tableros y equipos',
    objetivo: 'Instruir en las cinco reglas de oro, el bloqueo y etiquetado (LOTO) y el uso de elementos dieléctricos.',
    contenidos: [
      'Dec. 911/96 (Arts. 79-90) y AEA 90364',
      'Las cinco reglas de oro',
      'Procedimiento de bloqueo y etiquetado (LOTO)',
      'Herramientas aisladas IRAM-IEC 60900 y guantes dieléctricos',
      'Distancias de seguridad y trabajo sin tensión'
    ]
  },
  {
    id: 'confinado',
    titulo: 'Espacios Confinados y Rescate',
    duracion: '4 horas',
    destinatarios: 'Ingresantes, vigías y equipos de rescate',
    objetivo: 'Preparar para la medición de atmósfera, la vigilancia exterior y el rescate sin ingreso del rescatista.',
    contenidos: [
      'IRAM 3954 y Dec. 351/79 (Cap. 11)',
      'Medición de atmósfera: O2, LEL, CO y H2S',
      'Ventilación forzada y permiso de ingreso',
      'Rol del vigía exterior y comunicación permanente',
      'Rescate con trípode y torno (recuperación sin ingreso)'
    ]
  },
  {
    id: 'caliente',
    titulo: 'Trabajo en Caliente y Matafuegos',
    duracion: '2 horas',
    destinatarios: 'Soldadores y personal que realiza trabajos con fuentes de ignición',
    objetivo: 'Capacitar en la prevención de incendios, el uso de matafuegos y el control posterior de la zona de trabajo.',
    contenidos: [
      'Dec. 911/96 (Arts. 131-137) y Dec. 351/79 (Cap. 18)',
      'Clases de fuego y tipos de matafuegos (IRAM 3517)',
      'Uso práctico del matafuegos (técnica PAS)',
      'Manejo seguro de cilindros de gas comprimido',
      'Vigilancia posterior de 30 minutos'
    ]
  }
];
