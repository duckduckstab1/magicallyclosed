// too simple
/* var data = {
  "handler": {
    "build": "1.7.2",
  }
}


$('#login_version').html(data.handler.build); */

$(document).ready(function(){
    $.getJSON("/json/version_homepage.json", function(result){
      $.each(result, function(i, field){
        $("#login_version").html(field + " ");
    });
  });
});
