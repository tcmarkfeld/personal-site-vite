export type DiagramKind = 'parser' | 'conductor' | 'revise';

// Animated line drawings for each project: HL7 -> FHIR, IAM fan-out, and a PDF edited in place.
export function ProjectDiagram({ kind }: { kind: DiagramKind }) {
  return (
    <svg
      viewBox="0 0 300 240"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path
        className="diagram-corners"
        d="M8 18V8h10m264 0h10v10M8 222v10h10m264 0h10v-10"
      />
      {kind === 'parser' ? (
        <>
          <path className="diagram-guide" d="M106 120h88" />
          <rect
            className="diagram-node"
            x="18"
            y="70"
            width="88"
            height="102"
            rx="4"
          />
          <path d="M18 94h88" />
          <text x="29" y="86">
            HL7
          </text>
          <g className="diagram-record-text">
            <text x="26" y="114">
              MSH|^~\&amp;|
            </text>
            <text x="26" y="128">
              PID|42||
            </text>
            <text x="26" y="142">
              DOE^JANE
            </text>
            <text x="26" y="156">
              PV1|1|O
            </text>
          </g>
          <rect
            className="diagram-node"
            x="134"
            y="100"
            width="32"
            height="40"
            rx="3"
          />
          <text x="141" y="155">
            MAP
          </text>
          <rect
            className="diagram-node"
            x="194"
            y="70"
            width="88"
            height="102"
            rx="4"
          />
          <path d="M194 94h88" />
          <text x="205" y="86">
            FHIR
          </text>
          <g className="diagram-record-text diagram-fhir-json">
            <text x="202" y="104">
              {'{'}
            </text>
            <text x="208" y="114">
              {'"resourceType":'}
            </text>
            <text x="212" y="124">
              {'"Patient",'}
            </text>
            <text x="208" y="136">
              {'"id": "42",'}
            </text>
            <text x="208" y="148">
              {'"active": true'}
            </text>
            <text x="202" y="160">
              {'}'}
            </text>
          </g>
          <path
            className="diagram-guide"
            d="M214 127h14M233 139h14M250 151h14"
          />
          <g className="diagram-accent diagram-fields">
            <path className="diagram-motion diagram-field" d="M143 112h14" />
            <path className="diagram-motion diagram-field" d="M143 120h14" />
            <path className="diagram-motion diagram-field" d="M143 128h14" />
          </g>
          <text x="34" y="196">
            MESSAGE
          </text>
          <text x="211" y="196">
            RESOURCE
          </text>
        </>
      ) : kind === 'conductor' ? (
        <>
          <ellipse
            className="diagram-guide"
            cx="150"
            cy="181"
            rx="113"
            ry="35"
          />
          <path d="m150 43-94 132 94 35 94-35Zm0 0v167M56 175l94-85 94 85M56 175l94-40 94 40M56 175l94-5 94 5" />
          <path className="diagram-accent" d="M150 43v127l94 5-94 35" />
          <circle className="diagram-solid" cx="150" cy="43" r="8" />
          <circle
            className="diagram-accent diagram-motion diagram-pulse"
            cx="150"
            cy="43"
            r="11"
          />
          <circle
            className="diagram-solid diagram-motion diagram-signal"
            cx="150"
            cy="43"
            r="3"
          />
          <circle className="diagram-node" cx="56" cy="175" r="5" />
          <circle className="diagram-node" cx="150" cy="210" r="5" />
          <circle className="diagram-node" cx="244" cy="175" r="5" />
          <text x="134" y="24">
            APP
          </text>
          <text x="35" y="199">
            IAM
          </text>
          <text x="139" y="232">
            SQS
          </text>
          <text x="249" y="199">
            SNS
          </text>
        </>
      ) : (
        <>
          <rect
            className="diagram-node"
            x="30"
            y="28"
            width="240"
            height="184"
            rx="4"
          />
          <path d="M30 52h240" />
          <defs>
            <radialGradient id="terminal-red" cx="35%" cy="25%" r="80%">
              <stop stopColor="#ed7068" />
              <stop offset="1" stopColor="#d95c55" />
            </radialGradient>
            <radialGradient id="terminal-yellow" cx="35%" cy="25%" r="80%">
              <stop stopColor="#e5bc57" />
              <stop offset="1" stopColor="#d2a649" />
            </radialGradient>
            <radialGradient id="terminal-green" cx="35%" cy="25%" r="80%">
              <stop stopColor="#79b87b" />
              <stop offset="1" stopColor="#65a469" />
            </radialGradient>
          </defs>
          <g stroke="#000000" strokeOpacity="0.15" strokeWidth="0.6">
            <circle cx="43" cy="40" r="3.5" fill="url(#terminal-red)" />
            <circle cx="55" cy="40" r="3.5" fill="url(#terminal-yellow)" />
            <circle cx="67" cy="40" r="3.5" fill="url(#terminal-green)" />
          </g>
          <text x="186" y="43">
            resume.pdf
          </text>
          {/* Formatting toolbar */}
          <g className="revise-toolbar">
            <rect
              className="diagram-accent"
              x="40"
              y="59"
              width="11"
              height="11"
              rx="2"
            />
            <text x="43" y="67.5">
              B
            </text>
            <text x="57" y="67.5">
              I
            </text>
            <text x="68" y="67.5">
              U
            </text>
            <path className="diagram-guide" d="M80 59v11" />
            <text x="87" y="67.5">
              Aa
            </text>
            <circle className="diagram-solid" cx="108" cy="64.5" r="2.5" />
          </g>
          {/* The page, edited in place */}
          <rect
            className="diagram-node"
            x="120"
            y="58"
            width="138"
            height="146"
            rx="2"
          />
          <path d="M131 72h58" strokeWidth="2.6" />
          <path className="diagram-guide" d="M131 80h40" />
          <path d="M131 92h114M131 99h104" />
          <path className="diagram-motion revise-type" d="M131 106h114" />
          <path className="diagram-motion revise-wrap" d="M131 113h46" />
          <path
            className="diagram-accent diagram-motion revise-caret"
            d="M131 102v8"
          />
          <g className="diagram-motion revise-reflow">
            <rect x="131" y="124" width="114" height="36" rx="1" />
            <path d="M131 136h114M131 148h114M169 124v36M207 124v36" />
            <path className="diagram-guide" d="M131 172h108M131 179h92" />
          </g>
          <text x="40" y="196">
            PDF IN
          </text>
          <text x="40" y="208">
            PDF OUT
          </text>
        </>
      )}
    </svg>
  );
}
