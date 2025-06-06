from fastapi import FastAPI
from app.routes import artistas

app = FastAPI()

# Ruta principal
@app.get("/")
def home():
    return {"mensaje": "API de artistas funcionando."}

# Incluimos las rutas del módulo artistas
app.include_router(artistas.router, prefix="/artistas", tags=["artistas"])
