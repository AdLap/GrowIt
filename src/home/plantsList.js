import React from "react";
import {Link} from "react-router-dom";

export const PlantsList = ({showPlants, openAdd}) => {

    return (
        <nav className='plant__box'>
            {showPlants.map(plant => <Link to={`/profile/${plant.id}`} key={plant.id}
                className='plant__item'>{plant.name}
            </Link>)}
            <button onClick={() => openAdd(true)} className='plant__item'>Dodaj</button>
        </nav>
    );
}
