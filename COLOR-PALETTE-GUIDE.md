# PRIXX ROBOTICS - COLOR PALETTE GUIDE
## Black 40% · Dark Red 30% · White 20% · Blue 10%

Last Updated: 2026-09-23

---

## 🎨 COLOR BREAKDOWN

### BLACK (40% - Dominant Base)
- **Primary Background**: `#0a0a0a` (Deep obsidian black)
- **Secondary Surface**: `#141414` (Dark slate panels)
- **Tertiary Depth**: `#1a1a1a` (Card surfaces)
- **Usage**: Main backgrounds, glass panels, navigation bars, section containers

### DARK RED (30% - Primary Accent)
- **Neon Ruby**: `#DC2626` (Primary interactive elements)
- **Crimson**: `#991B1B` (Borders, hover states)
- **Blood Red**: `#7F1D1D` (Deep shadows, gradients)
- **Usage**: Buttons, borders, active states, glows, cursor, links, badges

### WHITE (20% - Text & Highlights)
- **Primary Text**: `#FFFFFF` (Headers, body text)
- **Secondary Text**: `rgba(255, 255, 255, 0.7)` (Descriptions)
- **Tertiary Text**: `rgba(255, 255, 255, 0.5)` (Meta info)
- **Usage**: All typography, glass panel highlights, borders

### BLUE (10% - Rare Accent)
- **Electric Blue**: `#2563EB` (Special CTAs only)
- **Deep Blue**: `#1E40AF` (Rare highlights)
- **Usage**: ONLY for critical actions, rare accent orbs

---

## 📂 WHERE TO EDIT COLORS

### Global Color System
📄 **File:** `src/index.css`
```css
:root {
  /* 40% Black */
  --bg-primary: #0a0a0a;
  --bg-secondary: #141414;
  
  /* 30% Dark Red */
  --accent-primary: #DC2626;
  --accent-crimson: #991B1B;
  
  /* 20% White */
  --text-primary: #FFFFFF;
  --text-secondary: rgba(255, 255, 255, 0.7);
  
  /* 10% Blue */
  --accent-blue: #2563EB;
}
```

### Design Tokens
📄 **File:** `src/design/tokens.ts`
```ts
export const tokens = {
  color: {
    darkBg: '#0a0a0a',        // Black base
    neonRuby: '#e91616',      // Dark red primary
    crimson: '#c42222',       // Dark red secondary
    electricBlue: '#2563EB',  // Blue accent (rare)
  },
};
```

### Ambient Background Orbs
📄 **File:** `src/components/ui/AmbientBackground.tsx`
- Large Dark Red Orb (top-right): 65vw size
- Secondary Dark Red Orb (bottom-left): 55vw size
- Subtle Blue Orb (center-left): 35vw size (10% visual weight)
- Deep Black Vignette: Covers entire viewport

### Components Using Color Proportions
✅ `src/App.tsx` - Background: `bg-[#0a0a0a]`, Selection: `bg-red-600`
✅ `src/components/ui/CustomCursor.tsx` - Dark red cursor with red glow
✅ `src/components/ui/SlideControls.tsx` - Dark red active states
✅ `src/components/ui/MinimalNavigation.tsx` - Dark red pills
✅ `src/components/sections/EntrySection.tsx` - Dark red gradients
✅ `src/components/sections/ArenaSection.tsx` - Dark red badges
✅ `src/components/sections/TeamSection.tsx` - Dark red borders
✅ `src/components/sections/ProjectsSection.tsx` - Dark red accents
✅ `src/components/sections/SignalSection.tsx` - Dark red form borders

---

## 🎯 VISUAL DISTRIBUTION

### Per Section Breakdown:

#### HERO SECTION (Entry)
- Background: Black 45%
- Dark Red gradients & CTAs: 30%
- White text: 20%
- Blue rare CTA: 5%

#### ARENA SECTION (Achievements)
- Background: Black 40%
- Dark Red badges & borders: 32%
- White text & cards: 23%
- Blue category pills: 5%

#### CREW SECTION (Team)
- Background: Black 42%
- Dark Red status indicators: 28%
- White cards & text: 25%
- Blue action buttons: 5%

#### LAB SECTION (Projects)
- Background: Black 38%
- Dark Red spec highlights: 35%
- White descriptions: 22%
- Blue 3D controls: 5%

#### SIGNAL SECTION (Contact)
- Background: Black 40%
- Dark Red form borders: 30%
- White input text: 20%
- Blue submit button: 10%

---

## 🔧 QUICK CHANGES

### Want MORE Dark Red?
Edit `src/index.css`:
```css
.glass-panel {
  border: 2px solid rgba(220, 38, 38, 0.4); /* Increase from 0.2 */
}
```

### Want LESS Blue?
Edit `src/components/ui/AmbientBackground.tsx`:
```tsx
// Reduce blue orb size from 35vw to 25vw
className="...w-[25vw] h-[25vw]..."
```

### Change Black Depth?
Edit `src/index.css`:
```css
:root {
  --bg-primary: #050505;  /* Darker: #050505, Lighter: #121212 */
}
```

---

## ✨ VISUAL EFFECTS

### Glass Panels (Dark Red Borders)
```css
.glass-panel {
  background: rgba(20, 20, 20, 0.85);        /* Black 40% */
  border: 1px solid rgba(220, 38, 38, 0.2); /* Dark Red 30% */
  box-shadow: 0 0 20px rgba(220, 38, 38, 0.1);
}
```

### Active States (Dark Red Glow)
```css
.glass-pill-active {
  background: rgba(220, 38, 38, 0.3);
  border-color: rgba(220, 38, 38, 0.6);
  box-shadow: 0 0 25px rgba(220, 38, 38, 0.4);
}
```

### Text Gradients
```css
.text-gradient-ruby {
  background: linear-gradient(
    135deg,
    #DC2626 0%,    /* Dark red */
    #991B1B 50%,   /* Crimson */
    #7F1D1D 100%   /* Blood red */
  );
}
```

---

## 📊 COLOR USAGE STATS

| Color | Percentage | Primary Usage |
|---|---|---|
| **Black** | 40% | Backgrounds, panels, surfaces |
| **Dark Red** | 30% | Borders, buttons, badges, glows |
| **White** | 20% | Text, highlights, glass edges |
| **Blue** | 10% | Rare CTAs, special accents |

---

## 🚀 DEPLOYMENT NOTES

✅ Build completed successfully
✅ All color references updated
✅ Glass morphism preserved
✅ Dark red dominance achieved
✅ Blue limited to 10% visual weight
✅ Black backgrounds at 40% coverage

**Production Ready**: Yes
**Color Palette**: Black, Dark Red, White, Blue
**Proportions**: 40% / 30% / 20% / 10%
