// server.js
const express = require('express');
const cors = require('cors');
const CarQuery = require('car-query').default || require('car-query');

const app = express();
const carQuery = new CarQuery();

// Habilita CORS para o Front-End acessar
app.use(cors());
app.use(express.json());

// 1. Rota para buscar marcas de um determinado ano
app.get('/api/marcas', async (req, res) => {
  try {
    const { ano } = req.query;
    if (!ano) return res.status(400).json({ erro: 'O ano é obrigatório.' });
    
    const marcas = await carQuery.getMakes(Number(ano));
    res.json(marcas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar marcas.' });
  }
});

// 2. Rota para buscar modelos de uma marca e ano
app.get('/api/modelos', async (req, res) => {
  try {
    const { ano, marca } = req.query;
    if (!ano || !marca) {
      return res.status(400).json({ erro: 'Ano e Marca são obrigatórios.' });
    }

    const modelos = await carQuery.getModels({ year: Number(ano), make: marca });
    res.json(modelos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar modelos.' });
  }
});

// 3. Rota para buscar os detalhes/trims de um modelo (inclui ID do modelo para comparação)
app.get('/api/versoes', async (req, res) => {
  try {
    const { ano, marca, modelo } = req.query;
    const versoes = await carQuery.getTrims({ year: Number(ano), make: marca, model: modelo });
    res.json(versoes);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar versões.' });
  }
});

// 4. Rota para comparar dois carros pelo ID do modelo
app.get('/api/comparar', async (req, res) => {
  try {
    const { id1, id2 } = req.query;
    if (!id1 || !id2) {
      return res.status(400).json({ erro: 'Envie id1 e id2 para comparar.' });
    }

    // Busca os dois carros em paralelo
    const [carro1, carro2] = await Promise.all([
      carQuery.getModelDetail(id1),
      carQuery.getModelDetail(id2)
    ]);

    res.json({ carro1, carro2 });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar detalhes da comparação.' });
  }
});

app.listen(3000, () => {
  console.log('API do TCC rodando na porta 3000');
});