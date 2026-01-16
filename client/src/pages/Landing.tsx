import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Zap, Globe, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import botImage from '@assets/meebot-ritual-1767554354167_1768537047162.png';
import logoImage from '@assets/logo.meechain_1768537047159.png';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-24 lg:pt-48 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-xs font-mono text-accent uppercase tracking-wider">MeeChain 2.0 Live</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight mb-6">
                The Future of <br />
                <span className="text-gradient">Intelligent Mining</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Harness the power of AI-driven automation and secure blockchain technology to maximize your mining efficiency. Start earning MeeTokens today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                    Start Mining Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full border-white/10 bg-transparent hover:bg-white/5 text-white">
                  Read Whitepaper
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 w-full max-w-[500px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse" />
                <img 
                  src={botImage} 
                  alt="MeeBot Ritual" 
                  className="w-full h-auto drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]"
                />
              </div>
              {/* Floating Cards */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-card/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Efficiency</p>
                    <p className="font-bold text-white">+124%</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-24 border-t border-white/5">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">Why MeeChain?</h2>
            <p className="text-muted-foreground">Built for the next generation of decentralized infrastructure.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Secure Blockchain",
                desc: "Enterprise-grade encryption protecting every transaction and hash.",
                color: "text-primary"
              },
              {
                icon: Cpu,
                title: "Smart Automation",
                desc: "AI algorithms optimize your mining strategy in real-time.",
                color: "text-accent"
              },
              {
                icon: Globe,
                title: "Global Network",
                desc: "Join thousands of miners contributing to the decentralized web.",
                color: "text-blue-400"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <section className="container mx-auto px-4 pb-24">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/10 border border-white/10 p-12 text-center">
             <div className="relative z-10 max-w-2xl mx-auto">
               <img src={logoImage} alt="Logo" className="w-16 h-16 mx-auto mb-6 opacity-80" />
               <h2 className="text-4xl font-display font-bold mb-6">Ready to start your journey?</h2>
               <p className="text-lg text-muted-foreground mb-8">
                 Join the MeeChain network and be part of the decentralized future.
               </p>
               <Link href="/dashboard">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 font-bold rounded-full px-8 h-12">
                  Launch App
                </Button>
               </Link>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
