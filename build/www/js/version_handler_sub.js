// too simple
/* var data = {
  "handler": {
    "build": "BonziWORLD Revived+ - 1.7.2",
  }
}


$('.ver').html(data.handler.build); */

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
