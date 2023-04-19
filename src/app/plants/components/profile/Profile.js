import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editPlant, getCurrentPlant } from '../../duck/operations'
import { storage } from '../../../../firebase/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { AddDiary } from '../diary/AddDiary'
import { EditPlant } from './EditProfile'
import { HandleImg } from './HandleImg'
import { Diary } from '../diary/Diary'
import { EditDiary } from '../diary/EditDiary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt, faHome } from '@fortawesome/free-solid-svg-icons'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'

const Profile = () => {
	const [openAdd, setOpenAdd] = useState(false)
	const [openEditDiary, setOpenEditDiary] = useState(false)
	const [editedDiaryIndex, setEditedDiaryIndex] = useState(null)
	const [openEdit, setOpenEdit] = useState(false)
	const [openEditImg, setOpenEditImg] = useState(false)
	const [progress, setProgress] = useState(0)
	const dispatch = useDispatch()
	const { plantId } = useParams()
	const currentPlant = useSelector((state) => state.plants.currentPlant)

	useEffect(() => {
		const getActivePlant = () => dispatch(getCurrentPlant(plantId))

		return () => getActivePlant()
	}, [dispatch, plantId])

	const showAdd = () => setOpenAdd(!openAdd)
	const showEdit = () => setOpenEdit(!openEdit)
	const showEditDiary = (index) => {
		setOpenEditDiary(!openEditDiary)
		setEditedDiaryIndex(index)
	}
	const showEditImg = () => setOpenEditImg(!openEditImg)
	const resetProgress = () => setProgress(0)

	const uploadImage = (newImg) => {
		const storageRef = ref(storage, `img/${newImg.name}`)
		try {
			const uploadImg = uploadBytesResumable(storageRef, newImg)
			uploadImg.on(
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
					getDownloadURL(uploadImg.snapshot.ref).then((downloadURL) => {
						const plantNewImg = { ...currentPlant }
						plantNewImg.image = downloadURL
						dispatch(editPlant(plantNewImg, plantId))
					})
				}
			)
		} catch (error) {
			console.error('upload error::', error)
		}
	}

	const deleteImage = () => {
		const plantDeleteImg = { ...currentPlant }
		plantDeleteImg.image = ''
		dispatch(editPlant(plantDeleteImg, plantDeleteImg.id))
	}

	return (
		<section className='profile'>
			<div className='container'>
				<h1 className='profile__title'>{currentPlant.name}</h1>
				<div className='profile__img'>
					<img
						className='profile__img__img'
						src={currentPlant.image}
						alt={currentPlant.species}
					/>
					<button
						className='profile__img__btn'
						onClick={() => showEditImg()}
					>
						<FontAwesomeIcon icon={faExchangeAlt} />
					</button>
					<button
						className='profile__img__btn__delete'
						onClick={() => deleteImage(currentPlant.id)}
					>
						<FontAwesomeIcon icon={faTrashAlt} />
					</button>
				</div>
				<div className='profile__data'>
					<span className='profile__data__species'>
						<strong>Gatunek:</strong> {currentPlant.species}
					</span>
					<span className='profile__data__date'>
						<strong>Od kiedy go mam:</strong> {currentPlant.date}
					</span>
				</div>
				<p className='profile__care'>
					Pielęgnacja:
					<br />
					{currentPlant.care}
				</p>

				<div className='profile__buttons'>
					<Link to='/' className='profile__buttons__home'>
						<FontAwesomeIcon icon={faHome} />
					</Link>
					<button
						className='profile__buttons__edit'
						onClick={() => showEdit()}
					>
						<FontAwesomeIcon icon={faEdit} />
					</button>
				</div>

				{openEditImg &&
					<HandleImg
						onUpdateImg={uploadImage}
						hideAdd={showEditImg}
						onProgress={progress}
						onResetProgress={resetProgress}
					/>
				}
				{openEdit && <EditPlant plant={currentPlant} hideAdd={showEdit} />}
				{openAdd && <AddDiary hideAdd={showAdd} plant={currentPlant} />}
				{openEditDiary &&
					<EditDiary
						diary={currentPlant.diary[editedDiaryIndex]}
						hideAdd={showEditDiary}
						index={editedDiaryIndex}
					/>
				}
				<Diary onShowAdd={showAdd} onShowEditDiary={showEditDiary} />
			</div>
		</section>
	)
}

export default Profile
