/**
 * ============================================================
 *  CONFIGURAÇÃO DO SITE MAISVENDAS
 * ============================================================
 *  Tudo o que você quiser mudar no site (textos, preços, prazos,
 *  nichos, perguntas) fica AQUI. Não precisa mexer em mais nada.
 *
 *  Regras rápidas:
 *  - Textos ficam sempre entre aspas: "assim".
 *  - Não apague as vírgulas no fim das linhas.
 *  - Depois de salvar, o site atualiza sozinho (no `npm run dev`)
 *    ou no próximo deploy da Vercel.
 * ============================================================
 */

import type { NomeIcone } from "@/components/Icone";

/* ------------------------------------------------------------
 * Dados gerais
 * ---------------------------------------------------------- */
export const site = {
  nome: "MaisVendas",
  slogan: "Destaque-se no digital!",

  /** Endereço final do site (usado no Google, sitemap e compartilhamentos). */
  url: "https://maisvendas.vercel.app",

  /** Descrição padrão que aparece no Google. */
  descricao:
    "Sites profissionais para micro empresas que ainda não estão no digital. Peça uma prévia grátis do site do seu negócio pelo Instagram e só pague se gostar.",

  instagram: {
    usuario: "maisvendas.web",
    /** Link do perfil (usado em "Siga @maisvendas.web"). */
    perfil: "https://instagram.com/maisvendas.web",
    /** Link do Direct (TODOS os botões de contato usam este link). */
    direct: "https://ig.me/m/maisvendas.web",
  },

  /** Prazo da prévia grátis. Ex.: "3 dias", "48 horas". */
  prazoPrevia: "3 dias",

  /** Cor de destaque (só em botões e pontos de atenção). Ex.: "#22C55E" (verde) ou "#8B5CF6" (roxo). */
  corDestaque: "#22C55E",

  /** Segundos entre a troca automática de layouts do mockup do topo. */
  segundosTrocaMockup: 4,
} as const;

/* ------------------------------------------------------------
 * Planos
 * ---------------------------------------------------------- */
export type Plano = {
  nome: string;
  /**
   * Texto do preço. Hoje: "A combinar".
   * Se um dia quiser mostrar valor, coloque só o número (ex.: "497")
   * e o card mostra "a partir de R$ 497" automaticamente.
   */
  preco: string;
  descricao: string;
  itens: string[];
  /** true = card com borda cromada e selo "Mais escolhido". Deixe só um como true. */
  destaque: boolean;
};

export const planos: Plano[] = [
  {
    nome: "Essencial",
    preco: "A combinar",
    descricao: "Site de uma página, direto ao ponto.",
    itens: [
      "Site de uma página",
      "Seções: sobre, serviços e localização",
      "Botões que levam para o seu Instagram",
      "Funciona perfeito no celular",
      "Domínio e hospedagem inclusos",
    ],
    destaque: false,
  },
  {
    nome: "Profissional",
    preco: "A combinar",
    descricao: "Várias seções ou páginas para mostrar tudo o que você faz.",
    itens: [
      "Várias seções ou páginas",
      "Galeria de fotos dos seus trabalhos",
      "Mapa, horários e formas de contato",
      "Otimizado para aparecer no Google",
      "Domínio e hospedagem inclusos",
      "Ajustes depois da entrega",
    ],
    destaque: true,
  },
  {
    nome: "Loja/Cardápio",
    preco: "A combinar",
    descricao: "Catálogo de produtos ou cardápio digital.",
    itens: [
      "Catálogo de produtos ou cardápio digital",
      "Categorias, fotos e preços",
      "Pedido direto pelo Direct do Instagram",
      "Fácil de atualizar",
      "Domínio e hospedagem inclusos",
    ],
    destaque: false,
  },
];

/* ------------------------------------------------------------
 * Nichos — cada item vira uma página em /nichos/[slug]
 * ---------------------------------------------------------- */
export type Beneficio = { icone: NomeIcone; titulo: string; texto: string };

