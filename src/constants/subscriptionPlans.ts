export const plans = [
  {
    key: 'basic',
    name: 'Basic',
    price: 0,
    color: 'bg-gradient-to-b from-gray-800 to-gray-900',
    borderColor: 'border-gray-700',
    features: [
      { text: 'Access to curated free movie collection', available: true },
      { text: 'Limited movie library access', available: true },
      { text: 'New content updates monthly', available: true },
      { text: 'Basic movie information and details', available: true },
      { text: 'Ad-supported browsing experience', available: true },
    ]
  },
  {
    key: 'gold',
    name: 'Gold',
    price: 199,
    color: 'bg-gradient-to-b from-amber-900/40 to-yellow-900/30',
    borderColor: 'border-yellow-700',
    features: [
      { text: 'Full access to all Free & Gold movies', available: true },
      { text: 'Exclusive Gold-tier movie collection', available: true },
      { text: 'Ad-free browsing experience', available: true },
      { text: 'Enhanced movie details and information', available: true },
      { text: 'Priority access to newly added content', available: true },
    ]
  },
  {
    key: 'platinum',
    name: 'Platinum',
    price: 499,
    color: 'bg-gradient-to-b from-gray-700/40 to-gray-900/50',
    borderColor: 'border-gray-400',
    features: [
      { text: 'Complete access to entire movie catalog', available: true },
      { text: 'Premium exclusive releases and collections', available: true },
      { text: 'Advanced movie information and metadata', available: true },
      { text: 'Early access to all new releases', available: true },
      { text: 'Exclusive platinum-only special collections', available: true },
    ]
  },
];
