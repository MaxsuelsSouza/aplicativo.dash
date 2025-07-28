# Mobile

Aplicativo mobile feito com Expo Router.

Para rodar em modo de desenvolvimento:

```sh
cd src
npm install
npx expo start
```

Em seguida abra o app com o Expo Go ou um emulador.

### Configurando a URL do backend

O app se comunica com o backend especificado na variável de ambiente
`EXPO_PUBLIC_API_URL`. Caso nenhuma seja fornecida, a URL padrão utilizada é
`https://dashnet-production.up.railway.app/api`. Você pode copiar o
arquivo `.env.example` e ajustá-lo conforme necessário.
