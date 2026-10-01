import { useMemo, useRef, useState } from "react";
import { MoveHorizontal, RotateCcw, Sun, Layers3 } from "lucide-react";
type Point = [number, number, number];
type Face = { points: Point[]; fill: string; glass?: boolean };
const palette: Record<string, string> = {
  Limestone: "#d7cbb5",
  Terracotta: "#b97e65",
  Concrete: "#b5b8b0",
};
function box(
  x: number,
  y: number,
  z: number,
  w: number,
  d: number,
  h: number,
  color: string,
): Face[] {
  return [
    {
      points: [
        [x, y, z],
        [x + w, y, z],
        [x + w, y, z + h],
        [x, y, z + h],
      ],
      fill: color,
    },
    {
      points: [
        [x, y + d, z],
        [x + w, y + d, z],
        [x + w, y + d, z + h],
        [x, y + d, z + h],
      ],
      fill: color,
    },
    {
      points: [
        [x, y, z],
        [x, y + d, z],
        [x, y + d, z + h],
        [x, y, z + h],
      ],
      fill: color,
    },
    {
      points: [
        [x + w, y, z],
        [x + w, y + d, z],
        [x + w, y + d, z + h],
        [x + w, y, z + h],
      ],
      fill: color,
    },
    {
      points: [
        [x, y, z + h],
        [x + w, y, z + h],
        [x + w, y + d, z + h],
        [x, y + d, z + h],
      ],
      fill: color,
    },
  ];
}
export default function SpatialStudy() {
  const [rotation, setRotation] = useState(32);
  const [roof, setRoof] = useState(false);
  const [material, setMaterial] = useState("Limestone");
  const [light, setLight] = useState(60);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ x: number; angle: number } | null>(null);
  const surfaces = useMemo(() => {
    const wall = palette[material];
    const faces: Face[] = [
      ...box(-155, -118, -7, 310, 236, 7, "#cbc8b9"),
      ...box(-118, -86, 0, 236, 172, 9, "#e5dac5"),
      ...box(-118, -86, 9, 236, 8, 99, wall),
      ...box(-118, -86, 9, 8, 172, 99, wall),
      ...box(108, -86, 9, 10, 172, 99, wall),
      ...box(-118, 78, 9, 74, 8, 99, wall),
    ];
    // Framed glass elevation and a calm, furnished interior.
    for (let x = -43; x < 105; x += 37) {
      faces.push(
        {
          points: [
            [x, 80, 12],
            [x + 35, 80, 12],
            [x + 35, 80, 103],
            [x, 80, 103],
          ],
          fill: "#819b92",
          glass: true,
        },
        ...box(x, 78, 9, 2, 6, 99, "#585c50"),
      );
    }
    faces.push(
      ...box(-43, 78, 103, 151, 6, 5, "#585c50"),
      ...box(-43, 78, 9, 151, 6, 4, "#585c50"),
    );
    faces.push(
      ...box(-91, -49, 9, 100, 35, 23, "#aba68d"),
      ...box(-91, -49, 32, 100, 10, 18, "#a3a087"),
      ...box(-75, -20, 9, 21, 15, 23, "#aba68d"),
      ...box(-12, -20, 9, 21, 15, 23, "#aba68d"),
      ...box(-52, 10, 9, 53, 28, 15, "#9d7452"),
      ...box(48, -48, 9, 30, 29, 23, "#b4664c"),
      ...box(48, -48, 32, 30, 6, 21, "#b4664c"),
    );
    if (roof) faces.push(...box(-118, -86, 108, 236, 172, 5, wall));
    faces.push(
      ...box(75, 112, 0, 33, 33, 23, "#aaa18e"),
      ...box(84, 121, 23, 15, 15, 41, "#68785b"),
      ...box(81, 118, 48, 21, 21, 29, "#7e8d6b"),
    );
    const angle = (rotation * Math.PI) / 180;
    const transform = ([x, y, z]: Point): Point => [
      x * Math.cos(angle) - y * Math.sin(angle),
      x * Math.sin(angle) + y * Math.cos(angle),
      z,
    ];
    return faces
      .map((face) => {
        const pts = face.points.map(transform);
        const normalShade = Math.abs(pts[1][0] - pts[0][0]) > 10 ? 0.96 : 0.83;
        return {
          ...face,
          depth:
            pts.reduce((sum, p) => sum + p[1] + p[2] * 0.25, 0) / pts.length,
          polygon: pts
            .map(
              ([x, y, z]) => `${350 + x * 1.28},${250 + y * 0.57 - z * 1.22}`,
            )
            .join(" "),
          shade: normalShade,
        };
      })
      .sort((a, b) => a.depth - b.depth);
  }, [rotation, roof, material]);
  return (
    <section className="spatial-section" id="spatial-study">
      <div className="spatial-copy">
        <span className="eyebrow">
          <span className="small-dot" /> A DIFFERENT PERSPECTIVE
        </span>
        <h2>
          Good spaces.
          <br />
          From every angle.
        </h2>
        <p>
          Design is more than a beautiful image. Step into our pavilion study
          and discover how light, material, and proportion come together.
        </p>
        <div className="study-legend">
          <span>THE GARDEN PAVILION</span>
          <span>Interactive concept · 01</span>
        </div>
        <div className="material-controls">
          <span className="control-label">EXPLORE A MATERIAL</span>
          <div>
            {Object.keys(palette).map((name) => (
              <button
                key={name}
                className={material === name ? "selected" : ""}
                onClick={() => setMaterial(name)}
                aria-pressed={material === name}
              >
                <i style={{ background: palette[name] }} />
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="spatial-view">
        <div className="model-top">
          <span>
            <span className="status-dot" /> LIVE SPACE STUDY
          </span>
          <button
            className="icon-button"
            aria-label="Reset pavilion view"
            onClick={() => {
              setRotation(32);
              setRoof(false);
              setLight(60);
              setMaterial("Limestone");
            }}
          >
            <RotateCcw aria-hidden="true" size={17} />
          </button>
        </div>
        <div
          className={`model-canvas ${dragging ? "dragging" : ""}`}
          style={
            { "--daylight": `${0.72 + light / 350}` } as React.CSSProperties
          }
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            drag.current = { x: e.clientX, angle: rotation };
            setDragging(true);
          }}
          onPointerMove={(e) => {
            if (drag.current)
              setRotation(
                (((drag.current.angle + (e.clientX - drag.current.x) * 0.45) %
                  360) +
                  360) %
                  360,
              );
          }}
          onPointerUp={() => {
            drag.current = null;
            setDragging(false);
          }}
          onPointerCancel={() => {
            drag.current = null;
            setDragging(false);
          }}
        >
          <svg
            viewBox="0 0 700 430"
            role="img"
            aria-label={`${material} pavilion at ${Math.round(rotation)} degrees, ${roof ? "roof on" : "roof removed"}`}
          >
            <defs>
              <filter id="shadow">
                <feGaussianBlur stdDeviation="15" />
              </filter>
            </defs>
            <ellipse
              cx="350"
              cy="324"
              rx="215"
              ry="40"
              fill="#46523c"
              opacity=".14"
              filter="url(#shadow)"
            />
            {surfaces.map((face, i) => (
              <polygon
                key={i}
                points={face.polygon}
                fill={face.fill}
                opacity={face.glass ? 0.46 : 1}
                stroke={face.glass ? "#4e6658" : "#6b665c"}
                strokeOpacity={face.glass ? 0.25 : 0.13}
                strokeWidth=".5"
                style={{ filter: `brightness(${face.shade})` }}
              />
            ))}
          </svg>
          <span className="drag-hint">
            <MoveHorizontal aria-hidden="true" size={17} />
            Drag to explore
          </span>
        </div>
        <div className="model-controls">
          <label className="orbit-control">
            <span>
              ROTATE <span>{Math.round(rotation)}°</span>
            </span>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              aria-label="Rotate pavilion"
            />
          </label>
          <button
            className={`roof-button ${roof ? "selected" : ""}`}
            onClick={() => setRoof(!roof)}
            aria-pressed={roof}
          >
            <Layers3 aria-hidden="true" size={17} />
            {roof ? "Open roof" : "Show roof"}
          </button>
          <label className="daylight-control">
            <Sun aria-hidden="true" size={17} />
            <input
              type="range"
              min="0"
              max="100"
              value={light}
              onChange={(e) => setLight(Number(e.target.value))}
              aria-label="Adjust daylight"
            />
          </label>
        </div>
      </div>
    </section>
  );
}
