//imports

const react_form_validation = (data) => {

    if(typeof window !== 'undefined'){

        //variables
        let errors = []

        //get all inputs with attribute validation
        const ios = document.querySelectorAll('input[validation]')
        
        ios.forEach(io => {
            //get the json validation of the input
            const validation = JSON.parse(io.getAttribute('validation'))
            
            //read the data
            if(typeof validation.minLength !== 'undefined'){
                const length = io.value.length
                if(validation.minLength > length){

                    //case of error - case 1 : tailwindcss
                    io.setAttribute('hello', 'world')
                }
            }

            if(validation.maxLength){

            }
        })
    }
}

//default export
module.exports = react_form_validation