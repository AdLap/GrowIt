import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editPlant } from '../../duck/operations'
import { RootState } from '../../../store'

const initialDiary = { date: '', do: '', note: '' }

export const EditDiary = ({ diary, index, hideAdd }) => {
	const [updateDiary, setUpdateDiary] = useState(diary)
	const currentPlant = useSelector((state: RootState) => state.plants.currentPlant)
	const dispatch = useDispatch()
	const plantToEdit = { ...currentPlant }

	const handleUpdateDiary = (e) => {
		setUpdateDiary({
			...updateDiary,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		plantToEdit.diary.splice(index, 1, updateDiary)
		dispatch(editPlant(plantToEdit, plantToEdit.id))
		setUpdateDiary(Object.assign(updateDiary, initialDiary))
		hideAdd(null)
	}

	return (
		<div className='add__form'>
			<div className='add__close__btn' onClick={() => hideAdd(null)}>
				<span>{null}</span>
				<span>{null}</span>
			</div>
			<form onSubmit={handleSubmit}>
				<label>
					Data:
					<input
						name='date'
						value={updateDiary.date}
						onChange={handleUpdateDiary}
					/>
				</label>
				<label>
					Czynność:
					<input
						name='do'
						value={updateDiary.do}
						onChange={handleUpdateDiary}
					/>
				</label>
				<label>
					Notatki:
					<input
						name='note'
						value={updateDiary.note}
						onChange={handleUpdateDiary}
						type='textarea'
					/>
				</label>
				<button className='add__form__btn' onSubmit={handleSubmit}>
					Zmień
				</button>
			</form>
		</div>
	)
}
