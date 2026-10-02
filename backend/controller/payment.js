const stripe = require("../config/stripe")

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"

// Creates a Stripe Checkout session for the items currently in the user's cart
const paymentmethod = async (req, res) => {
    try {
        const { arr, Email } = req.body

        if (!Array.isArray(arr) || arr.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty" })
        }

        const line_items = arr.map((item) => ({
            price_data: {
                currency: "inr",
             product_data: {
  name: item.ProductName,
},
                unit_amount: Math.round(Number(item.ProductPrize) * 100),
            },
            quantity: Number(item.ProductQuantity) || 1,
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            customer_email: Email || undefined,
            success_url: `${FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${FRONTEND_URL}/payment-cancel`,
        })

        res.json({
            success: true,
            url: session.url,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Unable to start payment" })
    }
}

// Confirms whether a Stripe Checkout session actually completed payment
const paymentverify = async (req, res) => {
    try {
        const { session_id } = req.params
        const session = await stripe.checkout.sessions.retrieve(session_id)

        if (session.payment_status === "paid") {
            res.json({ success: true, status: session.payment_status })
        } else {
            res.json({ success: false, status: session.payment_status })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Unable to verify payment" })
    }
}

module.exports = { paymentmethod, paymentverify }


