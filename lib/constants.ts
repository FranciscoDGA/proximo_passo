export const SITE_NAME = "Próximo Passo";
export const SITE_DESCRIPTION = "Seu guia para os momentos mais importantes da vida";
export const SITE_URL = "https://proximopasso.com.br";

export const SUBSCRIPTION_PLANS = {
  free: {
    name: "Gratuito",
    price: 0,
    features: [
      "3 jornadas exploradas",
      "Blog completo",
      "3 ferramentas básicas",
      "Sem acesso a especialista IA",
    ],
  },
  premium: {
    name: "Premium",
    price: 29,
    features: [
      "Jornadas ilimitadas",
      "Salvar progresso",
      "Histórico completo",
      "Acesso a especialista IA",
      "Exportar em PDF",
      "Sem anúncios",
      "Lembretes",
    ],
  },
  familia: {
    name: "Família",
    price: 59,
    features: [
      "Tudo do Premium",
      "Até 5 pessoas na conta",
      "Compartilhar progresso",
      "Dashboard compartilhado",
    ],
  },
};

export const LIFE_JOURNEYS = {
  familia: {
    name: "Família",
    journeys: [
      "Nascimento",
      "Educação",
      "Casamento",
      "Divórcio",
      "Falecimento/Inventário",
    ],
  },
  financeiro: {
    name: "Financeiro",
    journeys: [
      "Aposentadoria",
      "INSS",
      "Imposto de Renda",
      "Benefícios Sociais",
      "Financiamentos",
    ],
  },
  propriedade: {
    name: "Propriedade",
    journeys: [
      "Comprar Casa",
      "Comprar Carro",
      "Comprar Terreno",
      "Construir",
      "Regularizar Imóvel",
    ],
  },
  documentos: {
    name: "Documentos",
    journeys: ["CPF", "RG", "CNH", "Passaporte"],
  },
  profissional: {
    name: "Profissional",
    journeys: [
      "Abrir MEI",
      "Abrir Empresa",
      "Ser Produtor Rural",
      "Licitações",
    ],
  },
  consumo: {
    name: "Consumo",
    journeys: ["Viagens", "Crédito/Financiamento", "Proteção ao Consumidor"],
  },
};
