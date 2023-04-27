$(document).ready(function () {
  // Configuración del calendario
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,basicWeek,basicDay'
    },
    defaultView: 'month',
    editable: true,
    eventLimit: true, // permite "más" enlace cuando hay demasiados
    events: [],
    // Función para abrir el modal de agregar citas médicas cuando se haga clic en una fecha
    dayClick: function (date, jsEvent, view) {
      $('#addEventModal').modal('show');
      $('#start').val(date.format());
      $('#end').val(date.format());
    }
  });

  // Función para guardar la cita médica en el calendario
  $('#saveEvent').click(function () {
    var title = $('#title').val();
    var start = $('#start').val();
    var end = $('#end').val();

    if (title && start && end) {
      // Crear evento y agregarlo al calendario
      var event = {
        title: title,
        start: moment(start),
        end: moment(end).add(1, 'hour') // Se agrega 1 hora al final para que el evento tenga duración
      };
      $('#calendar').fullCalendar('renderEvent', event, true);
      $('#addEventModal').modal('hide');
    } else {
      alert('Por favor, complete todos los campos');
    }
  });
});
