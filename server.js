
// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const CARPEDIA_API_URL = 'https://www.carpedia.com.br/api/v1';
const CARPEDIA_API_KEY = process.env.CARPEDIA_API_KEY;

// Habilita CORS para o Front-End acessar
app.use(cors());
app.use(express.json());

// 1. Rota para buscar marcas de um determinado ano
app.get('/api/marcas', async (req, res) => {
  try {
    const resposta = await fetch(`${CARPEDIA_API_URL}/marcas`, {
      headers: {
        Authorization: `Bearer ${CARPEDIA_API_KEY}`
      }
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      return res.status(resposta.status).json(dados);
    }

    res.json(dados);

  } catch (err) {
    console.error('Erro ao buscar marcas:', err);
    res.status(500).json({
      erro: 'Erro ao conectar com a Carpedia.'
    });
  }
});

// 2. Rota para buscar modelos de uma marca e ano
app.get('/api/modelos', async (req, res) => {
  try {
    const { marca } = req.query;

    if (!marca) {
      return res.status(400).json({
        erro: 'A marca é obrigatória.'
      });
    }

    const resposta = await fetch(
      `${CARPEDIA_API_URL}/marcas/${encodeURIComponent(marca)}/modelos`,
      {
        headers: {
          Authorization: `Bearer ${CARPEDIA_API_KEY}`
        }
      }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
      return res.status(resposta.status).json(dados);
    }

    res.json(dados);

  } catch (err) {
    console.error('Erro ao buscar modelos:', err);

    res.status(500).json({
      erro: 'Erro ao conectar com a Carpedia.'
    });
  }
});

// 3. Rota para buscar os detalhes/trims de um modelo (inclui ID do modelo para comparação)
app.get('/api/versoes', async (req, res) => {
  try {
    const { marca, modelo } = req.query;

    if (!marca || !modelo) {
      return res.status(400).json({
        erro: 'Marca e modelo são obrigatórios.'
      });
    }

    const resposta = await fetch(
      `${CARPEDIA_API_URL}/modelos/${encodeURIComponent(marca)}/${encodeURIComponent(modelo)}/versoes`,
      {
        headers: {
          Authorization: `Bearer ${CARPEDIA_API_KEY}`
        }
      }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
      return res.status(resposta.status).json(dados);
    }

    res.json(dados);

  } catch (err) {
    console.error('Erro ao buscar versões:', err);

    res.status(500).json({
      erro: 'Erro ao conectar com a Carpedia.'
    });
  }
});

// 4. Rota para buscar a ficha técnica de uma versão
app.get('/api/ficha', async (req, res) => {
  try {
    const { fipeId, ano } = req.query;

    if (!fipeId || !ano) {
      return res.status(400).json({
        erro: 'fipeId e ano são obrigatórios.'
      });
    }

    const resposta = await fetch(
      `${CARPEDIA_API_URL}/ficha/${encodeURIComponent(fipeId)}/${encodeURIComponent(ano)}`,
      {
        headers: {
          Authorization: `Bearer ${CARPEDIA_API_KEY}`
        }
      }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
      return res.status(resposta.status).json(dados);
    }

    res.json(dados);

  } catch (err) {
    console.error('Erro ao buscar ficha técnica:', err);

    res.status(500).json({
      erro: 'Erro ao conectar com a Carpedia.'
    });
  }
});

// 4. Rota para comparar dois carros pelo ID do modelo
app.get('/api/comparar', async (req, res) => {
  try {
    const { id1, ano1, id2, ano2 } = req.query;

    if (!id1 || !ano1 || !id2 || !ano2) {
      return res.status(400).json({
        erro: 'id1, ano1, id2 e ano2 são obrigatórios.'
      });
    }

    const [resposta1, resposta2] = await Promise.all([
      fetch(`${CARPEDIA_API_URL}/ficha/${encodeURIComponent(id1)}/${encodeURIComponent(ano1)}`, {
        headers: {
          Authorization: `Bearer ${CARPEDIA_API_KEY}`
        }
      }),

      fetch(`${CARPEDIA_API_URL}/ficha/${encodeURIComponent(id2)}/${encodeURIComponent(ano2)}`, {
        headers: {
          Authorization: `Bearer ${CARPEDIA_API_KEY}`
        }
      })
    ]);

    const [carro1, carro2] = await Promise.all([
      resposta1.json(),
      resposta2.json()
    ]);

    if (!resposta1.ok) {
      return res.status(resposta1.status).json({
        erro: 'Erro ao buscar o primeiro carro.',
        detalhes: carro1
      });
    }

    if (!resposta2.ok) {
      return res.status(resposta2.status).json({
        erro: 'Erro ao buscar o segundo carro.',
        detalhes: carro2
      });
    }

    res.json({
      carro1,
      carro2
    });

  } catch (err) {
    console.error('Erro ao comparar carros:', err);

    res.status(500).json({
      erro: 'Erro ao conectar com a Carpedia.'
    });
  }
});

app.listen(3000, () => {
  console.log('API do TCC rodando na porta 3000');
});