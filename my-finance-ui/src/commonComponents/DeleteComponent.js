import React from "react"
const DeleteComponent = ({handleClick})=> {
    return (
        <div>
            <p>Are you sure you want to delete this Investment?</p>
            <button onClick={handleClick}>Delete</button>
        </div>
    )
}

export default DeleteComponent;