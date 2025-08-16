"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Trophy, Menu, X, Calendar, MapPin, Zap, Star, Users } from "lucide-react"
import Image from "next/image"

// Types
interface Team {
  id: string
  name: string
  color: string
  icon: string
  logo: string
  hoverColor: string
  glowColor: string
  category: "girls" | "juniors" | "seniors"
}

interface TeamStats {
  id: string
  played: number
  won: number
  draw: number
  lost: number
  goalsFor: number
  goalsAgainst: number
}

interface Dignitary {
  id: string
  logo : string
  title: string
}

interface LiveUpdate {
  id: string
  time: string
  update: string
  type: "match" | "result" | "news" | "highlight" | "info"
}

interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
  completed: boolean
}

interface NavItem {
  name: string
  section: string
  href: string
}

// Data Constants
const HERO_DATA = {
  title: "Late Haji Abdul Kadar Abdullah Chataiwala",
  subtitle: "Football Memorial Cup 2025",
  date: "16th August 2025",
  venue: "Astro Park Raghuvanshi Mills",
}

const MOTIVATIONAL_PHRASES = ["Football Memorial Cup 2025"]

const TEAM_STATS: Record<string, TeamStats> = {
  // ✅ Juniors
  "cannine-warriors-juniors": {
    id: "cannine-warriors-juniors",
    played: 4,
    won: 2,
    draw: 2,
    lost: 0,
    goalsFor: 5,
    goalsAgainst: 1,
  },
  "huma-hammers": {
    id: "huma-hammers",
    played: 4,
    won: 1,
    draw: 2,
    lost: 1,
    goalsFor: 3,
    goalsAgainst: 4,
  },
  "munshi-warriors": { id: "munshi-warriors", played: 4, won: 1, draw: 2, lost: 1, goalsFor: 6, goalsAgainst: 4 },
  "united-manchester": { id: "united-manchester", played: 4, won: 1, draw: 2, lost: 1, goalsFor: 3, goalsAgainst: 2 },
  "united-cola": { id: "united-cola", played: 4, won: 0, draw: 2, lost: 2, goalsFor: 2, goalsAgainst: 8 },

  // ✅ Seniors
  "cannine-warriors-seniors": { id: "cannine-warriors-seniors", played: 4, won: 0, draw: 0, lost: 4, goalsFor: 1, goalsAgainst: 9 },
  "stronger-together-seniors": { id: "stronger-together-seniors", played: 4, won: 2, draw: 0, lost: 2, goalsFor: 5, goalsAgainst: 8 },
  "hookah-world": { id: "hookah-world", played: 4, won: 1, draw: 0, lost: 3, goalsFor: 2, goalsAgainst: 7 },
  "lights-light": { id: "lights-light", played: 4, won: 3, draw: 0, lost: 1, goalsFor: 10, goalsAgainst: 2 },
  "forever-victorians-94": { id: "forever-victorians-94", played: 4, won: 4, draw: 0, lost: 0, goalsFor: 10, goalsAgainst: 0 },
}

