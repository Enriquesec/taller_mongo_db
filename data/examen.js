//restaurantes
[
  {
    _id: 1,
    name: "El Fruty Restaurante & Cafe",
    cuisine: ["Mexicana", "Healthy"],
    priceRange: "$$ - $$$",
    address: "2 A 20 Metros Del Jardín Principal, Dolores Hidalgo 37800 México",
    rating: 4.2
  },
  {
    _id: 2,
    name: "Lago Grill",
    cuisine: ["Steakhouse", "Brew Pub", "Mediterránea", "Grill", "Contemporánea", "Wine Bar"],
    priceRange: "$$ - $$$",
    address: "Calzada de los Héroes 110 G, Dolores Hidalgo 37800 México",
    rating: 4.6
  },
  {
    _id: 3,
    name: "Damónica",
    cuisine: ["Italiana"],
    specialDiets: ["Vegetarian friendly", "Vegan options"],
    priceRange: "$$ - $$$",
    address: "Calle Hidalgo 12, Dolores Hidalgo 37800 México",
    rating: 4.5
  },
  {
    _id: 4,
    name: "Carnitas Vicente",
    cuisine: ["Mexicana", "Latina"],
    priceRange: "$",
    address: "Avenida Norte 65B, Dolores Hidalgo 37800 México",
    rating: 4.8
  },
  {
    _id: 5,
    name: "Nana Pancha",
    cuisine: ["Italiana", "Pizzería"],
    priceRange: "$$ - $$$",
    address: "Guerrero 46, Colonia Centro, Dolores Hidalgo 37800 México",
    specialDiets: ["Vegetarian friendly"],
    rating: 4.5
  },
  {
    _id: 6,
    name: "Aurora's Steak House",
    cuisine: ["Italiana", "Mexicana"],
    priceRange: "$$ - $$$",
    address: "Centro Histórico, Dolores Hidalgo 37800 México",
    rating: 5.0
  },
  {
    _id: 7,
    name: "Toro Rojo Arrecheria",
    cuisine: ["Mexicana"],
    priceRange: "$$ - $$$",
    address: "Calzada de los Héroes #104, Col. Los Pinos, Dolores Hidalgo 37800 México",
    rating: 4.3
  },
  {
    _id: 8,
    name: "Patio",
    cuisine: ["Mexicana"],
    features: ["Buffet"],
    priceRange: "$$",
    address: "Centro, Dolores Hidalgo 37800 México (dentro de edificio de artesanías)",
    rating: 4.3
  },
  {
    _id: 9,
    name: "Fonda Santa Patria",
    cuisine: ["Mexicana"],
    priceRange: "$$$$",
    address: "Dolores Hidalgo 37800 México",
    rating: 4.0
  },
  {
    _id: 10,
    name: "Cielo Food & Coffee Shop",
    cuisine: ["Café"],
    priceRange: "$$$$",
    address: "Calle México 13, Dolores Hidalgo 37800 México",
    rating: 4.0
  }
]
// review

[
  {
    restaurant_id: 1,
    user: "Delia Perez",
    date: ISODate("2024-06-02"),
    comment: "Este lugar es siempre mi elección de primera calle cuando visito Dolores. El ambiente es perfecto para un café o una bebida nocturna. Recomendado para desayuno, almuerzo o cena.",
    sourceRating: 4.2
  },
  {
    restaurant_id: 2,
    user: "Ilovequito",
    date: ISODate("2021-06-01"),
    comment: "¡La comida fue excelente! Porciones generosas y todo muy sabroso. Precios razonables y ambiente hermoso.",
    sourceRating: 4.6
  },
  {
    restaurant_id: 3,
    user: "Avatar627",
    date: ISODate("2025-01-19"),
    comment: "Parada obligada si visitas Dolores. Interior limpio y con estilo, servicio amable. La pasta casera rellena de espinaca y ricotta con salsa de nuez ¡deliciosa!",
    sourceRating: 4.5
  },
  {
    restaurant_id: 4,
    user: "Bill V",
    date: ISODate("2020-03-16"),
    comment: "Las carnitas preparadas a la perfección, acompañadas de salsas, guacamole, nopales, chiles y limones. Servicio y ambiente muy buenos. ¡Imprescindible en Dolores Hidalgo!",
    sourceRating: 4.8
  },
  {
    restaurant_id: 5,
    user: "toniozaidib",
    date: ISODate("2018-10-01"),
    comment: "Compartimos alitas y una pizza “panchota” riquísima, con salsa de chile bananero picante y deliciosa. Repetiríamos sin duda.",
    sourceRating: 4.5
  },
  {
    restaurant_id: 6,
    user: "Adriana R",
    date: ISODate("2025-03-25"),
    comment: "¡Delicioso y excelente servicio! El pozolillo con tuétano y el filete en salsa dulce son imperdibles. Ambiente limpio y cómodo en el centro de Dolores.",
    sourceRating: 5.0
  },
  {
    restaurant_id: 7,
    user: "Yosh",
    date: ISODate("2019-08-08"),
    comment: "Excelente relación calidad-precio. La carne al carbón es deliciosa, la barra de ensaladas muy surtida y servicio rápido. Repetiré en mi próxima visita.",
    sourceRating: 4.3
  },
  {
    restaurant_id: 8,
    user: "Augusto Zamora",
    date: ISODate("2019-08-15"),
    comment: "Opción ideal para buffet de desayuno, comida o cena. Ubicado en el centro, dentro de un edificio con artesanías. Menú variado y mexicano al cien.",
    sourceRating: 4.3
  },
  {
    restaurant_id: 9,
    user: "Anónimo",
    date: ISODate("2020-09-20"),
    comment: "Buen ambiente y comida típica mexicana de alta categoría. El lugar es tranquilo y acogedor.",
    sourceRating: 4.0
  },
  {
    restaurant_id: 10,
    user: "Anónimo",
    date: ISODate("2018-08-01"),
    comment: "Espacio muy lindo y agradable para disfrutar café y snacks. Buena opción para descansar tras recorrer el centro.",
    sourceRating: 4.0
  }
]