import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [seeAddForm, setSeeAddForm] = useState(false);
  const [category, setCategory] = useState(null);
  const [sort, setSort] = useState("");
  const [newBook, setNewBook] = useState({
    name: "",
    category: "",
    price: "",
    author: "",
    publishingYear: "",
    coverImage: "",
    description: "",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //   if (token == null) {
  //     alert("Please Login!");
  //     navigate("/login");

  useEffect(() => {
    axios({
      url: `https://buttery-chiseled-child.glitch.me/books/`,
      method: "GET",
      params: {
        category,
        sort,
        page: 1,
      },
    }).then((res) => setBooks(res.data.books));
  }, [category]);

  function handleChange(e) {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(newBook);
    axios({
      url: `https://buttery-chiseled-child.glitch.me/books`,
      method: "POST",
      data: {
        name: newBook.name,
        category: newBook.category,
        price: newBook.price,
        author: newBook.author,
        publishingYear: newBook.publishingYear,
        coverImage: newBook.coverImage,
        description: newBook.description,
      },
    })
      .then((res) => setBooks([...books, res.data]))
      .catch((err) => alert("Unable to Add book at the moment!"))
      .finally(() => {
        (newBook.name = ""),
          (newBook.category = ""),
          (newBook.price = ""),
          (newBook.author = ""),
          (newBook.publishingYear = ""),
          (newBook.coverImage = ""),
          (newBook.description = "");
      });
  }

  function handleDelete(id) {
    axios({
      url: `https://buttery-chiseled-child.glitch.me/books/${id}`,
      method: "DELETE",
    })
      .then((res) => {
        let confirmation = confirm("Are you sure to delete the book?");
        if (confirmation) {
          setBooks(books.filter((el) => el.id !== id));
        } else {
          return;
        }
      })
      .catch((err) => alert("Unable to delete book!"));
  }

  function handleFilter(e) {
    console.log(e.target.value);
    setCategory(e.target.value);
  }
  function handleSort(e) {
    if (e.target.value == "lth") {
      setSort("price_asc");
    }
  }

  return (
    <div>
      <button className="addBtn" onClick={() => setSeeAddForm(!seeAddForm)}>
        {seeAddForm ? "Close Add Form" : "Add Book"}
      </button>

      {seeAddForm && (
        <div className="addFormDiv">
          <form onSubmit={handleSubmit} className="addForm">
            <h3>Add Book Here..</h3>
            <input
              type="text"
              placeholder="Enter image url"
              name="coverImage"
              value={newBook.coverImage}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Enter name of book"
              name="name"
              value={newBook.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Author"
              name="author"
              value={newBook.author}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Published Year"
              name="publishingYear"
              value={newBook.publishingYear}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Price"
              name="price"
              value={newBook.price}
              onChange={handleChange}
            />
            <input
              type="text "
              placeholder="Description"
              name="description"
              value={newBook.description}
              onChange={handleChange}
            />
            <select
              name="category"
              id=""
              value={newBook.category}
              onChange={handleChange}
            >
              <option value="">Choose category</option>
              <option value="Self-Help">Self-Help</option>
              <option value="Fiction">Fiction</option>
              <option value="Technology">Technology</option>
              <option value="Productivity">Productivity</option>
              <option value="History">History</option>
              <option value="Finance">Finance</option>
              <option value="Business">Business</option>
              <option value="Psychology">Psychology</option>
            </select>
            <input type="submit" value={"Add Book"} />
          </form>
        </div>
      )}
      <div>
        <select name="" id="" onChange={handleFilter}>
          <option value="">Filter by Category</option>
          <option value="Self-Help">Self-Help</option>
          <option value="Fiction">Fiction</option>
          <option value="Technology">Technology</option>
          <option value="Productivity">Productivity</option>
          <option value="History">History</option>
          <option value="Finance">Finance</option>
          <option value="Business">Business</option>
          <option value="Psychology">Psychology</option>{" "}
        </select>

        <select name="" id="" onChange={handleSort}>
          <option value="">Sort By Price</option>
          <option value="htl">High to Low</option>
          <option value="lth">Low to Hight</option>
        </select>
      </div>
      {/*  */}
      <div className="AllBooks">
        {books.map((el) => {
          return (
            <div key={el.id} className="bookCard">
              <img src={el.coverImage} alt={el.name} />
              <div>
                <h2>{el.name}</h2>
                <p>By {el.author}</p>
                <h4>Price ${el.price}</h4>
                <button onClick={() => navigate(`/bookDetails/${el.id}`)}>
                  View Details
                </button>
                <button onClick={() => handleDelete(el.id)}>Delele Book</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
