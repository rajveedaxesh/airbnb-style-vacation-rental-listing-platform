---
name: airbnb-clone
description: Playpower Labs Airbnb Clone development skill and instructions for sub-agents
---

# Airbnb Clone Development Skill

## Overview
This skill provides automated guidelines, layout standards, and testing procedures for building and validating the Airbnb Listing Page clone.

## Core Rules & Requirements
1. **Desktop First Layout**:
   - Fixed header with brand logo, search bar pill, and user profile trigger.
   - 1120px max-width main layout container.
   - 5-photo hero gallery grid on top with rounded corners.
   - Two-column split layout: 1fr left column for property info, 370px right sticky column for booking card.

2. **Photo Tour & Lightbox Interaction**:
   - Floating "Show all photos" button on bottom right of 5-photo grid opens **Photo Tour Modal**.
   - Clicking any photo in hero grid or photo tour opens **Lightbox Modal**.
   - Lightbox keyboard controls:
     - `ArrowLeft`: Navigate to previous photo.
     - `ArrowRight`: Navigate to next photo.
     - `Escape`: Close Lightbox modal.

3. **Accessibility**:
   - `role="dialog"` and `aria-label` on all modals.
   - `aria-live="polite"` on counter elements.
   - Focus trapping inside open modals.

4. **Verification Step**:
   - Run `npm run build` to ensure 0 TypeScript compilation errors.
   - Run local dev server test to verify keyboard left/right arrow and escape handlers.
