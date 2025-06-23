"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Scene3D } from "./scene-3d"
import { GamingHeader } from "./gaming-header"
import { SelectionInfo } from "./selection-info"
import { SectionControls } from "./section-controls"
import type * as THREE from "three"

// Predefined models to load
const PREDEFINED_MODELS = [
  {
    name: "Sample Building",
    path: "/models/building.glb",
  }
]

// Predefined sky images
const PREDEFINED_SKY_IMAGES = [
  {
    name: "Urban Skyline",
    path: "/skies/urban.png",
  },
  {
    name: "Mountain View",
    path: "/skies/mountain.png",
  },
  {
    name: "Ocean Sunset",
    path: "/skies/ocean.png",
  },
]

export interface SkyPreset {
  id: string
  name: string
  environment: string
  lightIntensity: number
  lightColor: string
  ambientIntensity: number
  customImage?: string
}

export interface BIMViewerState {
  models: Array<{
    id: string
    name: string
    url: string
    visible: boolean
    wireframe: boolean
  }>
  selectedObject: THREE.Object3D | null
  selectionMode: boolean
  blueprintMode: boolean
  sectionPlane: {
    enabled: boolean
    position: [number, number, number]
    normal: [number, number, number]
  }
  viewMode: "solid" | "wireframe" | "xray"
  showGrid: boolean
  showStats: boolean
  currentSky: string
  skyTransitioning: boolean
  customSkies: SkyPreset[]
}

const DEFAULT_SKIES: SkyPreset[] = [
  {
    id: "day",
    name: "Day",
    environment: "city",
    lightIntensity: 1.2,
    lightColor: "#ffffff",
    ambientIntensity: 0.6,
  },
  {
    id: "evening",
    name: "Evening",
    environment: "sunset",
    lightIntensity: 0.8,
    lightColor: "#ff8844",
    ambientIntensity: 0.4,
  },
  {
    id: "night",
    name: "Night",
    environment: "night",
    lightIntensity: 0.3,
    lightColor: "#4488ff",
    ambientIntensity: 0.2,
  },
]

export function BIMViewer() {
  const [state, setState] = useState<BIMViewerState>({
    models: [],
    selectedObject: null,
    selectionMode: false,
    blueprintMode: false,
    sectionPlane: {
      enabled: false,
      position: [0, 0, 0],
      normal: [1, 0, 0],
    },
    viewMode: "solid",
    showGrid: true,
    showStats: true,
    currentSky: "",
    skyTransitioning: false,
    customSkies: [],
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fpsRef = useRef<number>(0)
  const frameCountRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(performance.now())

  // FPS Counter
  useEffect(() => {
    const updateFPS = () => {
      frameCountRef.current++
      const now = performance.now()
      const delta = now - lastTimeRef.current

      if (delta >= 1000) {
        fpsRef.current = Math.round((frameCountRef.current * 1000) / delta)
        frameCountRef.current = 0
        lastTimeRef.current = now

        const fpsDisplay = document.getElementById("fps-display")
        if (fpsDisplay) {
          fpsDisplay.textContent = `FPS: ${fpsRef.current}`
        }
      }

      requestAnimationFrame(updateFPS)
    }

    updateFPS()
  }, [])

  const updateState = useCallback((updates: Partial<BIMViewerState>) => {
    console.log("State update:", updates)
    setState((prev) => ({ ...prev, ...updates }))
  }, [])

  const changeSky = useCallback((skyId: string) => {
    console.log("Changing sky to:", skyId)
    setState((prev) => ({ ...prev, skyTransitioning: true }))

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        currentSky: skyId,
        skyTransitioning: false,
      }))
    }, 500)
  }, [])

  const allSkies = [...DEFAULT_SKIES, ...state.customSkies]
  const currentSkyData = state.currentSky ? allSkies.find((sky) => sky.id === state.currentSky) : null

  console.log("Current state:", state)
  console.log("All skies:", allSkies)
  console.log("Current sky data:", currentSkyData)

  const loadPredefinedAssets = useCallback(() => {
    console.log("Loading predefined models and skies...")

    // Load predefined models
    const newModels = PREDEFINED_MODELS.map((model, index) => ({
      id: `predefined-model-${index}`,
      name: model.name,
      url: model.path,
      visible: true,
      wireframe: false,
    }))

    // Load predefined custom skies
    const newCustomSkies: SkyPreset[] = PREDEFINED_SKY_IMAGES.map((sky, index) => ({
      id: `predefined-sky-${index}`,
      name: sky.name,
      environment: "warehouse",
      lightIntensity: 1.0,
      lightColor: "#ffffff",
      ambientIntensity: 0.5,
      customImage: sky.path,
    }))

    setState((prev) => ({
      ...prev,
      models: newModels,
      customSkies: newCustomSkies,
      currentSky: "day", // Set default sky
    }))

    console.log("Loaded predefined assets:", { models: newModels, skies: newCustomSkies })
  }, [])

  // Load predefined assets on component mount
  useEffect(() => {
    loadPredefinedAssets()
  }, [loadPredefinedAssets])

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Main 3D Canvas */}
      <Canvas
        ref={canvasRef}
        shadows
        camera={{
          position: [10, 10, 10],
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
        className="bg-transparent"
      >
        <Scene3D
          state={state}
          currentSkyData={currentSkyData}
          onSelectionChange={(obj) => {
            console.log("Selection changed:", obj)
            updateState({ selectedObject: obj })
          }}
        />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI}
          minDistance={1}
          maxDistance={100}
        />
      </Canvas>

      {/* Gaming Header */}
      <GamingHeader
        state={state}
        updateState={updateState}
        allSkies={allSkies}
        currentSky={state.currentSky}
        skyTransitioning={state.skyTransitioning}
        onSkyChange={changeSky}
        showStats={state.showStats}
      />

      {/* Section Controls */}
      <SectionControls state={state} updateState={updateState} />

      {/* Selection Info Panel */}
      <SelectionInfo selectedObject={state.selectedObject} />

      {/* Sky Transition Overlay */}
      {state.skyTransitioning && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-none">
          <div className="text-center text-cyan-400 font-mono">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg">Transitioning Sky...</p>
          </div>
        </div>
      )}
    </div>
  )
}
