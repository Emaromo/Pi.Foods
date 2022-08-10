//useEffect: accediendo al ciclo 🌀 de vida de nuestro componente. 
//El ciclo de vida de los componentes en React permitía en nuestros 
//componentes con class poder ejecutar código en diferentes fases de montaje, 
//actualización y desmontaje.
//useDispatch Es una función que permite lanzar acciones (actions)//
// al store, con la intención de afectar el estado.
import React from "react";
import {useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import  {Link} from "react-router-dom"


//****>IMPORTACION DE ACCIONES<******
import{ GetRecipe,orderByName,orderByPuntuation,filterRecipesByTypeDiet,filterDb} from "../../Redux/actions/index"

//****>IMPORTACION DE COMPONENTES UTILIZADOS EN EL HOME<******
import NavBar from "../navBar/NavBar";
import Paginado from "../paginado/Paginado";
import Card from "../cards/Card";
import styles from "../home/home.module.css"



export default function Home (){    
    
   //<***************>PAGINATION<***********>
     const dispatch = useDispatch()
     const allRecipes = useSelector ((state)=> state.Recipes)
    
     
     const[order,setOrder] =useState('')  
     const[currentPage,setCurrentPage] =useState(1)                                             
     const[recipesPerPage,]=useState(8)
     const [setRender] = useState("");                             
     const indexLastRecipe = currentPage * recipesPerPage                            
     const indexFirstRecipe = indexLastRecipe - recipesPerPage                       
     const currentRecipes = allRecipes.slice(indexFirstRecipe,indexLastRecipe)       
    
     const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
     }
     // hook del matchDispatchToProps()
    useEffect(()=>{
        dispatch(GetRecipe())
    },[ dispatch])


    // *******> HANDLERS <**********
    function HandleClick(e){
    e.preventDefault()
    dispatch(GetRecipe());
    }
    function handleSort (e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`ordenado ${e.target.value}`)
    }
    function handlePuntuation (e) {
        e.preventDefault();
        dispatch(orderByPuntuation(e.target.value))
        setCurrentPage(1);
        setOrder(`ordenado ${e.target.value}`)
    }
    function handleFilterTypeDiet (e) {
        e.preventDefault();
        dispatch(filterRecipesByTypeDiet(e.target.value))
        dispatch(filterDb(e.target.value))
        setCurrentPage(1);
        setOrder(`ordenado ${e.target.value}`)
        
    }

    return(
        <div>
            <NavBar/>
            <Paginado
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                paginado={paginado}
                /> 
            <button className={styles.btn} onClick={e=>{HandleClick(e)}}>
                refresh 
            </button> 
            
        <div>
            <div>
            <Link to= "/recipe">
           <button className={styles.create}>Create</button>
            </Link>  
            </div>
            <div>
            <Link to= "/">
                <button className={styles.back}>
                  Back
                </button>
            </Link>
            </div>
        
            <div>
                <select className={styles.az}onChange={e =>handleSort(e)}>
                    <option selected hidden
                    className={styles.az}>Alphabetic</option>
                    <option  value = "asc">A to Z</option>
                    <option value = "des">Z to A</option>
                </select>
            </div>
            </div>
            <div>
                <select className={styles.score}onChange={e => handlePuntuation(e)} >
                <option selected hidden className={styles.score}>Score</option>
                    <option value="max">Max to Min</option>
                    <option value="min">Min to Max</option>
                </select>
                </div>
            <div>
            <div>
                <select onChange={e => handleFilterTypeDiet(e)} className={styles.TypeDiets}>
                    <option value="All">TypeDiet</option>
                    <option value="created">Created</option>
                    {/* <option value="api">Api</option> */}
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegan">Vegetarian </option>
                    <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="whole 30">Whole 30</option>
                    <option value="fodmap friendly">fodmapfriendly</option>
                </select> 
              
            </div>
            <div className={styles.cardArea}>{
              currentRecipes?currentRecipes.map(info=>{
                return(
                    <Link to={'/recipes/' + info.id}>
                    <Card name={info.name} image={info.image} diets={info.diets} key={info.id} healthScore= {info.healthScore}/>
                    </Link>
                )
                
               })
               : <div>loading...</div>  
            }

            </div>
          

            </div>
        </div>
    )

    
}

      

     