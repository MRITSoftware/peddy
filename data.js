// Sistema de Gestão de Restaurante - Dados Fictícios
// Todos os dados são armazenados em memória e persistidos via localStorage

// Inicializar dados do restaurante
const initialRestaurantData = {
    restaurante: {
        nome: "Restaurante Demo",
        cnpj: "12.345.678/0001-90",
        logo: "https://via.placeholder.com/150/FF6B6B/FFFFFF?text=RD",
        telefone: "(11) 98765-4321",
        endereco: "Av. Demo, 123 - Centro"
    },
    
    cardapio: [
        // Lanches
        { id: 1, nome: "Hambúrguer Clássico", categoria: "Lanches", preco: 18.90, imagem: "https://via.placeholder.com/200/FF6B6B/FFFFFF?text=Hambúrguer", descricao: "Pão, carne, queijo, alface e tomate", tags: ["popular"], pratoDoDia: ["segunda"] },
        { id: 2, nome: "X-Burger", categoria: "Lanches", preco: 22.50, imagem: "https://via.placeholder.com/200/4ECDC4/FFFFFF?text=X-Burger", descricao: "Hambúrguer com bacon e ovo", tags: ["popular"], pratoDoDia: [] },
        { id: 3, nome: "Cheeseburger", categoria: "Lanches", preco: 19.90, imagem: "https://via.placeholder.com/200/FF6B6B/FFFFFF?text=Cheese", descricao: "Hambúrguer duplo com queijo", tags: [], pratoDoDia: ["terça"] },
        { id: 4, nome: "Frango Grelhado", categoria: "Lanches", preco: 21.00, imagem: "https://via.placeholder.com/200/95E1D3/FFFFFF?text=Frango", descricao: "Sanduíche de frango grelhado", tags: [], pratoDoDia: [] },
        
        // Pizzas
        { id: 5, nome: "Pizza Margherita", categoria: "Pizzas", preco: 35.00, imagem: "https://via.placeholder.com/200/F38181/FFFFFF?text=Pizza", descricao: "Molho de tomate, mussarela e manjericão", tags: ["popular"], pratoDoDia: ["quarta"] },
        { id: 6, nome: "Pizza Pepperoni", categoria: "Pizzas", preco: 42.00, imagem: "https://via.placeholder.com/200/AA96DA/FFFFFF?text=Pepperoni", descricao: "Mussarela e pepperoni", tags: ["popular"], pratoDoDia: [] },
        { id: 7, nome: "Pizza Quatro Queijos", categoria: "Pizzas", preco: 45.00, imagem: "https://via.placeholder.com/200/FCBAD3/FFFFFF?text=4+Queijos", descricao: "Mussarela, parmesão, gorgonzola e provolone", tags: [], pratoDoDia: ["quinta"] },
        
        // Bebidas
        { id: 8, nome: "Coca-Cola 350ml", categoria: "Bebidas", preco: 5.50, imagem: "https://via.placeholder.com/200/C44569/FFFFFF?text=Refri", descricao: "Refrigerante gelado", tags: [], pratoDoDia: [] },
        { id: 9, nome: "Suco de Laranja", categoria: "Bebidas", preco: 6.00, imagem: "https://via.placeholder.com/200/F8B500/FFFFFF?text=Suco", descricao: "Suco natural de laranja", tags: [], pratoDoDia: [] },
        { id: 10, nome: "Água Mineral", categoria: "Bebidas", preco: 3.50, imagem: "https://via.placeholder.com/200/3498DB/FFFFFF?text=Água", descricao: "Água mineral 500ml", tags: [], pratoDoDia: [] },
        
        // Acompanhamentos
        { id: 11, nome: "Batata Frita", categoria: "Acompanhamentos", preco: 12.00, imagem: "https://via.placeholder.com/200/FFD93D/FFFFFF?text=Batata", descricao: "Porção de batata frita crocante", tags: ["popular"], pratoDoDia: ["sexta"] },
        { id: 12, nome: "Onion Rings", categoria: "Acompanhamentos", preco: 14.00, imagem: "https://via.placeholder.com/200/FFA07A/FFFFFF?text=Onion", descricao: "Anéis de cebola empanados", tags: [], pratoDoDia: [] },
        { id: 13, nome: "Molho Especial", categoria: "Acompanhamentos", preco: 3.00, imagem: "https://via.placeholder.com/200/FF6347/FFFFFF?text=Molho", descricao: "Molho especial da casa", tags: [], pratoDoDia: [] }
    ],
    
    pedidos: [],
    
    pedidosFinalizados: [],
    
    motoboys: [
        { id: "MOT001", nome: "Carlos Mendes", telefone: "(11) 91111-1111", placa: "ABC-1234", status: "disponível", pedidosAtribuidos: [] },
        { id: "MOT002", nome: "Roberto Silva", telefone: "(11) 92222-2222", placa: "DEF-5678", status: "disponível", pedidosAtribuidos: [] },
        { id: "MOT003", nome: "Paulo Santos", telefone: "(11) 93333-3333", placa: "GHI-9012", status: "disponível", pedidosAtribuidos: [] },
        { id: "MOT004", nome: "André Costa", telefone: "(11) 94444-4444", placa: "JKL-3456", status: "disponível", pedidosAtribuidos: [] }
    ],
    
    categorias: [
        { id: 1, nome: "Lanches", ativa: true },
        { id: 2, nome: "Pizzas", ativa: true },
        { id: 3, nome: "Bebidas", ativa: true },
        { id: 4, nome: "Acompanhamentos", ativa: true }
    ],
    
    proximoNumeroPedido: 7,
    proximoNumeroPedidoOnline: 0,
    proximoNumeroPedidoBalcao: 0,
    configuracao: {
        tempoMedioPreparo: 25, // minutos
        tempoMedioEntrega: 35, // minutos
        taxaEntrega: 5.00
    },
    formasPagamento: [
        { id: 1, nome: "Pix", ativa: true },
        { id: 2, nome: "Cartão", ativa: true },
        { id: 3, nome: "Dinheiro", ativa: true }
    ]
};

