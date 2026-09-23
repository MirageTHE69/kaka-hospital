import type { ReactNode } from "react";

/**
 * "Lightbox" line-art set: single-weight anatomical / clinical drawings.
 * Every shape carries pathLength=1 so the `.draw` class can animate any of
 * them with a single stroke-dashoffset keyframe (see globals.css).
 */

export type LineArtName =
  | "knee"
  | "spine"
  | "capsule"
  | "xray"
  | "ecg"
  | "motherBaby"
  | "heart"
  | "walking"
  | "skin"
  | "hospital"
  | "brokenBone";


function vertebrae() {
  // Five lumbar vertebrae (AP view), slightly larger toward the sacrum.
  const out: ReactNode[] = [];
  let y = 40;
  for (let i = 0; i < 5; i++) {
    const w = 84 + i * 6;
    const h = 44 + i * 2;
    const x = 200 - w / 2;
    out.push(
      <g key={i}>
        <rect x={x} y={y} width={w} height={h} rx={12} pathLength={1} />
        {/* transverse processes */}
        <path pathLength={1} d={`M${x} ${y + h * 0.45} C${x - 18} ${y + h * 0.3} ${x - 42} ${y + h * 0.35} ${x - 50} ${y + h * 0.5} C${x - 42} ${y + h * 0.62} ${x - 18} ${y + h * 0.66} ${x} ${y + h * 0.6}`} />
        <path pathLength={1} d={`M${x + w} ${y + h * 0.45} C${x + w + 18} ${y + h * 0.3} ${x + w + 42} ${y + h * 0.35} ${x + w + 50} ${y + h * 0.5} C${x + w + 42} ${y + h * 0.62} ${x + w + 18} ${y + h * 0.66} ${x + w} ${y + h * 0.6}`} />
        {/* spinous process + pedicles */}
        <ellipse cx={200} cy={y + h * 0.55} rx={7} ry={11} pathLength={1} />
        <circle cx={x + 16} cy={y + 14} r={6} pathLength={1} />
        <circle cx={x + w - 16} cy={y + 14} r={6} pathLength={1} />
      </g>,
    );
    y += h;
    if (i < 4) {
      // intervertebral disc
      out.push(<path key={`d${i}`} pathLength={1} className="opacity-60" d={`M${x + 6} ${y + 5} Q200 ${y + 11} ${x + w - 6} ${y + 5}`} />);
      y += 11;
    }
  }
  // sacrum
  out.push(<path key="sac" pathLength={1} d={`M142 ${y + 6} L258 ${y + 6} C252 ${y + 40} 226 ${y + 62} 200 ${y + 68} C174 ${y + 62} 148 ${y + 40} 142 ${y + 6} Z`} />);
  return out;
}

