/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /border-(optimizely-blue|purple|light-blue|green|orange)/
    }
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: '"Figtree", Arial, sans-serif',
        mono: 'NBI Pro Mono, Arial, sans-serif',
        optiicons: 'icomoon'
      },
      fontWeight: {
        regular: 320,
        medium: 500,
        semibold: 600,
        bold: 700
      }
    },
    borderRadius: {
      DEFAULT: '24px',
      'md': '12px'
    },
    colors: {
        'optimizely-blue': {
          'DEFAULT': '#0037ff',
          '20-tint': '#ccd7ff',
          '40-tint': '#99afff',
          '60-tint': '#6687ff',
          '80-tint': '#194bff',
          '80-shade': '#002ccc',
          '60-shade': '#002199',
          '40-shade': '#001666',
          '20-shade': '#000b33',
        },
        'dark-blue': {
          'DEFAULT': '#080736',
          '20-tint': '#cecdd7',
          '40-tint': '#9c9caf',
          '60-tint': '#6b6a86',
          '80-tint': '#393a5d',
          '90-tint': '#212149',
          '90-shade': '#06062b',
          '60-shade': '#050420',
          '40-shade': '#030316',
          '20-shade': '#02010b',
        },
        'light-blue': {
          'DEFAULT': '#00ccff',
          '20-tint': '#ccf5ff',
          '40-tint': '#99ebff',
          '60-tint': '#66e0ff',
          '80-tint': '#33d6ff',
          '80-shade': '#00a3cc',
          '60-shade': '#007a99',
          '40-shade': '#005266',
          '20-shade': '#002933',
        },
        'orange': {
          'DEFAULT': '#ff8110',
          '20-tint': '#ffe6cf',
          '40-tint': '#ffcd9f',
          '60-tint': '#ffb370',
          '80-tint': '#ff9a40',
          '80-shade': '#cc670d',
          '60-shade': '#994d0a',
          '40-shade': '#663406',
          '20-shade': '#331a03',
        },
        'green': {
          'DEFAULT': '#3be081',
          '20-tint': '#d9f9e6',
          '40-tint': '#b1f3cd',
          '60-tint': '#89ecb3',
          '80-tint': '#62e69a',
          '80-shade': '#2fb367',
          '60-shade': '#23864d',
          '40-shade': '#185a34',
          '20-shade': '#0c2d1a',
        },
        'yellow': {
          'DEFAULT': '#ffce00',
          '20-tint': '#fff5cc',
          '40-tint': '#ffeb99',
          '60-tint': '#ffe266',
          '80-tint': '#ffd833',
          '80-shade': '#cca500',
          '60-shade': '#997c00',
          '40-shade': '#665200',
          '20-shade': '#332900',
        },
        'purple': {
          'DEFAULT': '#861dff',
          '20-tint': '#e7d2ff',
          '40-tint': '#cfa5ff',
          '60-tint': '#b677ff',
          '80-tint': '#9e4aff',
          '80-shade': '#6b17cc',
          '60-shade': '#501199',
          '40-shade': '#360c66',
          '20-shade': '#1b0633',
        },
        'black': 'var(--vulcan)',
        'white': '#fff',
        'vulcan': '#10141d',
        'vulcan-85': '#2c313f',
        'bright-gray': '#e9ebf1',
        'vulcan-95': '#191e28',
        'vulcan-90': '#232834',
        'ebony': '#0e1122',
        'red': '#f13030',
        'independence': '#484f61',
        'pale-sky': '#656c81',
        'santas-gray': '#969cac',
        'mischka': '#ced2dc',
        'ghost-white': '#f8f8fc',
      },
  },
  plugins: [
    function ({ addBase, theme }) {
      // Plugin to pull all tailwind colors out to CSS variables--this is only necessary to support non-tailwind CSS copied over.
      function extractColorVars (colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {

          const value = colorObj[colorKey];
          const cssVariable = colorKey === "DEFAULT" ? `-${colorGroup}` : `-${colorGroup}-${colorKey}`;

          const newVars =
            typeof value === 'string'
              ? { [cssVariable]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    },
    function({ addBase }) {
     addBase({
        'html': { fontSize: "10px" },
      })
    },
  ],
}
