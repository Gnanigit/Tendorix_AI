import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FileUp,
  FileSearch,
  History,
  Settings,
  BarChart3,
  FileCheck,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <section className="py-20 px-6 md:px-12 gradient-purple">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Evaluate Tenders with Precision
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Upload, compare, and analyze your files against baselines to
              identify changes and differences.
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              className="px-8 py-4 bg-white text-brand-purple rounded-full text-lg font-semibold hover:shadow-lg transition-all"
              onClick={() => navigate("/compare")}
            >
              Start Evaluation
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 bg-brand-light">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            {...fadeIn}
          >
            File Management Made Simple
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeIn}>
              <FeatureCard
                title="Evaluate Tenders"
                icon={FileSearch}
                onClick={() => navigate("/compare")}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <FeatureCard
                title="Upload Baseline"
                icon={FileUp}
                onClick={() => navigate("/baseline")}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <FeatureCard
                title="View History"
                icon={History}
                onClick={() => navigate("/history")}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <FeatureCard
                title="Reports"
                icon={BarChart3}
                onClick={() => navigate("/reports")}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <FeatureCard
                title="Verification"
                icon={FileCheck}
                onClick={() => navigate("/verification")}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <FeatureCard
                title="Settings"
                icon={Settings}
                onClick={() => navigate("/settings")}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-6 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Tender Evaluation. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
