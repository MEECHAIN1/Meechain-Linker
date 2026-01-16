import { useMiningStats, useToggleMining } from "@/hooks/use-mining";
import { StatCard } from "@/components/StatCard";
import { MiningChart } from "@/components/MiningChart";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Zap, 
  Wallet, 
  Server, 
  Power, 
  RotateCw,
  Clock,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { data: stats, isLoading, isRefetching } = useMiningStats();
  const { mutate: toggleMining, isPending: isToggling } = useToggleMining();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground animate-pulse">Connecting to mainnet...</p>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Mining Dashboard</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${stats.active ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              Node Status: <span className={stats.active ? 'text-green-400' : 'text-red-400'}>{stats.active ? 'Online' : 'Offline'}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             {isRefetching && <RotateCw className="w-4 h-4 text-muted-foreground animate-spin" />}
             <Button 
               size="lg"
               onClick={() => toggleMining(!stats.active)}
               disabled={isToggling}
               className={`
                 font-bold rounded-full min-w-[160px] shadow-lg transition-all duration-300
                 ${stats.active 
                   ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/50" 
                   : "bg-primary hover:bg-primary/90 text-white shadow-primary/25 hover:shadow-primary/40"}
               `}
             >
               {isToggling ? (
                 <RotateCw className="w-4 h-4 mr-2 animate-spin" />
               ) : (
                 <Power className="w-4 h-4 mr-2" />
               )}
               {stats.active ? "Stop Mining" : "Start Mining"}
             </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            label="Total Balance" 
            value={`${stats.balance} MEE`} 
            icon={Wallet}
            color="primary"
            subtext="≈ $1,240.50 USD"
          />
          <StatCard 
            label="Current Hashrate" 
            value={stats.active ? stats.hashRate : "0 MH/s"} 
            icon={Zap}
            color="accent"
            subtext={stats.active ? "Operating at 98% efficiency" : "Node is idle"}
          />
          <StatCard 
            label="Active Workers" 
            value={stats.active ? "1" : "0"} 
            icon={Server}
            color="default"
            subtext="Worker ID: #8821-X"
          />
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Chart Section */}
          <div className="lg:col-span-2 min-h-[400px]">
            <MiningChart isActive={stats.active} />
          </div>

          {/* Activity Feed */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <AnimatePresence>
                  {[
                    { type: 'reward', amount: '+0.45 MEE', time: '2 mins ago', desc: 'Block reward #88231' },
                    { type: 'system', amount: '', time: '1 hour ago', desc: 'System optimization complete' },
                    { type: 'reward', amount: '+0.32 MEE', time: '3 hours ago', desc: 'Block reward #88102' },
                    { type: 'transfer', amount: '-10.0 MEE', time: '1 day ago', desc: 'Withdrawal to external wallet' },
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center border border-white/5
                        ${item.type === 'reward' ? 'bg-green-500/10 text-green-500' : 'bg-white/5 text-muted-foreground'}
                      `}>
                        {item.type === 'reward' ? <Zap className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                          {item.desc}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">{item.time}</p>
                      </div>
                      {item.amount && (
                        <div className={`text-sm font-bold font-mono ${item.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {item.amount}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
