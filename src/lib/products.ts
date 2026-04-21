import vestidoFloral from "@/assets/p-vestido-floral.jpg";
import camisaLinho from "@/assets/p-camisa-linho.jpg";
import jeansSlim from "@/assets/p-jeans-slim.jpg";
import tenis from "@/assets/p-tenis.jpg";
import bolsa from "@/assets/p-bolsa.jpg";
import jaqueta from "@/assets/p-jaqueta.jpg";
import shorts from "@/assets/p-shorts.jpg";
import oculos from "@/assets/p-oculos.jpg";
import sueter from "@/assets/p-sueter.jpg";
import saia from "@/assets/p-saia.jpg";
import camiseta from "@/assets/p-camiseta.jpg";
import relogio from "@/assets/p-relogio.jpg";

export type ProductCategory = "feminino" | "masculino" | "calcados" | "acessorios";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  details: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  badge?: "novo" | "oferta" | "esgotando";
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "vestido-midi-floral-rosella",
    name: "Vestido Midi Floral Rosella",
    category: "feminino",
    categoryLabel: "Vestidos",
    price: 189.9,
    oldPrice: 249.9,
    image: vestidoFloral,
    description:
      "Vestido midi em viscose com estampa floral exclusiva, modelagem fluida e cinto de amarração na cintura.",
    details: [
      "Composição: 100% Viscose",
      "Forro interno em algodão",
      "Lavar à mão em água fria",
      "Modelagem soltinha, fiel ao tamanho",
    ],
    sizes: ["PP", "P", "M", "G", "GG"],
    colors: [
      { name: "Floral Rosê", hex: "#b97a6a" },
      { name: "Floral Marinho", hex: "#1f2a44" },
    ],
    badge: "oferta",
    featured: true,
  },
  {
    id: "2",
    slug: "camisa-linho-essential",
    name: "Camisa Linho Essential",
    category: "masculino",
    categoryLabel: "Camisas",
    price: 219.9,
    image: camisaLinho,
    description:
      "Camisa de linho puro com caimento clássico, ideal para dias quentes e composições sofisticadas.",
    details: [
      "Composição: 100% Linho europeu",
      "Botões em madrepérola natural",
      "Bolso frontal estruturado",
      "Lavagem suave a 30°C",
    ],
    sizes: ["P", "M", "G", "GG", "XGG"],
    colors: [
      { name: "Off-White", hex: "#f1ebdf" },
      { name: "Areia", hex: "#c9b393" },
    ],
    badge: "novo",
    featured: true,
  },
  {
    id: "3",
    slug: "jeans-slim-indigo",
    name: "Jeans Slim Indigo",
    category: "masculino",
    categoryLabel: "Calças",
    price: 259.9,
    oldPrice: 329.9,
    image: jeansSlim,
    description:
      "Jeans slim em algodão com elastano, lavagem indigo profundo e acabamento premium em cinco bolsos.",
    details: [
      "Composição: 98% Algodão / 2% Elastano",
      "Cintura média, perna afunilada",
      "Zíper YKK e botão metálico",
      "Lavar do avesso",
    ],
    sizes: ["38", "40", "42", "44", "46", "48"],
    colors: [{ name: "Indigo", hex: "#1e3a5f" }],
    badge: "oferta",
    featured: true,
  },
  {
    id: "4",
    slug: "tenis-couro-minimal",
    name: "Tênis Couro Minimal",
    category: "calcados",
    categoryLabel: "Tênis",
    price: 449.9,
    image: tenis,
    description:
      "Tênis em couro legítimo com construção artesanal, solado em borracha leve e palmilha em memory foam.",
    details: [
      "Cabedal: Couro bovino premium",
      "Solado em borracha vulcanizada",
      "Palmilha removível em memory foam",
      "Produzido no Brasil",
    ],
    sizes: ["37", "38", "39", "40", "41", "42", "43"],
    colors: [
      { name: "Off-White", hex: "#f3ede1" },
      { name: "Preto", hex: "#1a1a1a" },
    ],
    featured: true,
  },
  {
    id: "5",
    slug: "bolsa-tote-couro",
    name: "Bolsa Tote Couro Caramelo",
    category: "acessorios",
    categoryLabel: "Bolsas",
    price: 389.9,
    image: bolsa,
    description:
      "Tote bag em couro legítimo de costura aparente, espaçosa e com bolso interno em zíper.",
    details: [
      "Couro bovino curtido ao vegetal",
      "Forro em algodão estonado",
      "Dimensões: 38 x 32 x 14 cm",
      "Alças em couro reforçado",
    ],
    sizes: ["Único"],
    colors: [{ name: "Caramelo", hex: "#9b5b2a" }],
    badge: "novo",
  },
  {
    id: "6",
    slug: "jaqueta-jeans-classic",
    name: "Jaqueta Jeans Classic",
    category: "feminino",
    categoryLabel: "Jaquetas",
    price: 299.9,
    oldPrice: 379.9,
    image: jaqueta,
    description:
      "Jaqueta jeans com modelagem oversized, lavagem média e detalhes em costura contrastante.",
    details: [
      "Composição: 100% Algodão",
      "Botões metálicos antiqued",
      "Modelagem oversized",
      "Bolsos frontais e laterais",
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: [{ name: "Indigo Médio", hex: "#3e5c7e" }],
    badge: "oferta",
  },
  {
    id: "7",
    slug: "shorts-linho-praia",
    name: "Shorts Linho Praia",
    category: "masculino",
    categoryLabel: "Shorts",
    price: 159.9,
    image: shorts,
    description:
      "Shorts em mistura de linho e algodão com cordão interno, leve e perfeito para o verão litorâneo.",
    details: [
      "Composição: 55% Linho / 45% Algodão",
      "Cordão ajustável interno",
      "Bolsos laterais e traseiro",
      "Comprimento acima do joelho",
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Areia", hex: "#e3d3b3" },
      { name: "Verde Oliva", hex: "#6b6a3a" },
    ],
  },
  {
    id: "8",
    slug: "oculos-aviador-noir",
    name: "Óculos Aviador Noir",
    category: "acessorios",
    categoryLabel: "Óculos",
    price: 229.9,
    image: oculos,
    description:
      "Óculos de sol em metal com lentes polarizadas categoria 3 e proteção UV400.",
    details: [
      "Armação em metal leve",
      "Lentes polarizadas UV400",
      "Acompanha case e flanela",
      "Garantia de 12 meses",
    ],
    sizes: ["Único"],
    colors: [{ name: "Preto", hex: "#0f0f0f" }],
    badge: "novo",
  },
  {
    id: "9",
    slug: "sueter-trico-cashmere",
    name: "Suéter Tricô Cashmere",
    category: "feminino",
    categoryLabel: "Tricôs",
    price: 349.9,
    image: sueter,
    description:
      "Suéter em tricô com toque cashmere, gola redonda e modelagem confortável de uso diário.",
    details: [
      "Composição: 70% Algodão / 30% Cashmere",
      "Tricô grosso cardado",
      "Modelagem regular",
      "Lavar à mão",
    ],
    sizes: ["P", "M", "G"],
    colors: [
      { name: "Cru", hex: "#ede2cc" },
      { name: "Caramelo", hex: "#a87445" },
    ],
  },
  {
    id: "10",
    slug: "saia-plissada-midi",
    name: "Saia Plissada Midi",
    category: "feminino",
    categoryLabel: "Saias",
    price: 199.9,
    image: saia,
    description:
      "Saia midi plissada em cetim com cintura alta elasticada, leve e com caimento fluido.",
    details: [
      "Composição: 100% Poliéster cetim",
      "Cintura alta elasticada",
      "Comprimento midi",
      "Lavar à mão",
    ],
    sizes: ["PP", "P", "M", "G"],
    colors: [
      { name: "Champagne", hex: "#e8d8b0" },
      { name: "Preto", hex: "#1a1a1a" },
    ],
  },
  {
    id: "11",
    slug: "camiseta-pima-essential",
    name: "Camiseta Pima Essential",
    category: "masculino",
    categoryLabel: "Camisetas",
    price: 119.9,
    image: camiseta,
    description:
      "Camiseta em algodão Pima peruano, gola careca e acabamento premium em barras dobradas.",
    details: [
      "Composição: 100% Algodão Pima",
      "Gola e barras reforçadas",
      "Modelagem regular",
      "Não desbota",
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Branco", hex: "#ffffff" },
      { name: "Preto", hex: "#0f0f0f" },
      { name: "Areia", hex: "#d6c3a3" },
    ],
  },
  {
    id: "12",
    slug: "relogio-classic-couro",
    name: "Relógio Classic Couro",
    category: "acessorios",
    categoryLabel: "Relógios",
    price: 549.9,
    oldPrice: 699.9,
    image: relogio,
    description:
      "Relógio analógico minimalista com pulseira em couro legítimo e mostrador preto fosco.",
    details: [
      "Caixa em aço inox 40mm",
      "Pulseira em couro legítimo",
      "Movimento japonês quartzo",
      "Resistência à água 3 ATM",
    ],
    sizes: ["Único"],
    colors: [{ name: "Marrom", hex: "#5b3520" }],
    badge: "oferta",
  },
];

export const CATEGORIES: { slug: ProductCategory; label: string; description: string }[] = [
  { slug: "feminino", label: "Feminino", description: "Vestidos, blusas, saias e tricôs" },
  { slug: "masculino", label: "Masculino", description: "Camisas, calças e camisetas" },
  { slug: "calcados", label: "Calçados", description: "Tênis, sapatos e sandálias" },
  { slug: "acessorios", label: "Acessórios", description: "Bolsas, óculos e relógios" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeatured(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getOnSale(): Product[] {
  return PRODUCTS.filter((p) => p.oldPrice);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q),
  );
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
