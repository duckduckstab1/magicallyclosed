// too simple
/* var data = {
  "handler": {
    "build": "1.7.2",
  }
}


$('#login_version').html(data.handler.build); */

fetch('/json/version_homepage.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log(err);
  });
