import mongoose from 'mongoose';

const roles = ['admin', 'writer', 'guest'];

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'First name is required.'],
		minLength: [4, 'Min 4 chars required!'],
		maxLength: [50, 'Max 50 chars required!'],
		trim: true, 
	},

	lastName: {
		type: String,
		required: [true, 'Last name is required.'],
		minLength: [3, 'Min 4 chars required!'],
		maxLength: [60, 'Max 50 chars required!'],
		trim: true, 
	},
  fullName: String,
  email: {
		type: String,
		required: [true, 'Email is required.'],
		lowercase: true,
		unique: true,
		validate: {
      validator: function (value) {
        return /^\S+@\S+\.\S+$/.test(value);
      },
      message: 'Invalid email address.',
    },
	},
	role: {
		type: String,
		required: true,
		enum: {
      values: roles,
      message: '{VALUE} is not supported'
    }
	},
  age: {
    type: Number,
    min: [1, 'Age must be at least 1.'],
    max: [99, 'Age cannot be greater than 99.'],
  },
  numberOfArticles: {
    type: Number,
    default: 0,
  }},
	{
			timestamps: true,
	},
);

userSchema.pre('validate', function (next) {
	if (this.age < 0){
		this.age = 1;
	}
  next();
});

userSchema.pre('save', function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
