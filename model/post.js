import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },
});

// Middleware function to modify categories before saving
postSchema.pre('save', function (next) {
  if (this.isModified('categories')) {
    this.categories = this.categories.replace(/%20/g, ' ');
  }
  next();
});


const post = mongoose.model('post', postSchema);
export default post;
