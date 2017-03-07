console.log('Assets connected.');

function drag(ev) {
  ev.dataTransfer.setData('image', ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var target = document.getElementById(ev.target.id);
  var data = ev.dataTransfer.getData('image');
  if (!target.id.includes("div")) {
    target = target.parentNode;
  }
  start = parseInt(target.id.replace("div",""));
  end = parseInt(data);
  if (start === end) {
    console.log("hi");
  } else {
    var id = target.id.replace("div","");
    var html = target.children[0];
    html.id = parseInt(id)+1;
    target.removeChild(target.children[0]);
    target.appendChild(document.getElementById(data));
    target.children[0].id = id;
  }
  if (start < end) {
    propogateForward(html,start,end);
  } else {
    propogateBackward(html,start,end);
  }
}

function propogateForward(html,start,end) {
  for (var i=start+1; i <= end; i++) {
    var target = document.getElementById("div"+i);
    html.id = i;
    if (target.children[0] == undefined) {
      target.appendChild(html);
    } else {
      tempHtml = target.children[0];
      target.removeChild(target.children[0]);
      target.appendChild(html);
      html = tempHtml;
    }
  }
}

function propogateBackward(html,start,end) {
  for (var i=start-1; i >= end; i--) {
    var target = document.getElementById("div"+i);
    html.id = i;
    if (target.children[0] == undefined) {
      target.appendChild(html);
    } else {
      tempHtml = target.children[0];
      target.removeChild(target.children[0]);
      target.appendChild(html);
      html = tempHtml;
    }
  }
}

document.addEventListener('DOMContentLoaded', function(event) {

  var photos;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      photos = JSON.parse(this.responseText);
      photos.forEach(function(v,i) {
        var photoDiv = document.createElement('div');
        photoDiv.addEventListener('ondrop', function() {drop(ev)}, false);
        photoDiv.classList.add('photo');
        photoDiv.innerHTML = "<div class='drop' id='div" + v.order + 
          "' ondrop='drop(event)' ondragover='allowDrop(event)'>" + 
          "<img src='" + v.image + "' draggable='true' ondragstart='drag(event)' id='" + v.order + 
          "'>" +
          "</div>";
        document.getElementById('photos').appendChild(photoDiv);
      })
    }
  };
  xhttp.open('GET', 'resources/photos.json', true);
  xhttp.send();

});
