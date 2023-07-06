function calcularDisponibilidad() {
 let horas = parseFloat(document.getElementById("horas").value);
 let disponibilidad = horas * 0.75; // calculo de ejemplo, ajustar acorde a las necesidades de c/u
  document.getElementById("resultadoDisponibilidad").innerHTML = "Disponibilidad total de pastura: " + disponibilidad + " kg";
}

function calcularCrecimiento() {
 let dias = parseFloat(document.getElementById("dias").value);
 let crecimiento = dias * 100; // calculo de ejemplo, ajustar acorde a las necesidades de c/u
  document.getElementById("resultadoCrecimiento").innerHTML = "Crecimiento total de la pastura: " + crecimiento + " kg/ha";
}
