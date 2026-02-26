# SCSS Organization Guide

This directory contains all custom SCSS utility files and animations for the portfolio website.

## Directory Structure

```
src/
├── styles.scss          # Main entry point (imports bootstrap.scss + global styles)
├── bootstrap.scss       # Bootstrap customizations (imports variables.scss)
├── variables.scss       # Variables, fonts, colors, and Bootstrap config
│
└── app/
    └── scss/            # Custom utility styles and animations
        ├── cursor.scss        # Custom desktop cursor with hover effects
        ├── shrink-jump.scss   # Interactive character animation
        ├── text-reveal.scss   # Text reveal fade-in animation
        └── theme.scss         # Global theme utilities and animations
```

## Import Order

**Important:** Always follow this import order to ensure proper variable availability:

1. **variables.scss** - Contains all variables, fonts, colors, and Bootstrap configuration
2. **bootstrap.scss** - Imports variables and adds Bootstrap customizations  
3. **styles.scss** - Main entry (imports bootstrap.scss + global styles like scrollbar)
4. **Component SCSS** - Component-specific styles import utilities as needed

## File Descriptions

### Core Files (src/)

- **`variables.scss`** - Central configuration file containing:
  - Google Fonts imports
  - Custom font variables
  - Color scheme variables  
  - Bootstrap partial imports (functions, variables, reboot, utilities, grid)
  
- **`bootstrap.scss`** - Bootstrap customizations and overrides
  - Imports `variables.scss` to access custom variables
  - Contains minimal Bootstrap-specific custom styles

- **`styles.scss`** - Main application styles entry point
  - Imported by Angular's `angular.json`
  - Imports `bootstrap.scss`
  - Defines global styles (scrollbar, etc.)

### Utility Files (src/app/scss/)

- **`cicle.scss`** - Circular text ring animation component
- **`cursor.scss`** - Custom cursor for desktop (hover: hover & pointer: fine)
- **`flexbin.scss`** - Responsive flexbox image gallery with configurable row heights
- **`pursor.scss`** - Custom cursor for desktop (hover: hover & pointer: fine)
  - Gradient text and background utilities
  - Animation keyframes (fadeIn, fadeInUp, etc.)
  - Scroll sticky positioning

## Compiled CSS Files

**Note:** All `.css` and `.css.map` files are now **ignored by git** as they are compiled from SCSS.

- These files are generated automatically by Angular during build
- Never edit `.css` files directly - always edit the `.scss` source files
- If you see `.css` files in your workspace, they are local build artifacts

## Usage in Components

To use utility styles in a component:

```scss
// Import the utility you need
@import "../../scss/text-reveal.scss";

// Or import theme which includes multiple utilities
@import "../../scss/theme.scss";
```

## Best Practices

1. **Never edit compiled `.css` files** - They will be overwritten
2. **Keep utility styles modular** - Each file should have a single responsibility
3. **Use meaningful comments** - Add section headers for clarity
4. **Import variables first** - When you need access to colors/fonts
5. **Minimize imports** - Only import what you need in component styles
6. **Use BEM naming** - When creating new utility classes

## Development Workflow

1. Edit `.scss` files only
2. Run `ng serve` - Angular CLI compiles SCSS to CSS automatically
3. Changes are reflected in the browser with hot reload
4. Compiled `.css` files are generated in the same directory (git-ignored)

## Troubleshooting

**Problem:** Styles not updating  
**Solution:** Clear `.angular/cache` directory and restart `ng serve`

**Problem:** Variable not found error  
**Solution:** Ensure you're importing `variables.scss` before using custom variables

**Problem:** CSS file showing in git status  
**Solution:** Run `git rm --cached <file>.css` to untrack it (already added to .gitignore)
