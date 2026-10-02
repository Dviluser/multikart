const checkmodel = require("../model/check")

const orderstatus = async (req, res) => {
  try {
    const id = req.params.id
    const { Status, Courier, TrackingNumber, CurrentLocation, EstimatedDelivery, Note } = req.body
    const allowed = ["Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"]
    if (!allowed.includes(Status)) {
      return res.send({ statuscode: 0, mssg: "invalid status" })
    }

    const update = { Status }
    if (Courier) update.Courier = Courier
    if (TrackingNumber) update.TrackingNumber = TrackingNumber
    if (CurrentLocation) update.CurrentLocation = CurrentLocation
    if (EstimatedDelivery) update.EstimatedDelivery = new Date(EstimatedDelivery)

    const result = await checkmodel.findByIdAndUpdate(
      id,
      {
        $set: update,
        $push: {
          TimelineHistory: {
            Status,
            Location: CurrentLocation,
            Note
          }
        }
      },
      { new: true }
    )

    if (result) {
      res.send({ statuscode: 1, mssg: "status updated", data: result })
    } else {
      res.send({ statuscode: 0, mssg: "order not found" })
    }
  } catch (err) {
    console.log(err)
    res.send({ statuscode: 0, mssg: "server error" })
  }
}

module.exports = { orderstatus }
