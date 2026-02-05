import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Switch, Route, Link, useLocation, Router } from "wouter";
import { 
  Layout, 
  Wallet, 
  ShieldCheck, 
  Coins, 
  Trophy, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  ExternalLink, 
  Zap, 
  Globe, 
  Clock, 
  Power, 
  Database, 
  User, 
  Star, 
  ChevronRight, 
  Plus, 
  FlaskConical, 
  ArrowRight, 
  Flame, 
  RotateCw, 
  Link2, 
  Copy, 
  FileCode, 
  Shield,
  Box,
  Package
} from 'lucide-react';

/** * --- CONFIGURATION ---
 * ข้อมูลสัญญาที่คุณธณวัฒน์ให้มา
 */
const CONFIG = {
  MCB_REAL: "0x8da6eb1cd5c0c8cf84bd522ab7c11747db1128c9",
  MCB_TEST: "0x45b6c114287f465597262d7981c4d29914a2a579",
  RPC_URL: "https://magical-tiniest-asphalt.bsc.quiknode.pro/693493f97361406dad8b5a3baaba121e0b6e9361/",
  ADMIN_ADDRESS: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
};

/**
 * --- MOCK WEB3 LAYER ---
 * จำลองการดึงยอดเงินสำหรับแสดงผลในระบบ Preview
 */
const useAccount = () => ({ 
  address: CONFIG.ADMIN_ADDRESS, 
  isConnected: true 
});

const formatUnits = (val: any, decimals: number) => (Number(val) / 10**decimals).toString();

const useMcbBalance = (contractAddr: string) => {
  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // จำลองยอดเงิน 250 และ 50 MCB
      setBalance(contractAddr === CONFIG.MCB_REAL ? "250000000000000000000" : "50000000000000000000");
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [contractAddr]);

  return { data: balance, isLoading: loading };
};

/**
 * --- Custom Hook สำหรับ Hash-based Routing ---
 */
