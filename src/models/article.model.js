import mongoose from 'mongoose';

const categories = ['sport', 'games', 'history'];

const articleSchema = new mongoose.Schema({
		title: {
			type: String,
			minLength: [5, 'Min 5 chars required!'],
			maxLength: [400, 'Max 400 chars required!'],
			required: [true, 'Title is required.'],
			trim: true,
		},
		subtitle: {
			type: String,
			minLength: [5, 'Min 5 chars required!'],
		},
		description: {
			type: String,
			minLength: [5, 'Min 5 chars required!'],
			maxLength: [5000, 'Max 5000 chars required!'],
			required: [true, 'Description is required.'],
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Owner is required.'],
		},
		category: {
			type: String,
			enum: categories,
			required: [true, 'Category is required.'],
		},
	},
	{
		timestamps: true,
	}
);

const Article = mongoose.model('Article', articleSchema);

export default Article;
