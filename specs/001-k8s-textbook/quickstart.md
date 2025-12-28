# Quickstart Guide: Kubernetes for Absolute Beginners Textbook

## Prerequisites
- Node.js 18+ installed on your system
- npm or yarn package manager
- Git for version control
- Basic understanding of command line tools

## Setup Instructions

### 1. Clone or Initialize the Repository
```bash
# If repository exists
git clone <repository-url>
cd my-k8s-book

# If initializing new project
npx create-docusaurus@latest my-k8s-book classic --typescript
cd my-k8s-book
```

### 2. Install Dependencies
```bash
npm install
# Or if using yarn
yarn install
```

### 3. Install Additional Dependencies for Features
```bash
# For Mermaid diagrams support
npm install @docusaurus/module-type-aliases @docusaurus/types

# For language toggle functionality
npm install react-i18next i18next
```

### 4. Add Speckit Integration (if available)
```bash
npm install -g speckit
# Or if available as a package
npm install speckit
```

## Project Structure Overview
```
my-k8s-book/                    # Docusaurus project root
├── docs/                       # Textbook content (6 chapters + intro)
│   ├── intro.md                # Welcome page
│   ├── chapter1-history.md     # Chapter 1: History of Cloud Native Applications
│   ├── chapter2-what-why.md    # Chapter 2: What, Why, Need, and How of Kubernetes
│   ├── chapter3-setup.md       # Chapter 3: Setting Up Your First Kubernetes Environment
│   ├── chapter4-concepts.md    # Chapter 4: Core Kubernetes Concepts: Pods, Deployments, and Services
│   ├── chapter5-deploy.md      # Chapter 5: Developing and Deploying Cloud-Native Apps
│   └── chapter6-best-practices.md # Chapter 6: Best Practices and Scaling
├── src/                        # Custom React components and CSS
│   ├── components/             # Reusable React components
│   │   └── LanguageToggle/     # Component for English/Urdu language switching
│   ├── css/                    # Custom styles
│   └── pages/                  # Custom pages if needed
├── static/                     # Static assets
│   └── img/                    # Diagrams and images for textbook
├── docusaurus.config.js        # Docusaurus configuration
└── sidebars.js                 # Navigation sidebar configuration
```

## Running the Development Server
```bash
npm run start
# This command starts a local development server and opens up a browser window.
# Most changes are reflected live without having to restart the server.
```

## Adding Content
1. Create new markdown files in the `docs/` directory following the naming convention
2. Add the new file to `sidebars.js` to make it appear in the navigation
3. Use Docusaurus markdown features for enhanced content:
   - Code blocks with syntax highlighting
   - Admonitions for notes and warnings
   - Mermaid diagrams

## Building for Production
```bash
npm run build
# This command generates static content into the build/ directory that can be served
# using any static hosting service.
```

## Deployment
The textbook is designed for deployment on free-tier hosting platforms:
- GitHub Pages: Follow Docusaurus deployment guide for GitHub Pages
- Vercel: Use the `vercel` CLI or connect your GitHub repository

## Configuration
Key configuration files:
- `docusaurus.config.js`: Site metadata, navigation, plugins
- `sidebars.js`: Navigation structure
- `src/css/custom.css`: Custom styles

## Language Toggle Setup
The language toggle functionality is implemented using client-side JavaScript/React:
1. Add language files to `i18n/` directory (e.g., `i18n/en/docusaurus-plugin-content-docs/current`)
2. Configure the language switcher in `docusaurus.config.js`
3. Wrap content that needs translation in translation components

## Performance Optimization
- Keep total bundle size under 10MB
- Optimize images and diagrams
- Use lightweight dependencies
- Monitor build times to ensure they stay under 30 seconds