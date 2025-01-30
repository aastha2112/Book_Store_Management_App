import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BooksDetails() {
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  let { id } = useParams();
  useEffect(() => {
    axios({
      url: `https://buttery-chiseled-child.glitch.me/books/${id}`,
      method: "GET",
    }).then((res) => {
      console.log(res.data);
      setBook(res.data);
    });
  }, []);
  return (
    <div>
      {
        <div className="bookDetails">
          <img src={book.coverImage} alt={book.name} className="bookImage" />
          <div className="bookDetailsDiv">
            <h1>{book.name}</h1>
            <h2>By {book.author}</h2>
            <h3>Genre : {book.category}</h3>
            <p>{book.description}</p>
            <h5>Published in {book.publishingYear}</h5>
            <h4>Only for ${book.price}</h4>
          </div>
        </div>
      }
      <button onClick={() => navigate("/books")}>Back to books</button>
    </div>
  );
}
