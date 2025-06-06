/**
 * =======================================================
 * COMANDOS BÁSICOS DE MONGODB EN JAVASCRIPT (para mongosh)
 * =======================================================
 *
 * Este script contiene los comandos fundamentales para interactuar
 * con MongoDB: crear, leer, actualizar y borrar (CRUD), además
 * de operaciones básicas con bases de datos y colecciones.
 *
 * Para ejecutar en mongosh:
 * 1. Asegúrate de que tu servidor mongod esté corriendo.
 * 2. Abre tu terminal y escribe 'mongosh'.
 * 3. Copia y pega las secciones de código que quieras ejecutar.
 * También puedes guardar este código en un archivo .js (ej. 'comandos_mongo.js')
 * y ejecutarlo con 'load("comandos_mongo.js")' desde la shell.
 */

// --- 1. OPERACIONES CON BASES DE DATOS ---
// -----------------------------------------

// Mostrar todas las bases de datos existentes en el servidor.
// No necesitas seleccionar una DB para este comando.
show dbs;
// Alternativa más moderna:
// show databases;


// Seleccionar una base de datos para trabajar.
// Si la base de datos no existe, MongoDB la crea implícitamente
// la primera vez que insertas un documento en una colección dentro de ella.
use miPlataformaCursos;


// Verificar en qué base de datos te encuentras actualmente.
db;


// Borrar la base de datos actualmente seleccionada.
// ¡MUCHO CUIDADO! Esta operación es destructiva y elimina
// absolutamente TODOS los datos de esa base de datos.
// db.dropDatabase();


// --- 2. OPERACIONES CON COLECCIONES ---
// -------------------------------------

// Mostrar todas las colecciones dentro de la base de datos actualmente seleccionada.
show collections;
// Alternativa usando el objeto db:
// db.getCollectionNames();


// Crear una colección explícitamente.
// La mayoría de las veces, las colecciones se crean automáticamente
// cuando insertas el primer documento en una colección que no existe.
db.createCollection("usuarios");
db.createCollection("cursos");
db.createCollection("inscripciones");


// Borrar una colección específica.
// Elimina la colección y TODOS los documentos que contiene.
// db.usuarios.drop();


// --- 3. OPERACIONES CRUD (Crear, Leer, Actualizar, Borrar) ---
// Trabajaremos con las colecciones 'usuarios' y 'cursos'
// -------------------------------------------------------------

// --- C (Crear - Insertar Documentos) ---

// Insertar un solo documento en la colección 'usuarios'.
// El campo '_id' se generará automáticamente si no se especifica.
db.usuarios.insertOne({
  nombre: "Elena García",
  email: "elena.garcia@example.com",
  rol: "estudiante",
  fechaRegistro: new Date("2023-01-15T10:00:00Z"),
  intereses: ["tecnología", "diseño UX"]
});

// Insertar múltiples documentos en la colección 'cursos'.
// También puedes obtener los _id de documentos ya insertados para referencias.
let sofiaRoblesId = db.usuarios.findOne({ nombre: "Dr. Sofia Robles" }) ? db.usuarios.findOne({ nombre: "Dr. Sofia Robles" })._id : null;
if (!sofiaRoblesId) {
    // Si Sofia Robles no existe (porque no ejecutaste la parte de usuarios de ejemplo antes)
    // la insertamos para poder referenciarla.
    let result = db.usuarios.insertOne({
        nombre: "Dr. Sofia Robles",
        email: "sofia.robles@academia.com",
        rol: "instructor",
        fechaRegistro: new Date("2023-08-01T09:00:00Z"),
        especialidades: ["Matemáticas", "Ciencia de Datos"]
    });
    sofiaRoblesId = result.insertedId;
}

db.cursos.insertMany([
  {
    titulo: "Introducción a MongoDB",
    descripcion: "Aprende los fundamentos de bases de datos NoSQL con MongoDB.",
    instructorId: sofiaRoblesId, // Referencia al instructor
    duracionHoras: 20,
    categoria: "Bases de Datos",
    activo: true
  },
  {
    titulo: "Python para Data Science",
    descripcion: "Uso de Python en análisis de datos.",
    instructorId: sofiaRoblesId,
    duracionHoras: 35,
    categoria: "Ciencia de Datos",
    activo: true
  }
]);


