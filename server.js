const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Proxy pour appeler l'API Google Business Profile
app.get('/api/google-business', async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1]; // Récupère le token du header Authorization
        const response = await axios.get('https://mybusiness.googleapis.com/v4/accounts', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Serveur backend en ligne sur port ${PORT}`));

