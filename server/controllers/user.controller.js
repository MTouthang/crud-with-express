import User from "../model/user.model.js";

/**
 *
 * @param {*} req
 * @param {*} res
 * @description home route to test if the api is working
 * @returns {String} Pong
 */
export const home = (req, res) => {
  res.send("Pong");
};

/**
 * @createProfile
 * @param {String} req user name and email
 * @param {Object} res object of user details
 * @description creating user profile with POST HTTP request
 * @returns {Object} user details
 */
export const createProfile = async (req, res) => {
  try {
    // getting user detail from the body
    const { name, email } = req.body;

    // make sure the name and email are present
    if (!name || !email) {
      throw new Error("User name and email should be provided");
    }

    // check if the user is already present
    const userExist = await User.findOne({ email });

    if (userExist) {
      throw new Error("User already exist!");
    }

    // create and save user
    const user = await User.create({
      name,
      email,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @fetchProfiles - get request
 * @param {String} req  user email
 * @param {Object} res all the profiles of the user
 * @description get all the available user profile
 * @returns {Object} object of user details
 */
export const fetchProfiles = async (req, res) => {
  try {
    const user = await User.find();

    if (user) {
      return res.status(200).json({
        success: true,
        message: "profile fetch successfully",
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "profile not able to be fetch",
    });
  }
};

/**
 * @getProfileById
 * @param {String} req unique id of a user
 * @param {Object} res details of a particular user
 * @description - get profile of a user using the user Id
 * @returns {Object} - particular user details
 */
export const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Provide the valid User Id");
    }

    const user = await User.findById(id);

    if (user) {
      return res.status(200).json({
        success: true,
        message: "profile fetch successful",
        user,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Profile is not available",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @deleteProfile
 * @param {String} req profile id
 * @param {String} res success message or failure message
 * @description delete profile with the given id
 * @returns {Object} success true/false and message
 */
export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Profile id is require!");
    }

    const user = await User.findByIdAndDelete(id);

    if (user) {
      return res.status(200).json({
        success: true,
        message: "profile deleted successfully",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Profile with given ID does not exist",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @updateProfile
 * @param {String} req objectId or profile id
 * @param {String} res success message
 * @description update profile of a particular id using profile id
 * @returns {Object} success true/false and message
 */
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Profile id is required!");
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (user) {
      res.status(200).json({
        success: true,
        message: "profile updated successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: true,
      message: "profile not updated",
    });
  }
};

export const missingEndPoints = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `404 - ${req.method} ${req.originalUrl} not found`,
  });
};
