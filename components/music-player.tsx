"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import type { MoodType, Song } from "@/lib/types"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface MusicPlayerProps {
  mood: MoodType
  initialSongs: Song[]
}

export default function MusicPlayer({ mood, initialSongs }: MusicPlayerProps) {
  const [songs, setSongs] = useState<Song[]>(initialSongs)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setSongs(initialSongs)
    setCurrentSongIndex(0)
    setIsPlaying(false)
    setProgress(0)

    // Reset audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [initialSongs])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Error playing audio:", error)
            setIsPlaying(false)
          })
        }
        startProgressTimer()
      } else {
        audioRef.current.pause()
        stopProgressTimer()
      }
    }

    return () => {
      stopProgressTimer()
    }
  }, [isPlaying, currentSongIndex])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const startProgressTimer = () => {
    stopProgressTimer()
    intervalRef.current = setInterval(() => {
      if (audioRef.current) {
        setProgress(audioRef.current.currentTime)
        setDuration(audioRef.current.duration || 0)
      }
    }, 1000)
  }

  const stopProgressTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1))
    setIsPlaying(true)
  }

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1))
    setIsPlaying(true)
  }

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setProgress(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const currentSong = songs[currentSongIndex]

  return (
    <div className="w-full rounded-xl p-6 backdrop-blur-lg" style={{ backgroundColor: `${mood.bgColor}33` }}>
      {currentSong?.audioUrl && (
        <audio
          ref={audioRef}
          src={currentSong.audioUrl}
          onEnded={handleNext}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              setDuration(audioRef.current.duration)
            }
          }}
        />
      )}

      {currentSong && (
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={currentSong.coverUrl || "/placeholder.svg?height=400&width=400"}
              alt={currentSong.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">{currentSong.title}</h2>
              <p className="text-white/80">{currentSong.artist}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Slider
                  value={[progress]}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={handleProgressChange}
                  className="flex-1"
                />
              </div>
              <div className="flex justify-between text-sm text-white/70">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={handlePrevious} className="text-white">
                  <SkipBack className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handlePlayPause} className="text-white">
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={handleNext} className="text-white">
                  <SkipForward className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white">
                  {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="w-24"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

