/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  AlertTriangle, 
  Activity, 
  RotateCw, 
  ShieldAlert, 
  Code, 
  Info,
  Maximize2,
  Minimize2
} from 'lucide-react';

// Types
interface SimulationState {
  mass: number;         // kg
  radius: number;       // m (Hand length / Globe radius)
  inputForce: number;   // N
  area: number;         // mm^2 (Cross-section area of shaft)
  impactTime: number;   // s (Delta t)
  isFullScreen: boolean;
}

const G = 9.81; // Gravity m/s^2
const DROP_HEIGHT = 1; // 1 meter

export default function App() {
  const [state, setState] = useState<SimulationState>({
    mass: 1.2,
    radius: 0.15,
    inputForce: 0.5,
    area: 12.5,
    impactTime: 0.05,
    isFullScreen: false,
  });

  const [rotation, setRotation] = useState(0);

  // Rotation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 6) % 360); // 6 degrees per second for a clock hand
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculations
  const results = useMemo(() => {
    // 1. Torsion (Torque) T = F * r
    const torque = state.inputForce * state.radius;

    // 2. Shear V = P / A (Using Force as P)
    // Area converted to m^2 for standard units
    const areaM2 = state.area * 1e-6;
    const shear = state.inputForce / areaM2;

    // 3. Impact Force F = mv / delta_t
    // v = sqrt(2gh)
    const velocity = Math.sqrt(2 * G * DROP_HEIGHT);
    const impactForce = (state.mass * velocity) / state.impactTime;

    return {
      torque,
      shear,
      impactForce,
      velocity
    };
  }, [state]);

  // Critical Points Logic (Arbitrary threshold for demonstration)
  const criticals = useMemo(() => {
    const list = [];
    if (results.torque > 0.15) {
      list.push({
        id: 'torque-high',
        label: 'Torsion Limit Exceeded',
        desc: 'The central axis may undergo plastic deformation under current radius/force.',
        severity: 'high'
      });
    }
    if (results.shear > 100000) { // 100 kPa
      list.push({
        id: 'shear-high',
        label: 'Critical Shear Stress',
        desc: 'Axis connection point is at risk of fatigue failure.',
        severity: 'med'
      });
    }
    if (results.impactForce > 150) {
      list.push({
        id: 'impact-high',
        label: 'Fatal Impact Energy',
        desc: 'Chassis shell or internal gearing likely to shatter on 1m drop.',
        severity: 'fatal'
      });
    }
    return list;
  }, [results]);

  const exportCode = `
/**
 * Globe Clock Mechanics Model
 * Evaluates stresses on the 'Equator' second hand.
 */
function evaluateGlobeClock(params) {
  const { m, r, F, A, dt } = params;
  const g = 9.81;
  const h = 1.0; // Drop height

  // 1. Torque T = F * r
  const Torque = F * r; 

  // 2. Shear V = P / A
  const Shear = F / A;

  // 3. Impact F = mv / dt
  const v = Math.sqrt(2 * g * h);
  const ImpactForce = (m * v) / dt;

  // Critical Points
  const criticalPoints = [];
  if (Torque > 0.15) criticalPoints.push("AXIS_TORSION_OVERLOAD");
  if (ImpactForce > 150) criticalPoints.push("CHASSIS_SHATTER_RISK");

  return {
    results: { Torque, Shear, ImpactForce },
    criticalPoints
  };
}
  `.trim();

  return (
    <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-sans selection:bg-[#141414] selection:text-white p-4 md:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto border-b border-[#141414] mb-8 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight uppercase italic font-serif">Globe Clock : Design Engineering Assessment</h1>
          <p className="text-sm opacity-60 font-mono mt-1">Status: Modeling Active | TA-ID: NTUT-2024-ARCH</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs font-mono uppercase">Mechanics Lab v1.0.4</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Controls */}
        <section className="lg:col-span-3 space-y-6">
          <div className="border border-[#141414] p-6 bg-white shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
            <div className="flex items-center gap-2 mb-4">
              <Settings size={18} />
              <h2 className="font-bold uppercase text-xs tracking-widest">Parameters (測量變數)</h2>
            </div>
            
            <div className="space-y-4">
              <ParameterInput 
                label="Mass (m)" 
                unit="kg" 
                value={state.mass} 
                min={0.1} 
                max={5} 
                step={0.1} 
                onChange={(v) => setState(s => ({...s, mass: v}))}
              />
              <ParameterInput 
                label="Equator Radius (r)" 
                unit="m" 
                value={state.radius} 
                min={0.05} 
                max={0.5} 
                step={0.01} 
                onChange={(v) => setState(s => ({...s, radius: v}))}
              />
              <ParameterInput 
                label="Rotation Force (F)" 
                unit="N" 
                value={state.inputForce} 
                min={0.1} 
                max={5} 
                step={0.1} 
                onChange={(v) => setState(s => ({...s, inputForce: v}))}
              />
              <ParameterInput 
                label="Shaft Area (A)" 
                unit="mm²" 
                value={state.area} 
                min={1} 
                max={100} 
                step={0.5} 
                onChange={(v) => setState(s => ({...s, area: v}))}
              />
              <ParameterInput 
                label="Impact Time (Δt)" 
                unit="s" 
                value={state.impactTime} 
                min={0.01} 
                max={0.2} 
                step={0.01} 
                onChange={(v) => setState(s => ({...s, impactTime: v}))}
              />
            </div>
          </div>

          <div className="border border-[#141414] p-4 bg-[#141414] text-white">
            <h3 className="font-mono text-[10px] uppercase opacity-60 mb-2">TA Note / 助教筆記</h3>
            <p className="text-xs leading-relaxed italic font-serif">
              "請注意：赤道旋轉環的惯性矩在此模型中簡化。主要評估中軸連接點與掉落衝擊的結構完整性。"
            </p>
          </div>
        </section>

        {/* Center: Visualization & Assessment */}
        <section className="lg:col-span-6 space-y-8">
          {/* Globe Viz */}
          <div className="relative aspect-square border border-[#141414] bg-white flex items-center justify-center overflow-hidden pattern-dots">
            <div className="absolute top-4 left-4 p-2 bg-[#141414] text-white text-[10px] uppercase font-mono tracking-widest flex items-center gap-2">
              <Activity size={12} className="animate-pulse" /> Live Simulation
            </div>
            
            {/* Globe Representation */}
            <motion.div 
              animate={state.isFullScreen ? { y: [0, 400, 380, 400] } : {}}
              transition={{ duration: 0.5, times: [0, 0.8, 0.9, 1] }}
              className="relative w-64 h-64 border-2 border-[#141414] rounded-full flex items-center justify-center bg-white shadow-inner"
            >
              {/* Latitude Lines */}
              <div className="absolute w-full h-[1px] bg-[#141414]/10 rotate-0"></div>
              <div className="absolute w-full h-[1px] bg-[#141414]/10 translate-y-8 scale-x-90"></div>
              <div className="absolute w-full h-[1px] bg-[#141414]/10 -translate-y-8 scale-x-90"></div>
              <div className="absolute w-full h-[1px] bg-[#141414]/10 translate-y-16 scale-x-75"></div>
              <div className="absolute w-full h-[1px] bg-[#141414]/10 -translate-y-16 scale-x-75"></div>
              
              {/* Axis */}
              <div className="absolute h-80 w-[2px] bg-[#141414] rotate-[23.5deg] opacity-80"></div>

              {/* Equator Second Hand */}
              <motion.div 
                animate={{ rotate: rotation }}
                transition={{ duration: 1, ease: "linear" }}
                className="absolute w-[105%] h-[105%] rounded-full border border-[#141414] border-dashed flex items-center justify-start z-20"
                style={{ 
                  transformOrigin: 'center center',
                  transform: 'rotateX(75deg)' // Perspective for equator
                }}
              >
                <div className="w-3 h-3 bg-[#141414] rounded-full -translate-x-1.5 shadow-lg border border-white"></div>
              </motion.div>

              {/* Globe Surface Overlay */}
              <div className="absolute inset-0 rounded-full border border-[#141414]/5 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none"></div>

              {/* Center Connection (Critical Area) */}
              <div className="w-4 h-4 bg-white border border-[#141414] rounded-full z-30 flex items-center justify-center shadow-md">
                <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </motion.div>

            {/* Scale Line */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
               <button 
                 onClick={() => {
                   setState(s => ({...s, isFullScreen: true}));
                   setTimeout(() => setState(s => ({...s, isFullScreen: false})), 1500);
                 }}
                 className="px-3 py-1 bg-[#141414] text-white text-[10px] font-bold uppercase hover:bg-black/80 flex items-center gap-2"
               >
                 <ShieldAlert size={12} /> Test Drop (1m)
               </button>
            </div>

            {/* Scale Line */}
            <div className="absolute bottom-4 right-4 flex flex-col items-end">
              <div className="w-20 h-[1px] bg-[#141414]"></div>
              <span className="text-[10px] font-mono mt-1">SCALE 1:100</span>
            </div>
          </div>

          {/* Assessment Table */}
          <div className="border border-[#141414] overflow-hidden">
            <div className="bg-[#141414] text-white p-2 text-[10px] uppercase font-mono tracking-widest px-4">
              Real-time Analysis (即時力學分析)
            </div>
            <div className="grid grid-cols-3 divide-x divide-[#141414] bg-white">
              <MetricBox 
                label="Torque (T)" 
                value={results.torque.toFixed(4)} 
                unit="N·m" 
                formula="F × r"
                status={results.torque > 0.15 ? 'danger' : 'safe'}
              />
              <MetricBox 
                label="Shear (V)" 
                value={(results.shear / 1000).toFixed(2)} 
                unit="kPa" 
                formula="P / A"
                status={results.shear > 100000 ? 'warning' : 'safe'}
              />
              <MetricBox 
                label="Impact (F_i)" 
                value={results.impactForce.toFixed(1)} 
                unit="N" 
                formula="mv / Δt"
                status={results.impactForce > 150 ? 'danger' : 'safe'}
              />
            </div>
          </div>
        </section>

        {/* Right Sidebar: Critical Points & Code */}
        <section className="lg:col-span-3 space-y-6">
          {/* Critical Points */}
          <div className="border border-[#141414] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(20,20,20,1)]">
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert size={18} />
              <h2 className="font-bold uppercase text-xs tracking-widest">致命點 (Critical Points)</h2>
            </div>
            
            <div className="space-y-3">
              {criticals.length === 0 ? (
                <div className="text-[10px] font-mono text-green-600 uppercase flex items-center gap-2 p-3 border border-green-200 bg-green-50">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div> All Parameters Within Safety Margin
                </div>
              ) : (
                criticals.map(point => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={point.id} 
                    className={`p-3 border flex flex-col gap-1 ${
                      point.severity === 'fatal' ? 'bg-red-50 border-red-500' : 
                      point.severity === 'high' ? 'bg-orange-50 border-orange-500' : 'bg-yellow-50 border-yellow-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                       <AlertTriangle size={14} className={point.severity === 'fatal' ? 'text-red-500' : 'text-orange-500'} />
                       <span className="font-bold text-[10px] uppercase">{point.label}</span>
                    </div>
                    <p className="text-[11px] leading-tight opacity-70 italic">{point.desc}</p>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Export Panel */}
          <div className="border border-[#141414] bg-[#141414] text-white p-6 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code size={18} className="text-[#E4E3E0]" />
                <h2 className="font-bold uppercase text-xs tracking-widest text-[#E4E3E0]">JavaScript Model</h2>
              </div>
            </div>
            <div className="relative group">
              <pre className="text-[9px] font-mono overflow-x-auto p-3 bg-white/5 rounded border border-white/10 max-h-60 scrollbar-hide">
                {exportCode}
              </pre>
              <button 
                onClick={() => navigator.clipboard.writeText(exportCode)}
                className="absolute top-2 right-2 text-[10px] bg-white text-[#141414] px-2 py-1 uppercase font-bold hover:bg-[#E4E3E0] transition-colors"
              >
                Copy
              </button>
            </div>
            <p className="text-[10px] mt-4 opacity-50 italic">
               * The above logic can be integrated into your hardware-software hybrid clock system.
            </p>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto mt-12 pt-4 border-t border-[#141414]/20 flex justify-between items-center text-[10px] font-mono uppercase opacity-40">
        <div>Proprietary Lab Environment // NTUT Design</div>
        <div>Coordinates: 25.0422° N, 121.5355° E</div>
      </footer>

      {/* Floating Info */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-[#141414] text-white rounded-full flex items-center justify-center cursor-help shadow-2xl z-50 transition-transform active:scale-95"
      >
        <Info size={24} />
      </motion.div>
    </div>
  );
}

// Subcomponents
function ParameterInput({ label, unit, value, min, max, step, onChange }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-tight">
        <label className="font-bold opacity-70">{label}</label>
        <span>{value} <span className="opacity-40">{unit}</span></span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-[#141414] cursor-pointer"
      />
    </div>
  );
}

function MetricBox({ label, value, unit, formula, status }: any) {
  const colorClass = status === 'danger' ? 'text-red-600' : status === 'warning' ? 'text-orange-600' : 'text-[#141414]';
  
  return (
    <div className="p-4 flex flex-col items-center justify-center text-center">
      <span className="text-[9px] uppercase font-mono opacity-50 mb-1">{label}</span>
      <div className={`text-2xl font-bold font-mono tracking-tighter ${colorClass}`}>
        {value}
      </div>
      <span className="text-[10px] font-mono mb-2">{unit}</span>
      <div className="mt-auto px-2 py-0.5 bg-[#f0f0f0] border border-[#141414]/10 rounded text-[9px] font-mono opacity-60">
        {formula}
      </div>
    </div>
  );
}