// --- R (Leer - Consultar Documentos) ---

// Leer todos los documentos de la colección 'usuarios'.
// '.pretty()' formatea la salida para hacerla más legible en la shell.
db.usuarios.find({}).pretty();

// Leer documentos que cumplen con un criterio específico (ej. rol 'estudiante').
db.usuarios.find({ rol: "estudiante" }).pretty();

// Leer documentos usando operadores de comparación (ej. edad mayor a 25).
db.usuarios.find({ edad: { $gt: 25 } }).pretty(); // $gt: greater than (mayor que)

// Leer documentos que tengan un campo anidado o un elemento en un array.
db.usuarios.find({ "intereses": "tecnología" }).pretty();

// Encontrar un solo documento que cumpla un criterio.
db.cursos.findOne({ titulo: "Introducción a MongoDB" });

// Contar el número de documentos que cumplen un criterio.
db.usuarios.countDocuments({ rol: "estudiante" });

// Limitar el número de resultados (primeros 2 documentos).
db.cursos.find({}).limit(2).pretty();

// Saltar los primeros N documentos (útil para paginación).
db.usuarios.find({}).skip(1).limit(1).pretty(); // Salta el primero, muestra el segundo

// Ordenar resultados (1 para ascendente, -1 para descendente).
db.cursos.find({}).sort({ duracionHoras: -1 }).pretty(); // Cursos de mayor a menor duración

// Proyectar campos: mostrar solo campos específicos de los documentos.
// _id se incluye por defecto, usa _id: 0 para excluirlo.
db.usuarios.find({}, { nombre: 1, email: 1, _id: 0 }).pretty();


// --- U (Actualizar Documentos) ---

// Actualizar un solo documento.
// $set: establece o cambia el valor de un campo.
db.usuarios.updateOne(
  { email: "elena.garcia@example.com" },
  { $set: { edad: 29, "intereses.1": "programación" } } // Actualiza edad y el segundo interés
);

// Actualizar múltiples documentos.
// $inc: incrementa el valor de un campo numérico.
db.cursos.updateMany(
  { activo: true, categoria: "Bases de Datos" },
  { $inc: { duracionHoras: 2 } } // Aumenta 2 horas a cursos de BD activos
);

// $push: añade un elemento a un array.
db.usuarios.updateOne(
  { nombre: "Elena García" },
  { $push: { intereses: "inteligencia artificial" } }
);

// $pull: elimina un elemento de un array.
// db.usuarios.updateOne(
//   { nombre: "Elena García" },
//   { $pull: { intereses: "diseño UX" } }
// );


// --- D (Borrar - Eliminar Documentos) ---

// Eliminar un solo documento.
db.usuarios.deleteOne({ email: "elena.garcia@example.com" });

// Eliminar múltiples documentos.
db.cursos.deleteMany({ activo: false }); // Eliminar cursos inactivos

// Eliminar todos los documentos de una colección (la colección permanece).
// db.usuarios.deleteMany({});


// --- 4. ÍNDICES (PARA MEJORAR EL RENDIMIENTO DE LAS CONSULTAS) ---
// -----------------------------------------------------------------

// Crear un índice en un solo campo (ej. email en usuarios).
// 1 para orden ascendente, -1 para descendente.
// Las consultas por email serán más rápidas.
db.usuarios.createIndex({ email: 1 });

// Crear un índice compuesto en múltiples campos.
// Útil para consultas que filtran y/o ordenan por estos campos juntos.
db.cursos.createIndex({ categoria: 1, duracionHoras: -1 });

// Mostrar todos los índices de una colección.
db.usuarios.getIndexes();

// Borrar un índice por su nombre (el nombre suele ser "nombreCampo_1" o similar).
// db.usuarios.dropIndex("email_1");