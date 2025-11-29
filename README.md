# MCP Explorer - NeurIPS 2025 Presentation

An interactive presentation and learning platform demonstrating how AI-powered tools can help educators create engaging educational materials about cutting-edge AI concepts.

## Overview

MCP Explorer is a narrative-driven interactive learning experience designed to teach high school students (ages 14-18) about Anthropic's Model Context Protocol (MCP) without requiring any technical background. This project serves dual purposes:

1. **Primary Goal**: Make advanced AI concepts accessible to students through an engaging 10-15 minute interactive module
2. **Secondary Goal**: Demonstrate how AI-assisted development tools can empower educators to rapidly create sophisticated learning experiences

## Live Demo

- **Interactive Learning Platform**: [mcp-explorer.vercel.app](https://mcp-explorer.vercel.app)
- **Presentation Mode**: Add `?presentation=true` to the URL for slideshow navigation

## Key Features

- **Narrative-Driven Learning**: Students follow Sam, a relatable high school character, through real-world scenarios
- **Interactive Playground**: Hands-on experimentation with toggleable MCP servers to understand context in AI
- **Zero Prerequisites**: Designed for complete beginners with no technical background
- **Research-Backed Pedagogy**: Incorporates cognitive load theory, constructivist learning, and scaffolding techniques
- **AI-Powered Development**: Built using AI-assisted development tools to demonstrate rapid content creation

## Pedagogical Framework

The platform implements four key pedagogical approaches:

1. **Narrative-Driven Learning**: Story-based scenarios with relatable characters and real-world problems
2. **Cognitive Load Theory**: Progressive disclosure of information to prevent cognitive overload
3. **Constructivist Learning**: Active exploration through interactive exercises and playground
4. **Scaffolding**: Gradual reduction of support as learners progress through the material

## Project Structure

```
neurips-presentation/
├── presentation/          # Main React application
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd neurips-presentation/presentation
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Presentation Mode

To view the presentation with navigation controls optimized for presenting:

```
http://localhost:5173?presentation=true
```

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Styling and design system
- **Three.js / React Three Fiber** - 3D visualizations
- **Vite** - Build tool and development server

## The Challenge

This project addresses a critical challenge in AI education: **How do we keep pace with AI evolution while helping learners stay current and engaged?**

Key challenges addressed:
- **Rapid Innovation**: New AI concepts emerge faster than traditional curriculum cycles
- **Student Engagement**: Learners need relevant, current content with real-world applications
- **Educator Capacity**: Teachers must balance staying current while managing existing responsibilities

## Insights & Lessons Learned

1. **Racing Against Evolution**: Technology advances faster than traditional curriculum cycles, highlighting the urgent need to empower educators with rapid content creation tools

2. **Sprinkle Some Stories**: Narrative-driven learning made easy—AI can be a powerful writing partner for creating engaging, relatable content

3. **Partner with SMEs**: AI-generated errors are a concern, but AI also makes it easier to collaborate with subject matter experts to build better educational materials faster

## Target Audience

- High school students (ages 14-18)
- No prior technical or programming background required
- Interest in learning about AI and emerging technologies

## Duration

10-15 minute interactive learning experience

## Authors

- Sherry Ruan
- Joyce He

## License

MIT License - Free for educational use

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io)
- [Live Demo](https://mcp-explorer.vercel.app)

## Acknowledgments

This project was developed for NeurIPS 2025 Education Materials track, demonstrating how AI-assisted development tools can empower educators to create sophisticated, interactive learning experiences rapidly and effectively.

---

**NeurIPS 2025 Education Materials** | Built with AI-assisted development tools
