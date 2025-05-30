"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState, Suspense, useRef } from "react";
import Bomb from "./components/c4";
import Loader from "./components/Loader";
import { gsap } from "gsap"

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(17 * 60 * 60); // 17 hours in seconds
  const textRef = useRef<HTMLParagraphElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])

  const formatTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (wordsRef.current.length > 0) {
      // Set initial state
      gsap.set(wordsRef.current, {
        opacity: 0,
        y: 50,
        rotationX: -90,
        transformOrigin: "center bottom",
      })

      // Create explosion-like animation
      const tl = gsap.timeline()

      tl.to(wordsRef.current, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: {
          amount: 0.6,
          from: "center",
        },
      })
        .to(
          wordsRef.current,
          {
            scale: 1.1,
            duration: 0.2,
            ease: "power2.out",
            stagger: {
              amount: 0.1,
              from: "center",
            },
          },
          "-=0.3",
        )
        .to(
          wordsRef.current,
          {
            scale: 1,
            duration: 0.3,
            ease: "elastic.out(1, 0.3)",
            stagger: {
              amount: 0.1,
              from: "center",
            },
          },
          "-=0.1",
        )
    }
  }, [])

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <p className="text-gray-400 text-lg md:text-xl font-light tracking-wide">
        Ticking time bomb
      </p>
      {/*Bomb component */}
      <div className="w-full h-96 mb-8">
        <Canvas camera={{ position: [0, 0, 13], fov: 50 }}>
          <ambientLight intensity={1.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight
            position={[-10, -10, -5]}
            intensity={0.3}
            color="#ff0000"
          />
          {/* <Bomb  timerText={formatTime(timeLeft)} /> */}
          <Suspense fallback={<Loader />}>
            <Bomb timerText={formatTime(timeLeft)}/>
          </Suspense>
          <OrbitControls
            makeDefault
            enableZoom={true}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={-Math.PI / 2}
            enableRotate={true}
          />
        </Canvas>
      </div>


      {/* Text below bomb */}
      <p className="text-gray-400 text-lg md:text-xl font-light tracking-wide">
        They are begging me to detonate it
      </p>
    </main>
  );
}


