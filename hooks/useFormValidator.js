//imports
import {useState} from 'react'

const useFormValidator = ({
    withTailwindcss,
}) => {

    //useState HOOKS
    const [errors, setErrors] = useState([])

    //main return
    return [errors, setErrors]
}

export default useFormValidator