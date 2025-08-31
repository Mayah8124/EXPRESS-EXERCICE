const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const FILE_PATH = "./data/user.json";

const readDataFile = () => {
  try {
    const rawData = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(rawData);
  } catch (err) {
    console.error("Error parsing file :", err);
    return { characters: [] };
  }
};

const writeDataFile = (data) => {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing file :", err);
  }
};

app.get('/characters', (req, res) => {
  const data = readDataFile();
  console.log("GET /characters ->", data.characters.length, "héros");
  res.json(data.characters);
});

app.get('/characters/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readDataFile();
  const character = data.characters.find(c => c.id === id);
  if (!character) return res.status(404).json({ error: "Character not found" });
  res.json(character);
});

app.post('/characters', (req, res) => {
  const data = readDataFile();
  const newCharacter = req.body;

  const maxId = data.characters.length > 0 ? Math.max(...data.characters.map(c => c.id)) : 0;
  newCharacter.id = maxId + 1;

  data.characters.push(newCharacter);
  writeDataFile(data);

  console.log("POST /characters ->", newCharacter);
  res.status(201).json(newCharacter);
});

app.put('/characters/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readDataFile();
  const index = data.characters.findIndex(c => c.id === id);

  if (index === -1) return res.status(404).json({ error: "Character not found" });

  data.characters[index] = { ...data.characters[index], ...req.body };
  writeDataFile(data);

  console.log("PUT /characters/:id ->", data.characters[index]);
  res.json(data.characters[index]);
});

app.delete('/characters/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readDataFile();
  const index = data.characters.findIndex(c => c.id === id);

  if (index === -1) return res.status(404).json({ error: "Character not found" });

  const deleted = data.characters.splice(index, 1);
  writeDataFile(data);

  console.log("DELETE /characters/:id ->", deleted[0]);
  res.json({ message: "Character deleted", deleted: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
});