const art: Record<LineArtName, { viewBox: string; body: ReactNode; label: string }> = {
  knee: {
    label: "Line drawing of a knee joint: femur, patella, tibia and fibula",
    viewBox: "0 0 400 400",
    body: (
      <>
        {/* femur */}
        <path pathLength={1} d="M172 14 L167 160 C162 182 134 192 131 216 C128 240 150 252 169 247 C184 243 191 233 200 233 C209 233 216 243 231 247 C250 252 272 240 269 216 C266 192 238 182 233 160 L228 14" />
        {/* patella */}
        <ellipse cx="200" cy="196" rx="22" ry="27" pathLength={1} className="opacity-70" />
        {/* joint line */}
        <path pathLength={1} className="opacity-50" d="M150 254 Q200 262 250 254" />
        {/* tibia */}
        <path pathLength={1} d="M128 266 C142 257 172 259 200 261 C228 259 258 257 272 266 C276 278 262 290 246 296 L239 388" />
        <path pathLength={1} d="M128 266 C124 278 138 290 154 296 L161 388" />
        {/* fibula */}
        <path pathLength={1} d="M262 300 C266 292 280 293 282 303 C283 311 276 316 274 322 L270 388" />
        <path pathLength={1} d="M262 300 C260 309 264 316 265 322 L261 388" />
        {/* ligaments */}
        <path pathLength={1} className="opacity-50" d="M137 222 L140 280" />
        <path pathLength={1} className="opacity-50" d="M263 222 L268 296" />
        {/* joint markers */}
        <circle cx="200" cy="248" r="3" pathLength={1} className="opacity-80" />
      </>
    ),
  },
  spine: {
    label: "Line drawing of the lumbar spine",
    viewBox: "0 0 400 400",
    body: <>{vertebrae()}</>,
  },
  capsule: {
    label: "Line drawing of a capsule and a prescription sheet",
    viewBox: "0 0 400 400",
    body: (
      <>
        {/* prescription sheet */}
        <path pathLength={1} d="M110 60 L250 60 L290 100 L290 340 L110 340 Z" />
        <path pathLength={1} d="M250 60 L250 100 L290 100" />
        {/* Rx */}
        <path pathLength={1} d="M138 124 L138 172 M138 124 L156 124 C170 124 170 148 156 148 L138 148 M152 148 L172 176 M160 176 L176 156" />
        {[196, 222, 248].map((y) => (
          <path key={y} pathLength={1} className="opacity-60" d={`M138 ${y} L262 ${y}`} />
        ))}
        <path pathLength={1} className="opacity-60" d="M138 274 L214 274" />
        {/* capsule */}
        <g transform="rotate(-35 268 286)">
          <rect x="206" y="262" width="124" height="48" rx="24" pathLength={1} />
          <path pathLength={1} d="M268 262 L268 310" />
          <path pathLength={1} className="opacity-50" d="M224 276 Q232 270 244 270" />
        </g>
      </>
    ),
  },
  xray: {
    label: "Line drawing of an X-ray film with a bone and an ECG trace",
    viewBox: "0 0 400 400",
    body: (
      <>
        <rect x="70" y="40" width="260" height="220" rx="10" pathLength={1} />
        <rect x="84" y="54" width="232" height="192" rx="4" pathLength={1} className="opacity-40" />
        {/* long bone */}
        <path pathLength={1} d="M140 92 C126 80 132 62 148 66 C156 56 172 64 166 78 L244 206 C258 204 268 220 256 230 C258 244 240 248 234 236 L156 108 C150 106 144 100 140 92 Z" />
        <circle cx="300" cy="72" r="6" pathLength={1} className="opacity-60" />
        {/* ECG */}
        <path pathLength={1} d="M40 320 L130 320 L146 300 L160 320 L176 320 L190 256 L208 372 L224 304 L238 320 L270 320 L284 308 L298 320 L360 320" />
      </>
    ),
  },
  ecg: {
    label: "ECG pulse line",
    viewBox: "0 0 400 200",
    body: (
      <path
        pathLength={1}
        d="M0 110 L70 110 L84 96 L98 110 L122 110 L136 40 L156 172 L172 88 L186 110 L214 110 L228 98 L242 110 L276 110 L290 40 L310 172 L326 88 L340 110 L400 110"
      />
    ),
  },
  motherBaby: {
    label: "Single continuous line drawing of a mother holding a baby",
    viewBox: "0 0 400 400",
    body: (
      <>
        <path
          pathLength={1}
          d="M92 372 C96 300 118 250 150 222 C170 204 176 184 168 164 C156 136 164 96 196 80 C230 64 268 84 272 120 C276 150 258 170 240 176 C230 180 228 190 236 198 C256 214 284 226 300 256 C312 280 300 300 276 304 C248 308 214 290 196 268 C184 252 190 234 208 232 C230 230 250 250 256 272 M300 256 C318 296 316 340 306 372"
        />
        {/* baby head */}
        <circle cx="224" cy="252" r="20" pathLength={1} />
        <path pathLength={1} className="opacity-60" d="M216 256 Q224 262 232 256" />
        {/* mother's face profile hint */}
        <path pathLength={1} className="opacity-60" d="M232 132 Q240 140 236 150" />
      </>
    ),
  },
  heart: {
    label: "Line drawing of a heart with a stethoscope",
    viewBox: "0 0 400 400",
    body: (
      <>
        {/* heart */}
        <path pathLength={1} d="M200 322 C140 276 96 236 96 186 C96 150 122 126 152 126 C174 126 190 138 200 156 C210 138 226 126 248 126 C278 126 304 150 304 186 C304 236 260 276 200 322 Z" />
        <path pathLength={1} className="opacity-60" d="M136 190 L164 190 L176 168 L192 214 L206 180 L216 190 L264 190" />
        {/* stethoscope */}
        <path pathLength={1} d="M128 40 C120 60 118 92 136 104 M188 40 C196 60 198 92 180 104 M136 104 C146 112 170 112 180 104 M158 110 C158 140 150 150 128 160 C84 180 58 230 70 280 C80 322 118 348 162 350" />
        <circle cx="128" cy="36" r="5" pathLength={1} />
        <circle cx="188" cy="36" r="5" pathLength={1} />
        <circle cx="178" cy="350" r="18" pathLength={1} />
        <circle cx="178" cy="350" r="8" pathLength={1} className="opacity-60" />
      </>
    ),
  },
  walking: {
    label: "Line drawing of a figure walking mid-stride with joints marked",
    viewBox: "0 0 400 400",
    body: (
      <>
        <circle cx="206" cy="58" r="24" pathLength={1} />
        {/* torso */}
        <path pathLength={1} d="M204 84 L194 206" />
        {/* arms */}
        <path pathLength={1} d="M202 108 L166 158 L150 206" />
        <path pathLength={1} d="M202 108 L238 150 L270 176" />
        {/* legs */}
        <path pathLength={1} d="M194 206 L150 276 L112 346 L94 346" />
        <path pathLength={1} d="M194 206 L236 282 L250 350 L276 352" />
        {/* ground */}
        <path pathLength={1} className="opacity-40" d="M60 362 L340 362" />
        {/* joints */}
        {[
          [202, 108],
          [166, 158],
          [238, 150],
          [194, 206],
          [150, 276],
          [236, 282],
          [112, 346],
          [250, 350],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" pathLength={1} className="fill-current opacity-90" />
        ))}
      </>
    ),
  },
  skin: {
    label: "Line drawing of a cross-section of skin layers",
    viewBox: "0 0 400 400",
    body: (
      <>
        <path pathLength={1} d="M40 110 C80 96 120 124 160 110 C200 96 240 124 280 110 C320 96 346 116 360 110" />
        <path pathLength={1} className="opacity-70" d="M40 138 C80 124 120 152 160 138 C200 124 240 152 280 138 C320 124 346 144 360 138" />
        <path pathLength={1} d="M40 230 C90 220 140 240 200 230 C260 220 310 240 360 230" />
        <path pathLength={1} className="opacity-50" d="M40 110 L40 350 M360 110 L360 350 M40 350 L360 350" />
        {/* hair follicles */}
        <path pathLength={1} d="M120 60 L126 112 L132 196 C132 210 118 212 116 198 L118 150" />
        <path pathLength={1} d="M268 70 L262 112 L256 190 C254 206 272 208 272 194 L268 150" />
        {/* gland */}
        <path pathLength={1} className="opacity-70" d="M180 170 C170 160 176 146 190 150 C204 146 212 162 200 172 C196 190 204 200 196 214" />
        {/* fat cells */}
        {[
          [80, 270],
          [130, 290],
          [180, 268],
          [230, 292],
          [280, 270],
          [330, 292],
          [104, 320],
          [206, 322],
          [306, 322],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="20" pathLength={1} className="opacity-70" />
        ))}
      </>
    ),
  },
  hospital: {
    label: "Line drawing of the hospital building with a location pin",
    viewBox: "0 0 400 400",
    body: (
      <>
        {/* location pin */}
        <path pathLength={1} d="M200 132 C176 104 160 86 160 64 C160 42 178 26 200 26 C222 26 240 42 240 64 C240 86 224 104 200 132 Z" />
        <path pathLength={1} d="M192 64 L208 64 M200 56 L200 72" />
        {/* building */}
        <path pathLength={1} d="M120 360 L120 170 L280 170 L280 360" />
        <path pathLength={1} d="M60 360 L60 230 L120 230 M280 230 L340 230 L340 360" />
        <path pathLength={1} d="M30 360 L370 360" />
        {/* entrance */}
        <path pathLength={1} d="M176 360 L176 312 L224 312 L224 360 M200 312 L200 360" />
        <path pathLength={1} d="M164 312 L236 312 L236 300 L164 300 Z" className="opacity-70" />
        {/* windows */}
        {[140, 184, 228].flatMap((x) =>
          [192, 240].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="32" height="30" rx="3" pathLength={1} className="opacity-70" />),
        )}
        {[76, 296].flatMap((x) =>
          [252, 302].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="28" height="30" rx="3" pathLength={1} className="opacity-60" />),
        )}
        {/* road */}
        <path pathLength={1} className="opacity-40" d="M20 384 L380 384" />
      </>
    ),
  },
  brokenBone: {
    label: "Line drawing of a fractured long bone",
    viewBox: "0 0 400 400",
    body: (
      <>
        <path pathLength={1} d="M92 92 C74 74 88 48 112 58 C122 40 150 50 142 74 L196 150 L186 168 L206 176 L194 196" />
        <path pathLength={1} d="M92 92 C84 102 96 116 106 114 L164 196 L180 188 L172 206 L186 214" />
        <path pathLength={1} d="M214 204 L226 214 L208 224 L222 234 L292 318 C316 310 330 336 312 348 C318 372 290 380 282 358 C272 364 256 352 262 340 L204 262 L216 252 L196 244 L208 232" />
        <path pathLength={1} className="opacity-50" d="M180 250 L160 262 M232 186 L250 172 M240 214 L262 214" />
      </>
    ),
  },
};

type Props = {
  name: LineArtName;
  className?: string;
  /** Adds the self-drawing animation (respects prefers-reduced-motion). */
  draw?: boolean;
  /** Decorative by default; pass a label to expose it to assistive tech. */
  title?: string | true;
  strokeWidth?: number;
};

export function LineArt({ name, className = "", draw = false, title, strokeWidth = 1.5 }: Props) {
  const a = art[name];
  const label = title === true ? a.label : title;
  return (
    <svg
      viewBox={a.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`line-art ${draw ? "draw" : ""} ${className}`}
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {a.body}
    </svg>
  );
}

export const lineArtLabel = (name: LineArtName) => art[name].label;
