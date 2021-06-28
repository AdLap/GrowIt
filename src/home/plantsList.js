import React from "react";
import {Link} from "react-router-dom";

export const PlantsList = ({showPlants, openAdd}) => {

    console.log('showPlants ID::', showPlants.id);

    return (
        <div className='plant__box'>
            {showPlants.map(plant => <Link to='/profile' key={plant.id}>
                <div className='plant__item'>{plant.name} {plant.date}</div>
            </Link>)}
            <button onClick={openAdd} className='plant__item'>Dodaj</button>
        </div>
    );
}
