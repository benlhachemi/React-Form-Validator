/******************
*  I M P O R T S  *
*******************/
import {useState, useEffect} from 'react'
import validator             from 'validator'
import ErrorIcon             from '@mui/icons-material/Error'
import DoneIcon              from '@mui/icons-material/Done'
import { v4 as uuidv4 }      from 'uuid'
import 'animate.css'

const Input = (props) => {

    /**********************
    *  V A R I A B L E S  *
    ***********************/
    const required_id    = 'rfd4878df' 
    const random_id      = '96d82d581'
    const component_name = 'input'

    /************************************
    *  U s e S t a t e s     H O O K S  *
    *************************************/
    const [defaultTailwindClass, setDefaultTailwindClass] = useState()

    const [errorMessage, setErrorMessage] = useState()
    const [error, setError]               = useState(false)
    const [success, setSuccess]           = useState(false)

    const [value, setValue] = useState()

    const [validation, setValidation]   = useState()
    const [styleEngine, setStyleEngine] = useState()

    const [errorColorCss, setErrorColorCss]           = useState('#EF4444')
    const [errorColorTailwind, setErrorColorTailwind] = useState('red-500')

    const [errorColorTailwindBorder, setErrorColorTailwindBorder] = useState('border-red-500')
    const [errorColorTailwindText, setErrorColorTailwindText]     = useState('text-red-500')

    const [successColorTailwindBorder, setSuccessColorTailwindBorder] = useState('border-green-500')
    const [successColorTailwindText, setSuccessColorTailwindText]     = useState('text-green-500')

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

    /************************************
    *  U s e E f f e c t     H O O K S  *
    *************************************/

    useEffect(() => {
        if(props.errors && props.setErrors){
            //check if this field is required
            if(props.validation){
                if(props.validation.required){
                    let required = true
                    if(typeof props.validation.required === 'object') required = props.validation.required[0]
                    else required = props.validation.required
                    
                    if(required){
                        //add error to errors array
                        props.setErrors([...props.errors, {
                            id: required_id,
                            componentName: props.componentName ? props.componentName : component_name,
                            errorMessage: typeof required === 'object' ? required[1] : 'This field is required'
                        }])
                    }
                }
            }
        }
        if(props.className) setDefaultTailwindClass(props.className + ' focus:outline-none')
        if(props.validation) setValidation(props.validation)
        if(props.settings){
            if(props.settings.errorColorTailwind){
                setErrorColorTailwindBorder('border-' + errorColorTailwind)
                setErrorColorTailwindText('text-' + errorColorTailwind)
            }
            if(props.settings.successColorTailwind){
                setSuccessColorTailwindBorder('border-' + successColorTailwind)
                setSuccessColorTailwindText('text-' + successColorTailwind)
            }
            props.settings.errorColorCss           ? setErrorColorCss(props.settings.errorColorCss)                     : setErrorColorCss('#EF4444')
            props.settings.errorColorTailwind      ? setErrorColorTailwind(props.settings.errorColorTailwind)           : setErrorColorTailwind('red-500')
            props.settings.successColorCss         ? setSuccessColorCss(props.settings.successColorCss)                 : setSuccessColorCss('#10B981')
            props.settings.successColorTailwind    ? setSuccessColorTailwind(props.settings.successColorTailwind)       : setSuccessColorTailwind('green-500')
            props.settings.withTailwindcss         ? setStyleEngine('tailwind')                                         : setStyleEngine('css')
            props.settings.errorBorderCss          ? setErrorBorderCss(props.settings.errorBorderCss)                   : setErrorBorderCss('border: 2px ' + errorColorCss)
            props.settings.errorBorderTailwind     ? setErrorBorderTailwind(props.settings.errorBorderTailwind)         : setErrorBorderTailwind(`border-2 ${errorColorTailwindBorder}`)
            props.settings.errorMessageCss         ? setErrorMessageCss(props.settings.errorMessageCss)                 : setErrorMessageCss(`position: absolute; right: 0; margin-right: -0.5rem; --transform-translate-x: 100%; --transform-translate-y: -50%; color: ${errorColorCss}; font-size: 0.875rem;line-height: 1.25rem;`)
            props.settings.errorMessageTailwind    ? setErrorMessageTailwind(props.settings.errorMessageTailwind)       : setErrorMessageTailwind('text-sm absolute top-2/4 -translate-y-2/4 right-0 translate-x-full -mr-2 ' + errorColorTailwindText)
            props.settings.successBorderCss        ? setSuccessBorderCss(props.settings.successBorderCss)               : setSuccessBorderCss(`border: 2px ${successColorCss}`)
            props.settings.successBorderTailwind   ? setSuccessBorderTailwind(props.settings.successBorderTailwind)     : setSuccessBorderTailwind('border-2 ' + successColorTailwindBorder)
            props.settings.successMessageCss       ? setSuccessMessageCss(props.settings.successMessageCss)             : setSuccessMessageCss(`position: absolute; right: 0; margin-right: -0.5rem; --transform-translate-x: 100%; --transform-translate-y: -50%; color: ${successColorCss}; font-size: 0.875rem;line-height: 1.25rem;`)
            props.settings.successMessageTailwind  ? setSuccessMessageTailwind(props.settings.successMessageTailwind)   : setSuccessMessageTailwind(`text-sm absolute top-2/4 -translate-y-2/4 right-0 translate-x-full -mr-2 ${successColorTailwindText}`)
        }
    }, [])

    //check for erros when submit
    useEffect(() => {
        if(typeof props.submit !== 'undefined' && typeof props.errors !=='undefined'){

            //check for erros when submit
            props.errors.forEach(elt => {
                if(elt.id === random_id || elt.id === required_id){
                    setError(true)
                    setErrorMessage(elt.errorMessage)

                    //check for shaking when submit and error
                    if(props.validation.shakeOnError){
                        const old_defaultTailwindClass = defaultTailwindClass
                        setDefaultTailwindClass(defaultTailwindClass + ' animate__animated animate__shakeX')
                        setTimeout(() => {
                            setDefaultTailwindClass(old_defaultTailwindClass)
                        }, 1000)
                    }
                }
            }) 
        }
    }, [props.submit])


    /**********************
    *  F U N C T I O N S  *
    ***********************/

    //validate the input field based on the validation passed on the props
    const check_value_real_time = (e) => {
        setValue(e.target.value)
        if(!props.errors || !props.setErrors || !props.validation) return 0

        //variables
        let all_test_passed = true

        //get the value of the field
        const value = e.target.value

        //check if required field
        is_required(value)

        //check if verification is real time
        if(!props.validation.realTime) return 0

        //minLength verification
        if(validation.minLength !== 'undefined' && !is_minLength(value)) return 0


        
    }

    //add new error to the errors array
    const add_error = (id, validation, default_msg) => {
        if(!props.errors || !props.setErrors) return 0
        const err = {
            id,
            componentName: props.componentName ? props.componentName : component_name,
            errorMessage: typeof validation === 'object' ? validation[1] : default_msg
        }
        if(is_error(id)) return 0
        props.setErrors([...props.errors, err])
    }

    //remove error from the errors array
    const remove_error = (id) => {
        if(!is_error(id)) return 0
        let tmp = []
        props.errors.forEach(err => {
            if(err.id !== id) tmp.push(err)
        })
        props.setErrors(tmp)
    }

    //check if an error exist on the errors array
    const is_error = (id) => {
        if(typeof props.errors === 'undefined' && typeof props.setErrors === 'undefined') return 0

        let found = false
        props.errors.forEach(err => {
            if(err.id === id) found = true
        })
        return found
    }

    //generate new error on the UI
    const generate_error = (err_msg) => {
        setError(true)
        setErrorMessage(err_msg)
        setSuccess(false)
    }

    //check if the field is required + generate error if required and empty
    const is_required = (value) => {
        if(!props.errors || !props.setErrors || !props.validation) return 0
        if(!props.validation.required) return 0
        if(props.validation.required){
            //case of the input field is empty
            if(value.length === 0){
                if(!is_error(required_id)){
                    add_error(required_id, props.validation.required, 'This field is required')
                    generate_error(typeof props.validation.required === 'string' ? props.validation.required[1] : 'This field is required')
                }
                return 0
            }

            //case of the input field is not empty
            if(is_error(required_id)) remove_error(required_id)
        }
    }

    //minLength verification
    const is_minLength = (value) => {
        if(!props.errors || !props.setErrors || !props.validation) return 0
        const min_length_value = typeof props.validation.minLength === 'object' ? props.validation.minLength[0] : props.validation.minLength
        const err_msg = typeof props.validation.minLength === 'object' ? props.validation.minLength[1] : `min characters is ${min_length_value}`
        //case of test failed
        if(min_length_value > value.length){
            if(!is_error(random_id)){
                add_error(random_id, props.validation.minLength, `min characters is ${min_length_value}`)
                generate_error(err_msg)
            }
            return false
        }

        //case of test passed
        if(is_error(random_id)) remove_error(random_id)
        is_pass(value)
        return true
    }

    //check if all tests passed
    const is_pass = (value) => {
        if(!props.errors || !props.setErrors || !props.setValue) return 0
        let found = false
        props.errors.forEach(err => {
            if(err.id === random_id || err.id === required_id) found = true
        })
        if(found) return false

        //case of success
        setSuccess(true)
        setError(false)
        setErrorMessage(false)
        props.setValue(value)
        console.log(value)
    }

    /**************************
    *  M A I N   R E N D E R  *
    ***************************/
    return (
        <div className='relative h-fit w-fit'>
            <input
                className={`
                    ${defaultTailwindClass} 
                    ${error   && styleEngine === 'tailwind' && errorBorderTailwind} 
                    ${success && styleEngine === 'tailwind' && successBorderTailwind}
                `}
                onChange={check_value_real_time}
            />

            {success && styleEngine === 'tailwind' && <h3 className={successMessageTailwind}><DoneIcon /></h3>}
            {success && styleEngine === 'css'      && <h3 style={successMessageCss}><DoneIcon /></h3>}


            {errorMessage && styleEngine === 'tailwind' && <h3 className={errorMessageTailwind}><ErrorIcon /> {errorMessage}</h3>}
            {errorMessage && styleEngine === 'css'      && <h3 style={errorMessageCss}><ErrorIcon /> {errorMessage}</h3>}
        </div>
    )
}

export default Input