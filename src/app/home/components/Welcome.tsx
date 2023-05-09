import React from 'react'

const handleLogin = (): void => {
	console.log('login')
}

const handleRegister = (): void => {
	console.log('register')
}

const Welcome = () => {
	return (
		<div className='welcome__container'>
			<p className='welcome__description'>
				Zaloguj się, lub załóż konto dla swojego ogródka
			</p>
			<div className='welcome__buttons'>
				<button className='welcome__buttons__login' onClick={handleLogin}>
					Zaloguj
				</button>
				<button className='welcome__buttons__register' onClick={handleRegister}>
					Załóż konto
				</button>
			</div>
		</div>
	)
}

export default Welcome
