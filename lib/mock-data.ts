export type Category = "conquistar" | "resolver";

export interface MockJourney {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: Category;
  objective: string;
  estimatedTime: string;
  complexity: "Baixa" | "Média" | "Alta";
  specialistName: string;
  specialistRole: string;
  steps: {
    id: string;
    title: string;
    description: string;
    completed?: boolean;
  }[];
}

export const mockJourneys: MockJourney[] = [
  {
    id: "1",
    slug: "abrir-empresa",
    title: "Abrir Empresa",
    description: "Guia completo para formalizar seu negócio, escolher o regime tributário e emitir nota fiscal.",
    category: "conquistar",
    objective: "Ter o CNPJ ativo e a primeira nota fiscal emitida.",
    estimatedTime: "15 a 30 dias",
    complexity: "Alta",
    specialistName: "Carlos Silva",
    specialistRole: "Especialista Contábil",
    steps: [
      { id: "step1", title: "Escolher Natureza Jurídica", description: "Defina se será EI, LTDA, etc." },
      { id: "step2", title: "Definir CNAEs", description: "Escolha as atividades da sua empresa." },
      { id: "step3", title: "Contrato Social", description: "Elaboração do contrato social." },
      { id: "step4", title: "Registro na Junta", description: "Envio para a Junta Comercial." },
      { id: "step5", title: "Emissão de CNPJ", description: "Obtenção do número na Receita Federal." },
    ]
  },
  {
    id: "2",
    slug: "abrir-mei",
    title: "Abrir MEI",
    description: "Passo a passo rápido para formalizar seu trabalho autônomo como Microempreendedor Individual.",
    category: "conquistar",
    objective: "CNPJ MEI ativo em poucas horas.",
    estimatedTime: "1 dia",
    complexity: "Baixa",
    specialistName: "Ana Souza",
    specialistRole: "Consultora de Pequenos Negócios",
    steps: [
      { id: "step1", title: "Checar requisitos", description: "Verifique se sua atividade é permitida." },
      { id: "step2", title: "Acesso Gov.br", description: "Crie ou recupere sua senha prata/ouro." },
      { id: "step3", title: "Portal do Empreendedor", description: "Preencha o formulário oficial." },
      { id: "step4", title: "Emissão do CCMEI", description: "Guarde seu certificado." },
    ]
  },
  {
    id: "3",
    slug: "comprar-imovel",
    title: "Comprar Imóvel",
    description: "Jornada segura para comprar sua casa ou apartamento sem surpresas jurídicas ou financeiras.",
    category: "conquistar",
    objective: "Assinar a escritura e pegar as chaves.",
    estimatedTime: "3 a 6 meses",
    complexity: "Alta",
    specialistName: "Marcos Torres",
    specialistRole: "Especialista Imobiliário",
    steps: [
      { id: "step1", title: "Aprovação de Crédito", description: "Simulação e aprovação bancária." },
      { id: "step2", title: "Busca do Imóvel", description: "Visitas e propostas." },
      { id: "step3", title: "Análise de Documentos", description: "Verificação das certidões do vendedor." },
      { id: "step4", title: "Assinatura do Contrato", description: "Contrato de financiamento." },
      { id: "step5", title: "Registro e ITBI", description: "Pagamento de impostos e registro." },
    ]
  },
  {
    id: "4",
    slug: "casamento",
    title: "Casamento Civil",
    description: "O que você precisa saber e organizar para casar no civil com tranquilidade.",
    category: "conquistar",
    objective: "Certidão de casamento em mãos.",
    estimatedTime: "1 a 3 meses",
    complexity: "Média",
    specialistName: "Dra. Helena",
    specialistRole: "Especialista em Direito de Família",
    steps: [
      { id: "step1", title: "Regime de Bens", description: "Escolha entre Comunhão Parcial, Total ou Separação." },
      { id: "step2", title: "Documentação", description: "Certidões atualizadas e RGs." },
      { id: "step3", title: "Habilitação no Cartório", description: "Dar entrada nos papéis." },
      { id: "step4", title: "Cerimônia", description: "Casamento com o juiz de paz." },
    ]
  },
  {
    id: "5",
    slug: "recomecar",
    title: "Recomeçar do Zero",
    description: "Uma jornada estruturada para quem precisa mudar de cidade, carreira ou recomeçar a vida.",
    category: "conquistar",
    objective: "Estabilidade na nova fase.",
    estimatedTime: "6 a 12 meses",
    complexity: "Alta",
    specialistName: "Sofia Almeida",
    specialistRole: "Mentora de Carreira e Vida",
    steps: [
      { id: "step1", title: "Autoavaliação", description: "Entender cenário atual financeiro e mental." },
      { id: "step2", title: "Plano de Ação", description: "Definir metas de curto e médio prazo." },
      { id: "step3", title: "Reserva de Emergência", description: "Estratégia de sobrevivência." },
      { id: "step4", title: "Nova Rotina", description: "Estabelecer hábitos na nova fase." },
    ]
  },
  {
    id: "6",
    slug: "perdi-emprego",
    title: "Perdi meu emprego",
    description: "Passo a passo para garantir seus direitos, sacar FGTS, dar entrada no Seguro Desemprego e se recolocar.",
    category: "resolver",
    objective: "Garantir direitos trabalhistas e iniciar recolocação.",
    estimatedTime: "1 a 3 meses",
    complexity: "Média",
    specialistName: "Dr. Roberto",
    specialistRole: "Advogado Trabalhista",
    steps: [
      { id: "step1", title: "Homologação", description: "Verificar cálculo rescisório." },
      { id: "step2", title: "Saque do FGTS", description: "Liberar a chave de saque na Caixa." },
      { id: "step3", title: "Seguro Desemprego", description: "Dar entrada no benefício via app." },
      { id: "step4", title: "Atualizar Currículo", description: "Preparar-se para o mercado." },
    ]
  },
  {
    id: "7",
    slug: "negocio-faliu",
    title: "Meu negócio faliu",
    description: "Como encerrar a empresa corretamente, negociar passivos e proteger seu patrimônio pessoal.",
    category: "resolver",
    objective: "Baixa do CNPJ e plano de quitação de dívidas.",
    estimatedTime: "6 a 12 meses",
    complexity: "Alta",
    specialistName: "Carlos Silva",
    specialistRole: "Especialista Contábil e Jurídico",
    steps: [
      { id: "step1", title: "Levantamento de Passivo", description: "Mapear todas as dívidas." },
      { id: "step2", title: "Distrato Social", description: "Acordo de encerramento." },
      { id: "step3", title: "Baixa na Receita", description: "Solicitar o encerramento do CNPJ." },
      { id: "step4", title: "Renegociação", description: "Estratégia com credores." },
    ]
  },
  {
    id: "8",
    slug: "inventario",
    title: "Inventário",
    description: "Guia completo para resolver inventário de herança familiar de forma extrajudicial ou judicial.",
    category: "resolver",
    objective: "Partilha de bens concluída e registrada.",
    estimatedTime: "6 a 24 meses",
    complexity: "Alta",
    specialistName: "Dra. Helena",
    specialistRole: "Especialista em Direito de Família",
    steps: [
      { id: "step1", title: "Certidão de Óbito", description: "Emissão e verificação." },
      { id: "step2", title: "Levantamento de Bens", description: "Imóveis, contas e dívidas." },
      { id: "step3", title: "Escolha do Advogado", description: "Definição do profissional." },
      { id: "step4", title: "Pagamento do ITCMD", description: "Imposto estadual." },
      { id: "step5", title: "Escritura de Partilha", description: "Assinatura no cartório." },
    ]
  },
  {
    id: "9",
    slug: "burnout",
    title: "Burnout",
    description: "O que fazer juridicamente e no trabalho ao ser diagnosticado com Síndrome de Burnout.",
    category: "resolver",
    objective: "Afastamento médico e início do tratamento.",
    estimatedTime: "3 a 6 meses",
    complexity: "Média",
    specialistName: "Dr. Roberto",
    specialistRole: "Advogado Trabalhista e Saúde",
    steps: [
      { id: "step1", title: "Laudo Médico", description: "Obter laudo atestando o CID." },
      { id: "step2", title: "Comunicação à Empresa", description: "Afastamento inicial (15 dias)." },
      { id: "step3", title: "Perícia INSS", description: "Agendar auxílio-doença acidentário." },
      { id: "step4", title: "Direitos Trabalhistas", description: "Estabilidade provisória de 12 meses." },
    ]
  },
];

