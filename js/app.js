const formulario = document.querySelector('#formulario')
const container = document.querySelector('.container')

formulario.addEventListener('submit',consultarClima)
const contenedor = document.querySelector('#resultado')
 
const appid = '64edc1c819f60414a2d59c880f0e8c8e'


// funcion que evalua la consulta para luego mostrarla si esta todo correcto
async function consultarClima(e){
  e.preventDefault()
  const ciudad = document.querySelector('#ciudad').value
  const pais = document.querySelector('#pais').value

  if(ciudad === '' || pais === ''){
    mensajeError('Todos los campos son obligatorios')
    return
  }

  spinner()
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&lang=es&appid=${appid}`);
  const data = await response.json();
      
  if(data.cod === '404'){
    mensajeError('Ciudad no encontrada');
    
    return
  }

  
  mostrarClima(data)

  // resetea el formulario luego de gacer la consulta
  formulario.reset()
  
  
  
}

// funcion que muestra los resultados del clima en el documento html
function mostrarClima(data){
  limpiarHtml()

  const {name,main:{temp,temp_min,temp_max},weather} = data
  
  const act = parseFloat(temp - 273.15).toFixed(2);
  const min = parseFloat(temp_min - 273.15).toFixed(2);
  const max = parseFloat(temp_max - 273.15).toFixed(2);
  
  const resultado = document.createElement('SECTION')
  resultado.classList.add('rounded-lg','p-2','card','shadow-md','bg-card-color')
  resultado.innerHTML = `
    <div class='flex justify-center items-center my-2'>
      <h2 class='font-bold text-white text-2xl'>${name}</h2>
    </div>

    <div class='flex flex-col justify-center items-center mb-4'>
    <img src='https://openweathermap.org/img/wn/${weather[0].icon}@2x.png'>
    <p class='font-medium text-white uppercase'>${weather[0].description}</p>
    </div>

    <div class='flex justify-evenly'>
    
      <p class='flex flex-col-reverse text-white text-center'>Actual <span class='font-bold text-amber-300 text-4xl'>${act} &#8451</span> </p>
      <p class='flex flex-col-reverse text-white text-center'>Minima <span class='font-medium text-amber-200'>${min} &#8451</span> </p>
      <p class='flex flex-col-reverse text-white text-center'>Maxima <span class='font-medium text-amber-200'>${max} &#8451</span> </p>
    </div>
 
  `

  contenedor.appendChild( resultado)

}

// funcion que limpia el html
function limpiarHtml(){

 while(contenedor.firstChild){
    contenedor.firstChild.remove(contenedor.firstChild)
 }
}

// funcion que muestra los error de la consulta
function mensajeError(mensaje){

  const error = document.querySelector('.ms-error')
  if(!error){
    const error = document.createElement('P')
    error.classList.add('ms-error','text-red-700','font-bold','text-center','border-2','border-red-700','p-3','bg-white','my-4','max-w-md','mx-auto')
    error.textContent =mensaje;

  
    container.appendChild(error)

    if(error){
      setTimeout(() => {
        limpiarHtml()
        
      },2500)
    }
    
    
    setTimeout(() => {
      error.remove()
      
    },2500)
  }
  
  
}

function spinner(){
  limpiarHtml()
  const spinner = document.createElement('DIV');
  spinner.classList.add('sk-fading-circle');
  spinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>

  `;

  contenedor.appendChild(spinner)
}