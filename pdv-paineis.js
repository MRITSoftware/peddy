(function() {
    function inicializarPaineis() {
        const container = document.getElementById('pdv-container');
        const btnProdutos = document.getElementById('btn-toggle-produtos');
        const btnEntregadores = document.getElementById('btn-toggle-entregadores');
        const btnMesas = document.getElementById('btn-toggle-mesas');
        const btnPedidos = document.getElementById('btn-toggle-pedidos');

        if (!container || !btnProdutos || !btnEntregadores || !btnMesas || !btnPedidos) {
            // Tentar novamente após um pequeno delay se os elementos não estiverem prontos
            setTimeout(inicializarPaineis, 100);
            return;
        }

        const isWebView = typeof window.Android !== 'undefined';
        if (isWebView) {
            document.body.classList.add('webview');
        }

        // Garantir que mesas comece colapsado
        container.classList.add('mesas-colapsadas');

        if (isWebView) {
            container.classList.remove('produtos-colapsados');
            container.classList.add('entregadores-colapsados');
            container.classList.add('mesas-colapsadas');
            container.classList.add('pedidos-colapsados');
        }

        function atualizarLabelBotao(botao, colapsado, nome) {
            const label = colapsado ? `Mostrar ${nome}` : `Ocultar ${nome}`;
            botao.setAttribute('title', label);
            botao.setAttribute('aria-label', label);
        }

        function atualizarLabels() {
            atualizarLabelBotao(
                btnProdutos,
                container.classList.contains('produtos-colapsados'),
                'Produtos'
            );
            atualizarLabelBotao(
                btnEntregadores,
                container.classList.contains('entregadores-colapsados'),
                'Entregadores'
            );
            atualizarLabelBotao(
                btnMesas,
                container.classList.contains('mesas-colapsadas'),
                'Mesas'
            );
            atualizarLabelBotao(
                btnPedidos,
                container.classList.contains('pedidos-colapsados'),
                'Pedidos'
            );
        }

        function fecharOutrosPaineis(painelAbrir) {
            if (painelAbrir !== 'produtos') {
                container.classList.add('produtos-colapsados');
            }
            if (painelAbrir !== 'entregadores') {
                container.classList.add('entregadores-colapsados');
            }
            if (painelAbrir !== 'mesas') {
                container.classList.add('mesas-colapsadas');
            }
            if (painelAbrir !== 'pedidos') {
                container.classList.add('pedidos-colapsados');
            }
        }

        window.toggleProdutosPdv = function toggleProdutosPdv() {
            const aberto = !container.classList.contains('produtos-colapsados');
            if (aberto) {
                container.classList.add('produtos-colapsados');
            } else {
                fecharOutrosPaineis('produtos');
                container.classList.remove('produtos-colapsados');
            }
            atualizarLabels();
        };

        window.toggleEntregadoresPdv = function toggleEntregadoresPdv() {
            const aberto = !container.classList.contains('entregadores-colapsados');
            if (aberto) {
                container.classList.add('entregadores-colapsados');
            } else {
                fecharOutrosPaineis('entregadores');
                container.classList.remove('entregadores-colapsados');
            }
            atualizarLabels();
        };

        window.toggleMesasPdv = function toggleMesasPdv() {
            const aberto = !container.classList.contains('mesas-colapsadas');
            if (aberto) {
                container.classList.add('mesas-colapsadas');
            } else {
                fecharOutrosPaineis('mesas');
                container.classList.remove('mesas-colapsadas');
            }
            atualizarLabels();
        };

        window.togglePedidosPdv = function togglePedidosPdv() {
            const aberto = !container.classList.contains('pedidos-colapsados');
            if (aberto) {
                container.classList.add('pedidos-colapsados');
            } else {
                fecharOutrosPaineis('pedidos');
                container.classList.remove('pedidos-colapsados');
            }
            atualizarLabels();
        };

        atualizarLabels();
    }

    // Aguardar DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarPaineis);
    } else {
        inicializarPaineis();
    }
})();
