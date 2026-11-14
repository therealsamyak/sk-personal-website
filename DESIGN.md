# Website design system

## Atmosphere and identity

The existing portfolio uses a monospace face, neutral cards, and teal actions.
The contact success effect follows this existing component system and the approved Glimm design.

## Color

Use the semantic tokens in `apps/web/app/globals.css` for surfaces, text, controls, and focus.
Primary teal is `oklch(0.61 0.11 222)` in light mode and `oklch(0.71 0.13 215)` in dark mode.
The success sweep uses a hex-based teal pair, `#16899a` and `#53bbc7`, for Glimm's palette API.
Keep the existing green-600/light and green-400/dark confirmation colors.

## Typography

Use the existing JetBrains Mono font and Tailwind type scale.
Contact controls and confirmation use the existing 14px card text.

## Spacing and layout

Use the existing 4px spacing scale, 24px contact padding, and 16px form gaps.
The contact card retains the form's intrinsic height through pending, success, and error states.
Keep document scrolling and the existing responsive page layout.

## Components

Use the existing shadcn Card, Button, Field, Input, and Textarea primitives.
Keep generated components unchanged.
Contact states are idle, submitting, success, and error.
Submission disables the button and preserves the existing scanner and loading indicator.
Success presents the existing checkmark and thank-you text.
Errors retain the existing alert and refresh instruction.

## Motion and interaction

The approved GlimmScope interaction is the motion reference: https://glimm.dev/llms-full.txt.
After server success, play one bottom-to-top sweep with a 700ms duration.
Use `pageEffect={false}`, brightness 0.65, peak alpha 0.65, and no depth swell.
Keep the effect inside the card. Do not change navigation or distort HTML in a canvas.
Glimm commits confirmation immediately under reduced motion or without WebGL.
Animation failure must preserve delivery success.

## Depth and surface

Keep the existing card surface, rounded-xl corners, and foreground/10 ring.
Use the existing control focus rings. Clip the sweep to the card's rounded bounds.

## Accessibility and constraints

Keep one success live region outside the scope's outgoing clone.
Focus the confirmation after successful delivery.
Glimm's outgoing clones must remain inert and aria-hidden.
Remove the completed Turnstile widget before cloning, while retaining its occupied space.
Keep confirmation available when animation is unavailable.
This change does not add a new design direction or alter shared primitives.