export type Nicho = {
  /** Parte do endereço: /nichos/barbearia (sem acento, sem espaço). */
  slug: string;
  nome: string;
  /** Ícones disponíveis: tesoura, garfo, brilho, estetoscopio, sacola, patinha, haltere */
  icone: NomeIcone;
  /** Frase curta do card na página /nichos. */
  frase: string;
  titulo: string;
  subtitulo: string;
  beneficios: Beneficio[];
  /** Layout do mockup: 1 = destaque, 2 = produtos, 3 = cardápio, 4 = agendamento. */
  layout: 1 | 2 | 3 | 4;
  /** Título e descrição para o Google. */
  seoTitulo: string;
  seoDescricao: string;
};

export const nichos: Nicho[] = [
  {
    slug: "barbearia",
    nome: "Barbearia",
    icone: "tesoura",
    frase: "Agenda cheia, até fora do horário.",
    titulo: "Sua barbearia com agenda cheia, mesmo fora do horário",
    subtitulo:
      "Um site que mostra seus cortes, explica onde você fica e deixa o cliente marcar o horário a qualquer hora do dia.",
    beneficios: [
      { icone: "calendario", titulo: "Agendamento online", texto: "O cliente escolhe o horário sem precisar te chamar no meio de um corte." },
      { icone: "imagem", titulo: "Vitrine de cortes", texto: "Mostre seus melhores trabalhos e deixe o estilo falar por você." },
      { icone: "mapa", titulo: "Localização no mapa", texto: "Quem procura “barbearia perto de mim” chega na sua porta." },
      { icone: "lupa", titulo: "Apareça no Google", texto: "Seja encontrado por quem ainda não te segue no Instagram." },
    ],
    layout: 4,
    seoTitulo: "Site para barbearia",
    seoDescricao:
      "Site profissional para barbearia com agendamento online, vitrine de cortes e localização no mapa. Peça uma prévia grátis pelo Instagram.",
  },
  {
    slug: "restaurante",
    nome: "Restaurante",
    icone: "garfo",
    frase: "Seu cardápio no celular de todo cliente.",
    titulo: "Seu cardápio no celular de todo cliente",
    subtitulo:
      "Cardápio digital bonito, rápido de abrir e fácil de atualizar — com pedido direto pelo Direct.",
    beneficios: [
      { icone: "garfo", titulo: "Cardápio digital", texto: "Pratos, categorias e preços organizados e sempre atualizados." },
      { icone: "mensagem", titulo: "Pedidos pelo Direct", texto: "O cliente escolhe e já chama você no Instagram para pedir." },
      { icone: "imagem", titulo: "Fotos dos pratos", texto: "Comida bonita vende sozinha. Mostre o que sai da sua cozinha." },
      { icone: "relogio", titulo: "Horário de funcionamento", texto: "Nada de cliente batendo na porta com tudo fechado." },
    ],
    layout: 3,
    seoTitulo: "Site e cardápio digital para restaurante",
    seoDescricao:
      "Cardápio digital e site para restaurante, lanchonete e delivery, com pedidos pelo Direct. Peça uma prévia grátis pelo Instagram.",
  },
  {
    slug: "salao",
    nome: "Salão de beleza",
    icone: "brilho",
    frase: "Encontrado por quem procura beleza perto de casa.",
    titulo: "Seu salão encontrado por quem procura beleza perto de casa",
    subtitulo:
      "Mostre seus serviços, seus preços e seus trabalhos em um site que passa confiança logo de cara.",
    beneficios: [
      { icone: "etiqueta", titulo: "Serviços e preços", texto: "Tudo claro e organizado, sem a cliente precisar perguntar." },
      { icone: "calendario", titulo: "Agendamento", texto: "Horários marcados com facilidade, de dia ou de noite." },
      { icone: "imagem", titulo: "Galeria de trabalhos", texto: "Antes e depois, cortes, cores e unhas em destaque." },
      { icone: "estrela", titulo: "Avaliações", texto: "Espaço para mostrar o que suas clientes falam de você." },
    ],
    layout: 4,
    seoTitulo: "Site para salão de beleza",
    seoDescricao:
      "Site para salão de beleza com serviços, preços, agendamento e galeria de trabalhos. Peça uma prévia grátis pelo Instagram.",
  },
  {
    slug: "clinica",
    nome: "Clínica e consultório",
    icone: "estetoscopio",
    frase: "Mais confiança para quem procura atendimento.",
    titulo: "Mais confiança para quem procura seu consultório",
    subtitulo:
      "Uma apresentação profissional que transmite seriedade e ajuda o paciente a escolher você.",
    beneficios: [
      { icone: "escudo", titulo: "Apresentação profissional", texto: "Sua formação e sua forma de atender, explicadas com clareza." },
      { icone: "estetoscopio", titulo: "Especialidades", texto: "Cada especialidade ou procedimento com sua própria explicação." },
      { icone: "mapa", titulo: "Localização", texto: "Endereço, mapa e como chegar, tudo em um toque." },
      { icone: "calendario", titulo: "Agendamento", texto: "Facilite o primeiro contato e a marcação da consulta." },
    ],
    layout: 1,
    seoTitulo: "Site para clínica e consultório",
    seoDescricao:
      "Site profissional para clínica e consultório com especialidades, localização e agendamento. Peça uma prévia grátis pelo Instagram.",
  },
  {
    slug: "loja",
    nome: "Loja",
    icone: "sacola",
    frase: "Sua loja aberta 24 horas.",
    titulo: "Sua loja aberta 24 horas",
    subtitulo:
      "Um catálogo online com seus produtos e novidades, para o cliente escolher e comprar pelo Direct.",
    beneficios: [
      { icone: "sacola", titulo: "Catálogo de produtos", texto: "Fotos, tamanhos, cores e preços organizados por categoria." },
      { icone: "brilho", titulo: "Novidades", texto: "Destaque os lançamentos e as promoções da semana." },
      { icone: "mensagem", titulo: "Compra pelo Direct", texto: "Cada produto com um botão para o cliente te chamar e comprar." },
      { icone: "lupa", titulo: "Apareça no Google", texto: "Seja encontrado por quem procura o que você vende." },
    ],
    layout: 2,
    seoTitulo: "Site e catálogo online para loja",
    seoDescricao:
      "Catálogo online e site para loja, com produtos, novidades e compra pelo Direct do Instagram. Peça uma prévia grátis.",
  },
  {
    slug: "pet-shop",
    nome: "Pet shop",
    icone: "patinha",
    frase: "O pet shop que o tutor encontra primeiro.",
    titulo: "O pet shop que o tutor encontra primeiro",
    subtitulo:
      "Banho, tosa, produtos e agendamento em um site que conquista o tutor (e o pet).",
    beneficios: [
      { icone: "patinha", titulo: "Banho e tosa", texto: "Serviços, portes e preços explicados de um jeito simples." },
      { icone: "sacola", titulo: "Produtos", texto: "Rações, acessórios e petiscos em uma vitrine organizada." },
      { icone: "calendario", titulo: "Agendamento", texto: "O tutor marca o horário sem precisar ligar." },
      { icone: "mapa", titulo: "Localização", texto: "Fácil de achar para quem está passeando com o pet por perto." },
    ],
    layout: 4,
    seoTitulo: "Site para pet shop",
    seoDescricao:
      "Site para pet shop com banho e tosa, produtos, agendamento e localização. Peça uma prévia grátis pelo Instagram.",
  },
  {
    slug: "academia",
    nome: "Academia",
    icone: "haltere",
    frase: "Mais alunos chegando pelo Google.",
    titulo: "Mais alunos chegando pelo Google",
    subtitulo:
      "Planos, horários, modalidades e estrutura em um site que convence o aluno a fazer a primeira aula.",
    beneficios: [
      { icone: "etiqueta", titulo: "Planos e horários", texto: "Valores e horários claros para o aluno decidir rápido." },
      { icone: "haltere", titulo: "Modalidades", texto: "Musculação, funcional, lutas, dança — cada uma com seu espaço." },
      { icone: "imagem", titulo: "Estrutura", texto: "Mostre seus equipamentos e o ambiente da sua academia." },
      { icone: "estrela", titulo: "Aula experimental", texto: "Um convite direto para o aluno conhecer você de perto." },
    ],
    layout: 1,
    seoTitulo: "Site para academia",
    seoDescricao:
      "Site para academia e estúdio com planos, horários, modalidades e aula experimental. Peça uma prévia grátis pelo Instagram.",
  },
];

