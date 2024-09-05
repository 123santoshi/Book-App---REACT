import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  bookname: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publisheddate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const BookModel = mongoose.model('BookStoreModel', BookSchema);

export default BookModel;
