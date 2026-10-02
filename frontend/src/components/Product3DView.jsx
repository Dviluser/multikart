import React, { useRef } from 'react'

function Product3DView({ src, alt }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateY = ((x - centerX) / centerX) * 12
    const rotateX = -((y - centerY) / centerY) * 12
    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.03)`
    card.style.setProperty("--mx", `${(x / rect.width) * 100}%`)
    card.style.setProperty("--my", `${(y / rect.height) * 100}%`)
  }

  const resetTilt = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)"
  }

  return (
    <div className="product-3d-stage">
      <div
        className="product-3d-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
      >
        <span className="product-3d-badge">360° View · move your mouse</span>
        <img src={src} alt={alt} className="w-100 img-fluid blur-up lazyload" />
        <div className="product-3d-shine"></div>
      </div>
    </div>
  )
}

export default Product3DView
