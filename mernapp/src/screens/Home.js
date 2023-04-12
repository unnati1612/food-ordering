import React from 'react'
import Navbar from '../components/Navbar.js'
import Footer from '../components/Footer.js'
import Card from '../components/Card.js'
import { useEffect,useState } from 'react'
export default function Home() {

  const [foodCat,setFoodCat]=useState([])
  const [foodItem,setFoodItem]=useState([])
  const [search,setSearch]=useState([])

  const loadData=async()=>{
   let response= await fetch("https://food-ordering-24hu.onrender.com/api/fooddata",{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    }
   })
   response= await response.json()
   setFoodItem(response[0])
   setFoodCat(response[1])
  //  console.log(response[0],response[1])
  }
useEffect(()=>{
  loadData()
},[])

  return (
    <div>
    <div><Navbar/></div> 
   <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: 'conatin !important'}}>
   <div className="carousel-inner">
   <div className="carousel-caption" style={{zIndex:'10'}}>
   <div className="d-flex justify-content-center" >
   <input className="form-control me-2 " style={{height:"3rem"}} value={search} onChange={(e)=>{setSearch(e.target.value)}} type="search" placeholder="Search" aria-label="Search"/>
   </div>
   </div>
     <div className="carousel-item active " style={{height:"500px"}} >
       <img src="https://source.unsplash.com/random/100×100/?burger" style={{filter:"brightness(30%)", objectFit: 'cover',maxHeight:'100%'}}className="d-block w-100 h-70" alt="..."/>
     </div>
     <div className="carousel-item" style={{height:"500px"}}  >
       <img src="https://source.unsplash.com/random/100×100/?pizza" style={{filter:"brightness(30%)",objectFit: 'cover',maxHeight:'100%'}}className="d-block w-100 h-70" alt="..."/>
     </div>
     <div className="carousel-item" style={{height:"500px"}} >
       <img src="https://source.unsplash.com/random/100×100/?burrito" style={{filter:"brightness(30%)",objectFit: 'cover',maxHeight:'100%'}}className="d-block w-100 h-70" alt="..."/>
     </div>
   </div>
   <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
     <span className="visually-hidden">Previous</span>
   </button>
   <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
     <span className="carousel-control-next-icon" aria-hidden="true"></span>
     <span className="visually-hidden">Next</span>
   </button>
 </div></div>
    <div className='container'>
    {
       foodCat!==[]
       ?foodCat.map((data)=>{
        return(<div className='row mb-3'>
         <div key={data._id} className="fs-3 m-3">
         {data.CategoryName} 
          </div>
          <hr/> 
          {foodItem!==[]
            ?foodItem.filter((item)=> (item.CategoryName===data.CategoryName)&&(item.name.toLowerCase().includes(search.toString().toLowerCase())))
            .map(filteritems=>{
              return (
                <div key={filteritems._id} className="col-12 col-md-6 col-lg-3 m-4">
                <Card foodItem={filteritems}
                  options={filteritems.options[0]}
                  // imgsrc={filteritems.img}
                ></Card>
                </div>
              )
            })
            :<div>No such data found</div>
          }
          </div>
        )
       })
       :<div>****</div>
    }
   </div>
   <div><Footer/></div>

    </div>
  )
}
