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


async function buscarMarcas(ano) {
  try {
    const marcas = await carQuery.getMakes(ano);
    console.log(`Marcas de ${ano}:`, marcas);
  } catch (error) {
    console.error('Erro ao buscar marcas:', error);
  }
}

async function buscarModelos() {
  try {
    const searchCriteria = {
      year: 2020,
      make: 'Ford',
      soldInUSA: false // Opcional: filtrar apenas carros vendidos nos EUA
    };

    const modelos = await carQuery.getModels(searchCriteria);
    console.log('Modelos encontrados:', modelos);
  } catch (error) {
    console.error('Erro ao buscar modelos:', error);
  }
}


async function buscarDetalhesCarro(modelId) {
  try {
    // Exemplo: Buscar detalhes completos usando o ID do modelo
    const detalhes = await carQuery.getModelDetail(modelId);
    console.log('Especificações Técnicas:', detalhes);
    
    /* 
       A API retornará dados como:
       - model_engine_cc (Cilindrada)
       - model_engine_power_ps (Potência em CV/HP)
       - model_0_to_100_kmh (Aceleração)
       - model_fuel_cap_l (Capacidade do Tanque)
       - e muito mais!
    */
  } catch (error) {
    console.error('Erro ao buscar detalhes:', error);
  }
}

