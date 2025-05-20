import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--green-bg": "#d1fae5", 
          "--green-text": "#065f46", 
          "--green-border": "#10b981", 
          "--red-bg": "#fee2e2", 
          "--red-text": "#991b1b", 
          "--red-border": "#ef4444", 
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
