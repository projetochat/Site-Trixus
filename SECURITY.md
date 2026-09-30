# Segurança

## Relato responsável

Não publique vulnerabilidades, credenciais, dados pessoais ou detalhes de
infraestrutura em issues públicas.

Envie relatos de segurança para `contato@trixus.com.br`, incluindo uma descrição
do problema, impacto estimado e passos mínimos para reprodução. Não inclua dados
de clientes reais.

## Segredos

- Credenciais e tokens devem existir somente no `.env` da VPS ou no gerenciador
  de segredos do ambiente.
- Nunca envie arquivos `.env`, chaves privadas, certificados ou dumps ao Git.
- Valores sensíveis não devem usar o prefixo `VITE_`.
