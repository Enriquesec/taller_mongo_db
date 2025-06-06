/**
 * =======================================================
 * EJERCICIO: GESTIÓN DE NOTAS DE ESTUDIANTES (para mongosh)
 * =======================================================
 *
 * Objetivo: Practicar operaciones CRUD y filtros básicos en MongoDB.
 * Base de Datos a Usar: 'gestionEscolar'
 */

// --- Parte 1: Preparación del Entorno ---

// Seleccionar la base de datos para este ejercicio.
// Si no existe, se creará al insertar el primer documento.
use gestionEscolar;
print("Base de datos 'gestionEscolar' seleccionada.");

// Opcional: Eliminar colecciones si ya existen para empezar desde cero.
// ¡Cuidado! Esto borrará todos los datos existentes en estas colecciones.
db.estudiantes.drop();
db.materias.drop();
db.calificaciones.drop();
print("Colecciones limpiadas (si existían).");


// --- Parte 2: Inserción de Datos (CRUD: CREATE) ---

// Colección: 'estudiantes'
db.estudiantes.insertMany([
  { nombre: "Ana García", edad: 20, ciudad: "Dolores Hidalgo", activo: true },
  { nombre: "Luis Pérez", edad: 21, ciudad: "San Miguel de Allende", activo: true },
  { nombre: "Sofía Martínez", edad: 19, ciudad: "Dolores Hidalgo", activo: false },
  { nombre: "Pedro López", edad: 22, ciudad: "Guanajuato", activo: true },
  { nombre: "Laura Díaz", edad: 20, ciudad: "Dolores Hidalgo", activo: true },
  { nombre: "Diego Morales", edad: 23, ciudad: "Querétaro", activo: false }
]);
print("Estudiantes insertados.");

// Colección: 'materias'
db.materias.insertMany([
  { nombre: "Matemáticas I", codigo: "MAT101", creditos: 5 },
  { nombre: "Historia de México", codigo: "HIS201", creditos: 4 },
  { nombre: "Programación Básica", codigo: "PRO101", creditos: 6 },
  { nombre: "Literatura Española", codigo: "LIT301", creditos: 4 },
  { nombre: "Física Fundamental", codigo: "FIS202", creditos: 5 }
]);
print("Materias insertadas.");

// Colección: 'calificaciones' (con referencias a IDs)
// Primero, obtenemos los _id generados automáticamente de los documentos anteriores
let anaId = db.estudiantes.findOne({ nombre: "Ana García" })._id;
let luisId = db.estudiantes.findOne({ nombre: "Luis Pérez" })._id;
let sofiaId = db.estudiantes.findOne({ nombre: "Sofía Martínez" })._id;
let pedroId = db.estudiantes.findOne({ nombre: "Pedro López" })._id;
let lauraId = db.estudiantes.findOne({ nombre: "Laura Díaz" })._id;

let mat101Id = db.materias.findOne({ codigo: "MAT101" })._id;
let his201Id = db.materias.findOne({ codigo: "HIS201" })._id;
let pro101Id = db.materias.findOne({ codigo: "PRO101" })._id;
let lit301Id = db.materias.findOne({ codigo: "LIT301" })._id;
let fis202Id = db.materias.findOne({ codigo: "FIS202" })._id;

db.calificaciones.insertMany([
  { estudianteId: anaId, materiaId: mat101Id, nota: 95, fecha: new Date("2024-05-20T10:00:00Z") },
  { estudianteId: anaId, materiaId: pro101Id, nota: 88, fecha: new Date("2024-05-21T11:00:00Z") },
  { estudianteId: luisId, materiaId: his201Id, nota: 75, fecha: new Date("2024-05-22T09:00:00Z") },
  { estudianteId: luisId, materiaId: mat101Id, nota: 80, fecha: new Date("2024-05-23T14:00:00Z") },
  { estudianteId: sofiaId, materiaId: pro101Id, nota: 60, fecha: new Date("2024-05-24T16:00:00Z") }, // Reprobado
  { estudianteId: pedroId, materiaId: lit301Id, nota: 90, fecha: new Date("2024-05-25T13:00:00Z") },
  { estudianteId: lauraId, materiaId: fis202Id, nota: 85, fecha: new Date("2024-05-26T10:00:00Z") }
]);
print("Calificaciones insertadas.");


