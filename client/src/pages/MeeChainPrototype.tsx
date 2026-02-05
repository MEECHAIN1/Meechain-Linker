import React, { useState, useEffect } from 'react';
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
  Info,
  ChevronRight,
  Sparkles,
  MessageSquare,
  Database,
  User,
  Zap,
  Globe,
  ArrowUpRight
} from 'lucide-react';

// --- ข้อมูลจำลอง (Mock Data) ---
const INITIAL_MISSIONS = [
  { id: 1, title: 'เชื่อมต่อ MeeBot Onboarding', xp: 100, status: 'available', type: 'Onboarding', description: 'เริ่มต้นการเดินทางด้วยการลงทะเบียนผ่าน MeeBot' },
  { id: 2, title: 'ยืนยันตัวตนบน MeeChain', xp: 150, status: 'available', type: 'Identity', description: 'สร้าง Digital Identity เพื่อความโปร่งใสในระบบ' },
  { id: 3, title: 'Mint การ์ด Genesis NFT', xp: 500, status: 'locked', type: 'Assets', description: 'รับการ์ด NFT ใบแรกของคุณบน MeeChain' },
  { id: 4, title: 'แชร์ภารกิจไปยัง Community', xp: 200, status: 'locked', type: 'Social', description: 'ช่วยขยายเครือข่าย MeeChain ให้เติบโต' },
];

