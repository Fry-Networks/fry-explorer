import { useTheme } from "next-themes"
import { Fragment } from "react"
import { Layer, Source } from "react-map-gl"
import {
  MIN_HEXES_ZOOM,
  MIN_HEX_LABELS_ZOOM,
  NetworkCoverageLayerOption,
  POINTS_AND_HEXES_OVERLAP,
  getBlurredPointStyle,
  getHexFillStyle,
  getHexLabelStyle,
  hexLabelLayout,
} from "./utils"

export function NetworkCoverageLayer({
  layer: { color, sourceDomain, points, hexes },
  ...props
}: {
  layer: NetworkCoverageLayerOption
}) {
  const { resolvedTheme } = useTheme()
  return (
    <Fragment {...props}>
      {/* new url: http://localhost:8080/data/miners/{z}/{x}/{y}.pbf */}
      <Source
        id="points_source"
        type="vector"
        url="http://localhost:8080/data/miners.json"
      >
        <Layer
          id="points_layer"
          type="circle"
          source-layer="miners"
          maxzoom={24}
          paint={getBlurredPointStyle(color)}
        />
        <Layer
          id="hotspot_count_labels"
          type="symbol"
          source-layer="miners"
          minzoom={MIN_HEX_LABELS_ZOOM}
          layout={hexLabelLayout}
          paint={getHexLabelStyle(resolvedTheme)}
        />
      </Source>
      <Source
        id="hexes_source"
        type="vector"
        url="http://localhost:8080/data/hex_grid.json"
      >
        <Layer
          id="hexes_layer"
          type="fill"
          source-layer="hex_grid"
          
          paint={getHexFillStyle(color)}
          minzoom={MIN_HEXES_ZOOM}
        />
      </Source>
    </Fragment>
  )
}
