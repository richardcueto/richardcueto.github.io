import { useState } from "react";

const FastAPI = () => {
  const [b, setb] = useState("");
  const [h, seth] = useState("");
  const [fc, setFc] = useState("");
  const [fy, setFy] = useState("");
  const [Mu, setMu] = useState("");

  const [resultado, setResultado] = useState<any>(null);
  
  const calcular= async (e: React.FormEvent) => {
    e.preventDefault();

    const datos = {
    b: Number(b),
    h: Number(h),
    fc: Number(fc),
    fy: Number(fy),
    Mu: Number(Mu)
    };
    
    const response = await fetch(
      // "http://127.0.0.1:8000/calcularAs",
      "https://richardcuetogithubio-production.up.railway.app/calcularAs",
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
      <div className="bg-amber-600 min-h-screen flex flex-col items-center justify-center p-4">

        {/* 2. Este grid crea las 2 columnas en pantallas medianas (md:grid-cols-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl items-start">

          {/* Tarjeta Principal */}
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-slate-200">

            <h1 className="text-3xl font-bold text-teal-800 text-center mb-6">CALCULO DEL ACERO REQUERIDO Asr (cm2)</h1>
            
            <img src="/images/acero.png" alt="acero" className="block mx-auto mb-6 max-h-40 object-contain"/>

            <form onSubmit={calcular} className="space-y-4">
              {/* Contenedor en Grid de 2 columnas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    b (cm)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={b}
                    onChange={(e) => setb(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    h (cm)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={h}
                    onChange={(e) => seth(e.target.value)}
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

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    Mu (t/m)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={Mu}
                    onChange={(e) => setMu(e.target.value)}
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
          {resultado ? (
            <div className="w-full max-w-lg mt-6 bg-white rounded-2xl shadow-lg p-6 border border-slate-200 space-y-4">
              <h2 className="text-3xl font-bold  text-teal-800 text-center border-b border-slate-100 pb-2">
                Resultados
              </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-800">
              <p className="font-semibold col-span-1 sm:col-span-2 text-base text-teal-800 bg-teal-50 p-2 rounded-lg border border-teal-100">
                As: <span className="font-bold">{Number(resultado.As).toFixed(2)}</span> cm2
              </p>

              <p>
                <span className="font-semibold">a:</span> {Number(resultado.a).toFixed(2)} cm
              </p>

              <p>
                <span className="font-semibold">d:</span> {Number(resultado.d).toFixed(2)} cm
              </p>

            </div>
            </div>
          ) : (
            <div className="text-slate-500 text-center p-4">
              Ingresa los datos para calcular el acero requerido.
            </div>
          )
          }

        </div>
        
      </div>
    </>
  );
};

export default FastAPI;