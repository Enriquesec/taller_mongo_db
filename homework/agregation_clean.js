// ejercicio_contacto_artistas.js
// Ejecutar en mongosh: mongosh ejercicio_contacto_artistas.js

// crea un base de datos: red_artistas

// --------------------------------------------------------------------------------------
// Datos iniciales: artistas y obras
// --------------------------------------------------------------------------------------

// datos a ingresar en la colleccion artistas
//[
//  { _id: 1, nombre: "María", disciplina: "Pintura", intereses: ["óleo", "naturaleza"], activo: true },
//  { _id: 2, nombre: "José", disciplina: "Escultura", intereses: ["metal", "formas abstractas"], activo: true },
//  { _id: 3, nombre: "Camila", disciplina: "Fotografía", intereses: ["blanco y negro"], activo: false },
//  { _id: 4, nombre: "Andrés", disciplina: "Pintura", intereses: ["retrato", "óleo"], activo: true }
//]

// datos a ingresar en la colleccion obras
//[
//  { artista_id: 1, titulo: "Paisaje andino", reacciones: { likes: 10, estrellas: 2 }, fecha: ISODate("2025-05-20") },
//  { artista_id: 1, titulo: "Bosque húmedo", reacciones: { likes: 5 }, fecha: ISODate("2025-05-22") },
//  { artista_id: 2, titulo: "Hierro retorcido", reacciones: { likes: 8, estrellas: 3 }, fecha: ISODate("2025-05-21") },
//  { artista_id: 3, titulo: "Retrato en sombras", reacciones: { likes: 4 }, fecha: ISODate("2025-05-19") }
//]

// --------------------------------------------------------------------------------------
// Consultas de agregación
// --------------------------------------------------------------------------------------

// 1. ¿Cuántos artistas activos existen? Solo muestra su nombre e intereses.

// 2. ¿Cuántos artistas hay por disciplina?

// 3. ¿Cuál es la disciplina con más artistas?

// 4. ¿Qué obras ha realizado cada artista? Muestra el nombre del artista y sus obras.

// 5. ¿Cuántas obras ha hecho cada artista y cuál es el promedio de likes?

// 6. ¿Cuál es el total de likes y estrellas por artista?

// 7. ¿Cuáles son los intereses más comunes entre los artistas?

// 8. ¿Qué artistas tienen más de una obra y al menos 3 estrellas acumuladas?

// --------------------------------------------------------------------------------------
// Fin del ejercicio
// --------------------------------------------------------------------------------------