// ejercicio_IT_avanzado.js
// Ejecutar en mongosh: mongosh ejercicio_IT_avanzado.js

// crea una base de datos simulacion_examen

// ===== 1) LIMPIAR E INSERTAR =====
// Eliminar colección existente y agregar 50 documentos de puestos IT


// ===== 2) CONSULTAS =====

// Obtener todos los puestos

// Puestos con salario > 85000

// Puestos remotos con seniority "senior"

// Puestos con salario entre 60000 y 80000, y seniority "semi"

// Puestos con salario mayor a 60000 y cuyo título contenga "Data Steward"

// Puestos con empresa 'CloudCorp' o 'AI Minds' y salario mayor a 80000

// ===== 3) EXPRESIONES REGULARES =====

// Títulos que terminan en "Engineer"

// Títulos que comienzan con "Data"

// Títulos que contienen "Dev" en cualquier parte (insensible a mayúsculas)

// ===== 4) ACTUALIZACIONES =====

// Incrementar salario en 5000 a todos los puestos "junior" remotos

// Cambiar título "Data Steward" a "Data Governance Specialist"

// Agregar campo "beneficios" a los puestos con salario >= 90000

// Actualizar múltiples campos: cambiar empresa y salario si es "DevOps Engineer"

// Reemplazar completamente un documento por uno nuevo

// ===== 5) ELIMINACIONES =====

// Eliminar puestos con salario menor a 55000 y que no sean remotos

// Eliminar todos los puestos de la empresa "HelpDesk Co"

// Eliminar todos los documentos cuyo título contenga "Intern"

// Eliminar documentos donde el campo "beneficios" exista

// Eliminar puestos con seniority "junior" y salario mayor a 80000 (incoherente)

// Eliminar todos los documentos cuyo campo "empresa" no exista

// Eliminar todos los puestos de la empresa "HelpDesk Co"

// ===== 6) PROYECCIÓN Y ORDENAMIENTO =====

// Mostrar solo título y salario, ordenado por salario descendente (TOP 5)

// Mostrar puestos semi con solo empresa y remoto (sin _id)
