const updateReportQuestion = ('./../models/updateReportQuestion.js')

module.exports = async function reportQuestion(req, res)  {
  try {
    let response = await updateReportQuestion(req.params.answer_id)
    res.sendStatus(204).send(response)
  } catch (err) {
    res.status(500).send(err)
  }
}