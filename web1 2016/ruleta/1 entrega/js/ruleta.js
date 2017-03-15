"use estrict";
var saldo=100;
var numeroApuesta= -1;
var numeroRuleta=-1;

function aumentarSaldo(){
  saldo += 10;
}
function aumentarSaldoExtra(){
  saldo += 15;
}
function disminuyeSaldo(){
   saldo -=1;
}
function spinRuleta(){
  return Math.floor((Math.random() * 10));
}

function tirarRuleta(){
  contador=document.getElementById('contador').innerHTML;//guarda en la variable contador el contenido de texto
                                                          //en el html entre las etiquetas con el id='contador' por default false.
  //inicializa elementos con color negro
  for (var i = 0; i < 10; i++) {
    if (document.getElementById(i).style.color=="red") {
        document.getElementById(i).style.color="black";
        document.getElementById(i).style.fontSize = "20px";
    }
  }
  //recoge el numero ingresado en el campo de texto
  numeroApuesta = document.getElementById("numero").value;
  //validacion del campo de texto
  if (numeroApuesta >= 10 || numeroApuesta <0 || numeroApuesta==""){
    alert('ERROR: El numero debe ser entre 0 y 9');
    return;
  }else{
    //si el dato ingresado es correcto...
    numeroRuleta = spinRuleta(); //genera un numero aleatorio del 0 al 9 "tira la ruleta"
    //modificacion del elemento numeroRuleta
    document.getElementById(numeroRuleta).style.color="red";
    document.getElementById(numeroRuleta).style.fontSize = "40px";
  }

  if (numeroApuesta == numeroRuleta){//si gana...
    document.getElementById("msj").style.visibility="visible";
    document.getElementById("msj").style.backgroundImage ="url('img/ganaste.jpg')";
    //ejecutar aumentar saldo segun el estado del contador (div oculto)
    if (contador=="true") {
      document.getElementById("msj").style.backgroundImage ="url('img/ganasteExtra.jpg')";
      aumentarSaldoExtra();
      document.getElementById('contador').innerHTML= "false";
    }else{
      aumentarSaldo();
      document.getElementById('contador').innerHTML= "true";
    }
  }
  else{//si pierde...
   document.getElementById("msj").style.visibility="visible";
   document.getElementById("msj").style.backgroundImage ="url('img/perdiste.jpg')";
   document.getElementById('contador').innerHTML= "false";
   disminuyeSaldo();
  }
  //actualiza el valor del saldo en pantalla
  document.getElementById('saldo').innerHTML= "Saldo $"+saldo;
  //console.log ('Apostaste al: ' + numeroApuesta);
  //console.log ('Saldo' + saldo);
}
