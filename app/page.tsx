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
              src="/kaaruthunnaLove.png"
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
            Killer ❣️❣️❣️
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
                src="/Killer.jpg"
                alt="Memorable Moment"
                width={200}
                height={200}
                className="rounded-lg shadow-lg mb-4"
              />
            </div>

            {/* Birthday Message */}
            <h2 className="text-4xl mt-2 font-bold text-pink-400 font-[cursive]">
              {" "}
              Dear Killer❣️❣️❣️..,{" "}
            </h2>
            <p className="mt-4 text-gray-700 text-left">
              {" "}
              <span className="text-center text-bold">
                {" "}
                &ldquo;Happiest Birthday to the Most Incredible Soul!&rdquo;
                ✨💖{" "}
              </span>{" "}
              <br /> Life has its way of testing bonds, and though we’ve had our
              share of misunderstandings, I’m so grateful that we found our way
              back to a beautiful friendship. Through every laugh we’ve shared,
              every deep conversation, every moment of silence, and even the
              rough patches, you’ve been someone truly special in my life
              Killer❣️❣️❣️. I can’t thank you enough for understanding me, for
              seeing beyond my flaws, and for not judging me by my past. I know
              I may have hurt you at times (Akhila vishyam lo especially), and
              while I truly wish I never do again, I can’t promise to stop
              annoying you or irritating you (because let’s be honest, it’s part
              of the fun, just like Killer used to do! 😂). On your special day,
              I just want to remind you how amazing you are.{" "}
              <span className="text-green-600">
                You deserve all the happiness, success, and love in the world,
              </span>{" "}
              and I’ll always be here cheering you on, no matter what. Let’s
              keep making beautiful memories together! Wishing you a birthday as
              wonderful as you are. May your year be filled with joy, love, and
              all the beautiful things your heart desires. ✨🎉 <br />
              <span>
                Killer, I don&apos;t know, what&apos;s gonna happen in future,
                though we may be together or not in this friendship, you remains
                the best person and a great memory in my life! Trust me in this
                Killer❣️, Am sorry ra.
              </span>
              <span className="text-pink-500">
                {" "}
                Happy Birthday Killer❣️❣️❣️ Keep shining, you beautiful soul.
                💫🥰🫂 <br />
                <span>With lots of ❤️, </span> <br />
                <span className="text-4xl mt-2 font-bold text-pink-400 font-[cursive]">
                  Rishiii,
                </span>
              </span>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
