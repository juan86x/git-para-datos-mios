"use strict";

/*Globales, declaracion de constantes*/

const _saldo=100;
const _numCasilleros=11;
const _costoPorApuesta=1;
const _premioPleno=20;
const _premioPares=4;
const _premioSemipleno=3;
const _premioColor=3;
const _premioMayores=2;
const _premioMenores=2;
const _mayoresQue=6;
const _menoresQue=5;

/*
Objeto
Nombre: Casillero,
Propiedades:
{integer} numero
{string} color
Comentarios:
Se inicializa con el valor del número del casillero
*/
function Casillero(i){
	this.valor=parseInt(i);
	this.ccolor = String("");
};
/*
Objeto
Nombre: Tablero,
Propiedades:
{array de objetos Casillero()} casilleros
Metodos:
crear(): Carga el arreglo casilleros con los objetos configurados
redraw(): Modifica css para visualizar colores de casilleros correspondientes
					y normaliza el tamaño de fuente
*/
function Tablero(){
	this.casilleros = [];//declaracion variable public

Tablero.prototype.crear = function (){
	for (var i = 0; i < _numCasilleros; i++) {
    this.casilleros[i]=new Casillero(i);
		if(i!=0){
			switch(i){
				case 1:
					this.casilleros[i].ccolor="red";
					break;
				case 2:
					this.casilleros[i].ccolor="black";
					break;
				case 3:
					this.casilleros[i].ccolor="red";
					break;
				case 4:
					this.casilleros[i].ccolor="black";
					break;
				case 5:
					this.casilleros[i].ccolor="red";
					break;
				case 6:
					this.casilleros[i].ccolor="red";
					break;
				case 7:
					this.casilleros[i].ccolor="black";
					break;
				case 8:
					this.casilleros[i].ccolor="red";
					break;
				case 9:
					this.casilleros[i].ccolor="black";
					break;
				case 10:
					this.casilleros[i].ccolor="black";
					break;
			}

		}

  }
	return this.casilleros;
}
Tablero.prototype.redraw = function (){
	for (var i = 0; i < _numCasilleros; i++) {
    if (this.casilleros[i].valor==0) {
        document.getElementById(i).style.color="white";
        document.getElementById(i).style.fontSize = "20px";
    }
		if (this.casilleros[i].ccolor=="black") {
        document.getElementById(i).style.color="black";
        document.getElementById(i).style.fontSize = "20px";
    }
		if (this.casilleros[i].ccolor=="red") {
			document.getElementById(i).style.color="red";
			document.getElementById(i).style.fontSize = "20px";
		}
  }
}
};
/*
Objeto
Nombre: Ruleta,
Propiedades:

Metodos:
*/
function Ruleta(){
	Ruleta.prototype.tirar = function(){
			return Math.floor((Math.random() * _numCasilleros));
	}
};
/*
Objeto
Nombre: Credito,
Propiedades:
private integer saldo
Metodos:
*/
function Credito(){
	var saldo=_saldo;
	Credito.prototype.getSaldo = function(){
		return saldo;
	}
	Credito.prototype.incrementar = function(n){
		saldo += n;
	}
	Credito.prototype.disminuir = function(n){
		saldo -= n;
	}
};
/*
Objeto
Nombre: Apuesta,
Propiedades:

Metodos:
*/
function Apuesta(){
	var valor;//declaracion variable private
	var tipo;
	var casillero;
	//declaracion variable static para contar instancias del objeto
	if ( typeof Apuesta.nApuestas == 'undefined' ) {
      Apuesta.nApuestas = 0;
  }
  ++Apuesta.nApuestas;

	Apuesta.prototype.getNapuestas = function(){
			return Apuesta.nApuestas;
	}
	Apuesta.prototype.getValor = function(){
			return valor;
	}
	Apuesta.prototype.setValor = function(n){
		//validacion
			valor = n;
	}
};
/*
Objeto
Nombre: Juego,
Propiedades:

Metodos:
*/

