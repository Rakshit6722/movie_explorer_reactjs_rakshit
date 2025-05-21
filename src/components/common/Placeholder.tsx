import React, { Component } from 'react';
import { motion } from 'framer-motion';
import VideocamIcon from '@mui/icons-material/Videocam';

export class Placeholder extends Component {
  render() {
    return (
      <motion.div
        initial={{  scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center h-[40vh] text-center opacity-30"
      >
        <div className="mb-5 p-6 bg-[#e23145]/5 rounded-full">
          <VideocamIcon sx={{ fontSize: 64, color: '#e23145' }} />
        </div>
        <div>
          <h2 className="text-2xl font-medium mb-3">Discover Your Next Favorite Movie</h2>
          <p className="text-gray-400 max-w-lg">
            Enter a title or any keyword to begin your cinematic journey
          </p>
        </div>
      </motion.div>
    );
  }
}

export default Placeholder;
