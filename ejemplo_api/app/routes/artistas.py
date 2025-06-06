from fastapi import APIRouter
from app.models import Artista
from app.database import coleccion_artistas

router = APIRouter()

@router.get("/")
def obtener_artistas():
    artistas = list(coleccion_artistas.find({}))
    return artistas

@router.get("/{id}")
def obtener_artista(id: int):
    artista = list(coleccion_artistas.find({"_id": id}))
    return artista

@router.delete("/{id}")
def eliminar_artista(id: int):
    resultado = coleccion_artistas.delete_one({"_id": id})
    if resultado.deleted_count == 1:
        return {"mensaje": f"Artista con ID {id} eliminado"}
    return {"mensaje": "No se encontró el artista"}

@router.put("/{id}")
def actualizar_artista(id: int, artista_actualiza: Artista):
    datos = artista_actualiza.model_dump(by_alias=True, exclude={"id"})
    coleccion_artistas.update_one({"_id": id}, {"$set": datos})
    return {"mensaje": f"Artista con ID {id} actualizado"}
