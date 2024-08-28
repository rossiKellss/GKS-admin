import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAddProductsMutation } from "./app/apiSlice";

function Create() {
  const [addProducts,{isError}]=useAddProductsMutation();


  const [productData, setProductData] = useState({});
  const handleData = (e) => {
    
    const name=e.target.name;
    const value=e.target.value;
    setProductData({ ...productData, [name]: value });
  };
  

  // for category items
  const handleSelectChange=(value)=>{
   const name="Category";
   setProductData({...productData,[name]:value})

  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    try{
      const res= await(addProducts(productData)).unwrap();
      console.log(res.message)

    }catch(err){
      console.log(err);
    }
    
     
    
   
    
   
   

    

  }

  
  
  return (
    <div className="w-full px-2 py-2">
      {isError&&<h1>Some error occured</h1>}
      <h1 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Add items{" "}
      </h1>
      <form action="" className="w-3/4 flex flex-col gap-4 p-2" onSubmit={handleSubmit}>
        {/* <div className="space-y-2">
          <Label htmlFor="picture">Image:</Label>
          <Input id="picture" type="file" />
        </div> */}

        <div className="space-y-2">
          <Label htmlFor="picture">Product name:</Label>
          <Input
            id="Name"
            type="text"
            name="ProductName"
            placeholder='"Eg: Tomato"'
            onChange={(e) => {
              handleData(e);
            }}
          />
        </div>

        <div className="space-y-2">
          <Select onValueChange={handleSelectChange} >
            <Label htmlFor="Category">Category:</Label>
            <SelectTrigger>
              <SelectValue placeholder="Select item Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Vegetable" name="Category" >Vegetable</SelectItem>
                <SelectItem value="Fruit" name="Category">Fruit</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="Description">Description:</Label>
          <Textarea placeholder="Enter item description" name="Description"  onChange={(e) => {
              handleData(e);
            }} />
        </div>
        <div className="flex justify-between">
          <div className="space-y-2">
            <Label htmlFor="Price:">Price Per Kg:</Label>
            <Input type="Number" placeholder="Price in Rs" name="Price" onChange={(e) => {
              handleData(e);
            }} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Quantity">Quantity:</Label>
            <Input type="Number" placeholder="Quantity in Kgs" name="Quantity" onChange={(e) => {
              handleData(e);
            }} />
          </div>
        </div>
        <Button className="border self-start bg-green-600  " type='Submit'>Add Item</Button>
      </form>
    </div>
  );
}

export default Create;
