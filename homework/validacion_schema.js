// validacion_esquema.js: Validación de esquemas en MongoDB

use validacion_demo;

// Eliminar la colección si ya existe
db.usuarios.drop();

// 1) Crear colección con validación de esquema
db.createCollection("usuarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "edad", "email", "activo"],
      properties: {
        nombre: {
          bsonType: "string",
          description: "El nombre es obligatorio y debe ser una cadena"
        },
        edad: {
          bsonType: "int",
          minimum: 18,
          maximum: 100,
          description: "Debe tener entre 18 y 100 años"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+\\..+$",
          description: "Debe ser un email válido"
        },
        activo: {
          bsonType: "bool",
          description: "Debe ser booleano"
        },
        intereses: {
          bsonType: ["array"],
          items: { bsonType: "string" },
          description: "Lista opcional de intereses"
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

// 2) Insertar documento válido
db.usuarios.insertOne({
  nombre: "Carlos",
  edad: 28,
  email: "carlos@mail.com",
  activo: true,
  intereses: ["cine", "fútbol"]
});

// 3) Insertar documento inválido (edad menor a 18)
try {
  db.usuarios.insertOne({
    nombre: "Ana",
    edad: 15,
    email: "ana@mail.com",
    activo: true
  });
} catch (e) {
  print("Error esperado (edad < 18):", e.message);
}

// 4) Insertar documento inválido (email mal formado)
try {
  db.usuarios.insertOne({
    nombre: "Luis",
    edad: 25,
    email: "correo_sin_arroba",
    activo: false
  });
} catch (e) {
  print("Error esperado (email no válido):", e.message);
}

// 5) Mostrar todos los documentos válidos insertados
print("Documentos válidos:");
printjson(db.usuarios.find().toArray());

// 6) Modificar esquema para hacer "intereses" obligatorio
db.runCommand({
  collMod: "usuarios",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "edad", "email", "activo", "intereses"],
      properties: {
        nombre: { bsonType: "string" },
        edad: { bsonType: "int", minimum: 18 },
        email: { bsonType: "string", pattern: "^.+@.+\\..+$" },
        activo: { bsonType: "bool" },
        intereses: {
          bsonType: ["array"],
          items: { bsonType: "string" }
        }
      }
    }
  }
});

// 7) Intentar insertar sin intereses (debe fallar)
try {
  db.usuarios.insertOne({
    nombre: "Laura",
    edad: 32,
    email: "laura@mail.com",
    activo: true
  });
} catch (e) {
  print("Error esperado (falta 'intereses'):", e.message);
}
