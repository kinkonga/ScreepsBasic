var worker = require('function.worker');

var role = {

    /**
     * Make creep Work
     * @param {string} role
     * @param {char} spawn
     * @param {creep} creep
     * @param {string} roomName
     */
    basic: function(role,spawn,creep,roomName=0) {

        //Harvester work
        if(role == "HAR"){

            //If the creep is empty
            if(creep.memory.full == false) {
                worker.harvestAction(spawn,creep,roomName);
            }

            //If the creep is full
            else if (creep.memory.full == true) {

                if (!worker.goToSpawn(creep, spawn)) {
                    if (!worker.transport(creep)) {
                        worker.upgrade(creep);
                    }
                }

                //SWITCH
                worker.switchLoadingStatus(creep, false);
            }
        }

        //Upgrader work
        if(role == "UPG"){

            //If the creep is empty
            if(creep.memory.full == false) {
                worker.harvestAction(spawn,creep,roomName);
            }

            //If the creep is full
            else if (creep.memory.full == true) {

                if (!worker.goToSpawn(creep, spawn)) {
                    worker.upgrade(creep);
                }

                //SWITCH
                worker.switchLoadingStatus(creep, false);

            }
        }

        //Builder work
        if(role == "BUI"){

            //If the creep is empty
            if(creep.memory.full == false) {
                worker.harvestAction(spawn,creep,roomName);
            }

            //If the creep is full
            else if (creep.memory.full == true) {
                if (!worker.goToSpawn(creep, spawn)) {
                    if(!worker.construct(creep)){
                        if(!worker.repair(creep)){
                            if (!worker.transport(creep)) {
                                worker.upgrade(creep);
                            }
                        }
                    }

                }

                //SWITCH
                worker.switchLoadingStatus(creep, false);
            }
        }

    },

    scout: function(spawn,creep,flag){

        if(!worker.attack(creep)){
            worker.goToFlag(creep,flag);
        }
    },

    /**
     * Make turrets Work
     * @param {char} spawn
     */
    turretsHandler: function (spawn) {
        /* Defend*/
        var towers = Game.spawns[spawn].room.find(FIND_STRUCTURES,
            {filter: (s) => s.structureType == STRUCTURE_TOWER});
        var target = Game.spawns[spawn].room.find(FIND_HOSTILE_CREEPS);
        for(var tower in towers){
            if(target != 0){
                console.log( towers[tower] + " target: " +target[0]);
                towers[tower].attack(target[0]);
            }
        }
    }
};

module.exports = role;