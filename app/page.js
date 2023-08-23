'use client'
import HighScore from "@/components/HighScore"
import Keyboard from "@/components/Keyboard"
import TextGenerator from "@/components/TextGenerator"
import React, {useState} from 'react';

export default function Home() {

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center font-mono">

<h1 className="mb-16 text-3xl text-green-600">KeyBored?<span className="text-white text-xl"> Type.</span></h1>
      <TextGenerator/>
    </div>

  )
}
