import React, { ChangeEvent, FormEvent, useState } from 'react'
import { User } from '../../../type/types'

const initNewUser: User = { email: '', password: '', name: '' }

export const Register = () => {
	const [newUser, setNewUser] = useState<User>(initNewUser)
	const [repeatPassword, setRepeatPassword] = useState('')

	const handleUser = (event: ChangeEvent<HTMLInputElement>): void => {
		setNewUser({
			...newUser,
			[event.target.name]: event.target.value,
		})
	}

	const handleRepeatPassword = (event: ChangeEvent<HTMLInputElement>): void => {
		setRepeatPassword(() => event.target.value)
		console.log('checkPass::', repeatPassword)
	}

	const submit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault()
		console.log('submit::', newUser)
	}

	return (
		<>
			<div className='add__form'>
				<div
					className='add__close__btn'
					onClick={() => console.log('close::', newUser)}
				>
					<span>{null}</span>
					<span>{null}</span>
				</div>
				<form onSubmit={submit}>
					<label>
						Imię:
						<input name='name' value={newUser.name} onChange={handleUser} />
					</label>
					<label>
						Email:
						<input name='email' value={newUser.email} onChange={handleUser} />
					</label>
					<label>
						Hasło:
						<input
							name='password'
							value={newUser.password}
							onChange={handleUser}
						/>
					</label>
					<label>
						Powtórz hasło:
						<input
							name='repeat'
							value={repeatPassword}
							onChange={handleRepeatPassword}
						/>
					</label>
					<div className='login__buttons'>
						<button className='add__form__btn' type='submit'>
							Załóż konto
						</button>
					</div>
				</form>
			</div>
		</>
	)
}
