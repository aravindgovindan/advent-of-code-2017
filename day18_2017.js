firstStar_old = (input) => {
    register = {};
    let index = 0;
    while (index >= 0 && index < input.length) {
        let instr = input[index].split(' ');
        if (instr[0] == 'snd') {
            console.log(' sounding ' + register[instr[1]]);
        } else if (instr[0] == 'rcv') {
            if (val(instr)) {
                console.log('recover last');
                break;
            }
        } else if (instr[0] == 'set') {
            register[instr[1]] = val(instr[2]);
        } else if (instr[0] == 'add') {
            register[instr[1]] = (register[instr[1]] || 0) + val(instr[2]);
        } else if (instr[0] == 'mul') {
            register[instr[1]] = (register[instr[1]] || 0) * val(instr[2]);
        } else if (instr[0] == 'mul') {
            register[instr[1]] = (register[instr[1]] || 0) % val(instr[2]);
        } else {
            if (val(instr[1]) > 0) {
                index = index + val(instr[2]) - val(instr[2]) < 0
            }
        }
        index++;
    }
}

val_old = (item) => {
    // console.log(item)
    if (item.charCodeAt() > 90) {
        return register[item];
    }
    return +item;
}

var commands = [];
input.split('\n').forEach(d => {
    commands.push({ "name": d.substring(0, 3), "args": d.substring(4).split(' ') })
})

function Program(id) {
    this.registers = {};
    this.lastSound = "";
    this.index = 0;
    this.id = id;
    this.sendCount = 0;
    this.queue = [];
    this.registers['p'] = id;

    this.instP1 = {
        "set": (a, b) => { this.registers[a] = this.parse(b); this.index++; },
        "mul": (a, b) => { this.registers[a] *= this.parse(b); this.index++; },
        "add": (a, b) => { this.registers[a] += this.parse(b); this.index++; },
        "mod": (a, b) => { this.registers[a] = this.registers[a] % this.parse(b); this.index++; },
        "snd": a => { this.lastSound = this.parse(a); this.index++; },
        "jgz": (a, b) => { this.index += this.parse(a) > 0 ? this.parse(b) : 1; },
        "rcv": a => { if (this.parse(a) > 0) { console.log('recovered', this.lastSound); return true; } this.index++; }
    }
    this.instP2 = {
        "set": this.instP1.set,
        "mul": this.instP1.mul,
        "add": this.instP1.add,
        "mod": this.instP1.mod,
        "jgz": this.instP1.jgz,
        "snd": a => { programs[(this.id + 1) % 2].queue.push(this.parse(a)); this.index++; this.sendCount++; },
        "rcv": a => { if (this.queue.length > 0) { this.registers[a] = this.queue.shift(); this.index++; } }
    }
    Program.prototype.executeP1 = function () {
        return this.instP1[commands[this.index].name](...commands[this.index].args);
    }
    Program.prototype.executeP2 = function () {
        return this.instP2[commands[this.index].name](...commands[this.index].args);
    }
    Program.prototype.parse = function (b) {
        return isNaN(b) ? this.registers[b] : parseInt(b);
    }
    Program.prototype.finished = function () {
        return this.index < 0 || this.index >= commands.length;
    }
    Program.prototype.finishedOrStalled = function () {
        return this.finished() || (commands[this.index].name == 'rcv' && this.queue.length == 0);
    }
}

// part 1
var prog = new Program(0);
while (!prog.executeP1());


function Duet(id) {
    this.registers = {};
    this.lastSound = "";
    this.index = 0;
    this.sendCount = 0;
    this.id = id;
    this.registers['p'] = id;
    this.queue = [];

    this.instP1 = {
        "set": (a, b) => { this.registers[a] = this.parse(b); this.index++ },
        "add": (a, b) => { this.registers[a] += this.parse(b); this.index++ },
        "mul": (a, b) => { this.registers[a] *= this.parse(b); this.index++ },
        "mod": (a, b) => { this.registers[a] %= this.parse(b); this.index++ },
        "snd": (a) => { this.lastSound = this.parse(a); this.index++ },
        "jgz": (a, b) => { this.index += this.parse(a) > 0 ? this.parse(b) : 1 },
        "rcv": (a) => {
            if (this.parse(a) > 0) {
                console.log('recovered ' + this.lastSound); return true;
            }
            this.index++;
        }
    }

    this.instP2 = {
        "set": this.instP1.set,
        "add": this.instP1.add,
        "mul": this.instP1.mul,
        "mod": this.instP1.mod,
        "jgz": this.instP1.jgz,
        "snd": (a) => {
            programs[(this.id +1)%2].queue.push(this.parse(a));
            this.index++;
            this.sendCount++;
        },
        // "snd": a => { 
        //     programs[(this.id + 1) % 2].queue.push(this.parse(a)); 
        //     this.index++; 
        //     this.sendCount++;
        // },
        "rcv": (a) => {
            if(this.queue.length) {
                this.registers[a] = this.queue.shift()
                this.index++;
            }
        }
    }

    Duet.prototype.executeP1 = function () {
        return this.instP1[commands[this.index].name](...commands[this.index].args);
    }
    Duet.prototype.executeP2 = function () {
        return this.instP2[commands[this.index].name](...commands[this.index].args);
    }
    Duet.prototype.parse = function (b) {
        return isNaN(b) ? this.registers[b] : parseInt(b)
    }
    Duet.prototype.finished = function () {
        return this.index < 0 || this.index >= commands.length;
    }
    Duet.prototype.finishedOrStalled = function () {
        return this.finished() || (commands[this.index].name == 'rcv' && this.queue.length == 0);
    }
}

programs = [new Program(0), new Program(1)]
do {
	programs.forEach(d => { if(!d.finished()) d.executeP2(); })
} while(!programs.reduce((a,b) => a && b.finishedOrStalled(),true))

