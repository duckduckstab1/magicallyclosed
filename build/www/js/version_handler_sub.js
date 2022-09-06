// too simple
/* var data = {
  "handler": {
    "build": "BonziWORLD Revived+ - 1.7.2",
  }
}


$('.ver').html(data.handler.build); */

function appendData(data) {
  var mainContainer = $(".ver");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = 'Name: ' + data[i].firstName + ' ' + data[i].lastName;
    mainContainer.appendChild(div);
  }
}

fetch('/json/version_readme.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log(err);
  });
