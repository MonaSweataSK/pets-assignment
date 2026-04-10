# Toolbar Component

The `Toolbar` provides a structured, responsive container for grouping action elements (like buttons, counters, text). It is primarily used in the PetGallery to display selection metrics and trigger bulk actions like downloads.

## Features

- **Inline or Fixed Positioning**: Capable of acting as an inline block element or floating fixed at the bottom center of the viewport via the `isFixed` prop.
- **Glassmorphic Shadows**: When set to `isFixed`, it applies premium elevated shadows and rounded border aesthetic.
- **Responsive Stacking**: Automatically collapses from a strictly horizontal flexbox layout into a stacked column on smaller mobile layouts.
- **ToolbarGroup**: Exports a sub-component `<ToolbarGroup>` used to cleanly cluster inner elements (e.g., text beside a button).

## Props

- `children: ReactNode`
- `isFixed?: boolean` - Elevates the toolbar into a floating component at the bottom of the screen.

## Example Usage

```tsx
import { Toolbar, ToolbarGroup } from '../ui/Toolbar/Toolbar';
import { Button } from '../ui/Button/Button';

// Creates a floating bottom bar
const SelectionBar = () => {
  return (
    <Toolbar isFixed={true}>
      <ToolbarGroup>
         <span>5 Items Selected</span>
         <span className="text-gray">1.2 MB</span>
      </ToolbarGroup>
      
      <ToolbarGroup>
         <Button variant="ghost">Clear</Button>
         <Button variant="cta">Download</Button>
      </ToolbarGroup>
    </Toolbar>
  );
}
```
