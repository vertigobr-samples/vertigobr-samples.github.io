# vertigobr-samples.github.io

Site do GitHub Pages da org `vertigobr-samples`. Hoje publica as páginas de autorização OAuth usadas pelos exemplos de Supabase da Vertigo, uma por projeto Supabase.

| Página | Endereço |
| --- | --- |
| Autorização OAuth (dev) | `https://vertigobr-samples.github.io/oauth/consent/` |
| Autorização OAuth (prod) | `https://vertigobr-samples.github.io/oauth/consent-prod/` |

As páginas são estáticas (`docs/oauth/*/index.html`) e compartilham a lógica de `docs/oauth/consent.js`. O Supabase Auth manda o navegador para ela quando um cliente OAuth pede acesso. Ela faz o login com Google, aprova sozinha o cliente do Claude e nega qualquer outro aplicativo.

Publicação: *Settings → Pages*, branch `main`, pasta `/docs`.

Tudo neste repositório é público por definição. Cada página só contém a URL do projeto Supabase, a publishable key e o Client ID do Claude, que o navegador precisa de qualquer forma.