const MeeChainDashboard = () => {
  const [activeTab, setActiveTab] = useState('missions');
  const [missions, setMissions] = useState(INITIAL_MISSIONS);
  const [nfts, setNfts] = useState([]);
  const [xp, setXp] = useState(0);
  const [isMinting, setIsMinting] = useState(false);
  const [logs, setLogs] = useState([
    { id: 1, msg: 'ระบบ MeeChain v2.0 ออนไลน์', type: 'info', time: '10:00:00' },
    { id: 2, msg: 'เชื่อมต่อกับ IPFS Gateway สำเร็จ', type: 'success', time: '10:00:05' }
  ]);

  // --- ระบบ Log ความโปร่งใส ---
  const addLog = (msg, type = 'success') => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [{ id: Date.now(), msg, type, time }, ...prev].slice(0, 8));
  };

  // --- ฟังก์ชันทำภารกิจ ---
  const handleMission = (id) => {
    setMissions(prev => {
      const updated = prev.map(m => {
        if (m.id === id) {
          addLog(`ภารกิจ "${m.title}" สำเร็จแล้ว!`, 'success');
          setXp(curr => curr + m.xp);
          return { ...m, status: 'completed' };
        }
        // ปลดล็อกภารกิจถัดไป
        if (id === 1 && m.id === 3) return { ...m, status: 'available' };
        if (id === 3 && m.id === 4) return { ...m, status: 'available' };
        return m;
      });
      return updated;
    });
  };

  // --- ฟังก์ชัน Mint NFT ---
  const mintNFT = () => {
    setIsMinting(true);
    addLog('กำลังบันทึก Metadata ลง IPFS...', 'info');
    
    setTimeout(() => {
      const newNFT = {
        id: Date.now(),
        hash: `Qm${Math.random().toString(36).substring(2, 15)}`,
        name: `MeeBot Guardian #${nfts.length + 1}`,
        image: `https://api.dicebear.com/7.x/bottts/svg?seed=${Date.now()}`,
        date: new Date().toLocaleDateString()
      };
      setNfts([newNFT, ...nfts]);
      setIsMinting(false);
      addLog(`Mint NFT สำเร็จ: ${newNFT.name}`, 'success');
      handleMission(3);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/30">
      
      {/* Sidebar (Desktop) */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#0a0a0a] border-r border-white/5 hidden xl:flex flex-col p-6 z-50">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-cyan-500 p-2 rounded-xl">
            <Cpu size={24} className="text-black" />
          </div>
          <h1 className="font-black text-xl tracking-tighter text-white">MEECHAIN</h1>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: 'missions', icon: Trophy, label: 'ภารกิจ (Missions)' },
            { id: 'inventory', icon: Layout, label: 'คลังการ์ด (Cards)' },
            { id: 'ipfs', icon: Database, label: 'IPFS Explorer' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-white/10 text-cyan-400 border border-white/10 shadow-lg shadow-cyan-500/5' 
                  : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto bg-gradient-to-br from-cyan-900/20 to-purple-900/20 p-4 rounded-2xl border border-white/5">
          <p className="text-[10px] text-cyan-400 font-bold mb-1">MeeBot AI Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium">พร้อมช่วยเหลือคุณ</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="xl:ml-64 p-4 md:p-8">
        
        {/* Header / Stats Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">ยินดีต้อนรับ, ธณวัฒน์!</h2>
            <p className="text-slate-500 text-sm">ตรวจสอบความคืบหน้าของภารกิจและ NFT ของคุณ</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-[#111] border border-white/5 px-4 py-2 rounded-2xl flex items-center gap-3">
              <div className="p-1.5 bg-yellow-500/10 rounded-lg">
                <Zap size={16} className="text-yellow-500" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Experience</p>
                <p className="text-sm font-black text-white">{xp} XP</p>
              </div>
            </div>
            
            <button className="bg-white text-black px-6 py-2.5 rounded-2xl font-bold text-sm hover:bg-cyan-400 transition-all flex items-center gap-2 shadow-xl shadow-white/5">
              <Wallet size={18} />
              0xThanawat...
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Dashboard Section */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Active Content */}
            {activeTab === 'missions' && (
              <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between px-2">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Trophy size={20} className="text-cyan-500" />
                    ภารกิจที่กำลังดำเนินการ
                  </h3>
                  <span className="text-xs text-slate-500">ทั้งหมด {missions.length} รายการ</span>
                </div>

                <div className="grid gap-3">
                  {missions.map(m => (
                    <div key={m.id} className={`p-5 rounded-3xl border transition-all ${
                      m.status === 'completed' 
                        ? 'bg-green-500/5 border-green-500/20' 
                        : m.status === 'locked' 
                          ? 'bg-[#0a0a0a] border-white/5 opacity-40 grayscale' 
                          : 'bg-[#0f0f0f] border-white/5 hover:border-cyan-500/40 cursor-default'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-2xl ${m.status === 'completed' ? 'bg-green-500/20 text-green-500' : 'bg-slate-800'}`}>
                            {m.status === 'completed' ? <CheckCircle2 size={22} /> : <ShieldCheck size={22} />}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">{m.type}</span>
                            <h4 className="font-bold text-white leading-tight">{m.title}</h4>
                            <p className="text-xs text-slate-500 mt-1">{m.description}</p>
                          </div>
                        </div>

                        {m.status === 'available' && (
                          <button 
                            onClick={() => m.id === 3 ? mintNFT() : handleMission(m.id)}
                            disabled={isMinting}
                            className="bg-white text-black px-5 py-2 rounded-xl text-xs font-black hover:scale-105 transition-transform disabled:opacity-50"
                          >
                            {m.id === 3 ? (isMinting ? 'กำลัง Mint...' : 'MINT NFT') : 'ทำภารกิจ'}
                          </button>
                        )}

                        {m.status === 'completed' && (
                          <div className="flex items-center gap-2 text-green-500 text-xs font-bold">
                            สำเร็จแล้ว <CheckCircle2 size={16} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'inventory' && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-6 px-2">
                  <h3 className="font-bold text-lg">My NFT Collection</h3>
                  <span className="text-xs text-slate-500">{nfts.length} การ์ด</span>
                </div>
                
                {nfts.length === 0 ? (
                  <div className="bg-[#0a0a0a] border border-dashed border-white/10 rounded-3xl py-20 text-center">
                    <p className="text-slate-600 mb-4">ยังไม่พบ NFT ในกระเป๋าของคุณ</p>
                    <button onClick={() => setActiveTab('missions')} className="text-cyan-500 text-sm font-bold hover:underline">
                      ไปทำภารกิจเพื่อปลดล็อกการ์ดใบแรก
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {nfts.map(nft => (
                      <div key={nft.id} className="bg-[#0f0f0f] border border-white/5 rounded-3xl overflow-hidden group hover:border-cyan-500/50 transition-all">
                        <div className="aspect-square p-6 flex items-center justify-center relative bg-gradient-to-b from-white/5 to-transparent">
                          <img src={nft.image} className="w-40 h-40 group-hover:scale-110 transition-transform duration-500" alt={nft.name} />
                          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] border border-white/10">
                            #00{nft.id}
                          </div>
                        </div>
                        <div className="p-5">
                          <h4 className="font-bold text-white">{nft.name}</h4>
                          <p className="text-[10px] font-mono text-cyan-500 mt-1 truncate">Hash: {nft.hash}</p>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-[10px] text-slate-500">MINTED: {nft.date}</span>
                            <button className="text-white hover:text-cyan-400 transition-colors">
                              <ExternalLink size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeTab === 'ipfs' && (
              <section className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 text-center animate-in fade-in duration-500">
                <Database size={48} className="mx-auto text-cyan-500 mb-6" />
                <h3 className="text-xl font-bold text-white mb-2">Decentralized Data Layer</h3>
                <p className="text-slate-500 text-sm mb-8">Metadata และสถานะภารกิจทั้งหมดถูกจัดเก็บด้วย IPFS เพื่อรับประกันความถูกต้อง</p>
                <div className="text-left bg-black p-6 rounded-2xl font-mono text-xs border border-white/5 space-y-4 max-h-80 overflow-y-auto">
                   {nfts.length > 0 ? nfts.map(n => (
                     <div key={n.id} className="pb-4 border-b border-white/5 last:border-0">
                       <p className="text-cyan-500">// CID: {n.hash}</p>
                       <pre className="text-slate-400 mt-2">{JSON.stringify({
                         name: n.name,
                         creator: "MeeChain",
                         attributes: [
                           { trait: "Rarity", value: "Rare" },
                           { trait: "Utility", value: "Access" }
                         ]
                       }, null, 2)}</pre>
                     </div>
                   )) : <p className="text-slate-700 italic">-- ไม่มีข้อมูลการสืบค้น --</p>}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Transparency Log & Assistant */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* MeeBot Persona Card */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-cyan-500/20 transition-all" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-cyan-500/20 rounded-xl">
                  <MessageSquare size={20} className="text-cyan-500" />
                </div>
                <h4 className="font-bold text-white">MeeBot Assistant</h4>
              </div>
              
              <div className="space-y-4">
                <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                  <p className="text-sm text-slate-300 leading-relaxed italic">
                    "สวัสดีครับ! ผมเตรียมภารกิจ Genesis ไว้ให้คุณแล้ว หากทำครบคุณจะได้รับสิทธิ์เข้าถึงโซนพิเศษของ MeeChain ทันที"
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-white/5 hover:bg-white/10 p-2 rounded-xl text-[10px] font-bold text-slate-400 border border-white/5">วิธีใช้งาน</button>
                  <button className="bg-white/5 hover:bg-white/10 p-2 rounded-xl text-[10px] font-bold text-slate-400 border border-white/5">ถาม AI</button>
                </div>
              </div>
            </div>

            {/* Transparency Activity */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                  <Activity size={16} className="text-cyan-500" />
                  Chain Activity
                </h4>
                <div className="px-2 py-0.5 bg-green-500/10 rounded-full text-[10px] text-green-500 font-bold border border-green-500/20">LIVE</div>
              </div>

              <div className="space-y-4">
                {logs.map(log => (
                  <div key={log.id} className="flex gap-3 animate-in fade-in slide-in-from-right-2 duration-300">
                    <div className="text-[10px] text-slate-600 font-mono pt-0.5">{log.time}</div>
                    <div className="flex-1">
                      <p className={`text-[11px] leading-tight ${
                        log.type === 'success' ? 'text-green-400' : log.type === 'info' ? 'text-cyan-400' : 'text-slate-400'
                      }`}>
                        {log.msg}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Global Stats Card */}
            <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/5 rounded-3xl p-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-tighter">Network Health</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Nodes Active</span>
                  <span className="text-xs font-bold text-white">1,248</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full w-[85%]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Network Speed</span>
                  <span className="text-xs font-bold text-green-500">2.4s Avg</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Floating Network Indicator */}
      <div className="fixed bottom-6 right-6 flex items-center gap-3 bg-black/80 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 shadow-2xl z-50">
        <Globe size={14} className="text-cyan-500" />
        <span className="text-[10px] font-bold tracking-widest text-white">MEECHAIN MAINNET</span>
        <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
      </div>

    </div>
  );
};

export default MeeChainDashboard;