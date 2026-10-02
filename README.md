# HyS Tótem Operativo ⚠️👷‍♂️
> Asistente de Campo para Técnicos en Seguridad e Higiene Laboral &middot; Interfaz Táctil estilo Turnero

Aplicación web y PWA diseñada para agilizar y respaldar legalmente las inspecciones de seguridad en frentes de obra y plantas industriales. Inspirada en la simplicidad y accesibilidad de un tótem/turnero de autoatención.

---

## 🌟 Características Principales

1. **Interfaz Táctil estilo Turnero:**
   - Botones gigantes de alto contraste para las tareas críticas más frecuentes:
     - 🧗‍♂️ *Trabajo en Altura (> 2.00 m)*
     - 🚜 *Excavación y Zanjas*
     - ⚡ *Riesgo Eléctrico / LOTO*
     - 🕳️ *Espacios Confinados*
     - 🔥 *Trabajo en Caliente*
     - 🏗️ *Izaje de Cargas / Grúas*
   - Diseñada para operarse con una sola mano, en pantallas bajo el sol o con guantes de trabajo.

2. **Resoluciones y Marco Normativo por Encima:**
   - Citas legales precisas de la **SRT (Superintendencia de Riesgos del Trabajo)**, **Decreto 911/96**, **Res. SRT 503/14**, **Res. SRT 299/11 (EPP)** y normas **IRAM**.
   - Protocolo operativo rápido en 4 pasos obligatorios antes de iniciar las tareas.
   - Criterio de **Stop Work Authority (Detención de Tareas)** visible.

3. **Check List Dinámico de Terreno:**
   - Verificación interactiva de condiciones de seguridad y elementos de protección personal.
   - Cálculo automático del porcentaje de cumplimiento.
   - Bloqueo de seguridad: No permite emitir el permiso si falta verificar el 100% de los ítems.

4. **Planilla para Capataz / Maestro Mayor de Obra (M.M.O.):**
   - Formulario de **Permiso de Trabajo Seguro (PTS)**.
   - **Lienzo táctil (Canvas) para firma digital con el dedo**.
   - Generación instantánea de **PDF oficial** con código único de registro, tabla de verificación, resoluciones y firma digital estampada.

---

## 🚀 Tecnologías Utilizadas

- **React 19**
- **Vite 8**
- **Tailwind CSS v4**
- **Lucide React** (Iconografía técnica)
- **jsPDF & jsPDF-AutoTable** (Generación de PDF en el cliente)
- **PWA (Progressive Web App)** con soporte Offline

---

## 💻 Instalación y Uso Local

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd hys-turnero-app

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev

# 4. Construir para producción
npm run build
```
