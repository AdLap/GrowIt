import React, { ChangeEvent, FormEvent, MouseEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { storage } from '../../../../firebase/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addPlant } from '../../duck/operations'
import { initialPlant } from '../../duck/reducers'
import { Plant } from '../../../../type/types'
import { AppDispatch } from '../../../store'

interface Props {
	hideAdd: () => void
}

const AddPlant = ({ hideAdd }: Props) => {
	const [img, setImg] = useState<Blob | null>(null)
	const [progress, setProgress] = useState(0)
	const [error, setError] = useState<string | null>(null)
	const [validErrMsg, setValidErrMsg] = useState('')
	const [newPlant, setNewPlant] = useState(initialPlant)
	const dispatch: AppDispatch = useDispatch()

	const addImage = (img: Blob): void => {
		const storageRef = ref(storage, `img/${img.name}`)
		try {
			const uploadImg = uploadBytesResumable(storageRef, img)
			uploadImg.on(
				// @ts-expect-error firebase
				'state-changed',
				(snapshot) => {
					let percentage =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					setProgress(percentage)
				},
				(error) => {
					console.error('uploadImage error::', error)
				},
				() => {
					getDownloadURL(uploadImg.snapshot.ref).then((downloadURL) =>
						setNewPlant({
							...newPlant,
							image: downloadURL
						})
					)
				}
			)
		} catch (error) {
			console.error(error)
		}
	}

	const handleNewPlant = (event: ChangeEvent<HTMLInputElement>): void => {
		setNewPlant({
			...newPlant,
			[event.target.name]: event.target.value,
		})
	}

	const handleAddImage = (event: ChangeEvent<HTMLInputElement>): void => {
		if (!event.target.files) return
		let selectedImage = event.target.files[0]
		if (selectedImage.type.includes('image/jpeg' || 'image/png')) {
			setImg(selectedImage)
			setError('')
		} else {
			setImg(null)
			setError('Wybierz plik z obrazem (jpg lub png)')
		}
	}

	const handleSubmitImage = (event: MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault()
		if (!img) return
		addImage(img)
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault()
		const err = validate(newPlant)
		if (err) {
			setValidErrMsg(err)
			return
		}

		dispatch(addPlant(newPlant))
		setNewPlant(initialPlant)
		hideAdd()
		setProgress(0)
	}

	const validate = (newPlant: Plant): string | null => {
		if (newPlant.name.length < 1) {
			return 'Nazwij mnie... :)'
		}
		if (newPlant.species.length < 3) {
			return 'Nazwa mojego gatunku nie mie może być krótsza niz 3 znaki... :P'
		}
		if (!newPlant.date) {
			return 'Napisz od kiedy z Tobą jestem :)'
		}
		return null
	}

	return (
		<div className='add__form'>
			<div className='add__close__btn' onClick={() => hideAdd()}>
				<span>{null}</span>
				<span>{null}</span>
			</div>
			<form onSubmit={handleSubmit}>
				<label>
					Imię:
					<input name='name' value={newPlant.name} onChange={handleNewPlant} />
				</label>
				<label>
					Nazwa (gatunek):
					<input
						name='species'
						value={newPlant.species}
						onChange={handleNewPlant}
					/>
				</label>
				<label>
					Data sadzenia:
					<input name='date' value={newPlant.date} onChange={handleNewPlant} />
				</label>
				<label>
					Pielęgnacja:
					<input
						name='care'
						value={newPlant.care}
						onChange={handleNewPlant}
						type='textarea'
					/>
				</label>

				<label>
					Dodaj zdjęcie:
					<input onChange={handleAddImage} type='file' />
					{img && <div className='add__form__selected'>{img.name}</div>}
					{error && <div className='add__form__err'>{error}</div>}
					<button
						className='add__form__btn'
						onClick={handleSubmitImage}
						disabled={progress === 100 && true}
					>
						Dodaj zdjęcie
						<div
							className='add__form__btn__progress'
							style={{ width: `${progress}%` }}
						>
							{progress === 100 && 'Zdjęcie dodano'}
						</div>
					</button>
				</label>

				<button className='add__form__btn' type='submit'>
					Utwórz profil dla {newPlant.name}
				</button>
				{validErrMsg && <div className='add__form__err'>{validErrMsg}</div>}
			</form>
		</div>
	)
}

export default AddPlant
