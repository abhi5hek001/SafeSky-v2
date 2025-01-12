"use client"

import backgroundImg from '@/public/background.jpg'
import introImg from '@/public/intro.jpg'
import Image from "next/image"
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLayoutEffect, useRef } from "react"
import { HiArrowLongDown } from "react-icons/hi2";

export default function IntroPage() {

    const backgroundImage = useRef(null)
    const introImage = useRef(null)

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: document.documentElement,
                start: "top",
                end: "+=500px",
                scrub: true,
                // markers: true
            }
        })

        timeline
            .fromTo(
                backgroundImage.current,
                { clipPath: "inset(15%)" },
                { clipPath: "inset(0%)", ease: "none" }
            )
            .fromTo(
                introImage.current,
                { height: "475px" },
                { height: "200px", ease: "none" },
                0
            );
    }, [])

    return (
        <div className="intro">
            <div className="flex justify-between absolute top-[85%] w-full">
                <div className="flex flex-col items-center">
                    <p className="text-white text-md font-semibold rotate-90 tracking-wide">
                        Scroll Down
                    </p>
                    <HiArrowLongDown className="relative top-10 h-5 w-5 text-white mt-4 animate-bounce" />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-white text-md font-semibold rotate-90 tracking-wide">
                        Scroll Down
                    </p>
                    <HiArrowLongDown className="relative top-10 h-5 w-5 text-white mt-4 animate-bounce" />
                </div>
            </div>
            <div ref={backgroundImage} className="backgroundImage absolute h-[160vh] w-[100%] top-0 brightness-[60%]">
                <Image
                    src={backgroundImg}
                    alt="Background Img"
                    fill={true}
                    className="object-cover"
                />
            </div>
            <div className="introContainer mt-[35vh] flex items-center justify-center">
                <div ref={introImage} data-scroll data-scroll-speed="0.3" className="introImage absolute w-[240px] h-[300px] md:w-[350px] md:h-[475px] brightness-[70%]">
                    <Image
                        src={introImg}
                        alt="Intro Image"
                        fill={true}
                        className="object-cover object-top"
                    />
                </div>
                <h1 data-scroll data-scroll-speed="0.7" className="z-30 text-white px-5 text-6xl uppercase font-bold tracking-title-spacing">Safe Sky</h1>
            </div>
        </div>
    )
}