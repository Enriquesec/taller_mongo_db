// validacion_basica.js
// Instrucciones: Ejecuta en mongosh con: mongosh validacion_basica.js

use validacion_paso;

// 1. Eliminar la colección si ya existe
db.productos.drop(); // Borra la colección 'productos' si existe

// 2. Crear colección con validación de esquema básica
db.createCollection("productos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre"],
      properties: {
        nombre: {
          bsonType: "string",
          description: "El nombre del producto debe ser un string"
        }
      }
    }
  },
  validationLevel: "strict",      // Rechaza cualquier documento inválido
  validationAction: "error"       // Lanza error si no cumple el esquema
});

// 3. Insertar un documento válido
db.productos.insertOne({ nombre: "Lápiz" }); //  Este documento es válido

// validacion_paso_a_paso.js: Validación de esquema paso a paso en MongoDB
// Ejecutar en mongosh con: mongosh validacion_paso_a_paso.js

use validacion_paso;

// Paso 0: Limpiar la colección (si existe)
db.productos.drop();

////////////////////////////////////////////////////////////////////////////////
// PASO 1: Crear colección sin validación
// Permite insertar cualquier estructura
////////////////////////////////////////////////////////////////////////////////

db.createCollection("productos");
db.productos.insertOne({ nombre: "Cable USB", precio: 100, extra: true });

////////////////////////////////////////////////////////////////////////////////
// PASO 2: Agregar propiedad "properties" sin restricciones (solo define los campos)
////////////////////////////////////////////////////////////////////////////////

db.runCommand({
  collMod: "productos",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        nombre: {},
        precio: {}
      }
    }
  },
  validationLevel: "moderate"
});

// Sigue permitiendo cualquier cosa
db.productos.insertOne({ nombre: 1234, precio: "barato" });

////////////////////////////////////////////////////////////////////////////////
// PASO 3: Definir los tipos de datos en "properties"
////////////////////////////////////////////////////////////////////////////////

db.runCommand({
  collMod: "productos",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        nombre: { bsonType: "string" },
        precio: { bsonType: "int" }
      }
    }
  }
});

// Solo nombre tipo string y precio tipo int (pero aún no son obligatorios)
db.productos.insertOne({ nombre: "Monitor" }); // OK
db.productos.insertOne({ precio: 5000 });      // OK
db.productos.insertOne({ nombre: 789, precio: "caro" }); //

////////////////////////////////////////////////////////////////////////////////
// PASO 4: Agregar campos requeridos con "required"
////////////////////////////////////////////////////////////////////////////////

db.runCommand({
  collMod: "productos",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "precio"],
      properties: {
        nombre: { bsonType: "string" },
        precio: { bsonType: "int" }
      }
    }
  }
});

// Ahora nombre y precio son obligatorios
try {
  db.productos.insertOne({ nombre: "Teclado" }); //
} catch (e) {
  print("Error esperado (falta precio):", e.message);
}

////////////////////////////////////////////////////////////////////////////////
// PASO 5: Agregar validación de rango para el precio (por ejemplo, mínimo)
////////////////////////////////////////////////////////////////////////////////

db.runCommand({
  collMod: "productos",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "precio"],
      properties: {
        nombre: { bsonType: "string" },
        precio: { bsonType: "int", minimum: 0 }
      }
    }
  }
});

// Insertar válido
db.productos.insertOne({ nombre: "Laptop", precio: 15000 });

// Insertar inválido (precio negativo)
try {
  db.productos.insertOne({ nombre: "Disco duro", precio: -500 });
} catch (e) {
  print("Error esperado (precio negativo):", e.message);
}

////////////////////////////////////////////////////////////////////////////////
// PASO 6: Agregar campo opcional "categoria" y validar tipo si existe
////////////////////////////////////////////////////////////////////////////////

db.runCommand({
  collMod: "productos",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "precio"],
      properties: {
        nombre: { bsonType: "string" },
        precio: { bsonType: "int", minimum: 0 },
        categoria: { bsonType: "string" }
      }
    }
  }
});

// Válido: con categoría
db.productos.insertOne({ nombre: "Tablet", precio: 3000, categoria: "Tecnología" });

// Inválido: categoría tipo numérico
try {
  db.productos.insertOne({ nombre: "Smartwatch", precio: 2000, categoria: 123 });
} catch (e) {
  print("Error esperado (categoria debe ser string):", e.message);
}

////////////////////////////////////////////////////////////////////////////////
// PASO 7: Añadir un campo embebido validado ("fabricante" con nombre y país)
////////////////////////////////////////////////////////////////////////////////

db.runCommand({
  collMod: "productos",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "precio"],
      properties: {
        nombre: { bsonType: "string" },
        precio: { bsonType: "int", minimum: 0 },
        categoria: { bsonType: "string" },
        fabricante: {
          bsonType: "object",
          required: ["nombre", "pais"],
          properties: {
            nombre: { bsonType: "string" },
            pais: { bsonType: "string" }
          }
        }
      }
    }
  }
});

// Válido
db.productos.insertOne({
  nombre: "Router",
  precio: 1200,
  categoria: "Redes",
  fabricante: { nombre: "NetTech", pais: "México" }
});

// Inválido: falta campo requerido dentro de objeto embebido
try {
  db.productos.insertOne({
    nombre: "Impresora",
    precio: 2500,
    categoria: "Oficina",
    fabricante: { nombre: "PrintCorp" }
  });
} catch (e) {
  print("Error esperado (falta pais en fabricante):", e.message);
}
