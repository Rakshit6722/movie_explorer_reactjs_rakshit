import React, { useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { FaPlay, FaStop, FaVolumeUp } from "react-icons/fa";

interface TextToSpeechProps {
  text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  const { speak, speaking, cancel, supported, voices } = useSpeechSynthesis();

  useEffect(() => {
    return () => {
      cancel();
    };
    // eslint-disable-next-line
  }, []);

  if (!supported) {
    return <span style={{ color: "#888" }}>TTS not supported.</span>;
  }

  const handleSpeak = () => {
    if (voices.length > 0) {
      speak({ text, voice: voices[0] });
    }
  };

  const handleStop = () => {
    cancel();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "rgba(30, 30, 36, 0.85)",
        borderRadius: "1.5rem",
        padding: "0.25rem 0.75rem",
        boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
        width: "fit-content",
        border: "1px solid #23232b",
      }}
    >
      <FaVolumeUp size={16} color="#7ab7ff" style={{ marginRight: 4 }} />
      {!speaking ? (
        <button
          onClick={handleSpeak}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
          title="Play"
        >
          <FaPlay size={22} color="#7ab7ff" style={{ transition: "color 0.2s" }} />
        </button>
      ) : (
        <button
          onClick={handleStop}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
          title="Stop"
        >
          <FaStop size={22} color="#ff7a7a" style={{ transition: "color 0.2s" }} />
        </button>
      )}
    </div>
  );
};

export default TextToSpeech;

