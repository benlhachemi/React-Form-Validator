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
	const [value, setValue] = useState()

	//functions
	const x = () => {
		alert('hello ' + value)
	}

	//useFormValidator HOOK
	const [errors, setErrors, submit, validateForm] = useFormValidator(x)

	//main render
	return (
		<div>
			<form onSubmit={validateForm} className='py-4 px-4'>

				<h6 className='text-gray-700 font-medium'>Your first name</h6>
				<Input 
					className='py-2 px-3 mb-4 mt-2 rounded-lg mr-4 shadow-sm bg-gray-50 border border-gray-300 text-sm w-full block' 
					validation={{
						required:[true, 'This field is required 000000000000'],
						minLength: [5, 'min characters is 5'],
						maxLength: 10,
						realTime: true,
						async: true,
						shakeOnError: true
					}}
					settings={custom_settings}
					setErrors={setErrors}
					errors={errors}
					setValue={setValue}
					submit={submit}
				/>
				<button type='submit' className='mt-2 text-gray-100 font-medium px-8 hover:scale-105 transition-all rounded-lg shadow-sm py-2 bg-blue-500'>Submit</button>
			</form>
		</div>
	)
}
