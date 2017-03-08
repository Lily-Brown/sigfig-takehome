console.log('Assets connected.');

// Drag function
function drag(ev) {
  ev.dataTransfer.setData('image', ev.target.id);
}

// Prevent default for AllowDrop
function allowDrop(ev) {
  ev.preventDefault();
}

// Drop function
function drop(ev) {
  ev.preventDefault();
  var target = document.getElementById(ev.target.id);
  var data = ev.dataTransfer.getData('image');
  if (!target.id.includes('div')) {
    target = target.parentNode;
  }
  start = parseInt(target.id.replace('div',''));
  end = parseInt(data);
  if (start !== end) {
    var id = target.id.replace('div','');
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

// Moves photos around if photo is dragged forward
function propogateForward(html,start,end) {
  for (var i=start+1; i <= end; i++) {
    html = switchPhoto(html,i);
  }
}

// Moves photos around if photo is dragged backward
function propogateBackward(html,start,end) {
  for (var i=start-1; i >= end; i--) {
    html = switchPhoto(html,i);
  }
}

// Switches Photo
function switchPhoto(html,i) {
  var target = document.getElementById('div'+i);
  html.id = i;
  if (target.children[0] == undefined) {
    target.appendChild(html);
  } else {
    tempHtml = target.children[0];
    target.removeChild(target.children[0]);
    target.appendChild(html);
    return tempHtml;
  }
}

// Moves photo left and right based on key stroke
function move(highlightedElement,direction) {
  var elementID = parseInt(highlightedElement.id);
  var switchID;
  if (direction === "left" && elementID > 1) {
    switchID = elementID-1;
  }
  else if (direction === "right" && elementID < 12) {
    switchID = elementID+1;
  } else {
    switchID = elementID;
  }
  var switchedHTML = switchPhoto(highlightedElement,switchID);
  switchPhoto(switchedHTML,elementID);
}

document.addEventListener('DOMContentLoaded', function(event) {

  var photos;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      // Add photos to page from JSON
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
      });

      // Adds highlighting for images
      var imgElements = document.getElementsByClassName('photo');
      var hightlightElements = document.getElementsByClassName('highlight');
      for (var i=0; i<imgElements.length; i++) {
        imgElements[i].addEventListener('dblclick',function(event){
          var target = event.target;
          if (!target.classList.contains('highlight') && (hightlightElements.length===0)) {
            target.classList.add('highlight');
          } else {
            target.classList.remove('highlight');
          }
        });
        imgElements[i].addEventListener('click',function(event){
          var target = event.target;
          if (!target.classList.contains('highlight') && (hightlightElements.length===1)) {
            hightlightElements[0].classList.remove('highlight');
          }
        });
      }

      document.onkeydown = checkKey;
      function checkKey(e) {
        e = e || window.event;
        var highlightElements = document.getElementsByClassName('highlight');
        if (highlightElements.length > 0) {
          var highlighted = highlightElements[0];
          if (e.keyCode == '37') {
            move(highlighted,"left");
          }
          else if (e.keyCode == '39') {
            move(highlighted,"right");
          }
        }
      }
    }
  };

  //XHTTP requests
  xhttp.open('GET', 'resources/photos.json', true);
  xhttp.send();

});
