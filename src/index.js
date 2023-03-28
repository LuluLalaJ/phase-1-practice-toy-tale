//URLs
const toysURL = 'http://localhost:3000/toys/'


//FORM DISPLAY - PROVIDED
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//ADD ONE TOY THROUGH FORM & POST DATA TO THE SERVER & RENDER THE NEW TOY
const addNewToyForm = document.getElementById('add-toy-form')
addNewToyForm.addEventListener('submit', event => addOneToy(event))


function addOneToy(event) {
  //DO NOT FORGET THIS CODE WHENEVER DO FORMS!!!
  event.preventDefault()
  const newToyName = document.getElementById('new-toy-name').value
  const newToyImg = document.getElementById('new-toy-image').value

  const newToyObj = {
    name: `${newToyName}`,
    image: `${newToyImg}`,
    likes: 0
  }
  const postRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToyObj)
  }

  fetch(toysURL, postRequest)
  .then(response => response.json())
  .then(newToy => renderOneToy(newToy))
}

//RENDER ALL EXISTING TOYS ON THE DOME 
renderAllToys() 

function renderAllToys() {
  fetch(toysURL)
    .then(response => response.json())
    .then(toysData => toysData.forEach(toy => renderOneToy(toy)))
}

function renderOneToy(toyObj) {
  const toyCollection = document.getElementById('toy-collection');

  const pToy = document.createElement('div');
  pToy.className = "card";
  toyCollection.appendChild(pToy);


  const toyName = document.createElement('h2');
  toyName.textContent = toyObj.name;
  pToy.appendChild(toyName)

  const imgToy = document.createElement('img');
  imgToy.src = toyObj.image; 
  imgToy.alt = `${toyObj.name} image`;
  imgToy.className = "toy-avatar"; 
  pToy.appendChild(imgToy);

  const pLikes = document.createElement('p');
  pLikes.id = `${toyObj.id}-like-tag`
  pLikes.textContent = `${toyObj.likes}`;
  pToy.appendChild(pLikes);

  const likeBtn = document.createElement('button');
  likeBtn.className = "like-btn";
  likeBtn.id = toyObj.id;
  likeBtn.textContent = 'Like ❤️';
  likeBtn.addEventListener('click', () => {
    toyObj.likes += 1;
    updateLikes(toyObj)
})
  pToy.appendChild(likeBtn);
}

//FETCH ONE TOY OBJECT 
//ADD ONE LIKE THROUGH BUTTON & POST DATA TO THE SERVER & UPDATE DOM

function updateLikes(toyObj){
  const toyURL = toysURL + `${toyObj.id}/`
  const patchRequest = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyObj)
  }

  fetch(toyURL, patchRequest)
  .then(response => response.json())
  .then(toyObj => {
    // maybe refract this part better
    let pLikes = document.getElementById(`${toyObj.id}-like-tag`)
    pLikes.textContent = `${toyObj.likes}`

  })
}

//TESTING BELOW: