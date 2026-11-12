# vertigobr-samples.github.io

Site do GitHub Pages da org `vertigobr-samples`. Hoje publica uma única página: a página de autorização OAuth usada pelos exemplos de Supabase da Vertigo.

| Página | Endereço |
| --- | --- |
| Autorização OAuth | `https://vertigobr-samples.github.io/oauth/consent/` |

A página é estática (`docs/oauth/consent/index.html`). O Supabase Auth manda o navegador para ela quando um cliente OAuth pede acesso. Ela faz o login com Google, aprova sozinha o cliente do Claude e nega qualquer outro aplicativo.

Publicação: *Settings → Pages*, branch `main`, pasta `/docs`.

Tudo neste repositório é público por definição. A página só contém a URL do projeto Supabase, a publishable key e o Client ID do Claude, que o navegador precisa de qualquer forma.
