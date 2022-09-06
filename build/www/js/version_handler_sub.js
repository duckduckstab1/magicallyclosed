// too simple
/* var data = {
  "handler": {
    "build": "BonziWORLD Revived+ - 1.7.2",
  }
}


$('.ver').html(data.handler.build); */

$(document).ready(function(){
    $.getJSON("/json/version_readme.json", function(result){
      $.each(result, function(i, field){
        $(".ver").html(field + " ");
    });
  });
});
