# AGENTS.md

Instruções para agentes que trabalham neste repositório.

## O que é

Repositório **público** do GitHub Pages da org `vertigobr-samples`. Ele publica a pasta `docs/` em `https://vertigobr-samples.github.io/`. Hoje há uma página só: `docs/oauth/consent/index.html`, a página de autorização OAuth do exemplo `supabase-function-sample`, que é privado.

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

- O Supabase Auth monta o endereço dela como *Site URL* + *Authorization Path*:
  - Site URL: `https://vertigobr-samples.github.io`
  - Authorization Path: `/oauth/consent/`
  - Mudar o caminho daqui exige mudar o *Authorization Path* e as *Redirect URLs* no projeto Supabase, e o `config.toml` do repositório do exemplo.
- Sem sessão, a página vai direto para o login Google. Com sessão, aprova só quando o cliente é o do Claude (`claudeClientId`) com o redirect `https://claude.ai/api/mcp/auth_callback`, e nega qualquer outro, sem botão.
- O nome do cliente vem do Supabase e é exibido só como texto (`textContent`), nunca como HTML.
- O `supabase-js` vem do jsdelivr com versão fixa. Atualize a versão de forma deliberada e teste o fluxo.

## Fluxo de trabalho

- Português em commits, PRs e textos.
- Mudanças por PR na `main`, com merge squash e uma branch nova por PR.
- Depois de qualquer mudança na página, teste o fluxo real: desconecte e conecte o conector do Claude e pergunte "quem sou eu?".