const useHashLocation = () => {
  const [loc, setLoc] = useState(window.location.hash.replace(/^#/, "") || "/");
  useEffect(() => {
    const handler = () => setLoc(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  const navigate = useCallback((to: string) => { window.location.hash = to; }, []);
  return [loc, navigate] as const;
};

// --- Dashboard Component ---
const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState('mining');
  const [isMining, setIsMining] = useState(false);
  
  const { data: realBalanceRaw, isLoading: loadingReal } = useMcbBalance(CONFIG.MCB_REAL);
  const { data: testBalanceRaw, isLoading: loadingTest } = useMcbBalance(CONFIG.MCB_TEST);

  const formattedRealBalance = useMemo(() => parseFloat(formatUnits(realBalanceRaw, 18)).toFixed(2), [realBalanceRaw]);
  const formattedTestBalance = useMemo(() => parseFloat(formatUnits(testBalanceRaw, 18)).toFixed(2), [testBalanceRaw]);

  const [nfts] = useState([
    { id: 1, name: 'Starter Bot Alpha', power: 12, rarity: 'Common', image: 'https://api.dicebear.com/7.x/bottts/svg?seed=alpha' },
    { id: 2, name: 'Starter Bot Beta', power: 15, rarity: 'Common', image: 'https://api.dicebear.com/7.x/bottts/svg?seed=beta' },
  ]);

  const totalPower = useMemo(() => nfts.reduce((sum, n) => sum + n.power, 0), [nfts]);

  const copyToClipboard = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar สถิติและกระเป๋าเงิน */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0f0f0f] border border-white/5 rounded-[40px] p-8 relative overflow-hidden shadow-2xl group transition-all hover:border-primary/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all" />
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
                <User size={32} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white leading-tight">
                  {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "Disconnected"}
                </h2>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {isConnected ? "Verified Miner" : "Please Connect Wallet"}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-black/60 p-5 rounded-3xl border border-white/5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Real MCB Balance</span>
                  {loadingReal && <RotateCw size={10} className="animate-spin text-primary" />}
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-black text-primary">{formattedRealBalance}</span>
                  <span className="text-xs text-slate-500 mb-1 font-bold">MCB</span>
                </div>
              </div>
              <div className="bg-black/60 p-5 rounded-3xl border border-white/5">
                <div className="flex justify-between items-center mb-3 text-cyan-500 font-bold">
                  <span className="text-[9px] uppercase tracking-widest">MeeChain Test MCB</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-black text-cyan-400">{formattedTestBalance}</span>
                  <span className="text-xs text-slate-500 mb-1 font-bold">MCB</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0f0f0f] border border-white/5 rounded-[40px] p-8 shadow-xl transition-all hover:border-primary/20">
            <h3 className="text-xs font-black text-white mb-6 flex items-center gap-2 uppercase tracking-widest italic">
              <FileCode size={14} className="text-primary" /> Contract Registry
            </h3>
            <div className="space-y-4">
              <div className="group cursor-pointer" onClick={() => copyToClipboard(CONFIG.MCB_REAL)}>
                <p className="text-[9px] text-slate-500 font-black uppercase mb-1">Mainnet Address</p>
                <div className="bg-black/50 p-3 rounded-xl border border-white/5 group-hover:border-primary/30 transition-all flex justify-between items-center overflow-hidden">
                  <span className="text-[10px] font-mono text-slate-400 truncate pr-4">{CONFIG.MCB_REAL}</span>
                  <Copy size={12} className="text-slate-600 group-hover:text-primary transition-colors" />
                </div>
              </div>
              <div className="group cursor-pointer" onClick={() => copyToClipboard(CONFIG.MCB_TEST)}>
                <p className="text-[9px] text-cyan-500 font-black uppercase mb-1">Testnet Address</p>
                <div className="bg-black/50 p-3 rounded-xl border border-white/5 group-hover:border-cyan-500/30 transition-all flex justify-between items-center overflow-hidden">
                  <span className="text-[10px] font-mono text-slate-400 truncate pr-4">{CONFIG.MCB_TEST}</span>
                  <Copy size={12} className="text-slate-600 group-hover:text-cyan-500 transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ส่วนเนื้อหาหลัก */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex p-1.5 bg-[#0f0f0f] border border-white/5 rounded-2xl w-fit overflow-x-auto shadow-2xl">
            {[
              { id: 'mining', label: 'Mining', icon: Zap },
              { id: 'inventory', label: 'Inventory', icon: Layout },
              { id: 'fusion', label: 'Fusion Lab', icon: FlaskConical }
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)} 
                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === tab.id ? 'bg-primary text-white shadow-xl' : 'text-slate-500 hover:text-slate-200'}`}
              >
                <tab.icon size={14} /> {tab.label}
              </button>
            ))}
          </div>

          {/* แผงขุดเหรียญ */}
          {activeTab === 'mining' && (
            <div className="bg-[#0f0f0f] border border-white/5 rounded-[48px] p-10 animate-in fade-in duration-700 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[120px]" />
               <div className="flex justify-between items-center mb-16 relative z-10">
                  <div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">MEE Engine v3.0</h3>
                    <p className="text-xs text-slate-500 mt-2 font-mono tracking-widest uppercase">Target: MCB On-Chain Rewards</p>
                  </div>
                  <button onClick={() => setIsMining(!isMining)} className={`px-14 py-5 rounded-[28px] font-black text-sm flex items-center gap-3 transition-all shadow-2xl ${isMining ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-primary text-white shadow-primary/20 hover:scale-105'}`}>
                    <Power size={20} /> {isMining ? 'STOP MINING' : 'ACTIVATE ENGINE'}
                  </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="bg-black/60 p-12 rounded-[48px] border border-white/5 text-center group">
                    <div className={`p-8 rounded-full mx-auto mb-8 w-24 h-24 flex items-center justify-center transition-all ${isMining ? 'bg-primary/20 text-primary animate-pulse' : 'bg-slate-900 text-slate-700'}`}>
                       <Zap size={48} />
                    </div>
                    <h4 className="text-7xl font-black text-white tracking-tighter leading-none">{isMining ? `${totalPower} MH/s` : "OFFLINE"}</h4>
                    <p className="text-[10px] text-slate-500 mt-6 uppercase font-black tracking-[0.3em]">Fleet Mining Power</p>
                  </div>
                  <div className="bg-black/60 p-12 rounded-[48px] border border-white/5 text-center group">
                    <div className={`p-8 rounded-full mx-auto mb-8 w-24 h-24 bg-cyan-500/10 text-cyan-400 flex items-center justify-center`}>
                       <Coins size={48} />
                    </div>
                    <h4 className="text-5xl font-black text-white tracking-tighter leading-none">{formattedTestBalance}</h4>
                    <p className="text-[10px] text-slate-500 mt-6 uppercase font-black tracking-[0.3em]">MCB Total Balance</p>
                  </div>
               </div>
            </div>
          )}

          {/* ส่วน Placeholder หากไม่ได้เลือก Mining */}
          {activeTab !== 'mining' && (
            <div className="bg-[#0f0f0f] border border-white/5 rounded-[48px] p-20 text-center animate-in fade-in shadow-inner">
              <Package size={48} className="mx-auto text-slate-800 mb-6" />
              <p className="text-slate-500 font-black uppercase tracking-widest text-lg">System Hub Active</p>
              <p className="text-xs text-slate-600 mt-2 italic font-mono">Blockchain Interface: {CONFIG.RPC_URL.slice(0, 30)}...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Navigation ---
const NavigationWrapper = () => (
  <nav className="fixed top-0 w-full z-[100] bg-black/60 backdrop-blur-xl border-b border-white/5 px-6 h-16 flex items-center justify-between">
    <Link href="/" className="flex items-center gap-2 cursor-pointer group">
      <div className="bg-primary p-1.5 rounded-lg group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
        <Cpu className="text-white" size={20} />
      </div>
      <span className="font-black text-white italic tracking-tighter uppercase text-xl">MEECHAIN</span>
    </Link>
    <div className="flex gap-8">
      <Link href="/" className="text-[10px] font-black text-white uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">
        Home
      </Link>
      <Link href="/dashboard" className="text-[10px] font-black text-white uppercase tracking-widest hover:text-primary transition-colors cursor-pointer">
        Dashboard
      </Link>
    </div>
  </nav>
);

// --- Home View ---
const Home = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#010101] text-center p-6 pt-24 overflow-hidden relative">
    <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
    <div className="z-10 max-w-4xl animate-in fade-in duration-1000">
      <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-5 py-2 rounded-full text-primary text-[10px] font-black mb-10 animate-pulse tracking-[0.3em] uppercase">
        <ShieldCheck size={12} /> Unit Integration System Active
      </div>
      <h1 className="text-6xl md:text-[140px] font-black text-white tracking-tighter mb-10 leading-[0.8] uppercase italic drop-shadow-2xl">
        The Real <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-cyan-300">Artifacts</span>
      </h1>
      <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed mb-16 px-4 italic">
        "ยกระดับการขุดด้วยยูนิตที่หลอมรวมจากกิจกรรมของคุณ <br /> มั่นคงและตรวจสอบได้ผ่านระบบนิเวศ MeeChain"
      </p>
      <Link 
        href="/dashboard" 
        className="bg-primary text-white px-20 py-8 rounded-[40px] font-black shadow-[0_20px_50px_rgba(6,182,212,0.4)] hover:scale-105 hover:bg-white hover:text-primary transition-all text-xl uppercase tracking-widest inline-block cursor-pointer"
      >
        Connect to Fleet
      </Link>
    </div>
  </div>
);

// --- Root Application ---
export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] font-sans text-slate-200 antialiased selection:bg-primary/30">
      <Router hook={useHashLocation}>
        <NavigationWrapper />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={() => (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
              <div className="p-8 bg-red-500/10 rounded-full mb-8">
                <Box size={64} className="text-red-500" />
              </div>
              <h2 className="text-4xl font-black text-white mb-4 uppercase italic">404 - LOST IN BLOCKCHAIN</h2>
              <p className="text-slate-500 uppercase tracking-widest mb-10">Coordinates not found in MeeChain Ledger</p>
              <Link href="/" className="text-primary hover:underline uppercase font-bold text-xs cursor-pointer tracking-widest decoration-2 underline-offset-8">Return to Mainnet</Link>
            </div>
          )} />
        </Switch>
      </Router>

      {/* Global Status Bar */}
      <div className="fixed bottom-10 left-10 hidden md:flex items-center gap-8 bg-black/95 backdrop-blur-2xl border border-white/10 px-10 py-5 rounded-full z-50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-white/5">
         <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em] mb-1 italic leading-none">Admiral Unit</span>
            <span className="text-[12px] font-black text-white tracking-tight uppercase font-mono leading-none">0xf39F...266</span>
         </div>
         <div className="h-8 w-[1px] bg-white/10" />
         <div className="flex items-center gap-4">
            <Globe size={18} className="text-primary animate-pulse" />
            <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em] font-mono leading-none tracking-tighter">QUIKNODE ACTIVE</span>
         </div>
         <div className="h-2 w-2 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-pulse" />
      </div>
    </div>
  );
}