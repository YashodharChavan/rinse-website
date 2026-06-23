import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  CalendarDays,
  CheckCircle2,
  Code2,
  Download,
  ExternalLink,
  Gauge,
  GitFork,
  LayoutDashboard,
  Megaphone,
  PackageCheck,
  Rocket,
  Star,
  TimerReset,
  Trophy,
  Users,
  WashingMachine,
  Eye,
  ShieldCheck,
  Zap,
  CheckSquare,
  User,
  Check,
  Ghost,
  Sparkles,
  Smartphone,
  Archive
} from 'lucide-react'
const repoSlug = import.meta.env.VITE_GITHUB_REPO || 'YashodharChavan/rinse'
const repoUrl = `https://github.com/${repoSlug}`
const fallbackVersion = 'v0.0.0'

const navLinks = [
  ['The Problem', '#problem'],
  ['Features', '#features'],
  ['Leaderboard', '#leaderboard'],
  ['Releases', '#releases'],
  ['Open Source', '#open-source'],
]

const mechanics = [
  {
    title: 'The Visual Schedule',
    eyebrow: 'Calendar view',
    body: 'Residents see who is using a machine right now, when it ends, and which future slot is actually free.',
    color: 'bg-cyan-300',
    icon: CalendarDays,
    stat: 'Day schedule',
  },
  {
    title: 'The Lazy Sweeper',
    eyebrow: 'Auto-penalty',
    body: 'If a resident ghosts their slot for 15 minutes, the sweeper flips the booking to Incomplete and applies the -10 Ghost Penalty.',
    color: 'bg-pink-300',
    icon: TimerReset,
    stat: '-10 points',
  },
  {
    title: 'The Wash Score',
    eyebrow: 'Trust score',
    body: 'Every resident starts with 100 points. Clean completions earn +2, missed slots hurt, and the PG gets a visible trust signal.',
    color: 'bg-lime-300',
    icon: Gauge,
    stat: '100 point system',
  },
]

const dashboardCards = [
  {
    title: 'Owner Approval',
    icon: LayoutDashboard,
    body: 'Owners approve residents, manage machines, and keep the PG roster clean so only verified people can book shared laundry.',
  },
  {
    title: 'Resident Clarity',
    icon: Users,
    body: 'Residents instantly know who booked the machine, when it becomes free, and where they stand in the wash score ranking.',
  },
]

const openSourceActions = [
  {
    label: 'Star the repo',
    body: 'Help residents and PG owners discover the project.',
    href: repoUrl,
    icon: Star,
  },
  {
    label: 'Fork and build',
    body: 'Try your own booking flows, UI ideas, and deployment setup.',
    href: `${repoUrl}/fork`,
    icon: GitFork,
  },
  {
    label: 'Pick an issue',
    body: 'Contribute fixes for scheduling, scoring, docs, and owner tools.',
    href: `${repoUrl}/issues`,
    icon: CheckCircle2,
  },
  {
    label: 'Read releases',
    body: 'Track what changed before installing or self-hosting.',
    href: `${repoUrl}/releases`,
    icon: PackageCheck,
  },
  {
    label: 'Start a discussion',
    body: 'Suggest PG-specific workflows from your own living setup.',
    href: `${repoUrl}/discussions`,
    icon: Megaphone,
  },
]

const residentFeatures = [
  "Reserve or cancel slots instantly. No passive-aggressive WhatsApp messages required.",
  "See exactly who is using the machine right now. Total transparency, zero confusion.",
  "Climb the Wash Score leaderboard. Because basic adulting deserves actual points.",
  "Earn rewards for finishing on time, and dodge the 15-minute 'ghosting' penalty."
]

const ownerFeatures = [
  "Approve or deny resident access. You hold the ultimate keys to the spin cycle.",
  "Book your own laundry slots. (Yes, the Wash Score rules still apply to you).",
  "Easily manage machine settings, cycle durations, and the user roster.",
  "Keep your PG verified, secure, and completely drama-free."
]


