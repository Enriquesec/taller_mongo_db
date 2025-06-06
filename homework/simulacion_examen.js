// ejercicio_IT_avanzado.js
// Ejecutar en mongosh: mongosh ejercicio_IT_avanzado.js

// crea una base de datos simulacion_examen
use simulacion_examen;

// ===== 1) LIMPIAR E INSERTAR =====
// Eliminar colección existente y agregar 50 documentos de puestos IT
db.puestos_it.drop();
db.puestos_it.insertMany([
  // Aquí coloca el array de 50 elementos que te proporcioné antes
]);

// ===== 2) CONSULTAS =====

// Obtener todos los puestos
db.puestos_it.find();

// Puestos con salario > 85000
db.puestos_it.find({ salario: { $gt: 85000 } });

// Puestos remotos con seniority "senior"
db.puestos_it.find({ remoto: true, seniority: 'senior' });

// Puestos con salario entre 60000 y 80000, y seniority "semi"
db.puestos_it.find({
  salario: { $gte: 60000, $lte: 80000 },
  seniority: 'semi'
});

// Puestos con salario mayor a 60000 y cuyo título contenga "Data Steward"
db.puestos_it.find({
  $and: [
    { salario: { $gt: 60000 } },
    { titulo: /Data Steward/i }
  ]
});

// Puestos con empresa 'CloudCorp' o 'AI Minds' y salario mayor a 80000
db.puestos_it.find({
  empresa: { $in: ['CloudCorp', 'AI Minds'] },
  salario: { $gt: 80000 }
});

// ===== 3) EXPRESIONES REGULARES =====

// Títulos que terminan en "Engineer"
db.puestos_it.find({ titulo: /Engineer$/ });

// Títulos que comienzan con "Data"
db.puestos_it.find({ titulo: /^Data/ });

// Títulos que contienen "Dev" en cualquier parte (insensible a mayúsculas)
db.puestos_it.find({ titulo: /Dev/i });

// ===== 4) ACTUALIZACIONES =====

// Incrementar salario en 5000 a todos los puestos "junior" remotos
db.puestos_it.updateMany(
  { seniority: 'junior', remoto: true },
  { $inc: { salario: 5000 } }
);

// Cambiar título "Data Steward" a "Data Governance Specialist"
db.puestos_it.updateMany(
  { titulo: 'Data Steward' },
  { $set: { titulo: 'Data Governance Specialist' } }
);

// Agregar campo "beneficios" a los puestos con salario >= 90000
db.puestos_it.updateMany(
  { salario: { $gte: 90000 } },
  { $set: { beneficios: ['bono anual', 'acciones', 'seguro privado'] } }
);

// Actualizar múltiples campos: cambiar empresa y salario si es "DevOps Engineer"
db.puestos_it.updateMany(
  { titulo: 'DevOps Engineer' },
  {
    $set: {
      empresa: 'InfraGlobal',
      salario: 95000
    }
  }
);

// Reemplazar completamente un documento por uno nuevo
db.puestos_it.replaceOne(
  { _id: 999 }, // Asegúrate de tener este _id
  {
    _id: 999,
    titulo: 'Technical Writer',
    empresa: 'DocuTech',
    salario: 55000,
    remoto: true,
    seniority: 'semi'
  }
);

// ===== 5) ELIMINACIONES =====

// Eliminar puestos con salario menor a 55000 y que no sean remotos
db.puestos_it.deleteMany({
  salario: { $lt: 55000 },
  remoto: false
});

// Eliminar todos los puestos de la empresa "HelpDesk Co"
db.puestos_it.deleteMany({ empresa: 'HelpDesk Co' });

// Eliminar todos los documentos cuyo título contenga "Intern"
db.puestos_it.deleteMany({ titulo: /Intern/i });

// Eliminar documentos donde el campo "beneficios" exista
db.puestos_it.deleteMany({ beneficios: { $exists: true } });

// Eliminar puestos con seniority "junior" y salario mayor a 80000 (incoherente)
db.puestos_it.deleteMany({
  seniority: 'junior',
  salario: { $gt: 80000 }
});

// Eliminar todos los documentos cuyo campo "empresa" no exista
db.puestos_it.deleteMany({ empresa: { $exists: false } });

// Eliminar todos los puestos de la empresa "HelpDesk Co"
db.puestos_it.deleteMany({ empresa: 'HelpDesk Co' });



// ===== 6) PROYECCIÓN Y ORDENAMIENTO =====

// Mostrar solo título y salario, ordenado por salario descendente (TOP 5)
db.puestos_it.find(
  {},
  { _id: 0, titulo: 1, salario: 1 }
).sort({ salario: -1 }).limit(5);

// Mostrar puestos semi con solo empresa y remoto (sin _id)
db.puestos_it.find(
  { seniority: 'semi' },
  { _id: 0, empresa: 1, remoto: 1 }
);
