import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GetRecipesByName } from "../../Redux/actions";
import styles from "../searchBar/Searchbar.module.css"


export default function SearchBar (){
    const dispatch= useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e) {
        setName(e.target.value)
    }

    function handleSubmit(e){
        if(name.length !== 0 ){
            dispatch(GetRecipesByName(name)) 
        }
        if(name.length === 0){
            alert('Debes ingresar el nombre de una receta(>ლ)')
        }
        setName("")
    }

    return (
        <div className={styles.searchBox}>
            <input
            type = "text" 
            value= {name}
            className={styles.searchTxt}
            placeholder="Search recipe..."
            onChange={(e) => handleInputChange(e)}
            />
            <button className={styles.searchBtn} type="submit" onClick={(e) => handleSubmit(e)}>
            <img
            src="https://cdn-icons-png.flaticon.com/512/151/151773.png"
             width="25px"
             height="25px"
            alt="search game"
            />
            </button>
        </div>
    )

}
