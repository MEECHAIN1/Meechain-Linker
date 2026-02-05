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
  Server,
  Database,
  MessageSquare,
  TrendingUp,
  Box,
  Menu,
  X,
  User,
  Star,
  ChevronRight,
  Plus
} from 'lucide-react';

// --- Custom Hook สำหรับ Hash-based Routing (แก้ปัญหา SecurityError ในระบบ Preview) ---
const useHashLocation = () => {
  const [loc, setLoc] = useState(window.location.hash.replace(/^#/, "") || "/");
  useEffect(() => {
    const handler = () => setLoc(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  const navigate = useCallback((to) => { window.location.hash = to; }, []);
  return [loc, navigate];
};

// --- ส่วนประกอบ UI พื้นฐาน ---

const Navigation = () => {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] bg-black/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20">
            <Cpu className="text-white" size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight text-white uppercase">MeeChain</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${location === item.href ? 'text-primary bg-primary/10' : 'text-slate-400 hover:text-white'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold text-slate-300">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            NETWORK: MAINNET
          </div>
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/5 p-4 space-y-2">
          {navItems.map(item => (
            <Link 
              key={item.href} 
              href={item.href} 
              onClick={() => setIsOpen(false)} 
              className={`block px-4 py-3 rounded-xl text-sm ${location === item.href ? 'text-primary bg-primary/10' : 'text-slate-400'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

// --- Page: Home (Landing) ---
const Home = () => (
  <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-[#030303] overflow-hidden relative">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    <div className="container px-4 text-center z-10">
      <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary text-[10px] font-black mb-8 animate-bounce uppercase tracking-widest">
        <Star size={12} /> New: NFT Mining Cards are Live
      </div>
      <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-none">
        COLLECT CARDS <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 text-shadow-lg">BOOST POWER</span>
      </h1>
      <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-12 leading-relaxed">
        เปลี่ยนกิจกรรมของคุณเป็น **Mining Power NFT** สะสมการ์ดเพื่อเพิ่มประสิทธิภาพการขุดเหรียญ MEE บนระบบนิเวศ MeeChain
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link 
          href="/dashboard" 
          className="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-2xl font-black shadow-2xl shadow-primary/20 hover:scale-105 transition-all text-center"
        >
          OPEN DASHBOARD
        </Link>
        <button className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-10 py-4 rounded-2xl font-black hover:bg-white/10 transition-all">
          EXPLORE CARDS
        </button>
      </div>
    </div>
  </div>
);

// --- Page: Dashboard (The Core Interface) ---
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('missions');
  const [isMining, setIsMining] = useState(false);
  const [xp, setXp] = useState(1250);
  const [isMinting, setIsMinting] = useState(false);
  
  // เริ่มต้นด้วยการ์ดพื้นฐาน 1 ใบ
  const [nfts, setNfts] = useState([
    { id: 'starter', name: 'Starter Bot v1', power: 5, hash: 'QmStart...', image: 'https://api.dicebear.com/7.x/bottts/svg?seed=starter', rarity: 'Common' }
  ]);

  const [logs, setLogs] = useState([
    { id: 1, msg: 'Wallet Connected: 0xThanawat...', type: 'info', time: '15:00' },
    { id: 2, msg: 'Active Cards: 1 | Total Power: 5 MH/s', type: 'success', time: '15:01' }
  ]);

  // คำนวณกำลังขุดรวมจากการ์ดทั้งหมด
  const totalPower = useMemo(() => nfts.reduce((sum, nft) => sum + nft.power, 0), [nfts]);

  const [missions, setMissions] = useState([
    { id: 1, title: 'Connect MeeBot Onboarding', reward: 'Genesis Bot (+10 MH/s)', xp: 100, status: 'completed', category: 'Auth' },
    { id: 2, title: 'Verify MeeChain Identity', reward: 'Guardian Bot (+15 MH/s)', xp: 250, status: 'available', category: 'Identity' },
    { id: 3, title: 'Share to Community', reward: 'Social Bot (+8 MH/s)', xp: 150, status: 'locked', category: 'Social' },
  ]);

  const addLog = (msg, type = 'success') => {
    const time = new Date().toLocaleTimeString().slice(0, 5);
    setLogs(prev => [{ id: Date.now(), msg, type, time }, ...prev].slice(0, 8));
  };

  const toggleMining = () => {
    setIsMining(!isMining);
    addLog(!isMining ? `Mining Started at ${totalPower} MH/s` : 'Mining Paused', !isMining ? 'success' : 'info');
  };

  const handleMintMission = (missionId, powerBoost, name) => {
    setIsMinting(true);
    addLog(`กำลังบันทึก Metadata สำหรับ ${name} ลง IPFS...`, 'info');
    
    setTimeout(() => {
      const newNFT = {
        id: Date.now(),
        name: name,
        power: powerBoost,
        hash: `Qm${Math.random().toString(36).substring(2, 12)}`,
        image: `https://api.dicebear.com/7.x/bottts/svg?seed=${Date.now()}`,
        rarity: powerBoost > 10 ? 'Rare' : 'Common'
      };
      
      setNfts(prev => [newNFT, ...prev]);
      setMissions(prev => prev.map(m => {
        if (m.id === missionId) return { ...m, status: 'completed' };
        if (missionId === 2 && m.id === 3) return { ...m, status: 'available' };
        return m;
      }));
      setXp(prev => prev + 200);
      setIsMinting(false);
      addLog(`Mint สำเร็จ! กำลังขุดเพิ่มขึ้น +${powerBoost} MH/s`, 'success');
      
      // สลับไปหน้า Inventory อัตโนมัติเพื่อให้เห็นการ์ดใหม่
      setActiveTab('inventory');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Profile & Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0f0f0f] border border-white/5 rounded-[32px] p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-all" />
            
            <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-cyan-500 p-0.5 shadow-2xl shadow-primary/20">
                <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center overflow-hidden">
                  <User size={40} className="text-white/20" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Thanawat S.</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-primary/20 text-primary text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Lvl 12</span>
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Active Miner</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-black/40 p-5 rounded-3xl border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mining Efficiency</span>
                  <span className="text-xs font-bold text-primary">{totalPower} MH/s</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${Math.min((totalPower/100)*100, 100)}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">Balance</p>
                  <p className="text-sm font-black text-white tracking-tight">42.50 MEE</p>
                </div>
                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">NFT Cards</p>
                  <p className="text-sm font-black text-white tracking-tight">{nfts.length} Cards</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0f0f0f] border border-white/5 rounded-[32px] p-6">
            <h3 className="text-xs font-black text-white mb-6 flex items-center gap-2 uppercase tracking-widest">
              <Activity size={14} className="text-primary" /> Log ความโปร่งใส
            </h3>
            <div className="space-y-4">
              {logs.map(log => (
                <div key={log.id} className="flex gap-4 animate-in slide-in-from-left-2 duration-300">
                  <span className="text-[10px] font-mono text-slate-600 mt-0.5">{log.time}</span>
                  <p className={`text-[11px] leading-relaxed font-medium ${log.type === 'success' ? 'text-green-400' : log.type === 'info' ? 'text-cyan-400' : 'text-slate-400'}`}>
                    {log.msg}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Interaction Hub */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex p-1.5 bg-[#0f0f0f] border border-white/5 rounded-2xl w-fit mb-4">
            {[
              { id: 'missions', label: 'ภารกิจกิจกรรม', icon: Trophy },
              { id: 'mining', label: 'ระบบการขุด', icon: Zap },
              { id: 'inventory', label: 'คลังการ์ดพลัง', icon: Layout }
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)} 
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB: Missions (NFT Activity) */}
          {activeTab === 'missions' && (
            <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="px-2 mb-2">
                <h3 className="text-xl font-black text-white">Daily Activities</h3>
                <p className="text-xs text-slate-500 mt-1">ทำกิจกรรมให้ครบเพื่อ Mint การ์ดกำลังขุดใบใหม่</p>
              </div>
              {missions.map(m => (
                <div 
                  key={m.id} 
                  className={`p-6 rounded-[32px] border transition-all flex items-center justify-between ${
                    m.status === 'completed' ? 'bg-green-500/5 border-green-500/20' : 
                    m.status === 'locked' ? 'bg-black opacity-30 grayscale pointer-events-none' : 
                    'bg-[#0f0f0f] border-white/5 hover:border-primary/40 group'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      m.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-all'
                    }`}>
                      {m.status === 'completed' ? <CheckCircle2 size={24} /> : <Star size={24} />}
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">{m.category}</span>
                      <h4 className="text-white font-bold text-lg leading-tight">{m.title}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-[10px] font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-lg border border-cyan-400/20">REWARD: {m.reward}</p>
                        <p className="text-[10px] font-bold text-yellow-500">+{m.xp} XP</p>
                      </div>
                    </div>
                  </div>
                  {m.status === 'available' && (
                    <button 
                      onClick={() => handleMintMission(m.id, m.id === 2 ? 15 : 8, m.id === 2 ? 'Guardian Bot' : 'Social Bot')} 
                      disabled={isMinting}
                      className="bg-white text-black px-8 py-3 rounded-2xl text-[10px] font-black hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                    >
                      {isMinting ? 'กำลังบันทึก...' : 'MINT CARD'}
                    </button>
                  )}
                  {m.status === 'completed' && <span className="text-green-500 text-[10px] font-black flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-xl">COLLECTED <CheckCircle2 size={14} /></span>}
                </div>
              ))}
            </div>
          )}

          {/* TAB: Mining (Utilizes total power from cards) */}
          {activeTab === 'mining' && (
            <div className="bg-[#0f0f0f] border border-white/5 rounded-[32px] p-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                  <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Mining Session</h3>
                  <p className="text-sm text-slate-500">ขุดเหรียญด้วยกำลังจากคลังการ์ด NFT ของคุณ</p>
                </div>
                <button 
                  onClick={toggleMining} 
                  className={`px-12 py-4 rounded-2xl font-black text-sm flex items-center gap-2 transition-all shadow-2xl ${
                    isMining ? 'bg-red-500/10 text-red-500 border border-red-500/20 shadow-red-500/5' : 'bg-primary text-white shadow-primary/20'
                  }`}
                >
                  <Power size={18} />
                  {isMining ? 'STOP MINING' : 'START MINING'}
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-black/40 p-8 rounded-[32px] border border-white/5 relative overflow-hidden">
                  <div className="absolute top-2 right-4 text-[8px] font-black text-slate-700 uppercase tracking-widest">Efficiency Wave</div>
                  <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Real-time Performance</h5>
                  <div className="flex items-end gap-1.5 h-32">
                    {[30, 50, 40, 80, 90, 45, 70, 60, 85, 95, 100, 80, 90, 85].map((h, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 rounded-t-lg transition-all duration-[1500ms] ${isMining ? 'bg-primary' : 'bg-slate-800'}`} 
                        style={{ height: isMining ? `${h}%` : '5%' }} 
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-black/40 p-8 rounded-[32px] border border-white/5 flex flex-col justify-center text-center group">
                  <div className={`p-5 rounded-full mx-auto mb-6 transition-colors ${isMining ? 'bg-primary/20 text-primary shadow-lg shadow-primary/10' : 'bg-slate-800 text-slate-600'}`}>
                    <Zap size={40} className={isMining ? 'animate-pulse' : ''} />
                  </div>
                  <h4 className="text-5xl font-black text-white tracking-tighter">{isMining ? `${totalPower} MH/s` : 'OFFLINE'}</h4>
                  <p className="text-[10px] text-slate-500 mt-4 uppercase tracking-[0.2em] font-black">Current Output Power</p>
                </div>
              </div>

              <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl">
                <p className="text-xs text-slate-400 leading-relaxed italic text-center">
                  "กำลังขุดของคุณคำนวณจากผลรวมของการ์ด NFT ทั้งหมดในคลัง ยิ่งมีกิจกรรมมาก การ์ดยิ่งแกร่ง!"
                </p>
              </div>
            </div>
          )}

          {/* TAB: Inventory (Card List with Power) */}
          {activeTab === 'inventory' && (
            <div className="animate-in zoom-in duration-300">
              <div className="flex justify-between items-end mb-8 px-2">
                <div>
                  <h3 className="text-2xl font-black text-white">My Mining Fleet</h3>
                  <p className="text-xs text-slate-500">รวมการ์ดพลังงานที่เก็บไว้ใน MeeChain Wallet</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Combined Power</p>
                   <p className="text-xl font-black text-primary">{totalPower} MH/s</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {nfts.map(nft => (
                  <div key={nft.id} className="bg-[#0f0f0f] border border-white/5 rounded-[40px] overflow-hidden group hover:border-primary/50 transition-all shadow-xl relative">
                    {/* Badge Rarity */}
                    <div className="absolute top-6 left-6 z-20">
                      <span className={`text-[8px] font-black px-3 py-1 rounded-full border ${
                        nft.rarity === 'Rare' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-slate-800 text-slate-400 border-white/5' }`}>
 {nft.rarity.toUpperCase()}