"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function page() {
  const [category, setCategory] = useState([]);
  const fetchData = async () => {
    const res = await axios.get("/api/category");
    setCategory(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditValue(item.field);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const saveEdit = async (id) => {
    try {
      setLoadingId(id);
      await axios.put(`/api/category/${id}`, { field: editValue });
      await fetchData();
      setEditingId(null);
      setEditValue("");
    } catch (err) {
      console.error(err);
      alert("Failed to save. See console for details.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    try {
      setLoadingId(id);
      await axios.delete(`/api/category/${id}`);
      // Optimistically update UI
      setCategory((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete. See console for details.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ marginBottom: 12 }}>Categories</h2>
      <div className="absolute top-2 right-5 flex gap-3">
        <Link
          className="px-3 py-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-700/30 "
          href={"/dashboard"}
        >
         Dashboard
        </Link>
<Link
        className="px-3 py-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-700/30 "
        href={"/dashboard/view-database/categories/create-category"}
      >
        Create Categories
      </Link>
      </div>
      

      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          overflowX: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              <th style={{ textAlign: "left", padding: 12 }}>Name</th>
              <th style={{ textAlign: "left", padding: 12, width: 220 }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {category.length === 0 && (
              <tr>
                <td colSpan={2} style={{ padding: 12 }}>
                  No categories found.
                </td>
              </tr>
            )}

            {category.map((item) => (
              <tr
                key={item._id}
                style={{
                  borderTop: "1px solid #eee",
                  background:
                    editingId === item._id ? "#fffaf0" : "transparent",
                }}
              >
                <td style={{ padding: 12 }}>
                  {editingId === item._id ? (
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      style={{
                        width: "100%",
                        padding: 8,
                        border: "1px solid #d1d5db",
                        borderRadius: 4,
                      }}
                    />
                  ) : (
                    <span>{item.field}</span>
                  )}
                </td>

                <td style={{ padding: 12 }}>
                  {editingId === item._id ? (
                    <>
                      <button
                        onClick={() => saveEdit(item._id)}
                        disabled={loadingId === item._id}
                        style={{
                          marginRight: 8,
                          padding: "6px 10px",
                          background: "#10b981",
                          color: "#fff",
                          border: "none",
                          borderRadius: 4,
                          cursor: "pointer",
                          opacity: loadingId === item._id ? 0.6 : 1,
                        }}
                      >
                        {loadingId === item._id ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={cancelEdit}
                        disabled={loadingId === item._id}
                        style={{
                          padding: "6px 10px",
                          background: "#ef4444",
                          color: "#fff",
                          border: "none",
                          borderRadius: 4,
                          cursor: "pointer",
                          opacity: loadingId === item._id ? 0.6 : 1,
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(item)}
                        style={{
                          marginRight: 8,
                          padding: "6px 10px",
                          background: "#2563eb",
                          color: "#fff",
                          border: "none",
                          borderRadius: 4,
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={loadingId === item._id}
                        style={{
                          padding: "6px 10px",
                          background: "#ef4444",
                          color: "#fff",
                          border: "none",
                          borderRadius: 4,
                          cursor: "pointer",
                          opacity: loadingId === item._id ? 0.6 : 1,
                        }}
                      >
                        {loadingId === item._id ? "Deleting..." : "Delete"}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
