"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { SkyPreset } from "./bim-viewer"
import { Sun, Sunset, Moon, Plus, Sparkles } from "lucide-react"

interface SkyControlsProps {
  allSkies: SkyPreset[]
  currentSky: string
  skyTransitioning: boolean
  onSkyChange: (skyId: string) => void
}

const SKY_ICONS = {
  day: Sun,
  evening: Sunset,
  night: Moon,
}

export function SkyControls({ allSkies, currentSky, skyTransitioning, onSkyChange }: SkyControlsProps) {
  return (
    <Card className="absolute top-4 right-4 w-72 bg-black/80 backdrop-blur-md border-purple-500/30 text-purple-400 shadow-lg shadow-purple-500/10">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="font-mono font-bold">SKY CONTROL</h3>
        </div>

        <Separator className="bg-purple-500/30" />

        {/* Default Skies */}
        <div className="space-y-3">
          <h4 className="font-mono text-sm font-semibold">TIME OF DAY</h4>

          <div className="grid grid-cols-3 gap-2">
            {allSkies
              .filter((sky) => ["day", "evening", "night"].includes(sky.id))
              .map((sky) => {
                const IconComponent = SKY_ICONS[sky.id as keyof typeof SKY_ICONS] || Sun
                const isActive = currentSky === sky.id

                return (
                  <Button
                    key={sky.id}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => onSkyChange(sky.id)}
                    disabled={skyTransitioning}
                    className={`font-mono text-xs h-12 flex flex-col gap-1 ${
                      isActive
                        ? "bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-500/30"
                        : "bg-black/50 text-purple-400 border-purple-500/50 hover:bg-purple-900/20 hover:border-purple-400/70"
                    } ${skyTransitioning ? "opacity-50" : ""}`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{sky.name}</span>
                  </Button>
                )
              })}
          </div>
        </div>

        {/* Custom Skies */}
        {allSkies.filter((sky) => !["day", "evening", "night"].includes(sky.id)).length > 0 && (
          <>
            <Separator className="bg-purple-500/30" />

            <div className="space-y-3">
              <h4 className="font-mono text-sm font-semibold">CUSTOM SKIES</h4>

              <div className="space-y-2 max-h-32 overflow-y-auto">
                {allSkies
                  .filter((sky) => !["day", "evening", "night"].includes(sky.id))
                  .map((sky) => {
                    const isActive = currentSky === sky.id

                    return (
                      <Button
                        key={sky.id}
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        onClick={() => onSkyChange(sky.id)}
                        disabled={skyTransitioning}
                        className={`w-full font-mono text-xs justify-start ${
                          isActive
                            ? "bg-purple-600 text-white border-purple-400"
                            : "bg-black/50 text-purple-400 border-purple-500/50 hover:bg-purple-900/20"
                        } ${skyTransitioning ? "opacity-50" : ""}`}
                      >
                        <Sparkles className="w-3 h-3 mr-2" />
                        {sky.name}
                      </Button>
                    )
                  })}
              </div>
            </div>
          </>
        )}

        <Separator className="bg-purple-500/30" />

        {/* Add Custom Sky */}
        <div className="text-center">
          <label className="cursor-pointer">
            <Button
              variant="outline"
              size="sm"
              className="w-full font-mono text-xs bg-black/50 text-purple-400 border-purple-500/50 hover:bg-purple-900/20 border-dashed"
              disabled={skyTransitioning}
            >
              <Plus className="w-4 h-4 mr-2" />
              ADD CUSTOM SKY
            </Button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  // Create custom event to trigger parent handler
                  const files = Array.from(e.target.files)
                  // Trigger the same handler as the main file drop
                  const customEvent = new CustomEvent("filesDropped", {
                    detail: { files },
                  })
                  document.dispatchEvent(customEvent)
                }
              }}
            />
          </label>
        </div>

        {/* Current Sky Info */}
        <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-500/20">
          <div className="font-mono text-xs space-y-1">
            <div className="flex justify-between">
              <span>Current:</span>
              <span className="text-white">{allSkies.find((s) => s.id === currentSky)?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Light:</span>
              <span className="text-white">
                {(allSkies.find((s) => s.id === currentSky)?.lightIntensity || 1).toFixed(1)}x
              </span>
            </div>
            <div className="flex justify-between">
              <span>Ambient:</span>
              <span className="text-white">
                {(allSkies.find((s) => s.id === currentSky)?.ambientIntensity || 0.5).toFixed(1)}x
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
