//imports
import {useState} from 'react'

const useFormValidator = (next) => {

    //useState HOOKS
    const [errors, setErrors] = useState([])
	const [value, setValue] = useState()
	const [submit, setSubmit] = useState(false)

    //functions
	const validateForm = (e) => {
		e.preventDefault()
		setSubmit(!submit)
		if(errors.length > 0) return 0
		next()
	}

    //main return
    return [errors, setErrors, submit, validateForm]
}

export default useFormValidator