function useGithubStars() {
  const [stars, setStars] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    async function fetchStars() {
      try {
        const response = await fetch(`https://api.github.com/repos/${repoSlug}`)

        if (!response.ok) {
          throw new Error('GitHub request failed')
        }

        const data = await response.json()

        if (isMounted) {
          setStars(data.stargazers_count)
          setStatus('ready')
        }
      } catch {
        if (isMounted) {
          setStatus('error')
        }
      }
    }

    fetchStars()

    return () => {
      isMounted = false
    }
  }, [])

  return { stars, status }
}

function useLatestRelease() {
  const [release, setRelease] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    async function fetchRelease() {
      try {
        const response = await fetch(`https://api.github.com/repos/${repoSlug}/releases/latest`)

        if (response.status === 404) {
          throw new Error('No release found')
        }

        if (!response.ok) {
          throw new Error('GitHub release request failed')
        }

        const data = await response.json()

        if (isMounted) {
          setRelease({
            name: data.name || data.tag_name,
            tag: data.tag_name,
            url: data.html_url,
            date: data.published_at,
          })
          setStatus('ready')
        }
      } catch {
        if (isMounted) {
          setStatus('fallback')
        }
      }
    }

    fetchRelease()

    return () => {
      isMounted = false
    }
  }, [])

  return { release, status }
}

function formatStars(count) {
  if (count === null) return '...'
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(count)
}

function NeoButton({ children, href, variant = 'primary', className = '' }) {
  const styles =
    variant === 'primary'
      ? 'bg-yellow-300 text-black'
      : 'bg-white text-black hover:bg-purple-200'

  return (
    <a
      className={`inline-flex items-center justify-center gap-2 border-4 border-black px-5 py-3 text-sm font-black uppercase leading-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none sm:text-base ${styles} ${className}`}
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noreferrer' : undefined}
    >
      {children}
    </a>
  )
}

function Header() {
  const { stars, status } = useGithubStars()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-black bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="grid h-16 w-16 place-items-center border-4 border-black bg-cyan-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <img src="/favicon.png" alt="Rinse" className="h-12 w-12 object-contain" />
        </a>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map(([label, href]) => (
            <a
              className="border-2 border-transparent px-3 py-2 text-sm font-black uppercase hover:border-black hover:bg-lime-200"
              href={href}
              key={label}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Updated GitHub Button */}
        <NeoButton href={repoUrl} className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
          <Star size={16} fill="currentColor" className="shrink-0" />

          {/* Desktop Text */}
          <span>
            Star on GitHub {status === 'ready' && `(${formatStars(stars)})`}
          </span>

        </NeoButton>
      </div>
    </header>
  )
}

function Bubble({ className, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0], rotate: [0, 4, 0] }}
      className={`absolute rounded-full border-4 border-black bg-cyan-200 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] ${className}`}
      transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity, delay }}
    />
  )
}

function Sock({ className, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -24, 0], rotate: [-8, 8, -8] }}
      className={`absolute border-4 border-black bg-pink-300 p-2 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] ${className}`}
      transition={{ duration: 5.5, ease: 'easeInOut', repeat: Infinity, delay }}
    >
      <div className="h-10 w-7 rounded-b-full border-4 border-black bg-white" />
      <div className="-mt-1 h-5 w-12 border-4 border-black bg-yellow-300" />
    </motion.div>
  )
}

function Strap({ className, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -25, 0], rotate: [7, -4, 7] }}
      className={`absolute flex h-16 w-28 items-center justify-center border-4 border-black bg-purple-300 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] ${className}`}
      transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity, delay }}
    >
      <WashingMachine strokeWidth={3} size={38} />
    </motion.div>
  )
}

function HeroArt() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Bubble className="left-[6%] top-28 h-16 w-16 sm:h-20 sm:w-20" />
      <Bubble className="right-[12%] top-36 h-10 w-10 bg-lime-200" delay={1.1} />
      <Bubble className="bottom-14 left-[18%] h-9 w-9 bg-yellow-200" delay={0.7} />
      <Sock className="right-[5%] top-72 hidden rotate-12 sm:block" delay={0.4} />
      <Strap className="bottom-12 right-[16%] hidden sm:flex" delay={1.6} />
    </div>
  )
}

