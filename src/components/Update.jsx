import React from 'react'
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
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

//api import
import { useUpdateProductsMutation } from './app/apiSlice';

function Update() {

  // handling update api
  const [updateProducts]=useUpdateProductsMutation();
    const params=useParams();
    
    const [updateCred,setUpdateCred]=useState();

    const {register,handleSubmit,setValue,getValues} =useForm();

    const onUpdate=(data)=>{
      updateProducts({id:params.id,data});
    }




    return (
        <div className="w-full px-2 py-2">
          <h1 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Update Item{" "}
          </h1>
          <form className="w-3/4 flex flex-col gap-4 p-2" onSubmit={handleSubmit(onUpdate)}>
            {/* <div className="space-y-2">
              <Label htmlFor="picture">Image:</Label>
              <Input id="picture" type="file"  />
            </div> */}
    
            <div className="space-y-2">
              <Label htmlFor="picture">Product name:</Label>
              <Input id="Name" type="text" name="ProductName" placeholder='"Tomato"' {...register("ProductName")} />
            </div>
    
            <div className="space-y-2">
              <Select value={getValues("Category")} onValueChange={(value)=>{
                setValue("Category",value)

              }}>
                <Label htmlFor="Category">Category:</Label>
                <SelectTrigger>
                  <SelectValue placeholder="Select item Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Vegetable">Vegetable</SelectItem>
                    <SelectItem value="Fruit">Fruit</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="Description">Description:</Label>
              <Textarea placeholder="Enter item description" name="Desc" {...register("Description")}/>
            </div>
            <div className="flex justify-between">
              <div className="space-y-2">
                <Label htmlFor="Price:">Price Per Kg:</Label>
                <Input type="Number" placeholder="Price in Rs" name="Price" {...register("Price")} />
              </div>
    
              <div className="space-y-2">
                <Label htmlFor="Quantity">Quantity:</Label>
                <Input type="Number" placeholder="Quantity in Kgs" {...register("Quantity")} />
              </div>
            </div>
            <Button className="border self-start bg-green-600 " type="Submit">Update Item</Button>
          </form>
        </div>
      );
}

export default Update;