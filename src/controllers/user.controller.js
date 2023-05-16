import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
  try {
		let usersQuery = User.find({}, { _id: 1, fullName: 1, email: 1, age: 1 });
    
    if (req.query.order) {
			// console.log("ORDER");
      const sortParameter = req.query.sort || "age";
      const sortOrder = req.query.order === 'desc' ? -1 : 1;
      usersQuery = usersQuery.sort({ [sortParameter]: sortOrder });
    }
    
    const users = await usersQuery.lean();
    return res.status(200).json(users);
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
		const { firstName, lastName, email, role, age} = req.body;
		const newUser = new User({
			firstName,
      lastName,
      email,
      role,
      age
		});

		await newUser.save();
		// console.log(newUser);
		return res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
}

export const updateUserById = async (req, res, next) => {
  try {
		const { userId } = req.params;
    const { firstName, lastName, age } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, age, fullName: `${firstName} ${lastName}` },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export const deleteUserById = async (req, res, next) => {
  try {
		const { userId } = req.params;
		const user = await User.findByIdAndDelete(userId);
		// console.log(user);

		// if (!user) {
    //   return res.status(404).json({ message: 'User not found' });
    // }

		// await Article.deleteMany({ userId: user._id });
    // await user.remove();
    return res.status(200).json({ message: 'User deleted successfully' });

  } catch (err) {
    next(err);
  }
}

