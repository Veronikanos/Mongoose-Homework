import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
  try {
		const newUser = new User({
			firstName: "Anna",
			lastName: "annaB",
		});

		await newUser.save();
		console.log(newUser);
		return res.status(200).json(newUser);

  } catch (err) {
    next(err);
  }
}

export const getUserByIdWithArticles = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}

export const createUser = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}

export const updateUserById = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}

export const deleteUserById = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}

