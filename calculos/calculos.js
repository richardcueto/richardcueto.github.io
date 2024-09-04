function limpiar(){
    document.getElementById("miFormulario").reset();
}

function sumar() {
    var x=parseInt(document.getElementById("valor1").value);
    var y=parseInt(document.getElementById("valor2").value);
    document.getElementById("elRestultado").innerHTML=x+y
}
