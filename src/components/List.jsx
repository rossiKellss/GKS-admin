import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
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

import {
  Pagination,
  PaginationContent,
 
  PaginationItem,
  
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

function List() {
  const [data, setData] = useState();
  const [searchCred, setSearchCred] = useState();
  const [pagination,setPagination]=useState({
    start:0,
    page:1,
    end:5
  })
  const search = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/vegetables?q=${searchCred}`
      );
      setData(res.data);
    } catch (err) {
      console.err(err.message);
    }
  };
  const handlePaginationNext=()=>{
    console.log("pagination btn triggered");
    const{page,end}=pagination;
   
    
    setPagination({
      start:end,
      page:page+1,
      end:end+5

    })

  }

  
  console.log(pagination);
  const handlePaginationPrevious=()=>{
    const{start,page}=pagination;
   
    
    setPagination({
      start:start-5,
      page:page-1,
      end:start

    })


  }

  useEffect(() => {
    getData();
  }, [pagination]);


  const getData = async () => {
    try {
      const res = await axios(
        `http://localhost:4000/api/products`
      );
      setData(res.data);
    } catch (err) {
      console.error(err.message);
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
            variant=""
            className="bg-green-500"
            onClick={() => {
              search();
            }}
          >
            Search
          </Button>
          <Button variant="" className="bg-red-500">
            Reset
          </Button>
          <div className=" ">
            <Button>
              <DropdownMenu className="">
                <DropdownMenuTrigger className="flex items-center gap-2 text-white ">
                  <span>Filter</span>
                  <IoIosArrowDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2">
                  <DropdownMenuItem>Filter by name</DropdownMenuItem>
                  <DropdownMenuItem>Filter by date</DropdownMenuItem>
                  <DropdownMenuItem>Filter by quantity</DropdownMenuItem>
                  <DropdownMenuItem>Filter by price</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Button>
          </div>
        </div>

        <Table className="border">
          <TableCaption>Product Lists</TableCaption>
          <TableHeader className="">
            <TableRow className="bg-gray-400 ">
              <TableHead className="text-black">Id</TableHead>
              <TableHead className="text-black">Name</TableHead>
              <TableHead className="text-black">Category</TableHead>
              <TableHead className="text-black">Image</TableHead>
              <TableHead className="text-center text-black">
                Quantity {"(in kg)"}
              </TableHead>

              <TableHead className="text-center text-black">
                Amount {"(per kg)"}
              </TableHead>
              <TableHead className="text-black ">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>"img"</TableCell>
                  <TableCell className="text-center">
                    {item.quantityInStock}
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {item.pricePerKg}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Link to={`/update/${item.id}`}>
                    <button className="border px-2 py-1" >Update</button>
                    </Link>
                    
                    <button className="border px-2 py-1">Delete</button>
                  </TableCell>
                </TableRow>
              );
            })}
           
             
          </TableBody>
          <div className="w-full">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious onClick={()=>{handlePaginationPrevious()}} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext onClick={()=>{handlePaginationNext()}} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          
           
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
