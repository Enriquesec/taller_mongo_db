// --- Inserción en la colección 'restaurantes' ---
db.restaurantes.insertMany([
  {
    nombre: "El Rincón del Sabor",
    tipoCocina: "Mexicana",
    direccion: "Calle Hidalgo 15, Centro",
    horario: "Lun-Dom: 8am-10pm",
    calificacionPromedio: 4.5,
    resenas: [
      { autor: "Carlos M.", calificacion: 5, comentario: "Las mejores enchiladas mineras de Dolores.", fecha: new Date("2024-04-10T12:30:00Z") },
      { autor: "Laura S.", calificacion: 4, comentario: "Ambiente agradable, servicio un poco lento.", fecha: new Date("2024-05-01T19:00:00Z") }
    ],
    tieneTerraza: true
  },
  {
    nombre: "La Parroquia",
    tipoCocina: "Antojitos Mexicanos",
    direccion: "Jardín Principal S/N",
    horario: "Mar-Dom: 9am-9pm",
    calificacionPromedio: 4.0,
    resenas: [
      { autor: "Roberto G.", calificacion: 4, comentario: "Perfecto para desayunar con vista al Jardín.", fecha: new Date("2024-03-20T09:00:00Z") }
    ],
    tieneTerraza: true
  },
  {
    nombre: "Pizzas Luigi",
    tipoCocina: "Italiana",
    direccion: "Morelos 234, Colonia Centro",
    horario: "Lun-Dom: 1pm-11pm",
    calificacionPromedio: 3.8,
    resenas: [
      { autor: "Ana P.", calificacion: 4, comentario: "Pizzas de buen tamaño y precio.", fecha: new Date("2024-05-15T20:00:00Z") }
    ],
    tieneTerraza: false
  },
  {
    nombre: "Carnes Asadas El Fogon",
    tipoCocina: "Asados",
    direccion: "Carr. Dolores Hidalgo - Guanajuato Km 2",
    horario: "Vie-Dom: 1pm-7pm",
    calificacionPromedio: 4.8,
    resenas: [
      { autor: "Miguel A.", calificacion: 5, comentario: "Excelente carne y tortillas hechas a mano.", fecha: new Date("2024-04-25T16:00:00Z") },
      { autor: "Sofía R.", calificacion: 5, comentario: "Un must si visitas Dolores Hidalgo.", fecha: new Date("2024-05-20T15:30:00Z") }
    ],
    tieneTerraza: true
  },
  {
    nombre: "Cafetería La Esquina",
    tipoCocina: "Cafetería/Repostería",
    direccion: "Calle Zacatecas 10, Centro",
    horario: "Lun-Sab: 7am-9pm",
    calificacionPromedio: 4.2,
    resenas: [
      { autor: "Isabel F.", calificacion: 4, comentario: "Buen café y postres. Ideal para trabajar.", fecha: new Date("2024-05-05T10:00:00Z") }
    ],
    tieneTerraza: false
  }
]);

