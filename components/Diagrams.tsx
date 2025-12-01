/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Xarrow, { Xwrapper, xarrowPropsType } from "react-xarrows";
import {
  MessageCircle,
  Target,
  FileText,
  Sparkles,
  Code,
  UserCheck,
} from "lucide-react";

// --- TYPE DEFINITIONS ---
interface BaseCardProps {
  id?: string;
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

interface CardProps extends BaseCardProps {
  description?: string;
  input?: string[];
  output?: string[];
  aiSupport?: string;
  variant?: "default" | "compact";
}

interface ArrowConfig {
  start: string;
  end: string;
  startAnchor?: "auto" | "top" | "bottom" | "left" | "right";
  endAnchor?: "auto" | "top" | "bottom" | "left" | "right";
  curveness?: number;
  path?: "smooth" | "grid" | "straight";
  _cpx1Offset?: number;
}

// --- CONSTANTS ---
const TIMING = {
  ARROW_MOUNT_DELAY: 100,
} as const;

const ICON_SIZES = {
  DEFAULT: 20,
  SMALL: 18,
  AI_TIP: 14,
} as const;

const ARROW_CONFIG: Partial<xarrowPropsType> = {
  color: "#d4af37",
  strokeWidth: 3,
  headSize: 5,
  showHead: true,
  showTail: false,
  animateDrawing: false,
  dashness: false,
  path: "smooth",
  curveness: 0.6,
} as const;

const ARROWS: ArrowConfig[] = [
  // Forward flow
  {
    start: "define-goals",
    end: "content-experience-container",
    startAnchor: "right",
    endAnchor: "left",
  },
  {
    start: "develop-content",
    end: "design-experience",
    startAnchor: "right",
    endAnchor: "left",
  },
  {
    start: "content-experience-container",
    end: "build",
    startAnchor: "right",
    endAnchor: "left",
  },
  // Feedback loops - Expert Review
  {
    start: "develop-content",
    end: "expert-review",
    startAnchor: "top",
    endAnchor: "left",
    _cpx1Offset: -200,
  },
  {
    start: "expert-review",
    end: "content-experience-container",
    startAnchor: "bottom",
    endAnchor: "top",
    curveness: 0.3,
  },
  {
    start: "build",
    end: "expert-review",
    startAnchor: "top",
    endAnchor: "right",
    curveness: 0.8,
  },
  // Feedback loops - Learner Feedback
  {
    start: "build",
    end: "learner-feedback",
    startAnchor: "bottom",
    endAnchor: "right",
    curveness: 0.8,
  },
  {
    start: "learner-feedback",
    end: "content-experience-container",
    startAnchor: "top",
    endAnchor: "bottom",
    curveness: 0.3,
  },
];

const WORKFLOW_CARDS: CardProps[] = [
  {
    id: "define-goals",
    title: "Define Goals & Pedagogies",
    icon: <Target size={ICON_SIZES.DEFAULT} className='text-stone-400' />,
    description:
      "Identify learning objectives and select appropriate pedagogical approaches",
    aiSupport:
      "Use AI to incorporate educational best practices even without teaching experience",
    output: ["learning-goals.md"],
  },
  {
    id: "develop-content",
    title: "Develop Core Content",
    icon: <FileText size={ICON_SIZES.SMALL} className='text-stone-400' />,
    description: "Create materials and quizzes aligned with learning goals",
    input: ["learning-goals.md"],
    aiSupport:
      "Share credible sources and learner personas with AI to create quality content",
    output: ["content.md", "quiz.md"],
    variant: "compact",
  },
  {
    id: "design-experience",
    title: "Design the Experience",
    icon: <Sparkles size={ICON_SIZES.SMALL} className='text-stone-400' />,
    description: "Document your vision for the learning experience",
    input: ["content.md", "quiz.md"],
    aiSupport:
      "Use AI to draft requirements from design and product perspectives. Share examples to clarify your vision",
    output: ["requirements.md"],
    variant: "compact",
  },
  {
    id: "build",
    title: "Build",
    icon: <Code size={ICON_SIZES.DEFAULT} className='text-stone-400' />,
    description: "Put everything together to create the learning experience",
    input: ["content.md", "quiz.md", "requirements.md"],
    aiSupport:
      "Use AI to audit accessibility and enhance the learning experience",
    output: ["Interactive Learning Experience"],
  },
];

const FEEDBACK_CARDS: BaseCardProps[] = [
  {
    id: "expert-review",
    title: "Expert Review",
    icon: <UserCheck size={ICON_SIZES.DEFAULT} className='text-stone-400' />,
  },
  {
    id: "learner-feedback",
    title: "Learner Feedback",
    icon: (
      <MessageCircle size={ICON_SIZES.DEFAULT} className='text-stone-400' />
    ),
  },
];

// --- UTILITY COMPONENTS ---
const ListItem: React.FC<{ item: string }> = ({ item }) => (
  <div className='text-xs text-stone-600 leading-relaxed bg-stone-50 rounded px-2 py-1'>
    {item}
  </div>
);

const ListSection: React.FC<{ items: string[]; label: string }> = ({
  items,
  label,
}) => (
  <div className='mb-2'>
    <div className='text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1'>
      {label}
    </div>
    <div className='space-y-1'>
      {items.map((item, i) => (
        <ListItem key={i} item={item} />
      ))}
    </div>
  </div>
);

const AISupportSection: React.FC<{ aiSupport: string }> = ({ aiSupport }) => (
  <div className='mt-auto pt-3 border-t border-stone-200'>
    <div className='bg-nobel-gold/5 rounded-lg p-3 border border-nobel-gold/20'>
      <div className='flex items-start gap-2'>
        <Sparkles
          size={ICON_SIZES.AI_TIP}
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
);

// --- CARD COMPONENTS ---
const Card: React.FC<CardProps> = ({
  id,
  title,
  icon,
  description,
  input,
  output,
  aiSupport,
  isActive = false,
  variant = "default",
}) => {
  const baseClasses =
    "relative bg-white rounded-xl border-2 p-3 md:p-4 transition-all duration-500 flex flex-col";
  const activeClasses = isActive
    ? "border-nobel-gold shadow-lg scale-105"
    : "border-stone-200";
  const variantClasses = variant === "compact" ? "text-xs" : "";

  return (
    <div
      id={id}
      className={`${baseClasses} ${activeClasses} ${variantClasses}`}
    >
      <div className='flex items-center gap-2 md:gap-3 mb-2 md:mb-3'>
        <div className='w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center bg-nobel-gold/10'>
          {icon}
        </div>
        <h4 className='font-serif text-sm md:text-lg text-stone-900'>
          {title}
        </h4>
      </div>

      {description && (
        <div className='mb-2 md:mb-3'>
          <p className='text-xs text-stone-600 leading-relaxed'>
            {description}
          </p>
        </div>
      )}

      {input && <ListSection items={input} label='Input' />}
      {output && <ListSection items={output} label='Output' />}
      {aiSupport && <AISupportSection aiSupport={aiSupport} />}
    </div>
  );
};

const FeedbackCard: React.FC<BaseCardProps> = ({
  id,
  title,
  icon,
  isActive = false,
}) => (
  <div
    id={id}
    className={`bg-white rounded-xl border-2 p-3 md:p-4 flex items-center gap-2 md:gap-3 transition-all duration-500 ${
      isActive ? "border-nobel-gold shadow-lg" : "border-stone-200"
    }`}
  >
    <div className='w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center bg-nobel-gold/10'>
      {icon}
    </div>
    <h4 className='font-serif text-sm md:text-lg text-stone-900'>{title}</h4>
  </div>
);

// --- MAIN COMPONENT ---
export const LearningWorkflowDiagram: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, TIMING.ARROW_MOUNT_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const [defineGoalsCard, developContentCard, designExperienceCard, buildCard] =
    WORKFLOW_CARDS;
  const [expertReviewCard, learnerFeedbackCard] = FEEDBACK_CARDS;

