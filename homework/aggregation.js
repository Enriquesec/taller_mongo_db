// ejercicio_contacto_artistas.js
// Ejecutar en mongosh: mongosh ejercicio_contacto_artistas.js

use red_artistas;

// --------------------------------------------------------------------------------------
// Datos iniciales: artistas y obras
// --------------------------------------------------------------------------------------

db.artistas.drop();
db.obras.drop();

db.artistas.insertMany([
  { _id: 1, nombre: "María", disciplina: "Pintura", intereses: ["óleo", "naturaleza"], activo: true },
  { _id: 2, nombre: "José", disciplina: "Escultura", intereses: ["metal", "formas abstractas"], activo: true },
  { _id: 3, nombre: "Camila", disciplina: "Fotografía", intereses: ["blanco y negro"], activo: false },
  { _id: 4, nombre: "Andrés", disciplina: "Pintura", intereses: ["retrato", "óleo"], activo: true }
]);

db.obras.insertMany([
  { artista_id: 1, titulo: "Paisaje andino", reacciones: { likes: 10, estrellas: 2 }, fecha: ISODate("2025-05-20") },
  { artista_id: 1, titulo: "Bosque húmedo", reacciones: { likes: 5 }, fecha: ISODate("2025-05-22") },
  { artista_id: 2, titulo: "Hierro retorcido", reacciones: { likes: 8, estrellas: 3 }, fecha: ISODate("2025-05-21") },
  { artista_id: 3, titulo: "Retrato en sombras", reacciones: { likes: 4 }, fecha: ISODate("2025-05-19") }
]);

// --------------------------------------------------------------------------------------
// Ejercicios de agregación
// --------------------------------------------------------------------------------------

// 1. Artistas activos y sus intereses
db.artistas.aggregate([
  { $match: { activo: true } },
  { $project: { nombre: 1, intereses: 1, _id: 0 } }
]);

// 2. Número de artistas por disciplina
db.artistas.aggregate([
  { $group: { _id: "$disciplina", total: { $sum: 1 } } }
]);

// 3. Top 1 disciplina con más artistas
db.artistas.aggregate([
  { $group: { _id: "$disciplina", total: { $sum: 1 } } },
  { $sort: { total: -1 } },
  { $limit: 1 }
]);

// 4. Relacionar artistas con sus obras (lookup)
db.artistas.aggregate([
  {
    $lookup: {
      from: "obras",
      localField: "_id",
      foreignField: "artista_id",
      as: "portfolio"
    }
  },
  { $project: { nombre: 1, portfolio: 1 } }
]);

// 5. Total de obras y promedio de likes por artista
db.obras.aggregate([
  {
    $group: {
      _id: "$artista_id",
      totalObras: { $sum: 1 },
      promedioLikes: { $avg: "$reacciones.likes" }
    }
  }
]);

// 6. Total de reacciones por artista (likes + estrellas)
db.obras.aggregate([
  {
    $group: {
      _id: "$artista_id",
      totalLikes: { $sum: "$reacciones.likes" },
      totalEstrellas: { $sum: "$reacciones.estrellas" }
    }
  }
]);

// 7. Intereses más comunes entre artistas
db.artistas.aggregate([
  { $unwind: "$intereses" },
  { $group: { _id: "$intereses", cantidad: { $sum: 1 } } },
  { $sort: { cantidad: -1 } }
]);

// 8. Reto: Artistas con más de una obra y al menos 3 estrellas
db.obras.aggregate([
  {
    $group: {
      _id: "$artista_id",
      totalObras: { $sum: 1 },
      totalEstrellas: { $sum: "$reacciones.estrellas" }
    }
  },
  {
    $match: {
      totalObras: { $gt: 1 },
      totalEstrellas: { $gte: 3 }
    }
  }
]);

// --------------------------------------------------------------------------------------
// Fin del ejercicio
// --------------------------------------------------------------------------------------
