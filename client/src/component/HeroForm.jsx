import React, { useState } from "react";
import axios from "axios";

export default function HeroForm({ onAdd }) {
  const [name, setName] = useState("");
  const [realName, setRealName] = useState("");
  const [universe, setUniverse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !realName || !universe) return;

    try {
      const res = await axios.post("http://localhost:4000/characters", {
        name, realName, universe
      });
      onAdd(res.data);
      setName(""); setRealName(""); setUniverse("");
    } catch (err) {
      console.error("Erreur création héros :", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 w-80 mx-auto">
      <h3 className="text-lg font-bold mb-2">Ajouter un héros</h3>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nom" className="border p-2 w-full mb-2"/>
      <input value={realName} onChange={e => setRealName(e.target.value)} placeholder="Real name" className="border p-2 w-full mb-2"/>
      <input value={universe} onChange={e => setUniverse(e.target.value)} placeholder="Universe" className="border p-2 w-full mb-2"/>
      <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">Créer</button>
    </form>
  );
}
