import {
  addCompletion,
  removeCompletion,
  getCompletions,
} from "../models/completionModel.js";
export async function toggleCompletion(req, res) {

  console.log("COMPLETION BODY:", req.body);

  try {

    const { taskId, date, completed } = req.body;


    if (completed) {

      await addCompletion(taskId, date);

    } else {

      await removeCompletion(taskId, date);

    }


    res.json({
      message: "Completion updated"
    });


  } catch(error){

    res.status(500).json({
      error: error.message
    });

  }

}
export async function fetchCompletions(req, res) {

  try {

    const {
      taskId,
      year,
      month
    } = req.params;


    const data = await getCompletions(
      taskId,
      year,
      month
    );


    res.json(data);


  } catch(error) {

    res.status(500).json({
      error: error.message,
    });

  }
}