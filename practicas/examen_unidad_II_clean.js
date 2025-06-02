// Unidad II: Examen práctico. Duración aproximada 1:30
// - Crear y/o cambiar a la base de datos “examen”
// - Crear colecciones “restaurants” y “reviews”
//    e insertar los 10 documentos que se encuentran en data/examen.js

// ------------------------------
// 1) Consultas básicas sobre “restaurants”
// ------------------------------

// 1.1 Mostrar todos los restaurantes:

// 1.2 Mostrar restaurantes con rating mayor o igual a 4.5:

// 1.3 Mostrar restaurantes cuya cocina (cuisine) incluya “Mexicana”:

// 1.4 Mostrar restaurantes con rango de precio EXACTO "$$ - $$$":

// 1.5 Mostrar restaurantes que ofrezcan opciones vegetarianas o veganas:
// (campo specialDiets existe y contiene “Vegetarian friendly” o “Vegan options”)

// 1.6 Mostrar restaurantes cuya dirección contenga la palabra “Centro”:

// 1.8 Ordenar restaurantes por rating descendente y mostrar los 3 primeros:

// ------------------------------
// 2) Consultas sobre “reviews”
// ------------------------------

// 2.1 Mostrar todas las reseñas:

// 2.2 Mostrar reseñas del restaurante con _id = 4:

// 2.3 Mostrar reseñas hechas por el usuario “Anónimo”:

// 2.4 Mostrar reseñas con calificación (sourceRating) mayor a 4.5:

// 2.5 Contar cuántas reseñas hay para cada restaurante (agrupación):

// ------------------------------
// 3) Proyecciones, ordenamiento y paginación
// ------------------------------

// 3.1 Mostrar únicamente el nombre y tipo de cocina (cuisine) de los restaurantes, ordenados por nombre ascendente:

// 3.2 Saltar los 2 primeros restaurantes (según orden alfabético) y mostrar los siguientes 3:

// ------------------------------
// 4) Expresiones regulares avanzadas
// ------------------------------

// 4.1 Mostrar restaurantes que contengan la palabra “Steak” en su nombre (insensible a mayúsculas):

// ------------------------------
// 5) Actualizaciones básicas
// ------------------------------

// 5.1 Aumentar en 0.1 el rating de todos los restaurantes que tengan rating < 4.5:

// 5.2 Eliminar el campo “specialDiets” de todos los documentos:


// ------------------------------
// 6) Eliminaciones básicas
// ------------------------------

// 6.1 Eliminar un restaurante específico (por _id = 9) y sus reseñas relacionadas:
//    a) Eliminar el restaurante

//    b) Eliminar todas las reseñas con restaurant_id = 9
