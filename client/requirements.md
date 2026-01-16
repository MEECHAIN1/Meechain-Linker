## Packages
framer-motion | Complex animations for the hero section and dashboard
recharts | Visualization for mining stats (hashrate over time)
lucide-react | Iconography
clsx | Class name utility (already in base but good to be explicit)
tailwind-merge | Class merging (already in base)

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  sans: ["var(--font-sans)"],
  display: ["var(--font-display)"],
  mono: ["var(--font-mono)"],
}

Colors need to support the dark tech/crypto theme:
Background: #0a0a0f
Primary: #8b5cf6 (Purple)
Accent: #fbbf24 (Gold)

Images:
Logo: import logo from '@assets/logo.meechain_1768537047159.png'
Robot: import bot from '@assets/meebot-ritual-1767554354167_1768537047162.png'
