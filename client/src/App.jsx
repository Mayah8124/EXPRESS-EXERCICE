import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./component/Navbar";
import HeroCard from "./component/HeroCards";

function App() {
  const API_URL = "http://localhost:4000/characters";

  const [heroes, setHeroes] = useState([]);
  const [Loading, setLoading] = useState([]);

  useEffect(() => {
  const fetchHeroes = async () => {
    try {
      const res = await axios.get(API_URL);
      setHeroes(res.data);
    } catch (err) {
      console.error("Failed fetching characters :", err);
      setHeroes([]);
    } finally {
      setLoading(false);
    }
  };
  fetchHeroes();
}, []);


  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-6 flex flex-wrap gap-6 justify-center">
        {heroes.length > 0 ? (
          heroes.map(hero => (
            <HeroCard key={hero.id} hero={hero} />
          ))
        ) : (
          <p className="text-gray-500">Loading heroes...</p>
        )}
      </div>
    </div>
  );
}

export default App