import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMood } from '../../../redux/slices/moodSlice';
import { moodColors } from '../../../constants/mood';


function MoodToolbar() {
  const dispatch = useDispatch();
  const moodList = useSelector((state: any) => state.mood.moodList);
  const selectedMood = useSelector((state: any) => state.mood.selectedMood);

  function hexToRgb(hex: string): string {
    hex = hex.replace('#', '');
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  }  

  return (
    <div className="flex items-center font-anton tracking-wide space-x-3 overflow-x-auto scrollbar-hide py-1 ">
      {moodList.map((mood: string) => (
        <button
          key={mood}
          onClick={() => dispatch(setMood(mood))}
          style={selectedMood === mood ? { 
            backgroundColor: moodColors[mood],
            boxShadow: `0 4px 12px rgba(${hexToRgb(moodColors[mood])}, 0.5)`
          } : {}}
          className={`
            px-5 tracking-wider py-1.5 rounded-full text-base font-medium 
            transition-all duration-300 shadow-sm hover:shadow-md
            ${selectedMood === mood
              ? 'text-white transform scale-105'
              : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white'}
          `}
        >
          {mood.charAt(0).toUpperCase() + mood.slice(1)}
        </button>
      ))}
    </div>
  );
}


export default MoodToolbar;