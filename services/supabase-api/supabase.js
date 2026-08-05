import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://uurweecmwceumlgsnxaa.supabase.co'
const supabaseKey = "sb_publishable_4qlQsTgU3ya_HOMEMM8Fkg_HfosZDz7"
const supabase = createClient(supabaseUrl, supabaseKey)

async function guardar(){
    var nombre1=document.getElementById("nombre").value;
    var apellido1=document.getElementById("apellido").value;
    var fecha=document.getElementById("fecha").value;

    const { data, error } = await supabase
    .from('Productos')
    .insert([
            { nombre: nombre1, apellido: apellido1 },
        ])
    .select()
    console.log(nombre1)
    console.log(apellido1)
    document.getElementById("nombre").value=""
    document.getElementById("apellido").value=""
    document.getElementById("fecha").value=""
    Leer()
}

async function Leer(){
    var tabla=document.getElementById("tabla");
    const { data, error } = await supabase
    .from('Productos')
    .select('*')

    
    if (error) {
        console.log(error)
    }else{
        
        tabla.innerHTML=""
        
        data.forEach(element => {
            tabla.innerHTML+=`
            <tr>
                <th scope="row">1</th>
                <td>${element.nombre}</td>
                <td>${element.apellido}</td>
                <td>${element.fecha}</td>
            </tr>
            `
        });

    }
}
Leer()
document.getElementById("guardar-peli").addEventListener("click", guardar);