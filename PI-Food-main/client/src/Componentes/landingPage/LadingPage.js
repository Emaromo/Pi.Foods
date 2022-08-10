import React from "react";
import { Link } from "react-router-dom";
import styles from "../landingPage/LandingPage.module.css"

export default function LandingPage(){
    return(
        <div className={styles.landing}>
            <h1 className={styles.wlc}>
           THE LOFI RECIPES
            </h1>
            <Link to ="/home">
                <button className={styles.btn}>GET INTO►</button>
            </Link>
            <p>

            </p>
        </div>
    )
        
    
}