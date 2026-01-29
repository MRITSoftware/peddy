# Banco de Dados JSON - Sistema de Gestão de Restaurante

Este sistema utiliza um arquivo JSON (`database.json`) para armazenar dados de teste, funcionando como um banco de dados simples.

## Estrutura do Arquivo `database.json`

O arquivo contém a seguinte estrutura:

```json
{
  "restaurante": { ... },      // Dados do restaurante
  "cardapio": [ ... ],         // Lista de produtos
  "pedidos": [ ... ],          // Pedidos ativos
  "pedidosFinalizados": [ ... ], // Pedidos finalizados
  "motoboys": [ ... ],         // Entregadores cadastrados
  "categorias": [ ... ],       // Categorias de produtos
  "proximoNumeroPedido": 1,    // Contador para pedidos de mesa
  "proximoNumeroPedidoOnline": 1,  // Contador para pedidos online
  "proximoNumeroPedidoBalcao": 1,  // Contador para pedidos balcão
  "configuracao": { ... }      // Configurações do sistema
}
```

## Funcionalidades

### 1. Salvamento Automático
O sistema salva automaticamente no `database.json` sempre que houver alterações:
- ✅ **Ambiente Node.js**: Salva diretamente no arquivo
- ✅ **Ambiente Web com Servidor**: Salva via API (`/api/save-database`)
- ✅ **Ambiente Web sem Servidor**: Prepara dados para sincronização

### 2. Carregamento Automático
O sistema tenta carregar dados do arquivo `database.json` automaticamente ao iniciar.

### 3. Exportar Dados
Para exportar os dados atuais para um arquivo JSON:

```javascript
// No console do navegador ou no código
dataManager.exportarParaJSON();
```

Isso criará um download do arquivo JSON com todos os dados atuais.

### 4. Forçar Exportação do database.json
Para forçar o download do arquivo `database.json` atualizado:

```javascript
dataManager.forcarExportacaoDatabase();
```

### 5. Importar Dados
Para importar dados de um arquivo JSON:

```javascript
// Ler o arquivo JSON
fetch('database.json')
  .then(response => response.json())
  .then(dados => {
    const jsonString = JSON.stringify(dados);
    dataManager.importarDeJSON(jsonString);
  });
```

Ou manualmente:

```javascript
const jsonString = '{"restaurante": {...}, ...}';
dataManager.importarDeJSON(jsonString);
```

## Configuração do Servidor (Opcional)

Para salvar automaticamente no `database.json` em ambiente web, você pode usar o servidor Node.js incluído:

### Instalação
```bash
npm install
```

### Executar Servidor
```bash
npm start
# ou
node api-server.js
```

O servidor estará disponível em `http://localhost:3000` e permitirá que o sistema salve automaticamente no `database.json`.

## Como Usar para Testes

### 1. Preparar Dados de Teste
Edite o arquivo `database.json` diretamente para adicionar:
- Produtos de teste
- Pedidos de exemplo
- Entregadores
- Categorias

### 2. Resetar Dados
Para resetar todos os dados para o estado inicial:

```javascript
dataManager.resetData();
```

### 3. Salvar Dados Atuais
Os dados são salvos automaticamente no `localStorage` sempre que há alterações. Para exportar para JSON:

```javascript
dataManager.exportarParaJSON();
```

## Estrutura de Dados

### Restaurante
```json
{
  "nome": "Nome do Restaurante",
  "cnpj": "12.345.678/0001-90",
  "logo": "URL da logo",
  "telefone": "(11) 98765-4321",
  "endereco": "Endereço completo"
}
```

### Produto (Cardápio)
```json
{
  "id": 1,
  "nome": "Nome do Produto",
  "categoria": "Categoria",
  "preco": 18.90,
  "imagem": "URL da imagem",
  "descricao": "Descrição do produto",
  "tags": ["popular"],
  "pratoDoDia": ["segunda"]
}
```

### Pedido
```json
{
  "id": "B001",
  "cliente": "Nome do Cliente",
  "telefone": "(11) 98765-4321",
  "tipo": "entrega",
  "endereco": "Endereço de entrega",
  "itens": [
    {
      "produtoId": 1,
      "nome": "Nome do Produto",
      "quantidade": 2,
      "preco": 18.90
    }
  ],
  "observacoes": "Observações do pedido",
  "pagamento": "Pix",
  "status": "recebido",
  "dataCriacao": "2024-01-01T10:00:00.000Z",
  "numeroMesa": null,
  "tipoVenda": "balcao"
}
```

### Motoboy
```json
{
  "id": "MOT001",
  "nome": "Nome do Entregador",
  "telefone": "(11) 91111-1111",
  "placa": "ABC-1234",
  "status": "disponível",
  "pedidosAtribuidos": []
}
```

### Categoria
```json
{
  "id": 1,
  "nome": "Lanches",
  "ativa": true
}
```

## Notas Importantes

1. **Backup**: Sempre faça backup do arquivo `database.json` antes de fazer alterações importantes.

2. **Formato**: O arquivo deve estar em formato JSON válido. Use um editor de texto ou validador JSON.

3. **IDs**: Os IDs devem ser únicos. Para produtos, use números sequenciais. Para pedidos, use o formato: `B001`, `O001`, `PED001`.

4. **Datas**: As datas devem estar no formato ISO 8601: `"2024-01-01T10:00:00.000Z"`

5. **Sincronização Automática**: 
   - O sistema salva automaticamente no `localStorage` do navegador
   - Com servidor Node.js, salva automaticamente no `database.json`
   - Sem servidor, use `dataManager.forcarExportacaoDatabase()` para atualizar o arquivo

6. **Ambiente Web sem Servidor**: 
   - Os dados são salvos no `localStorage`
   - Use `dataManager.forcarExportacaoDatabase()` periodicamente para manter o `database.json` atualizado
   - Ou configure o servidor Node.js para sincronização automática

## Exemplo de Uso Completo

```javascript
// 1. Exportar dados atuais
const jsonExportado = dataManager.exportarParaJSON();

// 2. Editar o arquivo database.json manualmente

// 3. Recarregar a página ou importar novamente
dataManager.carregarDeArquivoJSON();

// 4. Resetar para dados iniciais
dataManager.resetData();
```
