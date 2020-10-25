$( "#button" ).click(function() {
  $.get('https://stubbornnews.com/frontend/44',  // url
      function (data, textStatus, jqXHR) {  // success callback
          alert('status: ' + textStatus + ', data:' + data);
    });

});


