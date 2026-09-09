import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import {
  CloudRain,
  Activity,
  BrainCircuit,
  Database,
  BarChart3,
  Layers3,
  ShieldCheck,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  CloudSun,
  Gauge,
  Leaf,
  Droplets
} from "lucide-react";

import "./styles.css";

/* =========================================================
   MONSOON REGIMES
========================================================= */

const regimes = {
  Active: {
    factor: 1.16,
    desc: "High-rainfall monsoon phase with stronger moisture convergence.",
    advice:
      "Prioritize flood monitoring, drainage capacity and reservoir inflow alerts.",
    color: "green"
  },

  Break: {
    factor: 0.78,
    desc: "Reduced-rainfall phase within the monsoon season.",
    advice: "Monitor dry spells and irrigation requirements.",
    color: "gold"
  },

  Onset: {
    factor: 1.06,
    desc: "Monsoon establishment and transition phase.",
    advice:
      "Track rainfall persistence and update agricultural planning.",
    color: "blue"
  },

  Withdrawal: {
    factor: 0.9,
    desc: "Monsoon withdrawal and seasonal transition phase.",
    advice:
      "Expect decreasing rainfall and changing rainfall distribution.",
    color: "purple"
  }
};

/* =========================================================
   DEMO REGIME CLASSIFIER
========================================================= */

