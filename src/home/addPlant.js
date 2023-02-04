import React, { useState } from "react";
import { storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export const AddPlant = ({ onAdd, hideAdd }) => {
    const [img, setImg] = useState(null);
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [validErrMsg, setValidErrMsg] = useState('');
    const [newPlant, setNewPlant] = useState({
        name: '',
        species: '',
        date: '',
        care: '',
        image: '',
        diary: []
    });

    const addImage = (img) => {
        const storageRef = ref(storage, `img/${img.name}`);
        try {
            const uploadImg = uploadBytesResumable(storageRef, img);
            uploadImg.on(
                'state-changed',
                snapshot => {
                    let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(percentage);
                },
                error => {
                    console.log(error);
                    // setError(error);
                },
                () => {
                    getDownloadURL(uploadImg.snapshot.ref).then(downloadURL => setUrl(downloadURL));
                }
            )
        } catch (error) {
            console.error(error)

        }
    }

    const handleNewPlant = e => {
        setNewPlant({
            ...newPlant,
            [e.target.name]: e.target.value,
        })
    }

    const handleAddImage = e => {
        //  setImg(e.target.files[0]);
        let selectedImage = e.target.files[0];
        //    setNewImg(selectedImage);
        if (selectedImage.type.includes('image/jpeg' || 'image/png')) {
            setImg(selectedImage);
            setError('');
        } else {
            setImg(null);
            setError('Wybierz plik z obrazem (jpg lub png)')
        }
    }

    const handleSubmitImage = e => {
        e.preventDefault();
        e.stopPropagation();
        addImage(img);
    }

    const handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();

        const err = validate(newPlant);
        if (err) {
            setValidErrMsg(err)
        } else {
            onAdd({
                name: newPlant.name,
                species: newPlant.species,
                date: newPlant.date,
                care: newPlant.care,
                image: url,
                diary: []
            })
            setNewPlant({
                name: '',
                species: '',
                date: '',
                care: '',
                image: '',
                diary: []
            })
            hideAdd(false);
            setProgress(0);
        }
    }

    const validate = newPlant => {
        if (newPlant.name.length < 1) {
            return 'Nazwij mnie... :)';
        }
        if (newPlant.species.length < 3) {
            return 'Nazwa mojego gatunku nie mie może być krótsza niz 3 znaki... :P';
        }
        if (!newPlant.date) {
            return 'Napisz od kiedy z Tobą jestem :)';
        }
        return null;
    }

    return (
        <div className='add__form'>
            <div className='add__close__btn' onClick={() => hideAdd(false)}>
                <span>{null}</span>
                <span>{null}</span>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Imię:
                    <input name='name' value={newPlant.name} onChange={handleNewPlant} />
                </label>
                <label>Nazwa (gatunek):
                    <input name='species' value={newPlant.species} onChange={handleNewPlant} />
                </label>
                <label>Data sadzenia:
                    <input name='date' value={newPlant.date} onChange={handleNewPlant} />
                </label>
                <label>Pielęgnacja:
                    <input name='care' value={newPlant.care} onChange={handleNewPlant} type='textarea' />
                </label>

                <label>Dodaj zdjęcie:
                    <input onChange={handleAddImage} type='file' />
                    {img && <div className='add__form__selected'>{img.name}</div>}
                    {error && <div className='add__form__err'>{error}</div>}
                    <button className='add__form__btn' onClick={handleSubmitImage}
                        disabled={progress === 100 && true}>Dodaj zdjęcie
                        <div className='add__form__btn__progress'
                            style={{ width: `${progress}%` }}>{progress === 100 && 'Zdjęcie dodano'}
                        </div>
                    </button>
                </label>

                <button className='add__form__btn' onSubmit={handleSubmit}>Utwórz profil dla {newPlant.name}</button>
                {validErrMsg && <div className='add__form__err'>{validErrMsg}</div>}
            </form>
        </div>
    );
}
