import {
  IoSearchCircle,
  IoGlobeOutline,
  IoTv,
  IoBulb,
  IoStatsChart,
  IoMegaphone,
} from 'react-icons/io5'

const features = [
  {
    title: 'Universal Search',
    description:
      'Instantly find where to watch any movie or TV show across multiple streaming platforms, tailored to your region',
    icon: IoSearchCircle,
    colorClasses: {
      bg: 'bg-indigo-500/10 hover:bg-indigo-500/50',
      icon: 'text-indigo-300',
      border: 'border border-indigo-400/30',
      glow: 'hover:shadow-[0_0_30px_-5px_rgba(129,140,248,0.3)]',
    },
  },
  {
    title: 'Personalized Watchlist',
    description:
      "Keep track of what you're watching, mark favorites, and organize upcoming shows and movies",
    icon: IoTv,
    colorClasses: {
      bg: 'bg-pink-500/10 hover:bg-pink-500/50',
      icon: 'text-pink-300',
      border: 'border border-pink-400/30',
      glow: 'hover:shadow-[0_0_30px_-5px_rgba(244,114,182,0.3)]',
    },
  },
  {
    title: 'Smart Recommendations',
    description:
      'Get personalized recommendations based on your viewing history and preferences',
    icon: IoBulb,
    colorClasses: {
      bg: 'bg-indigo-500/10 hover:bg-indigo-500/50',
      icon: 'text-indigo-300',
      border: 'border border-indigo-400/30',
      glow: 'hover:shadow-[0_0_30px_-5px_rgba(129,140,248,0.3)]',
    },
  },
  {
    title: 'Region-Specific Availability',
    description:
      'No more guessing! Watchly ensures you see only the platforms available in your country.',
    icon: IoGlobeOutline,
    colorClasses: {
      bg: 'bg-pink-500/10 hover:bg-pink-500/50',
      icon: 'text-pink-300',
      border: 'border border-pink-400/30',
      glow: 'hover:shadow-[0_0_30px_-5px_rgba(244,114,182,0.3)]',
    },
  },
  {
    title: 'Not a Social Network—But It Can Be!',
    description:
      "Connect with friends, share watchlists, and see what they're watching—without the clutter of a traditional social network.",
    icon: IoMegaphone,
    colorClasses: {
      bg: 'bg-pink-500/10 hover:bg-pink-500/50',
      icon: 'text-pink-300',
      border: 'border border-pink-400/30',
      glow: 'hover:shadow-[0_0_30px_-5px_rgba(244,114,182,0.3)]',
    },
  },
  {
    title: 'More Than Just Movies',
    description:
      "Watchly isn't just for movies. Discover and track your favorite TV shows, documentaries, and more.",
    icon: IoStatsChart,
    colorClasses: {
      bg: 'bg-indigo-500/10 hover:bg-indigo-500/50',
      icon: 'text-indigo-300',
      border: 'border border-indigo-400/30',
      glow: 'hover:shadow-[0_0_30px_-5px_rgba(129,140,248,0.3)]',
    },
  },
]

export { features }
