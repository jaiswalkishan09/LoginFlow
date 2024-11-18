// require knex for database connection
var knex = require("knex");

const dbConnection = require("../common/connection");

const { getUserDetailsBasedOnUEmail } = require("../common/commonFunction");

const getUserDetails = async (req, res) => {
  try {
    let connectDb = await dbConnection.getDataBaseConnection();
    const databaseConnection = knex(connectDb.connection);
    try {
      let email = req.email;
      let userData = await getUserDetailsBasedOnUEmail(
        databaseConnection,
        email
      );

      if (userData.length > 0) {
        userData = userData[0];
      }
      databaseConnection ? databaseConnection.destroy() : null;
      return res.status(200).json({
        name: userData.Name,
        email: userData.Email,
        country: userData.Country,
        phoneNumber: userData.Phone_Number,
      });
    } catch (e) {
      databaseConnection ? databaseConnection.destroy() : null;
      console.log("Error in getUserDetails main catch block", e);
      return res
        .status(500)
        .json({ message: ["Something went wrong please try again."] });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ message: ["Something went wrong please try again."] });
  }
};

module.exports = {
  getUserDetails,
};
