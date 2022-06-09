//imports
import {useState, useEffect} from 'react'
import validator from 'validator'
import ErrorIcon from '@mui/icons-material/Error'
import DoneIcon  from '@mui/icons-material/Done'

const Input = (props) => {

    //useState HOOKS
    const [classname, setClassName] = useState(['focus:outline-none', 'border-2'])
    const [stringClassName, setStringClassName] = useState()
    const [error_generated, setErrorGenerated] = useState(false)
    const [validation, setValidation] = useState()
    const [id, setId] = useState(Math.random()*9999)

    const [errorMessage, setErrorMessage] = useState()
    const [success, setSuccess] = useState(false)

    const [errorBorder, setErrorBorder] = useState()
    const [errorBorderCss, setErrorBorderCss] = useState()
    const [errorBorderTailwind, setErrorBorderTailwind] = useState()

    const [errorMessageCss, setErrorMessageCss] = useState()
    const [errorMessageTailwind, setErrorMessageTailwin] = useState()

    const [successBorder, setSuccessBorder] = useState()
    const [successBorderCss, setSuccessBorderCss] = useState()
    const [successBorderTailwind, setSuccessBorderTailwind] = useState()

    //useEffect HOOKS
    useEffect(() => {
        if(props.className) setClassName([...classname, props.className])
        if(props.validation) setValidation(props.validation)
    }, [])

    useEffect(() => {
        setStringClassName(array_to_string(classname))
    }, [classname])

    //functions
    const remove_elt_from_array = (array, elt) => {
        const index = array.indexOf(elt)
        if (index > -1) array.splice(index, 1)
        return array
    }

    const array_to_string = (array) => {
        if(typeof array === 'object'){
            let str = ''
            array.forEach(elt => {
                str = str + ' ' + elt
            })
            return str
        }
    }

    const generate_error = (e, error_mesage) => {

        //check if error is already generated
        if(error_generated) return 0

        //check if tailwind is active
        if(props.settings){
            const settings = props.settings
            if(settings.withTailwindcss){
                setClassName([
                    ...classname, 
                    settings.errorBorderTailwind ? settings.errorBorderTailwind : 'border-red-500',
                ])
                setErrorGenerated(true)
            }
            else{
                //case of no tailwind (classic html/css style)
                const style = {
                    border: settings.errorBorderCss ? settings.errorBorderCss : '2px #EF4444'
                }
                e.target.setAttribute('style', style)
                setErrorGenerated(true)
            }
        }
    }

    const generate_success = (e) => {

    }

    const check_value = (e) => {
        const value = e.target.value
        if(validation){
            
            //check if verification is real time
            if(validation.realTime){

                //minLength verification
                if(validation.minLength !== 'undefined'){
                    console.log(typeof validation.minLength)
                    const minLength = typeof validation.minLength === 'object' ? validation.minLength[0] : validation.minLength
                    const test = validator.isLength(value, {min: minLength})
                    //generate error message
                    if(typeof validation.minLength === 'object' && validation.minLength.length >= 2) setErrorMessage(validation.minLength[1])
                    else{
                        setErrorMessage(`Minimum characters is ${minLength}`)
                    }
                    if(!test) return generate_error(e)

                    //case of no error
                    setClassName(remove_elt_from_array(classname, 'border-red-500'))
                    setStringClassName(array_to_string(remove_elt_from_array(classname, 'border-red-500')))
                    setErrorGenerated(false)
                    setErrorMessage(false)
                }
            }
        }
    }

    //main render
    return (
        <div className='relative h-fit w-fit'>
            <input
                className={stringClassName}
                onChange={e => check_value(e)}
            />
            {success && <h3 className='text-sm absolute top-2/4 -translate-y-2/4 right-0 translate-x-full -mr-3 text-green-500'><DoneIcon /></h3>}
            {errorMessage && <h3 className='text-sm absolute top-2/4 -translate-y-2/4 right-0 translate-x-full -mr-3 text-red-500'><ErrorIcon /> {errorMessage}</h3>}
        </div>
    )
}

export default Input