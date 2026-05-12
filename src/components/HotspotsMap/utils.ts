import type { FillPaint, CirclePaint, LinePaint, SymbolPaint, SymbolLayout } from "mapbox-gl"
import { CoordPair } from "h3-js"
import { HeliumIotIcon } from "../icons/HeliumIotIcon"

export const MIN_MAP_ZOOM = 2
export const MAX_MAP_ZOOM = 14

const WORLD_BOUNDS: [CoordPair, CoordPair] = [
  [-134.827109, 57.785781],
  [129.767893, -30.955724],
]

export const INITIAL_MAP_VIEW_STATE = {
  bounds: WORLD_BOUNDS,
}

export const MAP_CONTAINER_STYLE: React.CSSProperties = {
  height: "100%",
  width: "100%",
  overflow: "hidden",
  position: "relative",
  backgroundColor: "rgb(19,24,37)",
}

export const MIN_HEXES_ZOOM = 7
export const MIN_HEX_LABELS_ZOOM = 11
export const POINTS_AND_HEXES_OVERLAP = 2

export const FRY_COLOR = "#dc2626"

export const getHexFillStyle = (color: string): FillPaint => ({
  "fill-color": color,
  "fill-opacity": 0.4,
})

export const getBlurredPointStyle = (color: string): CirclePaint => ({
  "circle-color": color,
  "circle-opacity": [
    "interpolate",
    ["exponential", 2],
    ["zoom"],
    MIN_MAP_ZOOM,
    0.3, // Increased from 0.05 for better visibility
    MIN_HEXES_ZOOM + POINTS_AND_HEXES_OVERLAP,
    0.6, // Increased from 0.4 for better visibility
  ],
  "circle-radius": [
    "interpolate",
    ["exponential", 2],
    ["zoom"],
    MIN_MAP_ZOOM,
    6, // Increased from 3 for larger points when zoomed out
    MIN_HEXES_ZOOM + POINTS_AND_HEXES_OVERLAP,
    3, // Slightly increased from 2 for better visibility
  ],
  "circle-blur": [
    "interpolate",
    ["linear"],
    ["zoom"],
    MIN_MAP_ZOOM,
    0.5, // Added blur effect for softer appearance when zoomed out
    MIN_HEXES_ZOOM + POINTS_AND_HEXES_OVERLAP,
    0, // No blur when zoomed in
  ],
})
export const getHexOutlineStyle = (
  theme: string | undefined
): LinePaint => ({
  "line-color": theme === "dark" ? "#fff" : "rgb(113,113,122)",
  "line-width": 4,
})

export const getHexLabelStyle = (
  theme: string | undefined
): SymbolPaint => ({
  "text-color": theme === "dark" ? "white" : "#6D6D6D",
})

export const hexLabelLayout: SymbolLayout = {
  "text-font": ["NotoSans-Regular"],
  "text-field": ["get", "count"],
  "text-allow-overlap": false,
  "text-size": 23,
}

export interface HexFeatureDetails {
  hexId: string
  geojson: GeoJSON.Geometry
}

export const ZOOM_BY_HEX_RESOLUTION: { [resolution: number]: number } = {
  10: 14,
  9: 14,
  8: 13,
  7: 12,
  6: 11,
  5: 10,
  4: 9,
}

interface LayerConfig {
  sourcePath: string
  sourceLayer: string
}

export interface NetworkCoverageLayerOption {
  name: string
  icon: (props: any) => JSX.Element
  color: string
  sourceDomain: string
  points: LayerConfig
  hexes: LayerConfig
}