function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden border-b-4 border-black bg-[linear-gradient(#111_1px,transparent_1px),linear-gradient(90deg,#111_1px,transparent_1px)] bg-[size:36px_36px] bg-yellow-100 px-4 pb-20 pt-32 sm:px-6 lg:pb-24 lg:pt-40"
      id="top"
    >
      <HeroArt />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="mb-5 inline-flex rotate-[-2deg] items-center gap-2 border-4 border-black bg-lime-300 px-4 py-2 text-xs font-black uppercase shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] sm:text-sm">
            <Trophy size={18} />
            Open-source laundry diplomacy
          </div>
          <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.92] tracking-tight text-black sm:text-7xl lg:text-8xl">
            Stop fighting over the washing machine!
          </h1>
          <p className="mt-6 max-w-2xl border-l-4 border-black bg-white px-5 py-4 text-lg font-bold shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] sm:text-xl">
            A PG laundry scheduler that shows who is using each machine, when it
            becomes free, and who ghosted their wash slot. Less confusion, fewer
            fights, calmer residents.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <NeoButton href={repoUrl}>
              <Code2 size={22} />
              View GitHub Repo
            </NeoButton>
            <NeoButton href={`${repoUrl}/fork`} variant="secondary">
              <GitFork size={22} />
              Fork Project
            </NeoButton>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -16, 0] }}
          className="relative mx-auto w-full max-w-lg border-4 border-black bg-white p-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
          transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
        >
          <div className="mb-4 flex items-center justify-between border-b-4 border-black pb-3">
            <span className="text-sm font-black uppercase">Schedule</span>
            <span className="border-2 border-black bg-lime-300 px-2 py-1 text-xs font-black uppercase">
              MAC1 / 30m
            </span>
          </div>
          <BookingGrid />
        </motion.div>
      </div>
    </section>
  )
}

