/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  Activity,
  Cpu,
  BarChart2,
  MessageCircle,
  Users,
  Target,
  FileText,
  Sparkles,
  Code,
  UserCheck,
} from "lucide-react";

// --- TRANSFORMER DECODER DIAGRAM ---
export const TransformerDecoderDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8'>
      <h3 className='font-serif text-xl mb-4 text-stone-900'>
        AlphaQubit Architecture
      </h3>
      <p className='text-sm text-stone-600 mb-6 text-center max-w-md'>
        The model processes syndrome history using a recurrent transformer that
        attends to both spatial and temporal correlations.
      </p>

      <div className='relative w-full max-w-lg h-56 bg-white rounded-lg shadow-inner overflow-hidden mb-6 border border-stone-200 flex items-center justify-center gap-8 p-4'>
        {/* Input Stage */}
        <div className='flex flex-col items-center gap-2'>
          <div
            className={`w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${
              step === 0
                ? "border-nobel-gold bg-nobel-gold/10"
                : "border-stone-200 bg-stone-50"
            }`}
          >
            <div className='grid grid-cols-3 gap-1'>
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    Math.random() > 0.7 ? "bg-stone-800" : "bg-stone-300"
                  }`}
                ></div>
              ))}
            </div>
          </div>
          <span className='text-[10px] uppercase font-bold tracking-wider text-stone-500'>
            Syndrome
          </span>
        </div>

        {/* Arrows */}
        <motion.div
          animate={{ opacity: step >= 1 ? 1 : 0.3, x: step >= 1 ? 0 : -5 }}
        >
          →
        </motion.div>

        {/* Transformer Stage */}
        <div className='flex flex-col items-center gap-2'>
          <div
            className={`w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-colors duration-500 relative overflow-hidden ${
              step === 1 || step === 2
                ? "border-stone-800 bg-stone-900 text-white"
                : "border-stone-200 bg-stone-50"
            }`}
          >
            <Cpu
              size={24}
              className={
                step === 1 || step === 2
                  ? "text-nobel-gold animate-pulse"
                  : "text-stone-300"
              }
            />
            {step === 1 && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-full h-[1px] bg-nobel-gold absolute top-1/3 animate-ping'></div>
                <div className='w-full h-[1px] bg-nobel-gold absolute top-2/3 animate-ping delay-75'></div>
              </div>
            )}
          </div>
          <span className='text-[10px] uppercase font-bold tracking-wider text-stone-500'>
            Transformer
          </span>
        </div>

        {/* Arrows */}
        <motion.div
          animate={{ opacity: step >= 3 ? 1 : 0.3, x: step >= 3 ? 0 : -5 }}
        >
          →
        </motion.div>

        {/* Output Stage */}
        <div className='flex flex-col items-center gap-2'>
          <div
            className={`w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${
              step === 3
                ? "border-green-500 bg-green-50"
                : "border-stone-200 bg-stone-50"
            }`}
          >
            {step === 3 ? (
              <span className='text-2xl font-serif text-green-600'>X</span>
            ) : (
              <span className='text-2xl font-serif text-stone-300'>?</span>
            )}
          </div>
          <span className='text-[10px] uppercase font-bold tracking-wider text-stone-500'>
            Correction
          </span>
        </div>
      </div>

      <div className='flex gap-2'>
        {[0, 1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 rounded-full transition-all duration-300 ${
              step === s ? "w-8 bg-nobel-gold" : "w-2 bg-stone-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

// --- PERFORMANCE CHART ---
export const PerformanceMetricDiagram: React.FC = () => {
  const [distance, setDistance] = useState<3 | 5 | 11>(5);

  // Values represent Logical Error Rate (approx %).
  // Lower is better.
  // Updated with correct Paper values:
  // Dist 3: MWPM 3.5%, Alpha 2.9%
  // Dist 5: MWPM 3.6%, Alpha 2.75%
  // Dist 11: MWPM ~0.0041%, Alpha ~0.0009% (Based on paper's hard input simulation data)
  const data = {
    3: { mwpm: 3.5, alpha: 2.9 },
    5: { mwpm: 3.6, alpha: 2.75 },
    11: { mwpm: 0.0041, alpha: 0.0009 },
  };

  const currentData = data[distance];
  // Normalize to max value of current set to visually fill the chart, with some headroom
  const maxVal = Math.max(currentData.mwpm, currentData.alpha) * 1.25;

  const formatValue = (val: number) => {
    if (val < 0.01) return val.toFixed(4) + "%";
    return val.toFixed(2) + "%";
  };

  return (
    <div className='flex flex-col md:flex-row gap-8 items-center p-8 bg-stone-900 text-stone-100 rounded-xl my-8 border border-stone-800 shadow-lg'>
      <div className='flex-1 min-w-[240px]'>
        <h3 className='font-serif text-xl mb-2 text-nobel-gold'>
          Performance vs. MWPM Baseline
        </h3>
        <p className='text-stone-400 text-sm mb-4 leading-relaxed'>
          AlphaQubit consistently achieves lower logical error rates than the
          Minimum-Weight Perfect Matching (MWPM) decoder baseline.
        </p>
        <div className='flex gap-2 mt-6'>
          {[3, 5, 11].map((d) => (
            <button
              key={d}
              onClick={() => setDistance(d as any)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 border ${
                distance === d
                  ? "bg-nobel-gold text-stone-900 border-nobel-gold"
                  : "bg-transparent text-stone-400 border-stone-700 hover:border-stone-500 hover:text-stone-200"
              }`}
            >
              Distance {d}
            </button>
          ))}
        </div>
        <div className='mt-6 font-mono text-xs text-stone-500 flex items-center gap-2'>
          <BarChart2 size={14} className='text-nobel-gold' />
          <span>LOGICAL ERROR RATE (LOWER IS BETTER)</span>
        </div>
      </div>

      <div className='relative w-64 h-72 bg-stone-800/50 rounded-xl border border-stone-700/50 p-6 flex justify-around items-end'>
        {/* Background Grid Lines */}
        <div className='absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-10'>
          <div className='w-full h-[1px] bg-stone-400'></div>
          <div className='w-full h-[1px] bg-stone-400'></div>
          <div className='w-full h-[1px] bg-stone-400'></div>
          <div className='w-full h-[1px] bg-stone-400'></div>
        </div>

        {/* MWPM Bar */}
        <div className='w-20 flex flex-col justify-end items-center h-full z-10'>
          <div className='flex-1 w-full flex items-end justify-center relative mb-3'>
            <div className='absolute -top-5 w-full text-center text-sm font-mono text-stone-400 font-bold bg-stone-900/90 py-1 px-2 rounded backdrop-blur-sm border border-stone-700/50 shadow-sm'>
              {formatValue(currentData.mwpm)}
            </div>
            <motion.div
              className='w-full bg-stone-600 rounded-t-md border-t border-x border-stone-500/30'
              initial={{ height: 0 }}
              animate={{ height: `${(currentData.mwpm / maxVal) * 100}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
            />
          </div>
          <div className='h-6 flex items-center text-xs font-bold text-stone-500 uppercase tracking-wider'>
            MWPM
          </div>
        </div>

        {/* AlphaQubit Bar */}
        <div className='w-20 flex flex-col justify-end items-center h-full z-10'>
          <div className='flex-1 w-full flex items-end justify-center relative mb-3'>
            <div className='absolute -top-5 w-full text-center text-sm font-mono text-nobel-gold font-bold bg-stone-900/90 py-1 px-2 rounded backdrop-blur-sm border border-nobel-gold/30 shadow-sm'>
              {formatValue(currentData.alpha)}
            </div>
            <motion.div
              className='w-full bg-nobel-gold rounded-t-md shadow-[0_0_20px_rgba(197,160,89,0.25)] relative overflow-hidden'
              initial={{ height: 0 }}
              animate={{
                height: Math.max(1, (currentData.alpha / maxVal) * 100) + "%",
              }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 15,
                delay: 0.1,
              }}
            >
              {/* Shine effect */}
              <div className='absolute inset-0 bg-gradient-to-tr from-transparent to-white/20'></div>
            </motion.div>
          </div>
          <div className='h-6 flex items-center text-xs font-bold text-nobel-gold uppercase tracking-wider'>
            AlphaQubit
          </div>
        </div>
      </div>
    </div>
  );
};

// --- LEARNING WORKFLOW DIAGRAM ---
export const LearningWorkflowDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % 6);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const Card: React.FC<{
    title: string;
    icon: React.ReactNode;
    description?: string;
    input?: string[];
    aiSupport?: string;
    output?: string[];
    isActive: boolean;
    className?: string;
  }> = ({
    title,
    icon,
    description,
    input,
    aiSupport,
    output,
    isActive,
    className = "",
  }) => (
    <div
      className={`relative bg-white rounded-xl border-2 p-4 transition-all duration-500 ${
        isActive
          ? "border-nobel-gold shadow-lg scale-105"
          : "border-stone-200"
      } ${className}`}
    >
      <div className='flex items-center gap-3 mb-3'>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-500 ${
            isActive ? "bg-nobel-gold/10" : "bg-nobel-gold/10"
          }`}
        >
          {icon}
        </div>
        <h4 className='font-serif text-lg text-stone-900'>{title}</h4>
      </div>

      {description && (
        <div className='mb-3'>
          <p className='text-xs text-stone-600 leading-relaxed'>
            {description}
          </p>
        </div>
      )}

      {input && (
        <div className='mb-2'>
          <div className='text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1'>
            Input
          </div>
          <div className='space-y-1'>
            {input.map((item, i) => (
              <div
                key={i}
                className='text-xs text-stone-600 leading-relaxed bg-stone-50 rounded px-2 py-1'
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {output && (
        <div className='mb-3'>
          <div className='text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1'>
            Output
          </div>
          <div className='space-y-1'>
            {output.map((item, i) => (
              <div
                key={i}
                className='text-xs text-stone-600 leading-relaxed bg-stone-50 rounded px-2 py-1'
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {aiSupport && (
        <div className='mt-auto pt-3 border-t border-stone-200'>
          <div className='bg-nobel-gold/5 rounded-lg p-3 border border-nobel-gold/20'>
            <div className='flex items-start gap-2'>
              <Sparkles
                size={14}
                className='text-nobel-gold mt-0.5 flex-shrink-0'
              />
              <div>
                <div className='text-[10px] font-bold text-nobel-gold uppercase tracking-wide mb-0.5'>
                  Tips
                </div>
                <div className='text-xs text-stone-700 leading-relaxed'>
                  {aiSupport}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const FeedbackCard: React.FC<{
    title: string;
    icon: React.ReactNode;
    isActive: boolean;
  }> = ({ title, icon, isActive }) => (
    <div
      className={`bg-white rounded-xl border-2 p-4 flex items-center gap-3 transition-all duration-500 ${
        isActive ? "border-nobel-gold shadow-lg" : "border-stone-200"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-500 ${
          isActive ? "bg-nobel-gold/10" : "bg-nobel-gold/10"
        }`}
      >
        {icon}
      </div>
      <h4 className='font-serif text-lg text-stone-900'>{title}</h4>
    </div>
  );

  return (
    <div className='p-8 bg-white rounded-xl border-2 border-stone-200 my-8 shadow-lg'>
      <div className='relative max-w-6xl mx-auto'>
        {/* Top Feedback - Expert Review */}
        <div className='flex justify-center mb-6'>
          <div className='w-64'>
            <FeedbackCard
              title='Expert Review'
              icon={
                <UserCheck
                  size={20}
                  className={
                    activeStep === 0 ? "text-nobel-gold" : "text-stone-400"
                  }
                />
              }
              isActive={activeStep === 0}
            />
          </div>
        </div>

        {/* Main workflow row */}
        <div className='grid grid-cols-4 gap-4 mb-6 relative'>

          {/* Step 1: Define Goals */}
          <Card
            title='Define Goals & Pedagogies'
            icon={
              <Target
                size={20}
                className={
                  activeStep === 1 ? "text-nobel-gold" : "text-stone-400"
                }
              />
            }
            description='Identify learning objectives and select appropriate pedagogical approaches'
            aiSupport='Use AI to incorporate educational best practices even without teaching experience'
            output={["learning-goals.md"]}
            isActive={activeStep === 1}
          />

          {/* Central box: Content & Experience Creation */}
          <div className='col-span-2 relative'>
            <div
              className={`bg-white rounded-xl border-2 p-4 transition-all duration-500 ${
                activeStep === 2 || activeStep === 3
                  ? "border-nobel-gold shadow-lg"
                  : "border-stone-200"
              }`}
            >
              <h3 className='font-serif text-lg font-semibold text-stone-900 mb-4 text-center'>
                Content & Experience Creation
              </h3>

              <div className='grid grid-cols-2 gap-3'>
                {/* Develop Core Content */}
                <Card
                  title='Develop Core Content'
                  icon={
                    <FileText
                      size={18}
                      className={
                        activeStep === 2 ? "text-nobel-gold" : "text-stone-400"
                      }
                    />
                  }
                  description='Create materials and quizzes aligned with learning goals'
                  input={["learning-goals.md"]}
                  aiSupport='Share credible sources and learner personas with AI to create quality content'
                  output={["content.md", "quiz.md"]}
                  isActive={activeStep === 2}
                  className='text-xs'
                />

                {/* Design Experience */}
                <Card
                  title='Design the Experience'
                  icon={
                    <Sparkles
                      size={18}
                      className={
                        activeStep === 3 ? "text-nobel-gold" : "text-stone-400"
                      }
                    />
                  }
                  description='Document your vision for the learning experience'
                  aiSupport='Use AI to draft requirements from design and product perspectives. Share examples to clarify your vision'
                  output={["requirements.md"]}
                  isActive={activeStep === 3}
                  className='text-xs'
                />
              </div>
            </div>
          </div>

          {/* Step 4: Build */}
          <Card
            title='Build'
            icon={
              <Code
                size={20}
                className={
                  activeStep === 4 ? "text-nobel-gold" : "text-stone-400"
                }
              />
            }
            description='Put everything together to create the learning experience'
            input={["content.md", "quiz.md", "requirements.md"]}
            aiSupport='Use AI to audit accessibility and enhance the learning experience'
            output={["Interactive Learning Experience"]}
            isActive={activeStep === 4}
          />
        </div>

        {/* Bottom Feedback - Learner Feedback */}
        <div className='flex justify-center mt-6'>
          <div className='w-64'>
            <FeedbackCard
              title='Learner Feedback'
              icon={
                <MessageCircle
                  size={20}
                  className={
                    activeStep === 5 ? "text-nobel-gold" : "text-stone-400"
                  }
                />
              }
              isActive={activeStep === 5}
            />
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className='flex gap-2 justify-center mt-8'>
        {[0, 1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={`h-1 rounded-full transition-all duration-300 ${
              activeStep === s ? "w-8 bg-nobel-gold" : "w-2 bg-stone-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};
