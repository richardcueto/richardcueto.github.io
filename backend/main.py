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
    b: float
    h: float
    fc: float
    fy: float
    Mu: float

class Pitagoras(BaseModel):
    a: float
    b: float

@app.post("/calcularAs")
def calcularAs(datos:Viga):
    phi = 0.9
    d = datos.h-6
    a = d-(d**2-2*datos.Mu*100000/(phi*0.85*datos.fc*datos.b))**0.5
    As = datos.Mu*100000/(phi*datos.fy*(d-a/2))

    return {
        "d": d,
        "a": a,
        "As": As,
    }

@app.post("/pitagoras")
def pitagoras(datos:Pitagoras):
    c = (datos.a**2 + datos.b**2)**0.5

    return {
        "a": datos.a,
        "b": datos.b,
        "Hipotenusa": c
    }


@app.get("/")
def inicio():
    return {"mensaje": "API funcionando"}