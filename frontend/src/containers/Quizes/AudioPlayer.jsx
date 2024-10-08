import React, { useContext, useEffect, useState } from 'react';

const AudioPlayer = () => {
  const { audioData } = useContext(AudioContext);
  const [audioUrl, setAudioUrl] = useState('');

  // Convert base64 to ArrayBuffer
  const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  // Convert base64 string to Blob and create an object URL
  const createAudioUrl = (base64) => {
    const arrayBuffer = base64ToArrayBuffer(base64);
    const blob = new Blob([arrayBuffer], { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
  };

  // Trigger audio URL creation when the component mounts
  useEffect(() => {
    if (audioData) {
      createAudioUrl(audioData);
      
    }
  }, [audioData]);

  return (
    <div>
      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default AudioPlayer;