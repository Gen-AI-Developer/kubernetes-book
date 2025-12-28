---
id: 5
title: Implement K8s Textbook
stage: green
date: 2025-06-13
surface: agent
model: gpt-4
feature: 001-k8s-textbook
branch: 001-k8s-textbook
user: default
command: /sp.implement
labels: ["implementation", "kubernetes", "textbook", "docusaurus"]
links:
  spec: /specs/001-k8s-textbook/spec.md
  plan: /specs/001-k8s-textbook/plan.md
  tasks: /specs/001-k8s-textbook/tasks.md
  ticket: null
  adr: null
  pr: null
files:
 - my-k8s-book/package.json
 - my-k8s-book/docusaurus.config.js
 - my-k8s-book/sidebars.js
 - my-k8s-book/README.md
 - my-k8s-book/docs/intro.md
 - my-k8s-book/docs/chapter1-history.md
 - my-k8s-book/docs/chapter2-what-why.md
 - my-k8s-book/docs/chapter3-setup.md
 - my-k8s-book/docs/chapter4-concepts.md
 - my-k8s-book/docs/chapter5-deploy.md
 - my-k8s-book/docs/chapter6-best-practices.md
 - my-k8s-book/src/components/LanguageToggle/LanguageToggle.js
 - my-k8s-book/src/components/QuizComponent/QuizComponent.js
 - my-k8s-book/src/theme/Layout.js
 - my-k8s-book/.github/workflows/deploy.yml
 - my-k8s-book/scripts/validate-quickstart.sh
 - specs/001-k8s-textbook/tasks.md
tests:
 - scripts/validate-quickstart.sh
---

## Prompt

