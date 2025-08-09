const express = require('express'); 
const cors = require('cors');
const app = express();
const PORT = 4000;
const FILE_PATH = "./data/user.json";
const fs = require('fs');

app.use(express.json());
app.use(cors());

const readDataFile = async() => {
    const rawData = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(rawData);
}

const writeDataFile= async(data) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), "utf8");
}

app.get('/characters', (req, res) => {
    try {
        const data = readDataFile();
        res.json(data.characters);
    } catch (error) {
        res.status(500).json({ error: "Failed to read characters file" });
    }
});

app.get('/characters/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = readDataFile();
    const character = data.characters.find(c => c.id === id);

    if (!character) {
        return res.status(404).json({ error: "character not found" });
    }

    res.json(character);
});

app.post('/characters', (req, res) => {
    const data = readDataFile();
    const newCharacter = req.body;

    const maxId = Math.max(...data.characters.map(c => c.id), 0);
    newCharacter.id = maxId + 1;

    data.characters.push(newCharacter);
    writeDataFile(data);

    res.status(201).json(newCharacter);
});

app.put('/characters/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = readDataFile();
    const index = data.characters.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "character not found" });
    }

    data.characters[index] = { ...data.characters[index], ...req.body };
    writeDataFile(data);

    res.json(data.characters[index]);
});

app.delete('/characters/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = readDataFile();
    const index = data.characters.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ error:"character not found" });
    }

    const deleted = data.characters.splice(index, 1);
    writeDataFile(data);

    res.json({ message: "character deleted", deleted: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
});