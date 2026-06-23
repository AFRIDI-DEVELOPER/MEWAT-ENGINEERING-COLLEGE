import { FadeIn } from './components/FadeIn';
import { AnimatedHeading } from './components/AnimatedHeading';

export default function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden text-white bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Navbar */}
        <div className="px-6 md:px-12 lg:px-16 pt-6">
          <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
            <div className="text-2xl font-semibold tracking-tight">VEX</div>
            <div className="hidden md:flex items-center gap-8 text-sm">
              <a href="#" className="transition-colors hover:text-gray-300">Story</a>
              <a href="#" className="transition-colors hover:text-gray-300">Investing</a>
              <a href="#" className="transition-colors hover:text-gray-300">Building</a>
              <a href="#" className="transition-colors hover:text-gray-300">Advisory</a>
            </div>
            <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100">
              Start a Chat
            </button>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-12 lg:pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-end">
            
            {/* Left Column */}
            <div>
              <AnimatedHeading
                text="Shaping tomorrow\nwith vision and action."
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4"
              />
              
              <FadeIn delay={800} duration={1000}>
                <p className="text-base md:text-lg text-gray-300 mb-5">
                  We back visionaries and craft ventures that define what comes next.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000} className="flex flex-wrap gap-4">
                <button className="bg-white text-black px-8 py-3 rounded-lg font-medium">
                  Start a Chat
                </button>
                <button className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium transition-colors hover:bg-white hover:text-black">
                  Explore Now
                </button>
              </FadeIn>
            </div>

            {/* Right Column */}
            <div className="mt-8 lg:mt-0 flex items-end justify-start lg:justify-end">
              <FadeIn delay={1400} duration={1000}>
                <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                  <span className="text-lg md:text-xl lg:text-2xl font-light">
                    Investing. Building. Advisory.
                  </span>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
