//imports
import {useState, useEffect} from 'react'
import validator from 'validator'
import ErrorIcon from '@mui/icons-material/Error'
import DoneIcon  from '@mui/icons-material/Done'

const Input = (props) => {

    //useState HOOKS
    const [defaultTailwindClass, setDefaultTailwindClass] = useState()

    const [errorMessage, setErrorMessage] = useState()
    const [error, setError]               = useState(false)
    const [success, setSuccess]           = useState(false)

    const [validation, setValidation]   = useState()
    const [styleEngine, setStyleEngine] = useState()

    const [errorColorCss, setErrorColorCss]           = useState('#EF4444')
    const [errorColorTailwind, setErrorColorTailwind] = useState('red-500')

    const [successColorCss, setSuccessColorCss]           = useState('#10B981')
    const [successColorTailwind, setSuccessColorTailwind] = useState('green-500')
    
    const [errorBorderCss, setErrorBorderCss]           = useState()
    const [errorBorderTailwind, setErrorBorderTailwind] = useState()

    const [errorMessageCss, setErrorMessageCss]           = useState()
    const [errorMessageTailwind, setErrorMessageTailwind] = useState()

    const [successBorderCss, setSuccessBorderCss]           = useState()
    const [successBorderTailwind, setSuccessBorderTailwind] = useState()

    const [successMessageCss, setSuccessMessageCss]           = useState()
    const [successMessageTailwind, setSuccessMessageTailwind] = useState()

    //useEffect HOOKS
    useEffect(() => {
        if(props.className) setDefaultTailwindClass(props.className + ' focus:outline-none')
        if(props.validation) setValidation(props.validation)
        if(props.settings){
            props.settings.errorColorCss           ? setErrorColorCss(props.settings.errorColorCss)                     : setErrorColorCss('#EF4444')
            props.settings.errorColorTailwind      ? setErrorColorTailwind(props.settings.errorColorTailwind)           : setErrorColorTailwind('red-500')
            props.settings.successColorCss         ? setSuccessColorCss(props.settings.successColorCss)                 : setSuccessColorCss('#10B981')
            props.settings.successColorTailwind    ? setSuccessColorTailwind(props.settings.successColorTailwind)       : setSuccessColorTailwind('green-500')
            props.settings.withTailwindcss         ? setStyleEngine('tailwind')                                         : setStyleEngine('css')
            props.settings.errorBorderCss          ? setErrorBorderCss(props.settings.errorBorderCss)                   : setErrorBorderCss(`border: 2px ${errorColorCss}`)
            props.settings.errorBorderTailwind     ? setErrorBorderTailwind(props.settings.errorBorderTailwind)         : setErrorBorderTailwind(`border-2 border-${errorColorTailwind}`)
            props.settings.errorMessageCss         ? setErrorMessageCss(props.settings.errorMessageCss)                 : setErrorMessageCss(`position: absolute; right: 0; margin-right: -0.5rem; --transform-translate-x: 100%; --transform-translate-y: -50%; color: ${errorColorCss}; font-size: 0.875rem;line-height: 1.25rem;`)
            props.settings.errorMessageTailwind    ? setErrorMessageTailwind(props.settings.errorMessageTailwind)       : setErrorMessageTailwind(`text-sm absolute top-2/4 -translate-y-2/4 right-0 translate-x-full -mr-2 text-${errorColorTailwind}`)
            props.settings.successBorderCss        ? setSuccessBorderCss(props.settings.successBorderCss)               : setSuccessBorderCss(`border: 2px ${successColorCss}`)
            props.settings.successBorderTailwind   ? setSuccessBorderTailwind(props.settings.successBorderTailwind)     : setSuccessBorderTailwind(`border-2 border-${successColorTailwind}`)
            props.settings.successMessageCss       ? setSuccessMessageCss(props.settings.successMessageCss)             : setSuccessMessageCss(`position: absolute; right: 0; margin-right: -0.5rem; --transform-translate-x: 100%; --transform-translate-y: -50%; color: ${successColorCss}; font-size: 0.875rem;line-height: 1.25rem;`)
            props.settings.successMessageTailwind  ? setSuccessMessageTailwind(props.settings.successMessageTailwind)   : setSuccessMessageTailwind(`text-sm absolute top-2/4 -translate-y-2/4 right-0 translate-x-full -mr-2 text-${successColorTailwind}`)
        }
    }, [])

    //functions
    const check_value = (e) => {
        const value = e.target.value

        if(validation){

            //check if verification is real time
            if(validation.realTime){

                //minLength verification
                if(validation.minLength !== 'undefined'){

                    const minLength = typeof validation.minLength === 'object' ? validation.minLength[0] : validation.minLength
                    const test = validator.isLength(value, {min: minLength})

                    //generate error message
                    if(!test){
                        setError(true)
                        if(typeof validation.minLength === 'object' && validation.minLength.length >= 2) setErrorMessage(validation.minLength[1])
                        else setErrorMessage(`Minimum characters is ${minLength}`)
                        return 0
                    }

                    //case of no error
                    setErrorMessage(false)
                    setSuccess(true)
                    setError(false)
                }


            }
        }
    }

    //main render
    return (
        <div className='relative h-fit w-fit'>
            <input
                className={`
                    ${defaultTailwindClass} 
                    ${error   && styleEngine === 'tailwind' && errorBorderTailwind} 
                    ${success && styleEngine === 'tailwind' && successBorderTailwind}
                `}
                onChange={e => check_value(e)}
            />

            {success && styleEngine === 'tailwind' && <h3 className={successMessageTailwind}><DoneIcon /></h3>}
            {success && styleEngine === 'css'      && <h3 style={successMessageCss}><DoneIcon /></h3>}


            {errorMessage && styleEngine === 'tailwind' && <h3 className={errorMessageTailwind}><ErrorIcon /> {errorMessage}</h3>}
            {errorMessage && styleEngine === 'css'      && <h3 style={errorMessageCss}><ErrorIcon /> {errorMessage}</h3>}
        </div>
    )
}

export default Input