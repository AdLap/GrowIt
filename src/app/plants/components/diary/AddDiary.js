import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editPlant } from '../../duck/operations'

const initialDiary = {
	date: new Date().toLocaleDateString(),
	do: '',
	note: '',
}

export const AddDiary = ({ hideAdd }) => {
	const [newDiary, setNewDiary] = useState(initialDiary)
	const currentPlant = useSelector((state) => state.plants.currentPlant)
	const dispatch = useDispatch()

	const handleNewDiary = (e) => {
		setNewDiary({
			...newDiary,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const plantWithDiary = { ...currentPlant }

		if (plantWithDiary.diary) {
			plantWithDiary.diary.push(newDiary)
		} else {
			plantWithDiary.diary = [newDiary]
		}

		dispatch(editPlant(plantWithDiary, currentPlant.id))
		setNewDiary(Object.assign(newDiary, initialDiary))
		hideAdd(false)
	}

	return (
		<div className='add__form'>
			<div className='add__close__btn' onClick={() => hideAdd(false)}>
				<span>{null}</span>
				<span>{null}</span>
			</div>
			<form onSubmit={handleSubmit}>
				<label>
					Data:
					<input name='date' value={newDiary.date} onChange={handleNewDiary} />
				</label>
				<label>
					Czynność:
					<input name='do' value={newDiary.do} onChange={handleNewDiary} />
				</label>
				<label>
					Notatki:
					<input
						name='note'
						value={newDiary.note}
						onChange={handleNewDiary}
						type='textarea'
					/>
				</label>
				<button className='add__form__btn' onSubmit={handleSubmit}>
					Dodaj
				</button>
			</form>
		</div>
	)
}
