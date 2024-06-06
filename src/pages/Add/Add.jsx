import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import toast from 'react-hot-toast';


const Add = ({url}) => {
    
    const [image, setImage]=useState(false);
    const [data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"",
    })

    const onChangeHandler=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData({
           ...data,
            [name]:value
        })
    }

   const OnSubmitHandler = async(e)=>{
        e.preventDefault();
        const formData = new FormData();

        formData.append("name",data.name);
        formData.append("description",data.description);
        //formData.append("price",data.Number(price));
        formData.append("price",data.price);
        formData.append("category",data.category);
        formData.append("image",image);

        const response = await axios.post(`${url}/api/food/add`,formData);
        console.log(response);
        if(response.data.success) {
            setData({
                name:"",
                description:"",
                price:"",
                category:"",
            })
            setImage(false);
            toast.success(response.data.message);
        }else{
            toast.error(response.data.message);
        }


   }

  return (
    <div className='add'>
        <form className='flex-col' onSubmit={OnSubmitHandler}>
            <div className='add-image-upload flex-col'>
                  <p>Upload Image</p>
                  <label htmlFor='image'>
                      <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt=''/>
                  </label>
                  <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' required hidden />
            </div>
            <div className='add-product-name flex-col'>
                <p>Product name</p>
                <input type='text' name='name' value={data.name} onChange={onChangeHandler} placeholder='Type here' required/>
            </div>
            <div className='add-product-description flex-col'>
                <p>Product description</p>
                <textarea name='description' rows="6" value={data.description} onChange={onChangeHandler} placeholder='Write contant here' required/>
            </div>
            <div className='add-category-price'>
                <div className='add-category flex-col'>
                    <p>Product Category</p>
                    <select name='category' onChange={onChangeHandler} required>
                        <option value=''>Select Category</option>
                        <option value='Salad'>Salad</option>
                        <option value='Rolls'>Rolls</option>
                        <option value='Deserts'>Deserts</option>
                        <option value='Sandwich'>Sandwich</option>
                        <option value='Cake'>Cake</option>
                        <option value='Pure Vage'>Pure Vage</option>
                        <option value='Pasta'>Pasta</option>
                        <option value='Noodles'>Noodles</option>
                        <option value='Biryani'>Biryani</option>
                    </select>
                </div>
                <div className='add-price flex-col'>
                    <p>Product Price</p>
                    <input type='Number' name='price' placeholder='Rs:100/-' value={data.price} onChange={onChangeHandler} required/>
                </div>
            </div>
            <button type='submit' className='add-btn'>Add</button>
        </form>
    </div>
  )
}

export default Add