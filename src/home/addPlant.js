import React, {useState} from "react";
import {storage} from "../firebase";

export const AddPlant = ({onAdd, hideAdd}) => {
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
        console.log('newPlant::', newPlant)

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
            return 'Nazwa mojego gatunku nie mie mo??e by?? kr??tsza niz 3 znaki... :P';
        }
        if (!newPlant.date) {
            return 'Napisz od kiedy z Tob?? jestem :)';
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
                <label>Imi??:
                    <input name='name' value={newPlant.name} onChange={handleNewPlant}/>
                </label>
                <label>Nazwa (gatunek):
                    <input name='species' value={newPlant.species} onChange={handleNewPlant}/>
                </label>
                <label>Data sadzenia:
                    <input name='date' value={newPlant.date} onChange={handleNewPlant}/>
                </label>
                <label>Piel??gnacja:
                    <input name='care' value={newPlant.care} onChange={handleNewPlant} type='textarea'/>
                </label>

                <label>Dodaj zdj??cie:
                    <input onChange={handleAddImage} type='file'/>
                    {img && <div className='add__form__selected'>{img.name}</div> }
                    {error && <div className='add__form__err'>{error}</div> }
                    <button className='add__form__btn' onClick={handleSubmitImage}
                            disabled={progress === 100 && true}>Dodaj zdj??cie
                        <div className='add__form__btn__progress'
                             style={{width: `${progress}%`}}>{progress === 100 && 'Zdj??cie dodano'}
                        </div>
                    </button>
                </label>

                <button className='add__form__btn' onSubmit={handleSubmit}>Utw??rz profil dla {newPlant.name}</button>
                {validErrMsg && <div className='add__form__err'>{validErrMsg}</div>}
            </form>
        </div>
    );
}
