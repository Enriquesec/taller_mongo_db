// Clase 3: Introducción al Framework de Agregación y Relaciones entre Colecciones
// Taller Remedial MongoDB

use contacto_unicos

// --------------------------------------------------------------------------------------
// Pre-requisito: Datos iniciales de usuarios y publicaciones
// --------------------------------------------------------------------------------------

db.usuarios.drop();
db.publicaciones.drop();

db.usuarios.insertMany([
  { _id: 1, nombre: "Carlos", carrera: "Sociología", intereses: ["cine", "fútbol"], activo: true },
  { _id: 2, nombre: "Ana", carrera: "Informática", intereses: ["programación", "café"], activo: true },
  { _id: 3, nombre: "Luis", carrera: "Informática", intereses: ["anime"], activo: false },
  { _id: 4, nombre: "Lucía", carrera: "Psicología", intereses: ["lectura", "arte"], activo: true }
]);

db.publicaciones.insertMany([
  { usuario_id: 1, contenido: "¡Me encanta el cine!", reacciones: { me_gusta: 3, me_encanta: 1 }, fecha: ISODate("2025-05-20") },
  { usuario_id: 1, contenido: "Hoy hay partido", reacciones: { me_gusta: 5 }, fecha: ISODate("2025-05-21") },
  { usuario_id: 2, contenido: "Probando MongoDB", reacciones: { me_gusta: 8, me_encanta: 2 }, fecha: ISODate("2025-05-21") },
  { usuario_id: 3, contenido: "Anime es arte", reacciones: { me_gusta: 2 }, fecha: ISODate("2025-05-19") }
]);

// --------------------------------------------------------------------------------------
// Aggregation Pipeline: Introducción
// --------------------------------------------------------------------------------------

print("\n--- [INFO] Usuarios activos (match + project) ---");
// 1. $match: Filtra documentos (similar a find())
 // 2. $project: Permite seleccionar qué campos mostrar (o transformarlos).
db.usuarios.aggregate([
  { $match: { activo: true } },
  { $project: { nombre: 1, intereses: 1, _id: 0 } }
]).forEach(printjson);

print("\n--- [INFO] Número de estudiantes por carrera (group) ---");
// 3. $group: Agrupa documentos y permite hacer cálculos como conteo, promedio, suma.
db.usuarios.aggregate([
  { $group: { _id: "$carrera", total: { $sum: 1 } } }
]).forEach(printjson);

print("\n--- [INFO] Top 2 carreras con más estudiantes (group + sort + limit) ---");
// 4. $sort: Ordena los documentos (1 ascendente, -1 descendente).
// 5. $limit: Limita la cantidad de resultados.
db.usuarios.aggregate([
  { $group: { _id: "$carrera", total: { $sum: 1 } } },
  { $sort: { total: -1 } },
  { $limit: 2 }
]).forEach(printjson);

// --------------------------------------------------------------------------------------
// Relaciones entre colecciones con $lookup
// --------------------------------------------------------------------------------------

print("\n--- [INFO] Usuarios con sus publicaciones (lookup) ---");
// 6. $lookup: Une documentos de otra colección (similar a un JOIN en SQL).
// localField: campo en esta colección. foreignField: campo en la otra colección.
db.usuarios.aggregate([
  {
    $lookup: {
      from: "publicaciones",
      localField: "_id",
      foreignField: "usuario_id",
      as: "posts"
    }
  },
  { $project: { nombre: 1, posts: 1 } }
]).forEach(printjson);

// --------------------------------------------------------------------------------------
// Agrupaciones más complejas y operaciones con campos embebidos
// --------------------------------------------------------------------------------------

print("\n--- [INFO] Total de publicaciones y promedio de me_gusta por usuario ---");
// 7. Podemos acceder a campos embebidos como reacciones.me_gusta en $group.
db.publicaciones.aggregate([
  {
    $group: {
      _id: "$usuario_id",
      totalPublicaciones: { $sum: 1 },
      promedioMeGusta: { $avg: "$reacciones.me_gusta" }
    }
  }
]).forEach(printjson);

print("\n--- [INFO] Total de reacciones por usuario (me_gusta + me_encanta) ---");
db.publicaciones.aggregate([
  {
    $group: {
      _id: "$usuario_id",
      totalMeGusta: { $sum: "$reacciones.me_gusta" },
      totalMeEncanta: { $sum: "$reacciones.me_encanta" }
    }
  }
]).forEach(printjson);

// --------------------------------------------------------------------------------------
// Uso de $unwind para operar sobre arreglos
// --------------------------------------------------------------------------------------

print("\n--- [INFO] Intereses más comunes entre usuarios (unwind + group) ---");
// 8. $unwind: Divide los elementos de un arreglo en documentos individuales.
db.usuarios.aggregate([
  { $unwind: "$intereses" },
  { $group: { _id: "$intereses", cantidad: { $sum: 1 } } },
  { $sort: { cantidad: -1 } }
]).forEach(printjson);

// --------------------------------------------------------------------------------------
// Reto: Combinación de etapas para análisis más avanzado
// --------------------------------------------------------------------------------------

print("\n--- [INFO] Reto: Usuarios con >1 publicación y >=2 me_encanta ---");
// Aquí combinamos $group y $match para filtrar por condiciones agregadas.
db.publicaciones.aggregate([
  {
    $group: {
      _id: "$usuario_id",
      totalPosts: { $sum: 1 },
      totalMeEncanta: { $sum: "$reacciones.me_encanta" }
    }
  },
  {
    $match: {
      totalPosts: { $gt: 1 },
      totalMeEncanta: { $gte: 2 }
    }
  }
]).forEach(printjson);

// --------------------------------------------------------------------------------------
// Fin de la Clase 3
// --------------------------------------------------------------------------------------

print("\n--- Fin de la Clase 3 ---");
print("Temas cubiertos:");
print("- Aggregation Pipeline");
print("- Operadores: $match, $project, $group, $sort, $limit");
print("- Relaciones: $lookup");
print("- Arreglos: $unwind");
