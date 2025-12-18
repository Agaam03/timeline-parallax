"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { playlist } from "../data/playlist";

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
        console.warn("Autoplay blocked", err);
      }
    }
  };

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

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.volume = volume;

    if (isPlaying) {
      audio.play().catch((err) => console.warn("Autoplay blocked", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) audioRef.current.currentTime = time;
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value) / 100;
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  return (
    <main
      className={`relative w-58 mx-auto bg-white/90 backdrop-blur-md rounded-xl overflow-hidden text-black shadow-xl   transition-all duration-500 ${
        minimized ? "h-14" : "h-auto"
      }`}
    >
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={playNext}
        preload="metadata"
      />

      {minimized ? (
        <div className="flex items-center justify-between px-3 h-14">
          <div className="flex items-center space-x-3 overflow-hidden">
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-8 h-8 rounded-full object-cover animate-spin-slow"
              style={{ animationDuration: isPlaying ? "10s" : "0s" }}
            />
            <div className="overflow-hidden">
              <h3 className="text-[10px] font-bold truncate uppercase tracking-wider">
                {currentTrack.title}
              </h3>
              <p className="text-[9px] text-gray-500 truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={togglePlayPause}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isPlaying ? (
                <Pause size={14} fill="black" />
              ) : (
                <Play size={14} fill="black" />
              )}
            </button>
            <button
              onClick={() => setMinimized(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="relative h-40 group">
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <button
              onClick={() => setMinimized(true)}
              className="absolute top-3 right-3 p-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40 transition-colors"
            >
              <Minimize2 size={16} />
            </button>
          </div>

          <div className="p-4 bg-white">
            <div className="mb-4">
              <h2 className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">
                {currentTrack.artist}
              </h2>
              <p className="text-sm font-serif font-bold text-gray-900">
                {currentTrack.title}
              </p>
            </div>

            <div className="space-y-1 mb-4">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <button
                onClick={playPrev}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <SkipBack size={20} fill="currentColor" />
              </button>
              <button
                onClick={togglePlayPause}
                className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full hover:scale-110 transition-transform shadow-lg"
              >
                {isPlaying ? (
                  <Pause size={24} fill="white" />
                ) : (
                  <Play size={24} fill="white" className="ml-1" />
                )}
              </button>
              <button
                onClick={playNext}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <SkipForward size={20} fill="currentColor" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Volume2 size={14} className="text-gray-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={handleVolume}
                className="flex-grow h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MusicPlayer;
