import React from "react";
import {Link} from "react-router-dom";

export const PlantsList = ({showPlants, openAdd, getId}) => {

    return (
        <div className='plant__box'>
            {showPlants.map(plant => <Link to='/profile' key={plant.id}
                className='plant__item' onClick={() => getId(plant.id)}>{plant.name} {plant.date}
            </Link>)}
            <button onClick={openAdd} className='plant__item'>Dodaj</button>
        </div>
    );
}
