var global = require('function.global');
var role = require('role.basic');
var creepCreator = require('creep.creator');



module.exports.loop = function () {

    var scoutFlag = [];
    var reserveFlag = [];
    var claimFlag = [];


    /* CLEAR MEMORY */
    global.cleanMemory();

    /* FLAGS LOOP */
    var nbrScout = 0;
    var nbrClaimer = 0;
    var nbrReserver = 0;
    for(var id in Game.flags){
        var flag = Game.flags[id];

        if(flag.color == COLOR_GREEN){
            nbrScout += 1;
            scoutFlag.push(flag);
        }
        else if(flag.color == COLOR_WHITE){
            nbrClaimer += 1;
            claimFlag.push(flag);
        }
        else if(flag.color == COLOR_BLUE){
            nbrReserver += 1;
            reserveFlag.push(flag);
        }
    }
    Game.spawns['main'].memory.nbrScout = nbrScout;

    /* SPAWN LOOP */
    for (var id in Game.spawns){
        var spawn = Game.spawns[id];

        // INIT SPAWN MEMORY
        global.initSpawnMemory(spawn.name);

        /* INIT NUMBER OF CREEP */
        spawn.memory.nbrHarvester = 3;
        spawn.memory.nbrUpgrader = 1;
        spawn.memory.nbrBuilder = 6;

        // -- TEST -- Check Source Avalaible
        global.checkAvalaibleSource(spawn.name);

        // CREATE CREEP
        if(!creepCreator.basic(spawn.name,spawn.memory.nbrHarvester,spawn.memory.nbrUpgrader,spawn.memory.nbrBuilder,['DYNAMIC'])){
            creepCreator.scout(spawn.name,['DYNAMIC']);
        }

        // DEFENSE
        role.turretsHandler(spawn.name);

        //tick counter
        Game.spawns[spawn.name].memory.infosClock += 1;
        if( Game.spawns[spawn.name].memory.infosClock >= 100){
            console.log("[ infos status "+ spawn.name +" ]");
            Game.spawns[spawn.name].memory.infosClock = 0;
        }
    }

    /* CREEP LOOP */
    var flagId = 0;
    for(var id in Game.creeps) {
        var creep = Game.creeps[id];

        // CREEP ACTION
        if(creep.memory.role == "HAR" || creep.memory.role == "UPG" || creep.memory.role == "BUI"){
            role.basic(creep.memory.role,creep.memory.birth,creep);
        }
        if(creep.memory.role == "SCT"){
            role.scout(creep.memory.birth,creep,scoutFlag[flagId]);
            flagId++;
        }


    }

};

