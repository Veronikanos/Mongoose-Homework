import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	// fullName: String,
	// email: String,
	// role: String,
	// numberOfArticles: Number,
	// createdAt:  Date,
	// updatedAt: Date,
});

const User = mongoose.model('User', userSchema);

export default User;