function BookingGrid() {
  const slots = useMemo(
    () => [
      ['00:00 - 00:30', 'free'],
      ['00:40 - 01:10', 'booked by Rohan'],
      ['01:20 - 01:50', 'free'],
      ['02:00 - 02:30', 'free'],
      ['02:40 - 03:10', 'using now: Anika'],
      ['03:20 - 03:50', 'free'],
      ['04:00 - 04:30', 'ghost check'],
      ['04:40 - 05:10', 'free'],
      ['05:20 - 05:50', 'booked by Kabir'],
      ['06:00 - 06:30', 'free'],
      ['06:40 - 07:10', 'free'],
    ],
    [],
  )
  const hours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00']

  return (
    <div className="border-4 border-black bg-white">
      <div className="border-b-4 border-black bg-blue-300 p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xl font-black uppercase">Schedule</p>
          <select
            aria-label="Machine"
            className="border-4 border-black bg-white px-2 py-1 text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            defaultValue="mac1"
          >
            <option value="mac1">MAC1 (30m)</option>
            <option value="mac2">MAC2 (45m)</option>
          </select>
        </div>
        <div className="mt-3 grid grid-cols-[auto_1fr_auto] gap-2">
          {['<- Prev', 'Tomorrow', 'Next ->'].map((label) => (
            <button
              className="border-4 border-black bg-white px-3 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
              key={label}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid max-h-[430px] grid-cols-[54px_1fr] overflow-hidden">
        <div className="border-r-4 border-black bg-zinc-100">
          {hours.map((hour) => (
            <div
              className="grid h-16 place-items-start border-b-2 border-zinc-300 px-2 py-2 text-[10px] font-black"
              key={hour}
            >
              {hour}
            </div>
          ))}
        </div>
        <div className="space-y-2 bg-[linear-gradient(#d4d4d8_1px,transparent_1px)] bg-[size:100%_64px] p-2">
          {slots.map(([time, status], index) => {
            const isBusy = status.includes('booked') || status.includes('using')
            const isGhost = status.includes('ghost')
            return (
              <div
                className={`flex min-h-7 items-center justify-center border-4 border-dashed border-black px-2 text-[10px] font-black uppercase ${isBusy ? 'bg-pink-200' : isGhost ? 'bg-yellow-200' : 'bg-white'}`}
                key={time}
              >
                <span>{time}</span>
                <span className="ml-2 hidden text-[9px] sm:inline">{status}</span>
                {index === 4 && (
                  <span className="ml-2 border-2 border-black bg-lime-300 px-1 text-[8px]">
                    Active
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function FloatingSticker({ icon: Icon, color, className, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -15, 0], rotate: [-4, 6, -4] }}
      transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, delay }}
      className={`absolute hidden md:flex items-center justify-center border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${color} ${className}`}
    >
      <Icon size={32} strokeWidth={2.5} />
    </motion.div>
  )
}

function ProblemSection() {
  return (
    <section className="border-b-4 border-black bg-purple-200 px-4 py-16 sm:px-6 lg:py-24 overflow-hidden" id="problem">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">

        {/* Left Column: The Problem (with Relative positioning for Stickers) */}
        <div className="relative flex flex-col justify-center">

          {/* Floating Stickers */}
          <FloatingSticker
            icon={Zap}
            color="bg-yellow-300"
            className="-top-8 right-10 lg:-right-4"
            delay={0}
          />
          <FloatingSticker
            icon={Sparkles}
            color="bg-pink-300"
            className="bottom-1/3 -right-8 lg:-right-12"
            delay={0.7}
          />

          <div className="relative z-10">
            <p className="mb-4 inline-block border-4 border-black bg-white px-3 py-2 text-sm font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              The Problem
            </p>
            <h2 className="text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-[4rem]">
              PG laundry breaks when nobody knows who has the machine.
            </h2>
            <p className="mt-6 max-w-xl border-4 border-black bg-white p-5 text-lg font-bold leading-relaxed shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              Rinse gives residents a shared schedule, visible ownership of slots,
              and a clear answer to the only question that matters: when can I wash?
            </p>
          </div>
        </div>

        {/* Right Column: Cards & Banner */}
        <div className="flex flex-col gap-6">

          {/* Two Tall Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 items-stretch">

            {/* Resident Card */}
            <div className="flex flex-col border-4 border-black bg-white shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
              {/* Card Header */}
              <div className="flex items-center gap-3 border-b-4 border-black bg-cyan-300 p-4">
                <div className="border-2 border-black bg-white p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <User size={24} strokeWidth={3} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">For Residents</h3>
              </div>
              {/* Card List */}
              <ul className="flex flex-1 flex-col space-y-5 p-6">
                {residentFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-bold leading-snug text-gray-800">
                    <Check size={20} strokeWidth={4} className="mt-0.5 shrink-0 text-green-500" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Owner Card */}
            <div className="flex flex-col border-4 border-black bg-white shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
              {/* Card Header */}
              <div className="flex items-center gap-3 border-b-4 border-black bg-yellow-300 p-4">
                <div className="border-2 border-black bg-white p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <ShieldCheck size={24} strokeWidth={3} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">For PG Owners</h3>
              </div>
              {/* Card List */}
              <ul className="flex flex-1 flex-col space-y-5 p-6">
                {ownerFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-bold leading-snug text-gray-800">
                    <Check size={20} strokeWidth={4} className="mt-0.5 shrink-0 text-green-500" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div> {/* End of Cards Grid */}

          {/* GitHub CTA Banner - Now spanning the full width underneath! */}
          <a
            href="https://github.com/YashodharChavan/rinse"
            target="_blank"
            rel="noopener noreferrer"
            className="block border-4 border-black bg-pink-300 p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-black uppercase text-xl tracking-tight leading-none">100% Free & Open Source</h4>
                <p className="text-sm font-bold mt-2 text-gray-900">Fork it, tweak it, host it yourself.</p>
              </div>
              <div className="shrink-0 bg-white border-4 border-black px-6 py-3 font-black uppercase text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                View GitHub →
              </div>
            </div>
          </a>

        </div>

      </div>
    </section>
  )
}

function Features() {
  return (
    <section className="border-b-4 border-black bg-white px-4 py-16 sm:px-6 lg:py-24" id="features">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="mb-3 inline-block border-4 border-black bg-yellow-300 px-3 py-2 text-sm font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              The Mechanics
            </p>
            <h2 className="max-w-3xl text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl">
              The secret sauce is accountability without the awkwardness.
            </h2>
          </div>
          <p className="max-w-md border-4 border-black bg-cyan-100 p-4 text-lg font-bold shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            Rinse turns shared machines into a visible, scored workflow:
            reserve, start, complete, improve.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {mechanics.map(({ title, eyebrow, body, color, icon: Icon, stat }, index) => (
            <motion.article
              className={`min-h-[340px] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${color} ${index === 1 ? 'lg:mt-10' : ''}`}
              initial={{ opacity: 0, y: 28 }}
              key={title}
              transition={{ delay: index * 0.12, duration: 0.45 }}
              viewport={{ once: true, margin: '-80px' }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="border-4 border-black bg-white p-3">
                  <Icon size={40} strokeWidth={3} />
                </div>
                <span className="rotate-3 border-4 border-black bg-white px-3 py-2 text-xs font-black uppercase">
                  {eyebrow}
                </span>
              </div>
              <h3 className="mt-8 text-3xl font-black uppercase leading-none">{title}</h3>
              <p className="mt-4 text-lg font-bold leading-relaxed">{body}</p>
              <p className="mt-8 inline-block border-4 border-black bg-black px-4 py-2 text-sm font-black uppercase text-white">
                {stat}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Leaderboard() {
  const residents = [
    { name: 'Anika', medal: 'Silver', score: 95, color: 'bg-zinc-300', height: 'h-44', order: 'lg:order-1' },
    { name: 'Kabir', medal: 'Gold', score: 98, color: 'bg-yellow-300', height: 'h-56', order: 'lg:order-2' },
    { name: 'Mira', medal: 'Bronze', score: 80, color: 'bg-orange-300', height: 'h-36', order: 'lg:order-3' },
  ]

  return (
    <section className="border-b-4 border-black bg-cyan-200 px-4 py-16 sm:px-6 lg:py-24" id="leaderboard">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 inline-block border-4 border-black bg-pink-300 px-3 py-2 text-sm font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Olympic Leaderboard
          </p>
          <h2 className="text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl">
            Responsible residents get the podium.
          </h2>
        </div>

        <div className="grid items-end gap-6 lg:grid-cols-3">
          {residents.map(({ name, medal, score, color, height, order }, index) => (
            <motion.div
              className={`flex flex-col items-center ${order}`}
              initial={{ opacity: 0, y: 30 }}
              key={name}
              transition={{ delay: index * 0.12 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <img
                alt={`${name} pixel art avatar`}
                className="relative z-10 mb-[-10px] h-28 w-28 border-4 border-black bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
                src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${name}`}
              />
              <div className={`flex w-full flex-col justify-between border-4 border-black p-5 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${color} ${height}`}>
                <p className="text-5xl font-black">{medal === 'Gold' ? '1' : medal === 'Silver' ? '2' : '3'}</p>
                <div>
                  <p className="text-2xl font-black uppercase">{name}</p>
                  <p className="mt-1 text-sm font-black uppercase">{medal} - {score} wash score</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Releases() {
  const { release, status } = useLatestRelease()
  const latestVersion = release?.tag || fallbackVersion
  const releaseLabel =
    status === 'loading'
      ? 'Checking GitHub...'
      : release?.name || (status === 'fallback' ? 'First release coming soon' : latestVersion)
  const releaseDate = release?.date
    ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(
      new Date(release.date),
    )
    : 'No published release yet'

  return (
    <section className="border-b-4 border-black bg-yellow-200 px-4 py-16 sm:px-6 lg:py-24" id="releases">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 border-4 border-black bg-white px-3 py-2 text-sm font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <PackageCheck size={18} />
            Releases
          </p>
          <h2 className="text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl">
            Track what is stable before running it in your PG.
          </h2>
          <p className="mt-5 max-w-xl text-lg font-bold leading-relaxed">
            Releases make the project practical for owners and developers:
            install known versions, read changes, and avoid surprises in live laundry scheduling.
          </p>
        </div>

        <div className="border-4 border-black bg-white p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col gap-4 border-b-4 border-black pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase text-zinc-600">Latest version</p>
              <p className="mt-1 text-5xl font-black uppercase tracking-tight">{latestVersion}</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 border-4 border-black bg-lime-300 px-3 py-2 text-xs font-black uppercase">
              <Download size={16} />
              {status === 'loading' ? 'Loading' : 'Android Ready'}
            </span>
          </div>

          <div className="grid gap-4 pt-5 sm:grid-cols-2">
            <div className="border-4 border-black bg-cyan-100 p-4">
              <p className="text-xs font-black uppercase">Release note</p>
              <p className="mt-2 text-xl font-black uppercase">{releaseLabel}</p>
            </div>
            <div className="border-4 border-black bg-pink-100 p-4">
              <p className="text-xs font-black uppercase">Published</p>
              <p className="mt-2 text-xl font-black uppercase">{releaseDate}</p>
            </div>
          </div>

          {/* NEW BUTTON GROUP */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row flex-wrap">

            {/* 1. Android Direct Download */}
            <NeoButton
              href="https://github.com/YashodharChavan/rinse/releases/download/v1.1.0/Rinse-V1.1.0.apk"
              download
            >
              <Download size={20} />
              ANDROID (.APK)
            </NeoButton>

            {/* 2. iOS Disabled/Coming Soon */}
            <NeoButton
              href="#"
              variant="secondary"
              onClick={(e) => e.preventDefault()}
              className="bg-gray-200 text-gray-500 hover:translate-y-0 hover:translate-x-0 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-not-allowed opacity-80"
              title="Apple App Store approval is pending"
            >
              <Smartphone size={20} />
              iOS (SOON)
            </NeoButton>

            {/* 3. GitHub Releases Fallback */}
            <NeoButton href={`${repoUrl}/releases`} variant="secondary">
              <Archive size={20} /> {/* Or List / ExternalLink depending on your imports */}
              ALL RELEASES
            </NeoButton>

          </div>
        </div>
      </div>
    </section>
  )
}

function OpenSource() {
  return (
    <section className="bg-black px-4 py-16 text-white sm:px-6 lg:py-24" id="open-source">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 border-4 border-white bg-lime-300 px-4 py-2 text-sm font-black uppercase text-black shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]">
            <Rocket size={18} />
            Open Source
          </p>
          <h2 className="text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl">
            Open source because every PG has slightly different laundry chaos.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-bold text-zinc-200">
            Star it, fork it, improve it, or adapt it for your building. The goal
            is simple: make shared washing machines predictable for residents and manageable for owners.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-6">
          {openSourceActions.map(({ label, body, href, icon: Icon }, index) => (
            <a
              className={`border-4 border-white bg-white p-5 text-black shadow-[6px_6px_0px_0px_rgba(255,255,255,0.45)] transition hover:-translate-y-0.5 hover:bg-yellow-300 active:translate-x-1 active:translate-y-1 active:shadow-none ${index < 3 ? 'sm:col-span-2' : 'sm:col-span-3'}`}
              href={href}
              key={label}
              rel="noreferrer"
              target="_blank"
            >
              <div className="mb-4 inline-flex border-4 border-black bg-cyan-300 p-2">
                <Icon size={26} strokeWidth={3} />
              </div>
              <p className="text-xl font-black uppercase">{label}</p>
              <p className="mt-2 text-sm font-bold leading-relaxed">{body}</p>
            </a>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <NeoButton href={repoUrl} className="shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
            <Code2 size={22} />
            Check out the code
          </NeoButton>
        </div>

        <footer className="mt-16 border-4 border-white bg-zinc-950 p-5 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.25)]">
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-2xl font-black uppercase text-white">Rinse</p>
              <p className="mt-1 text-sm font-bold uppercase text-zinc-300">
                Open-source laundry order for shared living.
              </p>
            </div>
            <a
              className="inline-flex items-center gap-2 border-4 border-white bg-white px-4 py-3 text-sm font-black uppercase text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.55)] transition hover:bg-lime-300 active:translate-x-1 active:translate-y-1 active:shadow-none"
              href={repoUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Code2 size={20} />
              GitHub Repository
            </a>
          </div>
        </footer>
      </div>
    </section>
  )
}

function App() {
  return (
    <main className="min-h-screen bg-[#f7f4ea] text-black">
      <Header />
      <Hero />
      <ProblemSection />
      <Features />
      <Leaderboard />
      <Releases />
      <OpenSource />
    </main>
  )
}

export default App
