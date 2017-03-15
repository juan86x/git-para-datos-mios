    window.onload=function(){
      var juego = new Juego();
      juego.iniciar();
      document.getElementById("clase-apuesta").onchange = function(){
        juego.elegirApuesta();
      } 
      document.getElementById("botonAgregar").onclick = function(){
        juego.agregarApuesta(); 
      } 
      document.getElementById("botonTirar").onclick = function(){
        juego.evaluar();
      }      
      document.getElementById("cantidad").onfocus = function(){
        this.value = " ";
      }  
    };
    