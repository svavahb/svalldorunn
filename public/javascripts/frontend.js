'use strict';

var threadButton = document.querySelector('#threadButton');
var entryButton = document.querySelector('#entryButton');
var picButton = document.querySelector('#picButton');

//Ef við erum í threads.jade
if(picButton===null && entryButton===null) {
  var threads = document.querySelector('#threads').childNodes[1].childNodes;
  var categories = document.querySelector('#categories').childNodes;

  //Setja event listener á threaButton og birta formið #newThread
  threadButton.addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('newThread').classList.remove('hidden');
    document.getElementById('threadButton').classList.add('hidden');
  });

  //Fall sem sýnir rétta þræði m.v. hvaða tab er active
  var showThreads = function(cat) {
    if(cat==='Allir') {
      for(var i=0; i<threads.length; i++) {
        threads[i].classList.remove('hidden');
      }
      return;
    }
    var str = 'flokkur: '+ cat;
    var regex = /^(notandi).*/;
    for(var j=0; j<threads.length; j++) {
      //if(regex.test(threads[j].childNodes[3])) {
        if(threads[j].childNodes[4].innerHTML===str) {
          threads[j].classList.remove('hidden');
        }
        else {
          threads[j].classList.add('hidden');
        }
      /*}
      else {
        if(threads[j].childNodes[3].innerHTML===str) {
          threads[j].classList.remove('hidden');
        }
        else {
          threads[j].classList.add('hidden');
        }
      }*/
    }
  };


var onClick = function(event) {
  event.preventDefault();
  for(var i=0; i<categories.length; i++) {
    categories[i].classList.remove('active');
  }
  this.classList.add('active');
  showThreads(this.id);
};

  //Setja eventlistener á alla tabs í navbarnum
  for(var i=0; i<categories.length; i++) {
    categories[i].addEventListener('click', onClick);
  }
}


//Ef við erum í entries.jade
else if(threadButton===null && picButton===null) {
  //Eventlistener fyrir entryButton til að birta formið
  entryButton.addEventListener('click', function (event){
    event.preventDefault();
    document.getElementById('postEntry').classList.remove('hidden');
    document.getElementById('entryButton').classList.add('hidden');
  });
}

//Ef við erum í profile.jade
else {
  //Eventlistener fyrir picButton til að birta formið
  picButton.addEventListener('click', function (event){
    event.preventDefault();
    document.getElementById('newPic').classList.remove('hidden');
    document.getElementById('picButton').classList.add('hidden');
  });
}