export const mockArticles = [
  {
    id: "1",
    title: "Perdi meu emprego aos 45 anos: Como recomeçar?",
    slug: "perdi-emprego-aos-45",
    journeySlug: "recomecar",
    resume: "Não é o fim. Veja como reposicionar sua experiência no mercado atual.",
    readTime: "5 min",
  },
  {
    id: "2",
    title: "Como não perder dinheiro no ITBI",
    slug: "como-nao-perder-dinheiro-itbi",
    journeySlug: "comprar-imovel",
    resume: "Dicas essenciais para o pagamento de impostos na compra de imóveis.",
    readTime: "4 min",
  }
];

export const mockTools = [
  {
    id: "1",
    title: "Calculadora de Rescisão",
    description: "Simule quanto você deve receber após uma demissão sem justa causa.",
    category: "Calculadoras",
    journeySlug: "perdi-emprego"
  },
  {
    id: "2",
    title: "Planilha de Custo de Casamento",
    description: "Organize o orçamento do seu grande dia.",
    category: "Organizadores",
    journeySlug: "casamento"
  }
];

export const mockUser = {
  name: "João Silva",
  email: "joao@email.com",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  plan: "Premium",
  activeJourneys: ["abrir-empresa", "comprar-imovel"],
  completedJourneys: ["abrir-mei"]
};
