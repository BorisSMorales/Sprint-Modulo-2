$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault();
        var paciente = $("#paciente").val();
        var diagnostico = $("#diagnostico").val();
        var fecha = $("#fecha").val();
        var tratamiento = $("#tratamiento").val();
        $("#tablaDatos").append("<tr><td>" + paciente + "</td><td>" + diagnostico + "</td><td>" + fecha + "</td><td>" + tratamiento + "</td></tr>");
    });
});