# Site institucional da Trixus

Site público da Trixus, desenvolvido com React, TypeScript e TanStack Start.
O projeto inclui renderização no servidor, formulário de contato com envio SMTP
no backend e configuração para publicação em uma VPS com Docker e Nginx.

## Tecnologias

- React 19
- TypeScript
- TanStack Start e TanStack Router
- Vite e Nitro
- Tailwind CSS
- Bun
- Nodemailer

## Desenvolvimento local

Requisitos: Bun 1.4.2 e Node.js 24 ou superior.

```sh
bun install --frozen-lockfile
bun run dev
```

A aplicação de desenvolvimento fica disponível no endereço exibido pelo Vite.

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha as configurações SMTP. O arquivo
`.env` é ignorado pelo Git e não deve ser enviado ao repositório.

Nunca use o prefixo `VITE_` em senhas, tokens ou credenciais: variáveis com esse
prefixo podem ser incorporadas ao JavaScript entregue ao navegador.

## Verificações

```sh
bun run typecheck
bun run build
```

O build de produção é gerado em `.output`. Para executá-lo localmente:

```sh
bun run start
```

O endpoint `GET /health` pode ser usado pelo Docker e por ferramentas de
monitoramento.

## Publicação

Os arquivos `Dockerfile`, `compose.yml` e `deploy/nginx/trixus.conf` preparam a
aplicação para funcionar como um serviço Node atrás do Nginx. Consulte
[DEPLOYMENT.md](DEPLOYMENT.md) para o procedimento de VPS, domínio, HTTPS, SMTP,
DNS e rollback.

## Segurança

- Credenciais SMTP existem somente no servidor.
- O formulário utiliza validação no backend, proteção CSRF, honeypot e limite por IP.
- O remetente é fixo; o endereço informado pelo visitante é usado como `Reply-To`.
- Arquivos `.env`, builds e dependências não são versionados.

Problemas de segurança não devem ser publicados em issues abertas. Consulte
[SECURITY.md](SECURITY.md).

## Licença

Este repositório não possui licença de código aberto. O código é de uso interno
da Trixus, salvo autorização expressa em contrário.
