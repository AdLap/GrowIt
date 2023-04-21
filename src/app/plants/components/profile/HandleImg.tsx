import React, { ChangeEvent, FormEvent, MouseEvent, useState } from 'react'

interface Props {
	onUpdateImg: (newImg: Blob | null) => void
	hideAdd: () => void
	onProgress: number
	onResetProgress: () => void
}

export const HandleImg = ({
	onUpdateImg,
	hideAdd,
	onProgress,
	onResetProgress,
}: Props) => {
	const [newImg, setNewImg] = useState<Blob | null>(null)
	const [err, setErr] = useState('')

	const handleUpdateImage = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return
		let selectedImage = event.target.files[0]
		if (selectedImage.type.includes('image/jpeg' || 'image/png')) {
			setNewImg(selectedImage)
			setErr('')
		} else {
			setNewImg(null)
			setErr('Wybierz plik z obrazem (jpg lub png)')
		}
	}

	const handleSubmitImage = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		onUpdateImg(newImg)
	}

	const handleConfirmButton = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		hideAdd()
		onResetProgress()
	}

	return (
		<div className='add__form'>
			<div className='add__close__btn' onClick={() => hideAdd()}>
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
						type='submit'
						className='add__form__btn'
						// onClick={handleSubmitImage}
						disabled={!!onProgress}
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