const TEAMS: Team[] = [
  // Girls Category
  {
    id: "stronger-together-girls",
    name: "Stronger Together",
    color: "bg-purple-600",
    icon: "💪",
    hoverColor: "hover:bg-gradient-to-br hover:from-purple-600/20 hover:to-purple-500/20 hover:border-purple-600/50",
    glowColor: "hover:shadow-purple-600/25",
    category: "girls",
    logo: "/strongertogether.jpg"
  },
  {
    id: "cannine-warriors-girls",
    name: "FC Canine United",
    color: "bg-purple-500",
    icon: "🔥",
    hoverColor: "hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-purple-400/20 hover:border-purple-500/50",
    glowColor: "hover:shadow-purple-500/25",
    category: "girls",
    logo: "/caninelogo.jpg",
  },
  // Juniors Category
  {
    id: "cannine-warriors-juniors",
    name: "FC Canine United",
    color: "bg-blue-600",
    icon: "🔥",
    hoverColor: "hover:bg-gradient-to-br hover:from-blue-600/20 hover:to-blue-500/20 hover:border-blue-600/50",
    glowColor: "hover:shadow-blue-600/25",
    category: "juniors",
    logo: "/caninelogo.jpg",
  },
  {
    id: "huma-hammers",
    name: "Huma Hammers",
    color: "bg-blue-500",
    icon: "🔨",
    hoverColor: "hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-blue-400/20 hover:border-blue-500/50",
    glowColor: "hover:shadow-blue-500/25",
    category: "juniors",
    logo: "/Hammerslogo.jpg"
  },
  {
    id: "munshi-warriors",
    name: "Munshi Warriors",
    color: "bg-blue-700",
    icon: "⚔️",
    hoverColor: "hover:bg-gradient-to-br hover:from-blue-700/20 hover:to-blue-600/20 hover:border-blue-700/50",
    glowColor: "hover:shadow-blue-700/25",
    category: "juniors",
    logo: "/munshiwarriors.jpg"
  },
  {
    id: "united-manchester",
    name: "United Manchester",
    color: "bg-blue-800",
    icon: "⚽",
    hoverColor: "hover:bg-gradient-to-br hover:from-blue-800/20 hover:to-blue-700/20 hover:border-blue-800/50",
    glowColor: "hover:shadow-blue-800/25",
    category: "juniors",
    logo: "/unitedlogo.jpg"
  },
    {
    id: "united-cola",
    name: "Oxy Cola United",
    color: "bg-blue-900",
    icon: "🛡️",
    hoverColor: "hover:bg-gradient-to-br hover:from-blue-900/20 hover:to-blue-800/20 hover:border-blue-900/50",
    glowColor: "hover:shadow-blue-900/25",
    category: "juniors",
    logo: "/oxycola.jpg"
  },

  // Seniors Category
  {
    id: "cannine-warriors-seniors",
    name: "FC Canine United",
    color: "bg-red-600",
    icon: "🔥",
    hoverColor: "hover:bg-gradient-to-br hover:from-red-600/20 hover:to-red-500/20 hover:border-red-600/50",
    glowColor: "hover:shadow-red-600/25",
    category: "seniors",
    logo: "/caninelogo.jpg",
  },
  {
    id: "stronger-together-seniors",
    name: "Stronger Together",
    color: "bg-red-500",
    icon: "💪",
    hoverColor: "hover:bg-gradient-to-br hover:from-red-500/20 hover:to-red-400/20 hover:border-red-500/50",
    glowColor: "hover:shadow-red-500/25",
    category: "seniors",
    logo: "/strongertogether.jpg"
  },
  {
    id: "hookah-world",
    name: "Hookah World",
    color: "bg-red-700",
    icon: "💨",
    hoverColor: "hover:bg-gradient-to-br hover:from-red-700/20 hover:to-red-600/20 hover:border-red-700/50",
    glowColor: "hover:shadow-red-700/25",
    category: "seniors",
    logo: "/hookahlogo.jpg"
  },
  {
    id: "lights-light",
    name: "Lights & Light",
    color: "bg-red-800",
    icon: "💡",
    hoverColor: "hover:bg-gradient-to-br hover:from-red-800/20 hover:to-red-700/20 hover:border-red-800/50",
    glowColor: "hover:shadow-red-800/25",
    category: "seniors",
    logo: "light&lightlogo.jpg"
  },
  {
    id: "forever-victorians-94",
    name: "Forever Victorian 94",
    color: "bg-red-900",
    icon: "👑",
    hoverColor: "hover:bg-gradient-to-br hover:from-red-900/20 hover:to-red-800/20 hover:border-red-900/50",
    glowColor: "hover:shadow-red-900/25",
    category: "seniors",
    logo: "victorianslogo.jpg"
  },
]

