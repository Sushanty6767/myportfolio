# Sushant Chaturvedi Portfolio

## Goal
Build a polished, single-page developer portfolio using the supplied brief, résumé, and portrait. The result will feel cinematic and technical while keeping every claim accurate.

## What I’ll build
- A dark, editorial opening with Sushant’s name, AI/ML focus, portrait, status line, three actions, and a subtle animated technical backdrop.
- A compact navigation that tracks the current section, adapts on scroll, and becomes a mobile menu on smaller screens.
- About and education sections with the supplied biography, verified statistics, and an animated timeline.
- Interactive skill groups without invented proficiency percentages.
- Three large project case-study panels using the supplied descriptions, technology lists, and GitHub links; selecting a project opens its full details.
- A learning journey, certification gallery, Smart India Hackathon achievement, contact area, validated message form, and minimal footer.
- Links for GitHub, LinkedIn, email, and phone using the supplied contact information.

## Visual and motion direction
- Near-black background, restrained silver typography, cool cyan accents, subtle warm highlights, fine grid/noise, and sparing translucent surfaces.
- Large editorial type, asymmetric composition, ample negative space, and the uploaded portrait as a prominent first-screen visual.
- Layered entrance sequence, mask-style text reveals, scroll reveals, restrained parallax, project depth effects, magnetic calls-to-action, and subtle pointer response.
- Reduced-motion behavior and lighter effects on mobile for accessibility and performance.

## Technical details
- Use the existing React and TanStack Start structure with Tailwind CSS tokens in the shared design system.
- Keep portfolio content in structured data and split major areas into focused components.
- Use Motion for React for interaction and scroll animation; avoid unnecessary heavy graphics.
- Keep the contact form client-side with clear validation and an email handoff, since no message-delivery service was requested.
- Store the uploaded portrait through the project’s media asset flow.
- Add unique page metadata and verify desktop and mobile layouts, interactions, reduced motion, and the final preview.

## Accuracy constraints
- Do not invent employment, project outcomes, skill ratings, clients, testimonials, awards, or metrics.
- Describe SIH 2025 only as Pre-Qualifier Round participation.
- Use the résumé as the source of truth where wording differs from the design brief.
