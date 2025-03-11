"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showNote, setShowNote] = useState(false);
  const [sunflowerPositions, setSunflowerPositions] = useState<
    { id: number; left: number }[]
  >([]);

  useEffect(() => {
    setSunflowerPositions(
      Array.from({ length: 20 }, (_, index) => ({
        id: index + Math.random(), // Unique ID
        left: Math.random() * 100, // Random left position
      }))
    );
  }, []);

  useEffect(() => {
    if (showNote && audioRef.current) {
      const playAudio = async () => {
        try {
          await audioRef.current?.play();
        } catch (error) {
          console.log("Autoplay prevented by browser:", error);
        }
      };
      playAudio();
    }
  }, [showNote]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 relative bg-cover bg-center"
      style={{
        backgroundImage: "url('/2.jpg')",
      }}
    >
      {/* Falling Sunflowers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sunflowerPositions.map(({ id, left }) => (
          <motion.div
            key={id}
            className="absolute w-14 h-14"
            style={{ top: "-5%", left: `${left}%` }}
            animate={{ y: ["0%", "100%"], opacity: [1, 1, 0] }}
            transition={{
              duration: Math.random() * 4 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          >
            <Image
              src="/sunflower.png"
              alt="Falling Sunflower"
              width={56}
              height={56}
            />
          </motion.div>
        ))}
      </div>

      {/* Birthday Message */}
      {!showNote && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-black">
            🎉 Happy Birthday! 🎂
          </h1>
          <h1 className="text-4xl mt-2 font-bold text-pink-400 font-[cursive]">
            Gaayuuu...
          </h1>
          <p className="text-sm text-black mt-2">
            Click below to open your surprise and scroll down!
          </p>
          <motion.button
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowNote(true)}
          >
            Click to open 🎁
          </motion.button>
        </motion.div>
      )}

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/Sunflower.mp3"
        loop
        className="hidden"
        onCanPlay={() => console.log("Audio loaded and ready to play")}
      ></audio>

      {/* Birthday Note */}

      {showNote && (
        <motion.div
          className="p-6 rounded-lg shadow-lg max-w-lg text-center relative bg-white/30 backdrop-blur-md overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Content with Scrollable Text */}
          <div className="relative z-10 p-4 overflow-y-auto max-h-110">
            {/* Image Inside the Note */}
            <div className="flex justify-center">
              <Image
                src="/Us.JPG"
                alt="Memorable Moment"
                width={200}
                height={200}
                className="rounded-lg shadow-lg mb-4"
              />
            </div>

            {/* Birthday Message */}
            <h2 className="text-4xl mt-2 font-bold text-pink-400 font-[cursive]">
              Dear Gaayuuu..,
            </h2>
            <p className="mt-4 text-gray-700 text-left">
              <span className="text-center text-bold">
                &quot;Happiest Birthday to the Brightest Sunflower!&quot; 🌻
              </span>
              <br /> Just like a sunflower turns towards the sun, you’ve been
              the light that guided me through my darkest days. Through every
              smile we’ve shared, every text we&apos;ve exchanged, every gossip
              we&apos;ve whispered, every secret we&apos;ve kept, every place
              we’ve explored, and every meal we’ve enjoyed, you’ve filled our
              bond with warmth and color. Even our silly fights, those little
              storms, have only made our bond stronger (I feel), also am so glad
              that you corrected me at places, where am lacking and showed me
              who I&apos;m actually. You were there when my world felt cold and
              empty(At times me being jobless, lonely, and visa rejection),
              reminding me that brighter days would come.{" "}
              <span className="text-green-600">
                You are one of the strongest persons I&apos;ve met in my life,
              </span>
              <br />
              On your special day, I just want you to know how deeply grateful I
              am for you, for your love, your presence, and the memories we’ve
              created together. I don&apos;t know how you are feeling about me
              right now, but I really love you ❤️, for the way you&apos;re with
              me, especially in the initial days, and I miss them more, I miss
              those cute chats, those lovely excitement and I wish we can be
              like that, all I can do is hope for the best for both of us.
              There are times where I dissapointed you, but I hope you know my
              intentions behind them, and I hope you understand me and forgive me
              for that. <br /> I really wish you to be happy and joyful always,
              and I&apos;ll be there for you whenever you need me.
              I hope you have a wonderful day filled with love, laughter, and
              everything you’ve ever wished for.
              May your life continue to bloom with happiness, love, and success,
              just like a sunflower basking in endless sunshine. <p className="text-pink-500">Happy
              Birthday! Keep shining, little sunflower.” 🌻😍🫂</p> <br />
              <span>With lots of ❤️, </span> <br />
              <span className="text-4xl mt-2 font-bold text-pink-400 font-[cursive]">Rishiii,</span>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
