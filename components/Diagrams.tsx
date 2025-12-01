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

const ICON_SIZES = {
  DEFAULT: 20,
  SMALL: 18,
  AI_TIP: 14,
} as const;

const ARROW_CONFIG: Partial<xarrowPropsType> = {
  color: "#C5a0591A",
  strokeWidth: 3,
  headSize: 5,
  showHead: true,
  showTail: false,
  animateDrawing: false,
  dashness: false,
  path: "smooth",
  curveness: 0.6,
} as const;

const WORKFLOW_CARDS: CardProps[] = [
  {
    id: "define-goals",
    title: "Define Goals & Pedagogies",
    icon: <Target size={ICON_SIZES.DEFAULT} className='text-stone-400' />,
    description: "Set learning objectives and choose pedagogical approaches",
    aiSupport:
      "New to the topic? AI can help you research content and apply learning design best practices.",
    output: ["learning-goals.md"],
  },
  {
    id: "develop-content",
    title: "Develop Core Content",
    icon: <FileText size={ICON_SIZES.SMALL} className='text-stone-400' />,
    description: "Create materials and quizzes aligned with learning goals",
    input: ["learning-goals.md"],
    aiSupport:
      "Give AI credible sources and learner personas to improve content quality.",
    output: ["content.md", "quiz.md"],
    variant: "compact",
  },
  {
    id: "design-experience",
    title: "Design the Experience",
    icon: <Sparkles size={ICON_SIZES.SMALL} className='text-stone-400' />,
    description: "Describe vision for the learning experience",
    input: ["content.md", "quiz.md"],
    aiSupport:
      "Save time by asking AI to draft product requirements. Share examples to help it understand your vision.",
    output: ["requirements.md"],
    variant: "compact",
  },
  {
    id: "build",
    title: "Build",
    icon: <Code size={ICON_SIZES.DEFAULT} className='text-stone-400' />,
    description: "Put everything together to create the final experience",
    input: ["content.md", "quiz.md", "requirements.md"],
    aiSupport:
      "Use AI to audit accessibility and enhance the learning experience.",
    output: ["Interactive Learning Experience"],
  },
];

// --- UTILITY COMPONENTS ---
const ListItem: React.FC<{ item: string; isActive?: boolean }> = ({
  item,
  isActive = false,
}) => (
  <div
    className={`text-xs text-stone-600 leading-relaxed rounded px-2 py-1 transition-colors duration-300 ${
      isActive ? "bg-nobel-gold/20" : "bg-stone-50"
    }`}
  >
    {item}
  </div>
);

