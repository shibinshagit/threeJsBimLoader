"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import type { BIMViewerState, SkyPreset } from "./bim-viewer"
import {
  Eye,
  EyeOff,
  Grid3X3,
  Box,
  MousePointer,
  FileText,
  Sun,
  Sunset,
  Moon,
  Sparkles,
  Settings,
  Activity,
} from "lucide-react"

interface GamingHeaderProps {
  state: BIMViewerState
  updateState: (updates: Partial<BIMViewerState>) => void
  allSkies: SkyPreset[]
  currentSky: string
  skyTransitioning: boolean
  onSkyChange: (skyId: string) => void
  showStats: boolean
}

const SKY_ICONS = {
  day: Sun,
  evening: Sunset,
  night: Moon,
}

export function GamingHeader({
  state,
  updateState,
  allSkies,
  currentSky,
  skyTransitioning,
  onSkyChange,
  showStats,
}: GamingHeaderProps) {
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-40 pointer-events-auto">
      {/* Gaming Notch Header */}
      <div className="bg-black/90 backdrop-blur-md border-2 border-cyan-400/50 rounded-b-3xl px-8 py-4 shadow-lg shadow-cyan-400/20">
        <div className="flex items-center gap-6">
          {/* System Status */}
          <div className="flex items-center gap-4 text-cyan-400 font-mono text-sm">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="text-cyan-300 font-bold">BIM VIEWER</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Models: {state.models.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Sky: {allSkies.find((s) => s.id === currentSky)?.name || "None"}</span>
            </div>
          </div>

          <Separator orientation="vertical" className="h-8 bg-cyan-400/30" />

          {/* FPS Counter */}
          <div className="flex items-center gap-2 text-yellow-400 font-mono text-sm">
            <Activity className="w-4 h-4" />
            <div id="fps-display" className="min-w-[60px]">
              FPS: --
            </div>
          </div>

          <Separator orientation="vertical" className="h-8 bg-cyan-400/30" />

          {/* Interaction Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MousePointer className="w-4 h-4 text-green-400" />
              <Switch
                checked={state.selectionMode}
                onCheckedChange={(checked) => {
                  console.log("Selection mode changed:", checked)
                  updateState({ selectionMode: checked })
                }}
                className="data-[state=checked]:bg-green-600"
              />
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <Switch
                checked={state.blueprintMode}
                onCheckedChange={(checked) => {
                  console.log("Blueprint mode changed:", checked)
                  updateState({ blueprintMode: checked })
                }}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
            <div className="flex items-center gap-2">
              <Grid3X3 className="w-4 h-4 text-purple-400" />
              <Switch
                checked={state.showGrid}
                onCheckedChange={(checked) => {
                  console.log("Grid changed:", checked)
                  updateState({ showGrid: checked })
                }}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>
          </div>

          <Separator orientation="vertical" className="h-8 bg-cyan-400/30" />

          {/* View Mode Controls */}
          <div className="flex items-center gap-2">
            {(["solid", "wireframe", "xray"] as const).map((mode) => (
              <Button
                key={mode}
                variant={state.viewMode === mode ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  console.log("View mode changed:", mode)
                  updateState({ viewMode: mode })
                }}
                className={`font-mono text-xs h-8 ${
                  state.viewMode === mode
                    ? "bg-green-600 text-black border-green-400"
                    : "bg-black/50 text-green-400 border-green-500/50 hover:bg-green-900/20"
                }`}
              >
                {mode.toUpperCase()}
              </Button>
            ))}
          </div>

          <Separator orientation="vertical" className="h-8 bg-cyan-400/30" />

          {/* Sky Controls */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
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
                    onClick={() => {
                      console.log("Sky changed:", sky.id)
                      onSkyChange(sky.id)
                    }}
                    disabled={skyTransitioning}
                    className={`font-mono text-xs h-8 w-8 p-0 ${
                      isActive
                        ? "bg-purple-600 text-white border-purple-400"
                        : "bg-black/50 text-purple-400 border-purple-500/50 hover:bg-purple-900/20"
                    } ${skyTransitioning ? "opacity-50" : ""}`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </Button>
                )
              })}

            {/* Custom Skies */}
            {allSkies
              .filter((sky) => !["day", "evening", "night"].includes(sky.id))
              .map((sky) => {
                const isActive = currentSky === sky.id
                return (
                  <Button
                    key={sky.id}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      console.log("Custom sky changed:", sky.id)
                      onSkyChange(sky.id)
                    }}
                    disabled={skyTransitioning}
                    className={`font-mono text-xs h-8 px-2 ${
                      isActive
                        ? "bg-purple-600 text-white border-purple-400"
                        : "bg-black/50 text-purple-400 border-purple-500/50 hover:bg-purple-900/20"
                    } ${skyTransitioning ? "opacity-50" : ""}`}
                  >
                    {sky.name.slice(0, 3)}
                  </Button>
                )
              })}
          </div>

          <Separator orientation="vertical" className="h-8 bg-cyan-400/30" />

          {/* Models List */}
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-orange-400" />
            <span className="font-mono text-xs text-orange-400">
              {state.models.length > 0 ? `${state.models.length} Models` : "No Models"}
            </span>
            {state.models.length > 0 && (
              <div className="flex gap-1">
                {state.models.slice(0, 3).map((model) => (
                  <Button
                    key={model.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      console.log("Model visibility toggled:", model.id)
                      const updatedModels = state.models.map((m) =>
                        m.id === model.id ? { ...m, visible: !m.visible } : m,
                      )
                      updateState({ models: updatedModels })
                    }}
                    className="p-1 h-6 w-6 text-orange-400 hover:bg-orange-900/20"
                  >
                    {model.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  </Button>
                ))}
                {state.models.length > 3 && <span className="text-orange-400 text-xs">+{state.models.length - 3}</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
