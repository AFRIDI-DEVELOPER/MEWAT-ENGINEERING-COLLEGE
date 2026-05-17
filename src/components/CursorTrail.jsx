import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAssetPath } from '../utils/assets'

// 30 premium 3D icons from a verified high-quality set (3dicons.co)
// These icons have true alpha transparency (no backgrounds)
const CURSOR_IMAGES_DEFAULT = Array.from({ length: 30 }, (_, i) => getAssetPath(`/images/cursor/icon_${i + 1}.webp`))

const SPAWN_THRESHOLD = 160 // pixels – fewer icons for a cleaner look
const ICON_SIZE = 140 // larger icons to showcase the 3D detail

export default function CursorTrail() {
  const [items, setItems] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  const [currentIcons, setCurrentIcons] = useState(CURSOR_IMAGES_DEFAULT)
  const lastPos = useRef({ x: 0, y: 0 })
  const mousePos = useRef({ x: 0, y: 0 })
  const nextId = useRef(0)
  const imageIndex = useRef(0)

  // Detect touch / mobile devices
  useEffect(() => {
    const check = () => {
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const narrow = window.innerWidth <= 1024
      setIsMobile(touch || narrow)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Listen for cursor icon changes
  useEffect(() => {
    const handleCursorChange = (e) => {
      if (e.detail && Array.isArray(e.detail.icons)) {
        const resolvedIcons = e.detail.icons.map(getAssetPath)
        setCurrentIcons(resolvedIcons)
      } else {
        setCurrentIcons(CURSOR_IMAGES_DEFAULT)
      }
      // Reset index to start from the first icon of the new set
      imageIndex.current = 0
    }

    window.addEventListener('cursor-change', handleCursorChange)
    return () => window.removeEventListener('cursor-change', handleCursorChange)
  }, [])

  // Track mouse position (desktop only)
  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      const dist = Math.hypot(
        e.clientX - lastPos.current.x,
        e.clientY - lastPos.current.y
      )

      if (dist > SPAWN_THRESHOLD) {
        spawnItem(e.clientX, e.clientY)
        lastPos.current = { x: e.clientX, y: e.clientY }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile, currentIcons])

  const spawnItem = useCallback((x, y) => {
    const id = nextId.current++
    const imgSrc = currentIcons[imageIndex.current % currentIcons.length]
    imageIndex.current++

    // Random rotation and slight scale variation for a natural feel
    const rotation = Math.random() * 30 - 15
    const scale = 0.8 + Math.random() * 0.4

    const newItem = {
      id,
      x,
      y,
      imgSrc,
      rotation,
      scale,
      // Dynamic target with slight offset for "throw" effect
      targetX: x + (Math.random() * 60 - 30),
      targetY: y + (Math.random() * 60 - 30)
    }

    setItems((prev) => [...prev.slice(-20), newItem])

    // Total lifespan of 0.8 seconds
    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id))
    }, 800)
  }, [currentIcons])

  if (isMobile) return null

  return (
    <div 
      className="cursor-trail-container" 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        pointerEvents: 'none', 
        zIndex: 10000, // Ensure it's above everything
        overflow: 'hidden'
      }}
    >
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ 
              opacity: 0, 
              scale: 0.1, 
              x: item.x - ICON_SIZE / 2, 
              y: item.y - ICON_SIZE / 2,
              rotate: item.rotation - 20
            }}
            animate={{ 
              opacity: 1, 
              scale: item.scale,
              x: item.targetX - ICON_SIZE / 2,
              y: item.targetY - ICON_SIZE / 2,
              rotate: item.rotation
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.2,
              rotate: item.rotation + 20,
              transition: { duration: 0.3, ease: "easeIn" }
            }}
            transition={{ 
              duration: 0.4, 
              ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier for "catch-up" feel
            }}
            style={{
              position: 'absolute',
              width: ICON_SIZE,
              height: ICON_SIZE,
              willChange: 'transform, opacity'
            }}
          >
            <img 
              src={item.imgSrc} 
              alt="" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.2)) contrast(1.05)'
              }} 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
