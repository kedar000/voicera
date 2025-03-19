import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import RestaurantCard from '../components/restaurantCard';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const fetchRestaurants = async () => {
    try {
      const res = await api.get('/restaurants', {
        params: {
          page,
          limit,
          search: searchQuery,
        },
      });
      setRestaurants(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [page, limit, searchQuery]);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 w-full">
      <div className="w-full mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Restaurant Finder 🍽️</h1>

        {/* Search + Limit Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by cuisine (e.g., Indian)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Limit */}
          <div className="flex items-center space-x-2">
            <label className="font-medium">Records per page:</label>
            <input
              type="number"
              value={limit}
              min="1"
              className="border border-gray-300 rounded-lg px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* Restaurant List */}
        {restaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No restaurants found!</p>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-600 transition"
          >
            Previous
          </button>

          <p className="text-gray-700">Page {page} of {totalPages}</p>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;