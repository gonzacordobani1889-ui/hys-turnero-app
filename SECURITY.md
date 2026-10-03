# Seguridad — Manejo de secretos (API keys)

## Estado actual

La aplicación **no utiliza ninguna API key** en este momento. Todo el
procesamiento (checklists, firma digital, generación de PDF) ocurre 100 % en
el cliente y funciona offline. No hay secretos en el repositorio ni en Vercel.

## Regla para el futuro (asistente con IA u otros servicios)

Si se agrega una integración que requiera credenciales (por ejemplo, un
asistente conversacional con un LLM):

1. **La API key nunca va en el cliente.** No debe aparecer en archivos
   `.js`/`.jsx`, ni en variables `VITE_*`, ni hardcodeada.
2. **La API key vive en Vercel** (`Project → Settings → Environment Variables`)
   y solo la consume una **Serverless Function** (carpeta `api/` de Vercel).
3. **El cliente habla con nuestra Serverless Function**, no con el proveedor
   directamente. Nuestra función es la única que conoce la key.
4. **Nunca commitear `.env`** (ya está ignorado por `.gitignore`). Usar
   `.env.example` como plantilla documental, sin valores reales.
5. Antes de cada deploy, revisar que no haya secretos en el diff:
   `git diff main -- . ':!package-lock.json'`

## Checklist previo a un deploy a Vercel

- [ ] `grep -rE "sk-[A-Za-z0-9]{8,}" src/ public/` no devuelve resultados.
- [ ] No existe `VITE_*` con valores secretos en Vercel ni en `.env`.
- [ ] Las Serverless Functions validan y limitan el uso (rate limit, origen).
