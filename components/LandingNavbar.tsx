'use client'
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const font = Montserrat({
    weight: "600",
    subsets: ['latin']
})

const LandingNavbar = () => {

    const { isSignedIn } = useAuth();

  return (
    <div>
      
    </div>
  )
}

export default LandingNavbar
