// Clase 2: Profundizando en CRUD y Operadores Adicionales
// Taller Remedial MongoDB

use alumnos

// --------------------------------------------------------------------------------------
// Nota sobre la visualización de resultados:
// Cuando ejecutas un comando como `db.alumnos.find()`, la consola de MongoDB (mongosh)
// mostrará automáticamente los documentos. Por defecto, suele mostrar hasta 20 documentos.
// Si hay más, te indicará cómo ver los siguientes.
// Usaremos `printjson()` para mostrar objetos específicos o resultados de operaciones.
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// Pre-requisito: Asegurarse de tener datos de la Clase 1.
// Si es necesario, vuelve a ejecutar los inserts de la Clase 1 o los siguientes:
/*
db.alumnos.drop() // Elimina la colección para empezar de cero si es necesario

db.alumnos.insertMany([
  { nombre: "Brayan", edad: 19, carrera: "Desarrollo de Software", deporte: "ciclismo", inscrito: true },
  { nombre: "Manuel", edad: 18, carrera: "Desarrollo de Software", deporte: "power lifting", inscrito: true },
  { nombre: "Maria", edad: 20, carrera: "Matematicas", inscrito: false, promedio: 85 },
  { _id: 'ABC123', nombre: "Juan", edad: 23, carrera: "Turismo", matricula: 'ABC123', inscrito: true, promedio: 90 },
  { nombre: "Jhonatan", edad: 18, carrera: "Desarrollo de Software", deporte: "ninguno", inscrito: false },
  { _id: "DEF456", nombre: "Jessica", edad: 20, carrera: "Turismo", inscrito: true, promedio: 88 },
  { nombre: "Joaquine", edad: 14, carrera: "Secundaria", inscrito: true }
]);
*/
// --------------------------------------------------------------------------------------

print("\n--- Operaciones de Lectura Avanzadas ---");

// 1. Proyecciones: Seleccionar qué campos devolver
print("\n[INFO] Alumnos (solo nombre y carrera). El _id se incluye por defecto:");
db.alumnos.find({}, { nombre: 1, carrera: 1 });
// La consola mostrará los documentos resultantes.

print("\n[INFO] Alumnos (solo nombre y carrera, sin _id):");
db.alumnos.find({}, { nombre: 1, carrera: 1, _id: 0 });
// La consola mostrará los documentos resultantes.

// 2. Sort: Ordenar los resultados
print("\n[INFO] Alumnos ordenados por edad (descendente):");
db.alumnos.find().sort({ edad: -1 });
// La consola mostrará los documentos ordenados.

print("\n[INFO] Alumnos ordenados por carrera (asc) y edad (desc):");
db.alumnos.find().sort({ carrera: 1, edad: -1 });
// La consola mostrará los documentos ordenados.

// 3. Limit y Skip: Paginación de resultados
print("\n[INFO] Los 2 siguientes alumnos después de saltar el primero:");
db.alumnos.find().skip(1).limit(2);
// La consola mostrará los 2 documentos resultantes.

// 4. CountDocuments: Contar documentos que coinciden con un criterio
const countDesarrollo = db.alumnos.countDocuments({ carrera: "Desarrollo de Software" });
print("\n[INFO] Número de alumnos en Desarrollo de Software: " + countDesarrollo);

const totalAlumnos = db.alumnos.countDocuments({});
print("[INFO] Número total de alumnos: " + totalAlumnos);

// 5. Operadores de Consulta Adicionales

print("\n[INFO] Alumnos de Turismo O edad <= 18:");
db.alumnos.find({
  $or: [
    { carrera: "Turismo" },
    { edad: { $lte: 18 } }
  ]
});
// La consola mostrará los documentos que cumplen la condición OR.

print("\n[INFO] Alumnos en Matematicas o Turismo (usando $in):");
db.alumnos.find({ carrera: { $in: ["Matematicas", "Turismo"] } });
// La consola mostrará los documentos que cumplen la condición IN.

print("\n[INFO] Alumnos que NO están en Desarrollo de Software o Turismo (usando $nin):");
db.alumnos.find({ carrera: { $nin: ["Desarrollo de Software", "Turismo"] } });
// La consola mostrará los documentos que cumplen la condición NIN.