// Gerenciador de dados
class DataManager {
    constructor() {
        // Inicializar com dados padrão primeiro
        this.data = { ...initialRestaurantData };
        this.carregando = false; // Flag para evitar carregamentos simultâneos
        this.dadosCarregados = false; // Flag para indicar que os dados já foram carregados
        // Carregar dados do JSON primeiro (fonte de verdade)
        this.loadData();
    }
    
    loadData() {
        // Evitar carregamentos simultâneos
        if (this.carregando) {
            return;
        }
        
        this.carregando = true;
        
        // Carregar dados do localStorage diretamente
        // (Função de carregar do JSON removida temporariamente)
        this.loadFromLocalStorage();
    }
    
    loadFromLocalStorage() {
        const saved = localStorage.getItem('restaurante_demo_data');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed && typeof parsed === 'object') {
                    this.aplicarDadosSalvos(parsed);
                    console.log('✅ Dados carregados do localStorage');
                    this.sincronizarComDatabaseJSON(); // envia this.data atual para o arquivo (se servidor estiver rodando)
                    this.dadosCarregados = true;
                    this.carregando = false;
                    return;
                }
            } catch (e) {
                console.error('❌ Erro ao carregar do localStorage:', e);
            }
        }
        
        // Se não houver dados salvos ou parse falhou: tentar database.json (quando servidor está rodando)
        this.tentarCarregarDoArquivo();
    }
    
    /** Aplica dados vindos do localStorage ou arquivo, garantindo estrutura completa. Sempre sobrescreve this.data. */
    aplicarDadosSalvos(dados) {
        if (!dados || typeof dados !== 'object') return;
        this.data = {
            restaurante: dados.restaurante || initialRestaurantData.restaurante,
            cardapio: Array.isArray(dados.cardapio) ? dados.cardapio : initialRestaurantData.cardapio,
            pedidos: Array.isArray(dados.pedidos) ? dados.pedidos.map(p => ({
                ...p,
                dataCriacao: p.dataCriacao ? new Date(p.dataCriacao).toISOString() : new Date().toISOString()
            })) : [],
            pedidosFinalizados: Array.isArray(dados.pedidosFinalizados) ? dados.pedidosFinalizados : [],
            motoboys: Array.isArray(dados.motoboys) ? dados.motoboys.map(m => ({
                ...m,
                pedidosAtribuidos: Array.isArray(m.pedidosAtribuidos) ? m.pedidosAtribuidos : []
            })) : initialRestaurantData.motoboys,
            categorias: Array.isArray(dados.categorias) ? dados.categorias : initialRestaurantData.categorias,
            proximoNumeroPedido: dados.proximoNumeroPedido != null ? dados.proximoNumeroPedido : 1,
            proximoNumeroPedidoOnline: dados.proximoNumeroPedidoOnline != null ? dados.proximoNumeroPedidoOnline : 1,
            proximoNumeroPedidoBalcao: dados.proximoNumeroPedidoBalcao != null ? dados.proximoNumeroPedidoBalcao : 1,
            configuracao: dados.configuracao || initialRestaurantData.configuracao,
            formasPagamento: Array.isArray(dados.formasPagamento) ? dados.formasPagamento : (initialRestaurantData.formasPagamento || [])
        };
    }
    
    /** Quando não há localStorage, tenta carregar database.json (ex.: servidor rodando). Se falhar, usa dados iniciais. */
    tentarCarregarDoArquivo() {
        const usarDadosIniciais = () => {
            console.log('ℹ️ Usando dados iniciais padrão');
            this.data = JSON.parse(JSON.stringify(initialRestaurantData));
            this.dadosCarregados = true;
            this.carregando = false;
            this.saveData();
        };
        if (typeof fetch === 'undefined') {
            usarDadosIniciais();
            return;
        }
        fetch('database.json?' + new Date().getTime())
            .then(response => {
                if (!response.ok) throw new Error('Arquivo não encontrado');
                return response.json();
            })
            .then(dados => {
                if (dados && typeof dados === 'object') {
                    this.aplicarDadosSalvos(dados);
                    console.log('✅ Dados carregados do database.json');
                    localStorage.setItem('restaurante_demo_data', JSON.stringify(this.data));
                }
                this.dadosCarregados = true;
                this.carregando = false;
            })
            .catch(() => {
                usarDadosIniciais();
            });
    }
    
    // Função auxiliar para importar dados (validação e estruturação)
    importarDados(dados) {
        try {
            if (!dados || typeof dados !== 'object') {
                return false;
            }
            
            // Só atualizar se os dados forem diferentes (evitar re-renderizações desnecessárias)
            const novosDados = {
                restaurante: dados.restaurante || initialRestaurantData.restaurante,
                cardapio: dados.cardapio || initialRestaurantData.cardapio,
                pedidos: Array.isArray(dados.pedidos) ? dados.pedidos.map(p => ({ 
                    ...p, 
                    dataCriacao: p.dataCriacao ? new Date(p.dataCriacao).toISOString() : new Date().toISOString()
                })) : [],
                pedidosFinalizados: Array.isArray(dados.pedidosFinalizados) ? dados.pedidosFinalizados : [],
                motoboys: Array.isArray(dados.motoboys) ? dados.motoboys.map(m => ({ 
                    ...m, 
                    pedidosAtribuidos: Array.isArray(m.pedidosAtribuidos) ? m.pedidosAtribuidos : []
                })) : initialRestaurantData.motoboys,
                categorias: Array.isArray(dados.categorias) ? dados.categorias : initialRestaurantData.categorias,
                proximoNumeroPedido: dados.proximoNumeroPedido || 1,
                proximoNumeroPedidoOnline: dados.proximoNumeroPedidoOnline || 1,
                proximoNumeroPedidoBalcao: dados.proximoNumeroPedidoBalcao || 1,
                configuracao: dados.configuracao || initialRestaurantData.configuracao,
                formasPagamento: Array.isArray(dados.formasPagamento) ? dados.formasPagamento : (initialRestaurantData.formasPagamento || [])
            };
            
            // Verificar se os dados realmente mudaram antes de atualizar
            const dadosMudaram = JSON.stringify(this.data) !== JSON.stringify(novosDados);
            if (dadosMudaram || !this.dadosCarregados) {
                this.data = novosDados;
                return true;
            }
            
            return false; // Dados não mudaram, não precisa atualizar
        } catch (e) {
            console.error('❌ Erro ao importar dados:', e);
            return false;
        }
    }
    
    /** Retorna objeto completo para persistência (todas as chaves garantidas). */
    getDataParaSalvar() {
        return {
            restaurante: this.data.restaurante || initialRestaurantData.restaurante,
            cardapio: Array.isArray(this.data.cardapio) ? this.data.cardapio : initialRestaurantData.cardapio,
            pedidos: Array.isArray(this.data.pedidos) ? this.data.pedidos : [],
            pedidosFinalizados: Array.isArray(this.data.pedidosFinalizados) ? this.data.pedidosFinalizados : [],
            motoboys: Array.isArray(this.data.motoboys) ? this.data.motoboys : initialRestaurantData.motoboys,
            categorias: Array.isArray(this.data.categorias) ? this.data.categorias : initialRestaurantData.categorias,
            proximoNumeroPedido: this.data.proximoNumeroPedido != null ? this.data.proximoNumeroPedido : 1,
            proximoNumeroPedidoOnline: this.data.proximoNumeroPedidoOnline != null ? this.data.proximoNumeroPedidoOnline : 1,
            proximoNumeroPedidoBalcao: this.data.proximoNumeroPedidoBalcao != null ? this.data.proximoNumeroPedidoBalcao : 1,
            configuracao: this.data.configuracao || initialRestaurantData.configuracao,
            formasPagamento: Array.isArray(this.data.formasPagamento) ? this.data.formasPagamento : (initialRestaurantData.formasPagamento || [])
        };
    }
    
    saveData() {
        const payload = this.getDataParaSalvar();
        this.sincronizarComDatabaseJSON(payload);
        localStorage.setItem('restaurante_demo_data', JSON.stringify(payload));
    }
    
    // Sincronizar dados com o arquivo database.json
    sincronizarComDatabaseJSON(payload) {
        const dados = payload != null ? payload : this.getDataParaSalvar();
        const jsonData = JSON.stringify(dados, null, 2);
        
        // Verificar se estamos em ambiente HTTP/HTTPS (não file://)
        const isHttpProtocol = typeof window !== 'undefined' && 
                               window.location && 
                               (window.location.protocol === 'http:' || window.location.protocol === 'https:');
        
        // Ambiente Node.js - salvar diretamente no arquivo
        if (typeof require !== 'undefined') {
            try {
                const fs = require('fs');
                fs.writeFileSync('database.json', jsonData, 'utf8');
                console.log('✅ Dados salvos em database.json');
            } catch (e) {
                console.warn('⚠️ Não foi possível salvar no arquivo JSON:', e);
            }
        }
        // Ambiente Web HTTP/HTTPS - tentar salvar via API
        else if (typeof fetch !== 'undefined' && isHttpProtocol) {
            // Tentar salvar via API (se houver servidor configurado)
            this.salvarViaAPI(jsonData).catch(() => {
                // Se não houver API, marcar que precisa sincronizar
                localStorage.setItem('database_json_pending', jsonData);
                localStorage.setItem('database_json_last_update', new Date().toISOString());
                console.warn('⚠️ Servidor não disponível. Use dataManager.forcarExportacaoDatabase() para atualizar database.json');
            });
        }
        // Ambiente file:// - apenas salvar no localStorage
        else {
            // Em ambiente file://, apenas salvar no localStorage
            // O usuário pode usar forcarExportacaoDatabase() para exportar o JSON
            localStorage.setItem('database_json_pending', jsonData);
            localStorage.setItem('database_json_last_update', new Date().toISOString());
        }
    }
    
    // Tentar salvar via API (requer servidor backend)
    async salvarViaAPI(jsonData) {
        try {
            const response = await fetch('/api/save-database', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData
            });
            
            if (response.ok) {
                console.log('✅ Dados salvos em database.json via API');
                localStorage.removeItem('database_json_pending');
                return true;
            } else {
                throw new Error('Erro ao salvar via API');
            }
        } catch (e) {
            // API não disponível - usar método alternativo
            throw e;
        }
    }
    
    // Forçar exportação do database.json (para ambiente web sem servidor)
    forcarExportacaoDatabase() {
        const jsonData = JSON.stringify(this.data, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'database.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log('📥 Arquivo database.json exportado para download');
        return jsonData;
    }
    
    // Exportar dados para JSON
    exportarParaJSON() {
        const json = JSON.stringify(this.data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'database-export-' + new Date().toISOString().split('T')[0] + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return json;
    }
    
    // Importar dados de JSON (preserva todas as chaves: formasPagamento, pedidosFinalizados, etc.)
    importarDeJSON(jsonString) {
        try {
            const dados = JSON.parse(jsonString);
            if (!dados || typeof dados !== 'object') return false;
            this.aplicarDadosSalvos(dados);
            this.saveData();
            return true;
        } catch (e) {
            console.error('Erro ao importar dados:', e);
            return false;
        }
    }
    
    // Carregar dados do arquivo JSON (se disponível)
    carregarDeArquivoJSON() {
        // Em ambiente web, tentar carregar via fetch
        if (typeof fetch !== 'undefined') {
            fetch('database.json?' + new Date().getTime()) // Cache bust
                .then(response => {
                    if (!response.ok) throw new Error('Arquivo não encontrado');
                    return response.json();
                })
                .then(dados => {
                    // Verificar se os dados do JSON são mais recentes que o localStorage
                    const dadosLocalStorage = localStorage.getItem('restaurante_demo_data');
                    if (dadosLocalStorage) {
                        try {
                            const dadosLocal = JSON.parse(dadosLocalStorage);
                            // Comparar timestamps se disponíveis
                            const temMaisDados = dados.pedidos && dados.pedidos.length > (dadosLocal.pedidos?.length || 0);
                            if (temMaisDados || !dadosLocal.pedidos || dadosLocal.pedidos.length === 0) {
                                if (this.importarDeJSON(JSON.stringify(dados))) {
                                    console.log('✅ Dados carregados do arquivo database.json');
                                }
                            } else {
                                console.log('ℹ️ Dados do localStorage são mais recentes, mantendo-os');
                            }
                        } catch (e) {
                            // Se houver erro, usar dados do JSON
                            if (this.importarDeJSON(JSON.stringify(dados))) {
                                console.log('✅ Dados carregados do arquivo database.json');
                            }
                        }
                    } else {
                        // Não há dados no localStorage, carregar do JSON
                        if (this.importarDeJSON(JSON.stringify(dados))) {
                            console.log('✅ Dados carregados do arquivo database.json');
                        }
                    }
                })
                .catch(e => {
                    console.warn('⚠️ Não foi possível carregar database.json (isso é normal se o arquivo não existir):', e.message);
                });
        }
    }
    
    /** ZERA todos os dados (só usar em Gestor quando o usuário confirmar). */
    resetData() {
        localStorage.removeItem('restaurante_demo_data');
        this.data = JSON.parse(JSON.stringify(initialRestaurantData));
        this.saveData();
        return true;
    }
    
    getRestaurante() {
        return this.data.restaurante;
    }
    
    getCardapio() {
        return this.data.cardapio;
    }
    
    getProduto(id) {
        return this.data.cardapio.find(p => p.id === id);
    }
    
    getPedidos() {
        return this.data.pedidos;
    }
    
    getPedidosAtivos() {
        // Retorna apenas pedidos ativos (não finalizados)
        return this.data.pedidos.filter(p => 
            p.status !== 'finalizado' && 
            p.status !== 'entregue' && 
            p.status !== 'retirado'
        );
    }
    
    getPedido(id) {
        return this.data.pedidos.find(p => p.id === id) || 
               this.data.pedidosFinalizados.find(p => p.id === id);
    }
    
    getPedidosFinalizados() {
        // Retorna todos os pedidos finalizados (independente do status específico)
        // Isso garante que todos os pedidos finalizados sejam considerados para numeração única
        return this.data.pedidosFinalizados;
    }
    
    /** Remove todos os pedidos (ativos e finalizados) criados hoje. Zera os contadores do dia. */
    zerarContadoresDoDia() {
        const hoje = new Date().toISOString().slice(0, 10);
        const antesPedidos = this.data.pedidos.length;
        const antesFinalizados = this.data.pedidosFinalizados.length;
        this.data.pedidos = this.data.pedidos.filter(p => !p.dataCriacao || !String(p.dataCriacao).startsWith(hoje));
        this.data.pedidosFinalizados = this.data.pedidosFinalizados.filter(p => !p.dataCriacao || !String(p.dataCriacao).startsWith(hoje));
        this.saveData();
        return { removidosPedidos: antesPedidos - this.data.pedidos.length, removidosFinalizados: antesFinalizados - this.data.pedidosFinalizados.length };
    }
    
    isPedidoAtivo(pedido) {
        // Verifica se um pedido está ativo (não finalizado)
        return pedido && 
               pedido.status !== 'finalizado' && 
               pedido.status !== 'entregue' && 
               pedido.status !== 'retirado' &&
               (pedido.status === 'recebido' || pedido.status === 'preparando' || pedido.status === 'pronto');
    }
    
    getMotoboys() {
        return this.data.motoboys;
    }
    
    getMotoboy(id) {
        return this.data.motoboys.find(m => m.id === id);
    }
    
    adicionarPedido(pedido) {
        // Determinar o tipo de pedido baseado no tipo de venda
        let prefixo = 'PED';
        let numero = this.data.proximoNumeroPedido++;
        
        // Se o pedido foi criado via tipo de venda online
        if (pedido.tipoVenda === 'online') {
            prefixo = 'O';
            // Verificar último número usado para pedidos Online
            // Incluir também pedidos finalizados para garantir sequência correta
            const todosPedidos = [...this.data.pedidos, ...this.data.pedidosFinalizados];
            const pedidosOnline = todosPedidos.filter(p => p.id && p.id.startsWith('O'));
            if (pedidosOnline.length > 0) {
                // Extrair números dos IDs e encontrar o maior
                const numeros = pedidosOnline.map(p => {
                    const match = p.id.match(/^O(\d+)$/);
                    return match ? parseInt(match[1]) : 0;
                }).filter(n => n > 0); // Filtrar valores inválidos
                if (numeros.length > 0) {
                    numero = Math.max(...numeros) + 1;
                } else {
                    // Se não conseguiu extrair números válidos, começar do 1
                    numero = 1;
                }
            } else {
                // Primeiro pedido online - sempre começar do 1
                numero = 1;
            }
            // Atualizar contador para o próximo número
            this.data.proximoNumeroPedidoOnline = numero + 1;
        } 
        // Se o pedido foi criado via balcão
        else if (pedido.tipoVenda === 'balcao') {
            prefixo = 'B';
            // Verificar último número usado para pedidos Balcão
            // Incluir também pedidos finalizados para garantir sequência correta
            const todosPedidos = [...this.data.pedidos, ...this.data.pedidosFinalizados];
            const pedidosBalcao = todosPedidos.filter(p => p.id && p.id.startsWith('B'));
            if (pedidosBalcao.length > 0) {
                // Extrair números dos IDs e encontrar o maior
                const numeros = pedidosBalcao.map(p => {
                    const match = p.id.match(/^B(\d+)$/);
                    return match ? parseInt(match[1]) : 0;
                }).filter(n => n > 0); // Filtrar valores inválidos
                if (numeros.length > 0) {
                    numero = Math.max(...numeros) + 1;
                } else {
                    // Se não conseguiu extrair números válidos, começar do 1
                    numero = 1;
                }
            } else {
                // Primeiro pedido balcão - sempre começar do 1
                numero = 1;
            }
            // Atualizar contador para o próximo número
            this.data.proximoNumeroPedidoBalcao = numero + 1;
        }
        // Se o pedido foi criado para mesa
        else if (pedido.tipoVenda === 'mesa') {
            prefixo = 'M';
            const todosPedidos = [...this.data.pedidos, ...this.data.pedidosFinalizados];
            const pedidosMesa = todosPedidos.filter(p => p.id && p.id.startsWith('M'));
            if (pedidosMesa.length > 0) {
                const numeros = pedidosMesa.map(p => {
                    const match = p.id.match(/^M(\d+)$/);
                    return match ? parseInt(match[1]) : 0;
                }).filter(n => n > 0);
                numero = numeros.length > 0 ? Math.max(...numeros) + 1 : 1;
            } else {
                numero = 1;
            }
        }
        
        const novoPedido = {
            ...pedido,
            id: `${prefixo}${String(numero).padStart(3, '0')}`,
            numero: numero,
            status: "recebido",
            dataCriacao: new Date().toISOString(),
            motoboyId: null,
            impresso: false // Status de impressão - inicialmente não impresso
        };
        this.data.pedidos.push(novoPedido);
        this.saveData();
        return novoPedido;
    }
    
    atualizarStatusPedido(id, novoStatus) {
        const pedido = this.data.pedidos.find(p => p.id === id);
        if (pedido) {
            pedido.status = novoStatus;
            if (novoStatus === "pronto") {
                // Move para finalizados se necessário
                // Pode ser ajustado conforme necessário
            }
            this.saveData();
            return pedido;
        }
        return null;
    }
    
    marcarPedidoComoImpresso(id) {
        const pedido = this.data.pedidos.find(p => p.id === id);
        if (pedido) {
            pedido.impresso = true;
            this.saveData();
            return pedido;
        }
        // Também verificar em pedidos finalizados
        const pedidoFinalizado = this.data.pedidosFinalizados.find(p => p.id === id);
        if (pedidoFinalizado) {
            pedidoFinalizado.impresso = true;
            this.saveData();
            return pedidoFinalizado;
        }
        return null;
    }

    marcarItemPedidoComoImpresso(pedidoId, produtoId, quantidade = 1) {
        const pedido = this.data.pedidos.find(p => p.id === pedidoId);
        if (pedido && pedido.itens) {
            pedido.itens.forEach(item => {
                if (item.produtoId === produtoId) {
                    // Rastrear quantidade impressa
                    if (!item.quantidadeImpressa) {
                        item.quantidadeImpressa = 0;
                    }
                    item.quantidadeImpressa = (item.quantidadeImpressa || 0) + quantidade;
                    // Manter compatibilidade com sistema antigo
                    item.impresso = item.quantidadeImpressa > 0;
                }
            });
            this.saveData();
            return pedido;
        }
        return null;
    }

    getQuantidadeImpressaItem(numeroMesa, produtoId) {
        const pedidos = this.data.pedidos.filter(p => 
            p.numeroMesa === numeroMesa && 
            (p.status === 'recebido' || p.status === 'preparando' || p.status === 'pronto')
        );
        
        let totalImpresso = 0;
        // Somar todas as quantidades impressas deste produto em todos os pedidos da mesa
        for (const pedido of pedidos) {
            if (pedido.itens) {
                for (const item of pedido.itens) {
                    if (item.produtoId === produtoId) {
                        // Usar quantidadeImpressa se existir, senão usar impresso (compatibilidade)
                        if (item.quantidadeImpressa !== undefined) {
                            totalImpresso += item.quantidadeImpressa || 0;
                        } else if (item.impresso === true) {
                            // Se não tem quantidadeImpressa mas está marcado como impresso, considerar a quantidade total
                            totalImpresso += Math.floor(parseInt(item.quantidade) || 0);
                        }
                    }
                }
            }
        }
        return totalImpresso;
    }

    isItemImpresso(numeroMesa, produtoId) {
        return this.getQuantidadeImpressaItem(numeroMesa, produtoId) > 0;
    }

    getQuantidadeTotalImpressaPedido(pedidoId) {
        const pedido = this.data.pedidos.find(p => p.id === pedidoId);
        if (!pedido || !pedido.itens) return 0;
        
        // Só calcular para pedidos de mesa
        if (pedido.tipoVenda !== 'mesa' && !pedido.numeroMesa) return 0;
        
        let totalImpresso = 0;
        pedido.itens.forEach(item => {
            const quantidadeImpressa = item.quantidadeImpressa || 0;
            totalImpresso += quantidadeImpressa;
        });
        
        return totalImpresso;
    }
    
    finalizarPedido(id) {
        const index = this.data.pedidos.findIndex(p => p.id === id);
        if (index !== -1) {
            const pedido = this.data.pedidos[index];
            
            // Se o pedido for de mesa, finalizar TODOS os pedidos ativos dessa mesa
            if (pedido.numeroMesa !== undefined && pedido.numeroMesa !== null) {
                const numeroMesa = pedido.numeroMesa;
                const pedidosMesa = this.data.pedidos.filter(p => 
                    p.numeroMesa === numeroMesa && 
                    (p.status === 'recebido' || p.status === 'preparando' || p.status === 'pronto')
                );
                
                // Finalizar todos os pedidos da mesa
                pedidosMesa.forEach(p => {
                    const valorTotal = p.itens.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
                    const tempoDecorrido = Math.floor((new Date() - new Date(p.dataCriacao)) / 60000);
                    
                    const finalizado = {
                        ...p,
                        status: "finalizado", // Status finalizado
                        statusEntrega: p.tipo === "entrega" ? "entregue" : "retirado", // Status específico de entrega/retirada
                        dataFinalizacao: new Date().toISOString(),
                        valorTotal,
                        tempoEntrega: tempoDecorrido
                    };
                    
                    this.data.pedidosFinalizados.push(finalizado);
                });
                
                // Remover todos os pedidos da mesa da lista de pedidos ativos
                this.data.pedidos = this.data.pedidos.filter(p => 
                    !(p.numeroMesa === numeroMesa && 
                      (p.status === 'recebido' || p.status === 'preparando' || p.status === 'pronto'))
                );
                
                this.saveData();
                return pedidosMesa.length > 0 ? pedidosMesa[0] : null;
            } else {
                // Pedido de balcão ou online - finalizar apenas este pedido
                // Números de pedidos balcão/online são únicos e não devem ser reutilizados
                const valorTotal = pedido.itens.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
                const tempoDecorrido = Math.floor((new Date() - new Date(pedido.dataCriacao)) / 60000);
                
                const finalizado = {
                    ...pedido,
                    status: "finalizado", // Status finalizado
                    statusEntrega: pedido.tipo === "entrega" ? "entregue" : "retirado", // Status específico de entrega/retirada
                    dataFinalizacao: new Date().toISOString(),
                    valorTotal,
                    tempoEntrega: tempoDecorrido
                };
                
                this.data.pedidosFinalizados.push(finalizado);
                this.data.pedidos.splice(index, 1);
                this.saveData();
                return finalizado;
            }
        }
        return null;
    }
    
    cancelarPedido(id) {
        const index = this.data.pedidos.findIndex(p => p.id === id);
        if (index !== -1) {
            const pedido = this.data.pedidos[index];
            if (pedido.motoboyId) {
                const motoboy = this.getMotoboy(pedido.motoboyId);
                if (motoboy) {
                    motoboy.pedidosAtribuidos = motoboy.pedidosAtribuidos.filter(pId => pId !== id);
                    if (motoboy.pedidosAtribuidos.length === 0) {
                        motoboy.status = "disponível";
                    }
                }
            }
            this.data.pedidos.splice(index, 1);
            this.saveData();
            return true;
        }
        return false;
    }
    
    atribuirMotoboy(pedidoId, motoboyId) {
        const pedido = this.data.pedidos.find(p => p.id === pedidoId);
        const motoboy = this.getMotoboy(motoboyId);
        
        if (pedido && motoboy) {
            // Remove de motoboy anterior se houver
            if (pedido.motoboyId) {
                const antigoMotoboy = this.getMotoboy(pedido.motoboyId);
                if (antigoMotoboy) {
                    antigoMotoboy.pedidosAtribuidos = antigoMotoboy.pedidosAtribuidos.filter(id => id !== pedidoId);
                    if (antigoMotoboy.pedidosAtribuidos.length === 0) {
                        antigoMotoboy.status = "disponível";
                    }
                }
            }
            
            pedido.motoboyId = motoboyId;
            if (!motoboy.pedidosAtribuidos.includes(pedidoId)) {
                motoboy.pedidosAtribuidos.push(pedidoId);
            }
            motoboy.status = "em rota";
            this.saveData();
            return true;
        }
        return false;
    }

    /**
     * Atribui um entregador (cadastrado em Configurações / localStorage) ao pedido.
     * Armazena entregadorId e dataAtribuicao no pedido para exibir na aba Entregador com timer.
     */
    atribuirEntregador(pedidoId, entregadorId) {
        const pedido = this.data.pedidos.find(p => p.id === pedidoId);
        if (!pedido) return false;
        pedido.entregadorId = entregadorId;
        pedido.dataAtribuicao = new Date().toISOString();
        this.saveData();
        return true;
    }

    /**
     * Remove todas as atribuições de pedidos a entregadores.
     * Os pedidos continuam existindo e voltam para a tela de Pedidos (PDV).
     */
    limparAtribuicoesEntregadores() {
        let count = 0;
        this.data.pedidos.forEach(p => {
            if (p.entregadorId) {
                delete p.entregadorId;
                delete p.dataAtribuicao;
                count++;
            }
        });
        if (count > 0) this.saveData();
        return count;
    }

    /**
     * Indica se o pedido deve exibir o modal de forma de pagamento ao finalizar.
     * Apenas para pedidos de balcão ou mesa criados no PDV. Cliente e online não.
     */
    precisaModalPagamento(pedido) {
        if (!pedido) return false;
        const origem = pedido.origem || 'pdv';
        if (origem === 'cliente') return false;
        return pedido.tipoVenda === 'balcao' || pedido.tipoVenda === 'mesa';
    }
    
    adicionarProduto(produto) {
        const novoProduto = {
            ...produto,
            id: Math.max(...this.data.cardapio.map(p => p.id), 0) + 1
        };
        this.data.cardapio.push(novoProduto);
        this.saveData();
        return novoProduto;
    }
    
    atualizarProduto(id, dados) {
        const index = this.data.cardapio.findIndex(p => p.id === id);
        if (index !== -1) {
            this.data.cardapio[index] = { ...this.data.cardapio[index], ...dados };
            this.saveData();
            return this.data.cardapio[index];
        }
        return null;
    }
    
    removerProduto(id) {
        const index = this.data.cardapio.findIndex(p => p.id === id);
        if (index !== -1) {
            this.data.cardapio.splice(index, 1);
            this.saveData();
            return true;
        }
        return false;
    }
    
    adicionarMotoboy(motoboy) {
        const novoMotoboy = {
            ...motoboy,
            id: `MOT${String(this.data.motoboys.length + 1).padStart(3, '0')}`,
            status: "disponível",
            pedidosAtribuidos: []
        };
        this.data.motoboys.push(novoMotoboy);
        this.saveData();
        return novoMotoboy;
    }
    
    atualizarMotoboy(id, dados) {
        const motoboy = this.getMotoboy(id);
        if (motoboy) {
            Object.assign(motoboy, dados);
            this.saveData();
            return motoboy;
        }
        return null;
    }
    
    removerMotoboy(id) {
        const index = this.data.motoboys.findIndex(m => m.id === id);
        if (index !== -1) {
            this.data.motoboys.splice(index, 1);
            this.saveData();
            return true;
        }
        return false;
    }
    
    getEstatisticasHoje() {
        const hoje = new Date().toISOString().split('T')[0];
        const pedidosHoje = this.data.pedidosFinalizados.filter(p => 
            p.dataCriacao.startsWith(hoje)
        );
        
        const valorTotal = pedidosHoje.reduce((sum, p) => sum + (p.valorTotal || 0), 0);
        const pedidosEmPreparo = this.data.pedidos.filter(p => 
            p.status === "preparando" || p.status === "recebido"
        ).length;
        
        return {
            pedidosHoje: pedidosHoje.length,
            valorTotal,
            pedidosEmPreparo
        };
    }
    
    getVendasPorHora() {
        const hoje = new Date().toISOString().split('T')[0];
        const pedidosHoje = this.data.pedidosFinalizados.filter(p => 
            p.dataCriacao.startsWith(hoje)
        );
        
        const vendasPorHora = Array(24).fill(0);
        pedidosHoje.forEach(pedido => {
            const hora = new Date(pedido.dataCriacao).getHours();
            vendasPorHora[hora] += pedido.valorTotal || 0;
        });
        
        return vendasPorHora;
    }
    
    getProdutoMaisVendido() {
        const todosPedidos = [...this.data.pedidos, ...this.data.pedidosFinalizados];
        const vendas = {};
        
        todosPedidos.forEach(pedido => {
            pedido.itens.forEach(item => {
                if (!vendas[item.produtoId]) {
                    vendas[item.produtoId] = { quantidade: 0, nome: item.nome };
                }
                vendas[item.produtoId].quantidade += item.quantidade;
            });
        });
        
        let maisVendido = null;
        let maiorQuantidade = 0;
        
        Object.keys(vendas).forEach(produtoId => {
            if (vendas[produtoId].quantidade > maiorQuantidade) {
                maiorQuantidade = vendas[produtoId].quantidade;
                maisVendido = vendas[produtoId];
            }
        });
        
        return maisVendido;
    }
    
    getTicketMedio() {
        if (this.data.pedidosFinalizados.length === 0) return 0;
        const total = this.data.pedidosFinalizados.reduce((sum, p) => sum + (p.valorTotal || 0), 0);
        return total / this.data.pedidosFinalizados.length;
    }
    
    getTempoMedioEntrega() {
        const entregas = this.data.pedidosFinalizados.filter(p => p.tipo === "entrega" && p.tempoEntrega);
        if (entregas.length === 0) return 0;
        const total = entregas.reduce((sum, p) => sum + p.tempoEntrega, 0);
        return Math.round(total / entregas.length);
    }
    
    temBebida(pedido) {
        return pedido.itens.some(item => {
            const produto = this.getProduto(item.produtoId);
            return produto && produto.categoria === "Bebidas";
        });
    }
    
    // Métodos de gerenciamento de categorias
    getCategorias() {
        return this.data.categorias || [];
    }
    
    getCategoria(id) {
        return this.data.categorias.find(c => c.id === id);
    }
    
    adicionarCategoria(categoria) {
        const novaCategoria = {
            ...categoria,
            id: Math.max(...(this.data.categorias || []).map(c => c.id), 0) + 1,
            ativa: categoria.ativa !== undefined ? categoria.ativa : true
        };
        if (!this.data.categorias) {
            this.data.categorias = [];
        }
        this.data.categorias.push(novaCategoria);
        this.saveData();
        return novaCategoria;
    }
    
    atualizarCategoria(id, dados) {
        const index = this.data.categorias.findIndex(c => c.id === id);
        if (index !== -1) {
            this.data.categorias[index] = { ...this.data.categorias[index], ...dados };
            this.saveData();
            return this.data.categorias[index];
        }
        return null;
    }
    
    removerCategoria(id) {
        const index = this.data.categorias.findIndex(c => c.id === id);
        if (index !== -1) {
            this.data.categorias.splice(index, 1);
            this.saveData();
            return true;
        }
        return false;
    }

    // Formas de pagamento (cadastradas em Configurações)
    getFormasPagamento() {
        const list = this.data.formasPagamento || [];
        return list.filter(f => f.ativa !== false);
    }

    getFormasPagamentoTodas() {
        return this.data.formasPagamento || [];
    }

    getFormaPagamento(id) {
        return (this.data.formasPagamento || []).find(f => f.id === id);
    }

    adicionarFormaPagamento(forma) {
        if (!this.data.formasPagamento) this.data.formasPagamento = [];
        const ids = this.data.formasPagamento.map(f => f.id);
        const novoId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
        const nova = { id: novoId, nome: (forma.nome || '').trim(), ativa: forma.ativa !== undefined ? forma.ativa : true };
        this.data.formasPagamento.push(nova);
        this.saveData();
        return nova;
    }

    atualizarFormaPagamento(id, dados) {
        const list = this.data.formasPagamento || [];
        const index = list.findIndex(f => f.id === id);
        if (index !== -1) {
            this.data.formasPagamento[index] = { ...this.data.formasPagamento[index], ...dados };
            this.saveData();
            return this.data.formasPagamento[index];
        }
        return null;
    }

    removerFormaPagamento(id) {
        const list = this.data.formasPagamento || [];
        const index = list.findIndex(f => f.id === id);
        if (index !== -1) {
            this.data.formasPagamento.splice(index, 1);
            this.saveData();
            return true;
        }
        return false;
    }
}

// Instância global
const dataManager = new DataManager();

// Função para gerar pedido aleatório (demonstração)
function gerarPedidoAleatorio() {
    const nomes = ["Cliente Teste", "Pedro Demo", "Maria Teste", "João Demo"];
    const telefones = ["(11) 90000-0001", "(11) 90000-0002", "(11) 90000-0003"];
    const enderecos = ["Rua Teste, 100", "Av. Demo, 200", "Rua Exemplo, 300"];
    const pagamentos = ["Pix", "Cartão", "Dinheiro"];
    
    const tipo = Math.random() > 0.5 ? "entrega" : "retirada";
    const cardapio = dataManager.getCardapio();
    const quantidadeItens = Math.floor(Math.random() * 3) + 1;
    const itens = [];
    
    for (let i = 0; i < quantidadeItens; i++) {
        const produto = cardapio[Math.floor(Math.random() * cardapio.length)];
        itens.push({
            produtoId: produto.id,
            nome: produto.nome,
            quantidade: Math.floor(Math.random() * 2) + 1,
            preco: produto.preco
        });
    }
    
    const pedido = {
        cliente: nomes[Math.floor(Math.random() * nomes.length)],
        telefone: telefones[Math.floor(Math.random() * telefones.length)],
        tipo,
        endereco: tipo === "entrega" ? enderecos[Math.floor(Math.random() * enderecos.length)] : null,
        itens,
        observacoes: Math.random() > 0.7 ? "Observação de teste" : "",
        pagamento: pagamentos[Math.floor(Math.random() * pagamentos.length)]
    };
    
    return dataManager.adicionarPedido(pedido);
}

// Zoom persistente para WebView
const ZOOM_STORAGE_KEY = 'peddy_zoom';
const ZOOM_CONFIGURED_KEY = 'peddy_zoom_configurado';
const ZOOM_MIN = 0.7;
const ZOOM_MAX = 1.3;
const ZOOM_STEP = 0.05;

function aplicarZoom(valor) {
    const numero = parseFloat(valor);
    if (Number.isNaN(numero)) return 1;
    const clamp = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, numero));
    const formatado = clamp.toFixed(2);
    document.documentElement.style.zoom = formatado;
    document.body.style.zoom = formatado;
    return clamp;
}