  return (
    <div className='p-4 md:p-8 bg-white rounded-xl border-2 border-stone-200 my-4 md:my-8 shadow-lg'>
      <Xwrapper>
        <div
          className='relative max-w-7xl mx-auto'
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Top Feedback - Expert Review */}
          <div className='flex justify-center mb-4 md:mb-6'>
            <div className='w-full max-w-xs md:w-64'>
              <FeedbackCard {...expertReviewCard} />
            </div>
          </div>

          {/* Main workflow row */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8 relative'>
            <div className='my-auto'>
              <Card {...defineGoalsCard} />
            </div>

            {/* Central box: Content & Experience Creation */}
            <div className='md:col-span-2 relative'>
              <div
                id='content-experience-container'
                className='bg-white rounded-xl border-2 p-3 md:p-4 transition-all duration-500 border-stone-200'
              >
                <h3 className='font-serif text-base md:text-lg text-stone-900 mb-3 md:mb-4 text-center'>
                  Content & Experience Creation
                </h3>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                  <Card {...developContentCard} />
                  <Card {...designExperienceCard} />
                </div>
              </div>
            </div>

            <div className='my-auto'>
              <Card {...buildCard} />
            </div>
          </div>

          {/* Bottom Feedback - Learner Feedback */}
          <div className='flex justify-center mt-4 md:mt-6'>
            <div className='w-full max-w-xs md:w-64'>
              <FeedbackCard {...learnerFeedbackCard} />
            </div>
          </div>

          {/* Arrows - Hidden on mobile, visible on md+ screens */}
          {mounted && (
            <div className='hidden md:block'>
              {ARROWS.map((arrowConfig) => (
                <Xarrow
                  key={`${arrowConfig.start}-${arrowConfig.end}`}
                  {...ARROW_CONFIG}
                  {...arrowConfig}
                />
              ))}
            </div>
          )}
        </div>
      </Xwrapper>
    </div>
  );
};
