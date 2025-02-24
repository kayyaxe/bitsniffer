import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="h-[25vh] flex items-center justify-center text-center px-6 bg-gradient-to-b from-gray-900 to-gray-800">
      <div>
        <motion.h1
          className="!text-7xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>Track Crypto Trends with</div>
          <div className="text-blue-400 mt-5">BitSniffer</div>
        </motion.h1>
        <motion.p
          className="mt-7 text-2xl font-semibold text-gray-300 transition duration-500 hover:text-blue-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="decoration-2">Stay ahead of the market</span> with
          real-time data and curated news.
        </motion.p>
        <div className="mt-6 flex gap-4 justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
}
