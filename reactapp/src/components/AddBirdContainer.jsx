import React, { useState } from "react";

import BirdContainer from "./BirdContainer";

//Button behavior/style


function addContainer() {
    return(
        <div classname ="container-fluid ">
            <div classname ="row justify-content-center">
                <BirdContainer />
            </div>
        </div>
    );
}

function AddBirdContainer() {
    return(
        <div>
            <button 
                type ="button" 
                style ="color: white;
                        background-color: #4e69c3" 
                onClick={addContainer()}
            >
                Add
            </button>
        </div>
    );
};

export default AddBirdContainer;