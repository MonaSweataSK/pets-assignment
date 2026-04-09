## Design Library Integration

The components in this folder heavily utilize the specialized Design Library to maintain a consistent aesthetic and functional experience. Here is a breakdown of which library components are used where:

### 1. \`SelectionToolbar.tsx\`
- **\`Toolbar\` & \`ToolbarGroup\`**: Provide the structured layout and container styling for the multi-selection tools, anchoring them securely within the page layout.
- **\`Button\`**:
  - *Ghost variant*: Powers the understated "Select All" and "Clear" action links.
  - *Primary variant*: Powers the main "Download Selected" button, including support for loading states and icons.

### 2. \`SearchBar.tsx\`
- **\`Dropdown\`**: Used to replace the standard browser `<select>` element. It applies full design system styling to the sorting functionalities, matching the premium look of the rest of the application.

---

*Note: The design library extends beyond this folder. For instance, the **\`Toast\`** notification system is utilized in the application pages (like \`Home.tsx\`) to provide visual feedback for actions like downloads, and customized **\`Button\`** elements (like the \`cta\` variant) are featured prominently on the \`About.tsx\` page.*
