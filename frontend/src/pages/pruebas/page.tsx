export default function Prueba() {

  const abrirReproductor = async () => {
    window.open('/reproductor/index.html', '_blank');
  };

  return ( 
    <div className="bg-white sm:bg-amber-200 md:bg-blue-200 lg:bg-red-200" > 

      <button className="bg-gray-300 w-1/3 h-8 m-4 rounded-2xl" onClick={abrirReproductor}>
        Abrir Reproductor
      </button>

      <form className="bg-green-200 w-80 mx-auto mt-8 rounded-lg p-6" action="">
        <input className="border border-gray-300 text-black w-full px-3 py-2 mb-4 rounded-md disabled:bg-amber-700" type="text" placeholder="ingresa tu texto" disabled/>

        <input className="border border-gray-300 text-black w-full px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600 invalid:focus:ring-red-400 peer" type="email" placeholder="Ingresa tu correo"/>
        <p className="text-red-400 hidden peer-invalid:block">El correo es invalido</p>

        <input className="border border-gray-300 text-black w-full px-3 py-2 mt-4 mb-4 rounded-md" type="password" placeholder="Ingresa tu contraseña"/>
        <button className="w-full bg-blue-200 py-2 rounded-md cursor-pointer hover:bg-amber-700">boton</button>

      </form>

      <div className="grid grid-cols-2 gap-4 max-h-10">
        <div className="card col-span-2">header</div>
        <div className="card col-span-2">nav</div>
        <div className="card">section</div>
        <div className="card">article</div>
        <div className="card row-[3/5] -col-start-2">aside</div>
        <div className="card col-span-2">footer</div>
      </div>

    </div>
  );
};
