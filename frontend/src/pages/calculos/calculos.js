function limpiar() {
    var form = document.getElementById("miFormulario");
    form.reset();
}
function sumar() {
    var valor1 = document.getElementById('valor1');
    var valor2 = document.getElementById('valor2');
    var resultado = document.getElementById('elRestultado');
    if (valor1 && valor2 && resultado) {
        debugger;
        // Parse the values as integers
        var num1 = parseInt(valor1.value, 10);
        var num2 = parseInt(valor2.value, 10);
        // Calculate the result
        var sum = num1 + num2;
        // Set the result to the span element
        resultado.textContent = sum.toString();
    }
    else {
        console.error('One or more elements not found.');
    }
}
var ctx = document.getElementById('myChart');
var names = ['carlos', 'pedro', 'maria'];
var edades = [12, 15, 20];
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: names,
        datasets: [{
                label: 'edad',
                data: edades,
                backgroundColor: [
                    'rgba(54,162,235,0.2)',
                    'rgba(25,150,235,0.2)',
                    'rgba(54,100,32,0.2)'
                ],
                borderColor: [
                    'rgba(54,162,235,0.2)',
                    'rgba(25,150,235,0.2)',
                    'rgba(54,100,32,0.2)'
                ],
                borderWidth: 1.5
            }]
    }
});
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
