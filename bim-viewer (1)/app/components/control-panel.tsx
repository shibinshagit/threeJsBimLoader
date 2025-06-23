"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import type { BIMViewerState } from "./bim-viewer"
import { Eye, EyeOff, Grid3X3, Box, Layers, Settings, MousePointer, Hand, FileText } from "lucide-react"

interface ControlPanelProps {
  state: BIMViewerState
  updateState: (updates: Partial<BIMViewerState>) => void
}

export function ControlPanel({ state, updateState }: ControlPanelProps) {
  return (
    <Card className="absolute top-4 left-4 w-80 bg-black/70 backdrop-blur-md border-green-500/30 text-green-400 shadow-lg shadow-green-500/10 pointer-events-auto">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          <h3 className="font-mono font-bold">CONTROL PANEL</h3>
        </div>

        <Separator className="bg-green-500/30" />

        {/* Interaction Mode */}
        <div className="space-y-3">
          <h4 className="font-mono text-sm font-semibold flex items-center gap-2">
            <MousePointer className="w-4 h-4" />
            INTERACTION
          </h4>

          <div className="flex items-center justify-between">
            <span className="font-mono text-sm flex items-center gap-2">
              {state.selectionMode ? <MousePointer className="w-4 h-4" /> : <Hand className="w-4 h-4" />}
              Selection Mode
            </span>
            <Switch
              checked={state.selectionMode}
              onCheckedChange={(checked) => updateState({ selectionMode: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-mono text-sm flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Blueprint Mode
            </span>
            <Switch
              checked={state.blueprintMode}
              onCheckedChange={(checked) => updateState({ blueprintMode: checked })}
            />
          </div>

          {state.selectionMode && (
            <div className="text-xs text-green-300 bg-green-900/20 p-2 rounded border border-green-500/20">
              💡 Click on objects to select and lift them up
            </div>
          )}

          {state.blueprintMode && (
            <div className="text-xs text-blue-300 bg-blue-900/20 p-2 rounded border border-blue-500/20">
              📐 Blueprint view with wireframe navigation
            </div>
          )}
        </div>

        <Separator className="bg-green-500/30" />

        {/* View Mode Controls */}
        <div className="space-y-2">
          <h4 className="font-mono text-sm font-semibold flex items-center gap-2">
            <Eye className="w-4 h-4" />
            VIEW MODE
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {(["solid", "wireframe", "xray"] as const).map((mode) => (
              <Button
                key={mode}
                variant={state.viewMode === mode ? "default" : "outline"}
                size="sm"
                onClick={() => updateState({ viewMode: mode })}
                className={`font-mono text-xs ${
                  state.viewMode === mode
                    ? "bg-green-600 text-black border-green-400 shadow-lg shadow-green-500/30"
                    : "bg-black/50 text-green-400 border-green-500/50 hover:bg-green-900/20 hover:border-green-400/70"
                }`}
              >
                {mode.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="bg-green-500/30" />

        {/* Display Options */}
        <div className="space-y-3">
          <h4 className="font-mono text-sm font-semibold flex items-center gap-2">
            <Layers className="w-4 h-4" />
            DISPLAY
          </h4>

          <div className="flex items-center justify-between">
            <span className="font-mono text-sm flex items-center gap-2">
              <Grid3X3 className="w-4 h-4" />
              Grid
            </span>
            <Switch checked={state.showGrid} onCheckedChange={(checked) => updateState({ showGrid: checked })} />
          </div>
        </div>

        <Separator className="bg-green-500/30" />

        {/* Models List */}
        <div className="space-y-2">
          <h4 className="font-mono text-sm font-semibold flex items-center gap-2">
            <Box className="w-4 h-4" />
            MODELS ({state.models.length})
          </h4>

          <div className="max-h-40 overflow-y-auto space-y-2">
            {state.models.map((model) => (
              <div
                key={model.id}
                className="flex items-center justify-between p-2 bg-gray-800/50 rounded border border-green-500/20 hover:border-green-400/40 transition-colors"
              >
                <span className="font-mono text-xs truncate flex-1 mr-2">{model.name}</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const updatedModels = state.models.map((m) =>
                        m.id === model.id ? { ...m, visible: !m.visible } : m,
                      )
                      updateState({ models: updatedModels })
                    }}
                    className="p-1 h-6 w-6 text-green-400 hover:bg-green-900/20"
                  >
                    {model.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const updatedModels = state.models.filter((m) => m.id !== model.id)
                      updateState({ models: updatedModels })
                    }}
                    className="p-1 h-6 w-6 text-red-400 hover:bg-red-900/20"
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {state.models.length === 0 && (
          <div className="text-center py-4 text-green-400/60 font-mono text-sm">Drop GLB/GLTF files to load models</div>
        )}
      </div>
    </Card>
  )
}
