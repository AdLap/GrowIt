import React, { useState } from "react";
import { storage } from "../firebase/firebase";
import { HandleImg } from "../profile/handleImg";

export const Gallery = () => {
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [err, setErr] = useState('');

    console.log(images)

    /*   useEffect(() => {
           const unsubscribe = storage.ref('img')
               .child()
               .getDownloadURL()
               .then(url => {
                   setImages([...images, url])
               })
   
           return () => unsubscribe();
       }, [])*/

    const addImage = (newImage) => {
        const uploadImg = storage.ref(`img/${newImage.name}`).put(newImage);
        uploadImg.on(
            'state-changed',
            snapshot => {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(percentage);
            },
            error => {
                console.log(error);
                setErr(error);
            },
            () => {
                storage
                    .ref('img')
                    .child(newImage.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        setImages([...images, url]);
                    });
            }
        )
    }

    return (
        <section className='gallery'>
            <HandleImg onAddImage={addImage} />
        </section>
    );
}
/*
onUpdateImg={} hideAdd={} onProgress={} onResetProgress={}*/
