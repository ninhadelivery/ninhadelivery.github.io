# Ninha Delivery

PWA de pedidos de lanche da Ninha. O cliente cadastra nome e celular, escolhe o lanche no
cardápio e o pedido abre no WhatsApp com a mensagem pronta para a Ninha (+55 81 98364-0068).

| Lanche | Opções | Preço |
|---|---|---|
| Tapioca | 2 ou 3 sabores | R$ 9,00 / R$ 10,00 |
| Cuscuz recheado | 3 recheios | R$ 12,00 |
| Sanduíche americano | salada, ovo, queijo e presunto | R$ 12,00 |
| Sanduíche misto | queijo e presunto | R$ 8,00 |

Sabores/recheios: frango, charque, queijo, calabresa.

Site estático, sem build e sem backend.

## Estrutura

```
index.html            app (HTML + CSS + JS)
manifest.webmanifest  nome, cores e ícones do app instalado
sw.js                 service worker (funciona offline, cache das fontes)
img/                  foto da Ninha (logo) e fotos dos lanches (cards)
icons/                ícones 192/512, maskable e apple-touch-icon
```

## Rodar local

```
npx serve .
```

Abrir http://localhost:3000. Service worker só funciona em `localhost` ou HTTPS.

## Configuração

Em `index.html`:

- `NINHA`: número da Ninha no formato DDI+DDD+número (`5581983640068`).
- `SABORES`: sabores/recheios disponíveis.
- `CARDAPIO`: lanches, fotos, descrição e preços. Para adicionar um lanche, inclua um item
  na lista e a foto em `img/` (16:9). Itens com `escolha` pedem sabores/recheios.

Depois de alterar qualquer arquivo, suba `VERSION` em `sw.js` (`v1` → `v2`) para os
celulares baixarem a nova versão.

## Publicar

Qualquer hospedagem estática com HTTPS serve:

- **Netlify**: arrastar a pasta em https://app.netlify.com/drop
- **Vercel**: `npx vercel --prod`
- **GitHub Pages**: subir num repositório e ativar Pages na branch `main`

## Instalar no celular

- **Android (Chrome)**: menu ⋮ → *Instalar app*.
- **iPhone (Safari)**: Compartilhar → *Adicionar à Tela de Início*.
