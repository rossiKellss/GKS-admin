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

function Update() {
    const params=useParams();
    console.log(params.id)
    const [updateCred,setUpdateCred]=useState();

    return (
        <div className="w-full px-2 py-2">
          <h1 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Update Item{" "}
          </h1>
          <form action="" className="w-3/4 flex flex-col gap-4 p-2">
            <div className="space-y-2">
              <Label htmlFor="picture">Image:</Label>
              <Input id="picture" type="file" />
            </div>
    
            <div className="space-y-2">
              <Label htmlFor="picture">Product name:</Label>
              <Input id="Name" type="text" placeholder='"Tomato"' />
            </div>
    
            <div className="space-y-2">
              <Select>
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
              <Textarea placeholder="Enter item description" />
            </div>
            <div className="flex justify-between">
              <div className="space-y-2">
                <Label htmlFor="Price:">Price Per Kg:</Label>
                <Input type="Number" placeholder="Price in Rs" />
              </div>
    
              <div className="space-y-2">
                <Label htmlFor="Quantity">Quantity:</Label>
                <Input type="Number" placeholder="Quantity in Kgs" />
              </div>
            </div>
            <Button className="border self-start bg-green-600 ">Update Item</Button>
          </form>
        </div>
      );
}

export default Update