import React, { useEffect, useRef, useState } from 'react'

const slides = [
  {
    img: "/assets/images/slider/1.jpg",
    title: "New Season Arrivals",
    subtitle: "Fresh styles just landed",
    cta: "Shop Now",
    link: "/cat"
  },
  {
    img: "/assets/images/slider/2.jpg",
    title: "Up To 50% Off",
    subtitle: "On selected collections",
    cta: "Explore Deals",
    link: "/cat"
  },
  {
    img: "/assets/images/slider/3.jpg",
    title: "Trending This Week",
    subtitle: "Handpicked for you",
    cta: "Discover",
    link: "/cat"
  },
  {
    img: "/assets/images/slider/4.jpg",
    title: "Free Delivery",
    subtitle: "On every order, every day",
    cta: "Start Shopping",
    link: "/cat"
  }
]

function HeroSlider() {
  const [active, setActive] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    timer.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer.current)
  }, [])

  const goTo = (i) => {
    clearInterval(timer.current)
    setActive(i)
    timer.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, 4500)
  }

  const prev = () => goTo((active - 1 + slides.length) % slides.length)
  const next = () => goTo((active + 1) % slides.length)

  return (
    <div className="hero-slider" style={styles.wrapper}>
      {slides.map((s, i) => (
        <div
          key={i}
          style={{
            ...styles.slide,
            backgroundImage: `url(${s.img})`,
            opacity: i === active ? 1 : 0,
            zIndex: i === active ? 2 : 1
          }}
        >
          <div style={styles.overlay}></div>
          <div style={styles.content}>
            <h5 style={styles.subtitle}>{s.subtitle}</h5>
            <h1 style={styles.title}>{s.title}</h1>
            <a href={s.link} style={styles.cta}>{s.cta}</a>
          </div>
        </div>
      ))}

      <button aria-label="Previous slide" onClick={prev} style={{ ...styles.arrow, left: 16 }}>
        <i className="ri-arrow-left-s-line"></i>
      </button>
      <button aria-label="Next slide" onClick={next} style={{ ...styles.arrow, right: 16 }}>
        <i className="ri-arrow-right-s-line"></i>
      </button>

      <div style={styles.dots}>
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => goTo(i)}
            style={{
              ...styles.dot,
              backgroundColor: i === active ? "#fff" : "rgba(255,255,255,0.5)",
              transform: i === active ? "scale(1.3)" : "scale(1)"
            }}
          ></span>
        ))}
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
    height: "480px",
    overflow: "hidden",
    borderRadius: "6px"
  },
  slide: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    transition: "opacity 0.9s ease-in-out"
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)"
  },
  content: {
    position: "relative",
    zIndex: 2,
    color: "#fff",
    padding: "0 60px",
    maxWidth: "520px"
  },
  subtitle: {
    color: "#fff",
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontSize: "14px",
    marginBottom: "10px"
  },
  title: {
    fontSize: "42px",
    fontWeight: 700,
    marginBottom: "20px",
    lineHeight: 1.2
  },
  cta: {
    display: "inline-block",
    padding: "12px 28px",
    background: "#fff",
    color: "#222",
    borderRadius: "4px",
    fontWeight: 600,
    textDecoration: "none"
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 3,
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,0.85)",
    fontSize: "20px",
    cursor: "pointer"
  },
  dots: {
    position: "absolute",
    bottom: "18px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 3,
    display: "flex",
    gap: "8px"
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.2s ease"
  }
}

export default HeroSlider
