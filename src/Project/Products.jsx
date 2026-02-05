import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
  const limit = 10;

  const start = (page - 1) * limit;
  const end = page * limit;
  const currentProducts = products.slice(start, end);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=100")
      .then((response) => {
        setProducts(response.data.products); 
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      
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
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>


     
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 flex flex-col"
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

              <p className="text-green-600 font-bold mt-2">₹ {item.price}</p>

             
              <div className="mt-3">
                <button className="bg-green-600 text-white px-4 py-1 rounded-md text-sm hover:bg-green-700 transition">
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>

        
        <div className="flex justify-center mt-10 gap-3 flex-wrap">
          {[1,2,3,4,5,6,7,8,9,10].map((num) => (
            <div
              key={num}
              onClick={() => setPage(num)}
              className={`w-12 h-12 flex items-center justify-center cursor-pointer border rounded-lg text-lg font-semibold transition
                ${page === num
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:bg-blue-100"}
              `}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    
      <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10 mt-5">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
}


