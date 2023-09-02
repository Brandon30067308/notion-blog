"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function NewsletterSuccess({ hidden }: { hidden: boolean }) {
  return (
    <AnimatePresence initial={true} onExitComplete={() => null}>
      {!hidden && (
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.5,
                type: "spring",
                bounce: 0,
                delay: 0.0,
              },
            },
          }}
          initial="hidden"
          exit="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="fixed left-1/2 -translate-x-1/2 bottom-6 sm:bottom-10 w-[90%] max-w-max px-10 md:px-32 py-10 sm:py-20 rounded-[22px] shadow-lg bg-white flex justify-center items-center text-center"
        >
          <div className="w-full max-w-[515px] mx-auto text-gray-500 text-base">
            <span className="font-medium">Thanks for subscribing!</span> Upon
            verifying your email address, you’ll receive our newsletter every 2
            weeks.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
