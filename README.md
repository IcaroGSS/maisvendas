# MaisVendas — site

Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion. Site 100% estático (gera a pasta `out/`).

## Rodar no computador

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Editar textos, preços e nichos

Tudo fica em `src/config/site.ts`:

- `site.prazoPrevia` — prazo da prévia grátis (ex.: `"3 dias"`).
- `site.corDestaque` — cor dos botões (ex.: `"#22C55E"`).
- `site.url` — endereço final do site (usado no Google e no sitemap).
- `planos` — nome, `preco` (só o número), itens e `destaque: true` em um deles.
- `nichos` — cada item vira uma página `/nichos/[slug]`.
- `faq` — perguntas e respostas da página Dúvidas.
- `depoimentos` — troque `ativo: false` para `true` e preencha `itens` quando tiver depoimentos reais.

A imagem de compartilhamento fica em `public/og.png` (1200×630).

## Publicar na Vercel

1. Suba a pasta para um repositório no GitHub.
2. Em vercel.com → **Add New → Project** → importe o repositório → **Deploy** (a Vercel detecta Next.js sozinha).
3. Cada `git push` publica uma nova versão.
4. Domínio próprio: Project → **Settings → Domains**. Depois, atualize `site.url` no arquivo de configuração.
