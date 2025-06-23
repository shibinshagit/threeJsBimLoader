"use client"

import type React from "react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { FileText, ImageIcon, Building } from "lucide-react"

interface CircularButtonsProps {
  onFilesDrop: (files: File[]) => void
  onIFCFiles: (files: File[]) => void
}

export function CircularButtons({ onFilesDrop, onIFCFiles }: CircularButtonsProps) {
  const modelInputRef = useRef<HTMLInputElement>(null)
  const skyInputRef = useRef<HTMLInputElement>(null)
  const ifcInputRef = useRef<HTMLInputElement>(null)

  const handleModelClick = () => {
    console.log("Model button clicked")
    if (modelInputRef.current) {
      modelInputRef.current.click()
    }
  }

  const handleSkyClick = () => {
    console.log("Sky button clicked")
    if (skyInputRef.current) {
      skyInputRef.current.click()
    }
  }

  const handleIFCClick = () => {
    console.log("IFC button clicked")
    if (ifcInputRef.current) {
      ifcInputRef.current.click()
    }
  }

  const handleModelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Model file input changed")
    if (e.target.files) {
      const files = Array.from(e.target.files)
      console.log("Model files selected:", files)
      onFilesDrop(files)
      e.target.value = ""
    }
  }

  const handleSkyFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Sky file input changed")
    if (e.target.files) {
      const files = Array.from(e.target.files)
      console.log("Sky files selected:", files)
      onFilesDrop(files)
      e.target.value = ""
    }
  }

  const handleIFCFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("IFC file input changed")
    if (e.target.files) {
      const files = Array.from(e.target.files)
      console.log("IFC files selected:", files)
      onIFCFiles(files)
      e.target.value = ""
    }
  }

  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-3 z-40 pointer-events-auto">
      {/* Load Models Button */}
      <div className="relative group">
        <Button
          size="lg"
          onClick={handleModelClick}
          className="w-14 h-14 rounded-full bg-cyan-600/90 hover:bg-cyan-500 border-2 border-cyan-400/50 shadow-lg shadow-cyan-400/30 backdrop-blur-md transition-all duration-300 hover:scale-110 group-hover:shadow-cyan-400/50"
        >
          <FileText className="w-6 h-6 text-white" />
        </Button>
        <input
          ref={modelInputRef}
          type="file"
          multiple
          accept=".glb,.gltf"
          onChange={handleModelFileChange}
          className="hidden"
        />

        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/90 backdrop-blur-md rounded-lg p-2 border border-cyan-400/30 text-cyan-400 font-mono text-xs whitespace-nowrap">
            Load Models
          </div>
        </div>
      </div>

      {/* Add Sky Button */}
      <div className="relative group">
        <Button
          size="lg"
          onClick={handleSkyClick}
          className="w-14 h-14 rounded-full bg-purple-600/90 hover:bg-purple-500 border-2 border-purple-400/50 shadow-lg shadow-purple-400/30 backdrop-blur-md transition-all duration-300 hover:scale-110 group-hover:shadow-purple-400/50"
        >
          <ImageIcon className="w-6 h-6 text-white" />
        </Button>
        <input
          ref={skyInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleSkyFileChange}
          className="hidden"
        />

        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/90 backdrop-blur-md rounded-lg p-2 border border-purple-400/30 text-purple-400 font-mono text-xs whitespace-nowrap">
            Add Sky
          </div>
        </div>
      </div>

      {/* Add IFC Button */}
      <div className="relative group">
        <Button
          size="lg"
          onClick={handleIFCClick}
          className="w-14 h-14 rounded-full bg-orange-600/90 hover:bg-orange-500 border-2 border-orange-400/50 shadow-lg shadow-orange-400/30 backdrop-blur-md transition-all duration-300 hover:scale-110 group-hover:shadow-orange-400/50"
        >
          <Building className="w-6 h-6 text-white" />
        </Button>
        <input ref={ifcInputRef} type="file" multiple accept=".ifc" onChange={handleIFCFileChange} className="hidden" />

        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/90 backdrop-blur-md rounded-lg p-2 border border-orange-400/30 text-orange-400 font-mono text-xs whitespace-nowrap">
            Add IFC
          </div>
        </div>
      </div>
    </div>
  )
}
