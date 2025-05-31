// Ejemplo de filtros con expresiones regulares en MongoDB

// Usar la base de datos
use biblioteca;

// Insertar documentos de ejemplo
db.libros.insertMany([
  { titulo: "Cien años de soledad", autor: "Gabriel García Márquez" },
  { titulo: "El amor en los tiempos del cólera", autor: "Gabriel García Márquez" },
  { titulo: "Crónica de una muerte anunciada", autor: "Gabriel García Márquez" },
  { titulo: "La casa de los espíritus", autor: "Isabel Allende" },
  { titulo: "Rayuela", autor: "Julio Cortázar" }
]);

// 1. Buscar títulos que contienen la palabra "amor"
print("\nTítulos que contienen 'amor':");
printjson(db.libros.find({ titulo: /amor/ })

// 2. Buscar títulos que contienen "casa" o "Casa" (insensible a mayúsculas)
print("\nTítulos que contienen 'casa' (insensible a mayúsculas):");
printjson(db.libros.find({ titulo: /casa/i })

// 3. Buscar títulos que empiezan con "Cien"
print("\nTítulos que empiezan con 'Cien':");
printjson(db.libros.find({ titulo: /^Cien/ })

// 4. Buscar autores que contienen "gabriel" (sin importar mayúsculas)
print("\nAutores que contienen 'gabriel':");
printjson(db.libros.find({ autor: /gabriel/i })

// 5. Buscar títulos que terminan en "da"
print("\nTítulos que terminan en 'da':");
printjson(db.libros.find({ titulo: /da$/ })
