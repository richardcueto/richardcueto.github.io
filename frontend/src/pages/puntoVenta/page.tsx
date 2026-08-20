import React, { useEffect, useState } from "react";
import { supabase_selecionar, supabase_insertar, supabase_Actualizar, supabase_Eliminar } from "../../services/baseDatos";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Usuarios } from "../../types/puntoVenta";

export default function PuntoVenta() {
  const [usuarios, setUsuarios] = useState<Usuarios[]>([]);
  const [open, setOpen] = useState(false)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuarios | null>(null);
  const [idSeleccionado, setIdSeleccionado] = useState<number>(0);

  const cargarUsuario = async () => {
    const data = await supabase_selecionar({tabla:"usuario",select:`
      idusuario,
      documento,
      nombrecompleto,
      correo,
      clave,
      rol: idrol(
        idrol,
        descripcion,
        fecharegistro
      ),
      estado,
      fecharegistro
      `})
    
    console.log(data)
    if (data) setUsuarios(data as Usuarios[]);
  };

  const eliminarUsuario = async (id:number) => {
    await supabase_Eliminar({tabla:"usuario", where:{
      idusuario: id
    }})

    cargarUsuario()
  };

  // Funcion guardar o actualizar
  const enviarFormulario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Leemos el formulario
    const formData = new FormData(e.currentTarget);

    const datosEditados = {
      documento: formData.get("documento") as string,
      nombrecompleto: formData.get("nombrecompleto") as string,
      correo: formData.get("correo") as string,
      clave: formData.get("clave") as string,
      rol: formData.get("rol") as string,
      estado: formData.get("estado") as string,
    }

    console.log(datosEditados)
    if (idSeleccionado != 0){

      await supabase_Actualizar({tabla:"usuario", update:{
        documento:datosEditados.documento,
        nombrecompleto: datosEditados.nombrecompleto,
        correo: datosEditados.correo,
        clave: datosEditados.clave,
        idrol: datosEditados.rol,
        estado: datosEditados.estado
      },where:{"idusuario":idSeleccionado}})

    }else{
      await supabase_insertar({tabla:"usuario",insert:{
        documento:datosEditados.documento,
        nombrecompleto: datosEditados.nombrecompleto,
        correo: datosEditados.correo,
        clave: datosEditados.clave,
        idrol: datosEditados.rol,
        estado: datosEditados.estado
      }})

    }
    
    cargarUsuario();
    setOpen(false);
  }

  useEffect(() => {
    cargarUsuario();
  },[])

  return (
    <>
      <button 
        className="bg-amber-100"
        type="button"
        onClick={() => {
          setOpen(true);
        }}
      >Agregar</button>

      <table className="bg-amber-500 text-black">
        <thead>
          <tr>
            <th >Lista de Usuarios</th>
          </tr>
          <tr>
            <th>#</th>
            <th>Nro Documento</th>
            <th>Nombre Completo</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario)=>(
            <tr key={usuario.idusuario}>
              <td>
                <button
                  type="button"
                  onClick={() => {

                    if (usuario.idusuario) setIdSeleccionado(usuario.idusuario)

                    setUsuarioSeleccionado(usuario);
                    setOpen(true);
                  }}
                >{usuario.idusuario}
                </button>
              </td>
              <td>{usuario.documento}</td>
              <td>{usuario.nombrecompleto}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.rol?.descripcion || ""}</td>
              <td>{usuario.estado == 1 ? "Activo" : "Inactivo"}</td>
              <td>
                <button
                  type="button"
                  onClick={() => eliminarUsuario(usuario.idusuario)}
                >Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* modal */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <form onSubmit={enviarFormulario}>
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                        Usuario
                      </DialogTitle>
                      <label >{idSeleccionado}</label>
                      <div className="mt-2 grid grid-cols-2">
                        <label htmlFor="">N° Documento: </label>
                        <input className="mb-2 p-2 border border-blue-600 rounded-md" name="documento" type="text" defaultValue={usuarioSeleccionado?.documento} placeholder="N° Documento"/>

                        <label htmlFor="">Nombre completo: </label>
                        <input className="mb-2 p-2 border border-blue-600 rounded-md" name="nombrecompleto" type="text" defaultValue={usuarioSeleccionado?.nombrecompleto} placeholder="Nombre completo"/>

                        <label htmlFor="">Correo: </label>
                        <input className="mb-2 p-2 border border-blue-600 rounded-md" name="correo" type="text" defaultValue={usuarioSeleccionado?.correo} placeholder="Correo"/>

                        <label htmlFor="">Contraseña: </label>
                        <input className="mb-2 p-2 border border-blue-600 rounded-md" name="clave" type="text" defaultValue={usuarioSeleccionado?.clave} placeholder="Contraseña"/>

                        <label htmlFor="">Rol: </label>
                        <select 
                          className="mb-2 p-2" 
                          name="rol"
                          defaultValue={usuarioSeleccionado?.rol.idrol} 
                          required
                          >
                          <option value="" disabled>Seleccione un rol</option>
                          <option value="1">Administrador</option>
                          <option value="2">Usuario</option>
                        </select>

                        <label htmlFor="">Estado: </label>
                        <select className="mb-2 p-2" 
                          name="estado"
                          defaultValue={usuarioSeleccionado?.estado} 
                          required>
                          <option value="1">Activo</option>
                          <option value="0">Innactivo</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => {
                      setOpen(false);
                      setUsuarioSeleccionado(null);
                      setIdSeleccionado(0);
                    }}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancelar
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
}
