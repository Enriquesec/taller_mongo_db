// Tarea: Diseña tu propio caso de uso con MongoDB
// Taller Remedial de Bases de Datos NoSQL
// Instrucciones: Completa cada sección planteando tu propio problema y diseño de base de datos.

// --------------------------------------------------------------------------------------
// 1. Descripción del problema
// --------------------------------------------------------------------------------------

// Escribe aquí una breve descripción (5 a 10 líneas) de un sistema donde MongoDB sea útil.
// Explica el contexto, qué tipo de datos manejará, y por qué NoSQL es adecuado.

// Ejemplo: Quiero crear una aplicación donde los estudiantes compartan ideas de proyectos. 
// Cada idea tiene autor, título, etiquetas, comentarios y votos. Es ideal usar MongoDB porque 
// las ideas pueden tener estructuras variables y listas anidadas.

// --------------------------------------------------------------------------------------
// 2. Diseño de colecciones
// --------------------------------------------------------------------------------------

// Define al menos dos colecciones necesarias para tu sistema.
// Escribe el nombre de cada colección, campos clave y un ejemplo en formato JSON.

// --------------------
// Colección 1:
// --------------------

// Nombre: usuarios
// Campos: nombre, carrera, intereses (array), activo (booleano)

db.usuarios.insertOne({
  // Reemplaza con tu ejemplo
});

// --------------------
// Colección 2:
// --------------------

// Nombre: publicaciones
// Campos: usuario_id, contenido, etiquetas, reacciones, fecha

db.publicaciones.insertOne({
  // Reemplaza con tu ejemplo
});

// Puedes agregar más colecciones si lo necesitas.

// --------------------------------------------------------------------------------------
// 3. Operaciones propuestas
// --------------------------------------------------------------------------------------

// Escribe al menos una operación de cada tipo que sea relevante para tu sistema.

// ----------
// Lectura
// ----------
// Ejemplo: Buscar todas las publicaciones que tienen la etiqueta "proyecto"

db.publicaciones.find({
  // Tu consulta aquí
});

// ----------
// Inserción
// ----------
// Ejemplo: Insertar una nueva publicación con múltiples etiquetas

db.publicaciones.insertOne({
  // Tu documento aquí
});

// ----------
// Actualización
// ----------
// Ejemplo: Incrementar el número de "me gusta" en una publicación

db.publicaciones.updateOne(
  // Tu filtro y operador $inc aquí
);

// ----------
// Agregación
// ----------
// Ejemplo: Agrupar publicaciones por etiqueta y contar cuántas hay de cada una

db.publicaciones.aggregate([
  // Tu pipeline aquí
]);

// --------------------------------------------------------------------------------------
// 4. Comentarios finales (opcional)
// --------------------------------------------------------------------------------------

// Puedes agregar aquí observaciones, dificultades, decisiones de diseño, etc.


// ======================================================================================
// 💡 Ejemplo completo (referencia): Aplicación de Recetas
// ======================================================================================

// Descripción:
// Una app para compartir recetas. Los usuarios pueden subir recetas con ingredientes,
// pasos, etiquetas y recibir likes. MongoDB permite manejar arreglos y estructuras flexibles.

// Colección: usuarios

db.usuarios.insertOne({
  nombre: "Elena",
  email: "elena@example.com",
  gustos: ["postres", "comida mexicana"],
  activo: true
});

// Colección: recetas

db.recetas.insertOne({
  usuario_id: ObjectId("..."),
  titulo: "Chocoflan",
  ingredientes: ["leche", "huevo", "chocolate"],
  pasos: "Paso 1: Mezclar ingredientes. Paso 2: Hornear 45 min.",
  etiquetas: ["postre", "mexicano"],
  likes: 25
});

// Lectura: recetas con etiqueta "postre"
db.recetas.find({ etiquetas: "postre" });

// Inserción: nueva receta
db.recetas.insertOne({
  usuario_id: ObjectId("..."),
  titulo: "Guacamole",
  ingredientes: ["aguacate", "sal", "limón"],
  pasos: "Tritura los aguacates y mezcla todo.",
  etiquetas: ["entrada", "vegano"],
  likes: 0
});

// Actualización: agregar likes
db.recetas.updateOne(
  { titulo: "Chocoflan" },
  { $inc: { likes: 1 } }
);

// Agregación: recetas agrupadas por etiqueta
db.recetas.aggregate([
  { $unwind: "$etiquetas" },
  { $group: { _id: "$etiquetas", total: { $sum: 1 } } }
]);
