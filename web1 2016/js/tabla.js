"use strict";

$('document').ready(function(){     //siempre para iniciar con codigo Jquery, despues que el DOM haya sido cargado.
                  //esto nos puede avisar cuando la pagian este completamente cargada.
  var grupo = 30;             // Definicion de Variables el nro del grupo

    function obtenerInfo(grupo){   // ###### LLAMADA AJAX MEDIANTE GET  ##########
    $.ajax({
      type: 'GET',
      dataType: 'JSON',         // datos enviados al server
      url: 'http://web-unicen.herokuapp.com/api/group/' + grupo,      // consulta que hacemos por grupo
      success: function(data){        // funcion que se ejecutara cuando el request fue exitoso
            var nombre = '';
            var raza = '';
            var edad = '';
            var sexo = '';
            var eliminar = '';
            var registro = '';
            $('#descripcion-mascota').html('');                    //tbody de mi tabla
            for (var i = 0 ; i < data.information.length ; i++){
              nombre = data.information[i]['thing']['nombre'];
              raza = data.information[i]['thing']['raza'];
              edad = data.information[i]['thing']['edad'];              // ####### RECIBIMOS INFORMACION Y EDITAMOS EL DOM  #########
              sexo = data.information[i]['thing']['sexo'];
              eliminar = '<input class="btn btn-danger eliminar" type="button" value="eliminar"></input>';
              registro = '<tr><td class="horario">' + nombre + '</td><td>' + raza + '</td><td>' + edad + '</td><td>' + sexo + '</td><td>'  + eliminar +'</td></tr>';
              $('#descripcion-mascota').append(registro);       // añadimos
            }
            var btnsEliminar = $('.eliminar');
            for (var i = 0; i < btnsEliminar.length; i++) {
              aEliminar(i,data.information[i]['_id']);
            }
          },
      error: function(){            // funcion que se ejecutara cuando el request tuvo un error
            alert('Error, no se  puede cargar la tabla');
          }
    });
  };

  function aEliminar(i,id){
    var btn = $(".eliminar")[i];
    btn.onclick = function(){
      eliminarInfo(id);
    }
  }

  function eliminarInfo(item){
    var id = item;
    $.ajax({
      url:"http://web-unicen.herokuapp.com/api/delete/" + id,
      method:"DELETE",
      success: function(data){
        obtenerInfo(grupo);
      },
      error:function(jqxml, status, errorThrown){
        alert('No se puedo eliminar!');
      }
    });
  }

    function agregarInfo(grupo){

      var registro = {      // objeto JSON
        "nombre": " ",
        "raza": " ",
        "edad": " ",
        "sexo": " "
      };

      var nom = $('#nombre').val();      //asigno el valor del input
      $('#nombre').val('');                 //seteo el input
      var raz = $('#raza').val();
      $('#raza').val('');
      var ed = $('#edad').val();
      $('#edad').val('');
      var sex = $('#sexo').val();
      $('#sexo').val('');

      registro.nombre = nom;     //asigno el valor del input
      registro.raza = raz;
      registro.edad = ed;
      registro.sexo = sex;

      var registroCompleto = {
          'group': grupo,
          'thing': registro    // En esta caso tengo un arreglo, pero se recomiendo un objeto JSON es mas ligero
      };

      if( nom.length > 0 & raz.length > 0 & ed.length > 0 & sex.length > 0){
        $.ajax({
          method: "POST",
          dataType: 'JSON',           // el tipo de informacion que se espera recibir como respuesta del servidor
          data: JSON.stringify(registroCompleto),   //enviamos el objeto serializado. stringify convierte el objeto a la cadena de texto lista para enviar
          contentType: 'application/json; charset=utf-8',
          url: "http://web-unicen.herokuapp.com/api/create",
          success: function(data){
                obtenerInfo(grupo);
              },
          error: function(data){
                alert("Error!! no se cargo info");
                obtenerInfo(grupo);
              }
        });
      } else {
        alert('advertencia! agrege algo');
        obtenerInfo(grupo);
      };
    };

   obtenerInfo(grupo);  //iniciamos la pagina solicitando la info q tenga

  $('#agregar-mascota').on('click', function(event){
    event.preventDefault();
    agregarInfo(grupo);
  });
});
