
from pymongo import MongoClient

# URL de conexión a MongoDB
url_db = "mongodb+srv://usuario:contrasena@tallerremedial.q5s2lio.mongodb.net/?retryWrites=true&w=majority&appName=TallerRemedial"
client = MongoClient(url_db)

# Base de datos y colección
db = client["red_artistas"]
coleccion_artistas = db["artistas"]
