## Design Library Integration

While most of the structural building blocks reside in `src/components`, the pages also directly utilize the Design Library (`src/ui`) for specific cross-cutting features and high-level engagements:

### 1. \`Home.tsx\`
- **\`Toast\` (\`useToast\` hook)**: The Home page handles the complex orchestration of downloading selected images. It relies directly on the Toast design system to provide sleek, animated feedback to the user on success and on error boundaries, replacing jarring browser alert prompts.

### 2. \`About.tsx\`
- **\`Button\`**: Uses the foundational Button component specifically utilizing the \`"cta"\` (Call To Action) variant and \`"lg"\` size to drive user engagement inside the main promotional banner, applying the premium branded gradient defined in the design tokens.

---

*Note: The pages naturally inherit all underlying Design Library elements embedded within the components they render (such as \`Navbar\`, \`SelectionToolbar\`, and \`SearchBar\` which leverage \`Dropdown\`, \`Toolbar\`, and more).*