// --- Inserción en la colección 'escuelas' (UTNG y otras relevantes) ---
db.escuelas.insertMany([
  {
    nombre: "Universidad Tecnológica del Norte de Guanajuato (UTNG)",
    tipo: "Universidad Pública",
    direccion: "Carretera Dolores Hidalgo-San Luis de la Paz Km. 1.2",
    nivelesEducativos: ["Licenciatura", "Ingeniería", "Técnico Superior Universitario"],
    calificacionPromedio: 4.3,
    resenas: [
      { autor: "Estudiante UTNG", calificacion: 4, comentario: "Buenas instalaciones, algunos maestros son excelentes.", fecha: new Date("2023-11-01T08:00:00Z") },
      { autor: "Ex-Alumno UTNG", calificacion: 5, comentario: "Me dio las bases para mi carrera profesional.", fecha: new Date("2024-02-15T10:00:00Z") }
    ],
    programasOferta: ["Tecnologías de la Información", "Mecatrónica", "Gastronomía"],
    tieneBiblioteca: true
  },
  {
    nombre: "CETis 150",
    tipo: "Bachillerato Técnico",
    direccion: "Calle Mariano Abasolo 120, Centro",
    nivelesEducativos: ["Bachillerato"],
    calificacionPromedio: 3.9,
    resenas: [
      { autor: "Padre de familia", calificacion: 4, comentario: "Educación técnica de calidad.", fecha: new Date("2023-09-01T14:00:00Z") }
    ],
    programasOferta: ["Programación", "Contabilidad", "Electrónica"],
    tieneBiblioteca: true
  },
  {
    nombre: "Preparatoria Oficial de Dolores Hidalgo",
    tipo: "Bachillerato General",
    direccion: "Calle Guanajuato 50, Centro",
    nivelesEducativos: ["Bachillerato"],
    calificacionPromedio: 4.1,
    resenas: [
      { autor: "Alumno Actual", calificacion: 4, comentario: "Buen ambiente escolar y maestros dedicados.", fecha: new Date("2024-03-10T11:00:00Z") }
    ],
    tieneBiblioteca: true
  },
  {
    nombre: "Escuela Primaria Ignacio Allende",
    tipo: "Educación Básica",
    direccion: "Calle Puebla 20, Centro",
    nivelesEducativos: ["Primaria"],
    calificacionPromedio: 4.6,
    resenas: [
      { autor: "Maestra", calificacion: 5, comentario: "Comunidad escolar muy comprometida.", fecha: new Date("2023-10-05T09:00:00Z") }
    ],
    tieneBiblioteca: false
  },
  {
    nombre: "Jardín de Niños 'Mi Pequeño Mundo'",
    tipo: "Educación Preescolar",
    direccion: "Calle Querétaro 5, Colonia del Sol",
    nivelesEducativos: ["Preescolar"],
    calificacionPromedio: 4.7,
    resenas: [
      { autor: "Madre", calificacion: 5, comentario: "Mis hijos aman ir, personal muy amable.", fecha: new Date("2024-01-20T10:00:00Z") }
    ],
    tieneBiblioteca: false
  }
]);

// --- Inserción en la colección 'gimnasios' ---
db.gimnasios.insertMany([
  {
    nombre: "Fitness Zone DH",
    direccion: "Av. de la Raza 10, Colonia La Raza",
    horario: "Lun-Vie: 6am-10pm, Sab: 8am-2pm",
    calificacionPromedio: 4.3,
    resenas: [
      { autor: "Marco A.", calificacion: 4, comentario: "Buenas máquinas, algo concurrido en las tardes.", fecha: new Date("2024-04-01T18:00:00Z") },
      { autor: "Luisa C.", calificacion: 5, comentario: "Clases de spinning geniales.", fecha: new Date("2024-05-10T09:00:00Z") }
    ],
    servicios: ["Pesas", "Cardio", "Clases grupales"],
    tieneAlberca: false
  },
  {
    nombre: "Gym Fuerza y Salud",
    direccion: "Revolución 50, Centro",
    horario: "Lun-Sab: 7am-9pm",
    calificacionPromedio: 3.9,
    resenas: [
      { autor: "Pedro R.", calificacion: 3, comentario: "Equipo un poco viejo, pero funcional.", fecha: new Date("2024-03-15T17:00:00Z") }
    ],
    servicios: ["Pesas", "Cardio"],
    tieneAlberca: false
  },
  {
    nombre: "CrossFit DH",
    direccion: "Calle del Trabajo 12, Indepe",
    horario: "Lun-Vie: 5am-9pm",
    calificacionPromedio: 4.7,
    resenas: [
      { autor: "Valeria G.", calificacion: 5, comentario: "Entrenadores excelentes y ambiente motivador.", fecha: new Date("2024-04-20T10:00:00Z") }
    ],
    servicios: ["CrossFit", "Entrenamiento Funcional"],
    tieneAlberca: false
  },
  {
    nombre: "Smart Fit Dolores H.",
    direccion: "Plaza Comercial Principal Local 10",
    horario: "Lun-Dom: 24h",
    calificacionPromedio: 4.1,
    resenas: [
      { autor: "Diego L.", calificacion: 4, comentario: "Abierto 24h es un plus, siempre limpio.", fecha: new Date("2024-05-01T14:00:00Z") }
    ],
    servicios: ["Pesas", "Cardio", "Clases en línea"],
    tieneAlberca: false
  },
  {
    nombre: "Acuatic Gym Dolores",
    direccion: "Paseo de la Constitución 300",
    horario: "Lun-Vie: 7am-8pm, Sab: 9am-1pm",
    calificacionPromedio: 4.6,
    resenas: [
      { autor: "Gabriela P.", calificacion: 5, comentario: "Ideal para natación y aquaeróbics.", fecha: new Date("2024-04-12T11:00:00Z") }
    ],
    servicios: ["Alberca", "Clases de Natación", "Aquaeróbics"],
    tieneAlberca: true
  }
]);

