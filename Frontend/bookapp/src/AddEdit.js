import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./addedit.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  id: "",
  bookname: "",
  author: "",
  publisheddate: "",
};

const AddEdit = () => {
  const navigate = useNavigate();
  const [addNewBook, setNewBook] = useState(initialValues);
  const { id: routeId } = useParams(); // Renamed id to routeId
  const { id, bookname, author, publisheddate } = addNewBook;

  const addBook = (data) => {
    axios
      .post("http://localhost:5000/books", data)
      .then((response) => {
        toast.success("Book added successfully", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding book:", error);
        toast.error("Error adding book", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  const updateBook = (data, id) => {
    axios
      .put(`http://localhost:5000/books/${id}`, data)
      .then((response) => {
        toast.success("Book updated successfully", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/");
      });
  };

  const getSingleBook = async (id) => {
    const response = await axios.get(`http://localhost:5000/books/${id}`);
    console.log("Response from API:", response);
    if (response.status === 200) {
      setNewBook({ ...response.data });
    }
  };

  const handleChange = (e) => {
    setNewBook({ ...addNewBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookname || !author || !publisheddate) {
      toast.error("Please enter all fields", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      if (id) {
        getSingleBook(routeId).then(() => updateBook(addNewBook, routeId));
      } else {
        addBook(addNewBook);
      }
    }
  };

  useEffect(() => {
    if (routeId) {
      getSingleBook(routeId);
    }
  }, [routeId]);

  return (
    <div className="container1">
      <form onSubmit={handleSubmit} className="col-md-6">
       
        <div className="form-group">
          <label htmlFor="bookname">Book Name</label>
          <input
            type="text"
            className="form-control"
            id="bookname"
            name="bookname"
            value={bookname}
            onChange={handleChange}
            placeholder="Enter Book Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author Name</label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            value={author}
            onChange={handleChange}
            placeholder="Enter Author Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="publisheddate">Published Date</label>
          <input
            type="text"
            className="form-control"
            id="publisheddate"
            name="publisheddate"
            value={publisheddate.split('T')[0]}
            onChange={handleChange}
            placeholder="Enter Published Date"
          />
        </div>
        <br />
        <input type="submit" value={id ? "Update Book" : "Add Book"} />
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AddEdit;
