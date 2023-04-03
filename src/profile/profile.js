import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AddDiary } from './addDiary'
import { EditPlant } from './editProfile'
import { HandleImg } from './handleImg'
import firebase from 'firebase/compat/app' // compat ??
import { db, storage } from '../firebase/firebase'
import {
	doc,
	getDoc,
	updateDoc,
	arrayUnion,
	deleteDoc,
	deleteField,
	arrayRemove,
} from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt, faHome } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { Diary } from './diary'
//import {EditDiary} from "./diary/editDiary";

export const Profile = () => {
	const [plant, setPlant] = useState({})
	const [openAdd, setOpenAdd] = useState(false)
	// const [openEditDiary, setOpenEditDiary] = useState(false);
	//  const [plt, setPlt] = useState({});
	const [openEdit, setOpenEdit] = useState(false)
	const [openEditImg, setOpenEditImg] = useState(false)
	const [progress, setProgress] = useState(0)
	const { plantId } = useParams()

	const plantRef = doc(db, 'plants', plantId)
	const diaryRef = doc(db, 'plants', plantId)

	useEffect(() => {
		const fetchPlant = async () => {
			const data = await getDoc(plantRef)
			setPlant(data.data())
		}

		try {
			fetchPlant()
		} catch (error) {
			console.error(error)
		}

		return () => fetchPlant()
	}, [plantId])

	const addDiary = (newDiary) => {
		updateDoc(diaryRef, {
			diary: arrayUnion(newDiary),
		})
	}

	const deleteDiary = (delDiary) => {
		console.log('de', delDiary)
		updateDoc(diaryRef, {
			diary: arrayRemove(delDiary),
		})
	}

	/*const updateDiary = (updatedDiary) => {
        db.collection('plants')
            .doc(`${plantId}`)
            .update({diary: firebase.firestore.FieldValue.arrayUnion(updatedDiary)
                  /!*  {
                        date: updatedDiary.date,
                        do: updatedDiary.do,
                        note: updatedDiary.note
                    }*!/
            })
            .catch(error => console.error('Err', error))
    }*/

	const updatePlant = (plantData) => {
		db.collection('plants')
			.doc(`${plantId}`)
			.update({
				name: plantData.name,
				species: plantData.species,
				date: plantData.date,
				care: plantData.care,
				image: plantData.image,
			})
			.catch((error) => console.error('Err', error))
	}

	const uploadImage = (newImg) => {
		const uploadImg = storage.ref(`img/${newImg.name}`).put(newImg)
		uploadImg.on(
			'state-changed',
			(snapshot) => {
				let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				setProgress(percentage)
			},
			(error) => {
				console.log(error)
			},
			() => {
				storage
					.ref('img')
					.child(newImg.name)
					.getDownloadURL()
					.then((url) => {
						console.log(url)
						updateImg(url)
					})
			}
		)
	}

	const updateImg = (url) => {
		db.collection('plants')
			.doc(`${plantId}`)
			.update({
				image: url,
			})
			.catch((err) => console.log('ERR', err))
	}

	const showAdd = (todo) => {
		setOpenAdd(todo)
	}

	/*const showEditDiary = (todo, plt) => {
        setOpenEditDiary(todo);
        setPlt(plt);
    }*/

	const showEdit = (todo) => {
		setOpenEdit(todo)
	}

	const showEditImg = (todo) => {
		setOpenEditImg(todo)
	}

	const resetProgress = (todo) => {
		setProgress(todo)
	}

	return (
		<section className='profile'>
			<div className='container'>
				<h1 className='profile__title'>{plant.name}</h1>
				<div className='profile__img'>
					<img
						className='profile__img__img'
						src={plant.image}
						alt={plant.species}
					/>
					<button
						className='profile__img__btn'
						onClick={() => showEditImg(true)}
					>
						<FontAwesomeIcon icon={faExchangeAlt} />
					</button>
				</div>
				<div className='profile__data'>
					<span className='profile__data__species'>
						<strong>Gatunek:</strong> {plant.species}
					</span>
					<span className='profile__data__date'>
						<strong>Od kiedy go mam:</strong> {plant.date}
					</span>
				</div>
				<p className='profile__care'>
					Pielęgnacja:
					<br />
					{plant.care}
				</p>

				<div className='profile__buttons'>
					<Link to='/' className='profile__buttons__home'>
						<FontAwesomeIcon icon={faHome} />
					</Link>
					<button
						className='profile__buttons__edit'
						onClick={() => showEdit(true)}
					>
						<FontAwesomeIcon icon={faEdit} />
					</button>
				</div>

				{openEditImg && (
					<HandleImg
						onUpdateImg={uploadImage}
						hideAdd={showEditImg}
						onProgress={progress}
						onResetProgress={resetProgress}
					/>
				)}
				{openEdit && (
					<EditPlant
						plant={plant}
						onUpdatePlant={updatePlant}
						hideAdd={showEdit}
					/>
				)}
				{openAdd && (
					<AddDiary onAddDiary={addDiary} hideAdd={showAdd} plant={plant} />
				)}
				{/*  {openEditDiary && <EditDiary diary={plt} onUpdateDiary={updateDiary}/>}*/}

				<Diary
					diary={plant.diary}
					onShowAdd={showAdd}
					onDeleteDiary={deleteDiary}
				/>
			</div>
		</section>
	)
}
