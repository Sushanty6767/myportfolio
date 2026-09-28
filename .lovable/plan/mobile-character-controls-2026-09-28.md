# Mobile character controls

## What will change
- Let mobile visitors drag across the opening section to move and tilt the character smoothly.
- Add an optional phone-tilt control with permission handling where the browser requires it.
- Add a clear reset control that recenters the character and disables phone tilt.
- Preserve desktop pointer and scroll movement, reduced-motion preferences, and page scrolling.

## Technical details
- Reuse Motion values and springs for touch and orientation input.
- Limit sensor movement and ignore noisy orientation updates.
- Keep controls compact and accessible, using the existing button system.
- Verify touch emulation, reset behavior, phone layout, type safety, and preview errors.
