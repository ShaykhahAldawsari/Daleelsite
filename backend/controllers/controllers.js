const Staff = require("../Models/Staff");
const User = require("../Models/User");
const mongoose = require("mongoose");

//Function to fetch all the records
const getRecords = async (req, res) => {
  try {
    const records = await Staff.find();

    res.status(200).json(records);
  } catch (error) {
    console.error("Failed to get records:", error);
    res.status(400).json({
      message: "There was an error fetching the document",
    });
  }
};

//Function to fetch a single record
const getSingleRecord = async (req, res) => {
  const { parameter } = req.query;
  try {
    const recordStaffname = await Staff.findOne({ staffname: parameter });

    if (recordStaffname) {
      return res.status(200).json(recordStaffname);
    }

    const recordRoomNumber = await Staff.findOne({ roomnumber: parameter });

    if (recordRoomNumber) {
      return res.status(200).json(recordRoomNumber);
    }

    const recordMaintainenceNumber = await Staff.findOne({
      maintainencenumber: parameter,
    });

    if (recordMaintainenceNumber) {
      return res.status(200).json(recordMaintainenceNumber);
    }

    const recordStaffsection = await Staff.findOne({ staffsection: parameter });

    if (recordStaffsection) {
      return res.status(200).json(recordStaffsection);
    }

    if (!recordStaffsection) {
      return res.status(400).json({ message: "Record not found" });
    }
  } catch (error) {
    res.status(400).json({
      message: "There was an error fetching the document, please try again",
    });
  }
};

//Function to delete a single record
const deleteRecord = async (req, res) => {
  try {
    const { parameter } = req.query;

    const isValid = mongoose.isValidObjectId(parameter);

    if (!isValid) {
      return res.json(400).json({
        message: "can not find id",
      });
    }

    await Staff.findByIdAndDelete(parameter);
    res.status(200).json({
      message: "Record deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete record:", error);
    res.status(400).json({
      message: "There was an error deleting the record",
    });
  }
};

// Function to edit a single record
const editRecord = async (req, res) => {
  try {
    const { parameter } = req.query;

    const isValid = mongoose.isValidObjectId(parameter);

    if (!isValid) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }

    const newData = req.body;

    console.log(newData);

    const updatedRecord = await Staff.findByIdAndUpdate(parameter, newData, {
      new: true,
    });

    if (!updatedRecord) {
      return res.status(404).json({
        message: "Record not found",
      });
    }

    res.status(200).json({
      message: "Record updated successfully",
      record: updatedRecord,
    });
  } catch (error) {
    console.error("Failed to edit record:", error);
    res.status(400).json({
      message: "There was an error editing the record",
    });
  }
};

// Function to add a new record
const addRecord = async (req, res) => {
  try {
    const newData = req.body; // Assuming the new data is provided in the request body

    const createdRecord = await Staff.create(newData);
    console.log(newData);

    res.status(201).json({
      message: "Record added successfully",
      record: createdRecord,
    });
  } catch (error) {
    console.error("Failed to add record:", error);
    res.status(400).json({
      message: "There was an error adding the record",
    });
  }
};

//Function for updating the password
const resetPassword = async (req, res) => {
  try {
    const body = req.body;

    const newPassword = body.password;

    const updatedUser = await User.findOneAndUpdate(
      { username: "daleel_team" }, // Filter for the user to update
      { password: newPassword }, // Update the email field
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "Record not found",
      });
    }

    res.status(200).json({
      message: "Password updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Failed to update password:", error);
    res.status(400).json({
      message: "There was an error editing the record",
    });
  }
};

//Function for updating the password
const login = async (req, res) => {
  try {
    const body = req.body;

    const password = body.password;

    const user = await User.findOne(
      { username: "daleel_team" }, // Filter for the user to update
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    console.log(user);

    if (user.password === password) {
      return res.status(200).json({
        message: "Successfully logged in",
        user: user,
      });
    } else {
      console.log('failed')

      return res.status(400).json({
        message: "Incorrect Password, please try again",
      });
    }
  } catch (error) {
    console.error("Failed to update password:", error);
    res.status(400).json({
      message: "There was an error editing the record",
    });
  }
}


//Function for verifying the updated password
const verifyPassword = async()=>{
  try {
    const body = req.body;

    const password = body.password;

    const user = await User.findOne(
      { username: "daleel_team" }, // Filter for the user to update
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    console.log(user);

    if (user.password === password) {
      return res.status(200).json({
        isVerified: true,
        user: user,
      });
    } else {
      console.log('failed')
      return res.status(400).json({
        isVerified: false,
        message: "Incorrect Password, please try again",
      });
    }
  } catch (error) {
    console.error("Failed to verify password:", error);
    res.status(400).json({
      message: "There was an error while verifying the password",
    });
  }

}

module.exports = {
  getSingleRecord,
  getRecords,
  deleteRecord,
  editRecord,
  addRecord,
  resetPassword,
  login,
  verifyPassword
};
