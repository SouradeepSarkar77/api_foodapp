import React from 'react'

import { useState } from 'react'




function Search() {


  const [input, setInput] = useState("")
  const [flag,setFlag] = useState(false)

  const submitHandler = (e) => {
    setFlag(true);
    e.preventDefault();
    console.log("searched")
    getItems();
  }

  const [items, setItems] = useState([]);


  const API_KEY = '0eda32b0d41f8e930488dbd177549193';
  const API_ID = '9f3c4e7a';

  const getItems = async () => {
    const api = await fetch(`https://api.edamam.com/search?q=${input}&app_id=${API_ID}&app_key=${API_KEY}`)
    const data = await api.json();
    console.log(data);
    setItems(data.hits);
  }
  return (

    <>
      <form onSubmit={submitHandler}>
        <div className="top-section">
          <span className="material-symbols-outlined">
            restaurant
          </span>
          <span className="header">Recipe App</span>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search Here..." aria-label="Recipient's username" aria-describedby="button-addon2"
              value={input} onChange={(e) => setInput(e.target.value)} />
            <button className="btn btn-outline-secondary" type="submit" id="button-addon2" >Search</button>
          </div>
        </div>
      </form>

{flag? (
 <div className="allfoods">
 {
   items.map((recipe) => {
     return (

       <div key={recipe.recipe.label} className="cards">
         <img src={recipe.recipe.image} alt="" className="img"></img>
         <p className="name">{recipe.recipe.label}</p>
         <p><b className="cal">Calories: </b>{recipe.recipe.calories} cal.</p>
         <p className="type">CuisineType : {recipe.recipe.cuisineType}</p>
         <p className="dtype">DishType : {recipe.recipe.dishType}</p>
         <div className="rdetails">
           <p className="descrip">Recipe Details</p>
           <p >{recipe.recipe.ingredientLines}</p>
         </div>
       </div>
     )
   })
 }

</div>
) : (
  <h2>Search for your recepies...</h2>
)}
     

    </>

  )
}

export default Search