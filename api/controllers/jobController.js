import db from "../config/db.js";

// CREATE
async function createJob(req, res) {
  const {
    userId,
    category,
    requirement1,
    requirement2,
    requirement3,
    description,
    price,
    date,
  } = req.body;
  let imageFileName = `${req.file.filename}`;

  try {
    // Insert into jobs the creator id category, requirements (1,2,3), desc , image, price and date
    await db.query(
      `INSERT INTO jobs ( user_id, category, requirement1, requirement2, requirement3, description, image_url, price, date)
        VALUES (
            $1, 
            $2, 
            $3, 
            $4,  
            $5,
            $6,
            $7,
            $8,
            $9
        );`,
      [
        userId,
        category,
        requirement1,
        requirement2,
        requirement3,
        description,
        imageFileName,
        price,
        date,
      ]
    );

    res.json({ success: true, message: "Job added succesfully" });
  } catch (error) {
    console.log(error);
  }
}

// READ
async function getAllJobs(req, res) {
  try {
    // Get the job
    const response = await db.query(
      "SELECT id, user_id, category, requirement1, requirement2, requirement3, description, image_url, price, date FROM jobs"
    );

    res.json({ success: true, data: response.rows });
  } catch (error) {
    console.log(error);
  }
}

async function getUserJobs(req, res) {
  const { userId } = req.body;

  try {
    // Get all of the users jobs
    const response = await db.query("SELECT * FROM jobs WHERE user_id = $1", [
      userId,
    ]);

    res.json({ success: true, data: response.rows });
  } catch (error) {
    console.log(error);
  }
}

async function getJob(req, res) {
  const { id } = req.body;

  try {
    // Get the job
    const response = await db.query("SELECT * FROM jobs WHERE id = $1", [id]);

    res.json({ success: true, job: response.rows[0] });
  } catch (error) {
    console.log(error);
  }
}

// UPDATE
async function updateJob(req, res) {
  const {
    id,
    category,
    requirement1,
    requirement2,
    requirement3,
    description,
    image,
    price,
    date,
  } = req.body;
  console.log(req.body);

  try {
    // Update category, requirement1, requirement2, requirement3, description, image, price and date of the job
    await db.query(
      `UPDATE jobs
        SET category = $2,
        requirement1 = $3,
        requirement2 = $4,
        requirement3 = $5,
        description = $6,
        image_url = $7,
        price = $8,
        date = $9, 
        WHERE id = $1;`,
      [
        id,
        category,
        requirement1,
        requirement2,
        requirement3,
        description,
        image,
        price,
        date,
      ]
    );

    res.json({ success: true, message: "Job updated succesfully" });
  } catch (error) {
    console.log(error);
  }
}

// DELETE
async function deleteJob(req, res) {
  const { id } = req.body;

  try {
    // Insert into jobs the name, image, price, time and creator id
    await db.query(`DELETE FROM jobs WHERE id = $1`, [id]);

    res.json({ success: true, message: "Job deleted succesfully" });
  } catch (error) {
    console.log(error);
  }
}

export { getAllJobs, getUserJobs, createJob, getJob, updateJob, deleteJob };
