import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import axios from 'axios';
import "./view.css";

const View = () => {
  const [book, setBook] = useState(null); 
  const { id } = useParams(); 

  useEffect(() => {
    const getSingleBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/${id}`); 
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
    getSingleBook();
  }, [id]); 

  return (
    <div className='viewcontainer'>
      {book ? (
        <div>
          <label> BOOK ID </label>
          <input type="text" value={book._id} readOnly />
          <label> BOOK NAME </label>
          <input type="text" value={book.bookname} readOnly />
          <label> BOOK AUTHOR </label>
          <input type="text" value={book.author} readOnly />
          <label> BOOK PUBLISHED DATE </label>
          <input type="text" value={book.publisheddate.split('T')[0]} readOnly />
        
          <button className='btnhome'><Link to="/">Go to HomePage</Link></button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default View;
