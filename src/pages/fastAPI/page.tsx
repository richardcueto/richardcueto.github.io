import { useState } from "react";

const FastAPI = () => {
  const [luz, setLuz] = useState("");
  const [carga, setCarga] = useState("");
  const [fc, setFc] = useState("");
  const [fy, setFy] = useState("");

  const [resultado, setResultado] = useState<any>(null);
  
  const calcular= async (e: React.FormEvent) => {
    e.preventDefault();

    const datos = {
    luz: Number(luz),
    carga: Number(carga),
    fc: Number(fc),
    fy: Number(fy)
    };

    const response = await fetch(
      "http://127.0.0.1:8000/calcular",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      }
    );
  
    const data = await response.json();
  
    console.log(data);

    setResultado(data);
  }

  return (
    <>
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
  
  {/* Tarjeta Principal */}
  <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-slate-200">
    
    <h1 className="text-3xl font-bold text-teal-800 text-center mb-6">
      Calculadora de Viga
    </h1>

    <form onSubmit={calcular} className="space-y-4">
      {/* Contenedor en Grid de 2 columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1">
            Luz (m)
          </label>
          <input
            type="number"
            step="any"
            value={luz}
            onChange={(e) => setLuz(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1">
            Carga (t/m)
          </label>
          <input
            type="number"
            step="any"
            value={carga}
            onChange={(e) => setCarga(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1">
            f'c (kg/cm²)
          </label>
          <input
            type="number"
            step="any"
            value={fc}
            onChange={(e) => setFc(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1">
            fy (kg/cm²)
          </label>
          <input
            type="number"
            step="any"
            value={fy}
            onChange={(e) => setFy(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition"
          />
        </div>

      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 shadow"
      >
        Calcular
      </button>

    </form>
  </div>

  {/* Tarjeta de Resultados */}
  {resultado && (
    <div className="w-full max-w-lg mt-6 bg-white rounded-2xl shadow-lg p-6 border border-slate-200 space-y-4">
      <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2">
        Resultados
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-800">
        <p className="font-semibold col-span-1 sm:col-span-2 text-base text-teal-800 bg-teal-50 p-2 rounded-lg border border-teal-100">
          Momento: <span className="font-bold">{resultado.momento}</span>
        </p>

        <p>
          <span className="font-semibold">Luz:</span> {resultado.luz} m
        </p>

        <p>
          <span className="font-semibold">Carga:</span> {resultado.carga} t/m
        </p>

        <p>
          <span className="font-semibold">f'c:</span> {resultado.fc} kg/cm²
        </p>

        <p>
          <span className="font-semibold">fy:</span> {resultado.fy} kg/cm²
        </p>
      </div>
    </div>
  )}

</div>
    </>
  );
};

export default FastAPI;