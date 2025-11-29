/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { HeroScene, QuantumComputerScene } from "./components/QuantumScene";
import {
  ArrowDown,
  Menu,
  X,
  BookOpen,
  Target,
  Users,
  Lightbulb,
  Zap,
  Heart,
  Clock,
  Scale,
  Sparkles,
} from "lucide-react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  delay: string;
}) => {
  return (
    <div
      className='flex flex-col group animate-fade-in-up p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-nobel-gold/50'
      style={{ animationDelay: delay }}
    >
      <div className='w-12 h-12 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-nobel-gold/20 transition-colors'>
        <Icon className='text-nobel-gold' size={24} />
      </div>
      <h3 className='font-serif text-xl text-stone-900 mb-3'>{title}</h3>
      <p className='text-sm text-stone-600 leading-relaxed'>{description}</p>
    </div>
  );
};

const MetricCard = ({
  number,
  label,
  delay,
}: {
  number: string;
  label: string;
  delay: string;
}) => {
  return (
    <div
      className='flex flex-col items-center p-6 bg-white rounded-xl border border-stone-200 shadow-sm animate-fade-in-up'
      style={{ animationDelay: delay }}
    >
      <div className='font-serif text-5xl text-nobel-gold mb-2'>{number}</div>
      <div className='text-sm text-stone-600 text-center uppercase tracking-wide'>
        {label}
      </div>
    </div>
  );
};

