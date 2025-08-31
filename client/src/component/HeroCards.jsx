import React from "react";

export default function HeroCard({ hero }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-64">
      <div className="p-4">
        <h2 className="text-xl font-bold">Name: {hero.name}</h2>
        <p className="text-gray-600">Real name: {hero.realName}</p>
        <p className="text-sm mt-2">Universe: {hero.universe}</p>
      </div>
    </div>
  );
}
