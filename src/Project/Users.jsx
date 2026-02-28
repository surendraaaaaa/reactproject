import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

export default function Users() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then(res => res.json())
      .then(data => setUsers(data.users))
  }, [])

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <div>

      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/home" className="btn btn-ghost text-xl">Home</Link>
          <Link to="/products" className="btn btn-ghost text-xl">Products</Link>
          <Link to="/users" className="btn btn-ghost text-xl">Users</Link>
        </div>
      </div>

      {/* Users Table */}
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-4">Users List</h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-info">Edit</button>
                    <button 
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
  )
}
