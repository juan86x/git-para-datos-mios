$(document).ready(function(){
  inicio = 'inicio';
  mascotas = 'mascotas';
  contacto = 'contacto';
  detallemascotas = 'detallemascotas';
  cargamascotas = 'cargamascotas';
  /* La funcion que cargara la pagina segun la seccion */
  function cargarSeccion(seccion){
    $.ajax({
      type: 'GET',
      dataType: 'HTML',
      url:seccion+'.html',
      success: function(data){
            $('#contenedor-principal').html(data);
          },
      error: function(){
            alert('No se puede cargar la pagina ' + seccion);
          }
    });
  };

  cargarSeccion(inicio);
  

  $('#inicio').on('click', function(event){
    event.preventDefault();
    $(".nav").find(".active").removeClass("active");
    $(this).addClass("active");
    cargarSeccion(inicio);
  });

  $('#mascotas').on('click', function(event){
    event.preventDefault();
    $(".nav").find(".active").removeClass("active");
    $(this).addClass("active");
    cargarSeccion(mascotas);
  });

  $('#contacto').on('click', function(event){
    event.preventDefault();
    $(".nav").find(".active").removeClass("active");
    $(this).addClass("active");
    cargarSeccion(contacto);
  });

$('#detallemascotas').on('click', function(event){
    event.preventDefault();
    $(".nav").find(".active").removeClass("active");
    $(this).addClass("active");
    cargarSeccion(detallemascotas);
  });

$('#cargamascotas').on('click', function(event){
    event.preventDefault();
    $(".nav").find(".active").removeClass("active");
    $(this).addClass("active");
    cargarSeccion(cargamascotas);
  });
});






























/*$(document).ready(function(){


              $("#btnEnviarMensaje").on("click",function(){
                var nombre = $('#nombre').val();
                var raza = $('#raza').val();
                var edad = $('#edad').val();
                var sexo = $('#sexo').val();
                var data = { // Objeto JSON con la informacion del formulario
                  nombre: nombre,
                  raza: raza,
                  edad: edad,
                  sexo: sexo,
                }
                $.ajax({
                      method: "POST",
                      dataType: "JSON",
                      data: JSON.stringify(data),
                      url: "http://web-unicen.herokuapp.com/api/create",
                      contentType: "application/json; charset=utf-8",
                      success: function(datas){
                        alert("El mensaje ha sido enviado con exito.");
                        var string = "<div class='col-md-7'><table id='tablares' class='table'><tr><td>Nombre:</td><td>"+data.nombre+"</td></tr><tr><td>Raza:</td><td>"+data.raza+"</td></tr><tr><td>Edad:</td><td>"+data.edad+"</td></tr><tr><td>Sexo:</td><td>"+data.sexo+"</td></tr></table></div>";
                        document.getElementById('resultado').innerHTML = string;
                      },
                        error: function(){
                        alert("Hubo un error en la red.");
                      }
                    });

              });


              $("#btnEliminarMensaje").on("click",function(){


               try {

               var table = document.getElementById('tablares');

               var rowCount = table.rows.length;



               for(var i=0; i<rowCount; i++) {

                    var row = table.rows[i];

                    var chkbox = row.cells[0].childNodes[0];

                    if(null != chkbox && true == chkbox.checked) {

                         table.deleteRow(i);

                         rowCount--;

                         i--;

                    }

               }

               }catch(e) {

                    alert(e);

               }


              });
    });
function restfull(){
        $.ajax({
          url:"http://web-unicen.herokuapp.com/api/html?",
          method:"GET",
          dataType:"html",
          success: function(data){
            $("#use-ajax").html(data);//parcial render
          },
          error: function(){
            $("#use-ajax").html("<h1>Error - Request Failed!</h1>");
          }
        });
        $("#use-ajax").html("<h1>Loading...</h1>");
        //alert("Hola Mundo!");
        event.preventDefault();
    };*/
