//imports
import { useEffect, useState } from 'react'
import Input from '../components/input'
import useFormValidator from '../hooks/useFormValidator'

export default function Home() {

	//variables
	const custom_settings = {
		withTailwindcss: true,
	}

	//useState HOOKS
	const [errors, setErrors] = useState([])

	//useState HOOKS
	const [value, setValue] = useState()

	//functions
	const validateForm = (e) => {
		e.preventDefault()
		console.log(1)
	}

	//main render
	return (
		<div>
			<form onSubmit={validateForm}>
				<Input 
					className='rounded-md shadow-md bg-gray-100 m-5 py-3 px-4' 
					settings={custom_settings}
					validation={{
						required:[true, 'This field is required'],
						minLength: [5, 'min characters is 5'],
						maxLength: 10,
						realTime: true,
						async: true
					}}
					setErrors={setErrors}
					value={value}
				/>
				<button type='submit'>ok</button>
			</form>
		</div>
	)
}
