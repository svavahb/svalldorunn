var createButton = document.querySelector('#createButton');
var threads = document.querySelector('#threads').childNodes;
var categories = document.querySelector('#categories').childNodes;

createButton.addEventListener('click', function(event){
  event.preventDefault();
  document.getElementById("createThread").classList.remove('hidden');
  document.getElementById('createButton').classList.add('hidden');
});

for(var i=0; i<categories.length; i++) {
  categories[i].addEventListener("click", onClick);
}

function onClick(event) {
  event.preventDefault();
  for(var i=0; i<categories.length; i++) {
    categories[i].classList.remove('active');
  }
  this.classList.add('active');
  showThreads(this.id);
}


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
