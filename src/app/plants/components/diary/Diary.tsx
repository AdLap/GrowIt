import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { editPlant } from '../../duck/operations'
import { RootState } from '../../../store'

export const Diary = ({ onShowAdd, onShowEditDiary }) => {
	const dispatch = useDispatch()
	const currentPlant = useSelector((state: RootState) => state.plants.currentPlant)
	const plantToEdit = { ...currentPlant }

	const deleteDiary = (index) => {
		plantToEdit.diary.splice(index, 1)
		dispatch(editPlant(plantToEdit, plantToEdit.id))
	}

	return (
		<div className='profile__diary'>
			<button
				className='profile__diary__add'
				title='Dodaj wpis'
				onClick={() => onShowAdd()}
			>
				<FontAwesomeIcon icon={faPlusCircle} />
			</button>

			<ul className='profile__diary__list'>
				Dziennik:
				{currentPlant.diary &&
					currentPlant.diary.map((element, index) => (
						<li key={index} className='profile__diary__list__item'>
							<strong>data:</strong> {element.date}
							<br />
							<strong>zrobione:</strong> {element.do} / {element.note}
							<button
								className='profile__diary__list__delete'
								onClick={() => deleteDiary(index)}
							>
								<FontAwesomeIcon icon={faTrashAlt} />
							</button>
							<button
								className='profile__diary__list__edit'
								onClick={() => onShowEditDiary(index)}
							>
								<FontAwesomeIcon icon={faExchangeAlt} />
							</button>
						</li>
					))}
			</ul>
		</div>
	)
}