// --- Parte 3: Ejercicios de Consulta (CRUD: READ y Filtros) ---

// 1. Mostrar Todos:
// Muestra todos los estudiantes registrados. Formatea la salida para que sea legible.
db.estudiantes.find({}).pretty();

// 2. Filtrar por Valor Exacto:
// Encuentra todos los estudiantes que sean de la `ciudad` "Dolores Hidalgo".
db.estudiantes.find({ ciudad: "Dolores Hidalgo" }).pretty();

// Muestra la materia con el `código` "PRO101".
db.materias.findOne({ codigo: "PRO101" }).pretty();

// 3. Filtrar con Operadores de Comparación:
// Lista los estudiantes que tienen `edad` mayor o igual a 21.
db.estudiantes.find({ edad: { $gte: 21 } }).pretty();

// Encuentra las calificaciones que son menores a 70 (notas reprobatorias).
db.calificaciones.find({ nota: { $lt: 70 } }).pretty();

// 4. Filtrar con Múltiples Criterios (AND implícito):
// Muestra los estudiantes que tienen `edad` 20 Y están `activo: true`.
db.estudiantes.find({ edad: 20, activo: true }).pretty();

// 5. Proyección (Mostrar solo algunos campos):
// Muestra solo el `nombre` y `creditos` de todas las materias. Excluye el `_id`.
db.materias.find({}, { nombre: 1, creditos: 1, _id: 0 }).pretty();

// 6. Contar Documentos:
// ¿Cuántos estudiantes están `activo: true`?
db.estudiantes.countDocuments({ activo: true });

// ¿Cuántas materias tienen `creditos` igual a 5?
db.materias.countDocuments({ creditos: 5 });


// --- Parte 4: Ejercicios de Actualización (CRUD: UPDATE) ---

// 1. Actualizar un Solo Campo:
// Cambia la `edad` de "Ana García" a `21`.
db.estudiantes.updateOne(
  { nombre: "Ana García" },
  { $set: { edad: 21 } }
);
print("Edad de Ana García actualizada.");
// Verifica la actualización:
db.estudiantes.findOne({ nombre: "Ana García" }).pretty();

// 2. Actualizar Múltiples Documentos:
// Marca como `activo: false` a todos los estudiantes que son de "Guanajuato".
db.estudiantes.updateMany(
  { ciudad: "Guanajuato" },
  { $set: { activo: false } }
);
print("Estudiantes de Guanajuato marcados como inactivos.");
// Verifica la actualización:
db.estudiantes.find({ ciudad: "Guanajuato" }).pretty();

// 3. Incrementar un Valor Numérico:
// Aumenta los `creditos` de la materia "Historia de México" en `1`.
db.materias.updateOne(
  { nombre: "Historia de México" },
  { $inc: { creditos: 1 } }
);
print("Créditos de Historia de México incrementados.");
// Verifica la actualización:
db.materias.findOne({ nombre: "Historia de México" }).pretty();


// --- Parte 5: Ejercicios de Eliminación (CRUD: DELETE) ---

// 1. Eliminar un Solo Documento:
// Elimina al estudiante "Diego Morales".
db.estudiantes.deleteOne({ nombre: "Diego Morales" });
print("Estudiante Diego Morales eliminado.");
// Verifica la eliminación:
db.estudiantes.find({ nombre: "Diego Morales" }).pretty(); // Debería devolver 'null'

// 2. Eliminar Múltiples Documentos:
// Borra todas las calificaciones que sean menores a 70.
db.calificaciones.deleteMany({ nota: { $lt: 70 } });
print("Calificaciones reprobatorias eliminadas.");
// Verifica la eliminación:
db.calificaciones.find({ nota: { $lt: 70 } }).pretty(); // Debería no devolver nada