const Player = require('../models/playerModel');

const PlayerRepository = {
    async create(data){
        return await Player.create(data);
    },
    async findAll(){
        return await Player.findAll();
    },
    async findById(id){
        return await Player.findByPk(id); //findByPk significa “find by primary key” — retorna um jogador específico com aquele ID.Se não achar, retorna null
    },
    async update(id, newData){
        const player = await Player.findByPk(id);
        if (!player) return null;

        await player.update(newData);
        return player;
    },
    async delete(id){
        const player = await Player.findByPk(id);
        if (!player) return null;

        await player.destroy();
        return true
    },
    async findBySuperCategory(category){
        return await Player.findAll({
            where:{
                superCategory:category
            }
        });
    },
    async findByFilters(filters) {
    const where = {};

    if (filters.gender) {
      where.gender = filters.gender;
    }
    if (filters.superCategory) {
      where.superCategory = filters.superCategory;
    }
    if (filters.federationCategory) {
      where.federationCategory = filters.federationCategory;
    }

    // Adicione mais filtros conforme necessário

    return await Player.findAll({ where });
  }
};

module.exports = PlayerRepository;