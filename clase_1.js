// Básicos de CRUD

use alumnos

// ---------------------
// Create (Insertar documentos)
// ---------------------

// Insertar un solo documento
db.alumnos.insertOne({
  nombre: "Brayan",
  edad: 19,
  carrera: "Desarrollo de Software",
  deporte: "ciclismo"
})

// Insertar múltiples documentos
db.alumnos.insertMany([
  {
    nombre: "Manuel",
    edad: 18,
    carrera: "Desarrollo de Software",
    deporte: "power lifting"
  },
  {
    nombre: "Maria",
    edad: 120,
    carrera: "Matematicas"
  },
  {
    _id: 'ABC123',
    nombre: "Juan",
    edad: 23,
    carrera: "Turismo",
    matricula: 'ABC123'
  },
  {
    nombre: "Jhonatan",
    edad: 18,
    carrera: "Programación"
  },
  {
    _id: "DEF456",
    nombre: "Jessica",
    edad: 20,
    carrera: "Turismo"
  },
  {
    nombre: "Joaquine",
    edad: 14
  }
])

// ---------------------
// Read (Leer documentos)
// ---------------------

// Buscar alumnos con edad mayor a 18
db.alumnos.find({ edad: { $gt: 18 } })

// Buscar a Maria
db.alumnos.find({ nombre: "Maria" })

// Buscar todos los que estén en Turismo
db.alumnos.find({ carrera: "Turismo" })

// Buscar edad > 18 Y carrera sea Desarrollo de Software
db.alumnos.find({
  $and: [
    { edad: { $gt: 18 } },
    { carrera: "Desarrollo de Software" }
  ]
})

// ---------------------
// Operadores útiles
// ---------------------

// Comparación: $gt, $lt, $gte, $lte
// Inclusión: $in, $nin
// Arreglos: $size
// Lógicos: $and, $or

// ---------------------
// Update (Actualizar documentos)
// ---------------------

// Actualizar un documento (uno solo)
db.alumnos.updateOne(
  { nombre: "Juan" },
  { $set: { carrera: "Turismo" } }
)

// Actualizar múltiples documentos (ejemplo vacío)
db.alumnos.updateMany(
  { carrera: "Programación" },
  { $set: { carrera: "Desarrollo de Software" } }
)

// ---------------------
// Delete (Eliminar documentos)
// ---------------------

// Eliminar un documento sin filtro (no recomendable)
db.alumnos.deleteOne({})

// Eliminar por ID directo (tipo string)
db.alumnos.deleteOne({ _id: '6835c34fc7b33af67fa54d7d' })

// Eliminar por ObjectId (requiere función ObjectId)
db.alumnos.deleteOne({ _id: ObjectId('6835c34fc7b33af67fa54d7d') })
