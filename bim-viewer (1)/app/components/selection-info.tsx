"use client"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Target, CuboidIcon as Cube, Palette } from "lucide-react"
import type * as THREE from "three"

interface SelectionInfoProps {
  selectedObject: THREE.Object3D | null
}

export function SelectionInfo({ selectedObject }: SelectionInfoProps) {
  if (!selectedObject) return null

  const mesh = selectedObject as THREE.Mesh
  const geometry = mesh.geometry
  const material = mesh.material as THREE.MeshStandardMaterial

  return (
    <Card className="absolute bottom-20 right-4 w-80 bg-black/90 backdrop-blur-md border-red-500/30 text-red-400 shadow-lg shadow-red-500/10 pointer-events-auto z-50">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          <h3 className="font-mono font-bold">SELECTION INFO</h3>
        </div>

        <Separator className="bg-red-500/30" />

        {/* Object Info */}
        <div className="space-y-2">
          <h4 className="font-mono text-sm font-semibold flex items-center gap-2">
            <Cube className="w-4 h-4" />
            OBJECT
          </h4>

          <div className="space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span>Name:</span>
              <span className="text-white">{selectedObject.name || "Unnamed"}</span>
            </div>
            <div className="flex justify-between">
              <span>Type:</span>
              <span className="text-white">{selectedObject.type}</span>
            </div>
            <div className="flex justify-between">
              <span>UUID:</span>
              <span className="text-white text-xs">{selectedObject.uuid.slice(0, 8)}...</span>
            </div>
          </div>
        </div>

        <Separator className="bg-red-500/30" />

        {/* Transform Info */}
        <div className="space-y-2">
          <h4 className="font-mono text-sm font-semibold">TRANSFORM</h4>

          <div className="space-y-1 font-mono text-xs">
            <div>
              <span>Position:</span>
              <div className="text-white ml-2">
                X: {selectedObject.position.x.toFixed(2)}
                <br />
                Y: {selectedObject.position.y.toFixed(2)}
                <br />
                Z: {selectedObject.position.z.toFixed(2)}
              </div>
            </div>
            <div>
              <span>Scale:</span>
              <div className="text-white ml-2">
                X: {selectedObject.scale.x.toFixed(2)}
                <br />
                Y: {selectedObject.scale.y.toFixed(2)}
                <br />
                Z: {selectedObject.scale.z.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {geometry && (
          <>
            <Separator className="bg-red-500/30" />

            {/* Geometry Info */}
            <div className="space-y-2">
              <h4 className="font-mono text-sm font-semibold">GEOMETRY</h4>

              <div className="space-y-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="text-white">{geometry.type}</span>
                </div>
                {geometry.attributes.position && (
                  <div className="flex justify-between">
                    <span>Vertices:</span>
                    <span className="text-white">{geometry.attributes.position.count}</span>
                  </div>
                )}
                {geometry.index && (
                  <div className="flex justify-between">
                    <span>Faces:</span>
                    <span className="text-white">{geometry.index.count / 3}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {material && (
          <>
            <Separator className="bg-red-500/30" />

            {/* Material Info */}
            <div className="space-y-2">
              <h4 className="font-mono text-sm font-semibold flex items-center gap-2">
                <Palette className="w-4 h-4" />
                MATERIAL
              </h4>

              <div className="space-y-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="text-white">{material.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Color:</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 border border-white/30 rounded"
                      style={{ backgroundColor: `#${material.color?.getHexString() || "ffffff"}` }}
                    />
                    <span className="text-white">#{material.color?.getHexString() || "ffffff"}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Opacity:</span>
                  <span className="text-white">{material.opacity?.toFixed(2) || "1.00"}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
