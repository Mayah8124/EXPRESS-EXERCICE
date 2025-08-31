import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./component/Navbar";
import HeroCard from "./component/HeroCards";
import HeroForm from "./component/HeroForm";

function App() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const res = await axios.get("http://localhost:4000/characters");
        setHeroes(res.data);
      } catch (err) {
        console.error("Erreur fetch :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroes();
  }, []);

  const handleAddHero = (newHero) => setHeroes([...heroes, newHero]);
  const handleDeleteHero = (id) => setHeroes(heroes.filter(h => h.id !== id));
  const handleUpdateHero = (updatedHero) => setHeroes(heroes.map(h => h.id === updatedHero.id ? updatedHero : h));

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <HeroForm onAdd={handleAddHero} />
      <div className="p-6 flex flex-wrap gap-6 justify-center">
        {loading ? (
          <p className="text-gray-500">Loading heroes...</p>
        ) : heroes.length > 0 ? (
          heroes.map(hero => (
            <HeroCard
              key={hero.id}
              hero={hero}
              onDelete={handleDeleteHero}
              onUpdate={handleUpdateHero}
            />
          ))
        ) : (
          <p className="text-gray-500">No heroes found</p>
        )}
      </div>
    </div>
  );
}

export default App;
