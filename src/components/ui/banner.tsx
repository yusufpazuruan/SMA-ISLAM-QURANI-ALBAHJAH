"use client"

import { useEffect, useState, type ReactNode } from "react"
import {
  GraduationCap,
  BookOpen,
  School,
  PenTool,
  Award,
  BookMarked,
  Building2,
  FileText,
  Lightbulb,
  AlertTriangle,
  AlertCircle,
  Bell,
  ShieldAlert,
  CheckCircle,
  ThumbsUp,
  Trophy,
  Star,
  Heart,
  XCircle,
  AlertOctagon,
  Ban,
  Info,
  type LucideIcon,
} from "lucide-react"

type BannerType = "info" | "warning" | "success" | "error"
type AnimationType = "float" | "pulse" | "spin" | "diagonal" | "bounce"
type AnimationSpeed = "very-slow" | "slow" | "normal" | "fast" | "very-fast"

interface IconConfig {
  icon: LucideIcon
  delay: string
  duration: string
  animation: AnimationType
}

interface InfoBannerProps {
  title?: string
  description?: string
  body?: string | ReactNode
  htmlBody?: string
  type?: BannerType
  width?: string
  height?: string
  customIcons?: LucideIcon[]
  iconCount?: number
  animationSpeed?: AnimationSpeed
}

export default function InfoBanner({
  title,
  description,
  body = 'Status Akun Anda "Belum Aktif" , Silahkan Hubungi Admin "62 821-9602-7366"',
  htmlBody,
  type = "info",
  width = "100%",
  height = "auto",
  customIcons,
  iconCount = 12,
  animationSpeed = "normal",
}: InfoBannerProps) {
  const [mounted, setMounted] = useState(false)
  const [animatedIcons, setAnimatedIcons] = useState<IconConfig[]>([])

  // Define animation speed multipliers
  const speedConfig = {
    "very-slow": {
      gradientDuration: "30s",
      iconDurationMultiplier: 2.0,
    },
    slow: {
      gradientDuration: "20s",
      iconDurationMultiplier: 1.5,
    },
    normal: {
      gradientDuration: "15s",
      iconDurationMultiplier: 1.0,
    },
    fast: {
      gradientDuration: "10s",
      iconDurationMultiplier: 0.7,
    },
    "very-fast": {
      gradientDuration: "5s",
      iconDurationMultiplier: 0.4,
    },
  }

  const currentSpeed = speedConfig[animationSpeed]

  // Define type-specific properties
  const typeConfig = {
    info: {
      title: title || "Informasi Penting",
      description: description || "Mohon perhatikan informasi berikut",
      gradientClasses: "from-emerald-500 via-teal-500 to-cyan-500",
      defaultIcons: [GraduationCap, BookOpen, School, PenTool, Award, BookMarked, Building2, FileText, Lightbulb, Info],
    },
    warning: {
      title: title || "Peringatan",
      description: description || "Harap perhatikan peringatan berikut",
      gradientClasses: "from-yellow-400 via-amber-500 to-orange-500",
      defaultIcons: [AlertTriangle, AlertCircle, Bell, ShieldAlert, AlertTriangle, Bell, AlertCircle, ShieldAlert],
    },
    success: {
      title: title || "Berhasil",
      description: description || "Operasi telah berhasil diselesaikan",
      gradientClasses: "from-green-400 via-emerald-500 to-teal-500",
      defaultIcons: [CheckCircle, ThumbsUp, Trophy, Star, Heart, CheckCircle, ThumbsUp, Trophy, Star],
    },
    error: {
      title: title || "Error",
      description: description || "Terjadi kesalahan yang perlu diperhatikan",
      gradientClasses: "from-red-500 via-rose-500 to-pink-500",
      defaultIcons: [XCircle, AlertOctagon, Ban, AlertCircle, XCircle, AlertOctagon, Ban, AlertCircle],
    },
  }

  const config = typeConfig[type]

  // Use custom icons if provided, otherwise use default icons for the type
  const iconsToUse = customIcons || config.defaultIcons

  // Animation types
  const animationTypes: AnimationType[] = ["float", "pulse", "spin", "diagonal", "bounce"]

  // Generate icon configurations with random delays, durations, and animation types
  const generateIconConfigs = (count: number): IconConfig[] => {
    const configs: IconConfig[] = []

    for (let i = 0; i < count; i++) {
      const iconIndex = i % iconsToUse.length
      const randomAnimationIndex = Math.floor(Math.random() * animationTypes.length)
      const baseDuration = Math.floor(Math.random() * 5) + 5 // Shorter duration: 5-10s
      const adjustedDuration = baseDuration * currentSpeed.iconDurationMultiplier

      configs.push({
        icon: iconsToUse[iconIndex],
        delay: `${Math.floor(Math.random() * 3)}s`, // Shorter delay: 0-3s
        duration: `${adjustedDuration}s`,
        animation: animationTypes[randomAnimationIndex],
      })
    }

    return configs
  }

  useEffect(() => {
    setMounted(true)
    // Generate animated icons when component mounts
    setAnimatedIcons(generateIconConfigs(iconCount))

    return () => setMounted(false)
  }, [iconCount, customIcons, type, animationSpeed])

  if (!mounted) return null

  // Process HTML content to make links clickable
  const processHtmlContent = (html: string) => {
    // Replace any <Link> tags with proper <a> tags
    const processedHtml = html
      .replace(
        /<Link\s+to=["'](.*?)["'](.*?)>(.*?)<\/Link>/g,
        '<a href="$1" $2 class="text-white font-bold hover:underline">$3</a>',
      )
      // Also handle regular links that might not be clickable
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-white font-bold hover:underline">$1</a>',
      )

    return processedHtml
  }

  // Determine what to render in the body
  const renderBody = () => {
    if (htmlBody) {
      const processedHtml = processHtmlContent(htmlBody)
      return <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
    } else if (typeof body === "string") {
      return <p className="font-medium">{body}</p>
    } else {
      return body
    }
  }

  return (
    <div
      className="relative mx-auto overflow-hidden rounded-lg shadow-lg"
      style={{
        width,
        height,
        minHeight: "150px",
      }}
    >
      {/* Animated gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${config.gradientClasses} opacity-90`}
        style={{
          backgroundSize: "400% 400%",
          animation: `gradient ${currentSpeed.gradientDuration} ease infinite`,
        }}
      />

      {/* Dotted/grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden">
        {animatedIcons.map((iconConfig, index) => {
          const randomLeft = Math.floor(Math.random() * 90) + 5
          const randomTop = Math.floor(Math.random() * 80) + 10
          const randomSize = Math.floor(Math.random() * 15) + 15
          const Icon = iconConfig.icon

          return (
            <div
              key={index}
              className="absolute text-white/30"
              style={{
                left: `${randomLeft}%`,
                top: `${randomTop}%`,
                animationName: iconConfig.animation,
                animationDuration: iconConfig.duration,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDelay: iconConfig.delay,
                animationFillMode: "both",
              }}
            >
              <Icon size={randomSize} />
            </div>
          )
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 text-white overflow-hidden flex flex-col" style={{ minHeight: "180px" }}>
        <h3 className="text-xl font-bold mb-2">{config.title}</h3>
        <p className="text-sm opacity-90 mb-4">{config.description}</p>
        <div className="p-4 bg-white/20 backdrop-blur-sm rounded-md w-full max-w-full overflow-hidden box-border mt-auto mb-auto mx-0">
          {renderBody()}
        </div>
      </div>
    </div>
  )
}
