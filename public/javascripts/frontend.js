var createButton = document.querySelector('#createButton');
var threads = document.querySelector('#threads').childNodes;
var categories = document.querySelector('#categories').childNodes;
var selected;

createButton.addEventListener('click', function(event){
  event.preventDefault();
  document.getElementById("createThread").classList.remove('hidden');
  document.getElementById('createButton').classList.add('hidden');
});

for(var i=0; i<categories.length; i++) {
  categories[i].addEventListener("focus", onFocus);
  categories[i].addEventListener("blur", onBlur);
}

function onFocus(event) {
  event.preventDefault();
  this.classList.add('active');
  selected = this;
  console.log("bla");
}

function onBlur(event) {
  event.preventDefault();
  this.classList.remove('active');
}


function showThreads(event) {
  for(var i=0; i<threads.length; i++) {
    if(threads[i].childNodes[1]=='fantasy') {
      threads[i].classList.add('hidden');
    }
  }
}
