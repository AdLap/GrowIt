import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { deletePlant, clearCurrentPlant } from '../../duck/operations'
import { initialPlant } from '../../duck/reducers'

const PlantsList = ({ openAdd }) => {
	const dispatch = useDispatch()
	const plantsList = useSelector((state) => state.plants.plantsList)

	useEffect(() => {
		const removeCurrentPlant = () => dispatch(clearCurrentPlant(initialPlant))
		return () => removeCurrentPlant()
	}, [dispatch])

	return (
		<section className='plant'>
			<nav className='plant__box'>
				{plantsList &&
					plantsList.map((plant) => (
						<div key={plant.id} className='plant__item'>
							<Link to={`/profile/${plant.id}`}>
								<div className='plant__img'>
									<img
										src={plant.image}
										alt={plant.species}
										className='plant__img__img'
									/>
								</div>
								<h2 className='plant__name'>{plant.name}</h2>
							</Link>
							<button
								onClick={() => dispatch(deletePlant(plant.id, plant.image))}
								className='plant__delete'
							>
								<FontAwesomeIcon icon={faTrashAlt} />
							</button>
						</div>
					))}
				<button onClick={() => openAdd(true)} className='plant__add'>
					<FontAwesomeIcon icon={faPlusCircle} />
				</button>
			</nav>
		</section>
	)
}

export default PlantsList
