// --- CRUD Básico ---

// C (Crear - Insertar)
// Insertar un solo documento
db.productos.insertOne({
  nombre: "Laptop",
  marca: "XYZ",
  precio: 1200,
  stock: 50,
  etiquetas: ["electrónica", "tecnología"]
});

// Insertar múltiples documentos
db.usuarios.insertMany([
  { nombre: "Ana", edad: 30, ciudad: "Madrid" },
  { nombre: "Luis", edad: 25, ciudad: "Barcelona" },
  { nombre: "Maria", edad: 35, ciudad: "Madrid" }
]);

// R (Leer - Consultar)
// Leer todos los documentos de una colección
db.productos.find({});

// Leer un solo documento que coincida con el filtro
db.productos.findOne({ nombre: "Laptop" });

// U (Actualizar)
// Actualizar un solo documento
db.productos.updateOne(
  { nombre: "Laptop" },
  { $set: { precio: 1150, disponible: true } }
);

// Actualizar múltiples documentos
db.productos.updateMany(
  { marca: "XYZ" },
  { $inc: { stock: 10 } } // Incrementa el stock en 10
);

// D (Borrar - Eliminar)
// Eliminar un solo documento
db.productos.deleteOne({ nombre: "Laptop" });

// Eliminar múltiples documentos
db.productos.deleteMany({ stock: { $lt: 5 } }); // Elimina productos con stock menor a 5


// --- Filtros Básicos ---

// Igualdad
db.productos.find({ marca: "XYZ" });

// Operadores de Comparación
// Mayor o igual que (gte)
db.productos.find({ precio: { $gte: 1000 } });

// Menor o igual que (lte)
db.productos.find({ precio: { $lte: 1500 } });

// Rango (entre 1000 y 1500)
db.productos.find({ precio: { $gte: 1000, $lte: 1500 } });

// No igual (ne)
db.usuarios.find({ ciudad: { $ne: "Madrid" } });

// Operadores Lógicos
// AND implícito: coincide con ambas condiciones
db.productos.find({ marca: "XYZ", stock: { $gt: 20 } });

// OR: coincide con al menos una condición
db.usuarios.find({ $or: [{ edad: { $lt: 20 } }, { ciudad: "Barcelona" }] });

// NOT: invierte el resultado de una expresión
db.usuarios.find({ edad: { $not: { $gt: 30 } } }); // Usuarios que NO tienen más de 30 años (es decir, tienen 30 o menos)

// Elementos en un Array ($in, $nin)
db.productos.find({ etiquetas: { $in: ["electrónica", "oferta"] } }); // Productos con 'electrónica' O 'oferta'
db.productos.find({ etiquetas: { $nin: ["juguetes"] } }); // Productos que NO tienen 'juguetes'

// Existencia de Campo ($exists)
db.productos.find({ stock: { $exists: true } }); // Documentos que tienen el campo 'stock'
db.productos.find({ 'dimensiones.alto': { $exists: false } }); // Documentos que NO tienen el campo anidado 'dimensiones.alto'