print("\n[INFO] Alumnos que SÍ tienen el campo 'deporte' (usando $exists):");
db.alumnos.find({ deporte: { $exists: true } });
// La consola mostrará los alumnos con el campo 'deporte'.

print("\n[INFO] Alumnos que NO tienen el campo 'promedio' (usando $exists):");
db.alumnos.find({ promedio: { $exists: false } });
// La consola mostrará los alumnos sin el campo 'promedio'.


// ---------------------
// Update (Actualizar documentos) - Avanzado
// ---------------------
print("\n--- Operaciones de Actualización Avanzadas ---");

// 1. $unset: Eliminar un campo de un documento
print("\n[INFO] Actualizando a Brayan: eliminando campo 'deporte'.");
const unsetResult = db.alumnos.updateOne(
  { nombre: "Brayan" },
  { $unset: { deporte: "" } } // El valor asignado a $unset no importa, solo la clave
);
printjson(unsetResult); // Muestra el resultado de la operación de actualización

print("[RESULT] Brayan después de $unset 'deporte':");
printjson(db.alumnos.findOne({ nombre: "Brayan" })); // Muestra el documento específico

// 2. $inc: Incrementar (o decrementar) un valor numérico
print("\n[INFO] Actualizando a Maria: incrementando edad en 1 y añadiendo/incrementando asistencias.");
const incResultMaria = db.alumnos.updateOne(
  { nombre: "Maria" },
  {
    $inc: { edad: 1, asistencias: 5 } // Si asistencias no existe, lo crea con valor 5
  }
);
printjson(incResultMaria);

print("[RESULT] Maria después de $inc 'edad' y 'asistencias':");
printjson(db.alumnos.findOne({ nombre: "Maria" }));

// 3. upsert: Insertar un documento si no se encuentra para actualizar
print("\n[INFO] Actualizando (o insertando si no existe) a Laura:");
const upsertResultLaura = db.alumnos.updateOne(
  { nombre: "Laura" },
  {
    $set: {
      edad: 22,
      carrera: "Diseño Gráfico",
      inscrito: true,
      fechaRegistro: new Date()
    }
  },
  { upsert: true } // Opción upsert
);
printjson(upsertResultLaura); // Muestra si fue modificado o insertado

print("[RESULT] Documento de Laura (buscándola):");
printjson(db.alumnos.findOne({ nombre: "Laura" }));

// 4. Operaciones con Arrays
print("\n[INFO] Añadiendo hobbies a Manuel.");
db.alumnos.updateOne(
  { nombre: "Manuel" },
  { $set: { hobbies: ["leer", "videojuegos"] } }
);
print("[RESULT] Manuel con hobbies:");
printjson(db.alumnos.findOne({ nombre: "Manuel" }));

print("\n[INFO] Añadiendo 'programar' a los hobbies de Manuel con $push.");
db.alumnos.updateOne(
  { nombre: "Manuel" },
  { $push: { hobbies: "programar" } }
);
print("[RESULT] Manuel después de $push 'programar':");
printjson(db.alumnos.findOne({ nombre: "Manuel" }));

print("\n[INFO] Usando $addToSet para hobbies de Manuel (añadir 'leer' y 'cine').");
db.alumnos.updateOne(
  { nombre: "Manuel" },
  { $addToSet: { hobbies: { $each: ["leer", "cine"] } } } // 'leer' ya existe, 'cine' es nuevo
);
print("[RESULT] Manuel después de $addToSet 'leer' y 'cine':");
printjson(db.alumnos.findOne({ nombre: "Manuel" }));

print("\n[INFO] Eliminando 'videojuegos' de los hobbies de Manuel con $pull.");
db.alumnos.updateOne(
  { nombre: "Manuel" },
  { $pull: { hobbies: "videojuegos" } }
);
print("[RESULT] Manuel después de $pull 'videojuegos':");
printjson(db.alumnos.findOne({ nombre: "Manuel" }));

// Añadir un array de calificaciones a algunos alumnos para el siguiente ejemplo
db.alumnos.updateOne({ nombre: "Juan" }, { $set: { calificaciones: [7, 8, 9, 6] } });
db.alumnos.updateOne({ nombre: "Jessica" }, { $set: { calificaciones: [10, 9, 9, 8] } });
print("\n[INFO] Calificaciones añadidas a Juan y Jessica.");
printjson(db.alumnos.findOne({ nombre: "Juan" }, { calificaciones: 1 }));

