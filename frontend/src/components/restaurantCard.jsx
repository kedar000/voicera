import React from 'react';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-200">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{restaurant.name}</h2>
      <p className="text-gray-600 mb-1"><span className="font-medium">Cuisine:</span> {restaurant.cuisine}</p>
      <p className="text-gray-600"><span className="font-medium">Building:</span> {restaurant.address?.building || "N/A"}</p>
    </div>
  );
};

export default RestaurantCard;