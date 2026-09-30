# Publicacao do site Trixus na VPS

## Requisitos

- VPS Linux com Docker, Docker Compose e Nginx.
- Registros DNS de `trixus.com.br` e `www.trixus.com.br` apontando para a VPS.
- Certificado TLS valido para os dois nomes.
- Conta SMTP autorizada a enviar pelo dominio `trixus.com.br`.

## Configuracao

1. Copie `.env.example` para `.env` somente na VPS.
2. Preencha as credenciais SMTP reais. Nunca use nomes `VITE_*` para segredos.
3. Mantenha `TRUST_PROXY=true` apenas quando a porta 3000 estiver acessivel exclusivamente pelo Nginx local.
4. Configure SPF, DKIM e DMARC no DNS do dominio.

## Build e execucao

```sh
docker compose build
docker compose up -d
docker compose ps
```

O processo fica em `127.0.0.1:3000`; somente o Nginx deve ficar exposto a internet.

## Nginx e HTTPS

O modelo esta em `deploy/nginx/trixus.conf`. Em uma instalacao nova, obtenha o
certificado antes de ativar os blocos HTTPS. Depois valide e recarregue o Nginx.

## Verificacoes

- `GET /health` retorna `{ "status": "ok" }`.
- `http://trixus.com.br` redireciona para `https://www.trixus.com.br`.
- O formulario envia sem abrir Gmail, Outlook ou outro aplicativo.
- A mensagem chega ao destino e permite responder ao e-mail do visitante.
- Nenhuma credencial SMTP aparece no HTML ou nos arquivos JavaScript do cliente.

## Atualizacao e rollback

Antes de atualizar, registre a revisao ou tag atualmente publicada. Gere a nova
imagem, valide o health check e so entao substitua o container. Em caso de falha,
republique a imagem correspondente a revisao anterior.
