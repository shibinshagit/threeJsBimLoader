"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Upload } from "lucide-react"

interface FileDropZoneProps {
  onFilesDrop: (files: File[]) => void
}

export function FileDropZone({ onFilesDrop }: FileDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      onFilesDrop(files)
    },
    [onFilesDrop],
  )

  return (
    <>
      {/* Invisible drop zone overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ pointerEvents: isDragOver ? "auto" : "none" }}
      />

      {/* Drag overlay */}
      {isDragOver && (
        <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="text-center text-cyan-400 font-mono">
            <Upload className="w-16 h-16 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold mb-2">DROP FILES HERE</h2>
            <p className="text-lg">GLB/GLTF models or Sky images</p>
          </div>
        </div>
      )}
    </>
  )
}
