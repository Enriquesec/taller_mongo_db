
// 🧪 Práctica Clase 2 – MongoDB CRUD (Nivel intermedio)

use alumnos

// ----------------------
// Parte 1: Inserción
// ----------------------

db.alumnos.insertMany([
  { nombre: "Ana", edad: 20, carrera: "Diseño", promedio: 8.5 },
  { nombre: "Luis", edad: 17, carrera: "Desarrollo de Software", promedio: 6.9 },
  { nombre: "Sofía", edad: 22, carrera: "Matemáticas", promedio: 9.2 },
  { nombre: "Carlos", edad: 19, carrera: "Desarrollo de Software", promedio: 5.8 },
  { nombre: "Lucía", edad: 21, carrera: "Turismo", promedio: 7.5 },
  { nombre: "Pedro", edad: 23, carrera: "Matemáticas", promedio: 8.1 }
])

// ----------------------
// Parte 2: Consultas
// ----------------------

// 1. Alumnos con promedio >= 8
db.alumnos.find({ promedio: { $gte: 8 } })

// 2. Alumnos de Desarrollo de Software y edad > 18
db.alumnos.find({ $and: [ { carrera: "Desarrollo de Software" }, { edad: { $gt: 18 } } ] })

// 3. Alumnos cuyo nombre sea Ana o Lucía
db.alumnos.find({ nombre: { $in: ["Ana", "Lucía"] } })

// 4. Alumnos que NO estén en Turismo
db.alumnos.find({ carrera: { $ne: "Turismo" } })

// 5. Alumnos con promedio entre 7 y 9 inclusive
db.alumnos.find({ promedio: { $gte: 7, $lte: 9 } })

// ----------------------
// Parte 3: Actualizaciones
// ----------------------

// 1. Aumentar en 1 punto el promedio de los alumnos de Matemáticas
db.alumnos.updateMany(
  { carrera: "Matemáticas" },
  { $inc: { promedio: 1 } }
)

// 2. Cambiar carrera de Carlos a Ingeniería de Software
db.alumnos.updateOne(
  { nombre: "Carlos" },
  { $set: { carrera: "Ingeniería de Software" } }
)

// 3. Agregar campo 'estado' con "reprobado" a alumnos con promedio < 7
db.alumnos.updateMany(
  { promedio: { $lt: 7 } },
  { $set: { estado: "reprobado" } }
)

// ----------------------
// Parte 4: Eliminaciones
// ----------------------

// 1. Eliminar al alumno llamado Pedro
db.alumnos.deleteOne({ nombre: "Pedro" })

// 2. Eliminar a los alumnos con promedio menor a 6
db.alumnos.deleteMany({ promedio: { $lt: 6 } })

// ----------------------
// Extra (Opcional)
// ----------------------

// 1. Contar alumnos por carrera
db.alumnos.aggregate([
  { $group: { _id: "$carrera", total: { $sum: 1 } } }
])

// 2. Promedio general por carrera
db.alumnos.aggregate([
  { $group: { _id: "$carrera", promedioGeneral: { $avg: "$promedio" } } }
])
