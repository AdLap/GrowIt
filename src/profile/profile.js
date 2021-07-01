import React, {useEffect, useState} from "react";
import {API} from '../home/home';
import {Link} from "react-router-dom";
import {AddDiary} from "./addDiary";


export const Profile = ({match}) => {
    const [plant, setPlant] = useState({});

    useEffect(() => {
        getPlant();
    }, [])

    const getPlant = () => {
        fetch(`${API}/plants/${match.params.plantId}`, {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(plt => {
                console.log('fetch.plt::', plt);
                setPlant(plt);
            })
            .catch(err => console.log('Err', err));
    }

    console.log('profile/plant::', plant);

 /*   const newDiary = newDiary => {
        setPlant({
            ...plant,
            diary: [...plant.diary, newDiary]
        });
    }*/

    const addDiary = (newDiary) => {
        fetch(`${API}/plants/${plant.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDiary)
        })
            .then(resp => resp.json())
            .then(diary => {
                setPlant(diary);
            })
        console.log('plant po add diary::', plant);
    }

    return (
        <section className='profile'>
            <h1>{plant.name}</h1>
            <span className='profile__date'>Data posadzenia: {plant.date}</span>
            <span className='profile__care'>Pielęgnacja:<br/>{plant.care}</span>
            <AddDiary onAddDiary={addDiary}/>
            <ul className='profile__diary'>Dziennik podlewań:
                {/* {plant.diary.map((el, idx) => <li key={idx}>{el.do}</li>)}*/}
            </ul>
            <Link to='/'>Home</Link>
        </section>
    );
}
