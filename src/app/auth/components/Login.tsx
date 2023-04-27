import React, { ChangeEvent, FormEvent, useState } from 'react'
import { User } from '../../../type/types'

const initUser: User = { login: '', password: '' }

export const Login = () => {
	const [user, setUser] = useState<User>(initUser)

	const handleUser = (event: ChangeEvent<HTMLInputElement>): void => {
		setUser({
			...user,
			[event.target.name]: event.target.value,
		})
	}
	const submit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault()
		console.log('submit::', user)
	}

	return (
		<>
			<div className='add__form'>
				<div
					className='add__close__btn'
					onClick={() => console.log('close::', user)}
				>
					<span>{null}</span>
					<span>{null}</span>
				</div>
				<form onSubmit={submit}>
					<label>
						Login:
						<input name='login' value={user.login} onChange={handleUser} />
					</label>
					<label>
						Hasło:
						<input
							name='password'
							value={user.password}
							onChange={handleUser}
						/>
					</label>
					<div className='login__buttons'>
						<button className='add__form__btn' type='submit'>
							Zaloguj
						</button>
						<button
							className='add__form__btn login__buttons__register'
							type='button'
							onClick={() => console.log('register')}
						>
							Rejestracja
						</button>
					</div>
				</form>
			</div>
		</>
	)
}
