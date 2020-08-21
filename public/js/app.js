

const weatherForm = document.querySelector('form')
const searchValue = document.querySelector('input')
const errorMessage = document.getElementById('error-message')
const successMessage = document.getElementById('success-message')


errorMessage.textContent='Loading ......'
successMessage.textContent=''


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchValue.value

    fetch('/weather?address=' + location)
    .then(response => {
        response.json().then(data =>{
            if(data.error){
                return errorMessage.textContent=data.error
            }

            errorMessage.textContent=data.location
            successMessage.textContent=data.weather
        })
    })
})