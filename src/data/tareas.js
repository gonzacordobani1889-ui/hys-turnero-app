// src/data/tareas.js
// Esta es nuestra "Base de Datos" inicial en JavaScript.
// Contiene las tareas críticas, las normativas oficiales (SRT / Decretos) y los checklists de campo.

export const TAREAS_CRITICAS = [
  {
    id: "altura",
    titulo: "Trabajo en Altura",
    subtitulo: "Tareas a más de 2.00 metros sobre el nivel del suelo",
    icono: "Mountain",
    colorBg: "bg-blue-600 hover:bg-blue-700",
    colorBadge: "bg-blue-100 text-blue-800",
    resoluciones: [
      { norma: "Dec. 911/96 (Arts. 53-61)", desc: "Higiene y Seguridad en Construcción: Andamios, escaleras y prevención de caídas a distinto nivel." },
      { norma: "Res. SRT 299/11", desc: "Entrega obligatoria y certificación de EPP (Arnés integral con sello IRAM)." },
      { norma: "Norma IRAM 3622-1", desc: "Sistemas anticaídas, conectores, puntos de anclaje (resistencia mínima 22 kN) y cabos dobles con absorbedor." },
      { norma: "Ley Nacional 19.587", desc: "Marco regulatorio general de Higiene y Seguridad en el Trabajo." }
    ],
    pasos: [
      { num: 1, titulo: "Inspección Previa", desc: "Verificar andamios nivelados, tablones amarrados y ausencia de vientos superiores a 40 km/h." },
      { num: 2, titulo: "Punto de Anclaje", desc: "Fijar cabo a línea de vida independiente certificada o estructura resistente comprobada." },
      { num: 3, titulo: "Revisión EPP", desc: "Inspeccionar costuras del arnés, mosquetones con doble traba y casco con barbijito colocado." },
      { num: 4, titulo: "Permiso Firmado", desc: "El Capataz o Maestro Mayor de Obra debe suscribir el PTS antes del ascenso." }
    ],
    checklist: [
      "Arnés de seguridad de cuerpo completo certificado (IRAM 3622)",
      "Cabo de vida doble en 'Y' con amortiguador de impacto",
      "Casco de seguridad con barbijito de 3 puntos fijado a la barbilla",
      "Línea de vida independiente fijada a estructura resistente (> 22 kN)",
      "Andamio con barandas reglamentarias (1m y 0.50m) y zócalos de 15 cm",
      "Tablones metálicos o de madera sana trabados y amarrados",
      "Zona inferior delimitada y señalizada con cinta o vallas de peligro",
      "Calzado de seguridad dieléctrico con suela antideslizante limpia"
    ]
  },
  {
    id: "excavacion",
    titulo: "Excavación y Zanjas",
    subtitulo: "Apertura de zanjas, pozos, bases y movimientos de suelo",
    icono: "Tractor",
    colorBg: "bg-amber-600 hover:bg-amber-700",
    colorBadge: "bg-amber-100 text-amber-800",
    resoluciones: [
      { norma: "Res. SRT 503/14", desc: "Resolución obligatoria para excavación, submuración y movimiento de suelos en construcción." },
      { norma: "Dec. 911/96 (Arts. 138-160)", desc: "Excavaciones: Talud natural, entibado obligatorio a partir de 1.20 metros de profundidad." },
      { norma: "Res. SRT 550/11", desc: "Intervención preventiva en demolición y movimientos de tierra." }
    ],
    pasos: [
      { num: 1, titulo: "Interferencias", desc: "Comprobar planos de tendidos subterráneos (gas, electricidad, agua, cloacas) antes de excavar." },
      { num: 2, titulo: "Entibado / Talud", desc: "Colocar entibamiento reglamentario si la profundidad supera 1.20m o si el suelo es inestable." },
      { num: 3, titulo: "Acopio Seguro", desc: "Mantener la tierra extraída a más de 0.60m del borde superior de la zanja." },
      { num: 4, titulo: "Vías de Escape", desc: "Instalar escaleras de salida reglamentarias cada 7.5 metros de recorrido." }
    ],
    checklist: [
      "Estudio de interferencias subterráneas verificado (Gas, Electricidad, Agua)",
      "Entibamiento o apuntalamiento colocado para zanjas con profundidad > 1.20m",
      "Material de desmonte acopiado a distancia segura (> 0.60m del borde)",
      "Escaleras de ingreso y egreso rápido ubicadas a no más de 7.5m",
      "Vallas físicas rígidas en el perímetro para evitar caídas de terceros",
      "Inspección de grietas o taludes tras lluvias o vibraciones de maquinaria",
      "Uso obligatorio de casco, botas de seguridad y chaleco reflectivo"
    ]
  },
  {
    id: "electrico",
    titulo: "Riesgo Eléctrico / LOTO",
    subtitulo: "Intervención en tableros, cableados de obra y bloqueo de energía",
    icono: "Zap",
    colorBg: "bg-yellow-600 hover:bg-yellow-700",
    colorBadge: "bg-yellow-100 text-yellow-800",
    resoluciones: [
      { norma: "Dec. 911/96 (Arts. 79-90)", desc: "Instalaciones eléctricas provisorias, disyuntores diferenciales y puestas a tierra." },
      { norma: "Reglamentación AEA 90364", desc: "Asociación Electrotécnica Argentina - Instalaciones de obra y protecciones." },
      { norma: "Res. SRT 3068/14", desc: "Reglamento para la ejecución de trabajos con tensión en baja tensión." }
    ],
    pasos: [
      { num: 1, titulo: "5 Reglas de Oro", desc: "Corte visible, bloqueo (LOTO), verificar ausencia de tensión, puesta a tierra en cortocircuito y señalizar." },
      { num: 2, titulo: "Herramientas 1000V", desc: "Utilizar herramientas de mano aisladas bajo norma IRAM-IEC 60900." },
      { num: 3, titulo: "Tablero Eléctrico", desc: "Verificar disyuntor de 30 mA y jabalina de tierra con conexionado firme." },
      { num: 4, titulo: "Bloqueo Físico", desc: "Colocar candado de seguridad individual y tarjeta de 'NO OPERAR'." }
    ],
    checklist: [
      "Aplicación de las 5 Reglas de Oro de seguridad eléctrica",
      "Bloqueo con candado personal y tarjeta de seguridad (LOTO) en interruptor",
      "Comprobación con multímetro o tester de ausencia de tensión",
      "Guantes dieléctricos ensayados para el nivel de tensión adecuado",
      "Herramientas manuales aisladas a 1000V certificadas",
      "Tablero provisorio con disyuntor diferencial de 30mA y puesta a tierra probada"
    ]
  },
  {
    id: "confinado",
    titulo: "Espacios Confinados",
    subtitulo: "Cisternas, tanques, túneles, pozos o recintos con poca ventilación",
    icono: "Box",
    colorBg: "bg-purple-700 hover:bg-purple-800",
    colorBadge: "bg-purple-100 text-purple-800",
    resoluciones: [
      { norma: "Norma IRAM 3954", desc: "Seguridad y procedimientos para trabajos en espacios confinados." },
      { norma: "Dec. 351/79 (Cap. 11)", desc: "Ventilación, atmósferas peligrosas y concentración máxima admisible de contaminantes." },
      { norma: "Res. SRT 299/11", desc: "Protección respiratoria certificada y equipos autónomos." }
    ],
    pasos: [
      { num: 1, titulo: "Monitoreo Gases", desc: "Medir Oxígeno (19.5% - 23.5%), explosividad (LEL < 10%) y gases tóxicos (CO, H2S)." },
      { num: 2, titulo: "Ventilación Forzada", desc: "Inyectar aire limpio de forma ininterrumpida durante toda la jornada." },
      { num: 3, titulo: "Vigía Permanente", desc: "Un operario en el exterior en comunicación visual y radial constante." },
      { num: 4, titulo: "Sistema de Rescate", desc: "Trípode y cabrestante conectado al arnés del operario antes de ingresar." }
    ],
    checklist: [
      "Medición previa y continua de atmósfera interior (O2, LEL, CO, H2S)",
      "Ventilación mecánica forzada en funcionamiento continuo",
      "Vigía exterior apostado con medio de comunicación directo",
      "Trípode con torno de rescate y cabo de recuperación amarrado al arnés",
      "Luminaria antiexplosiva de bajo voltaje (12V/24V)",
      "Permiso específico de ingreso firmado con hora de entrada y salida"
    ]
  },
  {
    id: "caliente",
    titulo: "Trabajo en Caliente",
    subtitulo: "Soldadura, corte con amoladora, oxicorte y fuentes de ignición",
    icono: "Flame",
    colorBg: "bg-red-600 hover:bg-red-700",
    colorBadge: "bg-red-100 text-red-800",
    resoluciones: [
      { norma: "Dec. 911/96 (Arts. 131-137)", desc: "Soldadura y corte: Ventilación, biombos ignífugos y tubos de gas comprimido." },
      { norma: "Dec. 351/79 (Cap. 18)", desc: "Protección contra incendios: Dotación y tipos de extintores." },
      { norma: "Norma IRAM 3517", desc: "Control, carga y mantenimiento de matafuegos triclase ABC." }
    ],
    pasos: [
      { num: 1, titulo: "Despeje 10 Metros", desc: "Retirar o cubrir con mantas ignífugas cualquier material combustible a 10 metros a la redonda." },
      { num: 2, titulo: "Extintor al Pie", desc: "Disponer de un matafuegos de polvo químico ABC de 5kg o 10kg cargado y vigente al lado." },
      { num: 3, titulo: "EPP Específico", desc: "Máscara de soldar, guantes largos de descarne, delantal y polainas de cuero." },
      { num: 4, titulo: "Guardia Posterior", desc: "Monitorear el área durante 30 minutos tras finalizar los trabajos por posible ignición lenta." }
    ],
    checklist: [
      "Radio de 10 metros libre de materiales combustibles o inflamables",
      "Extintor ABC cargado, presurizado y con tarjeta de control vigente al pie de la tarea",
      "Mamparas o biombos ignífugos para evitar proyección de chispas a transeúntes",
      "Cilindros de gas comprimido (oxígeno/acetileno) asegurados verticalmente con cadena",
      "Válvulas arrestallamas colocadas en mango del soplete y salida de tubos",
      "EPP de soldador verificado (Máscara fotosensible, guantes y delantal de cuero)"
    ]
  },
  {
    id: "izaje",
    titulo: "Izaje de Cargas / Grúas",
    subtitulo: "Operación de hidrogrúas, plumas, eslingas, ganchos y montacargas",
    icono: "Anchor",
    colorBg: "bg-teal-700 hover:bg-teal-800",
    colorBadge: "bg-teal-100 text-teal-800",
    resoluciones: [
      { norma: "Dec. 911/96 (Arts. 106-130)", desc: "Aparatos elevadores, cables, cadenas, ganchos y frenos de seguridad." },
      { norma: "Norma IRAM 5378", desc: "Inspección y criterios de descarte de eslingas de faja sintética y cables de acero." },
      { norma: "Res. SRT 550/11", desc: "Requisitos de seguridad para grúas y montacargas de obra." }
    ],
    pasos: [
      { num: 1, titulo: "Aptitud Operador", desc: "Comprobar habilitación/registro del gruista y verificación técnica vigente del equipo." },
      { num: 2, titulo: "Estabilizadores", desc: "Extender al 100% las patas estabilizadoras sobre tacos de madera en suelo consolidado." },
      { num: 3, titulo: "Zona de Exclusión", desc: "Delimitar perímetro de giro; prohibición terminante de permanecer bajo la carga suspendida." },
      { num: 4, titulo: "Rigger Designado", desc: "Solo un señalero designado debe comunicarse con el operador de la grúa." }
    ],
    checklist: [
      "Inspección de eslingas y grilletes (sin cortes, deformaciones ni quemaduras)",
      "Pestillo de seguridad del gancho en perfecto estado de funcionamiento",
      "Estabilizadores de grúa extendidos con apoyos sobre suelo firme",
      "Perímetro de maniobra delimitado y despejado de personal no autorizado",
      "Cables o cuerdas guías (vientos) atados a la carga para orientarla a distancia",
      "Rigger o señalero identificado con chaleco reflectivo reglamentario"
    ]
  }
];
