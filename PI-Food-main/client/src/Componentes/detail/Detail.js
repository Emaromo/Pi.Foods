import React from "react";
import {getRecipesById,cleandetail} from '../../Redux/actions'
import { useParams } from "react-router";
import { useDispatch  , useSelector} from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../detail/Detail.module.css"


export default function Detail(props) {
  const{id} = useParams()
  const dispatch = useDispatch() 
  useEffect (() => {
    
    dispatch(getRecipesById(id))
    return ()=>{
        dispatch(cleandetail())
    }
} ,[]) 
 const detailsstate = useSelector((state) => state.details)
 console.log('estos son los detalles',detailsstate);
 
  return (
      <div>
       
     { 
      detailsstate.length > 0 ? 
       
       <div className={styles.dt}> 
           <Link to='/home'><button className={styles.btn}>Back Home</button></Link>
           <h1 className={styles.title}> {detailsstate[0].name|| "not found"} </h1>
           <img className={styles.imga} src={detailsstate[0].image? detailsstate[0].image :"https://i.pinimg.com/originals/a5/30/e8/a530e854cb40930702fcb19af23de844.gif"}/>
           <h3 className={styles.diet}>Diet: {typeof detailsstate[0].diets[0]==="string"?detailsstate[0].diets.join(", "):detailsstate[0].diets.map(d=>d.name).join(", ")|| "not found"}</h3> 
           <h4 className={styles.dish}>Dish Type: {detailsstate[0].dishTypes? detailsstate[0].dishTypes.map(d => d) :'dinner,lunch'}</h4> 
            <h5 className={styles.type}>summary: {detailsstate[0].summary|| "not found"}</h5>
           <h5 className={styles.healthScore}>healthScore: {detailsstate[0].healthScore|| "not found"}</h5> 
           <h5 className={styles.type}>steps: {detailsstate[0].steps[0].step?detailsstate[0].steps.map(s=>s.step).join(", ") :detailsstate[0].steps || "not found"}</h5> 
      </div>
           : 
       
      <div  className={styles.img}  >
        
           <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5ecd5fab-be8d-4409-bd84-4a3d205b9ec8/daehq7e-48b7f14a-14ff-4082-9e7c-aee710c9bbfd.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVlY2Q1ZmFiLWJlOGQtNDQwOS1iZDg0LTRhM2QyMDViOWVjOFwvZGFlaHE3ZS00OGI3ZjE0YS0xNGZmLTQwODItOWU3Yy1hZWU3MTBjOWJiZmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GW_7jlunpf-1g4Dy3ppLR414Q_YBZ6MxF9QAVlbV4Ck"/>
       
       </div>

    }
        </div>
    )
}