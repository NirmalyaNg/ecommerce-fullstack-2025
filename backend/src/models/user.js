import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name should have atleast 2 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name should have atleast 2 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Invalid Email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      minlength: [6, 'Password should have atleast 6 characters'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['Male', 'Female', 'Other'],
    },
    dob: {
      type: Date,
      required: [true, 'Date of Birth is required'],
      validate: {
        validator: function (value) {
          return value instanceof Date && !isNaN(value);
        },
        message: 'Invalid date format',
      },
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, 'any');
        },
        message: 'Invalid phone number',
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
