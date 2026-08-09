from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://richardcueto.github.io"

    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Viga(BaseModel):
    luz: float
    carga: float
    fc: float
    fy: float

@app.post("/calcular")
def calcular(datos:Viga):
    momento = datos.carga * datos.luz ** 2 / 8

    return {
        "momento": momento,
        "luz": datos.luz,
        "carga": datos.carga,
        "fc": datos.fc,
        "fy": datos.fy
    }


@app.get("/")
def inicio():
    return {"mensaje": "API funcionando"}