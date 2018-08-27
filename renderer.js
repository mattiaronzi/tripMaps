// render ui

window.onload = function(){
  console.log('loaded');
  var numberDiv = document.getElementById("tripsNumber");
  numberDiv.innerHTML = "XX trips in memory";
  addElementInList();
};

function addElementInList(){
  var listEl  = document.getElementById('list');
  var optEl   = document.createElement('option');
  optEl.value = 'Alfa';
  optEl.text  = 'alfa';

  // optEl.appendChild(document.createTextNode("Four"));
  listEl.appendChild(optEl);
}
