// sample_weatherdata - Aggregation Framework Exercises
// st: Código de estación meteorológica
// date: Fecha de observación
// temperature: Temperatura en °F
// humidity: Humedad relativa (%)
// windSpeed: Velocidad del viento en mph

// Ejecutar en mongosh: mongosh "mongodb+srv://<...>" --eval "load('weather_aggregation_queries.js')"
// mongosh "mongodb+srv://tallerremedial.q5s2lio.mongodb.net/" --apiVersion 1 --username <db_username>
// mongodb+srv://<db_username>:<db_password>@tallerremedial.q5s2lio.mongodb.net/

use sample_weatherdata;

// 1. Calcula la temperatura promedio por estación meteorológica (campo 'st') y ordénalas de mayor a menor

// 2. Cuenta la cantidad de registros por año calendario (sin $addFields)

// 3. Muestra las estaciones con humedad promedio superior a 80%

// 4. Devuelve las 5 temperaturas más altas registradas, mostrando la estación y la fecha de registro

// 5. Calcula el promedio de velocidad del viento por estación y ordénalo de mayor a menor

// 6. Total de registros en 2020 por combinación de estación y mes (dificultad: intermedia)

// 7. Lista las estaciones meteorológicas que tienen más de 500 registros en total

// 8. Día más caluroso registrado para las estaciones USW00094728 (New York Central Park) y USC00341900 (Buffalo)

// 9. Agrupa los datos por estación y muestra la humedad máxima registrada en cada una

// 10. Promedio mensual de temperatura y viento para 2019

