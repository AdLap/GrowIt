import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editPlant } from '../../duck/operations'
import { AppDispatch, RootState } from '../../../store'
import { Diary, Plant } from '../../../../type/types'

const initialDiary = {
	date: new Date().toLocaleDateString(),
	do: '',
	note: '',
}

interface Props {
	hideAdd: () => void
}

export const AddDiary = ({ hideAdd }: Props) => {
	const [newDiary, setNewDiary] = useState<Diary>(initialDiary)
	const currentPlant: Plant = useSelector((state: RootState) => state.plants.currentPlant)
	const dispatch: AppDispatch = useDispatch()

	const handleNewDiary = (event: ChangeEvent<HTMLInputElement>) => {
		setNewDiary({
			...newDiary,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const plantWithDiary = { ...currentPlant }

		if (plantWithDiary.diary) {
			plantWithDiary.diary.push(newDiary)
		} else {
			plantWithDiary.diary = [newDiary]
		}

		dispatch(editPlant(plantWithDiary, currentPlant.id as string))
		setNewDiary(initialDiary)
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
				<button className='add__form__btn' type='submit'>
					Dodaj
				</button>
			</form>
		</div>
	)
}
