from pydantic import BaseModel, Field
from typing import Optional, List

class Artista(BaseModel):
    id: Optional[int] = Field(alias="_id")
    nombre: str
    disciplina: str
    intereses: Optional[List[str]] = []
    activo: bool

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
