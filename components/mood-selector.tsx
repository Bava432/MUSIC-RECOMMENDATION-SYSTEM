"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Music, Smile, Frown, Zap, Coffee, Brain } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MoodType } from "@/lib/types"
import { moods } from "@/lib/data"

interface MoodSelectorProps {
  onMoodSelect: (mood: MoodType) => void
  selectedMood: MoodType | null
}

export default function MoodSelector({ onMoodSelect, selectedMood }: MoodSelectorProps) {
  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "happy":
        return <Smile className="h-6 w-6" />
      case "sad":
        return <Frown className="h-6 w-6" />
      case "energetic":
        return <Zap className="h-6 w-6" />
      case "relaxed":
        return <Coffee className="h-6 w-6" />
      case "focused":
        return <Brain className="h-6 w-6" />
      default:
        return <Music className="h-6 w-6" />
    }
  }
  
  return (
    <div className="grid grid-cols-2 gap-3">
      {moods.map((mood) => (
        <motion.div
          key={mood.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "aspect-square flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-200",
            selectedMood?.id === mood.id
              ? "ring-2 ring-offset-2 ring-offset-slate-900"
              : "bg-slate-800/50 hover:bg-slate-700/50",
          )}
          style={{
            backgroundColor: selectedMood?.id === mood.id ? mood.bgColor : "",
            boxShadow: selectedMood?.id === mood.id ? `0 0 20px ${mood.bgColor}33` : "",
          }}
          onClick={() => onMoodSelect(mood)}
        >
          <div className="p-3 rounded-full bg-white/10 mb-3">{getMoodIcon(mood.id)}</div>
          <span className="font-medium text-center">{mood.name}</span>
          {selectedMood?.id === mood.id && (
            <p className="text-xs text-center mt-2 text-white/70">{mood.description}</p>
          )}
        </motion.div>
      ))}
    </div>
  )
}

