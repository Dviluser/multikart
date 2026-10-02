const promodel = require("../model/Product")

// very small English stopword list so keyword matching stays meaningful
const STOPWORDS = new Set([
  "i", "need", "a", "an", "the", "for", "of", "in", "on", "at", "to", "is",
  "are", "which", "better", "or", "under", "below", "less", "than", "within",
  "budget", "please", "recommend", "suggest", "me", "my", "want", "looking",
  "and", "with", "good", "best", "cheap", "cheapest", "show", "find", "get",
  "some", "any", "product", "products", "rs", "rupees", "inr"
])

// pulls a rupee budget figure out of free text like:
// "under ₹60,000" | "below Rs 15000" | "budget of 20k" | "within 5000"
function extractBudget(text) {
  const cleaned = text.replace(/,/g, "")
  const kMatch = cleaned.match(/(\d+(?:\.\d+)?)\s*k\b/i)
  if (kMatch) return Math.round(parseFloat(kMatch[1]) * 1000)
  const numMatch = cleaned.match(
    /(?:under|below|less than|within|budget(?: of)?|upto|up to|₹|rs\.?|inr)\s*[:₹]?\s*(\d{3,7})/i
  )
  if (numMatch) return parseInt(numMatch[1], 10)
  // fallback: any standalone big number in the sentence
  const anyNum = cleaned.match(/\b(\d{3,7})\b/)
  if (anyNum) return parseInt(anyNum[1], 10)
  return null
}

function extractKeywords(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !STOPWORDS.has(w) && !/^\d+$/.test(w))
}

function scoreProduct(product, keywords) {
  const haystack = `${product.ProductName || ""} ${product.ProductDescription || ""}`.toLowerCase()
  let score = 0
  keywords.forEach((kw) => {
    if (haystack.includes(kw)) score += 1
  })
  return score
}

// POST /api/ai-recommend  { query }
const recommend = async (req, res) => {
  try {
    const query = (req.body.query || "").trim()
    if (!query) {
      return res.send({ statuscode: 0, mssg: "please type a question" })
    }

    const all = await promodel.find()
    const budget = extractBudget(query)
    const keywords = extractKeywords(query)

    let scored = all.map((p) => ({
      product: p,
      score: scoreProduct(p, keywords),
      price: Number(p.ProductPrize) || 0
    }))

    let withinBudget = scored.filter((s) => budget == null || s.price <= budget)

    // prefer keyword matches; if none matched, keep everyone within budget
    let candidates = withinBudget.filter((s) => s.score > 0)
    let usedFallback = false
    if (candidates.length === 0) {
      candidates = withinBudget
      usedFallback = true
    }

    // if nothing at all fits the budget, suggest the closest cheaper alternatives instead
    let note = null
    if (candidates.length === 0 && budget != null) {
      const closest = scored
        .sort((a, b) => a.price - b.price)
        .slice(0, 5)
      note = `Nothing matched within ₹${budget.toLocaleString("en-IN")}, showing the closest options instead.`
      candidates = closest
    }

    candidates.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return b.price - a.price // best value = priciest that still fits budget
    })

    const top = candidates.slice(0, 5).map((c) => ({
      _id: c.product._id,
      ProductName: c.product.ProductName,
      ProductPrize: c.product.ProductPrize,
      ProductQuantity: c.product.ProductQuantity,
      ProductDescription: c.product.ProductDescription,
      File: c.product.File
    }))

    res.send({
      statuscode: 1,
      data: top,
      meta: { budget, keywords, usedFallback },
      note
    })
  } catch (err) {
    console.log(err)
    res.send({ statuscode: 0, mssg: "server error" })
  }
}

// POST /api/ai-compare  { ids: [id1, id2, ...] }  -- explicit compare of chosen products
const compare = async (req, res) => {
  try {
    const ids = req.body.ids || []
    const products = await promodel.find({ _id: { $in: ids } })
    if (!products.length) {
      return res.send({ statuscode: 0, mssg: "no products found to compare" })
    }
    const withScore = products.map((p) => {
      const price = Number(p.ProductPrize) || 0
      const stock = Number(p.ProductQuantity) || 0
      return { product: p, price, stock, valueScore: stock - price / 1000 }
    })
    const best = withScore.reduce((a, b) => (b.valueScore > a.valueScore ? b : a))
    res.send({
      statuscode: 1,
      data: products,
      verdict: `${best.product.ProductName} looks like the better pick here based on price and current stock.`
    })
  } catch (err) {
    console.log(err)
    res.send({ statuscode: 0, mssg: "server error" })
  }
}

module.exports = { recommend, compare }
