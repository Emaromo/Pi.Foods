import React, {useEffect , useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from '../recipeCreate/RecipeCreate.module.css'
import {getTypeDiets,postRecipes} from"../../Redux/actions/index"
function controlForm (input){
    const reg = new RegExp('^[0-9]+$');
    let errors = {}
    if(!input.name) errors.name= 'please put the title of the recipe'
    if(!input.summary) errors.summary= 'please put the summary of the recipe'
    if(input.spoonacularScore<0 || input.spoonacularScore>100 || !reg.test(input.spoonacularScore)) errors.spoonacularScore='put a puntuation between 0-100'
    if(input.healthScore<0 || input.healthScore>100 || !reg.test(input.healthScore)) errors.healthScore='put a healthScore between 0-100'
    return errors
}


export default function CreateRecipe() {
    const dispatch = useDispatch()
    let listDiets = useSelector((state) => state.TypeDiets )
    console.log('esto es diet',listDiets);
    const [errors,setErrors]=useState({})      // este estado local es para, las validaciones(del formulario controlado)
    const [input,setInput] = useState({
        name:'',
        summary:'',
        spoonacularScore:'',
        image: "",
        healthScore:'',
        steps:'',
        diets:[],
        
    })
    // console.log(input);
    useEffect(() => {
        dispatch(getTypeDiets())
        },[dispatch])

 function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(controlForm({
            ...input,
            [e.target.name] : e.target.value    // me copio todo lo que venga del formulario , en el caso de que en alguno
        }))                               // no cumpla con las validaciones, se va a poner un texto advirtiendo
}
function handleSelect(e){
    setInput({
        ...input,
        diets:[...input.diets, e.target.value]
       
    })
    console.log (input)
}
function handleSubmit(e){
    e.preventDefault();
    dispatch(postRecipes(input))
    alert('Congratulations you created a new recipe!')
    setInput({
        name :'',
        summary:'',
        spoonacularScore:'',
        healthScore:'',
        image: "",
        steps:'',
        diets:[]
    })
}
function handleDelete(e){
    setInput({
        ...input,
        diets: input.diets.filter(diet => diet !== e )
    }) //este es para borrar algun tipe diet que haya elegido, va a creat un nuevo array con todos los que no sean
}//    el elemento que le hice click

    return (
        <div className={styles.bkg}>
        <div className={styles.container}>
            <Link to ='/home' ><button className={styles.btn}>Back Home</button></Link>
            <h1 className={styles.h1}>Create your recipe</h1>
            <form onSubmit={(e) => {handleSubmit(e)}} className={styles.form}>
                <div className={styles.tex}>
                    <label>name:</label>
                    <input 
                    className={styles.texinput}
                    type='text' 
                    name='name'
                    placeholder="name..."
                    value={input.name}
                    onChange={(e) => {handleChange(e)}}
                    required
                    />
                    { errors.name && (
                        <p className={styles.error}>{errors.name}</p>
                    ) }
                </div>
                <div className={styles.tex}>
                    <label>summary:</label>
                    <input
                    className={styles.texinput}
                    type='text'
                    name='summary'
                    placeholder="summary..."
                    value={input.summary}
                    onChange={(e) => {handleChange(e)}} 
                    />
                    { errors.summary && (
                        <p className={styles.error}>{errors.summary}</p>
                    ) }
                </div>
                <div className={styles.tex}>
                <label>Image : </label>
                    <input
                     className={styles.texinput}
                    type="text"
                    value= {input.image}
                    name="image"
                    placeholder="image..."
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={styles.tex}>
                    <label>puntuation:</label>
                    <input className={styles.texinput}
                    type='text'
                    name='spoonacularScore'
                    placeholder="puntuation..."
                    value={input.spoonacularScore}
                    onChange={(e) => {handleChange(e)}} 
                    />
                    { errors.spoonacularScore && (
                        <p className={styles.error}>{errors.spoonacularScore}</p>
                    ) }
                </div>
                <div className={styles.tex}>
                    <label>healthScore:</label>
                    <input
                    className={styles.texinput}
                    type='text'
                    name='healthScore'
                    placeholder="healthscore..."
                    value={input.healthScore}
                    onChange={(e) => {handleChange(e)}} 
                    />
                     { errors.healthScore && (
                        <p className={styles.error}>{errors.healthScore}</p>
                    ) }
                </div>
                <div className={styles.tex}>
                    <label>step by step:</label>
                    <input
                    className={styles.texinput}
                    type='text'
                    name='steps'
                    placeholder="steps..."
                    value={input.steps}
                    onChange={(e) => {handleChange(e)}} 
                    />
                </div>
                {/* <select onChange={(e) => handleSelect(e)} className={styles.select} >
                    <option value={""} hidden>TypeDiet</option>
                    {listDiets?.map((t) => {
                    
                    return <option  key ={t.id} value={t.name}> {t.name} </option>
                    
                    })}
                    
                </select > */}
                  <select onChange={(e) => handleSelect(e)} className={styles.select} required>
                <option>Selecciona el tipo de Dieta</option>
                {listDiets?.map((d) => (
                    <option key={d.name} value={d.name}>
                   {d.name}
                    </option>
                ))}
            </select>
                {errors.hasOwnProperty('name') || errors.hasOwnProperty('summary') || errors.hasOwnProperty('spoonacularScore') || errors.hasOwnProperty('healthScore')?  <p className={styles.adv}> please complete all the inputs to create your recipe</p> : <button type='submit' className={styles.correct}> Create Recipe</button>  }
               
            </form>
            
            {input.diets.map(e => {
               return(
               <div >
                    <h5 className={styles.types}>{e}</h5>
                    <button className={styles.btnx} onClick={() => handleDelete(e)}>X</button>
                   
                </div>
            )})}
        </div>
        </div>
    )

}