"use client"

import { useState } from "react"
import { moods, getSongsByEnergy, getSongsByTempo } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Music, Zap } from "lucide-react"
import type { Song } from "@/lib/types"

interface MoodFeaturesProps {
  onSongSelect: (songs: Song[]) => void
}

export default function MoodFeatures({ onSongSelect }: MoodFeaturesProps) {
  const [energyRange, setEnergyRange] = useState([50])
  const [selectedTempo, setSelectedTempo] = useState<"slow" | "medium" | "fast" | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<"energy" | "tempo" | null>(null)

  const handleEnergyChange = (values: number[]) => {
    setEnergyRange(values)
    setSelectedFilter("energy")
    const energySongs = getSongsByEnergy(values[0] - 20, values[0] + 20)
    onSongSelect(energySongs)
  }

  const handleTempoSelect = (tempo: "slow" | "medium" | "fast") => {
    setSelectedTempo(tempo)
    setSelectedFilter("tempo")
    const tempoSongs = getSongsByTempo(tempo)
    onSongSelect(tempoSongs)
  }

  return (
    <div className="space-y-6 p-6 bg-slate-800/50 rounded-xl">
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Energy Level
        </h3>
        <div className="mb-2">
          <Slider
            value={energyRange}
            onValueChange={handleEnergyChange}
            max={100}
            step={5}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-sm text-slate-400">
          <span>Calm</span>
          <span>Current: {energyRange[0]}%</span>
          <span>Energetic</span>
        </div>
        {selectedFilter === "energy" && (
          <p className="mt-2 text-sm text-slate-300">
            Showing songs with energy level between {energyRange[0] - 20}% and {energyRange[0] + 20}%
          </p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Music className="h-5 w-5" />
          Tempo
        </h3>
        <div className="flex gap-2">
          {(["slow", "medium", "fast"] as const).map((tempo) => (
            <Button
              key={tempo}
              variant={selectedTempo === tempo ? "default" : "outline"}
              onClick={() => handleTempoSelect(tempo)}
              className="flex-1"
            >
              {tempo.charAt(0).toUpperCase() + tempo.slice(1)}
            </Button>
          ))}
        </div>
        {selectedFilter === "tempo" && selectedTempo && (
          <p className="mt-2 text-sm text-slate-300">
            Showing {selectedTempo} tempo songs
          </p>
        )}
      </div>

      {selectedFilter && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setSelectedFilter(null)
            setSelectedTempo(null)
            onSongSelect([])
          }}
        >
          Clear Filters
        </Button>
      )}
    </div>
  )
} 