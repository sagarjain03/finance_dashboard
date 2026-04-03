import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, PieChart, Zap } from "lucide-react";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] overflow-x-hidden selection:bg-black/10 dark:selection:bg-white/30 transition-colors">
      
      {/* Navbar overlay */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-50">
        <div className="text-xl font-bold text-metallic transform hover:scale-105 transition-transform tracking-tight">
          Finance UI
        </div>
        <div className="flex gap-4">
          <Link to="/app" className="font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center">Sign In</Link>
          <Link to="/app" className="px-5 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-base)] font-semibold transition hover:scale-105">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Subtle Mono Backdrops instead of colored blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--text-primary)] opacity-5 rounded-full blur-[100px] -z-10 pointer-events-none transition-opacity"></div>

        

        <motion.h1
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]"
        >
          Track Finances <br className="hidden md:block"/>
          <span className="text-metallic">
            Smarter.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mb-12"
        >
          The ultimate intelligent dashboard giving you profound analytical insights, beautiful categoric matrices, and absolute command over your wallet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <Link
            to="/app"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-[var(--bg-base)] bg-[var(--text-primary)] rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            Launch Dashboard
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </motion.div>
      </div>

      {/* Feature Grids */}
      <div className="max-w-7xl mx-auto px-6 py-24 border-t border-[var(--border-light)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="card-premium p-8 rounded-2xl"
          >
            <div className="w-12 h-12 bg-[var(--hover-bg)] rounded-xl flex items-center justify-center mb-6 border border-[var(--border-light)]">
              <PieChart className="text-[var(--text-primary)]" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">Stunning Analytics</h3>
            <p className="text-[var(--text-muted)] leading-relaxed">Visualize your data organically through fully responsive line trends and categoric pie matrices adapting to layout shifts instantly.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="card-premium p-8 rounded-2xl"
          >
            <div className="w-12 h-12 bg-[var(--hover-bg)] rounded-xl flex items-center justify-center mb-6 border border-[var(--border-light)]">
              <Zap className="text-[var(--text-primary)]" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">Lightning Fast</h3>
            <p className="text-[var(--text-muted)] leading-relaxed">Built atop Vite & React 18, utilizing Context APIs mapping global layers blazingly quickly avoiding generic prop-drilling delays.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="card-premium p-8 rounded-2xl"
          >
            <div className="w-12 h-12 bg-[var(--hover-bg)] rounded-xl flex items-center justify-center mb-6 border border-[var(--border-light)]">
              <ShieldCheck className="text-[var(--text-primary)]" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">Role-Based Config</h3>
            <p className="text-[var(--text-muted)] leading-relaxed">Simulate complex infrastructure with organic Reader/Admin modes blocking out unprivileged endpoints symmetrically.</p>
          </motion.div>

        </div>
      </div>

    </div>
  );
}

export default LandingPage;
