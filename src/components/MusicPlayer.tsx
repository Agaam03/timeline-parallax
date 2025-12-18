"use client";
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { TbMinimize } from "react-icons/tb";
import { IoPlayBack } from "react-icons/io5";
import Lottie from "lottie-react";
import ArrowDown from "@/../public/assets/Arrow Down.json";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { VolumeDownRounded, VolumeUpRounded } from "@mui/icons-material";
import { playlist } from "@/data/playlist";

interface MusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: (value: boolean) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying,
  onTogglePlay,
}) => {
  const [minimized, setMinimized] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = playlist[currentTrackIndex];

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // 🔊 Toggle play/pause
  const togglePlayPause = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      onTogglePlay(false);
    } else {
      try {
        await audioRef.current.play();
        onTogglePlay(true);
      } catch (err) {
        console.warn("Autoplay blocked ❌", err);
      }
    }
  };

  // Next & Previous Track
  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    onTogglePlay(true);
  };

  const playPrev = () => {
    setCurrentTrackIndex((prev) =>
      prev === 0 ? playlist.length - 1 : prev - 1
    );
    onTogglePlay(true);
  };

  // Update progress bar
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const setMeta = () => setDuration(audio.duration);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setMeta);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setMeta);
    };
  }, []);

  // Handle play/pause dari parent (isPlaying)
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.volume = volume;

    if (isPlaying) {
      audio
        .play()
        .then(() => console.log("🎵 Music playing"))
        .catch((err) => console.warn("Autoplay blocked ❌", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Volume slider
  const handleVolumeChange = (_: unknown, value: number | number[]) => {
    const newVolume = Array.isArray(value) ? value[0] : value;
    setVolume(newVolume / 100);
    if (audioRef.current) audioRef.current.volume = newVolume / 100;
  };

  // Progress (seek)
  const handleSeekChange = (_: unknown, value: number | number[]) => {
    setCurrentTime(Array.isArray(value) ? value[0] : value);
  };

  const handleSeekCommit = (_: unknown, value: number | number[]) => {
    if (!audioRef.current) return;
    const newTime = Array.isArray(value) ? value[0] : value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Auto play saat ganti lagu
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    if (isPlaying) {
      audio.play().catch((err) => console.warn("Autoplay blocked ❌", err));
    }
  }, [currentTrackIndex, isPlaying]);

  return (
    <main className="relative w-56 mx-auto bg-gray-100 rounded-sm   overflow-hidden text-black">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={playNext}
        preload="metadata"
      />

      {minimized ? (
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center space-x-2">
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-xs font-medium truncate w-[80px]">
                {currentTrack.title}
              </h3>
              <p className="text-xs text-black">{currentTrack.artist}</p>
            </div>
          </div>
          <button onClick={() => setMinimized(false)} className="-ml-2">
            <Lottie
              animationData={ArrowDown}
              loop
              style={{
                width: 36,
                height: 36,
                cursor: "pointer",
                filter: "invert(0) brightness(0)", // jadi hitam
              }}
            />
          </button>
        </div>
      ) : (
        <>
          <div className="relative h-40">
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="p-3">
            <h2 className="text-xs text-gray-900">{currentTrack.artist}</h2>
            <p className="text-sm font-medium">{currentTrack.title}</p>
          </div>

          <div className="px-3">
            <Slider
              value={currentTime}
              min={0}
              step={1}
              max={duration || 0}
              onChange={handleSeekChange}
              onChangeCommitted={handleSeekCommit}
              sx={{
                color: "#fff",
                "& .MuiSlider-thumb": { width: 12, height: 12 },
              }}
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-5 py-2">
            <button onClick={playPrev}>
              <IoPlayBack className="text-black text-xl" />
            </button>
            <button
              onClick={togglePlayPause}
              className="p-2 bg-gray-400 rounded-full"
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button onClick={playNext}>
              <IoPlayBack className="text-black text-xl transform scale-x-[-1]" />
            </button>
          </div>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ px: 2, mb: 2 }}
          >
            <VolumeDownRounded />
            <Slider
              value={volume * 100}
              onChange={handleVolumeChange}
              aria-label="Volume"
              sx={{
                color: "#fff",
                "& .MuiSlider-thumb": { width: 14, height: 14 },
              }}
            />
            <VolumeUpRounded />
          </Stack>

          <button
            onClick={() => setMinimized(true)}
            className="absolute top-2 right-2 text-white hover:text-white cursor-pointer bg-black/45 p-[2px] rounded-md"
          >
            <TbMinimize size={20} />
          </button>
        </>
      )}
    </main>
  );
};

export default MusicPlayer;
