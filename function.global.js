var global = {

    /**
     * Clean the memory
     */
    cleanMemory: function() {
        for (let name in Memory.creeps) {
            if (Game.creeps[name] == undefined) {
                delete Memory.creeps[name];
            }
        }
    },

    /**
     * Init spawn memory
     * @param {char} spawn
     */
    initSpawnMemory: function(spawn){
        if(Game.spawns[spawn].memory.nbrHarvester == undefined){
            Game.spawns[spawn].memory.nbrHarvester = 0;
        }
        if(Game.spawns[spawn].memory.nbrUpgrader == undefined){
            Game.spawns[spawn].memory.nbrUpgrader = 0;
        }
        if(Game.spawns[spawn].memory.nbrBuilder == undefined){
            Game.spawns[spawn].memory.nbrBuilder = 0;
        }
        if(Game.spawns[spawn].memory.nbrScout == undefined){
            Game.spawns[spawn].memory.nbrScout = 0;
        }
        if(Game.spawns[spawn].memory.activeSource == undefined){
            Game.spawns[spawn].memory.activeSource = 0;
        }
        if(Game.spawns[spawn].memory.infosClock == undefined){
            Game.spawns[spawn].memory.infosClock = 0;
        }

    },

    /**
     * Check Avalaible ressource in spawn room
     * @param {char} spawn
     */
    checkAvalaibleSource: function (spawn) {

        var avalaibleSource = Game.spawns[spawn].pos.findInRange(FIND_SOURCES_ACTIVE,50);
        if(avalaibleSource.length != Game.spawns[spawn].memory.activeSource){

            Game.spawns[spawn].memory.activeSource = avalaibleSource.length;
            console.log("      [ SOURCE : "+avalaibleSource.length+" ]");
        }
        return avalaibleSource.length;
    }
};

module.exports = global;