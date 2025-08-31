import React from "react";
import axios from "axios";

export default function HeroCard({ hero, onUpdate, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/characters/${hero.id}`);
      onDelete(hero.id);
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  const handleUpdate = () => {
    const newName = prompt("Nouveau nom :", hero.name);
    if (!newName) return;

    axios.put(`http://localhost:4000/characters/${hero.id}`, { name: newName })
      .then(res => onUpdate(res.data))
      .catch(err => console.error("Erreur modification :", err));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-64">
      <div className="p-4">
        <h2 className="text-xl font-bold">{hero.name}</h2>
        <p className="text-gray-600">Real name: {hero.realName}</p>
        <p className="text-sm mt-2">Universe: {hero.universe}</p>

        <div className="mt-4 flex justify-between">
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </div>
      </div>
    </div>
  );
}