```
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. Run `.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks` from repo root and parse FEATURE_DIR and AVAILABLE_DOCS list. All paths must be absolute. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. **Check checklists status** (if FEATURE_DIR/checklists/ exists):
   - Scan all checklist files in the checklists/ directory
   - For each checklist, count:
     - Total items: All lines matching `- [ ]` or `- [X]` or `- [x]`
     - Completed items: Lines matching `- [X]` or `- [x]`
     - Incomplete items: Lines matching `- [ ]`
   - Create a status table:

     ```text
     | Checklist | Total | Completed | Incomplete | Status |
     |-----------|-------|-----------|------------|--------|
     | ux.md     | 12    | 12        | 0          | ✓ PASS |
     | test.md   | 8     | 5         | 3          | ✗ FAIL |
     | security.md | 6   | 6         | 0          | ✓ PASS |
     ```

   - Calculate overall status:
     - **PASS**: All checklists have 0 incomplete items
     - **FAIL**: One or more checklists have incomplete items

   - **If any checklist is incomplete**:
     - Display the table with incomplete item counts
     - **STOP** and ask: "Some checklists are incomplete. Do you want to proceed with implementation anyway? (yes/no)"
     - Wait for user response before continuing
     - If user says "no" or "wait" or "stop", halt execution
     - If user says "yes" or "proceed" or "continue", proceed to step 3

   - **If all checklists are complete**:
     - Display the table showing all checklists passed
     - Automatically proceed to step 3

3. Load and analyze the implementation context:
   - **REQUIRED**: Read tasks.md for the complete task list and execution plan
   - **REQUIRED**: Read plan.md for tech stack, architecture, and file structure
   - **IF EXISTS**: Read data-model.md for entities and relationships
   - **IF EXISTS**: Read contracts/ for API specifications and test requirements
   - **IF EXISTS**: Read research.md for technical decisions and constraints
   - **IF EXISTS**: Read quickstart.md for integration scenarios

4. **Project Setup Verification**:
   - **REQUIRED**: Create/verify ignore files based on actual project setup:

   **Detection & Creation Logic**:
   - Check if the following command succeeds to determine if the repository is a git repo (create/verify .gitignore if so):

     ```sh
     git rev-parse --git-dir 2>/dev/null
     ```

   - Check if Dockerfile* exists or Docker in plan.md → create/verify .dockerignore
   - Check if .eslintrc* exists → create/verify .eslintignore
   - Check if eslint.config.* exists → ensure the config's `ignores` entries cover required patterns
   - Check if .prettierrc* exists → create/verify .prettierignore
   - Check if .npmrc or package.json exists → create/verify .npmignore (if publishing)
   - Check if terraform files (*.tf) exist → create/verify .terraformignore
   - Check if .helmignore needed (helm charts present) → create/verify .helmignore

   **If ignore file already exists**: Verify it contains essential patterns, append missing critical patterns only
   **If ignore file missing**: Create with full pattern set for detected technology

   **Common Patterns by Technology** (from plan.md tech stack):
   - **Node.js/JavaScript/TypeScript**: `node_modules/`, `dist/`, `build/`, `*.log`, `.env*`
   - **Python**: `__pycache__/`, `*.pyc`, `.venv/`, `venv/`, `dist/`, `*.egg-info/`
   - **Java**: `target/`, `*.class`, `*.jar`, `.gradle/`, `build/`
   - **C#/.NET**: `bin/`, `obj/`, `*.user`, `*.suo`, `packages/`
   - **Go**: `*.exe`, `*.test`, `vendor/`, `*.out`
   - **Ruby**: `.bundle/`, `log/`, `tmp/`, `*.gem`, `vendor/bundle/`
   - **PHP**: `vendor/`, `*.log`, `*.cache`, `*.env`
   - **Rust**: `target/`, `debug/`, `release/`, `*.rs.bk`, `*.rlib`, `*.prof*`, `.idea/`, `*.log`, `.env*`
   - **Kotlin**: `build/`, `out/`, `.gradle/`, `.idea/`, `*.class`, `*.jar`, `*.iml`, `*.log`, `.env*`
   - **C++**: `build/`, `bin/`, `obj/`, `out/`, `*.o`, `*.so`, `*.a`, `*.exe`, `*.dll`, `.idea/`, `*.log`, `.env*`
   - **C**: `build/`, `bin/`, `obj/`, `out/`, `*.o`, `*.a`, `*.so`, `*.exe`, `Makefile`, `config.log`, `.idea/`, `*.log`, `.env*`
   - **Swift**: `.build/`, `DerivedData/`, `*.swiftpm/`, `Packages/`
   - **R**: `.Rproj.user/`, `.Rhistory`, `.RData`, `.Ruserdata`, `*.Rproj`, `packrat/`, `renv/`
   - **Universal**: `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `.vscode/`, `.idea/`

   **Tool-Specific Patterns**:
   - **Docker**: `node_modules/`, `.git/`, `Dockerfile*`, `.dockerignore`, `*.log*`, `.env*`, `coverage/`
   - **ESLint**: `node_modules/`, `dist/`, `build/`, `coverage/`, `*.min.js`
   - **Prettier**: `node_modules/`, `dist/`, `build/`, `coverage/`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`
   - **Terraform**: `.terraform/`, `*.tfstate*`, `*.tfvars`, `.terraform.lock.hcl`
   - **Kubernetes/k8s**: `*.secret.yaml`, `secrets/`, `.kube/`, `kubeconfig*`, `*.key`, `*.crt`

5. Parse tasks.md structure and extract:
   - **Task phases**: Setup, Tests, Core, Integration, Polish
   - **Task dependencies**: Sequential vs parallel execution rules
   - **Task details**: ID, description, file paths, parallel markers [P]
   - **Execution flow**: Order and dependency requirements

6. Execute implementation following the task plan:
   - **Phase-by-phase execution**: Complete each phase before moving to the next
   - **Respect dependencies**: Run sequential tasks in order, parallel tasks [P] can run together  
   - **Follow TDD approach**: Execute test tasks before their corresponding implementation tasks
   - **File-based coordination**: Tasks affecting the same files must run sequentially
   - **Validation checkpoints**: Verify each phase completion before proceeding

7. Implementation execution rules:
   - **Setup first**: Initialize project structure, dependencies, configuration
   - **Tests before code**: If you need to write tests for contracts, entities, and integration scenarios
   - **Core development**: Implement models, services, CLI commands, endpoints
   - **Integration work**: Database connections, middleware, logging, external services
   - **Polish and validation**: Unit tests, performance optimization, documentation

8. Progress tracking and error handling:
   - Report progress after each completed task
   - Halt execution if any non-parallel task fails
   - For parallel tasks [P], continue with successful tasks, report failed ones
   - Provide clear error messages with context for debugging
   - Suggest next steps if implementation cannot proceed
   - **IMPORTANT** For completed tasks, make sure to mark the task off as [X] in the tasks file.

9. Completion validation:
   - Verify all required tasks are completed
   - Check that implemented features match the original specification
   - Validate that tests pass and coverage meets requirements
   - Confirm the implementation follows the technical plan
   - Report final status with summary of completed work

Note: This command assumes a complete task breakdown exists in tasks.md. If tasks are incomplete or missing, suggest running `/sp.tasks` first to regenerate the task list.

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.


/sp.implement As a Certified Kubernetes Application Developer (CKAD), CNCF Certified Linux Administrator (CLA), Red Hat Certified Engineer (RHCE), and Linux Foundation Certified professional, I am leading the Speckit development for the book "Kubernetes for Absolute Beginners: Developing Cloud Applications." Below is the complete, step-by-step instruction set for the `/sp.implementation` phase. This phase focuses on the actual coding, content creation, building, testing, and deployment of the Speckit + Docusaurus textbook website, strictly adhering to the project constitution, specification, and free-tier constraints.

### /sp.implementation Instruction Set

1. **Project Initialization**  
   Execute the following commands in a clean directory to set up the base project:  
   - `npx create-docusaurus@latest k8s-beginners-book classic --typescript`  
   - `cd k8s-beginners-book`  
   - `npm install`  
   - If Speckit CLI is available: `npm install -g speckit` followed by `speckit init` (configure for Docusaurus integration and lightweight AI hooks). If Speckit is not yet publicly released, simulate its core functions manually via custom scripts in `/scripts/speckit-sim/` for Markdown enhancement and embedding placeholders.

2. **Repository Setup**  
   Create a new GitHub repository named `k8s-beginners-book`.  
   Initialize git: `git init`, add remote, and push initial commit.  
   Enable GitHub Pages in repository settings (source: `/docs` folder after build or root build output).  
   Create two branches: `main` (protected, stable releases) and `dev` (active development). All work must occur on `dev`.

3. **Docusaurus Configuration**  
   Edit `docusaurus.config.js` with the following key settings:  
   - title: "Kubernetes for Absolute Beginners: Developing Cloud Applications"  
   - tagline: "A fast, free, AI-native textbook for cloud-native beginners"  
   - url: GitHub Pages URL  
   - baseUrl: '/'  
   - themeConfig: enable dark mode, responsive navbar, footer with simple links  
   - presets: classic with docs plugin enabled, versioned_docs disabled (single version only)  
   - plugins: add Mermaid for diagrams (`@docusaurus/plugin-client-redirects` optional if needed)  
   Ensure search is local (no Algolia paid tier).

4. **Folder and File Structure Creation**  
   Create the exact docs structure:  
   `/docs/`  
     - `intro.md` (welcome page with overview and reading time estimate)  
     - `chapter1-history.md`  
     - `chapter2-what-why.md`  
     - `chapter3-setup.md`  
     - `chapter4-concepts.md`  
     - `chapter5-deploy.md`  
     - `chapter6-best-practices.md`  
   Create `/static/img/` for any exported diagrams.  
   Create `/src/components/` for optional custom React components (e.g., quiz widget, language toggle).

5. **Content Authoring (Chapters)**  
   For each chapter file in `/docs/`:  
   - Use Markdown with frontmatter: `title`, `sidebar_label`, `hide_table_of_contents: false`  
   - Keep content length 1,000–2,000 words.  
   - Structure: H1 for chapter title, H2/H3 for sections, code blocks with language tags (yaml, bash, dockerfile).  
   - Include at least 2–3 Mermaid diagrams per chapter where concepts benefit (e.g., Pod → Deployment → Service flow).  
   - Add simple end-of-chapter quiz (static multiple-choice in admonition blocks or lightweight React component).  
   - Ensure all technical content is verified against official kubernetes.io documentation (v1.29+ as of December 2025).  
   - Optional Urdu personalization: Add parallel text blocks hidden by default, toggled via client-side JS button in a custom component.

6. **Lightweight AI Embeddings and Features**  
   Implement minimal embeddings:  
   - Use client-side only (no server).  
   - For semantic search enhancement: integrate `@huggingface/inference` free tier with a small distilled model (<10MB total payload).  
   - Cap total embedding size across site <10MB.  
   - Add language toggle component in `/src/components/LanguageToggle.js` (English default, Urdu via pre-translated static Markdown sections).

7. **CI/CD Pipeline**  
   Create `.github/workflows/deploy.yml` for GitHub Actions:  
   - Trigger on push to `main`  
   - Steps: checkout, node setup (v18), npm ci, npm run build, deploy to GitHub Pages using `peaceiris/actions-gh-pages`  
   - Ensure build time remains under 30 seconds (fail workflow if exceeded).

8. **Testing Phase**  
   - Local testing: `npm run start` → verify all chapters, navigation, dark mode, mobile responsiveness (Chrome dev tools).  
   - Run `npm run build` locally and serve with `npm run serve` → confirm no broken links.  
   - Performance audit: `npm run lighthouse` or browser Lighthouse → target >90/100 on Performance, Accessibility, Best Practices, SEO.  
   - Content accuracy review: manual cross-check of all commands and YAML examples using Minikube/Kind locally.

9. **Final Deployment**  
   Merge `dev` into `main` only after all tests pass and Lighthouse scores meet criteria.  
   Push to trigger automatic GitHub Pages deployment.  
   Verify live site at `https://<username>.github.io/k8s-beginners-book/`.

10. **Post-Implementation Validation**  
    Confirm:  
    - Site loads in <2 seconds  
    - Total read time under 2 hours  
    - No heavy dependencies (check package.json)  
    - Free-tier compliance (no paid services)  
    - Clean, minimalist UI achieved  

This `/sp.implementation` instruction set ensures the Speckit-powered textbook is delivered as a high-quality, accessible, and constitutionally compliant resource for absolute beginners entering cloud-native application development with Kubernetes. Execute these steps sequentially for a successful, reproducible implementation.