import React, { useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { FaVolumeUp, FaStop } from "react-icons/fa";

interface TextToSpeechProps {
  text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  const { speak, speaking, cancel, supported, voices } = useSpeechSynthesis();

  useEffect(() => {
    return () => {
      cancel();
    };
  }, []);

  if (!supported) {
    return <span style={{ color: "#888" }}>TTS not supported.</span>;
  }

  const handleClick = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
    } else if (voices.length > 0) {
      speak({ text, voice: voices[0] });
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        background: "rgba(30, 30, 36, 0.85)",
        border: "1px solid #23232b",
        borderRadius: "1.5rem",
        padding: "0.35rem 0.7rem",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
        transition: "background 0.2s",
      }}
      title={speaking ? "Stop" : "Play"}
    >
      {speaking ? (
        <FaStop size={20} color="#ff7a7a" />
      ) : (
        <FaVolumeUp size={20} color="#7ab7ff" />
      )}
    </button>
  );
};

export default TextToSpeech;

