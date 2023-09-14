import React, { useState, PropsWithChildren, useEffect } from "react"

type Props = PropsWithChildren & {
  delay?: number
  transitionDuration?: number
  className?: string
  childClassName?: string
  visible?: boolean
  onComplete?: () => void
}

export default function FadeIn(props: Props) {
  const [maxIsVisible, setMaxIsVisible] = useState(0)
  const transitionDuration =
    typeof props.transitionDuration === "number"
      ? props.transitionDuration
      : 400
  const delay = typeof props.delay === "number" ? props.delay : 50
  const visible = typeof props.visible === "undefined" ? true : props.visible

  useEffect(() => {
    let count = React.Children.count(props.children)
    if (!visible) {
      // Animate all children out
      count = 0
    }

    if (count == maxIsVisible) {
      // We're done updating maxVisible, notify when animation is done
      const timeout = setTimeout(() => {
        if (props.onComplete) props.onComplete()
      }, transitionDuration)
      return () => clearTimeout(timeout)
    }

    // Move maxIsVisible toward count
    const increment = count > maxIsVisible ? 1 : -1
    const timeout = setTimeout(() => {
      setMaxIsVisible(maxIsVisible + increment)
    }, delay)
    return () => clearTimeout(timeout)
  }, [delay, maxIsVisible, visible, transitionDuration, props])

  return (
    <div className={props.className}>
      {React.Children.map(props.children, (child, i) => (
        <div
          className={props.childClassName}
          style={{
            transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
            transform: maxIsVisible > i ? "none" : "translateY(20px)",
            opacity: maxIsVisible > i ? 1 : 0,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