function inicializarZoomUI() {
    if (document.getElementById('zoom-config-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'zoom-config-overlay';
    overlay.className = 'zoom-config-overlay';
    overlay.innerHTML = `
        <div class="zoom-config-card">
            <h3>Ajustar Zoom</h3>
            <p>Defina o zoom ideal para esta tela.</p>
            <div class="zoom-config-controls">
                <button type="button" class="btn btn-secondary" id="zoom-decrease">-</button>
                <span class="zoom-config-value" id="zoom-value">100%</span>
                <button type="button" class="btn btn-secondary" id="zoom-increase">+</button>
            </div>
            <div class="zoom-config-actions">
                <button type="button" class="btn btn-secondary" id="zoom-cancel">Cancelar</button>
                <button type="button" class="btn btn-primary" id="zoom-save">Salvar</button>
            </div>
        </div>
    `;

    const botao = document.createElement('button');
    botao.id = 'zoom-config-button';
    botao.type = 'button';
    botao.className = 'btn btn-secondary zoom-config-button';
    botao.textContent = 'Zoom';

    document.body.appendChild(overlay);
    document.body.appendChild(botao);

    const valorLabel = overlay.querySelector('#zoom-value');
    let zoomAtual = aplicarZoom(localStorage.getItem(ZOOM_STORAGE_KEY) || 1);

    const atualizarLabel = () => {
        valorLabel.textContent = `${Math.round(zoomAtual * 100)}%`;
    };

    const abrir = () => {
        overlay.style.display = 'flex';
    };

    const fechar = () => {
        overlay.style.display = 'none';
    };

    atualizarLabel();

    overlay.querySelector('#zoom-decrease').addEventListener('click', () => {
        zoomAtual = aplicarZoom(zoomAtual - ZOOM_STEP);
        atualizarLabel();
    });

    overlay.querySelector('#zoom-increase').addEventListener('click', () => {
        zoomAtual = aplicarZoom(zoomAtual + ZOOM_STEP);
        atualizarLabel();
    });

    overlay.querySelector('#zoom-cancel').addEventListener('click', () => {
        zoomAtual = aplicarZoom(localStorage.getItem(ZOOM_STORAGE_KEY) || 1);
        atualizarLabel();
        fechar();
    });

    overlay.querySelector('#zoom-save').addEventListener('click', () => {
        localStorage.setItem(ZOOM_STORAGE_KEY, zoomAtual.toFixed(2));
        localStorage.setItem(ZOOM_CONFIGURED_KEY, '1');
        fechar();
    });

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) fechar();
    });

    botao.addEventListener('click', abrir);

    if (!localStorage.getItem(ZOOM_CONFIGURED_KEY)) {
        abrir();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const salvo = localStorage.getItem(ZOOM_STORAGE_KEY);
    if (salvo) aplicarZoom(salvo);
    inicializarZoomUI();
});