function classify(rainfall, humidity, wind, pressure) {
  let score = 0;

  if (rainfall >= 30) {
    score += 3;
  } else if (rainfall >= 15) {
    score += 2;
  } else if (rainfall >= 5) {
    score += 1;
  }

  if (humidity >= 85) {
    score += 2;
  } else if (humidity >= 70) {
    score += 1;
  }

  if (wind >= 20) {
    score += 1;
  }

  if (pressure <= 1002) {
    score += 2;
  } else if (pressure <= 1008) {
    score += 1;
  }

  if (score >= 7) {
    return "Active";
  }

  if (score <= 2) {
    return rainfall < 6 && humidity < 70
      ? "Withdrawal"
      : "Break";
  }

  if (rainfall < 8 && humidity < 72) {
    return "Withdrawal";
  }

  return "Onset";
}

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  const [mobile, setMobile] = useState(false);

  const [values, setValues] = useState({
    forecast: 25,
    historical: 32,
    humidity: 82,
    wind: 18,
    pressure: 1004
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  /* Update input values */

  const updateValue = (key, value) => {
    setValues((previous) => ({
      ...previous,
      [key]: value
    }));
  };

  /* =========================================================
     RUN AI CORRECTION
  ========================================================= */

  const runCorrection = () => {
    setLoading(true);

    setTimeout(() => {
      const forecast = Number(values.forecast);
      const historical = Number(values.historical);
      const humidity = Number(values.humidity);
      const wind = Number(values.wind);
      const pressure = Number(values.pressure);

      const regime = classify(
        historical,
        humidity,
        wind,
        pressure
      );

      const config = regimes[regime];

      let environmentalFactor = 1;

      if (humidity >= 85) {
        environmentalFactor += 0.035;
      }

      if (pressure <= 1000) {
        environmentalFactor += 0.03;
      }

      const corrected = Math.max(
        0,
        forecast * config.factor * environmentalFactor
      );

      const beforeError = Math.abs(forecast - historical);

      const afterError = Math.abs(
        corrected - historical
      );

      const improvement =
        beforeError === 0
          ? 0
          : Math.max(
              0,
              Math.min(
                100,
                ((beforeError - afterError) /
                  beforeError) *
                  100
              )
            );

      setResult({
        regime,
        corrected: corrected.toFixed(2),
        before: beforeError.toFixed(2),
        after: afterError.toFixed(2),
        improvement: improvement.toFixed(1),
        old: forecast.toFixed(2),
        historical: historical.toFixed(2)
      });

      setLoading(false);
    }, 650);
  };

  /* Maximum chart value */

  const max = Math.max(
    Number(values.forecast),
    Number(values.historical),
    result ? Number(result.corrected) : 0,
    1
  );

  /* Navigation */

  const navigate = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth"
      });

    setMobile(false);
  };

  return (
    <div className="app">

      {/* Background effects */}

      <div className="glow g1"></div>
      <div className="glow g2"></div>

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={
          mobile
            ? "sidebar open"
            : "sidebar"
        }
      >

        <div className="brand">

          <div className="logo">
            <CloudRain size={21} />
          </div>

          <div>
            <b>
              MONSOON<span>AI</span>
            </b>

            <small>
              Forecast Intelligence
            </small>
          </div>

        </div>

        <nav>

          {[
            ["overview", "Overview", Activity],
            [
              "correction",
              "AI Correction",
              BrainCircuit
            ],
            [
              "pipeline",
              "AI Pipeline",
              Layers3
            ],
            [
              "impact",
              "Impact",
              BarChart3
            ],
            [
              "research",
              "Research",
              Database
            ]
          ].map(([id, title, Icon]) => (

            <button
              key={id}
              onClick={() => navigate(id)}
            >
              <Icon size={16} />
              {title}
            </button>

          ))}

        </nav>

        <div className="side-bottom">

          <div className="project">

            <small>
              SMART INDIA HACKATHON 2025
            </small>

            <strong>
              SIH26080
            </strong>

            <p>
              Regime Aware AI Post Processing
              of Monsoon Rainfall Forecasts
            </p>

          </div>

          <div className="team">
            <i></i>
            Team Avengers
          </div>

        </div>

      </aside>

      {/* =====================================================
          MOBILE BAR
      ===================================================== */}

      <div className="mobilebar">

        <button
          onClick={() =>
            setMobile(!mobile)
          }
        >
          {mobile ? (
            <X />
          ) : (
            <Menu />
          )}
        </button>

        <b>
          MONSOON<span>AI</span>
        </b>

        <em>
          ● ONLINE
        </em>

      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main>

        {/* ===================================================
            OVERVIEW
        =================================================== */}

        <header
          id="overview"
          className="top"
        >

          <div>

            <div className="kicker">
              <i></i>
              SMART INDIA HACKATHON · SOFTWARE
            </div>

            <h1>
              Monsoon forecast,
              <br />
              <em>
                made intelligent.
              </em>
            </h1>

            <p>
              A regime-aware AI post-processing
              layer that corrects rainfall forecasts
              according to the active monsoon condition.
            </p>

          </div>

          <div className="online">
            <i></i>
            Prototype online
          </div>

        </header>

        {/* ===================================================
            HERO
        =================================================== */}

        <section className="hero">

          <div className="hero-copy">

            <small>
              FORECAST INTELLIGENCE / 01
            </small>

            <h2>
              From raw forecast
              <br />
              to{" "}
              <strong>
                decision-ready rainfall.
              </strong>
            </h2>

            <p>
              Identify the monsoon regime,
              apply a regime-specific correction,
              and compare the result against
              historical rainfall.
            </p>

            <div className="actions">

              <button
                onClick={() =>
                  navigate("correction")
                }
                className="primary"
              >
                Run correction
                <ArrowRight size={17} />
              </button>

              <button
                onClick={() =>
                  navigate("pipeline")
                }
                className="ghost"
              >
                Explore pipeline
              </button>

            </div>

            <div className="hero-stats">

              <div>
                <b>04</b>
                <span>
                  Monsoon regimes
                </span>
              </div>

              <div>
                <b>06</b>
                <span>
                  Validation metrics
                </span>
              </div>

              <div>
                <b>01</b>
                <span>
                  Post-processing layer
                </span>
              </div>

            </div>

          </div>

          <div className="visual">

            <div className="orb o1"></div>
            <div className="orb o2"></div>

            <div className="cloud">
              <CloudRain size={150} />
            </div>

            <div className="drops">
              ╲ ╲ ╲ ╲ ╲
            </div>

            <div className="visual-caption">

              <small>
                MONSOON STATE
              </small>

              <b>
                AI AWARE
              </b>

            </div>

          </div>

        </section>

        {/* ===================================================
            AI CORRECTION
        =================================================== */}

        <section
          id="correction"
          className="dash"
        >

          {/* INPUT PANEL */}

          <div className="panel input">

            <Head
              n="02"
              title="Forecast Input"
              right="MM / DAY"
            />

            <Field
              label="Forecast rainfall"
              val={values.forecast}
              on={(value) =>
                updateValue(
                  "forecast",
                  value
                )
              }
              unit="mm"
            />

            <Field
              label="Recent / historical rainfall"
              val={values.historical}
              on={(value) =>
                updateValue(
                  "historical",
                  value
                )
              }
              unit="mm"
            />

            <div className="tw">

              <Field
                label="Humidity"
                val={values.humidity}
                on={(value) =>
                  updateValue(
                    "humidity",
                    value
                  )
                }
                unit="%"
              />

              <Field
                label="Wind speed"
                val={values.wind}
                on={(value) =>
                  updateValue(
                    "wind",
                    value
                  )
                }
                unit="km/h"
              />

            </div>

            <Field
              label="Surface pressure"
              val={values.pressure}
              on={(value) =>
                updateValue(
                  "pressure",
                  value
                )
              }
              unit="hPa"
            />

            <button
              className="run"
              onClick={runCorrection}
              disabled={loading}
            >

              <Sparkles size={16} />

              {loading
                ? "Analyzing..."
                : "Run AI correction"}

              <ArrowRight size={17} />

            </button>

            <div className="note">

              <span>i</span>

              Prototype mode.
              Replace the transparent demo
              classifier with trained HMM/clustering
              and correction models.

            </div>

          </div>

          {/* CORRECTED FORECAST */}

          <div className="panel forecast">

            <Head
              n="03"
              title="Corrected Forecast"
              right="● LIVE RESULT"
            />

            <div className="number">

              {result
                ? result.corrected
                : "—"}

              <small>
                mm/day
              </small>

            </div>

            <p>
              AI-adjusted rainfall estimate
            </p>

            <Bars
              result={result}
              max={max}
            />

          </div>

          {/* REGIME */}

          <div className="panel regime">

            <Head
              n="04"
              title="Detected Regime"
              right="AI CLASSIFIER"
            />

            <div
              className={
                "badge " +
                (result
                  ? regimes[result.regime]
                      .color
                  : "")
              }
            >
              {result
                ? result.regime.toUpperCase()
                : "WAITING"}
            </div>

            <h2>
              {result
                ? result.regime
                : "Run analysis"}
            </h2>

            <p>
              {result
                ? regimes[result.regime].desc
                : "Your detected monsoon condition will appear here."}
            </p>

            <div className="track">

              <i
                style={{
                  width: result
                    ? {
                        Break: "22%",
                        Onset: "48%",
                        Active: "75%",
                        Withdrawal:
                          "91%"
                      }[
                        result.regime
                      ]
                    : "8%"
                }}
              ></i>

            </div>

            <div className="scale">

              <span>Break</span>
              <span>Onset</span>
              <span>Active</span>
              <span>Withdrawal</span>

            </div>

          </div>

          {/* ERROR REDUCTION */}

          <div className="panel error">

            <Head
              n="05"
              title="Error Reduction"
            />

            <div className="percent">

              {result
                ? result.improvement
                : "—"}

              <small>%</small>

            </div>

            <p>
              Estimated absolute-error reduction
              versus the historical reference.
            </p>

            <div className="stats">

              <div>
                <span>Before</span>
                <b>
                  {result
                    ? result.before
                    : "—"}
                </b>
              </div>

              <div>
                <span>After</span>
                <b>
                  {result
                    ? result.after
                    : "—"}
                </b>
              </div>

            </div>

          </div>

          {/* DECISION SUPPORT */}

          <div className="panel advice">

            <Head
              n="06"
              title="Decision Support"
              right="ACTION"
            />

            <div className="advice-icon">
              <ArrowRight />
            </div>

            <h3>
              {result
                ? `${result.regime} conditions detected`
                : "Awaiting regime"}
            </h3>

            <p>
              {result
                ? regimes[result.regime].advice
                : "Run the AI correction to generate an operational recommendation."}
            </p>

            <small>
              Prototype result · local browser
              calculation
            </small>

          </div>

        </section>

        {/* ===================================================
            SYSTEM ARCHITECTURE
        =================================================== */}

        <section
          id="pipeline"
          className="section"
        >

          <SectionHead
            n="07"
            eyebrow="SYSTEM ARCHITECTURE"
            title="How the intelligence flows"
            sub="A modular architecture based on the technical approach in the SIH proposal."
          />

          <div className="pipeline">

            {[
              [
                "01",
                "INPUT",
                "Forecast + Weather",
                "Rainfall forecasts and past weather observations.",
                CloudSun
              ],

              [
                "02",
                "REGIME",
                "HMM / Clustering",
                "Identify Active, Break, Onset or Withdrawal.",
                BrainCircuit
              ],

              [
                "03",
                "AI MODEL",
                "CNN / U-Net / LightGBM",
                "Generate regime-specific forecast corrections.",
                Activity
              ],

              [
                "04",
                "CALIBRATION",
                "Quantile Mapping",
                "Improve rainfall prediction reliability.",
                GaugeIcon
              ],

              [
                "05",
                "OUTPUT",
                "Decision-ready forecast",
                "Validated rainfall estimate for action.",
                ShieldCheck
              ]
            ].map(
              (
                [number, key, title, description, Icon],
                index
              ) => (

                <React.Fragment key={number}>

                  <div
                    className={
                      "node " +
                      (index === 1
                        ? "hi"
                        : "")
                    }
                  >

                    <div className="nodeicon">
                      <Icon size={18} />
                    </div>

                    <small>
                      {key}
                    </small>

                    <h3>
                      {title}
                    </h3>

                    <p>
                      {description}
                    </p>

                  </div>

                  {index < 4 && (
                    <ArrowRight className="connector" />
                  )}

                </React.Fragment>

              )
            )}

          </div>

        </section>

        {/* ===================================================
            IMPACT
        =================================================== */}

        <section
          id="impact"
          className="section impact-section"
        >

          <div>

            <SectionHead
              n="08"
              eyebrow="IMPACT"
              title="Why it matters"
              sub="Benefits identified in the proposal."
            />

            <div className="impact-grid">

              {[
                [
                  Droplets,
                  "Flood & drought",
                  "Better early-warning support and reduced weather-related risk."
                ],

                [
                  Leaf,
                  "Agriculture",
                  "More useful rainfall information for farming decisions."
                ],

                [
                  GaugeIcon,
                  "Water planning",
                  "Improved reservoir and water-resource planning."
                ],

                [
                  ShieldCheck,
                  "Sustainable use",
                  "Supports better water management and resource use."
                ]
              ].map(
                ([Icon, title, description]) => (

                  <article key={title}>

                    <Icon />

                    <h3>
                      {title}
                    </h3>

                    <p>
                      {description}
                    </p>

                  </article>

                )
              )}

            </div>

          </div>

          {/* RESEARCH STACK */}

          <div className="stack">

            <small>
              DATA & VALIDATION
            </small>

            <h2>
              Research stack
            </h2>

            {[
              [
                "Rainfall",
                "IMD Gridded Rainfall"
              ],

              [
                "Atmosphere",
                "ERA5 Reanalysis"
              ],

              [
                "Climate indices",
                "MJO / ENSO"
              ],

              [
                "Metrics",
                "RMSE · Bias · CRPS"
              ],

              [
                "Verification",
                "ETS · POD · FAR"
              ]
            ].map(
              ([name, value]) => (

                <div
                  className="stackrow"
                  key={name}
                >

                  <span>
                    {name}
                  </span>

                  <b>
                    {value}
                  </b>

                </div>

              )
            )}

          </div>

        </section>

        {/* ===================================================
            RESEARCH
        =================================================== */}

        <section
          id="research"
          className="section"
        >

          <SectionHead
            n="09"
            eyebrow="FEASIBILITY + RESEARCH GAP"
            title="Built to scale"
            sub="The prototype mirrors the implementation and viability direction described in the idea document."
          />

          <div className="research">

            {[
              [
                "DATA FEASIBILITY",
                "Available datasets",
                "IMD, ERA5 and forecast data are identified as training and validation sources."
              ],

              [
                "OPERATIONAL VIABILITY",
                "Post-processing layer",
                "Can work on existing forecasts, begin in one region and scale to India."
              ],

              [
                "RISK MITIGATION",
                "Adaptive model",
                "Augment rare regimes, use probabilistic classification and periodically retrain."
              ],

              [
                "RESEARCH GAP",
                "Regime-specific correction",
                "The differentiator is applying different corrections for different monsoon regimes."
              ]
            ].map(
              ([category, title, description]) => (

                <article key={category}>

                  <small>
                    {category}
                  </small>

                  <h3>
                    {title}
                  </h3>

                  <p>
                    {description}
                  </p>

                </article>

              )
            )}

          </div>

        </section>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <footer>

          <b>
            MONSOON<span>AI</span>
          </b>

          <span>
            SIH26080 · Team Avengers · Smart Automation
          </span>

        </footer>

      </main>

    </div>
  );
}

