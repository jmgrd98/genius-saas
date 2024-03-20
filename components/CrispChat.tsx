'use client'

import { useEffect } from "react"
import { Crisp } from 'crisp-sdk-web';

const CrispChat = () => {

    useEffect(() => {
        Crisp.configure("d8d772c1-5177-40ba-9a6c-e219673c6be6");
    }, [])


  return null;
}

export default CrispChat