print("\n[INFO] Eliminando calificaciones menores a 8 de Juan (usando $pull con $lt).");
db.alumnos.updateOne(
  { nombre: "Juan" },
  { $pull: { calificaciones: { $lt: 8 } } } // Elimina 7 y 6
);
print("[RESULT] Juan después de $pull calificaciones < 8:");
printjson(db.alumnos.findOne({ nombre: "Juan" }, { calificaciones: 1 }));


// ---------------------
// Delete (Eliminar documentos) - Avanzado
// ---------------------
print("\n--- Operaciones de Eliminación Avanzadas ---");

// 1. deleteMany: Eliminar múltiples documentos que coincidan con un criterio
print("\n[INFO] Insertando alumnos temporales para borrar.");
db.alumnos.insertMany([
  { nombre: "Temporal1", edad: 50, carrera: "Por Borrar", inscrito: false },
  { nombre: "Temporal2", edad: 55, carrera: "Por Borrar", inscrito: false }
]);
print("[INFO] Alumnos 'Por Borrar' antes de deleteMany:");
db.alumnos.find({ carrera: "Por Borrar" }); // Mostrará los dos temporales

const deleteResult = db.alumnos.deleteMany({ carrera: "Por Borrar" });
print("\n[RESULT] Resultado de deleteMany para carrera 'Por Borrar':");
printjson(deleteResult); // Muestra cuántos documentos fueron eliminados

print("[INFO] Verificando que los alumnos 'Por Borrar' han sido eliminados (no debería mostrar nada):");
db.alumnos.find({ carrera: "Por Borrar" });

// 2. findOneAndDelete: Encontrar un documento, eliminarlo y opcionalmente devolverlo
db.alumnos.insertOne({ nombre: "ParaEliminarLuego", edad: 99, carrera: "TemporalUnico" });
print("\n[INFO] Alumno 'ParaEliminarLuego' insertado.");
printjson(db.alumnos.findOne({ nombre: "ParaEliminarLuego" }));

print("\n[INFO] Eliminando y devolviendo a 'ParaEliminarLuego'.");
const deletedDoc = db.alumnos.findOneAndDelete(
  { nombre: "ParaEliminarLuego" }
  // { sort: { edad: 1 } } // Opcional: útil si el filtro puede coincidir con múltiples docs
);

if (deletedDoc) {
  print("[RESULT] Documento eliminado con findOneAndDelete:");
  printjson(deletedDoc); // Muestra el documento que fue eliminado
} else {
  print("[WARN] No se encontró el documento 'ParaEliminarLuego' para eliminar con findOneAndDelete.");
}

print("\n[INFO] Verificando que 'ParaEliminarLuego' ha sido eliminado:");
printjson(db.alumnos.findOne({ nombre: "ParaEliminarLuego" })); // Debería mostrar null


// ---------------------
// Resumen de nuevos operadores y opciones vistos en Clase 2:
// ---------------------
// Lectura (Find):
//   - Proyecciones (seleccionar campos)
//   - sort()
//   - limit()
//   - skip()
//   - countDocuments()
//   - $or, $in, $nin (repaso y ejemplos)
//   - $exists
//
// Actualización (Update):
//   - $unset (eliminar campos)
//   - $inc (incrementar/decrementar números, crear campos numéricos)
//   - upsert: true (opción para updateOne/updateMany)
//   - Operadores de Array:
//     - $push (añadir elemento)
//     - $addToSet (añadir elemento si no existe)
//     - $pull (eliminar elementos con condiciones)
//
// Eliminación (Delete):
//   - deleteMany() (eliminar múltiples documentos)
//   - findOneAndDelete() (eliminar y devolver un documento)

print("\n--- Fin de la Clase 2 ---");
print("Temas cubiertos: Lectura avanzada (proyecciones, sort, limit, skip, count, operadores $or, $in, $nin, $exists),");
print("Actualización avanzada ($unset, $inc, upsert, operadores de array $push, $addToSet, $pull),");
print("y Eliminación avanzada (deleteMany, findOneAndDelete).");