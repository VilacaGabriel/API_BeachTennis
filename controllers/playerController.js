const PlayerService = require("../services/playerService");

const playerController = {
    async create(req, res){
        try{
            console.log("Body recebido:", req.body);
            const newPlayer = await PlayerService.createPlayer(req.body);
            res.status(201).json(newPlayer);
        } catch (error){
            res.status(400).json({error: error.message });
        }
    },
    async getAll(req, res){
        try{
            const players = await PlayerService.getAllPlayers();
            res.status(200).json(players);
        } catch (error){
            res.status(500).json({error: "Erro de buscar jogador"});
        }
    },
    async getById(req, res){
        try{
            const player = await PlayerService.getAllPlayerById(req.params.id);
            res.status(200).json(player);
        }catch (error) {
            res.status(400).json({error: error.message});
        }
    },
    async update(req, res){
        try{
            const updatedPlayer = await PlayerService.updatePlayer(req.params.id, req.body);
            res.status(200).json(updatedPlayer);
        }catch (error){
            res.status(400).json({error: error.message});
        }
    },
    async delete(req, res){
        try{
            await PlayerService.deletePlayer(req.params.id);
            res.status(204).send();
        }catch(error) {
            res.status(404).json({ error: error.message });
        }
    },
    async getCategory(req, res){
        try{
            const player = await PlayerService.getAllPlayerCategory(req.params.category);
            res.status(200).json(player);
        }catch (error){
            res.status(500).json({ error: error.message || "Erro ao buscar jogadores da categoria"});
        }
    },
    async searchPlayers(req, res){
        try{
            const filters = req.query;
            const players = await PlayerService.searchPlayers(filters);

            if (!players || players.length === 0){
                return res.status(404).json({ error: "Nenhum jogador encontrado com esses filtros" })
            }
            res.status(200).json(players);
        }catch(error){
            console.error(error)
            res.status(500).json({ error: "Erro ao buscar jogadores com filtros "});
        }
    },
}

module.exports = playerController;