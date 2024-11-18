// require table alias
const { tables } = require("./tableAlias");

function validateInput(data) {
  const errors = [];

  // Check if required fields are missing
  if (!data.name) {
    errors.push("Name is required.");
  }

  if (!data.email) {
    errors.push("Email is required.");
  }

  if (!data.password) {
    errors.push("Password is required.");
  }

  if (!data.phoneNumber) {
    errors.push("Phone number is required.");
  }

  if (!data.country) {
    errors.push("Country is required.");
  }

  // Name validation (at least 2 characters, no numbers or special characters)
  const nameRegex = /^[a-zA-Z\s]{2,}$/;
  if (data.name && !nameRegex.test(data.name)) {
    errors.push(
      "Name must be at least 2 characters long and contain only letters."
    );
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push("Invalid email format.");
  }

  // Password strength validation (minimum 8 characters, including uppercase, lowercase, number, and special character)
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (data.password && !passwordRegex.test(data.password)) {
    errors.push(
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
    );
  }

  // Phone number validation (must be digits and 10-15 characters long)
  const phoneRegex = /^\d{10,15}$/;
  if (data.phoneNumber && !phoneRegex.test(data.phoneNumber)) {
    errors.push("Phone number must be 10 to 15 digits long.");
  }

  // Country validation (at least 2 characters, only letters and spaces)
  const countryRegex = /^[a-zA-Z\s]{2,}$/;
  if (data.country && !countryRegex.test(data.country)) {
    errors.push(
      "Country must be at least 2 characters long and contain only letters."
    );
  }

  return errors;
}

function validateSignInInput(data) {
  const errors = [];
  if (!data.email) {
    errors.push("Email is required.");
  }

  if (!data.password) {
    errors.push("Password is required.");
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push("Invalid email format.");
  }

  // Password strength validation (minimum 8 characters, including uppercase, lowercase, number, and special character)
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (data.password && !passwordRegex.test(data.password)) {
    errors.push(
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
    );
  }
  return errors;
}

async function getUserDetailsBasedOnUEmail(databaseConnection, email) {
  return databaseConnection(tables.userBasicDetails)
    .select("*")
    .where("Email", email)
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.log("Error in getUserDetailsBasedOnUEmail .catch block", e);
      throw e;
    });
}

async function insertIntoTable(databaseConnection, data, tableName) {
  try {
    return databaseConnection(tableName)
      .insert(data)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    console.log("Error in insertIntoTable main catch block.", e);
    throw e;
  }
}

async function updateTable(databaseConnection, data, tableName, email) {
  return databaseConnection(tableName)
    .update(data)
    .where("Email", email)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      throw e;
    });
}
module.exports = {
  validateInput,
  validateSignInInput,
  getUserDetailsBasedOnUEmail,
  insertIntoTable,
  updateTable,
};
