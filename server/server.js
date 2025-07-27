const express = require("express")
const app = express();
const cors = require("cors");
const corsOption = {
    origin: ["http://localhost:5173 "],
}