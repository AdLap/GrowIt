// import { useEffect, useState } from 'react'
// import { storage } from '../firebase/firebase'

// export const useUploadImage = (newImg) => {
//     const [imageUrl, setImageUrl] = useState('')
//     const [progress, setProgress] = useState(0)

// 	const uploadImg = storage.ref(`img/${newImg.name}`).put(newImg)

//     useEffect(() => {
//         uploadImg.on(
// 		'state-changed',
// 		(snapshot) => {
// 			let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
// 			setProgress(percentage)
// 		},
// 		(error) => {
// 			console.log(error)
// 		},
// 		() => {
// 			storage
// 				.ref('img')
// 				.child(newImg.name)
// 				.getDownloadURL()
// 				.then((url) => {
// 					console.log(url)
// 					setImageUrl(url)
// 				})
// 		}
// 	)
//     },[newImg.name, uploadImg])
	

//     return imageUrl
// }

/*
const updateImg = url => {
    db.collection('plants')
        .doc(`${match.params.plantId}`)
        .update({
            image: url
        })
        .catch(err => console.log('ERR', err));
}
*/
