const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// require knex for database connection
var knex = require("knex");

const {
  insertIntoTable,
  validateInput,
  getUserDetailsBasedOnUEmail,
  updateTable,
  validateSignInInput,
} = require("../common/commonFunction");

const { tables } = require("../common/tableAlias");
const dbConnection = require("../common/connection");
const { DateTime } = require("luxon");

const signUp = async (req, res) => {
  try {
    let SECRET_KEY = process.env.SECRET_KEY;
    const errors = validateInput(req.body);
    if (errors.length > 0) {
      // Return 400 Bad Request with validation errors
      return res.status(400).json({ message: errors });
    }

    const { name, email, phoneNumber, country, password } = req.body;
    let connectDb = await dbConnection.getDataBaseConnection();
    const databaseConnection = knex(connectDb.connection);
    try {
      let userData = await getUserDetailsBasedOnUEmail(
        databaseConnection,
        email
      );
      if (userData && userData.length > 0) {
        return res
          .status(409)
          .json({ message: ["User already exists with this email address."] });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      let data = {
        Name: name,
        Email: email,
        Phone_Number: phoneNumber,
        Country: country,
        Password: hashPassword,
        Status: "Active",
        Failed_Attempt: 0,
        Last_Login: DateTime.utc().toISO(),
        Created_On: DateTime.utc().toISO(),
      };
      await insertIntoTable(databaseConnection, data, tables.userBasicDetails);
      let token = jwt.sign({ email: email }, SECRET_KEY);
      databaseConnection ? databaseConnection.destroy() : null;
      return res.status(201).json({
        token: token,
        message: ["User registration successful."],
      });
    } catch (e) {
      databaseConnection ? databaseConnection.destroy() : null;
      console.log("Error in signUp main catch block", e);
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

const signIn = async (req, res) => {
  try {
    let SECRET_KEY = process.env.SECRET_KEY;
    const errors = validateSignInInput(req.body);
    if (errors.length > 0) {
      // Return 400 Bad Request with validation errors
      return res.status(400).json({ message: errors });
    }
    let connectDb = await dbConnection.getDataBaseConnection();
    const databaseConnection = knex(connectDb.connection);
    const { email, password } = req.body;
    try {
      let userDetails = await getUserDetailsBasedOnUEmail(
        databaseConnection,
        email
      );
      if (userDetails && userDetails.length > 0) {
        userDetails = userDetails[0];

        if (userDetails.Status === "Suspended") {
          return res.status(403).json({
            message: [
              "Your account has been suspended. Please contact support to reactivate your account.",
            ],
          });
        }
        const matchPassword = await bcrypt.compare(
          password,
          userDetails.Password
        );
        if (!matchPassword) {
          if (userDetails.Failed_Attempt >= 2) {
            await updateTable(
              databaseConnection,
              {
                Failed_Attempt: 3,
                Status: "Suspended",
                Last_Login: DateTime.utc().toISO(),
              },
              tables.userBasicDetails,
              email
            );
            databaseConnection ? databaseConnection.destroy() : null;
            return res.status(403).json({
              message: [
                "Your account has been suspended. Please contact support to reactivate your account.",
              ],
            });
          } else {
            await updateTable(
              databaseConnection,
              {
                Failed_Attempt: userDetails.Failed_Attempt + 1,
                Last_Login: DateTime.utc().toISO(),
              },
              tables.userBasicDetails,
              email
            );

            return res.status(401).json({
              message: [
                `Invalid credentials. Please try again. You have ${
                  3 - userDetails.Failed_Attempt - 1
                } attempts left.`,
              ],
            });
          }
        }

        await updateTable(
          databaseConnection,
          {
            Failed_Attempt: 0,
            Last_Login: DateTime.utc().toISO(),
          },
          tables.userBasicDetails,
          email
        );
        let token = jwt.sign({ email: email }, SECRET_KEY);
        databaseConnection ? databaseConnection.destroy() : null;
        return res.status(200).json({
          token: token,
        });
      } else {
        databaseConnection ? databaseConnection.destroy() : null;
        return res.status(404).json({
          message: [
            "No account associated with this email address. Please check the email or register a new account.",
          ],
        });
      }
    } catch (e) {
      databaseConnection ? databaseConnection.destroy() : null;
      console.log("Error in signin main catch block", e);
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

module.exports = { signUp, signIn };
