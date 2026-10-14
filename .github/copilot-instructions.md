# Global Codex Guidance

## Default Skill Use

At the start of every session, treat the global skills in C:\Users\Nikki\.codex\skills as available.

Do not load every skill automatically. Instead, before answering or acting, quickly decide whether the request matches one of the installed skills and use the most relevant skill instructions when it does.

Always consider these skill groups:

- Marketing skills from coreyhaines31/marketingskills for marketing, growth, SEO, CRO, copywriting, ads, analytics, launch, pricing, onboarding, email, social, referrals, sales enablement, or product marketing tasks.
- Sales skills from louisblythe/Sales-Skills for prospecting, discovery, objection handling, negotiation, pipeline, sales calls, sales messaging, AI SDR workflows, follow-up, lead qualification, handoff, or deal strategy tasks.
- Humanizer from blader/humanizer for rewriting, editing, polishing, or making text sound less AI-generated.

When multiple skills could apply, choose the smallest set that covers the request and mention the selected skill briefly before using it.

## Distinctive frontend standards

### Design direction
- Build interfaces that feel intentionally designed, not generated from a template.
- Establish a visual concept appropriate to the audience and product before implementing UI.
- Prefer clear hierarchy, considered spacing, typography, and restrained color.
- Use existing brand colors when appropriate; do not introduce random colors or gradients.
- Favor believable, useful interfaces over decorative spectacle.

### Avoid AI-slop patterns
- No default purple-gradient hero sections.
- No unnecessary glowing orbs, floating symbols, glassmorphism, or neon effects.
- No generic three-card feature layouts unless the content genuinely calls for them.
- No meaningless badges, fake dashboards, fabricated statistics, or decorative charts.
- No excessive pill buttons, huge rounded corners, or hover animations everywhere.
- No generic headings like "Transforming ideas into reality" unless explicitly requested.
- No filler marketing copy or repeated empty buzzwords.
- No decorative elements without a clear purpose.

### Frontend implementation
- Follow the existing codebase's framework, architecture, and conventions.
- Prefer straightforward HTML, CSS, and JavaScript when those are sufficient.
- Reuse existing components and CSS variables.
- Avoid adding libraries without a concrete benefit.
- Make mobile layouts intentional, not merely scaled-down desktop layouts.
- Use semantic HTML, accessible controls, readable contrast, and keyboard focus states.
- Respect prefers-reduced-motion.
- Keep animations subtle and purposeful.

### Editing existing projects
- Inspect the relevant files before editing.
- Preserve existing functionality unless a change is explicitly requested.
- Make targeted changes rather than rewriting entire files unnecessarily.
- Do not rename files, assets, routes, or IDs without updating references.
- Never invent project achievements, user data, statistics, or working links.
- Fix root causes instead of adding unnecessary workarounds.
- Do not claim something was tested unless it was actually tested.

### Design review
- For frontend design work, use the frontend-design skill when available.
- For UI/UX review, use the web-design-guidelines skill when available.
- Before finishing, review hierarchy, typography, spacing, responsiveness,
  accessibility, consistency, and unnecessary decoration.
- If the result resembles a generic AI template, simplify and improve it.
- Prioritize quality and originality over adding more visual effects.

