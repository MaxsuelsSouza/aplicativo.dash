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

Por padrão o app se conecta ao backend local. Se nenhuma URL for definida na
variável `EXPO_PUBLIC_API_URL`, o endereço utilizado será `http://localhost:3000/api`
no iOS ou `http://10.0.2.2:3000/api` em emuladores Android. Para usar outro
servidor, defina `EXPO_PUBLIC_API_URL` (ou crie um arquivo `.env`) antes de
iniciar o Expo:

```sh
EXPO_PUBLIC_API_URL="https://meu-servidor" npx expo start
```

Veja o exemplo em [`mobile/src/.env.example`](mobile/src/.env.example).

## Camada de API

As requisições para o backend são centralizadas no objeto `api`,
definido em [`mobile/src/utils/Api.ts`](mobile/src/utils/Api.ts).
Utilize esse objeto para realizar `GET`, `POST`, `PUT` e `DELETE`.

## Ignorando o Safe Area

Se alguma tela não deve respeitar o espaçamento aplicado automaticamente pelo
`SafeAreaContainer`, adicione o prefixo do caminho da rota em
[`mobile/src/constants/safeArea.ts`](mobile/src/constants/safeArea.ts) no array
`SAFE_AREA_DISABLED_ROUTES`.

