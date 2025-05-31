// Ejemplo: ¿Para qué sirven los índices en MongoDB?

// Seleccionar base de datos
use ejemploIndices;

// Limpiar colección si ya existe
db.usuarios.drop();

// Insertar documentos de ejemplo
db.usuarios.insertMany([
  { nombre: "Ana", correo: "ana@mail.com" },
  { nombre: "Luis", correo: "luis@mail.com" },
  { nombre: "Carlos", correo: "carlos@mail.com" },
  { nombre: "Beatriz", correo: "bea@mail.com" },
  { nombre: "Diana", correo: "diana@mail.com" }
]);

// Repetir muchos usuarios para simular volumen de datos
for (let i = 0; i < 10000; i++) {
  db.usuarios.insertOne({
    nombre: "Usuario" + i,
    correo: "usuario" + i + "@mail.com"
  });
}

// 1. Buscar sin índice
print("\n🔍 Buscando sin índice:");
printjson(
  db.usuarios.find({ nombre: "Luis" }).explain("executionStats")
);

// 2. Crear índice en el campo "nombre"
db.usuarios.createIndex({ nombre: 1 });

// 3. Buscar con índice
print("\n⚡ Buscando con índice:");
printjson(
  db.usuarios.find({ nombre: "Luis" }).explain("executionStats")
);

// 4. Mostrar los índices existentes
print("\n📚 Índices actuales en la colección:");
printjson(db.usuarios.getIndexes());