function Juego(){
	this.tablero = new Tablero();
	this.listaApuestas=[];
	this.listaCuadros;
	this.flag="";
	this.credito = new Credito();
	this.revancha=false;

	

	Juego.prototype.iniciar = function(){
		this.listaCuadros=this.tablero.crear();
		this.tablero.redraw();
		this.ocultarTodos();
		var select=document.getElementById("clase-apuesta");
		select.options[0].selected="selected";
		document.getElementById('saldo').innerHTML = this.credito.getSaldo();
		document.getElementById('botonTirar').style.visibility = "hidden";
		document.getElementById('mayores').firstElementChild.item(0).text = "Del "+ _mayoresQue +" al 10";
		document.getElementById('menores').firstElementChild.item(0).text = "Del "+ _menoresQue +" al 0";
	}
	Juego.prototype.ocultarTodos = function(){
		var select=document.getElementById("clase-apuesta");
		for (var i = 1; i < select.length; i++) {
			var id=String(select.options[i].value);
			if (document.getElementById(id)) {
				document.getElementById(id).style.visibility="hidden";
				document.getElementById(id).style.position="absolute";
			}
		}
	}
	Juego.prototype.elegirApuesta = function(){
		document.getElementById('botonTirar').style.visibility = "visible";
    var s=document.getElementById('clase-apuesta').value;
    switch (s) {
			case "selecciona":
					this.ocultarTodos();
					break;
      case "pleno":
					this.flag = s;
					this.ocultarTodos();
          document.getElementById(s).style.visibility="visible";
					document.getElementById(s).style.position="relative";
					document.getElementById(s).firstElementChild.options.item(0).selected="selected";//resetea el select
          break;
			case "semiplenos":
					this.flag = s;
					this.ocultarTodos();
	        document.getElementById(s).style.visibility="visible";
					document.getElementById(s).style.position="relative";
					document.getElementById(s).firstElementChild.options.item(0).selected="selected";//resetea el select
	        break;
      case "paridad":
					this.flag = s;
					this.ocultarTodos();
					document.getElementById(s).style.visibility="visible";
					document.getElementById(s).style.position="relative";
					document.getElementById(s).firstElementChild.options.item(0).selected="selected";//resetea el select
					break;
			case "color":
					this.ocultarTodos();
					document.getElementById(s).style.visibility="visible";
					document.getElementById(s).style.position="relative";
					this.flag = s;
					break;
			case "mayores":
					this.ocultarTodos();
          document.getElementById(s).style.visibility="visible";
					document.getElementById(s).style.position="relative";
					this.flag = s;
					break;
			case "menores":
					this.ocultarTodos();
					document.getElementById(s).style.visibility="visible";
					document.getElementById(s).style.position="relative";
					this.flag = s;
					break;
		}
	}
	Juego.prototype.validarCantidad = function(n){
			if( n < parseInt(this.credito.getSaldo())){
				return true;
			}else{
				alert("Completar cantidad correctamente");
				return false;
			}
		}
		Juego.prototype.imprimeListaApuestas = function(l){
			var lista = "";
			for (var i = 0; i < l.length; i++) {
				lista += "Valor:"+l[i].valor+"-Tipo:"+l[i].tipo+"-Cantidad:"+l[i].cantidad+"<br>";
			}
			document.getElementById('lista').innerHTML = lista;
		}
		Juego.prototype.agregarApuesta = function(){
			if (this.flag != "") {//esta bandera es seteada cuando hace visible el select la funcion elegirApuesta()
				document.getElementById("msj").style.visibility="hidden";	
				var id = String(this.flag); //string tipo de apuesta
				var tagSelect = document.getElementById(id).children;//objeto tag select
				var cantidad = parseInt(document.getElementById('cantidad').value);//numero de la cantidad
				var validarCantidad = this.validarCantidad(cantidad);//boolean
				if (validarCantidad) {
					if(tagSelect[0].value != "Seleccione valor"){
						var apuesta = new Apuesta();
						apuesta.valor = tagSelect[0].value;
						apuesta.tipo = id;
						apuesta.cantidad = cantidad;
						if (apuesta.tipo == "pleno" && apuesta.valor % 4==0 && apuesta.valor != 0) {
							alert("X4 - Apuesta X2 - Gana X3");
							this.credito.disminuir(cantidad * _costoPorApuesta * 2);
						}else {
							this.credito.disminuir(cantidad * _costoPorApuesta);
						}
						this.listaApuestas.push(apuesta);
						this.imprimeListaApuestas(this.listaApuestas);
					}
					document.getElementById('saldo').innerHTML = this.credito.getSaldo();
				}
			}
		}
		Juego.prototype.imprimeTirada = function(random){
			for (var i = 0; i < this.listaCuadros.length; i++) {
				if(this.listaCuadros[i].valor == random){
						var id = this.listaCuadros[i].valor;
						document.getElementById(id).style.fontSize = "40px";
						//this.tablero.redraw();
						break;
					}
				}
		}
		Juego.prototype.evaluar = function(){
			this.tablero.redraw();
			document.getElementById("msj").style.visibility="hidden";
			if(document.getElementById('lista').innerHTML != ""){
				var premio=0;
				var ruleta = new Ruleta();
				var random = ruleta.tirar();
				this.imprimeTirada(random);
				for (var i = 0; i < this.listaApuestas.length; i++) {
					var s = this.listaApuestas[i].tipo;
					switch (s) {
						case "pleno":
								if (random == this.listaApuestas[i].valor) {
									if (random % 4 == 0) {
											premio += (this.listaApuestas[i].cantidad * _premioPleno * 3);
									}else {
											premio += (this.listaApuestas[i].cantidad * _premioPleno);
									}
								}
								break;
						case "semiplenos":
								if (random == this.listaApuestas[i].valor || random == (parseInt(this.listaApuestas[i].valor) + 1)) {
											premio += (this.listaApuestas[i].cantidad * _premioSemipleno);
								}
								break;
						case "paridad":
								if (random !=0) {
									if (random % 2 == 0 && this.listaApuestas[i].valor == "par") {//si es par
											premio += this.listaApuestas[i].cantidad * _premioPares;
									}
									if (random % 2 == 1 && this.listaApuestas[i].valor == "impar") {//si es impar
											premio += this.listaApuestas[i].cantidad * _premioPares;
									}
								}
								break;
						case "color":

								for (var e = 0; e < this.listaCuadros.length; e++) {
									if(this.listaCuadros[e].valor == random && this.listaCuadros[e].ccolor == this.listaApuestas[i].valor){
										premio += this.listaApuestas[i].cantidad * _premioColor;
									}
								}
								break;
						case "mayores":
								if (random > _mayoresQue) {
										premio += this.listaApuestas[i].cantidad * _premioMayores;
								}
								break;
						case "menores":
								if (random < _menoresQue) {
										premio += this.listaApuestas[i].cantidad * _premioMenores;
								}
								break;
					}
				}
				if(premio!=0){
					document.getElementById('premio').innerHTML = "Gano!! "+premio;
					document.getElementById("msj").style.visibility="visible";
					document.getElementById("msj").style.backgroundImage ="url('img/ganaste.jpg')";
					this.credito.incrementar(premio);
					document.getElementById('saldo').innerHTML = this.credito.getSaldo();
				}else {
					document.getElementById('premio').innerHTML = "Perdio!! ";
					document.getElementById("msj").style.visibility="visible";
					document.getElementById("msj").style.backgroundImage ="url('img/perdiste.jpg')";
				}
				this.listaApuestas = [];
				document.getElementById('lista').innerHTML = "";
			}
		}
};
 