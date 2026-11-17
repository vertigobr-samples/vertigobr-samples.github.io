# AGENTS.md

Instruções para agentes que trabalham neste repositório.

## O que é

Repositório **público** do GitHub Pages da org `vertigobr-samples`. Ele publica a pasta `docs/` em `https://vertigobr-samples.github.io/`. Hoje publica as páginas de autorização OAuth do exemplo `supabase-function-sample`, que é privado: uma por projeto Supabase.

| Página | Projeto | Arquivo |
| --- | --- | --- |
| `/oauth/consent/` | dev (`ljjnkxwwqisjneyimcqb`) | `docs/oauth/consent/index.html` |
| `/oauth/consent-prod/` | prod (`ivuoyiwwqojaoqvhixmb`) | `docs/oauth/consent-prod/index.html` |

Cada página só define `window.CONFIG` (URL do projeto, publishable key e Client ID do Claude daquele projeto) e carrega a lógica comum de `docs/oauth/consent.js`. Há uma página por projeto porque o Supabase manda o navegador para ela só com o `authorization_id`, sem dizer de qual projeto veio o pedido.

## Regra do repositório público

Só entra aqui o que o navegador precisa de qualquer forma:
- URLs públicas;
- o ref do projeto Supabase;
- a publishable key;
- o Client ID do Claude.

Nunca entram:
- secret keys, Client Secrets ou tokens;
- nomes de infraestrutura interna (projetos GCP, orgs, planos);
- riscos em aberto ou pendências de segurança;
- e-mails de pessoas.

## A página de autorização

- O Supabase Auth monta o endereço dela como *Site URL* + *Authorization Path*, configurados no dashboard de cada projeto:
  - Site URL: `https://vertigobr-samples.github.io`
  - Authorization Path: `/oauth/consent/` (dev) ou `/oauth/consent-prod/` (prod)
  - Mudar o caminho de uma página exige mudar o *Authorization Path* e as *Redirect URLs* no projeto Supabase correspondente.
- Sem sessão, a página vai direto para o login Google. Com sessão, aprova só quando o cliente é o do Claude (`claudeClientId`) com o redirect `https://claude.ai/api/mcp/auth_callback`, e nega qualquer outro, sem botão.
- O nome do cliente vem do Supabase e é exibido só como texto (`textContent`), nunca como HTML.
- O `supabase-js` vem do jsdelivr com versão fixa. Atualize a versão de forma deliberada e teste o fluxo.

## Fluxo de trabalho

- Português em commits, PRs e textos.
- Mudanças por PR na `main`, com merge squash e uma branch nova por PR.
- Depois de qualquer mudança em `consent.js`, teste o fluxo real nos dois projetos; depois de mudar uma página, no projeto dela: desconecte e conecte o conector do Claude e pergunte "quem sou eu?".
