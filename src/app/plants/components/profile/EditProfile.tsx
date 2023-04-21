import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editPlant } from '../../duck/operations'
import { Plant } from '../../../../type/types'

interface Props {
	plant: Plant
	hideAdd: () => void
}

export const EditPlant = ({ plant, hideAdd }: Props) => {
	const [updatedPlant, setUpdatedPlant] = useState(plant)
	const dispatch = useDispatch()

	const handleUpdatedPlant = (event: ChangeEvent<HTMLInputElement>) => {
		setUpdatedPlant({
			...updatedPlant,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		dispatch(editPlant(updatedPlant, updatedPlant.id))
		hideAdd()
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
					<input
						name='name'
						value={updatedPlant.name}
						onChange={handleUpdatedPlant}
					/>
				</label>
				<label>
					Nazwa (gatunek):
					<input
						name='species'
						value={updatedPlant.species}
						onChange={handleUpdatedPlant}
					/>
				</label>
				<label>
					Data sadzenia:
					<input
						name='date'
						value={updatedPlant.date}
						onChange={handleUpdatedPlant}
					/>
				</label>
				<label>
					Pielęgnacja:
					<input
						name='care'
						value={updatedPlant.care}
						onChange={handleUpdatedPlant}
						type='textarea'
					/>
				</label>

				<button className='add__form__btn' type='submit'>
					Zmień
				</button>
			</form>
		</div>
	)
}
