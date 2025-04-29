import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMood } from '../../../redux/slices/moodSlice';

const moodColors: any = {
    happy: '#FFD700',
    sad: '#1E90FF',
    angry: '#FF4500',
    excited: '#FFA500',
    bored: '#808080',
}

function MoodToolbar() {
  const dispatch = useDispatch();
  const moodList = useSelector((state: any) => state.mood.moodList);
  const selectedMood = useSelector((state: any) => state.mood.selectedMood);


  return (
    <div className="flex font-anton tracking-wide space-x-4 overflow-x-auto scrollbar-hide py-2 ">
      {moodList.map((mood: string) => (
        <button
          key={mood}
          onClick={() => dispatch(setMood(mood))}
          style={selectedMood === mood ? { backgroundColor: moodColors[mood] } : {}}
          className={`px-4 tracking-wider py-2 rounded-full text-lg font-medium transition-all duration-300
          ${selectedMood === mood
              ? 'text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'}
        `}
        >
          {mood}
        </button>
      ))}
    </div>
  );
}

export default MoodToolbar;