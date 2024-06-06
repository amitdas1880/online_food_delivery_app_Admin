import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import toast from 'react-hot-toast';

const List = ({url}) => {
  
  const [listData,setList]=useState([]);

  const fetchList = async() =>{
    const response = await axios.get(`${url}/api/food/list`);
   // console.log(response.data);
    if(response.data.success){
      setList(response.data.foods);
    }
    else{
      toast.error(response.data.message);
    }
  }

  useEffect(()=>{
      fetchList();
  },[])

  console.log("List Data - ",listData);


  const removeFood=async(foodId)=>{
     // console.log("Removing ",foodId)
     const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
     await fetchList();
     if(response.data.success){
       toast.success(response.data.message);
     }
     else{
       toast.error(response.data.message);
     }
  }

  return (
    <div className='list add flex-col'>
        <p>All Food List</p>
        <div className='list-table'>
            <div className='list-table-format title'>
                  <b>Image</b>
                  <b>Name</b>
                  <b>Category</b>
                  <b>Price</b>
                  <b>Action</b>
            </div>
            { listData.map((item,index)=>{
                return(
                  <div key={index} className='list-table-format'>
                      <img src={`${url}/images/`+item.image} alt=''/>
                      <p>{item.name}</p>
                      <p>{item.category}</p>
                      <p>₹{item.price}</p>
                      <p className='curser' onClick={()=>removeFood(item._id)}>X</p>
                  </div>
                )
            })}
        </div>
    </div>
  )
}

export default List