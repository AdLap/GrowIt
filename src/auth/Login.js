import React from 'react';
import { useState } from 'react';
import firebase from 'firebase';
import { auth } from '../firebase';
//import { getAuth, signInAnonymously } from 'firebase-auth';

export const Login = () => {
    const [errMsg, setErrMsg] = useState('');

    const handleAnonLogin = () => firebase.auth().signInAnonymously()
        .then(() => {
            console.log('autoryzacja')
        })
        .catch(error => {
            setErrMsg(error);
        })

    return (
        <>
            <div className='login__btn' onClick={() => handleAnonLogin}>
                Logowanie
            </div>
            {errMsg && <h1>Błąd logowania</h1>}
        </>
    );
}
