import React, { useState } from 'react'

// TODO | GROW-7. GROW-8

export const HandleImg = ({
	onUpdateImg,
	hideAdd,
	onProgress,
	onResetProgress,
	onAddImage,
}) => {
	const [newImg, setNewImg] = useState(null)
	const [err, setErr] = useState('')

	const handleUpdateImage = (e) => {
		let selectedImage = e.target.files[0]
		if (selectedImage.type.includes('image/jpeg' || 'image/png')) {
			setNewImg(selectedImage)
			setErr('')
		} else {
			setNewImg(null)
			setErr('Wybierz plik z obrazem (jpg lub png)')
		}
	}

	const handleSubmitImage = (e) => {
		e.preventDefault()
		onUpdateImg(newImg)
	}

	const handleConfirmButton = (e) => {
		e.preventDefault()
		hideAdd(false)
		onResetProgress(0)
	}

	return (
		<div className='add__form'>
			<div className='add__close__btn' onClick={() => hideAdd(false)}>
				<span>{null}</span>
				<span>{null}</span>
			</div>

			<form onSubmit={handleSubmitImage}>
				<label>
					Zmień zdjęcie:
					<input onChange={handleUpdateImage} type='file' />
					{newImg && <div className='add__form__selected'>{newImg.name}</div>}
					{err && <div className='add__form__err'>{err}</div>}
					<button
						className='add__form__btn'
						onClick={handleSubmitImage}
						disabled={onProgress && true}
					>
						Dodaj zdjęcie
						<div
							className='add__form__btn__progress'
							style={{ width: `${onProgress}%` }}
						>
							{onProgress === 100 && 'Mam nową fotę :)'}
						</div>
					</button>
					{onProgress === 100 && (
						<button
							className='add__form__btn__ok'
							onClick={handleConfirmButton}
						>
							Potwierdź
						</button>
					)}
				</label>
			</form>
		</div>
	)
}
