# Interactive character movement

## What will change
- Make the existing 3D character gently tilt and shift toward the pointer within the opening section.
- Add scroll-linked lift, rotation, and scale so the character responds as visitors move down the page.
- Move the spotlight and character shadow with the same input to strengthen the 3D depth effect.
- Reset smoothly when the pointer leaves and disable intensive motion for reduced-motion preferences and touch devices.

## Technical details
- Use Motion values and springs so pointer updates do not trigger React renders.
- Keep transforms on the existing character image and its wrapper; no replacement artwork or portfolio content changes.
- Verify desktop pointer response, scrolling, mobile layout, reduced-motion behavior, and preview errors.