const NavigationButton: React.FC<{ targetId: string }> = ({ targetId }) => {
  const scrollToNext = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToNext}
      className='group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer'
      aria-label={`Go to ${targetId}`}
    >
      <span className='p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50'>
        <ArrowDown size={16} />
      </span>
    </button>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPedagogy, setSelectedPedagogy] = useState(0);
  const [presentationMode, setPresentationMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPresentationMode(params.get("presentation") === "true");
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Account for fixed header offset
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className='min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white'>
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className='container mx-auto px-6 flex justify-between items-center'>
          <div
            className='flex items-center gap-4 cursor-pointer'
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className='w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm'>
              M
            </div>
            <span
              className={`font-serif font-bold text-lg tracking-wide transition-opacity ${
                scrolled ? "opacity-100" : "opacity-0 md:opacity-100"
              }`}
            >
              MCP EXPLORER{" "}
              <span className='font-normal text-stone-500'>NeurIPS 2025</span>
            </span>
          </div>

          <div className='hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600'>
            <a
              href='#overview'
              onClick={scrollToSection("overview")}
              className='hover:text-nobel-gold transition-colors cursor-pointer uppercase'
            >
              Overview
            </a>
            <a
              href='#challenge'
              onClick={scrollToSection("challenge")}
              className='hover:text-nobel-gold transition-colors cursor-pointer uppercase'
            >
              Challenge
            </a>
            <a
              href='#pedagogy'
              onClick={scrollToSection("pedagogy")}
              className='hover:text-nobel-gold transition-colors cursor-pointer uppercase'
            >
              Pedagogy
            </a>
            <a
              href='#insights'
              onClick={scrollToSection("insights")}
              className='hover:text-nobel-gold transition-colors cursor-pointer uppercase'
            >
              Insights
            </a>
            <a
              href='https://mcp-explorer.vercel.app'
              target='_blank'
              rel='noopener noreferrer'
              className='px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-sm cursor-pointer'
            >
              Try Live Demo
            </a>
          </div>

          <button
            className='md:hidden text-stone-900 p-2'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in'>
          <a
            href='#overview'
            onClick={scrollToSection("overview")}
            className='hover:text-nobel-gold transition-colors cursor-pointer uppercase'
          >
            Overview
          </a>
          <a
            href='#challenge'
            onClick={scrollToSection("challenge")}
            className='hover:text-nobel-gold transition-colors cursor-pointer uppercase'
          >
            Challenge
          </a>
          <a
            href='#pedagogy'
            onClick={scrollToSection("pedagogy")}
            className='hover:text-nobel-gold transition-colors cursor-pointer uppercase'
          >
            Pedagogy
          </a>
          <a
            href='#insights'
            onClick={scrollToSection("insights")}
            className='hover:text-nobel-gold transition-colors cursor-pointer uppercase'
          >
            Insights
          </a>
          <a
            href='https://mcp-explorer.vercel.app'
            target='_blank'
            rel='noopener noreferrer'
            onClick={() => setMenuOpen(false)}
            className='px-6 py-3 bg-stone-900 text-white rounded-full shadow-lg cursor-pointer'
          >
            Try Live Demo
          </a>
        </div>
      )}

      {/* Hero Section */}
      <header className='relative h-screen flex items-center justify-center overflow-hidden'>
        <HeroScene />

        {/* Gradient Overlay */}
        <div className='absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.92)_0%,rgba(249,248,244,0.6)_50%,rgba(249,248,244,0.3)_100%)]' />

        <div className='relative z-10 container mx-auto px-6 text-center'>
          <div className='inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30'>
            NeurIPS 2025 • Education Materials
          </div>
          <h1 className='font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-tight md:leading-[0.9] mb-8 text-stone-900 drop-shadow-sm'>
            MCP Explorer <br />
          </h1>
          <p className='max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12'>
            Learn Anthropic's Model Context Protocol through a narrative-driven
            and interactive learning experience.
          </p>

          <div className='flex justify-center gap-6'>
            <a
              href='#overview'
              onClick={scrollToSection("overview")}
              className='group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer'
            >
              <span>EXPLORE</span>
              <span className='p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50'>
                <ArrowDown size={16} />
              </span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Overview */}
        <section
          id='overview'
          className={`bg-white relative ${
            presentationMode ? "py-16 overflow-hidden" : "py-24"
          }`}
        >
          <div
            className={`container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start`}
          >
            <div className='md:col-span-4'>
              <div className='inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase'>
                Project Overview
              </div>
              <h2 className='font-serif text-4xl mb-6 leading-tight text-stone-900'>
                Making AI Accessible
              </h2>
              <div className='w-16 h-1 bg-nobel-gold mb-6'></div>
            </div>
            <div className='md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6'>
              <p>
                <span className='text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold'>
                  H
                </span>
                ow do we teach high school students about advanced AI concepts
                without overwhelming them? <strong>MCP Explorer</strong> answers
                this challenge through an interactive 10-15 minute learning
                experience that transforms abstract protocols into relatable,
                hands-on experimentation.
              </p>
              <p>
                The Model Context Protocol (MCP) connects AI assistants to
                external tools and data sources. Rather than lecture on
                technical specifications, we created a{" "}
                <strong className='text-stone-900 font-medium'>
                  narrative-driven journey
                </strong>{" "}
                where students build their own AI assistant, toggling MCP
                servers on and off to discover why context matters for AI
                capabilities.
              </p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
                <MetricCard
                  number='10-15'
                  label='Minute Experience'
                  delay='0s'
                />
                <MetricCard number='0' label='Prerequisite' delay='0.1s' />
              </div>
            </div>
          </div>
          {presentationMode && (
            <div className='absolute bottom-8 left-0 right-0 flex justify-center'>
              <NavigationButton targetId='challenge' />
            </div>
          )}
        </section>

        {/* The Challenge */}
        <section
          id='challenge'
          className={`bg-stone-900 text-stone-100 relative ${
            presentationMode ? "py-16 overflow-hidden" : "py-32 overflow-hidden"
          }`}
        >
          {/* Decorative Elements */}
          <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-nobel-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3'></div>
          <div className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-stone-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3'></div>

          <div
            className={`container mx-auto px-6 relative z-10`}
          >
            <div className='max-w-5xl mx-auto'>
              {/* Icon & Label */}
              <div className='flex justify-center mb-6'>
                <div className='inline-flex items-center gap-3 px-4 py-2 bg-stone-800/80 backdrop-blur-sm border border-stone-700 rounded-full shadow-sm'>
                  <Target className='text-nobel-gold' size={16} />
                  <span className='text-xs font-bold tracking-widest text-nobel-gold uppercase'>
                    The Challenge
                  </span>
                </div>
              </div>

              {/* Main Heading */}
              <h2 className='font-serif text-4xl md:text-5xl text-center mb-6 text-white leading-tight animate-fade-in-up'>
                Keeping Pace with AI Evolution
              </h2>

              {/* Central Content */}
              <div
                className='max-w-3xl mx-auto mb-12 animate-fade-in-up'
                style={{ animationDelay: "0.1s" }}
              >
                <p className='text-lg text-stone-300 leading-relaxed text-center'>
                  The world of AI is evolving at an unprecedented pace, with new
                  concepts, tools, and capabilities emerging constantly. How
                  might we—as educators—keep up with this rapid evolution while
                  simultaneously helping our learners stay current and engaged?{" "}
                  <strong className='text-white font-medium'>
                    This project demonstrates that AI tools can be part of the
                    solution
                  </strong>
                  , enabling us to quickly transform new concepts into
                  accessible, interactive learning experiences.
                </p>
              </div>

              {/* Key Points Grid */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div
                  className='group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-stone-700 hover:shadow-lg hover:border-nobel-gold/30 transition-all duration-300 animate-fade-in-up'
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className='w-10 h-10 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-nobel-gold/20 transition-colors'>
                    <Zap className='text-nobel-gold' size={20} />
                  </div>
                  <h3 className='font-serif text-lg text-white mb-2'>
                    Rapid Innovation
                  </h3>
                  <p className='text-sm text-stone-300 leading-relaxed'>
                    New AI concepts emerge faster than traditional curriculum
                    development cycles
                  </p>
                </div>

                <div
                  className='group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-stone-700 hover:shadow-lg hover:border-nobel-gold/30 transition-all duration-300 animate-fade-in-up'
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className='w-10 h-10 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-nobel-gold/20 transition-colors'>
                    <Heart className='text-nobel-gold' size={20} />
                  </div>
                  <h3 className='font-serif text-lg text-white mb-2'>
                    Student Engagement
                  </h3>
                  <p className='text-sm text-stone-300 leading-relaxed'>
                    Learners need relevant, current content that connects to
                    real-world applications
                  </p>
                </div>

                <div
                  className='group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-stone-700 hover:shadow-lg hover:border-nobel-gold/30 transition-all duration-300 animate-fade-in-up'
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className='w-10 h-10 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-nobel-gold/20 transition-colors'>
                    <Clock className='text-nobel-gold' size={20} />
                  </div>
                  <h3 className='font-serif text-lg text-white mb-2'>
                    Educator Capacity
                  </h3>
                  <p className='text-sm text-stone-300 leading-relaxed'>
                    Teachers must balance staying current while managing
                    existing responsibilities
                  </p>
                </div>
              </div>
            </div>
          </div>
          {presentationMode && (
            <div className='absolute bottom-8 left-0 right-0 flex justify-center z-20'>
              <NavigationButton targetId='innovation' />
            </div>
          )}
        </section>

        {/* AI-Powered Educational Innovation */}
        <section
          id='innovation'
          className={`bg-gradient-to-br from-stone-50 via-[#F9F8F4] to-stone-100 relative ${
            presentationMode ? "py-16 overflow-hidden" : "py-24 overflow-hidden"
          }`}
        >
          <div className='absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none'>
            {/* Decorative background pattern - Gold/Stone theme */}
            <div className='w-96 h-96 rounded-full bg-nobel-gold blur-[100px] absolute top-[-100px] left-[-100px]'></div>
            <div className='w-96 h-96 rounded-full bg-stone-300 blur-[100px] absolute bottom-[-100px] right-[-100px]'></div>
          </div>

          <div
            className={`container mx-auto px-6 relative z-10`}
          >
            <div className='text-center mb-16'>
              <div className='inline-flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-sm text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200'>
                <Lightbulb size={14} /> SECONDARY GOAL
              </div>
              <h2 className='font-serif text-4xl md:text-5xl mb-6 text-stone-900'>
                AI-Powered Educational Innovation
              </h2>
              <p className='text-lg text-stone-600 max-w-3xl mx-auto mb-12'>
                Beyond teaching students about AI, this project demonstrates how
                AI tools can empower educators to create engaging learning
                experiences rapidly.
              </p>
            </div>

            <div className='max-w-4xl mx-auto'>
              <div className='bg-white/60 backdrop-blur-sm border border-stone-200 rounded-xl p-8 md:p-12 shadow-sm'>
                <p className='text-lg text-stone-600 leading-relaxed mb-6'>
                  The entire MCP Explorer platform—from interactive
                  visualizations to the presentation you're viewing—was
                  developed with the assistance of{" "}
                  <strong className='text-stone-900 font-medium'>
                    AI-powered development tools
                  </strong>
                  , showcasing how educators can leverage these technologies to
                  bring their pedagogical visions to life efficiently and
                  effectively.
                </p>
                <p className='text-lg text-stone-600 leading-relaxed'>
                  This project serves as a proof of concept that educators, even
                  those without extensive programming backgrounds, can harness
                  AI assistance to build sophisticated, interactive learning
                  experiences that were previously out of reach without
                  dedicated development teams.
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
                <div className='text-center p-6 bg-white/60 backdrop-blur-sm border border-stone-200 rounded-lg shadow-sm'>
                  <div className='text-3xl font-serif text-nobel-gold mb-2'>
                    Fast
                  </div>
                  <div className='text-sm text-stone-600 uppercase tracking-wide'>
                    Rapid Development
                  </div>
                </div>
                <div className='text-center p-6 bg-white/60 backdrop-blur-sm border border-stone-200 rounded-lg shadow-sm'>
                  <div className='text-3xl font-serif text-nobel-gold mb-2'>
                    Accessible
                  </div>
                  <div className='text-sm text-stone-600 uppercase tracking-wide'>
                    No Deep Tech Skills
                  </div>
                </div>
                <div className='text-center p-6 bg-white/60 backdrop-blur-sm border border-stone-200 rounded-lg shadow-sm'>
                  <div className='text-3xl font-serif text-nobel-gold mb-2'>
                    Engaging
                  </div>
                  <div className='text-sm text-stone-600 uppercase tracking-wide'>
                    Interactive & Visual
                  </div>
                </div>
              </div>
            </div>
          </div>
          {presentationMode && (
            <div className='absolute bottom-8 left-0 right-0 flex justify-center z-20'>
              <NavigationButton targetId='pedagogy' />
            </div>
          )}
        </section>

        {/* Our Process */}
        <section
          id='pedagogy'
          className={`bg-white border-t border-stone-100 relative ${
            presentationMode ? "py-16 overflow-hidden" : "py-24"
          }`}
        >
          <div
            className={`container mx-auto px-6`}
          >
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
              <div>
                <div className='inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200'>
                  <BookOpen size={14} /> OUR PROCESS
                </div>
                <h2 className='font-serif text-4xl md:text-5xl mb-6 text-stone-900'>
                  From Concept to Reality
                </h2>
                <p className='text-lg text-stone-600 mb-6 leading-relaxed'>
                  Our development process leveraged{" "}
                  <strong>AI-assisted development tools</strong> to rapidly
                  iterate from pedagogical vision to interactive reality. We
                  started by defining learning objectives and identifying the
                  gap in accessible AI education for high school students.
                </p>
                <p className='text-lg text-stone-600 mb-6 leading-relaxed'>
                  Working collaboratively with AI tools like Claude Code, we
                  transformed research-backed pedagogical strategies into
                  working code, designing each interaction to maximize student
                  engagement and comprehension.
                </p>
                <div className='space-y-3'>
                  <div className='flex items-start gap-3'>
                    <div className='w-2 h-2 rounded-full bg-nobel-gold mt-2'></div>
                    <p className='text-stone-600'>
                      <strong>Research & Planning:</strong> Identified learning
                      objectives and pedagogical frameworks
                    </p>
                  </div>
                  <div className='flex items-start gap-3'>
                    <div className='w-2 h-2 rounded-full bg-nobel-gold mt-2'></div>
                    <p className='text-stone-600'>
                      <strong>AI-Assisted Development:</strong> Rapid
                      prototyping with Claude Code and modern web technologies
                    </p>
                  </div>
                  <div className='flex items-start gap-3'>
                    <div className='w-2 h-2 rounded-full bg-nobel-gold mt-2'></div>
                    <p className='text-stone-600'>
                      <strong>Iterative Refinement:</strong> Continuous testing
                      and improvement of learning experience
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <img
                  src='/Meet Sam.png'
                  alt='Development process visualization - from concept to interactive learning platform'
                  className='rounded-xl shadow-lg border border-stone-200 w-full max-w-2xl'
                />
              </div>
            </div>
          </div>
          {presentationMode && (
            <div className='absolute bottom-8 left-0 right-0 flex justify-center z-20'>
              <NavigationButton targetId='pedagogies' />
            </div>
          )}
        </section>

        {/* Pedagogical Approaches */}
        <section
          id='pedagogies'
          className={`bg-[#F5F4F0] border-t border-stone-300 relative ${
            presentationMode ? "py-16 overflow-hidden" : "py-24"
          }`}
        >
          <div
            className={`container mx-auto px-6`}
          >
            <div className='text-center mb-16'>
              <div className='inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase'>
                PEDAGOGICAL FRAMEWORK
              </div>
              <h2 className='font-serif text-4xl md:text-5xl mb-4 text-stone-900'>
                Pedagogies
              </h2>
              <p className='text-stone-500 max-w-2xl mx-auto'>
                Research-backed pedagogies that transform abstract AI concepts
                into concrete, memorable learning experiences.
              </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto'>
              {/* Interactive Cards */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <button
                  onClick={() => setSelectedPedagogy(0)}
                  className={`p-6 rounded-xl text-left transition-all duration-300 ${
                    selectedPedagogy === 0
                      ? "bg-white border-2 border-nobel-gold shadow-lg"
                      : "bg-white border border-stone-200 hover:shadow-md"
                  }`}
                >
                  <div className='w-12 h-12 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-4'>
                    <BookOpen className='text-nobel-gold' size={20} />
                  </div>
                  <div className='font-serif text-xl text-stone-900 mb-2'>
                    Narrative-Driven
                  </div>
                  <div className='text-sm text-stone-600 leading-relaxed'>
                    Story-based learning with relatable scenarios
                  </div>
                </button>

                <button
                  onClick={() => setSelectedPedagogy(1)}
                  className={`p-6 rounded-xl text-left transition-all duration-300 ${
                    selectedPedagogy === 1
                      ? "bg-white border-2 border-nobel-gold shadow-lg"
                      : "bg-white border border-stone-200 hover:shadow-md"
                  }`}
                >
                  <div className='w-12 h-12 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-4'>
                    <Zap className='text-nobel-gold' size={20} />
                  </div>
                  <div className='font-serif text-xl text-stone-900 mb-2'>
                    Cognitive Load Theory
                  </div>
                  <div className='text-sm text-stone-600 leading-relaxed'>
                    Surface relevant information at the right time.
                  </div>
                </button>

                <button
                  onClick={() => setSelectedPedagogy(2)}
                  className={`p-6 rounded-xl text-left transition-all duration-300 ${
                    selectedPedagogy === 2
                      ? "bg-white border-2 border-nobel-gold shadow-lg"
                      : "bg-white border border-stone-200 hover:shadow-md"
                  }`}
                >
                  <div className='w-12 h-12 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-4'>
                    <Lightbulb className='text-nobel-gold' size={20} />
                  </div>
                  <div className='font-serif text-xl text-stone-900 mb-2'>
                    Constructivist
                  </div>
                  <div className='text-sm text-stone-600 leading-relaxed'>
                    Active exploration and hands-on learning
                  </div>
                </button>

                <button
                  onClick={() => setSelectedPedagogy(3)}
                  className={`p-6 rounded-xl text-left transition-all duration-300 ${
                    selectedPedagogy === 3
                      ? "bg-white border-2 border-nobel-gold shadow-lg"
                      : "bg-white border border-stone-200 hover:shadow-md"
                  }`}
                >
                  <div className='w-12 h-12 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-4'>
                    <Scale className='text-nobel-gold' size={20} />
                  </div>
                  <div className='font-serif text-xl text-stone-900 mb-2'>
                    Scaffolding
                  </div>
                  <div className='text-sm text-stone-600 leading-relaxed'>
                    Less hand-holding as learners progress.
                  </div>
                </button>
              </div>

              {/* Display Box */}
              <div className='bg-white rounded-xl border-2 border-stone-200 shadow-lg overflow-hidden'>
                <div className='p-6 border-b border-stone-200 bg-stone-50'>
                  <h3 className='font-serif text-xl text-stone-900 mb-3'>
                    {selectedPedagogy === 0 && "Narrative-Driven Learning"}
                    {selectedPedagogy === 1 && "Cognitive Load Theory"}
                    {selectedPedagogy === 2 && "Constructivist Learning"}
                    {selectedPedagogy === 3 && "Scaffolding"}
                  </h3>
                  <p className='text-sm text-stone-600 leading-relaxed'>
                    {selectedPedagogy === 0 &&
                      "Students connect with Sam, a relatable high school character facing real-world problems that MCP can solve."}
                    {selectedPedagogy === 1 &&
                      "Content is presented in a way that is easy to understand and follow, with progressive disclosure to prevent cognitive overload."}
                    {selectedPedagogy === 2 &&
                      "Interactive playground and exercises to encourage active learning and hands-on exploration."}
                    {selectedPedagogy === 3 &&
                      "Scaffolding through prior knowledge and relatable life examples and through exercises that gradually become more difficult."}
                  </p>
                </div>
                <div className='aspect-video bg-stone-100 flex items-center justify-center'>
                  {selectedPedagogy === 0 && (
                    <img
                      src='/Meet Sam.png'
                      alt='Meet Sam - Narrative introduction showing a relatable high school student character'
                      className='w-full h-full object-cover'
                    />
                  )}
                  {selectedPedagogy === 1 && (
                    <img
                      src='/6-stages.png'
                      alt='Cognitive Load Theory - Surface relevant information at the right time.'
                      className='w-full h-full object-cover'
                    />
                  )}
                  {selectedPedagogy === 2 && (
                    <img
                      src='/playground.png'
                      alt='Constructivist Learning - Interactive playground with toggleable MCP servers'
                      className='w-full h-full object-cover'
                    />
                  )}
                  {selectedPedagogy === 3 && (
                    <img
                      src='/comparison.png'
                      alt='Scaffolding - Side-by-side view of AI with and without MCP capabilities and relatable life examples'
                      className='w-full h-full object-cover'
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {presentationMode && (
            <div className='absolute bottom-8 left-0 right-0 flex justify-center z-20'>
              <NavigationButton targetId='insights' />
            </div>
          )}
        </section>

        {/* Insights */}
        <section
          id='insights'
          className={`bg-white border-t border-stone-200 relative ${
            presentationMode ? "py-16 overflow-hidden" : "py-24 overflow-hidden"
          }`}
        >
          <div className='absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none'>
            {/* Decorative background pattern - Light theme */}
            <div className='w-96 h-96 rounded-full bg-stone-200 blur-[100px] absolute top-[-100px] left-[-100px]'></div>
            <div className='w-96 h-96 rounded-full bg-nobel-gold blur-[100px] absolute bottom-[-100px] right-[-100px]'></div>
          </div>

          <div className='container mx-auto px-6 relative z-10'>
            <div className='text-center mb-16'>
              <div className='inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200'>
                INSIGHTS
              </div>
              <h2 className='font-serif text-4xl md:text-5xl mb-6 text-stone-900'>
                Lessons Learned
              </h2>
              <p className='text-lg text-stone-600 max-w-3xl mx-auto'>
                Insights from creating an interactive learning experience that
                makes advanced AI concepts accessible to high school students.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              <div
                className='flex flex-col group animate-fade-in-up p-8 bg-white rounded-xl border border-nobel-gold/40 shadow-md hover:shadow-lg transition-all duration-300'
                style={{ animationDelay: "0s" }}
              >
                <div className='w-12 h-12 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-nobel-gold/20 transition-colors'>
                  <Clock className='text-nobel-gold' size={24} />
                </div>
                <h3 className='font-serif text-xl text-stone-900 mb-3'>
                  Racing Against Evolution
                </h3>
                <p className='text-sm text-stone-600 leading-relaxed'>
                  Technology advances faster than traditional curriculum cycles.
                  MCP itself evolved rapidly, making our content quickly
                  outdated and highlighting the{" "}
                  <strong>
                    {" "}
                    urgent need to empower educators with rapid content creation
                    tools
                  </strong>
                  .
                </p>
              </div>
              <FeatureCard
                icon={Sparkles}
                title='Sprinkle some stories'
                description='Narrative-driven learning made easy–AI can be a powerful writing partner, creating engaging, relatable stories and examples tailored to each learner’s background and prior knowledge.'
                delay='0.1s'
              />
              <FeatureCard
                icon={Users}
                title='Partner up with SMEs'
                description='AI-generated errors are a real concern—but AI can also be part of the solution. It helps you reach more SMEs and makes it easier for them to weigh in. Let’s work together to build better educational materials, faster.'
                delay='0.2s'
              />
            </div>
          </div>
        </section>
      </main>

      <footer className='bg-stone-900 text-stone-400 py-16'>
        <div className='container mx-auto px-6'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-8 mb-12'>
            <div className='text-center md:text-left'>
              <div className='text-white font-serif font-bold text-2xl mb-2'>
                MCP Explorer
              </div>

              <p className='text-sm mt-2'>NeurIPS 2025 Education Materials</p>
            </div>
            <div className='flex flex-col gap-3 text-center md:text-right'>
              <a
                href='https://mcp-explorer.vercel.app'
                target='_blank'
                rel='noopener noreferrer'
                className='text-nobel-gold hover:text-white transition-colors'
              >
                Live Demo →
              </a>
              <a
                href='https://modelcontextprotocol.io'
                target='_blank'
                rel='noopener noreferrer'
                className='text-stone-400 hover:text-white transition-colors text-sm'
              >
                Learn More About MCP
              </a>
            </div>
          </div>
          <div className='border-t border-stone-700 pt-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-sm'>
              <div>
                <h4 className='text-white font-bold mb-2'>Target Audience</h4>
                <p className='text-stone-500'>
                  High school students (ages 14-18) with no prior technical
                  background
                </p>
              </div>
              <div>
                <h4 className='text-white font-bold mb-2'>Duration</h4>
                <p className='text-stone-500'>
                  10-15 minute interactive learning module
                </p>
              </div>
              <div>
                <h4 className='text-white font-bold mb-2'>License</h4>
                <p className='text-stone-500'>
                  MIT License - Free for educational use
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='text-center mt-12 text-xs text-stone-600'>
          NeurIPS 2025 Education Materials. By Sherry Ruan & Joyce He.
        </div>
      </footer>
    </div>
  );
};

export default App;
