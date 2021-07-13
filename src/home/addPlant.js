import React, {useState} from "react";
import {storage} from "../firebase";

export const AddPlant = ({onAdd, hideAdd}) => {
    const [img, setImg] = useState(null);
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(0);
  //  const [error, setError] = useState(null)
    const [newPlant, setNewPlant] = useState({
        name: '',
        species: '',
        date: '',
        care: '',
        image: '',
        diary: []
    })

    console.log('img::', img);
    console.log('progress', progress);

    const addImage = (img) => {
        const uploadImg = storage.ref(`img/${img.name}`).put(img);
        uploadImg.on(
            'state-changed',
            snapshot => {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(percentage);
            },
            error => {
                console.log(error);
        //        setError(error);
            },
            () => {
                storage
                    .ref('img')
                    .child(img.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        setUrl(url);
                    });
            }
        )
    }

    const handleNewPlant = e => {
        setNewPlant({
            ...newPlant,
            [e.target.name]: e.target.value,
        })
    }

    const handleAddImage = e => {
        setImg(e.target.files[0]);
    }

    const handleSubmitImage = e => {
        e.preventDefault();
        e.stopPropagation();
        addImage(img);
    }

    const handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        console.log('newPlant::', newPlant)
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

    return (
        <div className='add__form'>
            <div className='add__close__btn' onClick={() => hideAdd(false)}>
                <span>{null}</span>
                <span>{null}</span>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Imię:
                    <input name='name' value={newPlant.name} onChange={handleNewPlant}/>
                </label>
                <label>Nazwa (gatunek):
                    <input name='species' value={newPlant.species} onChange={handleNewPlant}/>
                </label>
                <label>Data sadzenia:
                    <input name='date' value={newPlant.date} onChange={handleNewPlant}/>
                </label>
                <label>Pielęgnacja:
                    <input name='care' value={newPlant.care} onChange={handleNewPlant} type='textarea'/>
                </label>

                <label>Dodaj zdjęcie:
                    <input onChange={handleAddImage} type='file'/>
                    {img && <div className='add__form__selected'>{img.name}</div> }
                    <button className='add__form__btn' onClick={handleSubmitImage}
                            disabled={progress === 100 && true}>Dodaj zdjęcie
                        <div className='add__form__btn__progress'
                             style={{width: `${progress}%`}}>{progress === 100 && 'Zdjęcie dodano'}
                        </div>
                    </button>
                </label>

                <button className='add__form__btn' onSubmit={handleSubmit}>Utwórz profil dla {newPlant.name}</button>
            </form>
        </div>
    );
}