/* ------------------------------------------------------------
 * Perguntas frequentes (página /duvidas)
 * Revise as respostas para que reflitam exatamente como você trabalha.
 * ---------------------------------------------------------- */
export type Pergunta = { pergunta: string; resposta: string };

export const faq: Pergunta[] = [
  {
    pergunta: "Já tenho Instagram, preciso de um site?",
    resposta:
      "O Instagram é ótimo para quem já te segue. O site é para quem ainda não te conhece: ele aparece no Google quando alguém procura o que você oferece, passa mais confiança e reúne tudo (serviços, preços, endereço e contato) em um só lugar. Um completa o outro.",
  },
  {
    pergunta: "Como funciona a prévia grátis?",
    resposta: `Você me manda pelo Direct o nome do seu negócio, o ramo e, se quiser, seu Instagram e uma cor preferida. Em até ${site.prazoPrevia} eu te envio uma prévia de como o seu site pode ficar. Se gostar, a gente fecha. Se não gostar, tudo bem — você não paga nada.`,
  },
  {
    pergunta: "Quanto tempo demora para o site ficar pronto?",
    resposta:
      "Depende do plano e de quanto conteúdo o site vai ter. Depois que você aprova a prévia e me envia as informações, eu te passo um prazo certinho pelo Direct antes de começar.",
  },
  {
    pergunta: "Tem mensalidade?",
    resposta:
      "Os valores de cada plano, incluindo domínio e hospedagem, são combinados com você antes de fechar, sem letras miúdas e sem surpresa. Me chama no Direct que eu explico certinho para o seu caso.",
  },
  {
    pergunta: "Consigo mudar o site depois?",
    resposta:
      "Sim. O site não fica engessado: se precisar trocar um preço, uma foto ou um horário, é só me chamar no Direct.",
  },
  {
    pergunta: "Preciso entender de tecnologia?",
    resposta:
      "Não. Você não precisa entender nada de tecnologia: domínio, hospedagem, configuração e publicação ficam por minha conta. Você só me conta sobre o seu negócio.",
  },
];

