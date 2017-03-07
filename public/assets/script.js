console.log('Assets connected.');

document.addEventListener('DOMContentLoaded', function(event) {
  var photos;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      photos = JSON.parse(this.responseText);
      photos.forEach(function(v,i) {
        var photoDiv = document.createElement('div');
        photoDiv.classList.add('photo');
        photoDiv.innerHTML = "<img src='" + v.image + "'>";
        document.getElementById('photos').appendChild(photoDiv);
      })
    }
  };
  xhttp.open('GET', 'resources/photos.json', true);
  xhttp.send();
});