const ListSection: React.FC<{
  items: string[];
  label: string;
  isActive?: boolean;
}> = ({ items, label, isActive = false }) => (
  <div className='mb-2'>
    <div className='text-[10px] font-bold text-stone-500 uppercase tracking-wide mb-1'>
      {label}
    </div>
    <div className='space-y-1'>
      {items.map((item, i) => (
        <ListItem key={i} item={item} isActive={isActive} />
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
const Card: React.FC<
  CardProps & {
    onHover?: (id: string | undefined) => void;
    isHovering?: boolean;
    hoveredId?: string;
  }
> = ({
  id,
  title,
  icon,
  description,
  input,
  output,
  aiSupport,
  isActive = false,
  variant = "default",
  onHover,
  isHovering = false,
  hoveredId,
}) => {
  const baseClasses =
    "relative bg-white rounded-xl border-2 p-2 md:p-3 transition-all duration-500 flex flex-col cursor-pointer";
    // "relative bg-white rounded-xl border-2 p-3 md:p-4 transition-all duration-500 flex flex-col cursor-pointer";
  const activeClasses = isActive
    ? "border-nobel-gold shadow-lg"
    : "border-stone-200";
  const variantClasses = variant === "compact" ? "text-xs" : "";

  // Don't make children opaque when their container is hovered OR when Build is hovered OR when feedback cards are hovered
  const isChildOfContainer =
    id === "develop-content" || id === "design-experience";
  const containerIsHovered = hoveredId === "content-experience-container";
  const buildIsHovered = hoveredId === "build";
  const feedbackIsHovered =
    hoveredId?.includes("expert-review") || hoveredId === "learner-feedback";
  const shouldBeOpaque =
    isHovering &&
    !isActive &&
    !(
      isChildOfContainer &&
      (containerIsHovered || buildIsHovered || feedbackIsHovered)
    );
  const opacityClasses = shouldBeOpaque ? "opacity-30" : "opacity-100";

  return (
    <div
      id={id}
      className={`${baseClasses} ${activeClasses} ${variantClasses} ${opacityClasses}`}
      onMouseEnter={() => onHover?.(id)}
      onMouseLeave={() => onHover?.(undefined)}
    >
      <div className='flex items-center gap-2 md:gap-3 mb-1 md:mb-2'>
        {/* <div className='flex items-center gap-2 md:gap-3 mb-2 md:mb-3'> */}
        <div className='w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center bg-nobel-gold/10'>
          {icon}
        </div>
        <h4 className='font-serif text-sm md:text-lg text-stone-900'>
          {title}
        </h4>
      </div>

      {description && (
        <div className='mb-1 md:mb-2'>
          {/* <div className='mb-2 md:mb-3'> */}
          <p className='text-xs text-stone-600 leading-relaxed'>
            {description}
          </p>
        </div>
      )}

      {input && <ListSection items={input} label='Input' />}
      {output && <ListSection items={output} label='Output' />}
      {/* {aiSupport && <AISupportSection aiSupport={aiSupport} />} */}
    </div>
  );
};

const FeedbackCard: React.FC<
  BaseCardProps & {
    onHover?: (id: string | undefined) => void;
    isHovering?: boolean;
  }
> = ({ id, title, icon, isActive = false, onHover, isHovering = false }) => {
  const opacityClasses = isHovering && !isActive ? "opacity-30" : "opacity-100";

  return (
    <div
      id={id}
      className={`bg-white rounded-xl border-2 p-2 md:p-3 flex items-center gap-2 md:gap-3 transition-all duration-500 cursor-pointer ${opacityClasses} ${
        isActive ? "border-nobel-gold shadow-lg" : "border-stone-200"
      }`}
      // className={`bg-white rounded-xl border-2 p-3 md:p-4 flex items-center gap-2 md:gap-3 transition-all duration-500 cursor-pointer ${opacityClasses} ${
      onMouseEnter={() => onHover?.(id)}
      onMouseLeave={() => onHover?.(undefined)}
    >
      <div className='w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center bg-nobel-gold/10'>
        {icon}
      </div>
      <h4 className='font-serif text-sm md:text-lg text-stone-900'>{title}</h4>
    </div>
  );
};

// --- MAIN COMPONENT ---
export const LearningWorkflowDiagram: React.FC = () => {
  const [defineGoalsCard, developContentCard, designExperienceCard, buildCard] =
    WORKFLOW_CARDS;
  const [hoveredId, setHoveredId] = useState<string | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(false);

  const FEEDBACK_CARDS: BaseCardProps[] = [
    {
      id: `expert-review${isMobile ? "-mobile" : ""}`,
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

  const [expertReviewCard, learnerFeedbackCard] = FEEDBACK_CARDS;

  const ARROWS: ArrowConfig[] = [
    // Forward flow
    {
      start: "define-goals",
      end: "content-experience-container",
      startAnchor: isMobile ? "bottom" : "right",
      endAnchor: isMobile ? "top" : "left",
    },
    {
      start: "develop-content",
      end: "design-experience",
      startAnchor: isMobile ? "bottom" : "right",
      endAnchor: isMobile ? "top" : "left",
    },
    {
      start: "content-experience-container",
      end: "build",
      startAnchor: isMobile ? "bottom" : "right",
      endAnchor: isMobile ? "top" : "left",
    },
    // Feedback loops - Expert Review
    {
      start: "develop-content",
      end: `expert-review${isMobile ? "-mobile" : ""}`,
      startAnchor: isMobile ? "bottom" : "top",
      endAnchor: isMobile ? "top" : "left",
      _cpx1Offset: isMobile ? 100 : -200,
    },
    {
      start: `expert-review${isMobile ? "-mobile" : ""}`,
      end: "content-experience-container",
      startAnchor: isMobile ? "top" : "bottom",
      endAnchor: isMobile ? "bottom" : "top",
      curveness: 0.3,
    },
    {
      start: "build",
      end: `expert-review${isMobile ? "-mobile" : ""}`,
      startAnchor: isMobile ? "right" : "top",
      endAnchor: isMobile ? "right" : "right",
      _cpx1Offset: isMobile ? 100 : 0,
      curveness: 0.8,
    },
    // Feedback loops - Learner Feedback
    {
      start: "build",
      end: "learner-feedback",
      startAnchor: isMobile ? "right" : "bottom",
      endAnchor: "right",
      _cpx1Offset: isMobile ? 100 : 0,
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

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is Tailwind's md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get all connected node IDs for a given node
  const getConnectedNodes = (nodeId: string | undefined): Set<string> => {
    if (!nodeId) return new Set();
    const connected = new Set<string>([nodeId]);

    // Special case: when hovering design-experience, highlight container, develop-content, and build
    if (nodeId === "design-experience") {
      return new Set([
        "content-experience-container",
        "develop-content",
        "design-experience",
        "build",
      ]);
    }

    // Special case: when hovering content-experience-container, highlight itself, children, and build
    if (nodeId === "content-experience-container") {
      return new Set([
        "content-experience-container",
        "develop-content",
        "design-experience",
        "build",
      ]);
    }

    // Check only outgoing arrow connections for this node
    ARROWS.forEach((arrow) => {
      if (arrow.start === nodeId) {
        connected.add(arrow.end);
      }
    });

    // Special case: if hovering define-goals and it connects to content-experience-container,
    // also highlight develop-content (which consumes the output)
    if (
      nodeId === "define-goals" &&
      connected.has("content-experience-container")
    ) {
      connected.add("develop-content");
    }

    return connected;
  };

  // Check if an arrow should be active
  const isArrowActive = (start: string, end: string): boolean => {
    if (!hoveredId) return false;

    // Special case: highlight the arrow between content-experience-container and build
    // when hovering over design-experience or content-experience-container (but not build)
    const highlightConnectorGroup = new Set([
      "design-experience",
      "content-experience-container",
    ]);

    if (
      highlightConnectorGroup.has(hoveredId) &&
      start === "content-experience-container" &&
      end === "build"
    ) {
      return true;
    }

    return start === hoveredId;
  };

  const activeNodes = getConnectedNodes(hoveredId);
  const isHovering = hoveredId !== undefined;

  return (
    <div className='p-3 md:p-4 bg-transparent rounded-xl mt-0 mb-3 md:mb-4'>
      {/* <div className='p-4 md:p-8 bg-white rounded-xl border-2 border-stone-200 my-4 md:my-8 shadow-lg'> */}
      <Xwrapper>
        <div
          className='relative max-w-7xl mx-auto'
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Top Feedback - Expert Review Hide on Mobile*/}
          {!isMobile && (
            <div className='flex justify-center mb-4 md:mb-6'>
              <div className='w-full max-w-xs md:w-64'>
                <FeedbackCard
                  id='expert-review'
                  {...expertReviewCard}
                  isActive={activeNodes.has(expertReviewCard.id!)}
                  onHover={setHoveredId}
                  isHovering={isHovering}
                />
              </div>
            </div>
          )}

          {/* Main workflow row */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8 relative'>
            <div className='my-auto'>
              <Card
                {...defineGoalsCard}
                isActive={activeNodes.has(defineGoalsCard.id!)}
                onHover={setHoveredId}
                isHovering={isHovering}
                hoveredId={hoveredId}
              />
            </div>

            {/* Central box: Content & Experience Creation */}
            <div className='md:col-span-2 relative'>
              <div className='flex flex-col md:block gap-4'>
                <div
                  id='content-experience-container'
                  className={`bg-white rounded-xl border-2 p-2 md:p-3 transition-all duration-500 cursor-pointer ${
                    isHovering &&
                    !activeNodes.has("content-experience-container") &&
                    hoveredId !== "develop-content" &&
                    hoveredId !== "design-experience"
                      ? "opacity-30"
                      : "opacity-100"
                  } ${
                    activeNodes.has("content-experience-container")
                      ? "border-nobel-gold shadow-lg"
                      : "border-stone-200"
                  }`}
                  // className={`bg-white rounded-xl border-2 p-3 md:p-4 transition-all duration-500 cursor-pointer ${
                  onMouseEnter={() =>
                    setHoveredId("content-experience-container")
                  }
                  onMouseLeave={() => setHoveredId(undefined)}
                >
                  <h3 className='font-serif text-base md:text-lg text-stone-900 mb-3 md:mb-4 text-center'>
                    Content & Experience Creation
                  </h3>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                    <Card
                      {...developContentCard}
                      isActive={activeNodes.has(developContentCard.id!)}
                      onHover={setHoveredId}
                      isHovering={isHovering}
                      hoveredId={hoveredId}
                    />
                    <Card
                      {...designExperienceCard}
                      isActive={activeNodes.has(designExperienceCard.id!)}
                      onHover={setHoveredId}
                      isHovering={isHovering}
                      hoveredId={hoveredId}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='my-auto'>
              <Card
                {...buildCard}
                isActive={activeNodes.has(buildCard.id!)}
                onHover={setHoveredId}
                isHovering={isHovering}
                hoveredId={hoveredId}
              />
            </div>
          </div>

          {/* Bottom Feedback - Learner Feedback */}
          {isMobile && (
            <div className='flex justify-center mt-4 md:mt-6'>
              <div className='w-full max-w-xs'>
                <FeedbackCard
                  id='expert-review-mobile'
                  {...expertReviewCard}
                  isActive={activeNodes.has(expertReviewCard.id!)}
                  onHover={setHoveredId}
                  isHovering={isHovering}
                />
              </div>
            </div>
          )}

          <div className='flex justify-center mt-4 md:mt-6'>
            <div className='w-full max-w-xs md:w-64'>
              <FeedbackCard
                {...learnerFeedbackCard}
                isActive={activeNodes.has(learnerFeedbackCard.id!)}
                onHover={setHoveredId}
                isHovering={isHovering}
              />
            </div>
          </div>

          {/* Arrows - Hidden on mobile, visible on md+ screens */}
          <div>
            {ARROWS.map((arrowConfig) => {
              const isActive = isArrowActive(
                arrowConfig.start,
                arrowConfig.end
              );

              return (
                <Xarrow
                  key={`${arrowConfig.start}-${arrowConfig.end}`}
                  {...ARROW_CONFIG}
                  {...arrowConfig}
                  color={
                    isActive ? "#C5a059" : `#e7e5e4${isHovering ? "4A" : ""}`
                  }
                />
              );
            })}
          </div>
        </div>
      </Xwrapper>
    </div>
  );
};
