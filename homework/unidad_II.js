// ejercicio_general_mongodb.js

// TAREA: Práctica integral MongoDB (CRUD, filtros, agregaciones y validación de esquemas)
// ----------------------------------------------------------------------------------
// 1. Crear base de datos y colección con validación de esquema
// ----------------------------------------------------------------------------------

use tienda_general;

// Paso 1.1: Eliminar la colección si existe
db.productos.drop();

// Paso 1.2: Crear una colección llamada "productos" con validación de esquema
// Requerimientos:
// - Campos obligatorios: nombre, precio, categoria, stock
// - Tipos de datos:
//     - nombre sea string
//     - precio sea  number
//     - categoria sea string
//     - stock sea int
db.createCollection("productos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "precio", "categoria", "stock"],
      properties: {
        nombre: { bsonType: "string", description: "Debe ser una cadena de texto" },
        precio: { bsonType: "number", description: "Debe ser un número (decimal o entero)" },
        categoria: { bsonType: "string", description: "Debe ser una cadena de texto" },
        stock: { bsonType: "int", description: "Debe ser un número entero" }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

// ----------------------------------------------------------------------------------
// 2. Insertar productos válidos
// ----------------------------------------------------------------------------------
// Agrega al menos cinco productos distintos, cumpliendo con el esquema anterior.
db.productos.insertMany([
  { _id: 1, nombre: "Laptop", precio: 1200, categoria: "Electrónica", stock: 5 },
  { _id: 2, nombre: "Mouse", precio: 25, categoria: "Electrónica", stock: 30 },
  { _id: 3, nombre: "Silla", precio: 90, categoria: "Muebles", stock: 10 },
  { _id: 4, nombre: "Escritorio", precio: 150, categoria: "Muebles", stock: 7 },
  { _id: 5, nombre: "Audífonos", precio: 60, categoria: "Electrónica", stock: 15 }
]);

// ----------------------------------------------------------------------------------
// 3. Realizar consultas básicas con filtros
// ----------------------------------------------------------------------------------

// Paso 3.1: Mostrar todos los productos
db.productos.find();

// Paso 3.2: Buscar productos con precio mayor a 100
db.productos.find({ precio: { $gt: 100 } });

// Paso 3.3: Buscar productos que sean de la categoría "Electrónica" y tengan más de 10 unidades en stock
db.productos.find({ categoria: "Electrónica", stock: { $gt: 10 } });

// Paso 3.4: Buscar productos cuyo nombre comience con la letra "E" (usando expresión regular)
db.productos.find({ nombre: { $regex: /^E/i } });

// ----------------------------------------------------------------------------------
// 4. Actualizar documentos
// ----------------------------------------------------------------------------------

// Paso 4.1: Aumentar el stock de los audífonos en 5 unidades
db.productos.updateOne(
  { nombre: "Audífonos" },
  { $inc: { stock: 5 } }
);

// Paso 4.2: Cambiar la categoría de la silla a "Oficina"
db.productos.updateOne(
  { nombre: "Silla" },
  { $set: { categoria: "Oficina" } }
);

// ----------------------------------------------------------------------------------
// 5. Eliminar documentos
// ----------------------------------------------------------------------------------

// Paso 5.1: Eliminar productos con stock menor o igual a 5
db.productos.deleteMany({ stock: { $lte: 5 } });

// Paso 5.2: Eliminar el producto con nombre "Mouse"
db.productos.deleteOne({ nombre: "Mouse" });

// ----------------------------------------------------------------------------------
// 6. Realizar consultas con agregaciones
// ----------------------------------------------------------------------------------

// Paso 6.1: Calcular el promedio de precios por categoría
db.productos.aggregate([
  { $group: { _id: "$categoria", promedioPrecio: { $avg: "$precio" } } }
]);

// Paso 6.2: Ordenar los productos por precio descendente
db.productos.aggregate([
  { $sort: { precio: -1 } }
]);

// Paso 6.3: Obtener el total de productos por categoría
db.productos.aggregate([
  { $group: { _id: "$categoria", totalProductos: { $sum: 1 } } }
]);

// ----------------------------------------------------------------------------------
// Fin de la práctica
// ----------------------------------------------------------------------------------
