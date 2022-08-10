import React from "react";
import { useState } from "react";
import Style from "../paginado/paginado.module.css"


// funcion con la creacion de paginado  ← Prev pageNumbers Next → usando states........
export default function Paginado ({recipesPerPage , allRecipes ,paginado}) {
    const pageNumbers = []
    const [pageNum, SetPageNum] = useState(1)
        for (let i = 0 ; i < Math.ceil(allRecipes/recipesPerPage) ; i++){
       pageNumbers.push(i+1)
    }
    return (
              
       <div>
           <ul className= {Style.div}>
                <li>
                   <p className= {Style.button} onClick={() => {if(pageNum > 1) paginado(pageNum - 1); if(pageNum > 1)SetPageNum(pageNum - 1)}}>
                   ⪻
                   </p>
                </li>
                {pageNumbers && pageNumbers.map(number =>(
                    <li>
                       <p className= {Style.button} onClick={() => {paginado(number); SetPageNum(number)}}>
                          {number}
                       </p>
                    </li>
                ))}
                <li>
                    <p className= {Style.button} onClick={() => {if(pageNum < pageNumbers.length) paginado(pageNum + 1); if(pageNum < pageNumbers.length) SetPageNum(pageNum + 1)}}>
                    ⪼
                    </p>
                </li>
            </ul>
       </div>
                
    )
    }