/* =========================================================
   HEADER COMPONENT
========================================================= */

function Head({ n, title, right }) {
  return (
    <div className="head">

      <div>

        <i>
          {n}
        </i>

        <h3>
          {title}
        </h3>

      </div>

      {right && (
        <small>
          {right}
        </small>
      )}

    </div>
  );
}

/* =========================================================
   INPUT FIELD COMPONENT
========================================================= */

function Field({
  label,
  val,
  on,
  unit
}) {
  return (
    <label className="field">

      <span>
        {label}
      </span>

      <div>

        <input
          type="number"
          value={val}
          onChange={(event) =>
            on(event.target.value)
          }
        />

        <em>
          {unit}
        </em>

      </div>

    </label>
  );
}

/* =========================================================
   BAR CHART COMPONENT
========================================================= */

function Bars({
  result,
  max
}) {
  const rows = result
    ? [
        [
          "Original",
          Number(result.old)
        ],
        [
          "Corrected",
          Number(result.corrected)
        ],
        [
          "Historical",
          Number(result.historical)
        ]
      ]
    : [];

  return (
    <div className="bars">

      {rows.map(
        ([title, value]) => (

          <div key={title}>

            <span>
              {title}
            </span>

            <i>

              <b
                style={{
                  width: `${Math.min(
                    100,
                    (value / max) *
                      100
                  )}%`
                }}
              ></b>

            </i>

            <strong>
              {value.toFixed(1)}
            </strong>

          </div>

        )
      )}

    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHead({
  n,
  eyebrow,
  title,
  sub
}) {
  return (
    <div className="sectionhead">

      <i>
        {n}
      </i>

      <div>

        <small>
          {eyebrow}
        </small>

        <h2>
          {title}
        </h2>

        <p>
          {sub}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   GAUGE ICON
========================================================= */

function GaugeIcon(props) {
  return (
    <Gauge {...props} />
  );
}

/* =========================================================
   REACT ROOT
========================================================= */

const root =
  createRoot(
    document.getElementById("root")
  );

root.render(
  <App />
);