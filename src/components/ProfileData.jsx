import React, { useState } from "react";
import { Category } from "go-vending-inventory-management-model-js/src/Category";
import { Warehouse } from "go-vending-inventory-management-model-js/src/Warehouse"



/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
export const ProfileData = (props) => {

    const { isWareHouse, setIsWarehouse } = useState;

    const { Name } = Category();

    let category = Category();
    let bodega = Warehouse();
   
    console.log(category)
    



    return (
        <div id="profile-div">

            {/* <p><strong>First Name: </strong> {props.graphData.givenName}</p> */}
            <p><strong>Email: </strong> {props.graphData.userPrincipalName}</p>
            <p>{category.id}</p>
            <p>{category.description}</p>

            <p>{bodega.id}</p>



        </div>
    );
};