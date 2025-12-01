/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { LearningWorkflowDiagram } from "./components/Diagrams";
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
  AtSign,
  MessageSquare,
} from "lucide-react";

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
      const elementTop = element.offsetTop;

      window.scrollTo({
        top: elementTop,
        behavior: "smooth",
      });
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
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Hide nav when scrolled down
      if (window.scrollY > 100) {
        setShowNav(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Show nav when mouse is near the top (within 100px)
      if (e.clientY < 100) {
        setShowNav(true);
      } else if (window.scrollY > 100) {
        setShowNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
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
      const elementTop = element.offsetTop;

      window.scrollTo({
        top: elementTop,
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
        } ${
          showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className='container mx-auto px-8 md:px-16 flex justify-between items-center'>
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
              href='#pedagogy'
              onClick={scrollToSection("pedagogy")}
              className='hover:text-nobel-gold transition-colors cursor-pointer uppercase'
            >
              Process
            </a>
            <a
              href='#pedagogies'
              onClick={scrollToSection("pedagogies")}
              className='hover:text-nobel-gold transition-colors cursor-pointer uppercase'
            >
              Pedagogies
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
            href='#pedagogy'
            onClick={scrollToSection("pedagogy")}
            className='hover:text-nobel-gold transition-colors cursor-pointer uppercase'
          >
            Process
          </a>
          <a
            href='#pedagogies'
            onClick={scrollToSection("pedagogies")}
            className='hover:text-nobel-gold transition-colors cursor-pointer uppercase'
          >
            Pedagogies
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

        <div className='relative z-10 container mx-auto px-8 md:px-16 text-center'>
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
          <p className='max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12'>
            Jiayu He, Sherry Ruan, James Landay
          </p>

          <div className='flex justify-center gap-6'>
            <button
              onClick={() => {
                const element = document.getElementById("overview");
                if (element) {
                  window.scrollTo({
                    top: element.offsetTop,
                    behavior: "smooth",
                  });
                }
              }}
              className='group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer'
            >
              <span>EXPLORE</span>
              <span className='p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50'>
                <ArrowDown size={16} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Overview */}
        <section
          id='overview'
          className={`bg-white relative min-h-screen flex flex-col justify-center ${
            presentationMode ? "py-16 overflow-hidden" : "py-24"
          }`}
        >
          <div
            className={`container mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start`}
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
                ow might we teach high school students about advanced AI
                concepts without overwhelming them?{" "}
                <strong className='text-stone-900 font-medium'>
                  MCP Explorer
                </strong>{" "}
                is a 10–15 minute interactive experience that makes abstract
                ideas tangible through hands-on discovery.
              </p>
              <p>
                The Model Context Protocol (MCP) connects AI assistants to
                external tools and data sources—but instructions alone don't
                stick. In this{" "}
                <strong className='text-stone-900 font-medium'>
                  narrative-driven journey
                </strong>
                , students experiment through simple toggles and chat
                interfaces, discovering firsthand why MCP transforms what AI can
                do.
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
          <div className='absolute bottom-8 right-8'>
            <NavigationButton targetId='challenge' />
          </div>
        </section>

        {/* The Challenge */}
        <section
          id='challenge'
          className={`bg-stone-900 text-stone-100 relative min-h-screen flex flex-col justify-center ${
            presentationMode ? "py-16 overflow-hidden" : "py-32 overflow-hidden"
          }`}
        >
          {/* Decorative Elements */}
          <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-nobel-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3'></div>
          <div className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-stone-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3'></div>

          <div className={`container mx-auto px-8 md:px-16 relative z-10`}>
            <div className='max-w-5xl mx-auto'>
              {/* Icon & Label */}
              <div className='flex justify-center mb-6'>
                <div className='inline-flex items-center gap-2 px-3 py-1 bg-stone-800/80 backdrop-blur-sm border border-stone-700 rounded-full shadow-sm'>
                  <Target className='text-nobel-gold' size={14} />
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
                <p className='text-lg text-stone-400 leading-relaxed text-center'>
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
                    cycles can follow
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
                    Educators are already stretched thin—staying current is one
                    more demand
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='absolute bottom-8 right-8 z-20'>
            <button
              onClick={() => {
                const element = document.getElementById('innovation');
                if (element) {
                  window.scrollTo({
                    top: element.offsetTop,
                    behavior: 'smooth',
                  });
                }
              }}
              className='group flex flex-col items-center gap-2 text-sm font-medium text-stone-400 hover:text-nobel-gold transition-colors cursor-pointer'
              aria-label='Go to innovation'
            >
              <span className='p-2 border border-stone-700 rounded-full group-hover:border-nobel-gold transition-colors bg-stone-800/50'>
                <ArrowDown size={16} className='text-stone-400 group-hover:text-nobel-gold transition-colors' />
              </span>
            </button>
          </div>
        </section>

        {/* AI-Powered Educational Innovation */}
        <section
          id='innovation'
          className={`bg-gradient-to-br from-stone-50 via-[#F9F8F4] to-stone-100 relative min-h-screen flex flex-col justify-center ${
            presentationMode ? "py-16 overflow-hidden" : "py-24 overflow-hidden"
          }`}
        >
          <div className='absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none'>
            {/* Decorative background pattern - Gold/Stone theme */}
            <div className='w-96 h-96 rounded-full bg-nobel-gold blur-[100px] absolute top-[-100px] left-[-100px]'></div>
            <div className='w-96 h-96 rounded-full bg-stone-300 blur-[100px] absolute bottom-[-100px] right-[-100px]'></div>
          </div>

          <div className={`container mx-auto px-8 md:px-16 relative z-10`}>
            <div className='text-center mb-8'>
              <div className='inline-flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-sm text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-4 border border-stone-200'>
                <Lightbulb size={14} /> SECONDARY GOAL
              </div>
              <h2 className='font-serif text-4xl md:text-5xl text-center mb-6 leading-tight animate-fade-in-up text-stone-900'>
                AI-Powered Educational Innovation
              </h2>
              <p className='text-lg text-stone-600 mb-8 leading-relaxed max-w-3xl mx-auto'>
                Beyond helping students learn about AI, this project
                demonstrates how AI tools can help educators create engaging
                learning experiences—fast.
              </p>
            </div>

            <div className='max-w-4xl mx-auto'>
              <div className='bg-white/60 backdrop-blur-sm border border-stone-200 rounded-xl p-6 md:p-8 shadow-sm'>
                <p className='text-base text-stone-600 leading-relaxed'>
                  The entire MCP Explorer platform was built with AI-powered
                  development tools. No dedicated dev team, no extensive
                  programming background required. It's a proof of concept:
                  sophisticated, interactive learning experiences are now within
                  reach.
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
                <div className='text-center p-4 bg-white/60 backdrop-blur-sm border border-stone-200 rounded-lg shadow-sm'>
                  <div className='text-2xl font-serif text-nobel-gold mb-1'>
                    Fast
                  </div>
                  <div className='text-xs text-stone-600 uppercase tracking-wide'>
                    Rapid Development
                  </div>
                </div>
                <div className='text-center p-4 bg-white/60 backdrop-blur-sm border border-stone-200 rounded-lg shadow-sm'>
                  <div className='text-2xl font-serif text-nobel-gold mb-1'>
                    Accessible
                  </div>
                  <div className='text-xs text-stone-600 uppercase tracking-wide'>
                    No Deep Tech Skills
                  </div>
                </div>
                <div className='text-center p-4 bg-white/60 backdrop-blur-sm border border-stone-200 rounded-lg shadow-sm'>
                  <div className='text-2xl font-serif text-nobel-gold mb-1'>
                    Engaging
                  </div>
                  <div className='text-xs text-stone-600 uppercase tracking-wide'>
                    Interactive & Visual
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='absolute bottom-8 right-8 z-20'>
            <NavigationButton targetId='pedagogy' />
          </div>
        </section>

        {/* Our Process */}
        <section
          id='pedagogy'
          className={`bg-white relative min-h-screen flex flex-col justify-center ${
            presentationMode ? "pt-8 pb-4 overflow-hidden" : "pt-12 pb-6"
          }`}
        >
          {/* className={`bg-white relative min-h-screen flex flex-col justify-center ${
            presentationMode ? "py-8 overflow-hidden" : "py-12"
          }`} */}
          {/* className={`bg-white relative min-h-screen flex flex-col justify-center ${
            presentationMode ? "py-12 overflow-hidden" : "py-16"
          }`} */}
          {/* className={`bg-white relative min-h-screen flex flex-col justify-center ${
            presentationMode ? "py-16 overflow-hidden" : "py-24"
          }`} */}
          <div className={` mx-auto px-4`}>
            {/* Header Section - Centered */}
            <div className='text-center mb-4 mt-3'>
              {/* <div className='text-center mb-4'> */}
              {/* <div className='text-center mb-6'> */}
              {/* <div className='text-center mb-12'> */}
              <div className='inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-2 border border-stone-200'>
                {/* <div className='inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-3 border border-stone-200'> */}
                {/* <div className='inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200'> */}
                <BookOpen size={14} /> OUR PROCESS
              </div>
              <h2 className='font-serif text-4xl md:text-5xl mb-2 text-stone-900'>
                {/* <h2 className='font-serif text-4xl md:text-5xl mb-4 text-stone-900'> */}
                {/* <h2 className='font-serif text-4xl md:text-5xl mb-6 text-stone-900'> */}
                From Concept to Reality
              </h2>
              <p className='text-lg text-stone-600 mb-3 leading-relaxed max-w-3xl mx-auto'>
                {/* <p className='text-lg text-stone-600 mb-4 leading-relaxed max-w-3xl mx-auto'> */}
                {/* <p className='text-lg text-stone-600 mb-8 leading-relaxed max-w-3xl mx-auto'> */}
                How we built MCP Explorer with AI tools.
              </p>
            </div>

            {/* Conditional Content Based on Presentation Mode */}
            {presentationMode ? (
              /* Process Steps - Three Column Grid (Presentation Mode) */
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
                <div className='bg-gradient-to-br from-stone-50 to-white rounded-xl p-6 border-2 border-stone-200 hover:border-nobel-gold/50 transition-all duration-300 hover:shadow-lg'>
                  <div className='w-12 h-12 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-4'>
                    <Target className='text-nobel-gold' size={24} />
                  </div>
                  <h3 className='font-serif text-xl text-stone-900 mb-3'>
                    Research & Planning
                  </h3>
                  <p className='text-sm text-stone-600 leading-relaxed'>
                    Define learning goals, choose pedagogies, and draft design
                    requirements.
                  </p>
                </div>

                <div className='bg-gradient-to-br from-stone-50 to-white rounded-xl p-6 border-2 border-stone-200 hover:border-nobel-gold/50 transition-all duration-300 hover:shadow-lg'>
                  <div className='w-12 h-12 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-4'>
                    <Sparkles className='text-nobel-gold' size={24} />
                  </div>
                  <h3 className='font-serif text-xl text-stone-900 mb-3'>
                    Prototype Learning Experience
                  </h3>
                  <p className='text-sm text-stone-600 leading-relaxed'>
                    Draft content — lessons, quizzes — and rapidly prototype
                    with Claude Code.
                  </p>
                </div>

                <div className='bg-gradient-to-br from-stone-50 to-white rounded-xl p-6 border-2 border-stone-200 hover:border-nobel-gold/50 transition-all duration-300 hover:shadow-lg'>
                  <div className='w-12 h-12 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-4'>
                    <Users className='text-nobel-gold' size={24} />
                  </div>
                  <h3 className='font-serif text-xl text-stone-900 mb-3'>
                    Iterate
                  </h3>
                  <p className='text-sm text-stone-600 leading-relaxed'>
                    Get feedback from experts, test with learners, and use AI to
                    help audit for gaps.
                  </p>
                </div>
              </div>
            ) : (
              /* Learning Process Diagram (Normal Mode) */
              <LearningWorkflowDiagram />
            )}
          </div>
          <div className='absolute bottom-8 right-8 z-20'>
            {/* <div className='absolute bottom-16 right-8 z-20'> */}
            <NavigationButton targetId='pedagogies' />
          </div>
        </section>

        {/* Pedagogical Approaches */}
        <section
          id='pedagogies'
          className={`bg-[#F5F4F0] relative min-h-screen flex flex-col justify-center ${
            presentationMode ? "py-12 overflow-hidden" : "py-16"
          }`}
        >
          {/* className={`bg-[#F5F4F0] relative min-h-screen flex flex-col justify-center ${
            presentationMode ? "py-16 overflow-hidden" : "py-24"
          }`} */}
          <div className={`container mx-auto px-8 md:px-16`}>
            <div className='text-center mb-6'>
              {/* <div className='text-center mb-8'> */}
              <div className='inline-flex items-center gap-2 px-3 py-1 bg-white text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-4 border border-stone-200'>
                {/* <div className='inline-flex items-center gap-2 px-3 py-1 bg-white text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200'> */}
                <Lightbulb size={14} /> PEDAGOGICAL APPROACHES
              </div>
              <h2 className='font-serif text-4xl md:text-5xl mb-4 text-stone-900'>
                {/* <h2 className='font-serif text-4xl md:text-5xl mb-6 text-stone-900'> */}
                Pedagogies
              </h2>
              <p className='text-lg text-stone-600 mb-6 leading-relaxed max-w-3xl mx-auto'>
                {/* <p className='text-lg text-stone-600 mb-8 leading-relaxed max-w-3xl mx-auto'> */}
                Research-backed methods that make abstract AI concepts click.
              </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto'>
              {/* Interactive Cards */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <button
                  onClick={() => setSelectedPedagogy(0)}
                  className={`p-4 rounded-xl text-left transition-all duration-300 ${
                    selectedPedagogy === 0
                      ? "bg-white border-2 border-nobel-gold shadow-lg"
                      : "bg-white border border-stone-200 hover:shadow-md"
                  }`}
                >
                  <div className='w-10 h-10 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-3'>
                    <BookOpen className='text-nobel-gold' size={18} />
                  </div>
                  <div className='font-serif text-lg text-stone-900 mb-1'>
                    Narrative-Driven
                  </div>
                  <div className='text-sm text-stone-600 leading-relaxed'>
                    Story-based learning with relatable scenarios
                  </div>
                </button>

                <button
                  onClick={() => setSelectedPedagogy(1)}
                  className={`p-4 rounded-xl text-left transition-all duration-300 ${
                    selectedPedagogy === 1
                      ? "bg-white border-2 border-nobel-gold shadow-lg"
                      : "bg-white border border-stone-200 hover:shadow-md"
                  }`}
                >
                  <div className='w-10 h-10 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-3'>
                    <Zap className='text-nobel-gold' size={18} />
                  </div>
                  <div className='font-serif text-lg text-stone-900 mb-1'>
                    Cognitive Load Theory
                  </div>
                  <div className='text-sm text-stone-600 leading-relaxed'>
                    Bite-sized concepts that build without overwhelming
                  </div>
                </button>

                <button
                  onClick={() => setSelectedPedagogy(2)}
                  className={`p-4 rounded-xl text-left transition-all duration-300 ${
                    selectedPedagogy === 2
                      ? "bg-white border-2 border-nobel-gold shadow-lg"
                      : "bg-white border border-stone-200 hover:shadow-md"
                  }`}
                >
                  <div className='w-10 h-10 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-3'>
                    <Lightbulb className='text-nobel-gold' size={18} />
                  </div>
                  <div className='font-serif text-lg text-stone-900 mb-1'>
                    Constructivist
                  </div>
                  <div className='text-sm text-stone-600 leading-relaxed'>
                    Learn by doing, not just reading
                  </div>
                </button>

                <button
                  onClick={() => setSelectedPedagogy(3)}
                  className={`p-4 rounded-xl text-left transition-all duration-300 ${
                    selectedPedagogy === 3
                      ? "bg-white border-2 border-nobel-gold shadow-lg"
                      : "bg-white border border-stone-200 hover:shadow-md"
                  }`}
                >
                  <div className='w-10 h-10 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-3'>
                    <Scale className='text-nobel-gold' size={18} />
                  </div>
                  <div className='font-serif text-lg text-stone-900 mb-1'>
                    Scaffolding
                  </div>
                  <div className='text-sm text-stone-600 leading-relaxed'>
                    Support when you need it, independence when you're ready
                  </div>
                </button>
              </div>

              {/* Display Box */}
              <div className='bg-white rounded-xl border-2 border-stone-200 shadow-lg overflow-hidden'>
                <div className='p-4 border-b border-stone-200 bg-stone-50'>
                  <h3 className='font-serif text-lg text-stone-900 mb-2'>
                    {selectedPedagogy === 0 && "Narrative-Driven Learning"}
                    {selectedPedagogy === 1 && "Cognitive Load Theory"}
                    {selectedPedagogy === 2 && "Constructivist Learning"}
                    {selectedPedagogy === 3 && "Scaffolding"}
                  </h3>
                  <p className='text-sm text-stone-600 leading-relaxed'>
                    {selectedPedagogy === 0 &&
                      "Follow Sam, a high school student navigating real-world problems — and discovering how MCP can help."}
                    {selectedPedagogy === 1 &&
                      "We introduce one concept at a time, so you're never overwhelmed. Each idea comes with guided practice to reinforce student understanding."}
                    {selectedPedagogy === 2 &&
                      // "A sandbox environment to learn by doing freely and safely."
                      "A sandbox environment where students can learn by doing—freely, safely, and without the fear of making mistakes."}
                    {selectedPedagogy === 3 &&
                      "We build on what you already know with relatable examples, then gradually increase complexity as your confidence grows."}
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
                      alt='Cognitive Load Theory - Surface relevant information at the right time'
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
          <div className='absolute bottom-8 right-8 z-20'>
            <NavigationButton targetId='insights' />
          </div>
        </section>

        {/* Insights */}
        <section
          id='insights'
          className={`bg-white relative min-h-screen flex flex-col justify-center ${
            presentationMode ? "py-16 overflow-hidden" : "py-24 overflow-hidden"
          }`}
        >
          <div className='absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none'>
            {/* Decorative background pattern - Light theme */}
            <div className='w-96 h-96 rounded-full bg-stone-200 blur-[100px] absolute top-[-100px] left-[-100px]'></div>
            <div className='w-96 h-96 rounded-full bg-nobel-gold blur-[100px] absolute bottom-[-100px] right-[-100px]'></div>
          </div>

          <div className='container mx-auto px-8 md:px-16 relative z-10'>
            <div className='text-center mb-16'>
              <div className='inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200'>
                <Zap size={14} /> INSIGHTS
              </div>
              <h2 className='font-serif text-4xl md:text-5xl mb-6 text-stone-900'>
                Lessons Learned
              </h2>
              <p className='text-lg text-stone-600 max-w-3xl mx-auto'>
                What building this taught us.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              <div
                className='flex flex-col group animate-fade-in-up p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-nobel-gold/50'
                style={{ animationDelay: "0s" }}
              >
                <div className='w-12 h-12 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-nobel-gold/20 transition-colors'>
                  <Clock className='text-nobel-gold' size={24} />
                </div>
                <h3 className='font-serif text-xl text-stone-900 mb-3'>
                  Racing Against Evolution
                </h3>
                <p className='text-sm text-stone-600 leading-relaxed'>
                  <strong className='text-stone-900 font-medium'>Technology moves faster than traditional curriculum cycles.</strong>{" "}
                  MCP itself evolved, making some of our content outdated before
                  launch — a reminder that <strong className='text-stone-900 font-medium'>educators need tools that can adapt
                  just as quickly.</strong>
                </p>
              </div>
              <div
                className='flex flex-col group animate-fade-in-up p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-nobel-gold/50'
                style={{ animationDelay: '0.1s' }}
              >
                <div className='w-12 h-12 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-nobel-gold/20 transition-colors'>
                  <Sparkles className='text-nobel-gold' size={24} />
                </div>
                <h3 className='font-serif text-xl text-stone-900 mb-3'>Sprinkle some stories</h3>
                <p className='text-sm text-stone-600 leading-relaxed'>
                  <strong className='text-stone-900 font-medium'>AI makes narrative-driven learning practical at scale</strong> — generating relatable scenarios and examples tailored to each learner's background and prior knowledge. Why not use it to make learning more engaging?
                </p>
              </div>
              <div
                className='flex flex-col group animate-fade-in-up p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-nobel-gold/50'
                style={{ animationDelay: '0.2s' }}
              >
                <div className='w-12 h-12 bg-nobel-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-nobel-gold/20 transition-colors'>
                  <Users className='text-nobel-gold' size={24} />
                </div>
                <h3 className='font-serif text-xl text-stone-900 mb-3'>Bring in the Experts</h3>
                <p className='text-sm text-stone-600 leading-relaxed'>
                  AI-generated errors are a real concern — but <strong className='text-stone-900 font-medium'>AI can also be part of the solution.</strong> It helps you reach more subject-matter experts and makes it easier for them to review and contribute.
                </p>
              </div>
            </div>
          </div>
          <div className='absolute bottom-8 right-8 z-20'>
            <NavigationButton targetId='follow' />
          </div>
        </section>

        {/* Follow Us Section */}
        <section
          id='follow'
          className='bg-gradient-to-br from-stone-100 to-stone-50 relative min-h-screen flex flex-col justify-center'
        >
          <div className='container mx-auto px-8 md:px-16'>
            <div className='max-w-4xl mx-auto text-center'>
              <div className='inline-flex items-center gap-2 px-3 py-1 bg-white text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200'>
                <MessageSquare size={14} /> GET IN TOUCH
              </div>
              <h2 className='font-serif text-3xl md:text-4xl mb-4 text-stone-900'>
                Follow Us & Share Your Feedback
              </h2>
              <p className='text-base text-stone-600 mb-8 max-w-2xl mx-auto'>
                Connect with us on X (Twitter) and share your thoughts on making
                AI education more accessible.
              </p>

              <div className='flex justify-center mb-8'>
                <div className='relative w-32 h-32'>
                  {/* Colorful floating particles - matching hero scene colors */}
                  <div className='absolute top-2 right-4 w-2 h-2 rounded-full animate-pulse' style={{ backgroundColor: '#9333EA', animationDuration: '3s', opacity: 0.6 }}></div>
                  <div className='absolute bottom-4 left-2 w-1.5 h-1.5 rounded-full animate-pulse' style={{ backgroundColor: '#06B6D4', animationDuration: '4s', animationDelay: '0.5s', opacity: 0.5 }}></div>
                  <div className='absolute top-8 left-6 w-1.5 h-1.5 rounded-full animate-pulse' style={{ backgroundColor: '#10B981', animationDuration: '3.5s', animationDelay: '1s', opacity: 0.6 }}></div>
                  <div className='absolute bottom-8 right-6 w-1.5 h-1.5 rounded-full animate-pulse' style={{ backgroundColor: '#F59E0B', animationDuration: '4.5s', animationDelay: '1.5s', opacity: 0.5 }}></div>
                  <div className='absolute top-1/2 right-2 w-1 h-1 rounded-full animate-pulse' style={{ backgroundColor: '#EF4444', animationDuration: '3.8s', animationDelay: '0.8s', opacity: 0.6 }}></div>
                  <div className='absolute top-1/3 left-3 w-1 h-1 rounded-full animate-pulse' style={{ backgroundColor: '#4F46E5', animationDuration: '4.2s', animationDelay: '1.2s', opacity: 0.5 }}></div>

                  {/* Colorful rotating rings - like orbital paths with gradient effects */}
                  <div className='absolute inset-0 rounded-full animate-spin' style={{
                    border: '2px solid transparent',
                    backgroundImage: 'linear-gradient(white, white), linear-gradient(90deg, #9333EA, #06B6D4, #10B981)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    animationDuration: '20s',
                    opacity: 0.3
                  }}></div>
                  <div className='absolute inset-2 rounded-full animate-spin' style={{
                    border: '2px solid transparent',
                    backgroundImage: 'linear-gradient(white, white), linear-gradient(180deg, #F59E0B, #EF4444, #C5A059)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    animationDuration: '15s',
                    animationDirection: 'reverse',
                    opacity: 0.25
                  }}></div>

                  {/* Main icon - color transition */}
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='relative transition-all duration-500 hover:scale-110'>
                      <BookOpen size={64} strokeWidth={2} style={{
                        filter: 'drop-shadow(0 0 12px rgba(197, 160, 89, 0.4)) drop-shadow(0 0 20px rgba(147, 51, 234, 0.3))',
                        stroke: 'url(#bookGradient)'
                      }} />
                      <svg width="0" height="0" style={{ position: 'absolute' }}>
                        <defs>
                          <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#E5D4A1', stopOpacity: 1 }}>
                              <animate attributeName="stop-color" values="#E5D4A1; #C4B5FD; #7DD3FC; #86EFAC; #FCD34D; #FCA5A5; #E5D4A1" dur="8s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="50%" style={{ stopColor: '#C4B5FD', stopOpacity: 1 }}>
                              <animate attributeName="stop-color" values="#C4B5FD; #7DD3FC; #86EFAC; #FCD34D; #FCA5A5; #E5D4A1; #C4B5FD" dur="8s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="100%" style={{ stopColor: '#7DD3FC', stopOpacity: 1 }}>
                              <animate attributeName="stop-color" values="#7DD3FC; #86EFAC; #FCD34D; #FCA5A5; #E5D4A1; #C4B5FD; #7DD3FC" dur="8s" repeatCount="indefinite" />
                            </stop>
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                <a
                  href='https://x.com/ruansherry'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-1 px-6 py-3 bg-white border-2 border-stone-900 rounded-full hover:bg-stone-900 hover:text-white transition-all duration-300 shadow-sm min-w-[200px] justify-center'
                >
                  <AtSign
                    size={18}
                    className='group-hover:scale-110 transition-transform'
                  />
                  <span className='font-medium'>ruansherry</span>
                </a>
                <a
                  href='https://x.com/landay'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-1 px-6 py-3 bg-white border-2 border-stone-900 rounded-full hover:bg-stone-900 hover:text-white transition-all duration-300 shadow-sm min-w-[200px] justify-center'
                >
                  <AtSign
                    size={18}
                    className='group-hover:scale-110 transition-transform'
                  />
                  <span className='font-medium'>landay</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className='bg-stone-900 text-stone-400 py-16'>
        <div className='container mx-auto px-8 md:px-16'>
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
