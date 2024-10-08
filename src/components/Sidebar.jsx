import React from "react";
import { MdDashboard } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { FaProductHunt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="fixed left-0 top-0 w-[15%] h-full bg-white border-r">
      <div className="logo">
        <p className="text-2xl px-2 py-2 text-green-600 text-center">LOGO</p>
      </div>
      <div className="px-3 mt-4   flex flex-col ">
        <Link to={"/"}>
          <Button
            variant="link"
            className="flex items-center justify-start gap-1 border-b w-full py-3 px-2 font-semibold text-base  bg-green-500 text-white "
          >
            <MdDashboard className="text-lg" />
            <span> Dashboard</span>
          </Button>
        </Link>

        <Accordion type="single" collapsible className="">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex gap-1 items-center">
                <FaProductHunt className="text-lg" />
                <span>Products</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Link to={"/create"}>
                <span className="font-semibold px-2 hover:underline ">
                  Add items
                </span>
              </Link>
            </AccordionContent>

            <AccordionContent>
              <Link to={"/list"}>
                <span className="font-semibold px-2 hover:underline ">
                  List items
                </span>
              </Link>
            </AccordionContent>

            <AccordionContent>
              <Link>
                <span className="font-semibold px-2 hover:underline ">
                  Update items
                </span>
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default Sidebar;
