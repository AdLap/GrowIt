import React, {useEffect, useState} from "react";
import {API} from '../home/home';
import {Link} from "react-router-dom";
import {AddDiary} from "./addDiary";


export const Profile = ({match}) => {
    const [plant, setPlant] = useState({});
    /*const [diary, setDiary] = useState([]);*/

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
    console.log('profile/plant.diary', plant.diary);
    console.log('profile/plant.id', plant.id);
    console.log('match.params.plantId::', match.params.plantId);


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
                console.log('diary::', diary);
                console.log('plant.id::', match.params.plantId);
                console.log('newDiary::', newDiary);
                setPlant({
                    ...plant,
                    diary: [...plant.diary, newDiary]
                });
            })
    }

    console.log('plant z diary bez fetch::', plant);

    return (
        <>
            <h1>{plant.name}</h1>
            <span>Data posadzenia: {plant.date}</span>
            <span>Pielęgnacja:<br/>{plant.care}</span>
            <AddDiary onAddDiary={addDiary}/>
            <ul>Dziennik podlewań:
                {/* {plant.diary.map((el, idx) => <li key={idx}>{el}</li>)}*/}
            </ul>
            <Link to='/'>Home</Link>
        </>
    );
}
