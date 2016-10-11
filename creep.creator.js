module.exports = {

    /**
     * Make creep go and unload energy in structures in the room
     * @param {string} spawn name
     * @param {int} maxHarvester
     * @param {int} maxUpgrader
     * @param {int} maxBuilder
     * @param {[string]/string} parts ('STATIC' 'DYNAMIC' [parts])
     * @param {int} cost or reserve (default=0)
     * @return {bool} true if a energy structure is found
     */
    basic(spawn, maxHarvester, maxUpgrader, maxBuilder, parts, reserve = 0){

        //Check Number of creeps
        var nbrHarvester = _.sum(Game.creeps, (c) => c.memory.role == 'HAR' && c.memory.birth == spawn);
        var nbrUpgrader = _.sum(Game.creeps, (c) => c.memory.role == 'UPG' && c.memory.birth == spawn);
        var nbrBuilder = _.sum(Game.creeps, (c) => c.memory.role == 'BUI' && c.memory.birth == spawn);
        var numberOfPart = 0;

        //check total energy capacity
        var totalEnergyCapacity = Game.spawns[spawn].room.energyCapacityAvailable;

        //MAKE STATIC WORKER PART
        if (parts[0] == 'STATIC') {
            numberOfPart = Math.floor(reserve / 200);
        }

        //MAKE DYNAMIC WORKER PART
        else if (parts[0] == 'DYNAMIC') {
            numberOfPart = Math.floor((totalEnergyCapacity - reserve) / 200);
        }

        if (parts[0] == 'DYNAMIC' || parts[0] == 'STATIC') {
            parts = [];

            for (let i = 0; i < numberOfPart; i++) {
                parts.push(WORK);
            }
            for (let i = 0; i < numberOfPart; i++) {
                parts.push(CARRY);
            }
            for (let i = 0; i < numberOfPart; i++) {
                parts.push(MOVE);
            }
        }

        //HARVESTER
        if (nbrHarvester < maxHarvester) {
            makeCreeps("HAR", spawn, parts, numberOfPart, reserve);
            return true;
        }
        //UPGRADER
        else if (nbrUpgrader < maxUpgrader) {
            makeCreeps("UPG", spawn, parts, numberOfPart, reserve);
            return true;
        }
        //BUILDER
        else if (nbrBuilder < maxBuilder) {
            makeCreeps("BUI", spawn, parts, numberOfPart, reserve);
            return true;
        }
        return false;
    },

    scout(spawn,parts,reserve = 0){

        //Check Number of creeps
        var nbrScout = _.sum(Game.creeps, (c) => c.memory.role == 'SCT' && c.memory.birth == spawn);
        var numberOfPart = 0;

        //check total energy capacity
        var totalEnergyCapacity = Game.spawns[spawn].room.energyCapacityAvailable;

        //MAKE STATIC SCOUT PART
        if (parts[0] == 'STATIC') {
            numberOfPart = Math.floor(reserve / 150);
        }

        //MAKE DYNAMIC SCOUT PART
        else if (parts[0] == 'DYNAMIC') {

            numberOfPart = Math.floor((totalEnergyCapacity - reserve) / 150);
        }

        if (parts[0] == 'DYNAMIC' || parts[0] == 'STATIC') {

            parts = [];

            for (let i = 0; i < numberOfPart; i++) {
                parts.push(MOVE);
            }
            for (let i = 0; i < numberOfPart; i++) {
                parts.push(ATTACK);
            }
            for (let i = 0; i < numberOfPart; i++) {
                parts.push(TOUGH);
                parts.push(TOUGH);
            }
        }

        //SCOUT
        if (nbrScout < Game.spawns[spawn].memory.nbrScout) {
            makeCreeps("SCT", spawn, parts, numberOfPart, reserve);
            return true;
        }
        return false;
    },
};

function newSpawn(type,name,numberOfPart, reserve,spawn) {
    console.log("       !! [ NEW CREEP ] !!");
    console.log("          ["+type+" lvl : "+numberOfPart+"]");

};

function population() {
    var nbrHarvester = _.sum(Game.creeps, (c) => c.memory.role == 'HAR' && c.memory.birth == 'main');
    var nbrUpgrader = _.sum(Game.creeps, (c) => c.memory.role == 'UPG' && c.memory.birth == 'main');
    var nbrBuilder = _.sum(Game.creeps, (c) => c.memory.role == 'BUI' && c.memory.birth == 'main');

    console.log("-- [ POPULATION BASIC WORKER ] --");

    console.log("|  HAR : " + nbrHarvester + " / UPG : " + nbrUpgrader + " / BUI : " + nbrBuilder + "  |");
    console.log("---------------------------------");

};

function makeCreeps(role,spawn,parts,numberOfPart,reserve){
    var name = Game.spawns[spawn].createCreep(parts,undefined,{ role: role, full: false, birth: spawn});
    if (!(name < 0)){

        newSpawn(role,name,numberOfPart,reserve,spawn);
        population();

    }
};
