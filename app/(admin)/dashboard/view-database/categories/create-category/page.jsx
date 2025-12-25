"use client";
import { categoryStore } from "@/store/categoryStore";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function page({ id }) {
    const [category, setCategory] = useState([]);
    const [form, setForm] = useState({
        field: "", 
        popular: false,
    });
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            await axios.post("/api/category", form);
            setForm({ field: "", popular: false });
        } catch (error) {
            console.error("Error creating category:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Create New Category
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Add a new category to your blog
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Category Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Category Name
                            </label>
                            <input
                                type="text"
                                value={form.field}
                                onChange={(e) => setForm({ ...form, field: e.target.value })}
                                placeholder="Enter category name"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                                required
                            />
                        </div>

                        {/* Popular Checkbox */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="popular"
                                checked={form.popular}
                                onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                                className="w-4 h-4 text-blue-600 dark:text-blue-400 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            />
                            <label
                                htmlFor="popular"
                                className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                            >
                                Mark as Popular
                            </label>
                        </div>

                        {/* Button Group */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Creating..." : "Create Category"}
                            </button>
                            <button
                                type="reset"
                                className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}