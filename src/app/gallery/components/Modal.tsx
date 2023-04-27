import React, { useEffect, useState } from 'react'
import { Plant } from '../../../type/types'
import actions from '../../plants/duck/actions'
import { useDispatch } from 'react-redux'

interface Props {
	plant: Plant
}

const Modal = ({ plant }: Props) => {
	const [images, setImages] = useState<string[]>([])
	const [curentImage, setCurrentImage] = useState(0)
	const dispatch = useDispatch()

	useEffect(() => {
		setImages((prev) => [...prev, plant.image])
	}, [plant.image])

	const closeModal = (): void => {
		dispatch(actions.openModal())
	}

	const nextImage = (): void => {
		if (curentImage >= images.length - 1) return
		setCurrentImage((prev) => prev + 1)
	}

	const prevImage = (): void => {
		if (curentImage <= 0) return
		setCurrentImage((prev) => prev - 1)
	}

	return (
		<section className='modal'>
			<div
				className='modal__close add__close__btn'
				onClick={() => closeModal()}
			>
				<span>{null}</span>
				<span>{null}</span>
			</div>
			{images.length > 1 && (
				<div className='modal__buttons'>
					{ curentImage >=1 &&
						<div className='modal__buttons__prev' onClick={() => prevImage()}>
							Prev
						</div>
					}
					{ curentImage < images.length &&
						<div className='modal__buttons__next' onClick={() => nextImage()}>
							Next
						</div>
					}
				</div>
			)}
			<div className='modal__image'>
				<img src={images[curentImage]} alt={plant.species} />
			</div>
		</section>
	)
}

export default Modal
