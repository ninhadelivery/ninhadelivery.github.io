# Ninha Delivery

PWA de pedidos de lanche da Ninha. O cliente cadastra nome e celular, monta a tapioca
(2 sabores R$ 9,00 / 3 sabores R$ 10,00) e o pedido abre no WhatsApp com a mensagem pronta
para a Ninha (+55 81 98364-0068).

Site estático, sem build e sem backend.

## Estrutura

```
index.html            app (HTML + CSS + JS)
manifest.webmanifest  nome, cores e ícones do app instalado
sw.js                 service worker (funciona offline, cache das fontes)
img/                  foto da Ninha (logo) e da tapioca (card)
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
- `PRECO` e `SABORES`: preços e sabores da tapioca.

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
