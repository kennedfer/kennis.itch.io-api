import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

const app = express();
app.use(cors())

const API_KEY = process.env.ITCH_IO_KEY;

function formatGamesData(games) {
  const data = games.map(({ title, short_text, published_at, downloads_count, cover_url, views_count, url, p_android }) => {
    return {
      title,
      description: short_text,
      published_at,
      downloads_count,
      cover_url,
      views_count,
      url,
      is_android: p_android
    }
  })

  return data;
}

function getGameImages(games) {
  return games.map(({ cover_url, title }) => ({ cover: cover_url, title }))
}

app.get("/my-games", async (req, res) => {
  try {
    const response = await fetch(`https://itch.io/api/1/${API_KEY}/my-games`);
    const data = await response.json();

    const formattedData = formatGamesData(data.games);

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter dados" });
  }
});

app.get("/game-covers", async (req, res) => {
  try {
    const response = await fetch(`https://itch.io/api/1/${API_KEY}/my-games`);
    const data = await response.json();

    const gameImages = getGameImages(data.games);

    res.json(gameImages);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter dados" });
  }
})

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});