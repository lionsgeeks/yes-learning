"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import NewsletterModal from "./newsletter-modal"

export default function NewsletterButton({ variant = "default", className = "" }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button variant={variant} className={className} onClick={() => setIsModalOpen(true)}>
        Subscribe to Newsletter
      </Button>
      <NewsletterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