const TEAM_PLAYERS: Record<string, string[]> = {
  "stronger-together-girls": [
    "Nizh Kapadia - Captain",
    "Anam Poonawala",
    "Fatima Mandviwala",
    "Nuha Chasrai",
    "Sanika Azeem Sachwani",
    "Shumaysah Kotharewala",
  ],
  "cannine-warriors-girls": [
    "Zainab A. Mandviwala",
    "Aisha Abubaker Memon",
    "Anabia Mandviwala",
    "Anayah Mandviwala",
    "Liba Junani",
    "Samaira Azeem Sachwani",
  ],
  "huma-hammers": [
    "Zayaan Patel - Captain",
    "Rayyan Merchant",
    "Abdul Gani Chataiwala",
    "Mohammed Ali Memon",
    "Mohammed Umer Memon",
    "Uzair Suthriwala",
  ],
    "cannine-warriors-juniors": [
    "Omar A. Mandviwala - Captain",
    "Abaan Naved Patel",
    "Qadeer Merchant",
    "Rishaan Riyaaz Kachhi",
    "Shayaan Nagpurwala",
    "Ebrahim Arif Nachkani",
  ],
  "munshi-warriors": [
    "Ammar Munshi - Captain",
    "Aamir Memon",
    "Ali Suthriwala",
    "Ayaan Lakdawala",
    "Rayaan Lakdawala",
    "Sulaim Zahid Munshi",
  ],
    "united-cola": [
    "Ammar Munshi - Captain",
    "Aamir Memon",
    "Ali Suthriwala",
    "Ayaan Lakdawala",
    "Rayaan Lakdawala",
    "Sulaim Zahid Munshi",
  ],
  "united-manchester": [
    "Aahil Sutriwala - Captain",
    "Abdullah Wasim Patel",
    "Ayaan Khalid Bakali",
    "Hadii Nagpurwala",
    "Izaan Khalid Bakali",
    "Yahya Chataiwala",
  ],
   "cannine-warriors-seniors": [
    "Abdullah Mandviwala - Captain",
    "Aamir Patel",
    "Manjoorali A.H Memon",
    "Rahil Poonawala",
    "Ridaan Patel",
    "Safwan Naliywala",
    "Yusuf Mukadam",
    "Zaid Junani",
  ],
  "hookah-world": [
    "Safwan Merchant - Captain",
    "Ismail Memon",
    "Moin Junani",
    "Muzzammil Aibani",
    "Saad Bhujwala",
    "Shayaan Lakdawala",
    "Umair Irshad Lakdawala",
    "Wasim Patel",
  ],
    "stronger-together-seniors": [
    "Imran Kapadia - Captain",
    "Aasim Kably",
    "Amaan Dhala",
    "Arsh Kapadia",
    "Mohammed Zuhair Kably",
    "Naved Patel",
    "Rehan Merchant",
    "Zishaan Patel",
  ],
  "lights-light": [
    "Zaid Vilayti - Captain",
    "Adi Nagpurwala",
    "Azeem Bharapurwala",
    "Humayun Kably",
    "Mussadique Pidia",
    "Saad Aibani",
    "Samee Aibani",
    "Zakwan Vilayti",
  ],
  "forever-victorians-94": [
    "Meer Lakhani - Captain",
    "Anas Bhujwala",
    "Amaan Irshad Lakdawala",
    "Ayaan Kotharewala",
    "Fahim Sutriwala",
    "Kaif Bhujwala",
    "Rayan Junani",
    "Shahid Lakdawala",
    "Sufiyan Kataria",
  ],
}

const DIGNITARIES: Dignitary[] = [
  {
    id: "aashiyaana",
    logo: "/aashiyaanalogo.jpg",
    title: "Aashiyana Villas",
  },
  {
    id: "Huma",
    logo: "/Humalogo.jpg",
    title: "Huma Caterers",
  },
  {
    id: "sarjif",
    logo: "/sarjiflogo.jpg",
    title: "Al-Qaswa Travels",
  },
  {
    id: "shahidurbar",
    logo: "/shahidurbar.jpg",
    title: "Shahi Durbar",
  },
  {
    id: "oxycola",
    logo: "/oxycola.jpg",
    title: "Oxy-Cola",
  },
  {
    id: "sigdi",
    logo: "sigdirest.jpg",
    title: "Sigdi Restaurant",
  },
  {
    id: "prize",
    logo: "prizesponsor.jpg",
    title: "Prize Sponsor",
  },
  {
    id: "mithiyaj",
    logo: "Mithiyajlogo.jpg",
    title: "Mithiyaaj",
  },
  // Add more as needed
]

const LIVE_UPDATES: LiveUpdate[] = [
  {
    id: "update-1",
    time: "19:30",
    update: "Reporting time is 2pm!",
    type: "news",
  },

  {
    id: "update-2",
    time: "16:30",
    update: "Munshi Warriors 1 - 1 United Manchester",
    type: "result",
  },

  {
    id: "update-3",
    time: "16:30",
    update: "Huma Hammers 1 - 1 Oxy Cola",
    type: "result",
  },

  {
    id: "update-4",
    time: "16:30",
    update: "Cannine United 0 - 0 United Manchester",
    type: "result",
  },

  {
    id: "update-5",
    time: "16:30",
    update: "Munshi Warriors 1 - 1 Huma Hammers",
    type: "result",
  },

  {
    id: "update-6",
    time: "16:30",
    update: "Canine United 1 - 1 Oxy Cola",
    type: "result",
  },

  {
    id: "update-7",
    time: "17:00",
    update: "United Manchester 0 - 1 Huma Hammers",
    type: "result",
  },

  {
    id: "update-8",
    time: "16:30",
    update: "Munshi Warriors 4 - 0 Oxy Cola",
    type: "result",
  },

]

