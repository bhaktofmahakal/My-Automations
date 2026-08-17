import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep obsidian background and card surfaces (matched to reference screenshots)
        canvas: '#0d1117',
        surface: {
          DEFAULT: '#161b22',
          elevated: '#1c2128',
          inset: '#010409',
          overlay: 'rgba(48, 54, 61, 0.7)',
        },
        // Borders and hairlines
        border: {
          DEFAULT: '#30363d',
          muted: '#21262d',
          subtle: 'rgba(240, 246, 252, 0.1)',
          focus: '#58a6ff',
        },
        // Text / Ink
        ink: {
          DEFAULT: '#e6edf3',
          muted: '#8b949e',
          subtle: '#6e7681',
          inverse: '#0d1117',
        },
        // Surgical and telemetry accents
        brand: {
          emerald: '#3fb950', // Accepted diffs, token savings, active nodes
          cyan: '#58a6ff',    // Active PSMAS manifold, sweep needle, primary links
          ruby: '#f85149',    // Deletions, baseline costs, security warnings
          amber: '#d29922',   // Grepping, human review barriers, test runners
          purple: '#bc8cff',  // Architect, thinking phase
        },
        // Agent timeline stages (from Cursor spec)
        stage: {
          thinking: '#bc8cff',
          reading: '#58a6ff',
          grepping: '#f0883e',
          editing: '#3fb950',
          validating: '#d29922',
          complete: '#3fb950',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Noto Sans"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'SF Mono',
          'Menlo',
          'Consolas',
          '"Liberation Mono"',
          'monospace',
        ],
      },
      borderRadius: {
        'card': '12px',
        'badge': '6px',
        'btn': '8px',
      },
      boxShadow: {
        'glow-emerald': '0 0 16px rgba(63, 185, 80, 0.25)',
        'glow-cyan': '0 0 16px rgba(88, 166, 255, 0.25)',
        'glow-ruby': '0 0 16px rgba(248, 81, 73, 0.25)',
        'card-panel': '0 4px 20px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite ease-in-out',
        'radar-sweep': 'radar-sweep 8s linear infinite',
        'slide-in': 'slide-in-right 0.3s ease-out forwards',
        'donut-pulse': 'donut-pulse 3s infinite ease-in-out',
        'live-blink': 'live-blink 1.5s infinite ease-in-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(88, 166, 255, 0.15)' },
          '50%': { boxShadow: '0 0 20px rgba(88, 166, 255, 0.45)' },
        },
        'radar-sweep': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(16px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'donut-pulse': {
          '0%, 100%': { filter: 'drop-shadow(0 0 6px rgba(63, 185, 80, 0.2))' },
          '50%': { filter: 'drop-shadow(0 0 14px rgba(63, 185, 80, 0.5))' },
        },
        'live-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
