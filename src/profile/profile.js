import React, {useEffect, useState} from "react";
import {API} from '../home/home';
import {Link} from "react-router-dom";
import {AddDiary} from "./addDiary";


export const Profile = ({match}) => {
    const [plant, setPlant] = useState({});
    const [diary, setDiary] = useState([]);

    useEffect(() => {
        getPlant();
    }, [])

    const getPlant = () => {
        fetch(`${API}/plants/${match.params.plantId}`, {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(plant => {
                console.log('plant::', plant);
                setPlant(plant);
            })
            .catch(err => console.log('Err', err));
    }

    const addDiary = (newDiary) => {
        fetch(`${API}/plants/${plant.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDiary)
        })
            .then(resp => resp.json())
            .then(diary => {
                setDiary(diary);
            })
    }

    return (
        <>
            <h1>{plant.name}</h1>
            <span>Data posadzenia: {plant.date}</span>
            <span>Pielęgnacja:<br/>{plant.care}</span>
            <AddDiary onAddDiary={addDiary} />
            <ul>Dziennik podlewań:
              {/*  {plant.diary.map((el) => <li key={plant.diary.id}>{el}</li>)}*/}
            </ul>
            <Link to='/'>Home</Link>
        </>
    );
}
