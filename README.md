# App Financeiro

Aplicativo mobile para gestão financeira. Este repositório contém apenas o código do app desenvolvido com Expo Router.

## Executando o app

Acesse a pasta do projeto mobile e instale as dependências:

```sh
cd mobile/src
npm install
npx expo start
```

Abra o aplicativo utilizando o Expo Go ou um simulador.

## Configurando o backend

Por padrão o app se conecta ao backend local em
`http://localhost:3000/api`. Caso seja necessário usar
outro servidor, defina a variável `EXPO_PUBLIC_API_URL` (ou crie um arquivo
`.env`) antes de iniciar o Expo:

```sh
EXPO_PUBLIC_API_URL="https://meu-servidor" npx expo start
```

Veja o exemplo em [`mobile/src/.env.example`](mobile/src/.env.example).

