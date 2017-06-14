var api = {
  url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var $tasksList = $("#tasks-list");

var cargarPagina = function () {
  cargarTareas();
  $("#add-form").submit(agregarTarea);
  $(document).on("click", ".borrar", borrarTarea);
};

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {
    tareas.forEach(function (tarea) {
      crearTarea(tarea);
    });
  });
};

var crearTarea= function(tarea){
      var nombre = tarea.name;
      var estado = tarea.status[0];
      var id = tarea._id;
      var borrar=$("<button/>",{"class":"borrar","data-id":id});
      borrar.text("borrar");
      var ver=$("<button/>",{"class":"ver","data-id":id});
      ver.text("ver");
      var modificar=$("<button/>",{"class":"modificar","data-id":id});
      modificar.text("modificar");
      // creamos la fila
      var $tr = $("<tr />");
      // creamos la celda del nombre
      var $nombreTd = $("<td />");
      $nombreTd.text(nombre);
      // creamos la celda del estado
      var $estadoTd = $("<td />");
      $estadoTd.text(estado);
      // creamos la celda del boton borrar
      var $botonesTd = $("<td />");
      $botonesTd.append(ver);
      $botonesTd.append(modificar);
      $botonesTd.append(borrar);

      // agregamos las celdas a la fila
      $tr.append($nombreTd);
      $tr.append($estadoTd);
      $tr.append($botonesTd);
      // agregamos filas a la tabla
      $tasksList.append($tr);
}

var agregarTarea = function (e){
  e.preventDefault();
  var nombre = $("#nombre-tarea").val();
  $.post(api.url, {
    name:nombre
  }, function (tarea){
    $("#myModal").modal("hide");
    crearTarea(tarea);
  })
};

var borrarTarea = function(){
  var id= $(this).data("id");
  var padre=$(this).parents();
  $.ajax({
    url:api.url+id,
    method:"DELETE",
    dataType:"json",
    success:function(response){
      console.log("response",response);
      padre[1].remove();
    },
    error:function(error){
      console.log("error",error)
    }
  })
};

$(document).ready(cargarPagina);
