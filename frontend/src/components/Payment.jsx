import React, { useState } from "react";

const cardNameRegex = /^[A-Za-z\s]{2,}$/
const cardNumberRegex = /^\d{13,19}$/

function Payment() {
  const [showPopup, setShowPopup] = useState(false);

  const [cardData, setCardData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
  });

  const [errors, setErrors] = useState({});

  const handlePaymentChange = (e) => {
    if (e.target.value === "credit") {
      setShowPopup(true);
    }
  };

  const handleChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const errs = {};
    const name = cardData.name.trim();
    const cardNumber = cardData.cardNumber.trim();
    if (!name) {
      errs.name = "Card holder name is required";
    } else if (!cardNameRegex.test(name)) {
      errs.name = "Only letters are allowed, numbers are not allowed";
    }
    if (!cardNumber) {
      errs.cardNumber = "Card number is required";
    } else if (!cardNumberRegex.test(cardNumber)) {
      errs.cardNumber = "Card number must be 13-19 digits, letters are not allowed";
    }
    if (!cardData.expiry) {
      errs.expiry = "Expiry date is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert("Card Submitted");

    setCardData({
      name: "",
      cardNumber: "",
      expiry: "",
    });
    setErrors({});

    setShowPopup(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Payment Options</h2>

      <select onChange={handlePaymentChange}>
        <option value="">Select Payment</option>
        <option value="credit">Credit Card</option>
      </select>

      {/* Popup */}
      {showPopup && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h3>Credit Card Details</h3>

            <form onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                name="name"
                placeholder="Card Holder Name"
                value={cardData.name}
                onChange={handleChange}
              />
              {errors.name && <div style={styles.error}>{errors.name}</div>}
              <br /><br />

              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={cardData.cardNumber}
                onChange={handleChange}
              />
              {errors.cardNumber && <div style={styles.error}>{errors.cardNumber}</div>}
              <br /><br />

              <input
                type="month"
                name="expiry"
                value={cardData.expiry}
                onChange={handleChange}
              />
              {errors.expiry && <div style={styles.error}>{errors.expiry}</div>}
              <br /><br />

              <button type="submit">Submit</button>
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
  },
  error: {
    color: "#dc3545",
    fontSize: "13px",
    marginTop: "4px",
  },
};

export default Payment;