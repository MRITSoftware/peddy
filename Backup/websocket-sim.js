// Simulação de WebSocket para atualizações em tempo real
// Este arquivo simula conexões WebSocket sem precisar de um servidor real

class WebSocketSim {
    constructor() {
        this.listeners = {
            pedidoUpdate: [],
            novoPedido: [],
            statusChange: []
        };
        this.intervals = [];
        this.start();
    }

    // Iniciar simulação
    start() {
        // Simular atualização automática de status de pedidos
        const intervalStatus = setInterval(() => {
            this.simularAtualizacaoStatus();
        }, 30000); // A cada 30 segundos
        
        this.intervals.push(intervalStatus);

        // Simular progressão automática de alguns pedidos (para demo)
        const intervalProgressao = setInterval(() => {
            this.simularProgressaoPedidos();
        }, 45000); // A cada 45 segundos
        
        this.intervals.push(intervalProgressao);
    }

    // Parar simulação
    stop() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
    }

    // Registrar listener para atualizações de pedido
    onPedidoUpdate(callback) {
        if (typeof callback === 'function') {
            this.listeners.pedidoUpdate.push(callback);
        }
    }

    // Registrar listener para novos pedidos
    onNovoPedido(callback) {
        if (typeof callback === 'function') {
            this.listeners.novoPedido.push(callback);
        }
    }

    // Registrar listener para mudanças de status
    onStatusChange(callback) {
        if (typeof callback === 'function') {
            this.listeners.statusChange.push(callback);
        }
    }

    // Notificar atualização de pedido
    notificarPedidoUpdate(pedido) {
        this.listeners.pedidoUpdate.forEach(callback => {
            try {
                callback(pedido);
            } catch (e) {
                console.error('Erro ao executar callback de atualização de pedido:', e);
            }
        });
    }

    // Notificar novo pedido
    notificarNovoPedido(pedido) {
        this.listeners.novoPedido.forEach(callback => {
            try {
                callback(pedido);
            } catch (e) {
                console.error('Erro ao executar callback de novo pedido:', e);
            }
        });
    }

    // Notificar mudança de status
    notificarStatusChange(pedidoId, novoStatus, statusAnterior) {
        this.listeners.statusChange.forEach(callback => {
            try {
                callback(pedidoId, novoStatus, statusAnterior);
            } catch (e) {
                console.error('Erro ao executar callback de mudança de status:', e);
            }
        });
    }

    // Simular atualização de pedido
    simularAtualizacaoPedido(pedidoId) {
        if (typeof dataManager !== 'undefined') {
            const pedido = dataManager.getPedido(pedidoId);
            if (pedido) {
                this.notificarPedidoUpdate(pedido);
            }
        }
    }

    // Simular atualização automática de status
    simularAtualizacaoStatus() {
        if (typeof dataManager === 'undefined') return;

        const pedidos = dataManager.getPedidos();
        
        // Atualizar timers e notificar mudanças (sem mudar status automaticamente)
        pedidos.forEach(pedido => {
            this.notificarPedidoUpdate(pedido);
        });

        // Disparar evento customizado para atualização geral
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('pedidos-updated'));
        }
    }

    // Simular progressão automática de pedidos (apenas para demo)
    simularProgressaoPedidos() {
        if (typeof dataManager === 'undefined') return;

        const pedidos = dataManager.getPedidos();
        
        // Progressão aleatória e ocasional (apenas para demonstrar)
        // Em produção, isso seria controlado pelo painel da cozinha
        if (pedidos.length > 0 && Math.random() > 0.7) {
            // Ocasionalmente, progride um pedido aleatório
            const pedidoAleatorio = pedidos[Math.floor(Math.random() * pedidos.length)];
            
            // Apenas se o pedido estiver recebido há mais de 5 minutos (para demo)
            const tempoCriacao = new Date(pedidoAleatorio.dataCriacao);
            const agora = new Date();
            const minutosDecorridos = (agora - tempoCriacao) / 60000;

            // Não fazer progressão automática - deixar controle manual
            // Esta função pode ser usada para notificações apenas
        }
    }

    // Simular novo pedido (chamado quando um pedido é criado)
    simularNovoPedido(pedido) {
        this.notificarNovoPedido(pedido);
        this.notificarPedidoUpdate(pedido);
        
        // Disparar evento customizado (mesma aba)
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('novo-pedido', { detail: pedido }));
        }

        // Notificar outras abas (ex.: PDV) via BroadcastChannel para notificação push
        try {
            const ch = new BroadcastChannel('peddy-novo-pedido');
            ch.postMessage({ tipo: 'novo-pedido', pedido });
            ch.close();
        } catch (e) {}
    }

    // Simular mudança de status
    simularMudancaStatus(pedidoId, novoStatus, statusAnterior) {
        if (typeof dataManager !== 'undefined') {
            const pedido = dataManager.getPedido(pedidoId);
            if (pedido) {
                this.notificarStatusChange(pedidoId, novoStatus, statusAnterior);
                this.notificarPedidoUpdate(pedido);
            }
        }
        
        // Disparar evento customizado
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('status-changed', { 
                detail: { pedidoId, novoStatus, statusAnterior } 
            }));
        }
    }
}

// Instância global
const websocketSim = new WebSocketSim();

// Sobrescrever funções do dataManager para notificar via WebSocket simulado
if (typeof dataManager !== 'undefined') {
    const originalAdicionarPedido = dataManager.adicionarPedido.bind(dataManager);
    dataManager.adicionarPedido = function(pedido) {
        const novoPedido = originalAdicionarPedido(pedido);
        websocketSim.simularNovoPedido(novoPedido);
        return novoPedido;
    };

    const originalAtualizarStatusPedido = dataManager.atualizarStatusPedido.bind(dataManager);
    dataManager.atualizarStatusPedido = function(id, novoStatus) {
        const pedido = dataManager.getPedido(id);
        const statusAnterior = pedido ? pedido.status : null;
        const resultado = originalAtualizarStatusPedido(id, novoStatus);
        if (resultado && statusAnterior) {
            websocketSim.simularMudancaStatus(id, novoStatus, statusAnterior);
        }
        return resultado;
    };

    const originalFinalizarPedido = dataManager.finalizarPedido.bind(dataManager);
    dataManager.finalizarPedido = function(id) {
        const pedido = dataManager.getPedido(id);
        const statusAnterior = pedido ? pedido.status : null;
        const resultado = originalFinalizarPedido(id);
        if (resultado && statusAnterior) {
            websocketSim.simularMudancaStatus(id, resultado.status, statusAnterior);
        }
        return resultado;
    };
}

// Event listeners globais para atualização automática de interfaces
if (typeof window !== 'undefined') {
    window.addEventListener('pedidos-updated', () => {
        // Atualizar todas as páginas que estiverem abertas
        // As páginas individuais podem reagir a este evento
        if (typeof atualizarPedidos === 'function') {
            atualizarPedidos();
        }
    });

    window.addEventListener('novo-pedido', (event) => {
        // Notificar sobre novo pedido
        const pedido = event.detail;
        console.log('Novo pedido recebido via WebSocket:', pedido.id);
    });

    window.addEventListener('status-changed', (event) => {
        // Notificar sobre mudança de status
        const { pedidoId, novoStatus, statusAnterior } = event.detail;
        console.log(`Status do pedido ${pedidoId} mudou de ${statusAnterior} para ${novoStatus}`);
    });
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.websocketSim = websocketSim;
}

// Exportar para módulos (se usando ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = websocketSim;
}