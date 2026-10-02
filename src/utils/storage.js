// src/utils/storage.js
// Utilidad para guardar y recuperar el historial de permisos en LocalStorage (Offline)

const STORAGE_KEY = 'hys_permisos_emitidos_v1';

export function getHistorialPermisos() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error al leer historial de permisos:', error);
    return [];
  }
}

export function guardarPermisoEnHistorial(permiso) {
  try {
    const actuales = getHistorialPermisos();
    // Guardar al inicio (el más reciente primero)
    const nuevos = [permiso, ...actuales];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevos));
    return nuevos;
  } catch (error) {
    console.error('Error al guardar permiso:', error);
    return [];
  }
}

export function eliminarPermisoDeHistorial(id) {
  try {
    const actuales = getHistorialPermisos();
    const filtrados = actuales.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtrados));
    return filtrados;
  } catch (error) {
    console.error('Error al eliminar permiso:', error);
    return [];
  }
}

export function limpiarTodoElHistorial() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (error) {
    console.error('Error al limpiar historial:', error);
    return [];
  }
}
