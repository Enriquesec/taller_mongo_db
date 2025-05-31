// relaciones_mongodb.js
// Instrucciones: ejecutar en mongosh con: mongosh relaciones_mongodb.js

// =====================================
// RELACIÓN 1:1
// =====================================

use relaciones_mongodb;
db.usuarios.drop();
db.perfiles.drop();

// 1:1 — Documento embebido (buena práctica cuando siempre se consulta junto)
db.usuarios.insertOne({
  _id: 1,
  nombre: "Ana",
  correo: "ana@example.com",
  perfil: {
    edad: 28,
    ciudad: "CDMX"
  }
});

// 1:1 — Relación referenciada (mala práctica si siempre se usa junto)
db.usuarios.insertOne({ _id: 2, nombre: "Luis", correo: "luis@example.com", perfil_id: 101 });
db.perfiles.insertOne({ _id: 101, edad: 32, ciudad: "Monterrey" });

// Consulta con $lookup (usuario + perfil referenciado)
db.usuarios.aggregate([
  {
    $lookup: {
      from: "perfiles",
      localField: "perfil_id",
      foreignField: "_id",
      as: "perfil"
    }
  },
  { $unwind: "$perfil" }
]);

// =====================================
// RELACIÓN 1:N
// =====================================

db.blogs.drop();
db.comentarios.drop();

// 1:N — Arreglo embebido (recomendado si los comentarios son pocos)
db.blogs.insertOne({
  titulo: "Primer post",
  contenido: "Bienvenidos a mi blog",
  comentarios: [
    { autor: "Carlos", mensaje: "¡Excelente!" },
    { autor: "María", mensaje: "Interesante punto de vista." }
  ]
});

// 1:N — Referenciado (cuando los comentarios pueden ser muchos)
db.blogs.insertOne({ _id: 100, titulo: "Post con referencias", contenido: "Texto largo..." });
db.comentarios.insertMany([
  { blog_id: 100, autor: "Pedro", mensaje: "Me gustó mucho." },
  { blog_id: 100, autor: "Laura", mensaje: "Buen análisis." }
]);

// Consulta con $lookup: obtener blog y comentarios referenciados
db.blogs.aggregate([
  {
    $lookup: {
      from: "comentarios",
      localField: "_id",
      foreignField: "blog_id",
      as: "comentarios"
    }
  }
]);

// =====================================
// RELACIÓN N:N
// =====================================

db.estudiantes.drop();
db.cursos.drop();
db.inscripciones.drop();

// N:N — Referencias cruzadas (en estudiantes y cursos)
db.estudiantes.insertMany([
  { _id: 1, nombre: "Diego", cursos_ids: [101, 102] },
  { _id: 2, nombre: "Valeria", cursos_ids: [101] }
]);

db.cursos.insertMany([
  { _id: 101, nombre: "Matemáticas" },
  { _id: 102, nombre: "Historia" }
]);

// Consulta: Estudiantes y sus cursos
db.estudiantes.aggregate([
  {
    $lookup: {
      from: "cursos",
      localField: "cursos_ids",
      foreignField: "_id",
      as: "cursos"
    }
  }
]);

// N:N — Colección intermedia (buena práctica si hay más info en la relación)
db.inscripciones.insertMany([
  { estudiante_id: 1, curso_id: 101, fecha: ISODate("2025-01-10") },
  { estudiante_id: 1, curso_id: 102, fecha: ISODate("2025-01-11") },
  { estudiante_id: 2, curso_id: 101, fecha: ISODate("2025-01-15") }
]);

// Consulta: Ver inscripciones con datos de estudiantes y cursos
db.inscripciones.aggregate([
  {
    $lookup: {
      from: "estudiantes",
      localField: "estudiante_id",
      foreignField: "_id",
      as: "estudiante"
    }
  },
  { $unwind: "$estudiante" },
  {
    $lookup: {
      from: "cursos",
      localField: "curso_id",
      foreignField: "_id",
      as: "curso"
    }
  },
  { $unwind: "$curso" },
  {
    $project: {
      _id: 0,
      estudiante: "$estudiante.nombre",
      curso: "$curso.nombre",
      fecha: 1
    }
  }
]);