/* ------------------------------------------------------------
 * Depoimentos — DESATIVADOS por padrão.
 * Quando tiver depoimentos REAIS de clientes:
 *   1. Troque `ativo: false` por `ativo: true`;
 *   2. Preencha a lista `itens` (pode copiar o exemplo comentado).
 * A seção aparece automaticamente na página inicial.
 * ---------------------------------------------------------- */
export type Depoimento = { nome: string; negocio: string; texto: string };

export const depoimentos: { ativo: boolean; titulo: string; itens: Depoimento[] } = {
  ativo: false,
  titulo: "Quem já está no digital",
  itens: [
    // { nome: "Nome do cliente", negocio: "Nome do negócio", texto: "O que o cliente falou." },
  ],
};

/* ------------------------------------------------------------
 * Menus (normalmente não precisa mexer)
 * ---------------------------------------------------------- */
export const menuPrincipal = [
  { rotulo: "Início", href: "/" },
  { rotulo: "Modelos", href: "/modelos" },
  { rotulo: "Nichos", href: "/nichos" },
  { rotulo: "Planos", href: "/planos" },
  { rotulo: "Dúvidas", href: "/duvidas" },
];

export const menuRodape = [
  ...menuPrincipal,
  { rotulo: "Como funciona", href: "/como-funciona" },
  { rotulo: "Prévia grátis", href: "/previa-gratis" },
];
