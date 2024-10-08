import React, { useEffect } from "react";
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
import { useParams } from "react-router-dom";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//api import
import {
  useUpdateProductsMutation,
  useLazyGetProductsByIdQuery,
} from "../app/productApiSlice";

function Update() {
  const params = useParams();

  // handling update api
  const [triggerGet] = useLazyGetProductsByIdQuery();

  const [updateProducts] = useUpdateProductsMutation();

  const [updateCred, setUpdateCred] = useState({});

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await triggerGet(params.id);

        setUpdateCred(res.data.products); // Assuming `res.data` contains the product details
      } catch (err) {
        console.log(err);
      }
    };

    fetchProductData();
  }, [params.id, triggerGet]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === "file" ? e.target.files : e.target.value;
    setUpdateCred({ ...updateCred, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in updateCred) {
      if (key == "Picture") {
        formData.append(key, updateCred[key][0]);
      } else {
        if (key == "ProductName") {
          const capatilized =
            updateCred[key].charAt(0).toUpperCase() + updateCred[key].slice(1);
          formData.append(key, capatilized);
        } else {
          formData.append(key, updateCred[key]);
        }
      }
    }
    try {
      await updateProducts({ id: params.id, formData });

      toast.success("Item updated successfully");
    } catch (err) {
      if (err.data) {
        toast.error(`${err.data.err}`);
      } else {
        toast.error("Some unknown error occured");
      }
    }
  };

  const handleOptions = (data) => {
    setUpdateCred({ ...updateCred, Category: data });
  };



  return (
    <div className="w-full px-2 py-2">
      <ToastContainer />
      <h1 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Update Item{" "}
      </h1>
      <form
        className="w-3/4 flex flex-col gap-4 p-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="space-y-2">
          <Label htmlFor="picture">Image:</Label>
          <Input
            id="picture"
            type="file"
            name="Picture"
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="picture">Product name:</Label>
          <Input
            id="Name"
            type="text"
            name="ProductName"
            placeholder='"Tomato"'
            value={updateCred.ProductName}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Select
            onValueChange={handleOptions}
            defaultValue={updateCred.Category}
          >
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
          <Textarea
            placeholder="Enter item description"
            name="Desc"
            value={updateCred.Description}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between">
          <div className="space-y-2">
            <Label htmlFor="Price:">Price Per Kg:</Label>
            <Input
              type="Number"
              placeholder="Price in Rs"
              name="Price"
              value={updateCred.Price}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Quantity">Quantity:</Label>
            <Input
              type="Number"
              placeholder="Quantity in Kgs"
              value={updateCred.Quantity}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button className="border self-start bg-green-600 " type="Submit">
          Update Item
        </Button>
      </form>
    </div>
  );
}

export default Update;
