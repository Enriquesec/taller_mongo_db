// Ejercicio: Documentos y Subdocumentos en MongoDB
// Contexto: Gestión de una biblioteca

// 1. Seleccionar o crear la base de datos
use biblioteca;

// 2. Insertar un libro con subdocumentos (comentarios)
db.libros.insertOne({
  titulo: "Cien años de soledad",
  autor: "Gabriel García Márquez",
  anio: 1967,
  generos: ["Realismo mágico", "Literatura latinoamericana"],
  comentarios: [
    {
      usuario: "Ana",
      texto: "Una obra maestra.",
      fecha: ISODate("2024-05-01T10:00:00Z")
    },
    {
      usuario: "Luis",
      texto: "Me costó al principio, pero luego me atrapó.",
      fecha: ISODate("2024-05-03T14:30:00Z")
    }
  ]
});

// 3. Buscar todos los libros con un comentario hecho por "Ana"
print("\nLibros con comentarios de Ana:");
printjson(
  db.libros.find({ "comentarios.usuario": "Ana" }).toArray()
);

// 4. Agregar un nuevo comentario al libro
db.libros.updateOne(
  { titulo: "Cien años de soledad" },
  {
    $push: {
      comentarios: {
        usuario: "Carlos",
        texto: "No pude soltarlo hasta terminar.",
        fecha: new Date()
      }
    }
  }
);

// 5. Modificar el texto del comentario de "Luis"
db.libros.updateOne(
  { titulo: "Cien años de soledad", "comentarios.usuario": "Luis" },
  {
    $set: { "comentarios.$.texto": "Una historia compleja pero fascinante." }
  }
);

// 6. Eliminar el comentario de "Ana"
db.libros.updateOne(
  { titulo: "Cien años de soledad" },
  {
    $pull: {
      comentarios: { usuario: "Ana" }
    }
  }
);

// 7. Mostrar el documento actualizado
print("\nDocumento actualizado:");
printjson(
  db.libros.findOne({ titulo: "Cien años de soledad" })
);

// 8. Reto extra (para alumnos): Agregar calificaciones y calcular promedio
// Sugerencia: actualizar comentarios para que incluyan campo "calificacion"
// Y usar agregaciones con $unwind y $avg para obtener promedio de calificaciones