print("Datos insertados exitosamente en las colecciones.");


// --- R (Leer - Consultar) ---

// 1. Mostrar todos los restaurantes con calificación promedio de 4.0 o más.
db.restaurantes.find({ calificacionPromedio: { $gte: 4.0 } }).pretty();

// 2. Encontrar la UTNG y sus programas de oferta específicos.
db.escuelas.find(
  { nombre: "Universidad Tecnológica del Norte de Guanajuato (UTNG)" },
  { nombre: 1, programasOferta: 1, _id: 0 }
).pretty();

// 3. Listar gimnasios que tengan alberca.
db.gimnasios.find({ tieneAlberca: true }).pretty();

// 4. Mostrar restaurantes de "Cocina Mexicana" con terraza.
db.restaurantes.find({ tipoCocina: "Mexicana", tieneTerraza: true }).pretty();

// 5. Encontrar escuelas de tipo "Bachillerato" con biblioteca.
db.escuelas.find({ tipo: "Bachillerato Técnico", tieneBiblioteca: true }).pretty();

// 6. Encontrar gimnasios que ofrezcan "CrossFit" o "Clases grupales".
db.gimnasios.find({ servicios: { $in: ["CrossFit", "Clases grupales"] } }).pretty();

// 7. Encontrar reseñas de restaurantes con calificación de 5 estrellas.
// Nota: Aquí se busca dentro del array de 'resenas'
db.restaurantes.find({ "resenas.calificacion": 5 }).pretty();


// --- U (Actualizar) ---

// 1. Actualizar el horario de un restaurante.
db.restaurantes.updateOne(
  { nombre: "Cafetería La Esquina" },
  { $set: { horario: "Lun-Dom: 7am-10pm" } }
);
print("Horario de 'Cafetería La Esquina' actualizado.");

// 2. Añadir un nuevo programa de oferta a la UTNG.
db.escuelas.updateOne(
  { nombre: "Universidad Tecnológica del Norte de Guanajuato (UTNG)" },
  { $push: { programasOferta: "Energías Renovables" } }
);
print("Programa de 'Energías Renovables' añadido a UTNG.");

// 3. Incrementar la calificación promedio de un gimnasio.
db.gimnasios.updateOne(
  { nombre: "Fitness Zone DH" },
  { $inc: { calificacionPromedio: 0.1 } }
);
print("Calificación promedio de 'Fitness Zone DH' incrementada.");

// 4. Añadir una nueva reseña a un restaurante.
db.restaurantes.updateOne(
  { nombre: "Pizzas Luigi" },
  { $push: { resenas: { autor: "David L.", calificacion: 5, comentario: "¡Deliciosas y a buen precio!", fecha: new Date("2024-05-25T19:45:00Z") } } }
);
print("Nueva reseña añadida a 'Pizzas Luigi'.");


// --- D (Borrar - Eliminar) ---

// 1. Eliminar un restaurante específico (si ya no existe o es un error).
// ¡Solo ejecuta esto si quieres borrarlo de verdad!
// db.restaurantes.deleteOne({ nombre: "Restaurante a Eliminar" });
// print("Restaurante 'Restaurante a Eliminar' eliminado.");

// 2. Eliminar escuelas con calificación promedio muy baja (ej. menor a 3.0, solo si tuvieras alguna).
// db.escuelas.deleteMany({ calificacionPromedio: { $lt: 3.0 } });
// print("Escuelas con baja calificación eliminadas.");

// 3. Eliminar gimnasios que no ofrezcan pesas (si tuvieras alguno así).
// db.gimnasios.deleteMany({ servicios: { $nin: ["Pesas"] } });
// print("Gimnasios sin pesas eliminados.");

print("Operaciones CRUD (Actualizar y Eliminar) realizadas.");