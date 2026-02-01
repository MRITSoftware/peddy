# Peddy
Sistema de gestão para restaurante.

## Como manter os dados salvos

Os dados são gravados em **localStorage** do navegador e, quando possível, no arquivo **database.json**.

- **Usando o servidor (recomendado):** Rode `npm start` e acesse **http://localhost:3000**. Os dados são salvos no navegador e no arquivo `database.json`. Ao atualizar a página, tudo permanece.
- **Abrindo os arquivos direto (file://):** Os dados ficam só no **localStorage**. Use sempre o mesmo navegador e a mesma pasta; evite modo anônimo para não perder os dados ao fechar.
