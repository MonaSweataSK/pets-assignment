## Design Library Integration

While most of the structural building blocks reside in `src/components`, the pages also directly utilize the Design Library (`src/ui`) for specific cross-cutting features and high-level engagements:

### 1. \`Home.tsx\`
- **\`Toast\` (\`useToast\` hook)**: The Home page handles the complex orchestration of downloading selected images. It relies directly on the Toast design system to provide sleek, animated feedback to the user on success and on error boundaries, replacing jarring browser alert prompts.

### 2. \`About.tsx\`
- **\`Button\`**: Uses the foundational Button component specifically utilizing the \`"cta"\` (Call To Action) variant and \`"lg"\` size to drive user engagement inside the main promotional banner, applying the premium branded gradient defined in the design tokens.

### 3. `PetDetail.tsx`
- **`Button`**: Employs Ghost and Primary (or generic) button variants for "Back to Gallery" and "Download" functionality, ensuring interactive elements have consistent hover states and brand aesthetics. 
- **`Toast` (`useToast` hook)**: Utilized to notify the user of successful or failed operations when individually downloading a highlighted pet image.

### 4. `DesignSystem.tsx`
- **Reference Hub**: This page acts as the internal documentation and sandbox for the `src/ui` library itself. It imports and renders every variant of `Button`, the `Dropdown` behaviors, mock `Toolbar` layouts, and triggers dummy `Toast` notifications so front-end engineers can test and reference the core design system without navigating through the actual application flows.
