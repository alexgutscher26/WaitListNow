"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function useCommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Toggle the menu when ⌘K or Ctrl+K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "k" && e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Define the command menu pages and actions
  const pages = [
    {
      name: "Dashboard",
      shortcut: "D",
      onSelect: () => router.push("/dashboard"),
      icon: "🏠",
    },
    {
      name: "Waitlists",
      shortcut: "W",
      onSelect: () => router.push("/dashboard/waitlists"),
      icon: "👥",
    },
    {
      name: "API Key",
      shortcut: "A",
      onSelect: () => router.push("/dashboard/api-key"),
      icon: "🔑",
    },
    {
      name: "Account Settings",
      shortcut: "S",
      onSelect: () => router.push("/dashboard/account-settings"),
      icon: "⚙️",
    },
    {
      name: "Upgrade",
      shortcut: "U",
      onSelect: () => router.push("/dashboard/upgrade"),
      icon: "💎",
    },
  ]

  return {
    open,
    setOpen,
    pages,
  }
}
