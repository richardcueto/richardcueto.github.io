export default function VentasWhatsapp() {
    const urlImagen = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNiLLzxr-Gn_5n-xfTipK3UgyArMyGsYGe1S2uq6QoPw&s=10';
    const mensaje = `Hola, quiero información sobre el producto: ${urlImagen} `

    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
            <div className="bg-amber-900 flex flex-col items-center">
                <img className="size-30 shadow-2xl rounded-md mx-auto mt-2" src="/images/acero.png" alt="" />
                <span className="text-2xl font-medium text-green-500">concreto armado</span>
                <span className="font-medium text-sky-500">Productos de imagen</span>
                <span className="font-medium text-purple-500">
                <a href={`https://wa.me/51930554795?text=${encodeURIComponent(mensaje)}`}>whatsapp</a>
                </span>
            </div>

            <div className="bg-amber-900 flex flex-col items-center">
                <img className="size-30 shadow-2xl rounded-md mx-auto mt-2" src="/images/acero.png" alt="" />
                <span className="text-2xl font-medium text-green-500">concreto armado</span>
                <span className="font-medium text-sky-500">Productos de imagen</span>
                <span className="font-medium text-purple-500">
                <a href={`https://wa.me/51930554795?text=${encodeURIComponent(mensaje)}`}>whatsapp</a>
                </span>
            </div>

            <div className="bg-amber-900 flex flex-col items-center">
                <img className="size-30 shadow-2xl rounded-md mx-auto mt-2" src="/images/acero.png" alt="" />
                <span className="text-2xl font-medium text-green-500">concreto armado</span>
                <span className="font-medium text-sky-500">Productos de imagen</span>
                <span className="font-medium text-purple-500">
                <a href={`https://wa.me/51930554795?text=${encodeURIComponent(mensaje)}`}>whatsapp</a>
                </span>
            </div>

            <div className="bg-amber-900 flex flex-col items-center">
                <img className="size-30 shadow-2xl rounded-md mx-auto mt-2" src="/images/acero.png" alt="" />
                <span className="text-2xl font-medium text-green-500">concreto armado</span>
                <span className="font-medium text-sky-500">Productos de imagen</span>
                <span className="font-medium text-purple-500">
                <a href={`https://wa.me/51930554795?text=${encodeURIComponent(mensaje)}`}>whatsapp</a>
                </span>
            </div>
            </div>
        </div>
    )
    
}