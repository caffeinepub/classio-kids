# Classio Kids

## Current State
- Landing page shows hero, 3 grade selection cards, and 4 category tiles (Explore section) plus Why-Choose section
- Student login is a small card requiring roll number + grade
- Student dashboard has 5 categories: Rhymes, Phonic Sounds, Phonic Stories, Digraphs, CVC Words
- No interactive activities, games, tracing, or colouring

## Requested Changes (Diff)

### Add
- 4 new interactive activity categories in student dashboard:
  1. Letter/Number Tracing (canvas-based guided tracing, grade-wise letters/numbers)
  2. Colouring Book (SVG fill-on-click colouring pages, grade-wise themes)
  3. Word Match Game (tap matching pairs of word+picture cards, grade-wise)
  4. Spelling Puzzle (scrambled letter tiles to arrange correct spelling, grade-wise)
- Grade-wise activity data file: src/frontend/src/data/activities.ts

### Modify
- LandingPage.tsx: Remove grade cards, Explore, Why-Choose sections. Keep only header + hero + single Student Login CTA + footer with Admin link.
- StudentLogin.tsx: Big colorful child-friendly UI. Large fonts, large inputs, big button, playful gradient background.
- StudentDashboard.tsx: Add 4 new activity categories (total 9 in grid).
- ContentViewer.tsx: Add interactive viewers for tracing, colouring, word-match, spelling-puzzle.

### Remove
- Grade selection cards from LandingPage
- Explore / Why-Choose sections from LandingPage

## Implementation Plan
1. Simplify LandingPage.tsx to hero + login CTA only
2. Redesign StudentLogin.tsx to be large, colorful, child-friendly
3. Create activities.ts with grade-wise data for all 4 new activities
4. Add 4 interactive activity components in ContentViewer.tsx
5. Update StudentDashboard.tsx categories with 4 new items
