import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const limit = 10;

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=100")
      .then((response) => {
        setProducts(response.data.products);
      });
  }, []);

  /* ---------------- FILTER LOGIC ---------------- */

  // categories list
  const categories = [
    "all",
    ...new Set(products.map((item) => item.category)),
  ];

  // filter by category
  const categoryFiltered =
    category === "all"
      ? products
      : products.filter((item) => item.category === category);

  // filter by search
  const searchFiltered = categoryFiltered.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- PAGINATION ---------------- */

  const start = (page - 1) * limit;
  const end = page * limit;
  const currentProducts = searchFiltered.slice(start, end);

  const totalPages = Math.ceil(searchFiltered.length / limit);

  /* reset page when filter/search changes */
  useEffect(() => {
    setPage(1);
  }, [search, category]);

  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/home" className="btn btn-ghost text-xl">
            Home
          </Link>
          <Link to="/products" className="btn btn-ghost text-xl">
            Products
          </Link>
        </div>

        <div className="flex gap-2">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search products..."
            className="input input-bordered w-48"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* CATEGORY */}
          <select
            className="select select-bordered"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-56 w-full object-cover rounded-md"
              />

              <h3 className="mt-4 text-lg font-semibold truncate">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {item.description}
              </p>

              <p className="text-green-600 font-bold mt-2">
                ₹ {item.price}
              </p>

              <button className="mt-3 bg-green-600 text-white px-4 py-1 rounded-md text-sm hover:bg-green-700">
                Buy
              </button>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center mt-10 gap-2 flex-wrap">
          {[...Array(totalPages)].map((_, i) => (
            <div
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-10 h-10 flex items-center justify-center cursor-pointer border rounded-lg font-semibold
                ${
                  page === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-blue-100"
                }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10 mt-5">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
        </nav>
      </footer>
    </div>
  );
}
