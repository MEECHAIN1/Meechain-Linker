import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route, Link, useLocation, Router } from "wouter";
import { 
  Cpu, Zap, Trophy, ShoppingBag, Layout, FlaskConical, Coins, 
  Globe, Activity, User, ShieldCheck, ChevronRight, X, Flame, 
  RotateCw, ExternalLink, Package, Star, MessageSquare, TrendingUp, Box
} from 'lucide-react';

// --- CONFIGURATION ---
const CONFIG = {
  CHAIN_ID: "13390",
  NETWORK: "MeeChain Ritual",
  MCB_SYMBOL: "MCB",
  GATEWAY: "tan-familiar-impala-721.mypinata.cloud",
  ADMIN: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
};

// ไอคอนสำหรับการแมปผ่าน MeeIcon component
const ICON_MAP: Record<string, any> = {
  Star,
  ShieldCheck,
  Zap,
  Globe,
  Activity,
  Box,
  Package,
  Trophy,
  ShoppingBag,
  Layout,
  FlaskConical
};

// --- Custom Hook สำหรับ Routing (Preview Compatibility) ---
const useHashLocation = () => {
  const [loc, setLoc] = useState(window.location.hash.replace(/^#/, "") || "/");
  useEffect(() => {
    const handler = () => setLoc(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  const navigate = (to: string) => { window.location.hash = to; };
  return [loc, navigate] as const;
};

/**
 * Stable Icon Component สำหรับดึงไอคอนจากแมปปิ้ง
 */
const MeeIcon = ({ name, size = 20, className = "" }: { name: string, size?: number, className?: string }) => {
  const IconComponent = ICON_MAP[name];
  if (!IconComponent) return <div style={{ width: size, height: size }} className={className} />;
  return <IconComponent size={size} className={className} />;
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [mcbBalance, setMcbBalance] = useState(13390.50);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isFusing, setIsFusing] = useState(false);
  const [fusionSuccess, setFusionSuccess] = useState(false);
  const [selectedCards, setSelectedCards] = useState<any[]>([]);
  
  // Simulated Data - เปลี่ยนจาก nfts เป็น inventory เพื่อความเสถียรในการอ้างอิง
  const [inventoryNfts, setInventoryNfts] = useState([
    { id: 1, name: 'Lotus Guardian', power: 45, rarity: 'Legendary', element: 'Light', color: 'text-yellow-400', image: 'https://api.dicebear.com/7.x/bottts/svg?seed=lotus' },
    { id: 2, name: 'Inferno Core', power: 22, rarity: 'Epic', element: 'Fire', color: 'text-red-500', image: 'https://api.dicebear.com/7.x/bottts/svg?seed=fire' }
  ]);

  const badges = [
    { id: 1, name: 'Early Adopter', icon: 'Star', color: 'text-yellow-400' },
    { id: 2, name: 'Ritual Master', icon: 'ShieldCheck', color: 'text-green-400' }
  ];

  const totalHashrate = useMemo(() => inventoryNfts.reduce((acc, curr) => acc + curr.power, 0), [inventoryNfts]);

  // --- Fusion Ritual Trigger ---
  const triggerFusion = () => {
    if (selectedCards.length < 2) return;
    setIsFusing(true);
    setTimeout(() => {
      setIsFusing(false);
      setFusionSuccess(true);
      // Logic การอัปเกรดจำลอง
      const newCard = {
        id: Date.now(),
        name: 'Elite Guardian X',
        power: Math.floor((selectedCards[0].power + selectedCards[1].power) * 1.4),
        rarity: 'Legendary',
        element: 'Ritual',
        color: 'text-cyan-400',
        image: `https://api.dicebear.com/7.x/bottts/svg?seed=fused-${Date.now()}`
      };
      setInventoryNfts(prev => [newCard, ...prev.filter(c => !selectedCards.find(sc => sc.id === c.id))]);
      setSelectedCards([]);
    }, 4000);
  };

  return (
    <Router hook={useHashLocation}>
      <div className="min-h-screen bg-[#010409] text-slate-200 font-sans selection:bg-cyan-500/30">
        
        {/* Navigation Bar */}
        <nav className="fixed top-0 w-full z-[100] bg-black/60 backdrop-blur-xl border-b border-white/5 h-16 px-6 flex items-center justify-between shadow-2xl">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="bg-cyan-500 p-2 rounded-xl group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all">
              <Cpu className="text-white" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter text-white uppercase italic leading-none">MEECHAIN</span>
              <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest mt-1">Ritual Dashboard Ⓜ</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4 bg-white/5 px-5 py-2 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2">
                <Coins size={14} className="text-yellow-500 animate-pulse" />
                <span className="text-xs font-black text-white italic">{mcbBalance.toLocaleString()} MCB</span>
              </div>
            </div>
            <button className="bg-white text-black px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all">Connect</button>
          </div>
        </nav>

        {/* Fusion Animation Overlay (MeeBot Ritual) */}
        {fusionSuccess && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-2xl animate-in fade-in duration-500 p-6">
            <div className="max-w-md w-full p-10 bg-[#0d1117] rounded-[50px] border border-cyan-500/30 text-center relative overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.2)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse" />
              
              <div className="mb-8 relative flex justify-center">
                 <img src="https://api.dicebear.com/7.x/bottts/svg?seed=meebot-ritual&backgroundColor=06b6d4" className="w-48 h-48 animate-bounce drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]" />
                 <div className="absolute -top-10 bg-[#161b22] px-6 py-3 rounded-2xl border border-cyan-500/20 shadow-xl">
                   <p className="text-xs font-black text-cyan-400 italic">"พิธีกรรมสำเร็จ! พลังใหม่ได้ถือกำเนิดขึ้นแล้ว!"</p>
                 </div>
              </div>

              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">ELITE GUARDIAN X</h2>
              <p className="text-slate-500 text-sm mb-10 leading-relaxed uppercase font-bold tracking-widest">ยูนิตระดับตำนานถูกบันทึกบน <br /> MeeScan Explorer เรียบร้อยแล้ว</p>
              
              <button 
                onClick={() => setFusionSuccess(false)}
                className="w-full py-5 rounded-3xl bg-cyan-500 text-white font-black uppercase tracking-widest hover:bg-white hover:text-cyan-600 transition-all shadow-xl shadow-cyan-500/20"
              >
                Accept New Artifact
              </button>
            </div>
          </div>
        )}

        {/* Main Layout */}
        <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Area */}
          <aside className="lg:w-80 flex flex-col gap-8">
            {/* Admiral Info */}
            <div className="bg-[#0d1117] border border-white/5 rounded-[40px] p-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all" />
               <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-xl">
                    <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center"><User size={24} className="text-cyan-500/50" /></div>
                  </div>
                  <div>
                    <h3 className="font-black text-white italic leading-none uppercase">Thanawat S.</h3>
                    <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-widest mt-1 block">Fleet Admiral</span>
                  </div>
               </div>
               <div className="space-y-4 relative z-10">
                  <div className="bg-black/60 p-4 rounded-2xl border border-white/5 flex justify-between items-center group-hover:border-cyan-500/40 transition-all shadow-inner">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-slate-500 uppercase">Total Hashrate</span>
                      <span className="text-xl font-black text-cyan-400">{totalHashrate} MH/s</span>
                    </div>
                    <Zap size={18} className="text-cyan-500 animate-pulse" />
                  </div>
               </div>
            </div>

            {/* Badges System */}
            <div className="bg-[#0d1117] border border-white/5 rounded-[40px] p-8 shadow-xl">
               <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2 italic leading-none">
                 <Trophy size={14} className="text-yellow-500" /> Earned Badges
               </h4>
               <div className="grid grid-cols-2 gap-4">
                  {badges.map(badge => (
                    <div key={badge.id} className="bg-black/40 p-3 rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:border-cyan-500/30 transition-all shadow-inner">
                       <div className={`p-3 rounded-xl bg-white/5 mb-3 group-hover:scale-110 transition-transform ${badge.color}`}><MeeIcon name={badge.icon} size={20} /></div>
                       <span className="text-[8px] font-black uppercase text-slate-400 tracking-tighter leading-tight">{badge.name}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Network Stats */}
            <div className="bg-[#0d1117] border border-white/5 rounded-[40px] p-8 shadow-xl">
               <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2 italic leading-none">
                 <Globe size={14} className="text-cyan-500" /> Network Metrics
               </h4>
               <div className="space-y-4 font-bold">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-[10px] text-slate-500 uppercase">Block Height</span>
                    <span className="text-[10px] font-mono text-white">#1,288,421</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-[10px] text-slate-500 uppercase">ChainID</span>
                    <span className="text-[10px] font-mono text-cyan-500">{CONFIG.CHAIN_ID}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-500 uppercase">Node Sync</span>
                    <span className="text-[10px] font-black text-green-500 italic uppercase tracking-widest">Healthy</span>
                  </div>
               </div>
            </div>
          </aside>

          {/* Interaction Area */}
          <div className="flex-1 space-y-8">
            <div className="flex p-1.5 bg-[#0d1117] border border-white/5 rounded-3xl w-fit overflow-x-auto shadow-2xl">
              {[
                { id: 'dashboard', label: 'Ecosystem', icon: Layout },
                { id: 'fusion', label: 'Fusion Lab', icon: FlaskConical },
                { id: 'market', label: 'Marketplace', icon: ShoppingBag },
                { id: 'history', label: 'Explorer', icon: Activity }
              ].map(t => (
                <button 
                  key={t.id} 
                  onClick={() => setActiveTab(t.id)} 
                  className={`px-10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === t.id ? 'bg-cyan-500 text-white shadow-xl shadow-cyan-500/30' : 'text-slate-500 hover:text-white'}`}
                >
                  <MeeIcon name={t.icon} size={14} /> {t.label}
                </button>
              ))}
            </div>

            {/* CONTENT AREA */}
            <div className="min-h-[600px]">
              
              {/* TAB: DASHBOARD / ECOSYSTEM */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8 animate-in fade-in duration-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[#0d1117] p-10 rounded-[50px] border border-white/5 relative overflow-hidden group shadow-2xl">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px]" />
                       <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">Mining Performance</h3>
                       <p className="text-slate-500 text-[10px] mb-10 leading-relaxed uppercase font-bold tracking-[0.2em]">Real-time node statistics Ⓜ</p>
                       <div className="flex items-end gap-2 h-32 mb-10">
                          {[40, 65, 45, 90, 85, 40, 60, 75, 55, 95, 100, 80].map((h, i) => (
                            <div key={i} className="flex-1 bg-cyan-500/20 rounded-t-lg transition-all group-hover:bg-cyan-500/40" style={{ height: `${h}%` }} />
                          ))}
                       </div>
                       <button className="w-full py-4 rounded-[28px] bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all">Refresh Node Metrics</button>
                    </div>

                    <div className="bg-[#0d1117] p-10 rounded-[50px] border border-white/5 flex flex-col justify-between relative overflow-hidden shadow-2xl">
                       <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[80px]" />
                       <div>
                         <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2 leading-none">On-Chain Assets</h3>
                         <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-10">Managed on tan-familiar IPFS Hub</p>
                       </div>
                       <div className="space-y-6">
                         <div className="flex justify-between items-center bg-black/40 p-6 rounded-3xl border border-white/5 shadow-inner">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">MFC Cards in Collection</span>
                            <span className="text-3xl font-black text-white leading-none">{inventoryNfts.length}</span>
                         </div>
                         <div className="flex justify-between items-center bg-black/40 p-6 rounded-3xl border border-white/5 shadow-inner">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">IPFS Registry Status</span>
                            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Stable</span>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: FUSION LAB */}
              {activeTab === 'fusion' && (
                <div className="bg-gradient-to-br from-[#0d1117] to-black border border-white/10 rounded-[64px] p-16 relative overflow-hidden shadow-2xl animate-in fade-in duration-700">
                   <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[150px] animate-pulse" />
                   
                   <div className="flex flex-col lg:flex-row items-center justify-center gap-16 relative z-10 mb-20">
                      {[0, 1].map(idx => (
                        <div key={idx} className={`w-64 h-80 rounded-[48px] border-4 border-dashed flex flex-col items-center justify-center transition-all duration-700 relative overflow-hidden hologram-grid shadow-2xl ${selectedCards[idx] ? 'bg-cyan-500/10 border-cyan-400 scale-105 shadow-cyan-500/20' : 'bg-black/60 border-white/10 hover:border-cyan-500/20'}`}>
                           {selectedCards[idx] ? (
                             <div className="relative flex flex-col items-center w-full h-full p-8 animate-in zoom-in duration-500">
                               <img src={selectedCards[idx].image} className="w-40 h-40 animate-float drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]" />
                               <div className="bg-black/80 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 w-full text-center mt-6 shadow-2xl">
                                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 truncate leading-none">{selectedCards[idx].name}</p>
                                  <p className="text-3xl font-black text-cyan-400 tracking-tighter leading-none">+{selectedCards[idx].power} <span className="text-[9px] text-slate-700 font-bold uppercase">MH/s</span></p>
                               </div>
                               <button onClick={() => setSelectedCards(prev => prev.filter((_, i) => i !== idx))} className="absolute -top-3 -right-3 bg-red-500 text-white p-2.5 rounded-full shadow-2xl hover:scale-110 transition-transform"><X size={14} /></button>
                             </div>
                           ) : (
                             <div className="text-center text-slate-800 flex flex-col items-center gap-6"><Package size={56} /><span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 italic">Unit Input {idx+1}</span></div>
                           )}
                        </div>
                      ))}
                      <div className={`bg-cyan-500/20 p-8 rounded-full shadow-2xl transition-all duration-1000 ${isFusing ? 'animate-spin scale-150 bg-cyan-500/40 shadow-cyan-500/30' : 'hover:scale-110'}`}><RotateCw size={48} className="text-cyan-500" /></div>
                   </div>

                   <div className="flex flex-col items-center">
                      <button 
                        onClick={triggerFusion}
                        disabled={selectedCards.length < 2 || isFusing}
                        className={`group px-32 py-8 rounded-[40px] font-black text-2xl transition-all shadow-2xl relative overflow-hidden uppercase tracking-widest ${selectedCards.length === 2 && !isFusing ? 'bg-cyan-500 text-white scale-105 hover:shadow-cyan-500/40 active:scale-95' : 'bg-white/5 text-slate-700 border border-white/5'}`}
                      >
                         <span className="relative z-10 flex items-center gap-4">{isFusing ? <RotateCw className="animate-spin" size={24} /> : <Flame size={24} />}{isFusing ? 'Executing Ritual...' : 'Ignite Fusion'}</span>
                      </button>
                      <p className="mt-8 text-[9px] font-black text-slate-600 uppercase tracking-[0.5em] italic leading-none tracking-widest">Standard Fusion Fee: 100 MCB</p>
                   </div>
                </div>
              )}

              {/* TAB: INVENTORY */}
              {activeTab === 'inventory' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-in zoom-in duration-500">
                  {inventoryNfts.map(nft => (
                    <div key={nft.id} className="bg-[#0d1117] border border-white/5 rounded-[48px] overflow-hidden group hover:border-cyan-500/40 transition-all duration-500 shadow-2xl relative">
                       <div className="absolute top-8 left-8 z-20 flex flex-col gap-2">
                          <span className="text-[9px] font-black px-4 py-1.5 rounded-full border border-white/10 bg-black/60 shadow-xl uppercase italic tracking-widest">{nft.rarity}</span>
                          <span className={`text-[9px] font-black px-4 py-1.5 rounded-full border border-white/5 bg-cyan-500/10 ${nft.color} tracking-widest uppercase italic`}>{nft.element}</span>
                       </div>
                       <div className="aspect-square p-24 flex items-center justify-center relative overflow-hidden group-hover:bg-cyan-500/5 transition-all">
                          <img src={nft.image} className="w-full h-full animate-float drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
                       </div>
                       <div className="p-12 border-t border-white/5 bg-black/40">
                          <div className="flex justify-between items-center mb-8">
                             <h4 className="font-black text-white text-3xl tracking-tighter uppercase italic leading-none">{nft.name}</h4>
                             <div className="text-right leading-none"><span className="text-cyan-400 font-black text-3xl leading-none">+{nft.power}</span><p className="text-[10px] text-slate-600 font-black uppercase mt-1">MH/s Power</p></div>
                          </div>
                          <button onClick={() => { setSelectedCards(prev => [...prev, nft]); setActiveTab('fusion'); }} className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-[11px] font-black text-slate-400 hover:text-white transition-all flex items-center justify-center gap-3 uppercase italic tracking-widest group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 shadow-inner">
                             <FlaskConical size={16} /> Load into Fusion Lab
                          </button>
                       </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Placeholder for other tabs */}
              {(activeTab === 'market' || activeTab === 'history') && (
                <div className="bg-[#0d1117] border border-white/5 rounded-[48px] p-24 text-center animate-in fade-in shadow-2xl">
                    <div className="inline-flex p-8 bg-white/5 rounded-[40px] mb-8 border border-white/10 shadow-inner">
                       <MeeIcon name="Box" size={80} className="text-slate-800" />
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic leading-none uppercase">{activeTab} Pending</h3>
                    <p className="text-slate-500 max-w-sm mx-auto text-xs font-bold leading-relaxed uppercase tracking-widest italic leading-relaxed">
                       "การเชื่อมต่อระบบจัดการหลังบ้านกำลังดำเนินการผ่าน Node 13390 เพื่อดึงข้อมูลสถานะล่าสุด"
                    </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Global Footer Hub */}
        <div className="fixed bottom-10 left-10 hidden md:flex items-center gap-8 bg-black/95 backdrop-blur-2xl border border-white/10 px-10 py-5 rounded-full z-50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/5">
            <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em] mb-1 italic leading-none tracking-widest">Admiral Authority</span>
                <span className="text-[12px] font-black text-white tracking-tight uppercase font-mono leading-none tracking-tighter italic">{CONFIG.ADMIN.slice(0, 6)}...{CONFIG.ADMIN.slice(-4)}</span>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="flex items-center gap-4">
                <Globe size={18} className="text-cyan-500 animate-pulse" />
                <span className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.2em] font-mono leading-none tracking-tighter italic">IPFS: tan-familiar ACTIVE</span>
            </div>
            <div className="h-2.5 w-2.5 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-pulse" />
        </div>
      </div>
    </Router>
  );
}