console.log('Client side javascript file is loaded!') 


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = "from Javascript"

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    if(search.value === ''){
        messageOne.textContent = 'please enter a address'
    }else{
        messageOne.textContent = "grabbing your weather!"
        messageTwo.textContent = ''
        return fetch("http://localhost:3000/weather?address=" + location).then((response) =>{
            response.json().then((data) =>{
                messageOne.textContent = ""
                if(data.error){
                    messageOne.textContent = data.error
                }else{
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
                console.log(data.forecast)
            })
        })
    }
})