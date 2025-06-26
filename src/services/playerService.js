const PlayerRepository = require("../repositories/playerRepository");

const PlayerService = {
    async createPlayer(data){
        if(!data.namePlayer){
            throw new Error("Nome do jogador é Obrigatório")
        }
        
        return await PlayerRepository.create(data);
    },
    async getAllPlayers(){
        return await PlayerRepository.findAll();
    },
    async getAllPlayerById(id){
        const player = await PlayerRepository.findById(id);
        if (!player) {
            throw new Error("jogador não encontrado");
        }
        return player
    },
    async updatePlayer(id,newData) {
        const updatedPlayer = await PlayerRepository.update(id, newData);
        if (!updatedPlayer){
            throw new Error("jogador não encontrado, cadastre um novo jogador");
        }
        return updatedPlayer;
    },
    async deletePlayer(id){
        const deleted = await PlayerRepository.delete(id);
        if (!deleted) {
            throw new Error("Jogador não encontrado para deletar");
        }
        return true;
    },
    async getAllPlayerCategory(category){
        const players = await PlayerRepository.findBySuperCategory(category);
        if (players.length === 0){
            throw new Error("Nenhum jogador encontrado para essa categoria");
        }
        return players;
    },
    async findByFilters(filters){
        return await PlayerRepository.findByFilters(filters);
    }
}

module.exports = PlayerService;
