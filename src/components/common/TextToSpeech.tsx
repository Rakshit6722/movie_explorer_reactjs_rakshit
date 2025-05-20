// import { useSpeech } from "react-text-to-speech";

// export default function TextToSpeech({text}: {text: string}) {
//   const {
//     Text, // Component that renders the processed text
//     speechStatus, // Current speech status
//     isInQueue, // Indicates whether the speech is currently playing or waiting in the queue
//     start, // Starts or queues the speech
//     pause, // Pauses the speech
//     stop, // Stops or removes the speech from the queue
//   } = useSpeech({ text: text });

//   return (
//     <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
//       <Text />
//       <div style={{ display: "flex", columnGap: "0.5rem" }}>
//         {speechStatus !== "started" ? <button onClick={start}>Start</button> : <button onClick={pause}>Pause</button>}
//         <button onClick={stop}>Stop</button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

interface TextToSpeechProps {
  text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  const { speak, speaking, cancel, supported, voices } = useSpeechSynthesis();
  const [isPaused, setIsPaused] = useState(false);

  if (!supported) {
    return <span>Your browser does not support text to speech.</span>;
  }

  const handleSpeak = () => {
    speak({ text, voice: voices[0] });
    setIsPaused(false);
  };


  const handleStop = () => {
    cancel();
    setIsPaused(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      <div style={{ fontSize: "1rem", color: "#ccc" }}>{text}</div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {!speaking && (
          <button onClick={handleSpeak}>Start</button>
        ) }
        <button onClick={handleStop} disabled={!speaking && !isPaused}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;