const NAV_ITEMS: NavItem[] = [
  { name: "Home", section: "home", href: "#home" },
  { name: "Teams", section: "teams", href: "#teams" },
  { name: "Table", section: "table", href: "#table" }, 
  { name: "Live", section: "schedule", href: "#schedule" },
  { name: "Contact", section: "contact", href: "#contact" },
]

const TOURNAMENT_DATE = "2025-08-16T00:00:00"

// Utility Functions
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}

// Custom Hooks
function useScrollSpy(sectionIds: string[], offset = 100) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || "")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section")
            if (sectionId) {
              setActiveSection(sectionId)
            }
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: `-${offset}px 0px -${offset}px 0px`,
      },
    )

    sectionIds.forEach((id) => {
      const element = document.querySelector(`[data-section="${id}"]`)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sectionIds, offset])

  return activeSection
}

function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        ...options,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [options])

  return { ref, isVisible }
}

// Components
function TypewriterText({
  phrases,
  speed = 100,
  pauseDuration = 3000,
  className = "",
}: {
  phrases: string[]
  speed?: number
  pauseDuration?: number
  className?: string
}) {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phraseIndex, setPhraseIndex] = useState(0)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]

    if (currentIndex < currentPhrase.length) {
      const timer = setTimeout(() => {
        setCurrentText(currentPhrase.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, speed)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setCurrentIndex(0)
        setCurrentText("")
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
      }, pauseDuration)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, phraseIndex, phrases, speed, pauseDuration])

  return (
    <div className={`h-12 sm:h-14 md:h-16 ${className}`}>
      <p className="text-lg sm:text-xl md:text-2xl font-light text-white/80 tracking-wide max-w-3xl mx-auto">
        {currentText}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  )
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    completed: false,
  })

  useEffect(() => {
    const calculateCountdown = (): CountdownTime => {
      const target = new Date(targetDate).getTime()
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        completed: false,
      }
    }

    const updateCountdown = () => {
      setCountdown(calculateCountdown())
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  function AnimatedCard({ value, label }: { value: number; label: string }) {
    const [displayValue, setDisplayValue] = useState(value)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
      if (value !== displayValue) {
        setIsAnimating(true)

        const timer = setTimeout(() => {
          setDisplayValue(value)
          setIsAnimating(false)
        }, 200)

        return () => clearTimeout(timer)
      }
    }, [value, displayValue])

    const formattedValue = value.toString().padStart(2, "0")

    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 min-w-[60px] sm:min-w-[70px] md:min-w-[80px] relative overflow-hidden">
        <div className="relative h-12 flex items-center justify-center">
          <div
            className={cn(
              "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tabular-nums leading-none mb-1 sm:mb-2",
              "transition-all duration-400 ease-out",
              isAnimating ? "animate-fade-in" : "",
            )}
          >
            {formattedValue}
          </div>
        </div>
        <div className="text-xs sm:text-sm text-white/60 text-center">{label}</div>
      </div>
    )
  }

  if (countdown.completed) {
    return (
      <div className="text-center py-6 sm:py-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-fade-in">
          🎉 Tournament Begins!
        </h2>
      </div>
    )
  }

  return (
    <div
      className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-8"
      role="timer"
      aria-live="polite"
    >
      <AnimatedCard value={countdown.days} label="Days" />
      <AnimatedCard value={countdown.hours} label="Hours" />
      <AnimatedCard value={countdown.minutes} label="Minutes" />
      <AnimatedCard value={countdown.seconds} label="Seconds" />
    </div>
  )
}

