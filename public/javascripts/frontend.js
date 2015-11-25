var threadButton = document.querySelector('#threadButton');
var entryButton = document.querySelector('#entryButton');
var picButton = document.querySelector('#picButton');

//Ef við erum í threads.jade
if(picButton==null && entryButton==null) {
  var threads = document.querySelector('#threads').childNodes;
  var categories = document.querySelector('#categories').childNodes;

  //Setja event listener á threaButton og birta formið #newThread
  threadButton.addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById("newThread").classList.remove('hidden');
    document.getElementById('threadButton').classList.add('hidden');
  });

  //Setja eventlistener á alla tabs í navbarnum
  for(var i=0; i<categories.length; i++) {
    categories[i].addEventListener("click", onClick);
  }

  //Fall sem stýrir hvaða tab er active
  function onClick(event) {
    event.preventDefault();
    for(var i=0; i<categories.length; i++) {
      categories[i].classList.remove('active');
    }
    this.classList.add('active');
    showThreads(this.id);
  }

  //Fall sem sýnir rétta þræði m.v. hvaða tab er active
  function showThreads(cat) {
    if(cat=='Allir') {
      for(var i=0; i<threads.length; i++) {
        threads[i].classList.remove('hidden');
      }
      return;
    }
    var str = 'flokkur: '+ cat;
    for(var i=0; i<threads.length; i++) {
      if(threads[i].childNodes[3].innerHTML==str) {
        threads[i].classList.remove('hidden');
      }
      else {
        threads[i].classList.add('hidden');
      }
    }
  }
}

//Ef við erum í entries.jade
else if(threadButton==null && picButton==null) {
  //Eventlistener fyrir entryButton til að birta formið
  entryButton.addEventListener('click', function (event){
    event.preventDefault();
    document.getElementById("postEntry").classList.remove('hidden');
    document.getElementById('entryButton').classList.add('hidden');
  });
}

//Ef við erum í profile.jade
else {
  //Eventlistener fyrir picButton til að birta formið
  picButton.addEventListener('click', function (event){
    event.preventDefault();
    document.getElementById("newPic").classList.remove('hidden');
    document.getElementById('picButton').classList.add('hidden');
  });
}
