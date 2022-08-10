import React from "react";
import { Link } from "react-router-dom";
import styles from "../navBar/NavBar.module.css";
import SearchBar from "../searchBar/SearchBar";

export default function NavBar (){
    return (
        <div>
           <nav className={styles.nav}>
            <ul className={styles.ul}>
             <li className={styles.li}>
               <a className={styles.a}>
                <Link to= "/home"className={styles.home}>THE LOFI RECIPES</Link>
                </a>
             </li>
            </ul>
           </nav>
           <SearchBar/>
        </div>
        
    )
}
