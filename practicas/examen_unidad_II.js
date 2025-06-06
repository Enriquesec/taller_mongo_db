// Unidad II: Examen práctico. Duración aproximada 1:30
// - Crear y/o cambiar a la base de datos “examen”
// - Crear colecciones “restaurants” y “reviews”
//    e insertar los 10 documentos que se encuentran en data/examen.js

// ------------------------------
// 1) Consultas básicas sobre “restaurants”
// ------------------------------

// 1.1 Mostrar todos los restaurantes:
db.restaurants.find()

// 1.2 Mostrar restaurantes con rating mayor o igual a 4.5:
db.restaurants.find({ rating: { $gte: 4.5 } })

// 1.3 Mostrar restaurantes cuya cocina (cuisine) incluya “Mexicana”:
db.restaurants.find({ cuisine: "Mexicana" })

// 1.4 Mostrar restaurantes con rango de precio EXACTO "$$ - $$$":
db.restaurants.find({ priceRange: "$$ - $$$" })

// 1.5 Mostrar restaurantes que ofrezcan opciones vegetarianas o veganas:
// (campo specialDiets existe y contiene “Vegetarian friendly” o “Vegan options”)
db.restaurants.find({ specialDiets: { $in: ["Vegetarian friendly", "Vegan options"] } })

// 1.6 Mostrar restaurantes cuya dirección contenga la palabra “Centro”:
db.restaurants.find({ address: /Centro/ })

// 1.8 Ordenar restaurantes por rating descendente y mostrar los 3 primeros:
db.restaurants.find().sort({ rating: -1 }).limit(3)


// ------------------------------
// 2) Consultas sobre “reviews”
// ------------------------------

// 2.1 Mostrar todas las reseñas:
db.reviews.find()

// 2.2 Mostrar reseñas del restaurante con _id = 4:
db.reviews.find({ restaurant_id: 4 })

// 2.3 Mostrar reseñas hechas por el usuario “Anónimo”:
db.reviews.find({ user: "Anónimo" })

// 2.4 Mostrar reseñas con calificación (sourceRating) mayor a 4.5:
db.reviews.find({ sourceRating: { $gt: 4.5 } })

// 2.5 Contar cuántas reseñas hay para cada restaurante (agrupación):
db.reviews.aggregate([
  { $group: { _id: "$restaurant_id", totalReviews: { $sum: 1 } } }
])

// ------------------------------
// 3) Proyecciones, ordenamiento y paginación
// ------------------------------

// 3.1 Mostrar únicamente el nombre y tipo de cocina (cuisine) de los restaurantes, ordenados por nombre ascendente:
db.restaurants.find({}, { name: 1, cuisine: 1, _id: 0 }).sort({ name: 1 })

// 3.2 Saltar los 2 primeros restaurantes (según orden alfabético) y mostrar los siguientes 3:
db.restaurants.find()
  .sort({ name: 1 })
  .skip(2)
  .limit(3)

// ------------------------------
// 4) Expresiones regulares avanzadas
// ------------------------------

// 4.1 Mostrar restaurantes que contengan la palabra “Steak” en su nombre (insensible a mayúsculas):
db.restaurants.find({ name: { $regex: /Steak/i } })

// ------------------------------
// 5) Actualizaciones básicas
// ------------------------------

// 5.1 Aumentar en 0.1 el rating de todos los restaurantes que tengan rating < 4.5:
db.restaurants.updateMany(
  { rating: { $lt: 4.5 } },
  { $inc: { rating: 0.1 } }
)

// 5.2 Eliminar el campo “specialDiets” de todos los documentos:
db.restaurants.updateMany(
  { specialDiets: { $exists: true } },
  { $unset: { specialDiets: "" } }
)

// ------------------------------
// 6) Eliminaciones básicas
// ------------------------------

// 6.1 Eliminar un restaurante específico (por _id = 9) y sus reseñas relacionadas:
//    a) Eliminar el restaurante

//    b) Eliminar todas las reseñas con restaurant_id = 9
