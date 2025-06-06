// ejercicios_nosql.js: script para ejecutar en mongosh
// Instrucciones: en tu terminal, ejecuta:
//    mongosh ejercicios_nosql.js

// ===== EJERCICIO 1: CRUD BÁSICO =====
use taller_nosql;

// 1. Eliminar datos previos
db.usuarios.drop();

// 2. Insertar 5 usuarios
db.usuarios.insertMany([
  { _id: 1, nombre: 'Ana', edad: 28, ciudad: 'Madrid' },
  { _id: 2, nombre: 'Luis', edad: 22, ciudad: 'Barcelona' },
  { _id: 3, nombre: 'María', edad: 35, ciudad: 'Valencia' },
  { _id: 4, nombre: 'Pedro', edad: 30, ciudad: 'Sevilla' },
  { _id: 5, nombre: 'Lucía', edad: 24, ciudad: 'Bilbao' }
]);

// 3. Leer todos los usuarios
print('Todos los usuarios:');
printjson(db.usuarios.find().toArray());

// 4. Leer usuarios con edad > 25
print('Usuarios con edad > 25:');
printjson(db.usuarios.find({ edad: { $gt: 25 } }).toArray());

// 5. Actualizar ciudad de usuario _id=2
db.usuarios.updateOne({ _id: 2 }, { $set: { ciudad: 'Granada' } });
print('Usuario 2 después de update:');
printjson(db.usuarios.findOne({ _id: 2 }));

// 6. Borrar usuario _id=5
db.usuarios.deleteOne({ _id: 5 });
print('Usuarios tras delete:');
printjson(db.usuarios.find().toArray());


// ===== EJERCICIO 2: EMBEDDING vs REFERENCING =====
// 1. Crear colección posts
db.posts.drop();

// 2. Embedding: añadir campo posts_embedded en usuarios
db.usuarios.updateOne({ _id: 1 }, { $set: {
  posts_embedded: [
    { título: 'Post A', fecha: new Date() },
    { título: 'Post B', fecha: new Date() }
  ]
}});

// 3. Referencing: insertar posts en colección posts
db.posts.insertMany([
  { título: 'JS Intro', contenido: 'Basics of JS', autor_id: 1 },
  { título: 'MongoDB Tips', contenido: 'Indexing', autor_id: 1 },
  { título: 'Node.js', contenido: 'Building servers', autor_id: 3 }
]);

// 4. Lookup: usuarios con posts referenciados
print('Usuarios con posts (embedded + referenced):');
printjson(db.usuarios.aggregate([
  { $lookup: { from: 'posts', localField: '_id', foreignField: 'autor_id', as: 'posts_ref' } },
  { $project: { nombre: 1, posts_embedded: 1, posts_ref: 1 } }
]).toArray());


// ===== EJERCICIO 3: AGREGACIONES BÁSICAS =====
// 1. Contar posts por autor
print('Posts por autor:');
printjson(db.posts.aggregate([
  { $group: { _id: '$autor_id', total_posts: { $sum: 1 } } }
]).toArray());

// 2. Edad promedio por ciudad
print('Edad promedio por ciudad:');
printjson(db.usuarios.aggregate([
  { $group: { _id: '$ciudad', edad_prom: { $avg: '$edad' } } }
]).toArray());

// 3. Project nombre y total_posts
print('Resumen posts por autor:');
printjson(db.posts.aggregate([
  { $group: { _id: '$autor_id', total_posts: { $sum: 1 } } },
  { $project: { _id: 0, autor_id: '$_id', total_posts: 1 } }
]).toArray());


// ===== EJERCICIO 4: ÍNDICES y RENDIMIENTO =====
// 1. Crear índices
db.usuarios.createIndex({ edad: 1 });
db.usuarios.createIndex({ ciudad: 1 });

// 2. explain() en consultas
print('Explain edad > 30:');
printjson(db.usuarios.find({ edad: { $gt: 30 } }).explain('executionStats'));

print('Explain ciudad = Madrid:');
printjson(db.usuarios.find({ ciudad: 'Madrid' }).explain('executionStats'));


// ===== EJERCICIO 5: CONSULTAS GEOESPACIALES =====
// 1. Crear colección lugares
db.lugares.drop();

// 2. Insertar puntos GeoJSON
db.lugares.insertMany([
  { nombre: 'Parque Central', ubicación: { type: 'Point', coordinates: [ -3.703790, 40.416775 ] } },
  { nombre: 'Museo X', ubicación: { type: 'Point', coordinates: [ -3.692127, 40.413781 ] } },
  { nombre: 'Café Y', ubicación: { type: 'Point', coordinates: [ -3.710000, 40.420000 ] } }
]);

// 3. Crear índice 2dsphere
db.lugares.createIndex({ ubicación: '2dsphere' });

// 4. Buscar lugares a 2 km de un punto
print('Lugares a <2km de punto:');
printjson(db.lugares.find({
  ubicación: {
    $near: { $geometry: { type: 'Point', coordinates: [ -3.703790, 40.416775 ] }, $maxDistance: 2000 }
  }
}).toArray());


// ===== EJERCICIO 6: TRANSACCIONES =====
// Nota: requiere replica set o servidor en modo replicaset
// 1. Crear y limpiar colección cuentas
use taller_nosql;

db.cuentas.drop();

db.cuentas.insertMany([
  { usuario_id: 1, saldo: 1000 },
  { usuario_id: 2, saldo: 500 }
]);

// 2. Iniciar sesión de transacción
db.getMongo().startSession({ readPreference: 'primary' }).withTransaction(() => {
  const cuentas = db.cuentas;
  cuentas.updateOne({ usuario_id: 1 }, { $inc: { saldo: -100 } });
  // Para probar rollback, descomenta la siguiente línea:
  // throw new Error('Falla simulada');
  cuentas.updateOne({ usuario_id: 2 }, { $inc: { saldo: 100 } });
}, {
  readConcern: { level: 'local' },
  writeConcern: { w: 'majority' }
});

print('Saldo final en cuentas:');
printjson(db.cuentas.find().toArray());
