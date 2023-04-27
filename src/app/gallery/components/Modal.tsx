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
    setImages(prev => [...prev, plant.image])
  },[plant.image])

  return (
		<section className='modal'>
			<div className='modal__close' onClick={() => dispatch(actions.openModal())}>X</div>
      { images.length > 1 &&
        <div className='modal__buttons'>
				<div className='modal__buttons__prev' onClick={() => setCurrentImage(prev => prev--)}>prev</div>
				<div className='modal__buttons__next' onClick={() => setCurrentImage(prev => prev++)}>next</div>
			</div>
      }
			<div className='modal__image'>
				<img src={images[curentImage]} alt={plant.species} />
			</div>
		</section>
	)
}

export default Modal