function TeamModal({
  team,
  players,
  isOpen,
  onClose,
}: {
  team: Team | null
  players: string[]
  isOpen: boolean
  onClose: () => void
}) {
  if (!team) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby="team-modal-description">
        {/* Close button */}
        <DialogClose />

        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center gap-3 sm:gap-4">
            <div
              className={cn(
                "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl flex-shrink-0",
                team.color
              )}
            >
              <span role="img" aria-label={`${team.name} icon`}>
                {team.icon}
              </span>
            </div>
            <span className="leading-tight min-w-0 truncate">{team.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div id="team-modal-description" className="sr-only">
          Player roster for {team.name} team
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-2 sm:mt-4 w-full min-w-0 max-w-full overflow-x-hidden">
          {players.map((player, playerIndex) => (
            <div
              key={player}
              className="bg-white/5 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-white/10 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-white/10 to-white/5 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0">
                  {playerIndex + 1}
                </div>
                <span className="font-medium text-white/90 tracking-wide text-sm sm:text-base leading-tight truncate">
                  {player}
                </span>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Navbar({
  navItems,
  activeSection,
  onNavigate,
}: {
  navItems: NavItem[]
  activeSection: string
  onNavigate: (section: string) => void
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false)
    }

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 ease-out",
        scrollY > 50 ? "bg-black/80 backdrop-blur-xl border-b border-white/10" : "bg-black/20 backdrop-blur-sm",
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo (fixed-width container for alignment) */}
          <div className="flex items-center" style={{ width: "180px" }}>
            <Image
              src="/cmsclogo.jpg"
              alt="CMSC Alumni Logo"
              width={160}
              height={40}
              className="h-6 sm:h-8 w-auto object-contain"
              priority
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => onNavigate(item.section)}
                className={cn(
                  "text-sm font-medium transition-all duration-300 tracking-wide hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-0 rounded-md px-3 py-2 relative",
                  activeSection === item.section
                    ? "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-purple-600"
                    : "text-white/70 hover:text-white",
                )}
                aria-current={activeSection === item.section ? "page" : undefined}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:bg-white/10 focus:ring-2 focus:ring-blue-500"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden fixed top-14 sm:top-16 right-0 h-screen w-80 bg-black/95 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-500 ease-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="px-6 py-8 space-y-6">
          {navItems.map((item) => (
            <button
              key={item.section}
              onClick={() => {
                onNavigate(item.section)
                setIsMenuOpen(false)
              }}
              className="block text-2xl font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2 w-full text-left text-white/70 hover:text-white"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  )
}

function Hero({
  heroData,
  motivationalPhrases,
  tournamentDate,
  onScheduleClick,
  onTeamsClick,
}: {
  heroData: { title: string; subtitle: string; date: string; venue: string }
  motivationalPhrases: string[]
  tournamentDate: string
  onScheduleClick: () => void
  onTeamsClick: () => void
}) {
  return (
    <section
      id="home"
      data-section="home"
      className="relative min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] pt-14 sm:pt-16 flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black/30"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-black/50" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)
          `,
        }}
      />

      <div className="w-full h-full flex items-center justify-center py-8 sm:py-12 relative z-10">
        <div className="text-center max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tighter leading-none bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            {heroData.title}
          </h1>

          <TypewriterText phrases={motivationalPhrases} className="mb-6 sm:mb-8" />

          <CountdownTimer targetDate={tournamentDate} />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div className="flex items-center gap-2 sm:gap-3 transition-colors duration-300 text-blue-300 hover:text-blue-200 active:text-blue-100">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              <span className="text-base sm:text-lg font-medium tracking-wide">{heroData.date}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 transition-colors duration-300 text-purple-300 hover:text-purple-200 active:text-purple-100">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              <span className="text-base sm:text-lg font-medium tracking-wide">{heroData.venue}</span>
            </div>
          </div>

          {/* Button Container */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 relative z-10">
            <Button
              size="lg"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onScheduleClick()
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105 glow-button focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer"
              type="button"
            >
              Live Updates
            </Button>
            <Button
              size="lg"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onTeamsClick()
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105 glow-button focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer"
              type="button"
            >
              Points Table
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Teams({
  teams,
  teamPlayers,
}: {
  teams: Team[]
  teamPlayers: Record<string, string[]>
}) {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTeam(null)
  }

  // Group teams by category
  const girlsTeams = teams.filter((team) => team.category === "girls")
  const juniorsTeams = teams.filter((team) => team.category === "juniors")
  const seniorsTeams = teams.filter((team) => team.category === "seniors")

  const CategorySection = ({
    title,
    teams: categoryTeams,
    gradientFrom,
    gradientTo,
  }: {
    title: string
    teams: Team[]
    gradientFrom: string
    gradientTo: string
  }) => (
    <div className="mb-16 last:mb-0">
      <div className="text-center mb-8">
        <h3
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tighter",
            `bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`,
          )}
        >
          {title}.
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categoryTeams.map((team, index) => (
          <div key={team.id} className="group cursor-pointer">
            <Card
              className={cn(
                "bg-gray-900/40 border-white/10 transition-all duration-500 hover:scale-105 active:scale-95 backdrop-blur-sm glow-card-team focus-within:ring-2 focus-within:ring-blue-500",
                team.hoverColor,
              )}
              onClick={() => handleTeamClick(team)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  handleTeamClick(team)
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${team.name} team details`}
            >
              <CardHeader className="text-center p-6">
                <div
                  className={cn(
                    "w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg",
                    team.glowColor
                  )}
                >
                  <img
                    src={team.logo}
                    alt={`${team.name} logo`}
                    className="max-w-full max-h-full object-contain drop-shadow-lg"
                  />
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold text-white group-hover:text-white/90 transition-colors duration-300 tracking-wide leading-tight">
                  {team.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <Badge
                  variant="secondary"
                  className="bg-white/10 text-white/70 border-0 px-3 py-1 rounded-full text-xs"
                >
                  Team {index + 1}
                </Badge>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section
      id="teams"
      ref={ref}
      data-section="teams"
       className={cn(
    "px-4 sm:px-6 text-center mb-12 sm:mb-16 transition-all duration-1000 ease-out",
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
  )}
    >
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tighter bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Tournament Teams.
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl font-light text-white/60 max-w-4xl mx-auto leading-relaxed">
          Elite athletes across three competitive categories.
        </p>
      </div>

      {/* Girls Category */}
      <CategorySection title="Girls" teams={girlsTeams} gradientFrom="from-purple-400" gradientTo="to-purple-600" />

      {/* Juniors Category */}
      <CategorySection title="Juniors" teams={juniorsTeams} gradientFrom="from-blue-500" gradientTo="to-blue-700" />

      {/* Seniors Category */}
      <CategorySection title="Seniors" teams={seniorsTeams} gradientFrom="from-red-500" gradientTo="to-red-700" />

      <TeamModal
        team={selectedTeam}
        players={selectedTeam ? teamPlayers[selectedTeam.id] || [] : []}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}

function Dignitaries({
  dignitaries,
}: {
  dignitaries: { id: string; logo: string; title: string }[];
}) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      id="dignitaries"
      ref={ref}
      className={cn(
        "py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto bg-gradient-to-br from-purple-900/20 to-black/40",
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      )}
    >
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tighter bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Event Sponsors.
        </h2>
        <p className="text-base sm:text-lg md:text-xl font-light text-white/60 max-w-3xl mx-auto leading-relaxed">
          Sponsors of the Tournament.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {dignitaries.map((dignitary) => (
          <div key={dignitary.id} className="group cursor-pointer">
            <Card
              className={cn(
                "bg-gray-900/30 border-white/10 hover:border-purple-500/30",
                "hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-pink-500/10",
                "transition-all duration-500 hover:scale-105 backdrop-blur-sm",
                "glow-card-dignitary",
                "focus-within:ring-2 focus-within:ring-purple-500"
              )}
            >
              <CardHeader className="p-6 flex justify-center items-center">
              <div className="flex items-center justify-center w-full h-40 overflow-hidden">
                <img
                  src={dignitary.logo}
                  alt={dignitary.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </CardHeader>
              <CardContent className="text-center pb-8">
                <Badge
                  variant="secondary"
                  className="bg-white/10 text-white/70 border-0 px-4 py-2 rounded-full"
                >
                  {dignitary.title}
                </Badge>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}

function Organizers() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      id="organizers"
      ref={ref}
      className={cn(
        // Yellow theme background
        "py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto",
        "bg-gradient-to-br from-yellow-900/20 to-black/40",
        // Make sure children can overflow (prevents descender clipping)
        "overflow-visible",
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      )}
    >
      {/* Title */}
      <div className="text-center mb-8 sm:mb-12 overflow-visible">
        <h2
          className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tighter
                     bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent
                     leading-[1.18] pb-1"
        >
          Organizers.
        </h2>

        <p className="text-base sm:text-lg md:text-xl font-light text-white/70 max-w-3xl mx-auto leading-relaxed">
          Meet the team behind the tournament.
        </p>
      </div>

      {/* Single Card */}
      <div className="flex justify-center mt-2">
        <Card
          className={cn(
            "bg-gray-900/30 border-white/10 hover:border-yellow-500/30",
            "hover:bg-gradient-to-br hover:from-yellow-500/10 hover:to-yellow-300/10",
            "transition-all duration-500 hover:scale-105 backdrop-blur-sm",
            "focus-within:ring-2 focus-within:ring-yellow-500"
          )}
        >
          <CardHeader className="p-6 flex justify-center items-center overflow-visible">
            <div className="flex items-center justify-center w-full max-w-lg overflow-visible">
              <img
                src="/organizers.jpg" // Replace with your image path in public/
                alt="Organizers"
                className="max-w-full h-auto object-contain"
              />
            </div>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}

function FootballTable({ teams, stats }: { teams: Team[]; stats: Record<string, TeamStats> }) {
  const calcPoints = (t: TeamStats) => t.won * 3 + t.draw
  const calcGD = (t: TeamStats) => t.goalsFor - t.goalsAgainst

  const sortedTeams = teams
    .map((team) => {
      const s = stats[team.id]
      return {
        ...team,
        ...s,
        points: s ? calcPoints(s) : 0,
        gd: s ? calcGD(s) : 0,
      }
    })
    // ✅ Sort by Points → GD → Goals For
    .sort((a, b) => b.points - a.points || b.gd - a.gd || b.goalsFor - a.goalsFor)

  return (
    <div className="overflow-x-auto rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-white/10">
      <table className="w-full text-sm sm:text-base border-collapse">
        <thead className="bg-white/10 text-white/80">
          <tr>
            <th className="p-3 text-left">Team</th>
            <th className="p-3">P</th>
            <th className="p-3">W</th>
            <th className="p-3">D</th>
            <th className="p-3">L</th>
            <th className="p-3">GF</th>
            <th className="p-3">GA</th>
            <th className="p-3">GD</th>
            <th className="p-3">Pts</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((t, idx) => (
            <tr key={t.id} className="hover:bg-white/5 transition-colors">
              <td className="p-3 flex items-center gap-2">
                <img src={t.logo} alt={t.name} className="w-6 h-6 rounded-full" />
                <span>{t.name}</span>
              </td>
              <td className="p-3 text-center">{t.played}</td>
              <td className="p-3 text-center">{t.won}</td>
              <td className="p-3 text-center">{t.draw}</td>
              <td className="p-3 text-center">{t.lost}</td>
              <td className="p-3 text-center">{t.goalsFor}</td>
              <td className="p-3 text-center">{t.goalsAgainst}</td>
              <td className="p-3 text-center">{t.gd}</td>
              <td className="p-3 text-center font-bold text-yellow-400">{t.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function FootballTables({ teams, stats }: { teams: Team[]; stats: Record<string, TeamStats> }) {
  const juniors = teams.filter((t) => t.category === "juniors")
  const seniors = teams.filter((t) => t.category === "seniors")

  return (
    <section id="table" data-section="table" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        League Tables.
      </h2>

      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-left text-white/80">Juniors</h3>
        <FootballTable teams={juniors} stats={stats} />
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4 text-left text-white/80">Seniors</h3>
        <FootballTable teams={seniors} stats={stats} />
      </div>
    </section>
  )
}

function LiveUpdates({ updates }: { updates: LiveUpdate[] }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })

  const updateIcons = {
    match: Zap,
    result: Trophy,
    news: Star,
    highlight: Users,
    info: Calendar,
  }

  const updateColors = {
    match: "text-yellow-400",
    result: "text-green-400",
    news: "text-blue-400",
    highlight: "text-purple-400",
    info: "text-white/60",
  }

  return (
    <section
      id="schedule"
      ref={ref}
      data-section="schedule"
      className={cn(
        "py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto bg-gradient-to-br from-red-900/20 to-yellow-900/20",
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
      )}
    >
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tighter bg-gradient-to-r from-red-400 to-yellow-500 bg-clip-text text-transparent">
          Live Updates.
        </h2>
        <p className="text-base sm:text-lg md:text-xl font-light text-white/60 max-w-3xl mx-auto leading-relaxed">
          Tournament news and match results.
        </p>
      </div>

      <div className="bg-gray-900/30 rounded-3xl p-8 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 glow-card-updates">
        <div
          className="space-y-6 max-h-96 overflow-y-auto custom-scrollbar"
          role="feed"
          aria-label="Live tournament updates"
        >
          {updates.map((update) => {
            const IconComponent = updateIcons[update.type]
            const iconColor = updateColors[update.type]

            return (
              <article
                key={update.id}
                className="flex items-start gap-6 p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg glow-update-item"
                role="article"
                aria-labelledby={`update-${update.id}`}
              >
                <div className="flex-shrink-0 mt-1">
                  <IconComponent className={cn("h-6 w-6", iconColor)} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <time className="text-sm text-white/50 font-mono tracking-wider" dateTime={update.time}>
                      {update.time}
                    </time>
                    <Badge
                      variant="outline"
                      className="text-xs border-white/20 text-white/60 bg-transparent px-3 py-1 rounded-full"
                    >
                      {update.type}
                    </Badge>
                  </div>
                  <p id={`update-${update.id}`} className="text-white/90 text-lg leading-relaxed">
                    {update.update}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })

  return (
    <footer
      id="contact"
      ref={ref}
      data-section="contact"
      className={cn(
        "bg-gray-900/50 border-t border-white/10",
        "py-12 sm:py-16 md:py-20",
        "px-4 sm:px-6 max-w-7xl mx-auto transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
      )}
    >
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Trophy className="h-7 w-7 text-white" aria-hidden="true" />
          </div>
          <span className="text-3xl font-semibold tracking-tight">Football Memorial Cup 2025</span>
        </div>
        <p className="text-xl text-white/60 mb-12 font-light">The ultimate football championship experience.</p>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <p className="text-white/60">Abubaker Dadani: 9819532826</p>
            <p className="text-white/60">Abdus Samad Lakdawala: 9867660772</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Location</h3>
            <p className="text-white/60">Raghuvanshi Mills</p>
            <p className="text-white/60">Lower Parel, Mumbai 400013</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <p className="text-white/60">@cmscallumni</p>
            <p className="text-white/60">#CMSCFootball2025</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/50">
          <span className="tracking-wide">© Developed by Saad Rizwan Aibani. All rights reserved.</span>
          <nav className="flex gap-8" aria-label="Footer navigation">
            <a
              href="#privacy"
              className={cn(
                "hover:text-blue-400 active:text-blue-300 transition-colors duration-300 tracking-wide",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1",
              )}
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className={cn(
                "hover:text-purple-400 active:text-purple-300 transition-colors duration-300 tracking-wide",
                "focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md px-2 py-1",
              )}
            >
              Terms of Service
            </a>
            <a
              href="mailto:info@cmscfootball.com"
              className={cn(
                "hover:text-green-400 active:text-green-300 transition-colors duration-300 tracking-wide",
                "focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md px-2 py-1",
              )}
            >
              Contact Us
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

// Main Component
export default function FootballTournament() {
  const activeSection = useScrollSpy(["home", "teams", "table","schedule", "contact"])

  // Enhanced smooth scrolling function
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    // Dynamic navbar height calculation based on screen size
    const getNavHeight = () => {
      const isMobile = window.innerWidth < 640 // sm breakpoint
      return isMobile ? 56 : 64 // h-14 = 56px on mobile, h-16 = 64px on desktop
    }

    const navHeight = getNavHeight()
    const additionalOffset = 20 // Extra padding for better visual spacing
    const targetPosition = element.offsetTop - navHeight - additionalOffset
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const duration = 600
    let start: number | null = null

    // Improved easing function for iOS
    const easeInOutQuart = (t: number): number => {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
    }

    function animate(currentTime: number) {
      if (start === null) start = currentTime
      const timeElapsed = currentTime - start
      const progress = Math.min(timeElapsed / duration, 1)

      const ease = easeInOutQuart(progress)
      const currentPosition = startPosition + distance * ease

      window.scrollTo(0, currentPosition)

      if (timeElapsed < duration) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [])

  const handleScheduleClick = useCallback(() => {
    scrollToSection("schedule")
  }, [scrollToSection])

  const handleTeamsClick = useCallback(() => {
    scrollToSection("table")
  }, [scrollToSection])

  // Prevent scroll issues on mobile
  useEffect(() => {
    // Better iOS scroll optimization
    document.body.style.overscrollBehavior = "none";
    (document.body.style as any).webkitOverflowScrolling = "touch"
    document.documentElement.style.scrollBehavior = "auto" // Disable native smooth scroll

    // Prevent momentum scrolling issues on iOS
    const preventBounce = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      if (target.closest(".custom-scrollbar")) return // Allow scrolling in modals

      const scrollTop = window.pageYOffset
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight

      if (scrollTop === 0 && e.touches[0].clientY > e.touches[0].clientY) {
        e.preventDefault()
      }
      if (scrollTop + clientHeight >= scrollHeight && e.touches[0].clientY < e.touches[0].clientY) {
        e.preventDefault()
      }
    }

    document.addEventListener("touchmove", preventBounce, { passive: false })

    return () => {
      document.body.style.overscrollBehavior = "auto";
      (document.body.style as any).webkitOverflowScrolling = "auto";
      document.documentElement.style.scrollBehavior = "smooth";
      document.removeEventListener("touchmove", preventBounce)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      <Navbar navItems={NAV_ITEMS} activeSection={activeSection} onNavigate={scrollToSection} />

      <main>
        <Hero
          heroData={HERO_DATA}
          motivationalPhrases={MOTIVATIONAL_PHRASES}
          tournamentDate={TOURNAMENT_DATE}
          onScheduleClick={handleScheduleClick}
          onTeamsClick={handleTeamsClick}
        />

        <Teams teams={TEAMS} teamPlayers={TEAM_PLAYERS} />

        <FootballTables teams={TEAMS} stats={TEAM_STATS} />  

        <Dignitaries dignitaries={DIGNITARIES} />

        <Organizers />

        <LiveUpdates updates={LIVE_UPDATES} />

      </main>

      <Footer />
    </div>
  )
}
