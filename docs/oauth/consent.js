// Lógica comum das páginas de autorização. Cada página define window.CONFIG
// (URL do projeto, publishable key e Client ID do Claude) e carrega este script.
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/+esm";

const $ = (id) => document.getElementById(id);
const status = (texto, erro = false) => {
  $("status").textContent = texto;
  $("status").className = erro ? "erro" : "";
  $("status").hidden = !texto;
};

const authorizationId = new URL(location.href).searchParams.get("authorization_id");
if (!authorizationId) {
  status("Pedido de autorização inválido: falta authorization_id.", true);
  throw new Error("authorization_id ausente");
}

const supabase = createClient(window.CONFIG.supabaseUrl, window.CONFIG.publishableKey, {
  auth: { flowType: "pkce", detectSessionInUrl: true },
});

// Só o Claude é autorizado, e sem perguntar. Qualquer outro cliente é negado,
// para não existir um botão "Autorizar" que alguém possa ser induzido a clicar.
const CALLBACK_DO_CLAUDE = "https://claude.ai/api/mcp/auth_callback";

const entrarComGoogle = () => {
  const volta = new URL(location.origin + location.pathname);
  volta.searchParams.set("authorization_id", authorizationId);
  supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: volta.toString() },
  });
};

const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  const erroDoLogin = new URL(location.href).searchParams.get("error_description");
  if (erroDoLogin) {
    status(`O login falhou: ${erroDoLogin}`, true);
    $("login").hidden = false;
    $("entrar").onclick = entrarComGoogle;
  } else {
    status("Indo para o login do Google…");
    entrarComGoogle();
  }
} else {
  const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(authorizationId);
  if (error) {
    status(`Não foi possível carregar o pedido: ${error.message}`, true);
  } else if (!("authorization_id" in data)) {
    location.href = data.redirect_url;
  } else if (
    data.client.id === window.CONFIG.claudeClientId &&
    data.redirect_uri === CALLBACK_DO_CLAUDE
  ) {
    status("Autorizando o Claude…");
    const { error } = await supabase.auth.oauth.approveAuthorization(authorizationId);
    if (error) status(`Falhou: ${error.message}`, true);
  } else {
    await supabase.auth.oauth.denyAuthorization(authorizationId, { skipBrowserRedirect: true });
    status("Este aplicativo não está autorizado a acessar as ferramentas da Vertigo.", true);
  }
}
  
