# archivo: api_artistas.py

# Importamos las librerías necesarias
from fastapi import FastAPI                 # Para crear la API
from pymongo import MongoClient             # Para conectarnos con MongoDB
from pydantic import BaseModel, Field       # Para definir y validar modelos de datos
from typing import Optional, List           # Para definir tipos opcionales y listas

# --------------------------
# MODELO DE DATOS CON Pydantic
# --------------------------
# Definimos cómo luce un "artista" en nuestra aplicación
class Artistas(BaseModel):
    id: Optional[int] = Field(alias="_id")  # El campo "_id" de MongoDB lo mapeamos como "id"
    nombre: str                             # Nombre del artista (obligatorio)
    disciplina: str                         # Disciplina artística (obligatorio)
    intereses: Optional[List[str]] = []     # Lista de intereses (opcional)
    activo: bool                            # Si el artista está activo (obligatorio)

    # Configuración especial del modelo
    class Config:
        populate_by_name = True             # Permite usar los nombres originales al convertir de dict a modelo
        json_encoders = {}                  # No usamos codificadores personalizados aquí
        arbitrary_types_allowed = True      # Permitimos tipos que no son estándar de Pydantic

# --------------------------
# CONEXIÓN A MONGODB
# --------------------------
# Cadena de conexión a la base de datos
url_db = "mongodb+srv://enriquesec2:1234@tallerremedial.q5s2lio.mongodb.net/?retryWrites=true&w=majority&appName=TallerRemedial"

# Cliente MongoDB
client = MongoClient(url_db)

# Seleccionamos la base de datos y la colección
db = client["red_artistas"]
colection = db["artistas"]

# --------------------------
# INICIALIZAMOS LA API
# --------------------------
app = FastAPI()

# --------------------------
# ENDPOINTS
# --------------------------

# Ruta principal de prueba
@app.get("/")
def home():
    return {"mensaje": "Hola mundo, esta es mi primera API."}

# Obtener todos los artistas
@app.get("/artistas/")
def obtener_todos_los_usuarios():
    artistas = list(colection.find({}))  # Buscamos todos los documentos en la colección
    return artistas

# Obtener un artista por su ID
@app.get("/artistas/{id}")
def obtener_artistas(id):
    artista = colection.find({"_id": int(id)})  # Buscamos un artista por su _id
    artista = list(artista)  # Convertimos el resultado en lista
    return artista

# Eliminar un artista por ID
@app.delete("/artistas/{id}")
def eliminar_artista(id):
    artista_eliminado = colection.delete_one({"_id": int(id)})
    
    if artista_eliminado.deleted_count == 1:
        return {"mensaje": f"Artista con id igual a {id} fue eliminado."}
    else:
        return {"mensaje": "No se eliminó ningún artista."}

# Actualizar los datos de un artista por su ID
@app.put("/artistas/{id}")
def actualizar_artista(id, artista_actualiza: Artistas):
    # Convertimos el modelo recibido en un diccionario compatible con MongoDB
    datos = artista_actualiza.model_dump(by_alias=True, exclude={"id"})
    
    # Actualizamos los datos en la base de datos
    resultado = colection.update_one(
        {"_id": int(id)},
        {"$set": datos}
    )
    
    return {"mensaje": f"Artista con id igual a {id} fue actualizado."}
