"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import type { BIMViewerState } from "./bim-viewer"
import { Scissors, RotateCcw, Move3D } from "lucide-react"

interface SectionControlsProps {
  state: BIMViewerState
  updateState: (updates: Partial<BIMViewerState>) => void
}

export function SectionControls({ state, updateState }: SectionControlsProps) {
  const updateSectionPlane = (updates: Partial<BIMViewerState["sectionPlane"]>) => {
    console.log("Updating section plane:", updates)
    updateState({
      sectionPlane: { ...state.sectionPlane, ...updates },
    })
  }

  const handleToggle = (enabled: boolean) => {
    console.log("Section plane toggle:", enabled)
    updateSectionPlane({ enabled })
  }

  return (
    <Card className="absolute bottom-4 left-4 w-80 bg-black/80 backdrop-blur-md border-orange-500/30 text-orange-400 shadow-lg shadow-orange-500/10 pointer-events-auto">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            <h3 className="font-mono font-bold">SECTION PLANE</h3>
          </div>
          <Switch
            checked={state.sectionPlane.enabled}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-orange-600"
          />
        </div>

        {state.sectionPlane.enabled && (
          <>
            <Separator className="bg-orange-500/30" />

            {/* Quick Presets */}
            <div className="space-y-2">
              <h4 className="font-mono text-sm font-semibold flex items-center gap-2">
                <Move3D className="w-4 h-4" />
                QUICK PRESETS
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    label: "X-AXIS",
                    normal: [1, 0, 0] as [number, number, number],
                    pos: [0, 0, 0] as [number, number, number],
                  },
                  {
                    label: "Y-AXIS",
                    normal: [0, 1, 0] as [number, number, number],
                    pos: [0, 0, 0] as [number, number, number],
                  },
                  {
                    label: "Z-AXIS",
                    normal: [0, 0, 1] as [number, number, number],
                    pos: [0, 0, 0] as [number, number, number],
                  },
                ].map(({ label, normal, pos }) => (
                  <Button
                    key={label}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      console.log("Setting preset:", label, normal, pos)
                      updateSectionPlane({ normal, position: pos })
                    }}
                    className="font-mono text-xs bg-black/50 text-orange-400 border-orange-500/50 hover:bg-orange-900/20 hover:border-orange-400/70"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            <Separator className="bg-orange-500/30" />

            {/* Position Controls */}
            <div className="space-y-3">
              <h4 className="font-mono text-sm font-semibold">POSITION</h4>

              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs">X: {state.sectionPlane.position[0].toFixed(1)}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        updateSectionPlane({
                          position: [0, state.sectionPlane.position[1], state.sectionPlane.position[2]],
                        })
                      }
                      className="text-xs h-6 px-2 text-orange-400 hover:bg-orange-900/20"
                    >
                      RESET
                    </Button>
                  </div>
                  <Slider
                    value={[state.sectionPlane.position[0]]}
                    onValueChange={([x]) => {
                      console.log("X position changed:", x)
                      updateSectionPlane({
                        position: [x, state.sectionPlane.position[1], state.sectionPlane.position[2]],
                      })
                    }}
                    min={-20}
                    max={20}
                    step={0.1}
                    className="[&>span:first-child]:bg-orange-500/30 [&_[role=slider]]:bg-orange-500 [&_[role=slider]]:border-orange-400"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs">Y: {state.sectionPlane.position[1].toFixed(1)}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        updateSectionPlane({
                          position: [state.sectionPlane.position[0], 0, state.sectionPlane.position[2]],
                        })
                      }
                      className="text-xs h-6 px-2 text-orange-400 hover:bg-orange-900/20"
                    >
                      RESET
                    </Button>
                  </div>
                  <Slider
                    value={[state.sectionPlane.position[1]]}
                    onValueChange={([y]) => {
                      console.log("Y position changed:", y)
                      updateSectionPlane({
                        position: [state.sectionPlane.position[0], y, state.sectionPlane.position[2]],
                      })
                    }}
                    min={-20}
                    max={20}
                    step={0.1}
                    className="[&>span:first-child]:bg-orange-500/30 [&_[role=slider]]:bg-orange-500 [&_[role=slider]]:border-orange-400"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs">Z: {state.sectionPlane.position[2].toFixed(1)}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        updateSectionPlane({
                          position: [state.sectionPlane.position[0], state.sectionPlane.position[1], 0],
                        })
                      }
                      className="text-xs h-6 px-2 text-orange-400 hover:bg-orange-900/20"
                    >
                      RESET
                    </Button>
                  </div>
                  <Slider
                    value={[state.sectionPlane.position[2]]}
                    onValueChange={([z]) => {
                      console.log("Z position changed:", z)
                      updateSectionPlane({
                        position: [state.sectionPlane.position[0], state.sectionPlane.position[1], z],
                      })
                    }}
                    min={-20}
                    max={20}
                    step={0.1}
                    className="[&>span:first-child]:bg-orange-500/30 [&_[role=slider]]:bg-orange-500 [&_[role=slider]]:border-orange-400"
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-orange-500/30" />

            {/* Reset All Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                console.log("Resetting section plane")
                updateSectionPlane({
                  position: [0, 0, 0],
                  normal: [1, 0, 0],
                })
              }}
              className="w-full font-mono text-xs bg-black/50 text-orange-400 border-orange-500/50 hover:bg-orange-900/20 hover:border-orange-400/70"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              RESET ALL
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}
