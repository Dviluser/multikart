const checkmodel = require("../model/check")

const allorders = async (req, res) => {
  try {
    const result = await checkmodel.find({}).sort({ createdAt: -1 })
    res.send({ statuscode: 1, data: result })
  } catch (err) {
    console.log(err)
    res.send({ statuscode: 0, mssg: "server error" })
  }
}

module.exports = { allorders }
