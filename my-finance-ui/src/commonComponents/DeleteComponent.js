import React from "react"
const DeleteComponent = ({handleClick})=> {
    return (
        <div>
            <p>Are you sure you want to delete this?</p>
            <button onClick={handleClick} style={{backgroundColor:"red"}}>Delete</button>
        </div>
    )
}

export default DeleteComponent;