// "use client";
import ContactForm from "./ContactForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Instagram, Dot } from "lucide-react";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <div className=" flex flex-col gap-2 sm:gap-3 md:gap-4 w-full max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto px-3 py-4 border rounded-2xl p-4">
        {/* name */}
        <div className="flex items-center justify-center gap-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">tranvu</h1>
          <Dot className="w-6 h-6 animate-bounce text-green-400 translate-y-[0.3em] md:translate-y-[0.6em]" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">dev</h1>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-center text-neutral-500">
          hi i&apos;m tranvu — an indie dev who keeps it minimal.
        </p>

        <Link
          href="https://x.com/tranvu_dev?s=21"
          target="_blank"
          className=" w-full justify-center"
        >
          <Button className="w-full flex gap-2 items-center border text-sm font-semibold p-2 pl-8 pr-8 cursor-pointer ">
            <Twitter width={16} height={16} />
            <div className="w-full">Twitter</div>
          </Button>
        </Link>

        <Link
          href="https://www.facebook.com/teddievux/"
          target="_blank"
          className=" w-full justify-center"
        >
          <Button className="w-full flex gap-2 items-center border text-sm font-semibold p-2 pl-8 pr-8 cursor-pointer">
            <Facebook width={16} height={16} />
            <div className="w-full">Facebook</div>
          </Button>
        </Link>

        <Link
          href="https://www.instagram.com/dev__ted/"
          target="_blank"
          className=" w-full justify-center"
        >
          <Button className="w-full flex gap-2 items-center border text-sm font-semibold p-2 pl-8 pr-8 cursor-pointer">
            <Instagram width={16} height={16} />
            <div className="w-full">Instagram</div>
          </Button>
        </Link>
      </div>
      <ContactForm />
    </div>
  );
}
