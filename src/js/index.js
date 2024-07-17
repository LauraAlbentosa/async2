// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const breedsSelect = document.getElementById('breeds');
const buttonElement = document.getElementById('button');
const imgElement = document.getElementById('img')

const printAllBreeds = (select,breeds
 ) => {
  const fragment = document.createDocumentFragment();
  breeds.forEach(breed => {
    const newOption = document.createElement('option');
    newOption.textContent = breed;
    fragment.append(newOption);
  });

  select.append(fragment);
};

const getBreedSelection = (breeds) => {
  //console.log(breedsSelect.value);
  if(breeds.includes(breedsSelect.value)){
    const newSelect = document.createElement('select')
    printAllBreeds(newSelect, breeds)
  }
  return breedsSelect.value;
};

const printImage = (url) =>{
    imgElement.src = url
}

const getAllBreeds = async () => {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    const allBreeds = Object.keys(data.message);
    //console.log(data)
    printAllBreeds(breedsSelect,allBreeds);
  } catch (error) {
    console.log(error);
  }
};

const getAllImages = async () => {
  const breed = getBreedSelection();
  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await response.json();
    const imageRoute = data.message;
    console.log(imageRoute);
    printImage(imageRoute)
  } catch (error) {
    console.log(error);
  }
};

const getSubBreeds = async () =>{
    try{
        const response = await fetch('https://dog.ceo/api/breed/hound/list');
        const data = await response.json();
        const subBreeds = data.message;
        console.log(subBreeds);
        //getBreedSelection(subBreeds)
    }catch(error){
        console.log(error)
    }

}

getSubBreeds()
//breedsSelect.addEventListener('change', getBreedSelection);
buttonElement.addEventListener('click', getAllImages);

getAllBreeds();
