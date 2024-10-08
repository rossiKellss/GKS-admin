import React, { useEffect, useState } from "react";
import {
  useGetProductsQuery,
  useDeleteProductsMutation,
  useLazySearchProductsQuery,
  useLazyFilterProductsQuery,
} from "../app/productApiSlice";

import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { Input } from "@/components/ui/input";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

function List() {
  const {
    data: initialData,
    error,
    isLoading,
    isSuccess,
  } = useGetProductsQuery();

  const [deleteProducts] = useDeleteProductsMutation();
  const [triggerSearch] = useLazySearchProductsQuery();
  const [triggerFilter]=useLazyFilterProductsQuery();
  

  const [fetchedData, setFetchedData] = useState();
  const [searchCred, setSearchCred] = useState();

  useEffect(() => {
    if (initialData) {
      setFetchedData(initialData);
    }
  }, [initialData]);

  const capatilizeLetter = () => {
    const cLetter = searchCred.charAt(0).toUpperCase() + searchCred.slice(1);
    return cLetter;
  };

  const onSearch = async () => {
    const capatilizedCred = capatilizeLetter();
    try {
      const res = await triggerSearch(capatilizedCred);
     

      setFetchedData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onReset = () => {
    setFetchedData(initialData);
  };

  const handleSelect=async(value)=>{
    try{
      const res=await triggerFilter(value);
    
      
      setFetchedData(res.data)
    }catch(err){
      console.log(err)
    }

    

  }

  const deleteItem = async (id) => {
    try {
      const { data } = await deleteProducts(id);
      console.log(data.message);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="w-full px-3 ">
      <h1 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0  py-1">
        Your lists
      </h1>

      <div className="table w-full px-2 mt-4 space-y-3 ">
        <div className="flex gap-2 pb-2 ">
          <Input
            className="w-1/2"
            onChange={(e) => {
              setSearchCred(e.target.value);
            }}
            placeholder="Search items"
          />
          <Button
            className="bg-green-600 hover:bg-black"
            onClick={() => {
              onSearch();
            }}
          >
            Search
          </Button>
          <Button className="bg-red-500 hover:bg-black" onClick={onReset}>
            Reset
          </Button>
          <div className="">
            <DropdownMenu className="">
              <DropdownMenuTrigger className="flex items-center gap-2 bg-primary rounded-md text-white text-base px-3">
                <span className="tracking-normal">Filter</span>
                <IoIosArrowDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2">
                <DropdownMenuItem value="FBN" className="" onSelect={()=>{handleSelect("FBN")}}>
                  Filter by name (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem value="FBD" onSelect={()=>{handleSelect("FBD")}}>Filter by date</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Table className="border">
          <TableCaption>Product Lists</TableCaption>
          <TableHeader className="">
            <TableRow className="bg-gray-400 ">
              <TableHead className="text-black  ">S.N</TableHead>
              <TableHead className="text-black ">Image</TableHead>
              <TableHead className="text-black">Name</TableHead>
              <TableHead className="text-black">Category</TableHead>

              <TableHead className="text-center text-black">
                Quantity {"(in kg)"}
              </TableHead>

              <TableHead className="text-center text-black">
                Amount {"(per kg)"}
              </TableHead>
              <TableHead className="text-black ">Actions</TableHead>
              <TableHead className="text-black ">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fetchedData &&
              fetchedData.products.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium ">{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={`http://localhost:4000/api/image/download/${item.fileName}`}
                        alt="img"
                        srcset=""
                        className="w-[5rem] rounded-lg"
                      />
                    </TableCell>
                    <TableCell className="font-semibold">
                      {item.ProductName}
                    </TableCell>
                    <TableCell>{item.Category}</TableCell>

                    <TableCell className="text-center">
                      {item.Quantity}
                    </TableCell>
                    <TableCell className="text-center">{item.Price}</TableCell>
                    <TableCell className="flex gap-2">
                      <Link to={`/update/${item._id}`}>
                        <Button className="border px-3 py-1 bg-blue-600 hover:bg-black">
                          Edit
                        </Button>
                      </Link>

                      <Button
                        className="border px-2 py-1 bg-red-600 hover:bg-black"
                        onClick={() => {
                          deleteItem(item._id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell className="font-bold text-base tracking-tight">
                      {item.Quantity * item.Price}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>

          <TableFooter>
            <TableRow className="">
              <TableCell colSpan={3} className="">
                Total
              </TableCell>
              <TableCell className="text-right ">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

export default List;
