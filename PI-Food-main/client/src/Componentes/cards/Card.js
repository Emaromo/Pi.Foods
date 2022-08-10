import React from "react";
import styles from "../cards/Card.module.css"


export default function Card({name,image,diets,healthScore}){
    return(
        <div className={styles.container}>
         <div className={styles.card}>
           <div className={styles.imgBx}>
             <img className={styles.img} src={image}/>
             </div>
           <div className={styles.contentBx}>
             <div className={styles.content}>
                <h1>{name}</h1>
                <h2>HEALTHSCORE{healthScore}💚</h2>
                <h3>DIET TYPE🥗</h3>
                <h4>{`${diets}`}</h4> 
             </div>
           </div>
          </div>
        </div>
      
    )
}

