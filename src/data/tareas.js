// src/data/tareas.js
// Base de datos local de tareas críticas de Seguridad e Higiene Laboral.
// Cada tarea contiene:
//   - resoluciones[]: marco normativo aplicable (norma, resumen y detalle desplegable)
//   - operativa: guía técnica en 4 ejes (qué hacer, métodos, planillas, prevención)
//   - pasos[]: protocolo de actuación en campo (orden obligatorio)
//   - checklist[]: verificación operativa previa a la habilitación

export const TAREAS_CRITICAS = [
  {
    id: "altura",
    titulo: "Trabajo en Altura",
    subtitulo: "Tareas a más de 2.00 metros sobre el nivel del suelo",
    icono: "Mountain",
    colorBg: "bg-red-600 hover:bg-red-700",
    colorBadge: "bg-red-100 text-red-700",
    tema: "oscuro",
    resoluciones: [
      {
        norma: "Dec. 911/96 (Arts. 53-61)",
        desc: "Higiene y Seguridad en Construcción: andamios, escaleras y prevención de caídas a distinto nivel.",
        detalle: "Regula la ejecución de trabajos en altura en obra: plataformas y andamios con barandas y zócalos reglamentarios, escaleras y prevención de caídas. Exige protección colectiva y, cuando no resulta posible, sistemas anticaídas personales certificados."
      },
      {
        norma: "Res. SRT 299/11",
        desc: "Entrega obligatoria y certificación de EPP (arnés integral con sello IRAM).",
        detalle: "Obliga a la entrega, certificación y control de los Elementos de Protección Personal. Para trabajo en altura exige arnés integral con certificación IRAM y registro de entrega firmado por el trabajador."
      },
      {
        norma: "Norma IRAM 3622-1",
        desc: "Sistemas anticaídas, conectores, puntos de anclaje (resistencia mínima 22 kN) y cabos dobles con absorbedor.",
        detalle: "Fija los requisitos de los sistemas anticaídas: conectores, cabos de anclaje, absorbedores de energía y puntos de anclaje con resistencia mínima de 22 kN. Define el uso de cabo doble en 'Y' para permanecer conectado durante los desplazamientos."
      },
      {
        norma: "Ley Nacional 19.587",
        desc: "Marco regulatorio general de Higiene y Seguridad en el Trabajo.",
        detalle: "Establece el marco general de Higiene y Seguridad en el Trabajo: obligación del empleador de garantizar condiciones seguras y del trabajador de cumplir las medidas de prevención dispuestas."
      }
    ],
    operativa: {
      queHacer: [
        "Verificar el estado del andamio o plataforma antes del ascenso: nivelación, amarres, barandas y zócalos.",
        "Seleccionar y comprobar un punto de anclaje resistente (mínimo 22 kN) o una línea de vida certificada.",
        "Colocar y ajustar el arnés de cuerpo completo con cabo doble en 'Y' y absorbedor de energía.",
        "Delimitar y señalizar la zona inferior con malla naranja, vallas o cinta de peligro para evitar el impacto de objetos caídos.",
        "Suscribir el Permiso de Trabajo Seguro (PTS) antes de iniciar la tarea."
      ],
      metodosTrabajo: [
        "Andamios certificados con plataforma completa, barandas a 1 m y 0,50 m y zócalo de 15 cm.",
        "Plataformas elevadoras móviles de personal (PEMP), operadas por personal habilitado y con arnés conectado.",
        "Escaleras reglamentarias solo para accesos y trabajos de corta duración, fijadas y con inclinación adecuada.",
        "Líneas de vida horizontales o verticales y sistemas retráctiles para desplazamientos continuos."
      ],
      tiposInforme: [
        "Permiso de Trabajo Seguro (PTS) suscrito por el capataz o Maestro Mayor de Obra.",
        "Checklist de inspección de arnés, cabos, conectores y puntos de anclaje.",
        "Registro de entrega de EPP con firma del trabajador (Res. SRT 299/11).",
        "Certificado de capacitación específica en trabajo en altura."
      ],
      prevencion: [
        "Priorizar la protección colectiva (barandas, redes, plataformas) por sobre la individual.",
        "Inspección diaria de los equipos y descarte ante cortes, quemaduras o deformaciones.",
        "Suspender la tarea con vientos superiores a 40 km/h, lluvia o tormenta eléctrica.",
        "Supervisión permanente y aplicación de la Autoridad de Detención de Tareas ante cualquier desvío."
      ]
    },
    pasos: [
      { num: 1, titulo: "Inspección Previa", desc: "Verificar andamios nivelados, tablones amarrados y que la velocidad del viento no supere los 40 km/h." },
      { num: 2, titulo: "Punto de Anclaje", desc: "Fijar cabo a línea de vida independiente certificada o estructura resistente comprobada." },
      { num: 3, titulo: "Revisión EPP", desc: "Inspeccionar las costuras del arnés, los mosquetones con doble traba y el casco con mentonera ajustada." },
      { num: 4, titulo: "Permiso Firmado", desc: "El Capataz o Maestro Mayor de Obra debe suscribir el PTS antes del ascenso." }
    ],
    checklist: [
      "Arnés de seguridad de cuerpo completo certificado (IRAM 3622)",
      "Cabo de vida doble en 'Y' con amortiguador de impacto",
      "Casco de seguridad con mentonera de tres puntos ajustada a la barbilla",
      "Línea de vida independiente fijada a estructura resistente (> 22 kN)",
      "Andamio con barandas reglamentarias (1m y 0.50m) y zócalos de 15 cm",
      "Tablones metálicos o de madera sana trabados y amarrados",
      "Zona inferior delimitada y señalizada con malla naranja, vallas o cinta de peligro",
      "Calzado de seguridad dieléctrico con suela antideslizante limpia"
    ]
  },
  {
    id: "excavacion",
    titulo: "Excavación y Zanjas",
    subtitulo: "Apertura de zanjas, pozos, bases y movimientos de suelo",
    icono: "Tractor",
    colorBg: "bg-amber-400 hover:bg-amber-500",
    colorBadge: "bg-amber-100 text-amber-800",
    tema: "claro",
    resoluciones: [
      {
        norma: "Res. SRT 503/14",
        desc: "Resolución obligatoria para excavación, submuración y movimiento de suelos en construcción.",
        detalle: "Establece los requisitos mínimos de seguridad para excavaciones, submuración y movimiento de suelos en construcción. Su cumplimiento es obligatorio para empleadores y trabajadores del sector."
      },
      {
        norma: "Dec. 911/96 (Arts. 138-160)",
        desc: "Excavaciones: talud natural, entibado obligatorio a partir de 1.20 metros de profundidad.",
        detalle: "Regula las excavaciones: entibado o apuntalamiento obligatorio a partir de 1,20 m de profundidad o en suelos inestables, taludes seguros, acopio a distancia y vías de acceso y escape a la zanja."
      },
      {
        norma: "Res. SRT 550/11",
        desc: "Intervención preventiva en demolición y movimientos de tierra.",
        detalle: "Refuerza la intervención preventiva en demoliciones, movimiento de tierras y tareas de excavación, exigiendo el relevamiento previo de interferencias y la planificación de la tarea."
      }
    ],
    operativa: {
      queHacer: [
        "Solicitar y verificar el relevamiento de interferencias subterráneas (gas, electricidad, agua, cloacas).",
        "Definir talud natural o entibamiento según la profundidad y el tipo de suelo.",
        "Acopiar el material extraído a más de 0,60 m del borde superior.",
        "Colocar escaleras de acceso cada 7,5 m de recorrido y vallado perimetral con malla de señalización naranja.",
        "Inspeccionar los taludes tras lluvias o vibraciones de maquinaria."
      ],
      metodosTrabajo: [
        "Entibado metálico o de madera sana, colocado de arriba hacia abajo y retirado de abajo hacia arriba.",
        "Taludado conforme al ángulo de reposo del suelo, según estudio de suelos.",
        "Excavación mecánica con supervisión y distancias de seguridad a tendidos y estructuras.",
        "Bombeo o drenaje para el control del agua en el fondo de la zanja."
      ],
      tiposInforme: [
        "Permiso de Trabajo Seguro (PTS) para excavación.",
        "Estudio de interferencias y autorización de las empresas de servicios.",
        "Checklist de inspección de zanja (entibado, acopio, accesos y señalización).",
        "Informe de condición del suelo o estudio geotécnico cuando corresponda."
      ],
      prevencion: [
        "Prohibir el ingreso a zanjas sin entibado o talud cuando la profundidad supera 1,20 m.",
        "Vallado rígido y malla de señalización naranja para evitar caídas de personas y de vehículos.",
        "Uso obligatorio de casco, botas de seguridad y chaleco de alta visibilidad.",
        "Detener la tarea ante grietas, filtraciones o vibraciones que comprometan la estabilidad."
      ]
    },
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
      "Vallado rígido y malla de señalización naranja en el perímetro para evitar caídas de terceros",
      "Inspección de grietas o taludes tras lluvias o vibraciones de maquinaria",
      "Uso obligatorio de casco, botas de seguridad y chaleco de alta visibilidad"
    ]
  },
  {
    id: "electrico",
    titulo: "Riesgo Eléctrico / LOTO",
    subtitulo: "Intervención en tableros, cableados de obra y bloqueo de energía",
    icono: "Zap",
    colorBg: "bg-orange-500 hover:bg-orange-600",
    colorBadge: "bg-orange-100 text-orange-800",
    tema: "claro",
    resoluciones: [
      {
        norma: "Dec. 911/96 (Arts. 79-90)",
        desc: "Instalaciones eléctricas provisorias, disyuntores diferenciales y puestas a tierra.",
        detalle: "Regula las instalaciones eléctricas provisorias de obra: disyuntor diferencial, puesta a tierra y protecciones. Fija las condiciones de seguridad de tableros, cableados y conexiones."
      },
      {
        norma: "Reglamentación AEA 90364",
        desc: "Asociación Electrotécnica Argentina - Instalaciones de obra y protecciones.",
        detalle: "Reglamentación de la Asociación Electrotécnica Argentina para instalaciones eléctricas de baja tensión. Establece protecciones, secciones de conductores y requisitos de puesta a tierra."
      },
      {
        norma: "Res. SRT 3068/14",
        desc: "Reglamento para la ejecución de trabajos con tensión en baja tensión.",
        detalle: "Reglamento para la ejecución de trabajos con tensión en baja tensión, con requisitos de habilitación del personal, procedimiento de trabajo y elementos de protección dieléctrica."
      }
    ],
    operativa: {
      queHacer: [
        "Aplicar las cinco reglas de oro: corte efectivo, bloqueo y etiquetado (LOTO), verificación de ausencia de tensión, puesta a tierra y en cortocircuito, y señalización.",
        "Verificar el tablero: disyuntor diferencial de 30 mA y puesta a tierra operativa.",
        "Utilizar herramientas aisladas certificadas (IRAM-IEC 60900) y guantes dieléctricos ensayados.",
        "Consignar el equipo con candado personal y tarjeta de 'No operar'."
      ],
      metodosTrabajo: [
        "Trabajos sin tensión (método preferente) mediante consignación y bloqueo LOTO.",
        "Trabajos con tensión únicamente con autorización, procedimiento y EPP dieléctrico.",
        "Delimitación de la zona de trabajo con vallas o cinta de peligro y señalización de riesgo eléctrico.",
        "Medición previa con multímetro o tester, verificando antes su correcto funcionamiento."
      ],
      tiposInforme: [
        "Permiso de Trabajo Seguro (PTS) para riesgo eléctrico.",
        "Checklist de verificación de las cinco reglas de oro.",
        "Registro de consignación (LOTO) con responsables y horarios.",
        "Certificado de habilitación del electricista y ensayo de guantes dieléctricos."
      ],
      prevencion: [
        "Prohibir la intervención por personal no habilitado.",
        "Verificar siempre la ausencia de tensión antes de tocar conductores.",
        "Mantener operativas la puesta a tierra y las protecciones diferenciales de todo tablero de obra.",
        "Respetar la distancia de seguridad a líneas aéreas energizadas."
      ]
    },
    pasos: [
      { num: 1, titulo: "Cinco Reglas de Oro", desc: "Corte visible, bloqueo y etiquetado (LOTO), verificación de ausencia de tensión, puesta a tierra en cortocircuito y señalización de la zona." },
      { num: 2, titulo: "Herramientas 1000V", desc: "Utilizar herramientas de mano aisladas bajo norma IRAM-IEC 60900." },
      { num: 3, titulo: "Tablero Eléctrico", desc: "Verificar el disyuntor diferencial de 30 mA y la jabalina de puesta a tierra con conexionado firme." },
      { num: 4, titulo: "Bloqueo Físico", desc: "Colocar candado de seguridad individual y tarjeta de 'NO OPERAR'." }
    ],
    checklist: [
      "Aplicación de las cinco reglas de oro de seguridad eléctrica",
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
    colorBg: "bg-red-600 hover:bg-red-700",
    colorBadge: "bg-red-100 text-red-700",
    tema: "oscuro",
    resoluciones: [
      {
        norma: "Norma IRAM 3954",
        desc: "Seguridad y procedimientos para trabajos en espacios confinados.",
        detalle: "Norma específica de seguridad y procedimientos para trabajos en espacios confinados: control de atmósfera, ventilación, vigilancia exterior y sistema de rescate previsto antes del ingreso."
      },
      {
        norma: "Dec. 351/79 (Cap. 11)",
        desc: "Ventilación, atmósferas peligrosas y concentración máxima admisible de contaminantes.",
        detalle: "Regula la ventilación y la calidad del aire interior: concentraciones máximas admisibles de contaminantes y condiciones de atmósferas peligrosas en los lugares de trabajo."
      },
      {
        norma: "Res. SRT 299/11",
        desc: "Protección respiratoria certificada y equipos autónomos.",
        detalle: "Exige protección respiratoria certificada y equipos autónomos para atmósferas no respirables, con entrega y control documentado de los elementos."
      }
    ],
    operativa: {
      queHacer: [
        "Medir la atmósfera antes del ingreso: oxígeno (19,5 % - 23,5 %), explosividad (LEL < 10 %) y tóxicos (CO, H2S).",
        "Ventilar de forma forzada e ininterrumpida durante toda la tarea.",
        "Apostar un vigía exterior con comunicación visual y radial permanente.",
        "Conectar el arnés al sistema de rescate (trípode y torno) antes de ingresar.",
        "Emitir un permiso de ingreso con hora de entrada y de salida."
      ],
      metodosTrabajo: [
        "Ventilación mecánica forzada antes y durante el ingreso.",
        "Iluminación antiexplosiva de baja tensión (12/24 V).",
        "Medición continua de la atmósfera con detector multigas calibrado.",
        "Plan de rescate con personal entrenado y equipos disponibles en el punto."
      ],
      tiposInforme: [
        "Permiso de ingreso a espacio confinado (con hora de entrada y salida).",
        "Planilla de medición de atmósfera (O2, LEL, CO, H2S).",
        "Checklist de equipos de rescate y de comunicación.",
        "Certificado de capacitación del vigía y del equipo de rescate."
      ],
      prevencion: [
        "Prohibir el ingreso sin permiso y sin vigía apostado.",
        "Aislar las fuentes de energía (LOTO) y cerrar las líneas que puedan ingresar al recinto.",
        "Utilizar protección respiratoria adecuada al contaminante presente.",
        "Realizar el rescate sin ingreso del rescatista (recuperación con trípode) para no duplicar la víctima."
      ]
    },
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
    colorBg: "bg-orange-500 hover:bg-orange-600",
    colorBadge: "bg-orange-100 text-orange-800",
    tema: "claro",
    resoluciones: [
      {
        norma: "Dec. 911/96 (Arts. 131-137)",
        desc: "Soldadura y corte: ventilación, biombos ignífugos y tubos de gas comprimido.",
        detalle: "Regula los trabajos de soldadura y corte en obra: ventilación del puesto, biombos ignífugos, manejo de tubos de gas comprimido y control de fuentes de ignición cercanas."
      },
      {
        norma: "Dec. 351/79 (Cap. 18)",
        desc: "Protección contra incendios: dotación y tipos de matafuegos.",
        detalle: "Establece la protección contra incendios: dotación, ubicación y tipos de matafuegos según el riesgo del sector, además de la señalización y los medios de escape."
      },
      {
        norma: "Norma IRAM 3517",
        desc: "Control, carga y mantenimiento de matafuegos de polvo químico ABC (triclase).",
        detalle: "Fija el control, la carga y el mantenimiento de los matafuegos, incluyendo la tarjeta de control y la verificación periódica por personal habilitado."
      }
    ],
    operativa: {
      queHacer: [
        "Despejar o proteger con mantas ignífugas todo material combustible en 10 m a la redonda.",
        "Colocar un matafuegos ABC cargado y vigente junto al punto de trabajo.",
        "Verificar el EPP del soldador: máscara, guantes de descarne, delantal y polainas.",
        "Asegurar los cilindros de gas en posición vertical con cadena y válvulas arrestallamas.",
        "Emitir el Permiso de Trabajo en Caliente."
      ],
      metodosTrabajo: [
        "Soldadura eléctrica o autógena con biombos o mamparas ignífugas perimetrales.",
        "Oxicorte con mangueras y reguladores en buen estado y válvulas antirretorno.",
        "Esmerilado y amolado con protección contra la proyección de chispas.",
        "Vigilancia del área durante al menos 30 minutos tras finalizar la tarea."
      ],
      tiposInforme: [
        "Permiso de Trabajo en Caliente (permiso de fuego).",
        "Checklist de verificación de matafuegos y control de fuentes de ignición.",
        "Registro de inspección de cilindros, mangueras y reguladores.",
        "Constancia de inspección y recarga de matafuegos (IRAM 3517)."
      ],
      prevencion: [
        "Separar combustibles e inflamables de la zona de proyección de chispas.",
        "Contar siempre con matafuegos operativo y personal instruido en su uso.",
        "Prohibir el trabajo sin EPP de soldador y sin el permiso correspondiente.",
        "Control posterior para detectar ignición lenta (vigilancia de 30 minutos)."
      ]
    },
    pasos: [
      { num: 1, titulo: "Despeje 10 Metros", desc: "Retirar o cubrir con mantas ignífugas cualquier material combustible a 10 metros a la redonda." },
      { num: 2, titulo: "Matafuegos en el Punto de Trabajo", desc: "Disponer de un matafuegos de polvo químico ABC de 5 kg o 10 kg, cargado y con carga vigente, junto al punto de trabajo." },
      { num: 3, titulo: "EPP Específico", desc: "Máscara de soldar, guantes de descarne (cuero) de caña larga, delantal y polainas de cuero." },
      { num: 4, titulo: "Guardia Posterior", desc: "Monitorear el área durante 30 minutos tras finalizar los trabajos por posible ignición lenta." }
    ],
    checklist: [
      "Radio de 10 metros libre de materiales combustibles o inflamables",
      "Matafuegos ABC cargado, presurizado y con tarjeta de control vigente junto al punto de trabajo",
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
    colorBg: "bg-amber-400 hover:bg-amber-500",
    colorBadge: "bg-amber-100 text-amber-800",
    tema: "claro",
    resoluciones: [
      {
        norma: "Dec. 911/96 (Arts. 106-130)",
        desc: "Aparatos elevadores, cables, cadenas, ganchos y frenos de seguridad.",
        detalle: "Regula los aparatos elevadores: cables, cadenas, ganchos, frenos y dispositivos de seguridad de grúas y montacargas de obra, con verificación técnica periódica."
      },
      {
        norma: "Norma IRAM 5378",
        desc: "Inspección y criterios de descarte de eslingas de faja sintética y cables de acero.",
        detalle: "Establece la inspección y los criterios de descarte de eslingas de faja sintética y de cables de acero, según cortes, quemaduras, deformaciones o desgaste."
      },
      {
        norma: "Res. SRT 550/11",
        desc: "Requisitos de seguridad para grúas y montacargas de obra.",
        detalle: "Fija los requisitos de seguridad para la operación de grúas y montacargas en obra: habilitación del operador, estabilidad del equipo y delimitación de la zona de maniobra."
      }
    ],
    operativa: {
      queHacer: [
        "Verificar la habilitación del operador y la revisión técnica vigente del equipo.",
        "Inspeccionar eslingas, grilletes, ganchos y pestillos de seguridad.",
        "Extender al 100 % los estabilizadores sobre suelo firme y consolidado.",
        "Delimitar la zona de maniobra con vallas o cinta de peligro y prohibir la permanencia bajo carga suspendida.",
        "Designar un único señalero para la comunicación con el operador."
      ],
      metodosTrabajo: [
        "Uso de eslingas y grilletes según la tabla de carga y el ángulo de izaje.",
        "Cuerdas guía (vientos) para orientar la carga a distancia.",
        "Izaje vertical, sin arrastre lateral de la carga.",
        "Comunicación por señas normalizadas o radio con el operador."
      ],
      tiposInforme: [
        "Permiso de Trabajo Seguro (PTS) para izaje.",
        "Checklist de inspección de eslingas, cables, grilletes y ganchos.",
        "Certificado de verificación técnica de la grúa y habilitación del operador.",
        "Plan de izaje para cargas críticas o maniobras complejas."
      ],
      prevencion: [
        "Respetar la capacidad nominal de carga del equipo (tabla de cargas).",
        "Prohibir permanecer o transitar bajo una carga suspendida.",
        "Descartar eslingas con cortes, quemaduras o deformaciones.",
        "Suspender la maniobra con viento fuerte, tormenta o visibilidad reducida."
      ]
    },
    pasos: [
      { num: 1, titulo: "Aptitud Operador", desc: "Comprobar habilitación/registro del gruista y verificación técnica vigente del equipo." },
      { num: 2, titulo: "Estabilizadores", desc: "Extender al 100% las patas estabilizadoras sobre tacos de madera en suelo consolidado." },
      { num: 3, titulo: "Zona de Exclusión", desc: "Delimitar el perímetro de giro con vallas o cinta de peligro; prohibición terminante de permanecer bajo la carga suspendida." },
      { num: 4, titulo: "Señalero Designado", desc: "Únicamente el señalero designado se comunicará con el operador de la grúa." }
    ],
    checklist: [
      "Inspección de eslingas y grilletes (sin cortes, deformaciones ni quemaduras)",
      "Pestillo de seguridad del gancho en perfecto estado de funcionamiento",
      "Estabilizadores de grúa extendidos con apoyos sobre suelo firme",
      "Perímetro de maniobra delimitado con vallas o cinta de peligro y despejado de personal no autorizado",
      "Cables o cuerdas guías (vientos) atados a la carga para orientarla a distancia",
      "Señalero de maniobras identificado con chaleco de alta visibilidad reglamentario"
    ]
  }
];
