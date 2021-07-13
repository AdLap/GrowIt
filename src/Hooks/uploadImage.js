/*

import React from "react";
import {db, storage} from "../firebase";

const uploadImage = (newImg) => {
    const uploadImg = storage.ref(`img/${newImg.name}`).put(newImg);
    uploadImg.on(
        'state-changed',
        snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(percentage);
        },
        error => {
            console.log(error);
        },
        () => {
            storage
                .ref('img')
                .child(newImg.name)
                .getDownloadURL()
                .then(url => {
                    console.log(url);
                    updateImg(url);
                });
        }
    )
}

const updateImg = url => {
    db.collection('plants')
        .doc(`${match.params.plantId}`)
        .update({
            image: url
        })
        .catch(err => console.log('ERR', err));
}
*/
