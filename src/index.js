const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const dogBreedCollection = []
let breeds = {}

document.addEventListener("DOMContentLoaded", function(event){
    getImgs();
    getBreeds();
});
function getImgs(){
    fetch(imgUrl)
    .then(r=>r.json())
    .then(data=>data.message.forEach(img=>{
        renderImg(img)
    }))
}
function renderImg(img){
    const container = document.querySelector("#dog-image-container")
    const pic = document.createElement('img')
    pic.src = `${img}`
    pic.style.height = "300px"
    pic.style.width = "auto"
    container.append(pic)
}


function getBreeds(){
    fetch(breedUrl)
    .then(r=>r.json())
    .then(data=>{
        breeds = Object.keys(data.message);
        updateBreedList(breeds)
        addBreedSelectListener()        
    })
}
function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds')
    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
}
    
function removeChildren(element) {
let child = element.lastElementChild;
while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
}
}

function selectBreedsStartingWith(letter) {
updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
let breedDropdown = document.querySelector('#breed-dropdown');
breedDropdown.addEventListener('change', function (event) {
    debugger
    selectBreedsStartingWith(event.target.value);
});
}

function addBreed(breed) {
let ul = document.querySelector('#dog-breeds');
let li = document.createElement('li');
li.innerText = breed;
li.style.cursor = 'pointer';
ul.appendChild(li);
li.addEventListener('click', updateColor);
}

function updateColor(event) {
event.target.style.color = 'palevioletred';
}

