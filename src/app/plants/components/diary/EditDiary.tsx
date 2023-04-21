import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editPlant } from '../../duck/operations'
import { RootState } from '../../../store'
import { Diary, Plant } from '../../../../type/types'

interface Props {
	diary: Diary
	index: number
	hideAdd: () => void
}

const initialDiary = { date: '', do: '', note: '' }

export const EditDiary = ({ diary, index, hideAdd }: Props) => {
	const [updateDiary, setUpdateDiary] = useState(diary)
	const currentPlant: Plant = useSelector((state: RootState) => state.plants.currentPlant)
	const dispatch = useDispatch()
	const plantToEdit = { ...currentPlant }

	const handleUpdateDiary = (event: ChangeEvent<HTMLInputElement>) => {
		setUpdateDiary({
			...updateDiary,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		plantToEdit.diary.splice(index, 1, updateDiary)
		dispatch(editPlant(plantToEdit, plantToEdit.id))
		setUpdateDiary(Object.assign(updateDiary, initialDiary))
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
				<button className='add__form__btn' type='submit'>
					Zmień
				</button>
			</form>
		</div>
	)
}
