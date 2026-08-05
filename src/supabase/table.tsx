import { useState, useEffect } from 'react';
import { supabase } from './config'; // Asegúrate de ajustar la ruta de tu archivo config

export default function Productos() {
  // 1. Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fecha, setFecha] = useState('');

  // 2. Estado para almacenar la lista de productos traída de Supabase
  const [productos, setProductos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);

  // 3. Función para LEER datos de Supabase
  const leerProductos = async () => {
    setCargando(true);
    const { data, error } = await supabase.from('Productos').select('*');

    if (error) {
      console.error('Error al leer productos:', error);
    } else if (data) {
      setProductos(data);
    }
    setCargando(false);
  };

  // Cargar datos automáticamente al montar el componente (reemplaza al Leer() suelto)
  useEffect(() => {
    leerProductos();
  }, []);

  // 4. Función para GUARDAR datos en Supabase
  const guardarProducto = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue

    const { error } = await supabase
      .from('Productos')
      .insert([{ nombre, apellido, fecha }])
      .select();

    if (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar el registro');
    } else {
      // Limpiar los inputs
      setNombre('');
      setApellido('');
      setFecha('');
      // Recargar la lista
      leerProductos();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md text-gray-900 dark:text-white">
      <h2 className="text-xl font-bold mb-4">Registro de Productos</h2>

      {/* Formulario */}
      <form onSubmit={guardarProducto} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Guardar Registro
        </button>
      </form>

      {/* Tabla de registros */}
      <h3 className="text-lg font-semibold mb-2">Lista de Registros</h3>
      {cargando ? (
        <p className="text-sm text-gray-500">Cargando datos...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs uppercase text-gray-500 dark:text-gray-400">
                <th className="p-3">#</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Apellido</th>
                <th className="p-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((item, index) => (
                <tr key={item.id || index} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="p-3 font-semibold">{index + 1}</td>
                  <td className="p-3">{item.nombre}</td>
                  <td className="p-3">{item.apellido}</td>
                  <td className="p-3">{item.fecha || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}