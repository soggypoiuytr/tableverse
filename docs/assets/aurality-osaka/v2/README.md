# Osaka v2 — independent generated layers

Preview-only replacement for the first masked-photo implementation.

All six assets are generated independently with the built-in image generation tool. The original Osaka image is used only as a lighting, architecture and aircraft design reference. No runtime polygon extraction, difference masks, inpainting patches or fragments of the old city photograph are used by this version.

- sky.png: opaque stormy night sky.
- distant.png: distant city skyline with genuine alpha.
- middle.png: medium-distance architecture with genuine alpha.
- near.png: nearest architecture and road network with genuine alpha.
- helicopter.png: complete new coaxial-rotor armored helicopter, including rotor and landing gear, on alpha. Used at three distances with independent motion.
- smoke.png: large rising crash plume on alpha, composited behind the middle buildings. The crashed vehicle is concealed.

Lore checked against the available recent messages of “Criar terminal SDAI 2” and the local SDAI V219 terminal data: the vehicle that crashed in Osaka was a SDAI transport; DAE ÁSIA remains operational. The smoke represents the transport crash, not a fallen DAE platform.

The existing audio, UI, navigation and map/lobby scope are preserved. Only the Aurality lobby backdrop renderer changes. The original source and previous version are retained for comparison.

Perspective refinement: middle buildings rendered at 82% scale with a common bottom anchor; foreground depth reduced to .82. Camera sweep is now 42 seconds. Main helicopter width 450 instead of 700, distant aircraft 175/140 instead of 255/200. Flight slowed while retaining substantially greater relative displacement than architecture.

Searchlight: helicopter.png now contains the generated lamp and beam as real alpha. Sample beam alpha values 91/255, 69/255 and 19/255 confirm a translucent fade; the old procedural canvas triangle has been removed. helicopter-no-light.png preserves the original aircraft asset.
