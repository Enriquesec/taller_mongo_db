// ejercicio_IT.js: ejercicios básicos de MongoDB en contexto IT
// Instrucciones: ejecuta en mongosh:
//    mongosh ejercicio_IT.js

use taller_nosql;

// ===== EJERCICIO IT BASICO: CRUD Y FILTROS =====
// Limpiar colección de puestos
db.puestos_it.drop();

// 1) INSERT: agregar algunos puestos de IT
print('1) Insertar puestos de IT');
db.puestos_it.insertMany([
  { _id: 301, titulo: 'DevOps Engineer', empresa: 'CloudCorp', salario: 80000, remoto: true },
  { _id: 302, titulo: 'Frontend Developer', empresa: 'WebWorks', salario: 60000, remoto: false },
  { _id: 303, titulo: 'Backend Developer', empresa: 'API Labs', salario: 70000, remoto: true },
  { _id: 304, titulo: 'QA Tester', empresa: 'Testify', salario: 50000, remoto: false },
  { _id: 305, titulo: 'Data Analyst', empresa: 'Insights Inc', salario: 65000, remoto: true }
]);
printjson(db.puestos_it.find().toArray());

// 2) READ: consultas básicas
print('\n2.a) Todos los puestos:');
printjson(db.puestos_it.find().toArray());

print('\n2.b) Puestos con salario > 65000:');
printjson(db.puestos_it.find({ salario: { $gt: 65000 } }).toArray());

print('\n2.c) Puestos remotos:');
printjson(db.puestos_it.find({ remoto: true }).toArray());

// 3) READ con operadores lógicos
print('\n3.a) Salario >= 60000 AND remoto=false:');
printjson(db.puestos_it.find({
  $and: [ { salario: { $gte: 60000 } }, { remoto: false } ]
}).toArray());

print('\n3.b) Salario < 60000 OR remoto=true:');
printjson(db.puestos_it.find({
  $or: [ { salario: { $lt: 60000 } }, { remoto: true } ]
}).toArray());

// 4) UPDATE: mejorar salario de QA Tester
print('\n4) Actualizar salario de QA Tester (id 304) a 55000');
db.puestos_it.updateOne(
  { _id: 304 },
  { $set: { salario: 55000 } }
);
printjson(db.puestos_it.findOne({ _id: 304 }));

// 5) DELETE: eliminar puesto de Frontend Developer
print('\n5) Eliminar el puesto frontend (id 302)');
db.puestos_it.deleteOne({ _id: 302 });
printjson(db.puestos_it.find().toArray());

// 6) DELETE con filtro OR: eliminar puestos con salario < 60000 OR no remoto
print('\n6) Eliminar puestos con salario < 60000 O no remoto');
db.puestos_it.deleteMany({
  $or: [ { salario: { $lt: 60000 } }, { remoto: false } ]
});
print('Puestos restantes:');
printjson(db.puestos_it.find().toArray());
