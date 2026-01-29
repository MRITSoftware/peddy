# Sistema de Gestão de Restaurante - Demo

Sistema completo de gestão de pedidos para restaurante desenvolvido como demonstração, utilizando dados fictícios em memória (localStorage) sem necessidade de banco de dados real.

## 🚀 Características

- **6 Páginas HTML Interligadas**: Sistema completo de gestão
- **Dados Fictícios**: Todos os dados são armazenados em memória via localStorage
- **Responsivo**: Funciona perfeitamente em desktop, tablet e celular
- **Simulação WebSocket**: Atualizações em tempo real simuladas
- **Interface Intuitiva**: Design limpo e profissional

## 📁 Estrutura de Arquivos

```
Demo_Sis/
├── cliente.html          # Página de pedidos do cliente
├── entregador.html       # Entregador de pedidos
├── cozinha.html          # Painel da cozinha
├── gestor.html           # Painel do gestor
├── produtos.html         # Gerenciamento de produtos
├── relatorios.html       # Relatórios e análises
├── data.js              # Gerenciador de dados fictícios
├── websocket-sim.js     # Simulação de WebSocket
├── styles.css           # Estilos responsivos
└── README.md            # Este arquivo
```

## 🎯 Funcionalidades

### 1. **Página do Cliente** (`cliente.html`)
- Formulário completo para criar pedidos
- Seleção de produtos por categoria
- Suporte para entrega e retirada
- Diferentes formas de pagamento
- Cálculo automático do total

### 2. **Entregador** (`entregador.html`)
- Rastreamento de pedidos em tempo real
- Barra de progresso visual
- Timer desde criação
- Atualização automática a cada 30 segundos
- Botão de ajuda com contato

### 3. **Painel da Cozinha** (`cozinha.html`)
- Visualização de pedidos ativos
- Cards coloridos por status
- Timer de tempo decorrido
- Ações: Iniciar Preparo, Falta Item, Finalizar
- Atualização automática a cada 10 segundos
- Notificações para novos pedidos

### 4. **Painel do Gestor** (`gestor.html`)
- **Frente de Caixa**: Gerenciamento de pedidos, caixa do dia
- **Cozinha**: Visão somente leitura da cozinha
- **Motoboys**: Gerenciamento e atribuição de entregas
- **Dashboard**: Estatísticas e gráficos em tempo real
- Geração de pedidos aleatórios para teste

### 5. **Gerenciamento de Produtos** (`produtos.html`)
- Lista de produtos em cards
- CRUD completo (Criar, Ler, Atualizar, Remover)
- Categorias: Lanches, Pizzas, Bebidas, Acompanhamentos
- Sistema de "Prato do Dia"
- Abas para produtos ativos/inativos

### 6. **Relatórios** (`relatorios.html`)
- Filtros por data
- Cards de resumo (total, produto mais vendido, ticket médio, tempo médio)
- Gráfico de distribuição por forma de pagamento
- Tabela completa de pedidos
- Exportação para CSV

## 🛠️ Como Usar

### Opção 1: Abrir Localmente
1. Baixe todos os arquivos para uma pasta
2. Abra `cliente.html` em um navegador moderno
3. Navegue pelas páginas usando os links

### Opção 2: Servidor Local (Recomendado)
1. Instale um servidor HTTP local (ex: Python, Node.js, Live Server)
2. Se usando Python:
   ```bash
   python -m http.server 8000
   ```
3. Abra `http://localhost:8000/cliente.html` no navegador

### Opção 3: Extensão do VS Code
1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em qualquer arquivo HTML
3. Selecione "Open with Live Server"

## 📊 Dados Fictícios Incluídos

O sistema vem pré-carregado com:
- **Restaurante Demo**: Dados completos do estabelecimento
- **13 Produtos**: Lanches, pizzas, bebidas e acompanhamentos
- **6 Pedidos Ativos**: Com diferentes status para demonstração
- **10 Pedidos Finalizados**: Para relatórios e histórico
- **4 Motoboys**: Com status variados
- **Estatísticas**: Vendas, produtos mais vendidos, etc.

## 🔄 Funcionalidades de Demo

### Reset da Demo
No painel do gestor, há um botão "🔄 Reset Demo" que restaura todos os dados para o estado inicial.

### Gerar Pedido Aleatório
No painel do gestor, use o botão "➕ Gerar Pedido Aleatório" para criar pedidos de teste rapidamente.

### Dados Persistem
Todos os dados são salvos automaticamente no localStorage do navegador. Para limpar:
1. Abra o Console do Navegador (F12)
2. Execute: `localStorage.clear()`
3. Recarregue a página

## 🎨 Personalização

### Alterar Logo do Restaurante
Edite `data.js` na seção `initialRestaurantData.restaurante.logo` com a URL da sua imagem.

### Adicionar Mais Produtos
- Use a página `produtos.html` para adicionar via interface
- Ou edite diretamente o array `cardapio` em `data.js`

### Modificar Cores
Edite as variáveis CSS em `styles.css` na seção `:root`:
```css
:root {
    --primary-color: #FF6B6B;
    --secondary-color: #4ECDC4;
    /* ... outras cores */
}
```

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos responsivos com Grid e Flexbox
- **JavaScript Vanilla**: Sem dependências externas
- **localStorage**: Persistência de dados no navegador
- **WebSocket Simulado**: Atualizações em tempo real

## 📱 Responsividade

O sistema foi desenvolvido com design mobile-first:
- **Desktop**: Layout completo com múltiplas colunas
- **Tablet**: Adaptação automática do grid
- **Mobile**: Interface otimizada para telas pequenas

## 🎯 Fluxo de Trabalho Sugerido

1. **Cliente faz pedido** → `cliente.html`
2. **Cliente acompanha** → `entregador.html`
3. **Cozinha recebe** → `cozinha.html`
4. **Gestor gerencia** → `gestor.html`
5. **Analisa resultados** → `relatorios.html`

## 🐛 Solução de Problemas

### Dados não aparecem
- Verifique se o navegador suporta localStorage
- Limpe o cache e recarregue a página
- Abra o Console (F12) para verificar erros

### Atualizações não funcionam
- Certifique-se de que `websocket-sim.js` está carregado
- Verifique o Console para erros JavaScript
- Recarregue a página

### Páginas não carregam
- Verifique se todos os arquivos estão na mesma pasta
- Use um servidor HTTP local (não apenas abrir o arquivo)
- Verifique o Console para erros de carregamento

## 📝 Notas Importantes

- Este é um sistema de **demonstração**. Não use em produção sem adaptações.
- Todos os dados são armazenados localmente no navegador.
- Para produção, será necessário:
  - Backend real (Node.js, Python, PHP, etc.)
  - Banco de dados (MySQL, PostgreSQL, MongoDB, etc.)
  - WebSocket real (Socket.io, etc.)
  - Autenticação e autorização
  - Validação de dados no servidor

## 📄 Licença

Este projeto é fornecido como está, para fins de demonstração e aprendizado.

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas! Este é um projeto demo para demonstração de funcionalidades.

---

**Desenvolvido para demonstração local de sistema de gestão de restaurante.**

Para suporte ou dúvidas, verifique o código-fonte e os comentários nos arquivos.