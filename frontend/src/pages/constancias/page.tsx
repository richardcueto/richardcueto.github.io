import { useState } from "react"

const api_key='AIzaSyDznsiBK9rI54ueTkqVxFUWWAOf0yZNmIw';
const id_spreadSheet='1N0KemNzBUua4q558XX-opwRTVx4nhaZ3Cv3WTv-aurc';
const rango = 'Constancias!A2:F100';
const url = `https://sheets.googleapis.com/v4/spreadsheets/${id_spreadSheet}/values/${rango}?key=${api_key}`

interface CertificadoData {
  nombre?: string;
  curso?: string;
  fecha?: string;
  estado?: string;
  link?: string;
  error?: string;
}
export default function Constancias() {
    const [codigo, setCodigo] = useState(String);
    const [resultado, setResultado] = useState<CertificadoData | null>(null);

    const btnConstancias = async (e: React.FormEvent) =>{
        e.preventDefault();

        try{
            const respuesta = await fetch(url);

            const data = await respuesta.json();

            if (data.values && data.values.length>0){
                const coincidir = data.values.find((fila:string[]) => fila[0]==codigo)

                if (coincidir){
                    setResultado({
                        nombre: coincidir[1],
                        curso: coincidir[2],
                        fecha: coincidir[3],
                        estado: coincidir[4],
                        link: coincidir[5],
                    })
                }
            }
        }catch(e){
            console.log(e)
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-[30px] rounded-[15px] shadow-md w-full max-w-[400px] text-center">
                <h2 className="text-2xl font-bold">Validación de Constancia</h2>

                <input 
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    placeholder="Ingrese código de constancia"
                    className="w-full p-[10px] text-[16px] text-center mb-[15px] rounded-[8px] border border-[#ccc]"  
                />
                
                <button onClick={btnConstancias} className="bg-[#007BFF] text-white px-[15px] py-[10px] border-none rounded-[8px] cursor-pointer text-[16px]">Consultar</button>

                {resultado!=null &&
                    <div className="m-3">

                        ✅ <b>Código válido</b><br></br><br></br>
                        <b>Nombre del estudiante:</b> {resultado.nombre}<br></br>
                        <b>Curso:</b> {resultado.curso}<br></br>
                        <b>Fecha de certificado:</b> {resultado.fecha}<br></br>
                        <b>Estado:</b> {resultado.estado}<br></br>
                        <a href={resultado.link} target="_blank">📄 Ver constancia (PDF)</a>
                    </div>
                }
            </div>
        </div>
    )
}