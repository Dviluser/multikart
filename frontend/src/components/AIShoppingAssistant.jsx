import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../config'

function ProductChip({ p, selected, onToggle }) {
  return (
    <div
      onClick={() => onToggle(p)}
      style={{
        ...styles.card,
        border: selected ? "2px solid #4f46e5" : "1px solid #e5e5e5"
      }}
    >
      <img
        src={`${API_BASE_URL}/uploads/${p.File}`}
        alt={p.ProductName}
        style={styles.cardImg}
        onError={(e) => { e.target.style.visibility = "hidden" }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={styles.cardTitle}>{p.ProductName}</div>
        <div style={styles.cardPrice}>₹{p.ProductPrize}</div>
        {p.ProductDescription && (
          <div style={styles.cardDesc}>{p.ProductDescription.slice(0, 70)}{p.ProductDescription.length > 70 ? "…" : ""}</div>
        )}
      </div>
      <input type="checkbox" checked={selected} readOnly style={{ marginLeft: 6 }} />
    </div>
  )
}

function AIShoppingAssistant() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm your AI shopping assistant. Ask me things like \u201CI need a laptop for coding under \u20B960,000\u201D and I'll search the live product catalog for you."
    }
  ])
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, open])

  const toggleSelect = (p) => {
    setSelected((prev) => {
      const exists = prev.find((x) => x._id === p._id)
      if (exists) return prev.filter((x) => x._id !== p._id)
      if (prev.length >= 2) return [prev[1], p]
      return [...prev, p]
    })
  }

  const send = async (e) => {
    e.preventDefault()
    const text = query.trim()
    if (!text || loading) return
    setMessages((m) => [...m, { role: "user", text }])
    setQuery("")
    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE_URL}/api/ai-recommend`, { query: text })
      const result = response.data
      if (result.statuscode == 1) {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            text: result.data.length
              ? (result.note || `Here's what I found that fits:`)
              : "I couldn't find anything matching that in the catalog yet.",
            products: result.data
          }
        ])
      } else {
        setMessages((m) => [...m, { role: "assistant", text: result.mssg || "Something went wrong, try again." }])
      }
    } catch (err) {
      console.log(err)
      setMessages((m) => [...m, { role: "assistant", text: "I couldn't reach the server. Is the backend running?" }])
    } finally {
      setLoading(false)
    }
  }

  const compare = async () => {
    if (selected.length !== 2) return
    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE_URL}/api/ai-compare`, { ids: selected.map((s) => s._id) })
      const result = response.data
      if (result.statuscode == 1) {
        setMessages((m) => [
          ...m,
          { role: "user", text: `Compare: ${selected.map((s) => s.ProductName).join(" vs ")}` },
          { role: "assistant", text: result.verdict, compareProducts: result.data }
        ])
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
      setSelected([])
    }
  }

  return (
    <div style={styles.wrapper}>
      {open && (
        <div style={styles.panel}>
          <div style={styles.header}>
            <div>
              <div style={{ fontWeight: 700 }}>AI Shopping Assistant</div>
              <div style={{ fontSize: 11, opacity: 0.85 }}>Powered by your product catalog</div>
            </div>
            <button onClick={() => setOpen(false)} style={styles.closeBtn}>✕</button>
          </div>

          <div style={styles.body}>
            {messages.map((m, i) => (
              <div key={i} style={{ ...styles.bubbleRow, justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ ...styles.bubble, ...(m.role === "user" ? styles.bubbleUser : styles.bubbleAssistant) }}>
                  <div>{m.text}</div>
                  {m.products && m.products.length > 0 && (
                    <div style={{ marginTop: 8 }}>
                      {m.products.map((p) => (
                        <ProductChip
                          key={p._id}
                          p={p}
                          selected={!!selected.find((x) => x._id === p._id)}
                          onToggle={toggleSelect}
                        />
                      ))}
                      <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>
                        Tick two products above to compare them.
                      </div>
                    </div>
                  )}
                  {m.compareProducts && (
                    <div style={{ marginTop: 8, overflowX: "auto" }}>
                      <table style={styles.compareTable}>
                        <thead>
                          <tr>
                            <th></th>
                            {m.compareProducts.map((p) => <th key={p._id} style={styles.th}>{p.ProductName}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td style={styles.td}>Price</td>{m.compareProducts.map((p) => <td key={p._id} style={styles.td}>₹{p.ProductPrize}</td>)}</tr>
                          <tr><td style={styles.td}>Stock</td>{m.compareProducts.map((p) => <td key={p._id} style={styles.td}>{p.ProductQuantity}</td>)}</tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && <div style={{ fontSize: 12, color: "#888" }}>Thinking…</div>}
            <div ref={bottomRef}></div>
          </div>

          {selected.length === 2 && (
            <button onClick={compare} style={styles.compareBtn} disabled={loading}>
              Compare "{selected[0].ProductName}" vs "{selected[1].ProductName}"
            </button>
          )}

          <form onSubmit={send} style={styles.inputRow}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. I need a laptop for coding under ₹60,000"
              style={styles.input}
            />
            <button type="submit" style={styles.sendBtn} disabled={loading}>Send</button>
          </form>
        </div>
      )}

      <button onClick={() => setOpen((o) => !o)} style={styles.fab} title="AI Shopping Assistant">
        {open ? "✕" : "🤖"}
      </button>
    </div>
  )
}

const styles = {
  wrapper: { position: "fixed", bottom: 24, right: 24, zIndex: 9999, fontFamily: "inherit" },
  fab: {
    width: 58, height: 58, borderRadius: "50%", border: "none",
    background: "#4f46e5", color: "#fff", fontSize: 24, cursor: "pointer",
    boxShadow: "0 6px 18px rgba(79,70,229,0.45)"
  },
  panel: {
    width: 360, maxWidth: "90vw", height: 480, background: "#fff",
    borderRadius: 12, boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
    display: "flex", flexDirection: "column", marginBottom: 12, overflow: "hidden"
  },
  header: {
    background: "#4f46e5", color: "#fff", padding: "12px 16px",
    display: "flex", justifyContent: "space-between", alignItems: "center"
  },
  closeBtn: { background: "transparent", border: "none", color: "#fff", fontSize: 16, cursor: "pointer" },
  body: { flex: 1, overflowY: "auto", padding: "12px", background: "#f7f7fb" },
  bubbleRow: { display: "flex", marginBottom: 10 },
  bubble: { maxWidth: "88%", padding: "10px 12px", borderRadius: 10, fontSize: 13.5, lineHeight: 1.4 },
  bubbleAssistant: { background: "#fff", border: "1px solid #eee", color: "#222" },
  bubbleUser: { background: "#4f46e5", color: "#fff" },
  card: {
    display: "flex", alignItems: "center", gap: 8, padding: "8px",
    borderRadius: 8, marginTop: 6, cursor: "pointer", background: "#fff"
  },
  cardImg: { width: 42, height: 42, objectFit: "cover", borderRadius: 6, flexShrink: 0 },
  cardTitle: { fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  cardPrice: { fontSize: 12, color: "#4f46e5", fontWeight: 700 },
  cardDesc: { fontSize: 11, color: "#888" },
  compareBtn: {
    margin: "0 12px 10px", padding: "8px", borderRadius: 6, border: "none",
    background: "#111827", color: "#fff", fontSize: 12.5, cursor: "pointer"
  },
  inputRow: { display: "flex", borderTop: "1px solid #eee" },
  input: { flex: 1, border: "none", padding: "12px", fontSize: 13, outline: "none" },
  sendBtn: { border: "none", background: "#4f46e5", color: "#fff", padding: "0 18px", cursor: "pointer" },
  compareTable: { width: "100%", borderCollapse: "collapse", fontSize: 12 },
  th: { textAlign: "left", padding: "4px 6px", borderBottom: "1px solid #ddd" },
  td: { padding: "4px 6px", borderBottom: "1px solid #f0f0f0" }
}

export default AIShoppingAssistant
