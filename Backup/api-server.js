// Servidor Node.js simples para salvar database.json
// Execute com: node api-server.js
// Requer: npm install express cors

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Rota para salvar database.json
app.post('/api/save-database', (req, res) => {
    try {
        const jsonData = JSON.stringify(req.body, null, 2);
        const filePath = path.join(__dirname, 'database.json');
        
        fs.writeFileSync(filePath, jsonData, 'utf8');
        
        console.log('✅ database.json atualizado em', new Date().toISOString());
        
        res.json({ 
            success: true, 
            message: 'Dados salvos com sucesso',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('❌ Erro ao salvar database.json:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Rota para obter database.json
app.get('/api/get-database', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'database.json');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            res.json(JSON.parse(data));
        } else {
            res.status(404).json({ error: 'Arquivo database.json não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Servir arquivos estáticos
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📁 Servindo arquivos de: ${__dirname}`);
    console.log(`💾 API de salvamento: http://localhost:${PORT}/api/save-database`);
});
