/**
 * Atlantic Catering and Logistics Limited – Tailwind config
 * Load after Tailwind CDN.
 */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'acll-navy': '#0B1C2D',
        'acll-green': '#55BE52',
        'acll-orange': '#DB9933',
        'acll-gray': '#EAEAEA',
        'acll-muted': '#6b7280',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tight: '-0.02em',
      },
    },
  },
};
