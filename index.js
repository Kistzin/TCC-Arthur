// Importação em CommonJS (Node.js padrão)
const CarQuery = require('car-query').default || require('car-query');

// Se estiver usando ES Modules (import/export ou TypeScript)
// import CarQuery from 'car-query';

const carQuery = new CarQuery();



async function buscarAnos() {
  try {
    const anos = await carQuery.getYears();
    console.log('Faixa de anos:', anos);
    // Retorno aproximado: { min_year: "1941", max_year: "2026" }
  } catch (error) {
    console.error('Erro ao buscar anos:', error);
  }
}