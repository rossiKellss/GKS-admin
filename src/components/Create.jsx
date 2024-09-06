import React, { useState,useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DevTool } from "@hookform/devtools";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAddProductsMutation } from "./app/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Create() {
  
  const form = useForm({
    defaultValues: {
      Category: "",
    },
    mode: "onSubmit",
  });

  // form handler
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState,
    trigger,
  } = form;
  const { errors } = formState;

  // for api
  const [addProducts, { isError }] = useAddProductsMutation();

  // handling on change function

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key == "Picture") {
        formData.append(key, data[key][0]);
      } else {
        if (key == "ProductName") {
          const capatilized =
            data[key].charAt(0).toUpperCase() + data[key].slice(1);
          formData.append(key, capatilized);
        } else {
          formData.append(key, data[key]);
        }
      }
    }

    try {
      const res = await addProducts(formData).unwrap();
      
      toast.success("Product added successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,

      });
    } catch (err) {
      console.log(err);
      toast.error(`${err.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,

      });
    }
  };
  



  return (
    <div className="w-full px-2 py-2">
      <ToastContainer />
      <h1 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Add items{" "}
      </h1>
      <form
        action=""
        className="w-3/4 flex flex-col gap-4 p-2"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="space-y-2">
          <Label htmlFor="picture">Image:</Label>
          <Input
            id="picture"
            type="file"
            {...register("Picture", {
              required: "Product image is required",
            })}
          />
          <p className="text-red-500 text-sm pt-1 px-2">
            {errors.Picture?.message}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="picture">Product name:</Label>
          <Input
            id="Name"
            type="text"
            name="ProductName"
            className="capitalize"
            placeholder='"Eg: Tomato"'
            {...register("ProductName", {
              required: "Product name is required",
            })}
          />
          <p className="text-red-500 text-sm pt-1 px-2">
            {errors.ProductName?.message}
          </p>
        </div>

        <div className="space-y-2">
          <Select
            value={getValues("Category")}
            onValueChange={(value) => setValue("Category", value)}
          >
            <Label htmlFor="Category">Category:</Label>
            <SelectTrigger>
              <SelectValue placeholder="Select item Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Vegetable" name="Category">
                  Vegetable
                </SelectItem>
                <SelectItem value="Fruit" name="Category">
                  Fruit
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-red-500 text-sm pt-1 px-2">
            {errors.Category?.message}
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="Description">Description:</Label>
          <Textarea
            placeholder="Enter item description"
            className="capitalize"
            name="Description"
            {...register("Description", {
              required: "Product description is required",
            })}
          />
          <p className="text-red-500 text-sm pt-1 px-2 ">
            {errors.Description?.message}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="space-y-2">
            <Label htmlFor="Price:">Price Per Kg:</Label>
            <Input
              type="Number"
              placeholder="Price in Rs"
              name="Price"
              {...register("Price", {
                required: "Product price is required",
              })}
            />
            <p className="text-red-500 text-sm pt-1 px-2">
              {errors.Price?.message}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="Quantity">Quantity:</Label>
            <Input
              type="Number"
              placeholder="Quantity in Kgs"
              name="Quantity"
              {...register("Quantity", {
                required: "Product quantity is required",
              })}
            />
            <p className="text-red-500 text-sm pt-1 px-2">
              {errors.Quantity?.message}
            </p>
          </div>
        </div>
        <Button className="border self-start bg-green-600  " type="Submit">
          Add Item
        </Button>
      </form>

      {/* for notification */}
    </div>
  );
}

export default Create;
