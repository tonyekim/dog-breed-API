const generateBtn = document.querySelector('.generate-btn');
const image = document.querySelector('.dog-image');

const selectBreed = document.querySelector('select');



const form = document.querySelector('form');
const input = document.querySelector('.input');
let breedName;

const errorMessage = document.querySelector('.error-alert')

window.addEventListener('DOMContentLoaded', getImageOnLoad);


form.addEventListener('submit', getSpecificBreed)
selectBreed.addEventListener('change', selectedBreed)
input.addEventListener('keyup', function (event) {
    breedName = event.target.value
})


function getImageOnLoad() {
    fetch('https://dog.ceo/api/breeds/image/random', {
        method: 'GET',
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return;
            }
        })
        .then((data) => {
            image.src = data.message;
        })
        .catch((error) => {
            console.log(error.message)
        });

}

const generateRandomImage = async () => {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        image.src = data.message;
    } catch (error) {
        console.log(error)

    }
}

function getSpecificBreed(event) {
    event.preventDefault();
    fetch(`https://dog.ceo/api/breed/${breedName}/images/random`)
        .then((response) => {
            if (response.ok) {
                return response.json();

            } else {
                return;
            }
        })
        .then((data) => {
            image.src = data.message;
            image.style.display = 'flex';
            errorMessage.style.display = 'none';
        })
        .catch((error) => {
            errorMessage.style.display = 'block';
            image.style.display = 'none'
            errorMessage.querySelector('p').innerText = `${breedName} not found`;
    })
}

function selectedBreed(event) {
    console.log(event.target.value)
    switch (event.target.value) {
        case 'germanshepherd':
            breedName = 'germanshepherd';
            break; 
        case 'eskimo':
            breedName = 'eskimo';
            break;
        case 'cockapoo':
            breedName = 'cockapoo';
            break;
        case 'husky':
            breedName = 'husky';
            break;
        case 'pitbull':
            breedName = 'pitbull';
            break;
    }

    fetch(`https://dog.ceo/api/breed/${breedName}/images/random`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return;
            }
        })
        .then((data) => {
            image.src = data.message;
            image.style.display = 'flex';
            errorMessage.style.display = 'none';
        })
        .catch((error) => {
            errorMessage.style.display = 'block';
            image.style.display = 'none'
            errorMessage.querySelector('p').innerText = `${breedName} not found`;
        })
}

generateBtn.addEventListener('click', generateRandomImage)