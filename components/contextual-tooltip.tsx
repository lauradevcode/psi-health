"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, HelpCircle } from "lucide-react"

type TooltipConfig = {
  [key: string]: {
    title: string
    description: string
  }
}

type ContextualTooltipProps = {
  id: string
  config: TooltipConfig
  children: React.ReactNode
  disabled?: boolean
}

export function ContextualTooltip({ id, config, children, disabled = false }: ContextualTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenSeen, setHasBeenSeen] = useState(true) // Default to true to prevent auto-show

  useEffect(() => {
    if (disabled) return

    const seenTooltips = localStorage.getItem("seen_tooltips")
    const seenArray = seenTooltips ? JSON.parse(seenTooltips) : []
    setHasBeenSeen(seenArray.includes(id))
  }, [id, disabled])

  const handleClose = () => {
    setIsVisible(false)
    setHasBeenSeen(true)

    const seenTooltips = localStorage.getItem("seen_tooltips")
    const seenArray = seenTooltips ? JSON.parse(seenTooltips) : []
    if (!seenArray.includes(id)) {
      seenArray.push(id)
      localStorage.setItem("seen_tooltips", JSON.stringify(seenArray))
    }
  }

  const handleShow = () => {
    setIsVisible(true)
  }

  const tooltipData = config[id]
  if (!tooltipData || disabled) return <>{children}</>

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2">
        {children}
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6 text-muted-foreground hover:text-foreground"
          onClick={handleShow}
          title="Ver ajuda"
        >
          <HelpCircle className="w-4 h-4" />
        </Button>
      </div>

      {isVisible && (
        <Card className="absolute top-full left-0 mt-2 p-4 space-y-3 z-50 w-80 max-w-[90vw] shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1 flex-1">
              <h4 className="font-semibold text-sm">{tooltipData.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{tooltipData.description}</p>
            </div>
            <Button variant="ghost" size="icon" className="w-6 h-6 flex-shrink-0" onClick={handleClose}>
              <X className="w-3 h-3" />
            </Button>
          </div>
          <Button size="sm" className="w-full" onClick={handleClose}>
            Entendi!
          </Button>
        </Card>
      )}
    </div>
  )
}
