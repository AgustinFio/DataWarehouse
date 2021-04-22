const header = document.getElementById("header")
const ingresar = document.getElementById("ingresar")
const mainSection = document.getElementById("main")
const userSection = document.getElementById("user_section")
const userlist = document.getElementById("userlist")
const userlistBtn = document.getElementById("userlistbtn")
const createUserSec = document.getElementById("create_user_boxes")
const users = document.getElementById("usuarios")
const btnPais = document.getElementById("btnpais")
const countrySection = document.getElementById("paises")
const btnUser = document.getElementById("createuser")
const countries = document.getElementsByClassName("country")
const countrySectionContainer = document.getElementById("country_section_container")
const postRegionModal = document.getElementById("postRegionModal")
//Funcion que obtiene los datos de los paises de la base de datos//
async function showCountries () {
  countrySectionContainer.classList.remove("d-none")
  users.classList.add("d-none")
    var url = 'http://localhost:3000/country';
    
    
    fetch(url, {
      method: 'GET', // or 'PUT'
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((
          resp => {
              let dataArray = resp
            const resultadoArray = formatData(dataArray)
            console.log(resultadoArray)
            renderData(resultadoArray)
            
            
          }
    ))

    .catch(error => console.error('Error:', error))
}

//Estructuracion de datos obtenidos para que cada pais quede con su respectiva region y para que cada ciudad quede con su respectivo pais//
function formatData(data) {
  return data.reduce((acc, el) => {
    const region = acc.find((x) => x.region_name === el.region_name);
    if (region) {
      const country = region.countries.find(
        (x) => x.country_name === el.country_name
      );
      if (country) {
        country.cities.push({ city_name: el.city_name });
      } else {
        region.countries.push({
          country_name: el.country_name,
          cities: [{ city_name: el.city_name }],
        });
      }
    } else {
      acc.push({
        region_name: el.region_name,
        countries: [
          {
            country_name: el.country_name,
            cities: [{ city_name: el.city_name }],
          },
        ],
      });
    }
  return acc;
  }, []);
}
//Renderizacion de la informacion//
function renderData (resultadoArray) {

  mainSection.classList.add("d-none")
countrySection.classList.remove("d-none")
countrySectionContainer.innerHTML = ""
countrySectionContainer.innerHTML = `<div class="d-flex flex-column mb-2"><button class="align-self-end btn btn-primary w-25">Agregar Region</button></div>`


//Bucles que recorren cada region, pais y ciudad//
for (let i = 0; i < resultadoArray.length; i++) {
console.log(resultadoArray[i].region_name)
let regionMainContainer = document.createElement('ul')
regionMainContainer.setAttribute("id", "myUL")
let regionContainer = document.createElement('li')
let spanRegion = document.createElement('span')
spanRegion.classList.add("caret")
spanRegion.textContent = resultadoArray[i].region_name
regionContainer.appendChild(spanRegion)
regionMainContainer.appendChild(regionContainer)
countrySectionContainer.appendChild(regionMainContainer)

  let PaisDelArreglo = resultadoArray[i].countries
 for(let i = 0; i < PaisDelArreglo.length; i++) {
   let countryMainContainer = document.createElement("ul")
   countryMainContainer.classList.add("nested")
   let contCountry = document.createElement('li')
   contCountry.classList.add("caret")
   contCountry.textContent = PaisDelArreglo[i].country_name
   countryMainContainer.appendChild(contCountry)
   regionContainer.appendChild(countryMainContainer)
console.log(PaisDelArreglo[i].country_name)
let ciudadDelArreglo = PaisDelArreglo[i].cities
for(let i = 0; i < ciudadDelArreglo.length; i++) {
    let cityMainContainer = document.createElement('ul')
    cityMainContainer.classList.add("nested")
    let cityContainer = document.createElement('li')
    cityContainer.classList.add('caret')
    cityContainer.textContent = ciudadDelArreglo[i].city_name
cityMainContainer.appendChild(cityContainer)
    contCountry.appendChild(cityMainContainer)
  console.log(ciudadDelArreglo[i].city_name)
}
 } 
}
}

//Funciones para cambiar de seccion// 
function showUserSection () {
    mainSection.classList.add("d-none")
    users.classList.remove("d-none")
    users.style.display = "block"
    btnUser.style.display = "block"
userlist.style.display = "block"
countrySectionContainer.classList.add("d-none")
}

function createuserSection () {
    createUserSec.classList.remove("d-none")
createUserSec.classList.add("d-flex")
btnUser.classList.add("d-none")
userlist.classList.add("d-none")

}
function returnToUserSection () {
    createUserSec.classList.add("d-none")
    // createUserSec.classList.remove("d-flex"
    btnUser.classList.remove("d-none")
    userlist.classList.remove("d-none")
    
userlist.style.display = "block"

}
btnUser.addEventListener("click", createuserSection)
userSection.addEventListener("click", showUserSection)
userlistBtn.addEventListener("click", returnToUserSection)
btnPais.addEventListener("click", showCountries)


