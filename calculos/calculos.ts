function limpiar(){
    const form=document.getElementById("miFormulario") as HTMLFormElement;
    form.reset();
}

function sumar(){
    const valor1 = document.getElementById('valor1') as HTMLInputElement;
    const valor2 = document.getElementById('valor2') as HTMLInputElement;
    const resultado = document.getElementById('elRestultado') as HTMLSpanElement;
    if (valor1 && valor2 && resultado) {
        debugger;
        // Parse the values as integers
        const num1 = parseInt(valor1.value, 10);
        const num2 = parseInt(valor2.value, 10);
        
        // Calculate the result
        const sum = num1 + num2;
        
        // Set the result to the span element
        resultado.textContent = sum.toString();
    } else {
        console.error('One or more elements not found.');
    }
}

const ctx=document.getElementById('myChart') as HTMLCanvasElement;
const names:string[]=['carlos','pedro','maria'];
const edades:number[]=[12,15,20];

new Chart(ctx,{
    type:'bar',
    data:{
        labels:names,
        datasets:[{
            label:'edad',
            data:edades,
            backgroundColor:[
                'rgba(54,162,235,0.2)',
                'rgba(25,150,235,0.2)',
                'rgba(54,100,32,0.2)'
            ],
            borderColor:[
                'rgba(54,162,235,0.2)',
                'rgba(25,150,235,0.2)',
                'rgba(54,100,32,0.2)'
            ],
            borderWidth:1.5
        }]
    }
})

// const ctx = document.getElementById('myChart');

// new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green'],
//     datasets: [{
//       label: '# of Votes',
//       data: [12, 19, 3, 5],
//       borderWidth: 1
//     }]
//   },
// });