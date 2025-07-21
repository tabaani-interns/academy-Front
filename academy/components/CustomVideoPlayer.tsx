"use client";

import React, { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Maximize2, Play, Pause } from "lucide-react";

interface Props {
    sources: { [key: string]: string }; // { hd: "...", sd: "..." }
    poster?: string;
}

const CustomVideoPlayer: React.FC<Props> = ({ sources, poster }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [quality, setQuality] = useState("hd");
    const [speed, setSpeed] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const handleMetadata = () => setDuration(video.duration);
            video.addEventListener("loadedmetadata", handleMetadata);
            return () => video.removeEventListener("loadedmetadata", handleMetadata);
        }
    }, [quality]);

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60)
            .toString()
            .padStart(2, "0");
        const secs = Math.floor(time % 60)
            .toString()
            .padStart(2, "0");
        return `${mins}:${secs}`;
    };

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (video) setCurrentTime(video.currentTime);
    };

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = clickX / rect.width;
        const video = videoRef.current;
        if (video) {
            const newTime = duration * ratio;
            video.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleFullscreen = () => {
        const video = videoRef.current;
        if (video && video.requestFullscreen) {
            video.requestFullscreen();
        }
    };

    const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const rate = parseFloat(e.target.value);
        setSpeed(rate);
        if (videoRef.current) videoRef.current.playbackRate = rate;
    };

    const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newQuality = e.target.value;
        setQuality(newQuality);
        const video = videoRef.current;
        if (video) {
            const currentTime = video.currentTime;
            video.src = sources[newQuality];
            video.load();
            video.currentTime = currentTime;
            if (isPlaying) video.play();
        }
    };

    const progressPercent = (currentTime / duration) * 100 || 0;

    return (
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <video
                ref={videoRef}
                src={sources[quality]}
                poster={poster}
                onTimeUpdate={handleTimeUpdate}
                muted={isMuted}
                controls={false}
                className="w-full h-auto"
            />

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-center bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <div className="w-full max-w-4xl bg-black/50 rounded-full flex items-center px-4 py-2 gap-2 text-white text-xs">
                    {/* Play/Pause */}
                    <button onClick={togglePlay}  className="rounded  text-primary px-1 outline-none">
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>

                    {/* Speed */}
                    <select
                        value={speed}
                        onChange={handleSpeedChange}

                        className="  rounded bg-black text-primary px-1 outline-none"
                    >
                        <option value="0.5">0.5x</option>
                        <option value="1">1.0x</option>
                        <option value="1.5">1.5x</option>
                        <option value="2">2.0x</option>
                    </select>

                    {/* Progress Bar */}
                    <div className="relative flex-1 mx-2 cursor-pointer" onClick={handleSeek}>
                        <div className="bg-gray-700 h-4 rounded-full w-full">
                            <div
                                className="bg-yellow-400 h-4 rounded-full flex items-center justify-center text-black text-[10px] font-semibold"
                                style={{ width: `${progressPercent}%` }}
                            >
                                {duration > 0 && (
                                    <span className="px-2">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mute */}
                    <button onClick={toggleMute}  className="rounded  text-primary px-1 outline-none">
                        {isMuted ? (
                            <VolumeX size={16} className="opacity-60" />
                        ) : (
                            <Volume2 size={16} className="opacity-60" />
                        )}
                    </button>

                    {/* Quality */}
                    <select
                        value={quality}
                        onChange={handleQualityChange}
                        className="rounded bg-black text-primary px-1 outline-none"
                    >
                        {Object.keys(sources).map((q) => (
                            <option key={q} value={q} >
                                {q.toUpperCase()}
                            </option>
                        ))}
                    </select>

                    {/* Fullscreen */}
                    <button onClick={handleFullscreen}>
                        <Maximize2 size={16} className="opacity-60" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomVideoPlayer;
