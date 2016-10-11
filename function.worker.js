module.exports = {

    /* SIMPLE ACTION */

    /**
     * Make creep go and harvest source in the room
     * @param {creep} creep
     * @return {bool} true if a source is found
     */
    harvest(creep) {
        var sources = creep.pos.findClosestByPath(FIND_SOURCES, {
            filter: (s) => s.energy != 0
        });
        if(sources != undefined){
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);

            }
            return true;
        }
        return false;



    },

    /**
     * Make creep go and unload energy in structures in the room
     * @param {creep} creep
     * @return {bool} true if a energy structure is found
     */
    transport(creep) {

        var energyStructure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
            {filter: (s) => s.energy < s.energyCapacity});

        if(energyStructure != undefined) {

            if(creep.transfer(energyStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

                creep.moveTo(energyStructure);


            }
            return true;
        }

        return false;
    },

    /**
     * Make creep go and upgrade controller in the room
     * @param {creep} creep
     * @return {bool} true if a controller is found
     */
    upgrade(creep) {

            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {

                creep.moveTo(creep.room.controller);


            }
            return true;
    },

    /**
     * Make creep go and build structures in the room
     * @param {creep} creep
     * @return {bool} true if a structure to build is found
     */
    construct(creep) {

        var buildSite = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);

        if (buildSite != undefined && creep.memory.full == true){
            //console.log("builder "+creep+" construct ");
            if(creep.build(buildSite) == ERR_NOT_IN_RANGE){

                creep.moveTo(buildSite);

            }
            return true;
        }
        return false;
    },

    /**
     * Make creep go and repair structures in the room
     * @param {creep} creep
     * @return {bool} true if a structure to repair is found
     */
    repair(creep){

        var structure = creep.pos.findClosestByPath(FIND_STRUCTURES,
            {filter:(s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });

        if (structure != undefined && creep.memory.full == true){

            if(creep.repair(structure) == ERR_NOT_IN_RANGE){

                creep.moveTo(structure);

            }
            return true;
        }
        return false;
    },

    /**
     * Make creep go and build structures in the room
     * @param {creep} creep
     * @param {bool} value (true = "full" / false = "empty")
     */
    switchLoadingStatus(creep,value){
        if(value == true){
            if(creep.carry.energy == creep.carryCapacity && creep.memory.full == !value){
                creep.say("full");
                creep.memory.full = value;
            }
        }
        else if(value == false){
            if(creep.carry.energy == 0 && creep.memory.full == !value){
                creep.say("empty");
                creep.memory.full = value;
            }
        }
    },

    /* GO TO */

    /**
     * Make creep go to a room
     * in nothing to do in room creep try to go to xy(25,25)
     * @param {creep} creep
     * @param {string} roomName
     * @return {bool} true == moving to room / false == in room
     */
    goToRoom(creep, room) {
        if(creep.room.name != room)
        {
            var exitDir = Game.map.findExit(creep.room.name, room);
            var Exit = creep.pos.findClosestByPath(exitDir);
            creep.moveTo(Exit);
            return true;
        }
        else if(creep.room.name == room){
            var centerRoom = new RoomPosition(25,25,room);
            creep.moveTo(centerRoom);
            return false;
        }

    },

    /**
     * Make creep go to a flag room
     * @param {creep} creep
     * @param {flag} flag
     * @return {bool} true == moving to flag / false == to flag
     */
    goToFlag(creep,flag){
        if (flag != undefined){
            creep.moveTo(flag);
            return true;
        }
        return false;
    },

    /**
     * Make creep go to a spawn room
     * @param {creep} creep
     * @param {string} spawn
     * @return {bool} true == moving to spawn room / false == to spawn room
     */
    goToSpawn(creep, spawn) {

        if(creep.room.name != Game.spawns[spawn].room.name) {

            creep.moveTo(Game.spawns[spawn]);
            return true;
        }
        return false;

    },

    /* EXTENSION */

    reserveRoomController(creep) {
        
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {

                creep.moveTo(creep.room.controller);
            }
            return true;

    },

    claimRoomController(creep) {

            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            
                creep.moveTo(creep.room.controller);


            }
            return true;
    },

    /* COMBAT */

    attack(creep){
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        var buildTarget = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
        if(target != undefined && creep.attack(target) == ERR_NOT_IN_RANGE){
            console.log( creep + " target: " +target);
            creep.moveTo(target);
            return true;
        }
        else if(buildTarget != undefined && creep.attack(buildTarget) == ERR_NOT_IN_RANGE){
            console.log( creep + " target: " +buildTarget);
            creep.moveTo(buildTarget);
            return true;
        }
        return false;
    },

    /* COMBINE ACTIONS */

    harvestAction(spawn,creep,roomName) {

        if(creep.memory.full == false) {


            if (!this.harvest(creep)) {


                if (roomName == 0 || !this.goToRoom(creep, roomName)) {
                    this.goToSpawn(creep, spawn);
                }

            }

            //SWITCH
            this.switchLoadingStatus(creep, true);
        }
    }


};

