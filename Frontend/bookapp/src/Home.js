import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import "./Home.css";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className='container'>

      <div className='search'>
        <input type="text" value="search" />
        <input type="submit"></input>

      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Book Name</th>
            <th>Author name</th>
            <th>Published Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book._id}</td>
              <td>{book.bookname}</td>
              <td>{book.author}</td>
              <td>{book.publisheddate.split('T')[0]}</td>
              <td>
                {/* Use Link from react-router-dom */}
                <button className='homebtn'><Link to={`/addedit/${book._id}`}>Edit</Link></button>
                <button className='deletebtn' onClick={() => deleteBook(book._id)}><Link to ="/">Delete</Link></button>
                <button className='viewbtn'><Link to={`/view/${book._id}`}>View</Link></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
