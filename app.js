import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

const app = express();
app.use(cors())

const API_KEY = process.env.ITCH_IO_KEY;

app.get("/my-games", async (req, res) => {
  try {
    const response = await fetch(`https://itch.io/api/1/${API_KEY}/my-games`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter dados" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});