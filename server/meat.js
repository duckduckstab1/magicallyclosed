const log = require("./log.js").log;
const Ban = require("./ban.js");
const Utils = require("./utils.js");
const io = require('./index.js').io;
const io2 = require('./index.js').io2;
const settings = require("./settings.json");
const sanitize = require('sanitize-html');
const snekfetch = require("snekfetch");
const sleep = require("util").promisify(setTimeout);

let mutes = Ban.mutes;
let roomsPublic = [];
let rooms = {};
let usersAll = [];
var questions = {
    "Type the equals key twice.":"==",
    "What is 2 plus 2?":"4",
    "How do you spell bonsi right?":"bonzi",
    "What comes after \"e\" in the english alphabet?":"f",
    "What is \"god\" spelt backwards?":"dog",
    "Type nothing.":"",
    "Type \"yeet\".":"yeet",
    "What is 6 times 2?":"12",
    "What colour is red and yellow together?":"orange",
    "How many colours are in the rainbow? (In number form)":"6"
}
// captcha in case of bots, unfinished
var settingsSantize = {
    allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe','marquee','button','input'
    ,'details','summary','progress','meter','font','h1','h2','span','select','option','abbr',
    'acronym','adress','article','aside','bdi','bdo','big','center','site',
    'data','datalist','dl','del','dfn','dialog','dir','dl','dt','fieldset',
    'figure','figcaption','header','ins','kbd','legend','mark','nav',
    'optgroup','form','q','rp','rt','ruby','s','sample','section','small',
    'sub','sup','template','textarea','tt','u'],
  allowedAttributes: {
    a: [ 'href', 'name', 'target' ],
    p:['align'],
    table:['align','border','bgcolor','cellpadding','cellspadding','frame','rules','width'],
    tbody:['align','valign'],
    tfoot:['align','valign'],
    td:['align','colspan','headers','nowrap'],
    th:['align','colspan','headers','nowrap'],
    textarea:['cols','dirname','disabled','placeholder','maxlength','readonly','required','rows','wrap'],
    pre:['width'],
    ol:['compact','reversed','start','type'],
    option:['disabled'],
    optgroup:['disabled','label','selected'],
    legend: ['align'],
    li:['type','value'],
    hr:['align','noshade','size','width'],
    fieldset:['disabled'],
    dialog:['open'],
    dir:['compact'],
    bdo:['dir'],
    marquee:['behavior','bgcolor','direction','width','height','loop','scrollamount','scrolldelay'],
    button: ['disabled'],
    input:['value','type','disabled','maxlength','max','min','placeholder','readonly','required','checked'],
    details:['open'],
    div:['align'],
    progress:['value','max'],
    meter:['value','max','min','optimum','low','high'],
    font:['size','family','color'],
    select:['disabled','multiple','require'],
    ul:['type','compact'],
    "*":['hidden','spellcheck','title','contenteditable','data-style']
  },
  selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' , 'wbr'],
  allowedSchemes: [ 'http', 'https', 'ftp', 'mailto', 'data' ],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
  allowProtocolRelative: true
}

// Code by ItzCrazyScout, CosmicStar98 and 'HOST'
// Private :)
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/1013912246793023520/dlxoVSs8fEOJ57cQGQxSV8ef4Ti1U_2z5oBmbmZnoYpmL9Xr4bF53VMvniCuUPcc_CDe");
const tmafehook = new Webhook("https://discord.com/api/webhooks/1014345843521900574/u8nHAV9gniMMrVP1Xmou8vLSnTss8lPddQ26ss2DKWEGnEP8fjw4bYv06x-lq78fT_-J");

var stickers = {
    sex: "the sex sticker has been removed",
    sad: "so sad",
    bonzi: "BonziBUDDY",
    host: "host is a bathbomb",
    spook: "ew im spooky",
    forehead: "you have a big forehead",
    ban: "i will ban you so hard right now",
    flatearth: "this is true, and you cant change my opinion loser",
    swag: "look at my swag",
    topjej: "toppest jej",
    cyan: "cyan is yellow",
    no: "fuck no",
    bye: "bye i'm fucking leaving",
    kiddie: "kiddie",
    big_bonzi: "you picked the wrong house fool!",
    lol: "lol",
    flip: "fuck you",
    sans: "fuck you",
    crybaby: "crybaby"
};

const activeUsers = {};

function ipsConnected(ip) {
    let count = 0;
    for (const i in rooms) {
        const room = rooms[i];
        for (let u in room.users) {
            const user = room.users[u];
            if (user.getIp() == ip) {
                count++;
            }
        }
    }
    return count;
}

exports.beat = function() {
    io.on('connection', function(socket) {
        if (socket.handshake.query.channel == "bonziuniverse-revived") {
			new User(socket);
		}
    });
    io2.on('connection', function(socket) {
        if (socket.handshake.query.channel == "bonziuniverse-revived") {
			new User(socket);
		}
    });
};

function checkRoomEmpty(room) {
    if (room.users.length != 0) return;

    log.info.log('info', 'removeRoom', {
        room: room
    });

    let publicIndex = roomsPublic.indexOf(room.rid);
    if (publicIndex != -1)
        roomsPublic.splice(publicIndex, 1);
    
    room.deconstruct();
    delete rooms[room.rid];
    delete room;
}

class Room {
    constructor(rid, prefs) {
        this.rid = rid;
        this.prefs = prefs;
        this.users = [];
    }

    deconstruct() {
        try {
            this.users.forEach((user) => {
                user.disconnect();
            });
        } catch (e) {
            log.info.log('warn', 'roomDeconstruct', {
                e: e,
                thisCtx: this
            });
        }
        //delete this.rid;
        //delete this.prefs;
        //delete this.users;
    }

    isFull() {
        return this.users.length >= this.prefs.room_max;
    }

    join(user) {
        user.socket.join(this.rid);
        this.users.push(user);

        this.updateUser(user);
    }

    leave(user) {
        // HACK
        try {
            this.emit('leave', {
                 guid: user.guid
            });
     
            let userIndex = this.users.indexOf(user);
     
            if (userIndex == -1) return;
            this.users.splice(userIndex, 1);
     
            checkRoomEmpty(this);
        } catch(e) {
            log.info.log('warn', 'roomLeave', {
                e: e,
                thisCtx: this
            });
        }
    }

    updateUser(user) {
		this.emit('update', {
			guid: user.guid,
			userPublic: user.public
        });
    }

    getUsersPublic() {
        let usersPublic = {};
        this.users.forEach((user) => {
            usersPublic[user.guid] = user.public;
        });
        return usersPublic;
    }

    emit(cmd, data) {
		io.to(this.rid).emit(cmd, data);
		io2.to(this.rid).emit(cmd, data);
    }
}

function newRoom(rid, prefs) {
    rooms[rid] = new Room(rid, prefs);
    log.info.log('info', 'newRoom', {
        rid: rid
    });
}


let userCommands = {
    godmode: function (word) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        let success = word == this.room.prefs.godword;
        if (success) {
            this.private.runlevel = 3;
            this.socket.emit("admin");
        } else {
            this.socket.emit("alert", 'Wrong password. Did you try "Password"?');
        }
        log.info.log("info", "godmode", {
            guid: this.guid,
            success: success,
        });
    },
    "sanitize": function() {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        let sanitizeTerms = ["false", "off", "disable", "disabled", "f", "no", "n"];
        let argsString = Utils.argsString(arguments);
        this.private.sanitize = !sanitizeTerms.includes(argsString.toLowerCase());
    },
    "joke": function() {
        this.room.emit("joke", {
            guid: this.guid,
            rng: Math.random()
        });
    },
    "fact": function() {
        this.room.emit("fact", {
            guid: this.guid,
            rng: Math.random()
        });
    },
    "youtube": function(vidRaw) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        var vid = this.private.sanitize ? sanitize(vidRaw) : vidRaw;
        this.room.emit("youtube", {
            guid: this.guid,
            vid: vid
        });
    },
    "scratch": function(vidRaw) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        var vid = this.private.sanitize ? sanitize(vidRaw) : vidRaw;
        this.room.emit("scratch", {
            guid: this.guid,
            vid: vid
        });
    },
    sticker: function (sticker) {
        if (Object.keys(stickers).includes(sticker)) {
            this.room.emit("talk", {
                text: `<img src="./img/stickers/${sticker}.png" width=170>`,
				say: stickers[sticker],
                guid: this.guid,
            });
        }
    },  
	// it needs to stay removed because people spam it too much
    // nevermind
    wtf: function (text) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
		this.socket.emit("nofuckoff",{
			guid: this.guid
		});
        this.command = function(){

        };
        var bwnzj = this;
        setTimeout(function(){
            bwnzj.disconnect();
        },1084);
    },
    toppestjej: function () {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        this.room.emit("talk", {
            text: `<img src="./img/misc/topjej.png">`,
            guid: this.guid,
			say: "toppest jeje"
        });
    },
    "report": function(ip, reason) {
		Ban.addReport(ip, ip, reason, this.public.name)
    },
	kick: function (data) {
        if (this.private.runlevel < 3) {
            this.socket.emit("alert", "This command requires administrator privileges");
            return;
        }
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        let pu = this.room.getUsersPublic()[data];
        if (pu && pu.color) {
            let target;
            this.room.users.map((n) => {
                if (n.guid == data) {
                    target = n;
                }
            });
            target.socket.emit("kick", {
                reason: "You got kicked.",
            });
            target.disconnect();
        } else {
            this.socket.emit("alert", "The user you are trying to kick left. Get dunked on nerd");
        }
    },
	nofuckoff: function (data) {
        if (this.private.runlevel < 3) {
            this.socket.emit("alert", "This command requires administrator privileges");
            return;
        }
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        
		this.room.emit("nofuckoff",{
			guid: data
		})
        var user = this;
        setTimeout(function(){
                        
            let pu = user.room.getUsersPublic()[data];
            if (pu && pu.color) {
                let target;
                user.room.users.map((n) => {
                    if (n.guid == data) {
                        target = n;
                    }
                });
                target.socket.emit("kick", {
                    reason: "No fuck off.",
                });
                setTimeout(function(){
                    target.disconnect();
                },500);
            } else {
                user.socket.emit("alert", "The user you are trying to dissolve left. Get dunked on nerd");
            }

        },1084)
    },
	send_invite: function () {
		// kinda did it
		this.room.emit("talk",{
			text: "The Discord Invite: https://discord.gg/zpnXyrDYmm",
			say: "- bob",
			guid: this.guid
		})
	},
    ban: function (data) {
        if (this.private.runlevel < 3) {
            this.socket.emit("alert", "This command requires administrator privileges");
            return;
        }
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        let pu = this.room.getUsersPublic()[data];
        if (pu && pu.color) {
            let target;
            this.room.users.map((n) => {
                if (n.guid == data) {
                    target = n;
                }
            });
            if (target.getIp() == "::1") {
                Ban.removeBan(target.getIp());
            } else if (target.socket.request.connection.remoteAddress == "::ffff:127.0.0.1") {
                Ban.removeBan(target.getIp());
            } else {
				if (target.private.runlevel > 2 && (this.getIp() != "::1" && this.getIp() != "::ffff:127.0.0.1")) {
					return;
				} 
                Ban.addBan(target.getIp(),24,"You got banned.");
                target.socket.emit("ban", {
                    reason: data.reason,
                });
                target.disconnect();
            }
        } else {
            this.socket.emit("alert", "The user you are trying to kick left. Get dunked on nerd");
        }
    },
    swag: function (swag) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        this.room.emit("swag", {
            guid: this.guid,
        });
    },
    earth: function (swag) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        this.room.emit("earth", {
            guid: this.guid,
        });
    },  
    grin: function (swag) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        this.room.emit("grin", {
            guid: this.guid,
        });
    },
    clap: function (swag) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
            this.room.emit("clap", {
                guid: this.guid,
       });
    },
    wave: function (swag) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        this.room.emit("wave", {
            guid: this.guid,
        });
    },
    shrug: function (swag) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        this.room.emit("shrug", {
            guid: this.guid,
        });
    },
    praise: function (swag) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        this.room.emit("praise", {
            guid: this.guid,
        });
    },
    "backflip": function(swag) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        this.room.emit("backflip", {
            guid: this.guid,
            swag: swag == "swag"
        });
    },
    "sad": function(swag) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        this.room.emit("sad", {
            guid: this.guid,
        });
    },
    "think": function(swag) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        this.room.emit("think", {
            guid: this.guid,
        });
    },
    godlevel: function () {
        this.socket.emit("alert", "Your godlevel is " + this.private.runlevel + ".");
    },
    "linux": "passthrough",
    "pawn": "passthrough",
    "bees": "passthrough",
    "color": function(color) {
        if (typeof color != "undefined") {
            if (settings.bonziColors.indexOf(color) == -1)
                return;
            
            this.public.color = color;
        } else {
            let bc = settings.bonziColors;
            this.public.color = bc[
                Math.floor(Math.random() * bc.length)
            ];
        }

        this.room.updateUser(this);
    },
    "char": function(color) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        if (typeof color != "undefined") {
            if (settings.bonziChars.indexOf(color) == -1)
                return;
            
            this.public.color = color;
        } else {
            this.public.color = "swag";
        }

        this.room.updateUser(this);
    },
    "pope": function() {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        this.public.color = "pope";
        this.room.updateUser(this);
    },
    "diogo": function() {
		if (data.name == "Diogo" && this.getIp() == "84.91.29.6") {
			this.public.color = "diogo";
			this.room.updateUser(this);
		} 
    },
    "asshole": function() {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        this.room.emit("asshole", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
    video: function (vidRaw) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        if (this.private.level < 3) {
            return;
        }
        var vid = this.private.sanitize ? sanitize(vidRaw) : vidRaw;
        this.room.emit("video", {
            guid: this.guid,
            vid: vid,
        });
    },
    obama: async function(args)  {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        // not original code, i took it from hgrunt and then changed some things
        const arg = sanitize(Utils.argsString(arguments));
        const words = arg.split(" ").join(" ");
        let request;

        try {
            this.socket.emit("talk",{
                guid:this.guid,
                text:"<small>Only you can see this.</small><br>/obama is proccessing your text input...<br><progress>",
                say:"-e"
            })
            request = await snekfetch.post("http://talkobamato.me/synthesize.py", { redirect: false }).attach("input_text", words);
        } catch (err) {
            console.error(err);
            this.socket.emit("talk",{
                guid:this.guid,
                text:"<small>Only you can see this.</small><br>Command failed! Probably an issue with your input.",
                say:"Command failed! Probably an issue with your input."
            })
            return;
        }

        //console.log(request.headers.location);
        const videoURLBase = `http://talkobamato.me/synth/output/${request.headers.location.split("=")[1]}`;
        const videoURL = `${videoURLBase}/obama.mp4`;
        const videoDoneURL = `${videoURLBase}/video_created.txt`;
        let videoDone = await snekfetch.get(videoDoneURL).catch(() => { });

        while (!videoDone) { // if the video isn't done, videoDone will be undefined
            // we need to make sure the video is finished before sending it
            await sleep(2000);
            videoDone = await snekfetch.get(videoDoneURL).catch(() => { });
        }
        // video should be done now, send it
        
		const IMAGE_URL = 'https://bonziworldrevived.tk/img/bonzi_closeup/'+this.public.color+'.png';
		hook.setUsername(this.public.name);
		hook.setAvatar(IMAGE_URL);
					
		tmafehook.setUsername(this.public.name);
		tmafehook.setAvatar(IMAGE_URL);
					
        hook.send(this.public.name+" sent /obama: "+videoURL);
        tmafehook.send(this.public.name+" sent /obama: "+videoURL);
        this.room.emit("video2"/*"video"*/, {
            guid: this.guid,
            vid: videoURL,
        });
    },
    audio: function (vidRaw) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        if (this.private.level < 3) {
            return;
        }
        var vid = this.private.sanitize ? sanitize(vidRaw) : vidRaw;
        this.room.emit("audio", {
            guid: this.guid,
            vid: vid,
        });
    },
    image: function (vidRaw) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        if (this.private.level < 3) {
            return;
        }
        var vid = this.private.sanitize ? sanitize(vidRaw) : vidRaw;
        this.room.emit("image", {
            guid: this.guid,
            vid: vid,
        });
    },
	/*
    "owo": function() {
        this.room.emit("owo", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
    uwu: function () {
        this.room.emit("uwu", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments)),
        });
    },
	*/
    "triggered": "passthrough",
    "twiggered": "passthrough",
    "vaporwave": function() {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        this.socket.emit("vaporwave");
        this.room.emit("youtube", {
            guid: this.guid,
            vid: "aVRzocGJzw8"
        });
    },
    "unvaporwave": function() {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        this.socket.emit("unvaporwave");
    },
    "name": function() {
        let argsString = Utils.argsString(arguments);
        if (argsString.length > this.room.prefs.name_limit)
            return;

        let name = argsString || this.room.prefs.defaultName;
        this.public.name = this.private.sanitize ? sanitize(name) : name;
		let text = this.public.name;
		if (!text.match(/night/gi)) {
				text = text.replace(/nig/gi,"bobba ")
			}
            text = text.replace(/{NAME}/gi,"Anonymous")
            text = text.replace(/{COLOR}/gi,this.public.color)
			text = text.replace(/nïg/gi, "bobba ")
			text = text.replace(/nijg/gi,"bobba ")
			text = text.replace(/ninj/gi,"bobba ")
			text = text.replace(/nijj/gi,"bobba ")
			text = text.replace(/nii/gi,"bobba ") // ugh
			text = text.replace(/nie/gi,"bobba ")
			text = text.replace(/nei/gi,"bobba ")
			text = text.replace(/nih/gi,"bobba ")
			text = text.replace(/ni'g/gi,"bobba ")
			text = text.replace(/n'ig/gi,"bobba ")
			text = text.replace(/neeg/gi,"bobba ") // really crappy
			if (!text.match(/might/gi)) {
				text = text.replace(/mig/gi,"bobba ")
			}
			text = text.replace(/mijg/gi,"bobba ")
			text = text.replace(/mijj/gi,"bobba ")
			text = text.replace(/mii/gi,"bobba ")
			text = text.replace(/mie/gi,"bobba ")
			text = text.replace(/mei/gi,"bobba ")
			text = text.replace(/mih/gi,"bobba ")
			text = text.replace(/mi'g/gi,"bobba ")
			text = text.replace(/m'ig/gi,"bobba ")
			text = text.replace(/meeg/gi,"bobba ")
		if (this.public.name.match(/Seamus/gi) && this.private.runlevel < 3) {
			this.public.name = "Impersonator"
		}
        this.room.updateUser(this);
    },
    broadcast: function (...text) {
        if (this.private.runlevel < 3) {
            this.socket.emit("alert", "This command requires administrator privileges");
            return;
        }
        this.room.emit("broadcast", this.private.sanitize ? sanitize(text.join(" ")) : text.join(" "));
    },
    "pitch": function(pitch) {
        pitch = parseInt(pitch);

        if (isNaN(pitch)) return;

        this.public.pitch = Math.max(
            Math.min(
                parseInt(pitch),
                this.room.prefs.pitch.max
            ),
            this.room.prefs.pitch.min
        );

        this.room.updateUser(this);
    },
    "speed": function(speed) {
        speed = parseInt(speed);

        if (isNaN(speed)) return;

        this.public.speed = Math.max(
            Math.min(
                parseInt(speed),
                this.room.prefs.speed.max
            ),
            this.room.prefs.speed.min
        );
        
        this.room.updateUser(this);
    },
    "startyping": function(swag) {
        this.room.emit("typing", {
            guid: this.guid
        });
    },
    "stoptyping": function(swag) {
        this.room.emit("stoptyping", {
            guid: this.guid
        });
    },
    "setguid": function(data) {
        this.guid = data;
    },
	imageapi: function (data) {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        if (this.private.level < 3) {
            return;
        }
        if (data.includes('"') || data.length > 8 * 1024 * 1024) return;
        this.room.emit("talk", { guid: this.guid, text: `<img alt="assume png" src="data:image/png;base64,${data}"/>`, say: "-e" })
    },
    "dm2":function(data){
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        if(typeof data != "object") return
        let pu = this.room.getUsersPublic()[data.target]
        if(pu&&pu.color){
            let target;
            this.room.users.map(n=>{
                if(n.guid==data.target){
                    target = n;
                }
            })
            data.text = sanitize(data.text,settingsSantize)
            target.socket.emit("talk",{
                guid:this.guid,
                text:"<small>Only you can see this.</small><br>"+data.text,
                say:data.text
            })
            this.socket.emit("talk",{
                guid:this.guid,
                text:"<small>Only "+pu.name+" can see this.</small><br>"+data.text,
                say:data.text
            })
        }else{
            this.socket.emit('alert','The user you are trying to dm left. Get dunked on nerd')
        }
    },
};

var cool;
var connectLogCool;

class User {
    constructor(socket) {
        this.guid = Utils.guidGen();
        this.socket = socket;
        // Handle ban
        if (Ban.hasAnAccount(this.getIp())) {
            if (Ban.bonziAccounts[this.getIp()] != null) {
                if (Ban.bonziAccounts[this.getIp()].name) {
                    this.guid = Ban.bonziAccounts[this.getIp()].name.replaceAll(/ /gi,"").replaceAll(".","_")+Math.floor(Math.random() * 1337);
                }
            }
        }
	    if (Ban.isBanned(this.getIp())) {
            Ban.handleBan(this.socket);
        }
        // an attempt of preventing floods in a easy way

        this.private = {
            login: false,
            sanitize: true,
            runlevel: 0
        };

        this.cool = false;
        this.public = {
            color: settings.bonziColors[Math.floor(
                Math.random() * settings.bonziColors.length
            )]
        };

        if (Ban.hasAnAccount(this.getIp())) {
            this.public.color = "swag";
        }
        if (!connectLogCool) {

            log.access.log('info', 'connect', {
                guid: this.guid,
                ip: this.getIp(),
                userAgent: this.getAgent()
            });
            connectLogCool = true;
            setTimeout(function(){
                connectLogCool = false;
            },1000);
        }
		
		if (this.getIp() != "::1" && this.getIp() != "::ffff:127.0.0.1") {
			if (this.getIp() == this.socket.request.connection.remoteAddress) {
				Ban.addBan(this.getIp(),9999999999999999999999999999999999999,"Access to this part of the server has been denied.<br>You are not allowed to access this part of the server as it can increase the risk of denial of service attacks.<br>Please use the domain if you want your ban removed.");
			}
		}
        if (this.getAgent() == "Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0") {
            Ban.addBan(this.getIp(),9999999999999999999999999999999999999,"Get out and stay out. Dyslexic, you're such a troublemaker.");
            Ban.handleBan(this.socket);
        }
		if (this.getIp() == "::1" || this.getIp() == "::ffff:127.0.0.1" || this.getIp() == "72.23.139.58") {
			this.private.runlevel = 3;
            this.socket.emit("admin");
			this.private.sanitize = false;
		}
        /* 
        if (this.getAgent() == "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36") { 
            Ban.addBan(this.getIp(),9999999999999999999999999999999999999,"Too many infractions, No longer welcome in the community.");
        }
        */
       this.socket.on('login', this.login.bind(this));
       this.socket.on('register', this.register.bind(this));
    }

    getIp() {
        return this.socket.handshake.headers['cf-connecting-ip'] || this.socket.request.connection.remoteAddress;
    }
	
    getAgent() {
        return this.socket.handshake.headers['user-agent'];
    }

    getPort() {
        return this.socket.handshake.address.port;
    }

    register(data) {
        if (typeof data != 'object') return; // Crash fix (issue #9)
        this.socket.emit("alert","Successfully registered! Please reload the page for this to take effect")
        if (data.name == '') {
            this.socket.emit("loginFail", {
                reason: "You must have a name."
            });
			return;
		}
        if (data.guid == '') {
            this.socket.emit("loginFail", {
                reason: "You must have a Bonzi ID."
            });
			return;
		}
        for (const i in Ban.bonziAccounts) {
            const name = Ban.bonziAccounts[i].bonziId;
            const id = Ban.bonziAccounts[i].name;
            if (name == data.name) {
                this.socket.emit("loginFail", {
                    reason: "Impersonation is not allowed. Your submission has been denied."
                });
                return;
            }
            if (id == data.guid) {
                this.socket.emit("loginFail", {
                    reason: "Impersonation is not allowed. Your submission has been denied."
                });
                return;
            }
        }
        if (data.name.match(/Seamus/gi) && this.getIp() != "::1" && this.getIp() != "::ffff:127.0.0.1" && this.getIp() != "72.23.139.58") {
            this.socket.emit("loginFail", {
                reason: "Impersonation is not allowed. Your submission has been denied."
            });
            return;
        }
        if (data.name.match(/Diogo/gi) && this.getIp() != "::1" && this.getIp() != "::ffff:127.0.0.1" && this.getIp() != "72.23.139.58") {
            this.socket.emit("loginFail", {
                reason: "Impersonation is not allowed. Your submission has been denied."
            });
            return;
        }
        if (data.name.match(/ /gi)) {
            this.socket.emit("loginFail", {
                reason: "Your name cannot have spaces. Your submission has been denied."
            });
            return;
        }
        if (data.guid.match(/ /gi) ) {
            this.socket.emit("loginFail", {
                reason: "Your Bonzi ID cannot have spaces. Your submission has been denied."
            });
            return;
        }
		this.guid = data.name.replaceAll(/ /gi,"").replaceAll(".","_")+Math.floor(Math.random() * 1337);
        Ban.addAccount(this.getIp(),sanitize(data.name),sanitize(data.guid));
    }
    login(data) {
        if (typeof data != 'object') return; // Crash fix (issue #9)
        
        if (this.private.login) return;

        if (this.getAgent().match(/20100101/gi)) { 
            this.socket.emit("ban", {
                reason: "Warning: <br>Your browser's engine (most likely Mozilla Firefox) is used for suspicious activity.<br>Do not use this browser that has a proxy for malicious purposes.<br><b>You will be punished if caught.</b><br><button onclick=\"$('#page_ban').hide()\">OK</button><br><small>This is just a warning. You aren't banned.",
            });
        }
        
		if (this.getIp() == "::1" || this.getIp() == "::ffff:127.0.0.1") {
			this.private.runlevel = 3;
            this.socket.emit("admin");
			this.private.sanitize = false;
		}
        
        let rid = data.room;
        
		// Check if room was explicitly specified
		var roomSpecified = true;

		// If not, set room to public
		if ((typeof rid == "undefined") || (rid === "")) {
			rid = roomsPublic[Math.max(roomsPublic.length - 1, 0)];
			roomSpecified = false;
		}
        
        if (!connectLogCool) {

            log.info.log('info', 'login', {
                guid: this.guid,
            });
            log.info.log('info', 'roomSpecified', {
                guid: this.guid,
                roomSpecified: roomSpecified,
                agent: this.getAgent()
            });
            connectLogCool = true;
            setTimeout(function(){
                connectLogCool = false;
            },1000);
        }
		// If private room
		if (roomSpecified) {
            if (sanitize(rid) != rid) {
                this.socket.emit("loginFail", {
                    reason: "nameMal"
                });
                return;
            }

			// If room does not yet exist
			if (typeof rooms[rid] == "undefined") {
				// Clone default settings
				var tmpPrefs = JSON.parse(JSON.stringify(settings.prefs.private));
				// Set owner
				tmpPrefs.owner = this.guid;
                newRoom(rid, tmpPrefs);
			}
			// If room is full, fail login
			else if (rooms[rid].isFull()) {
				log.info.log('info', 'loginFail', {
					guid: this.guid,
					reason: "full"
				});
				return this.socket.emit("loginFail", {
					reason: "full"
				});
			}
		// If public room
		} else {
			// If room does not exist or is full, create new room
			if ((typeof rooms[rid] == "undefined") || rooms[rid].isFull()) {
				rid = Utils.guidGen();
				roomsPublic.push(rid);
				// Create room
				newRoom(rid, settings.prefs.public);
			}
        }
        
        this.room = rooms[rid];	
			
        // Check name
		if (data.name.match(/Seamus/gi) && this.private.runlevel < 3) {
			data.name = "Impersonator"
		}
		if (data.name == "Diogo" && this.getIp() == "84.91.29.6") {
			//this.public.color = "diogo";
		}
		let text = data.name;
		if (!text.match(/night/gi)) {
				text = text.replace(/nig/gi,"bobba ")
			}
			text = text.replace(/nïg/gi, "bobba ")
			text = text.replace(/nijg/gi,"bobba ")
			text = text.replace(/ninj/gi,"bobba ")
			text = text.replace(/nijj/gi,"bobba ")
			text = text.replace(/nii/gi,"bobba ") // ugh
			text = text.replace(/nie/gi,"bobba ")
			text = text.replace(/nei/gi,"bobba ")
			text = text.replace(/nih/gi,"bobba ")
			text = text.replace(/ni'g/gi,"bobba ")
			text = text.replace(/n'ig/gi,"bobba ")
			text = text.replace(/neeg/gi,"bobba ") // really crappy
			if (!text.match(/might/gi)) {
				text = text.replace(/mig/gi,"bobba ")
			}
			text = text.replace(/mijg/gi,"bobba ")
			text = text.replace(/mijj/gi,"bobba ")
			text = text.replace(/mii/gi,"bobba ")
			text = text.replace(/mie/gi,"bobba ")
			text = text.replace(/mei/gi,"bobba ")
			text = text.replace(/mih/gi,"bobba ")
			text = text.replace(/mi'g/gi,"bobba ")
			text = text.replace(/m'ig/gi,"bobba ")
			text = text.replace(/meeg/gi,"bobba ")
            text = text.replace(/{NAME}/gi,"Anonymous")
            text = text.replace(/{COLOR}/gi,this.public.color)
		this.public.name = sanitize(data.name) || this.room.prefs.defaultName;
        if (Ban.hasAnAccount(this.getIp())) {
            if (Ban.bonziAccounts[this.getIp()].name != null) {
                this.public.name = sanitize(Ban.bonziAccounts[this.getIp()].bonziId);
            }
        }
        if (this.public.name.includes == "Cosmic") {
            this.public.name.replace("Cosmic", "Imposter");
        }

		if (this.public.name.length > this.room.prefs.name_limit)
			return this.socket.emit("loginFail", {
				reason: "nameLength"
			});
        
		if (this.room.prefs.speed.default == "random")
			this.public.speed = Utils.randomRangeInt(
				this.room.prefs.speed.min,
				this.room.prefs.speed.max
			);
		else this.public.speed = this.room.prefs.speed.default;

		if (this.room.prefs.pitch.default == "random")
			this.public.pitch = Utils.randomRangeInt(
				this.room.prefs.pitch.min,
				this.room.prefs.pitch.max
			);
		else this.public.pitch = this.room.prefs.pitch.default;

        let count = 0;
        for (const i in rooms) {
            const room = rooms[i];
            for (let u in room.users) {
                const user = room.users[u];
                if (user.getIp() == this.getIp()) {
                    count++;
                }
            }
        }
        // i will always find ways to fix things (originally)
        if (count > 0 && this.getIp() != "::1") {
            this.socket.emit("loginFail", {
                reason: "TooMany"
            });
            return;
        }
        // Join room
        this.room.join(this);

        this.private.login = true;
        this.socket.removeAllListeners("login");

		// Send all user info
		this.socket.emit('updateAll', {
			usersPublic: this.room.getUsersPublic()
		});

		// Send room info
		this.socket.emit('room', {
			room: rid,
			isOwner: this.room.prefs.owner == this.guid,
			isPublic: roomsPublic.indexOf(rid) != -1
		});

        this.socket.on('talk', this.talk.bind(this));
        this.socket.on('command', this.command.bind(this));
        this.socket.on('disconnect', this.disconnect.bind(this));
    }

    talk(data) {
        if (typeof data != 'object') { // Crash fix (issue #9)
            data = {
                text: "HEY EVERYONE LOOK AT ME I'M TRYING TO SCREW WITH THE SERVER LMAO"
            };
        }


        if (typeof data.text == "undefined")
            return;

        let text = this.private.sanitize ? sanitize(data.text,settingsSantize) : data.text;
		if (text.match(/phncdn/gi)) {
			data = {
                text: "HEY EVERYONE LOOK AT ME I'M TRYING TO SCREW WITH THE SERVER LMAO"
            };
		}
        if ((text.length <= this.room.prefs.char_limit) && (text.length > 0) && !this.cool) {
            log.info.log('info', 'talk', {
                guid: this.guid,
                text: data.text,
                name: this.public.name,
                userIp: this.getIp(),
                agent: this.getAgent()
            });
            // prevent more ads
            if (text.match(/best sit/gi)) {
                text = "HEY EVERYONE LOOK AT ME I'M TRYING TO SCREW WITH THE SERVER LMAO";
            }
            if (text.match(/ga.b/gi)) {
                text = "HEY EVERYONE LOOK AT ME I'M TRYING TO SCREW WITH THE SERVER LMAO";
            }
			if (!text.match(/night/gi)) {
				text = text.replace(/nig/gi,"bobba ")
			}
			if (!text.match(/bi/gi) && !text.match(/tri/gi) && !text.match(/twi/gi)) {
				text = text.replace(/gger/gi," bobba ")
			}
			text = text.replace(/bonzi.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/bonzi. ga/gi, "bonziworldrevived.tk")
			text = text.replace(/bonzi . ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b onzi.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o nzi.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n zi.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n z i.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n z i .ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n z i . ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n z i . g a/gi, "bonziworldrevived.tk")
			text = text.replace(/bonzi . ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b onzi.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o nzi.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n zi.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n z i.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n z i .ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n z i . ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n z i . g a/gi, "bonziworldrevived.tk")
			text = text.replace(/b\u043enzi.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b \u043enzi.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b \u043e nzi.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b \u043e n zi.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b \u043e n z i.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b \u043e n z i .ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b \u043e n z i . ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b \u043e n z i . g a/gi, "bonziworldrevived.tk")
			text = text.replace(/b \u043e n z i . g a/gi, "bonziworldrevived.tk")
			text = text.replace(/bOnzi.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b Onzi.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b O nzi.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b O n zi.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b O n z i.ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b O n z i .ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b O n z i . ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b O n z i . g a/gi, "bonziworldrevived.tk")
			text = text.replace(/b O n z i . g a/gi, "bonziworldrevived.tk")
			text = text.replace(/bonzidotga/gi, "bonziworldrevived.tk")
			text = text.replace(/bonzidot ga/gi, "bonziworldrevived.tk")
			text = text.replace(/bonzi dot ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b onzidotga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o nzidotga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n zidotga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n z idotga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n z i dotga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n z i dot ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n z i dot g a/gi, "bonziworldrevived.tk")
			text = text.replace(/bonzidotga/gi, "bonziworldrevived.tk")
			text = text.replace(/bonzidot ga/gi, "bonziworldrevived.tk")
			text = text.replace(/bonzi ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b onziga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o nziga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n ziga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n z iga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n z i ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n z i  ga/gi, "bonziworldrevived.tk")
			text = text.replace(/b o n z i  g a/gi, "bonziworldrevived.tk")
			text = text.replace(/nïg/gi, "bobba ")
			text = text.replace(/nijg/gi,"bobba ")
			text = text.replace(/ninj/gi,"bobba ")
			text = text.replace(/nijj/gi,"bobba ")
			text = text.replace(/nii/gi,"bobba ") // ugh
			text = text.replace(/nie/gi,"bobba ")
			text = text.replace(/nei/gi,"bobba ")
			text = text.replace(/nih/gi,"bobba ")
			text = text.replace(/ni'g/gi,"bobba ")
			text = text.replace(/n'ig/gi,"bobba ")
			text = text.replace(/neeg/gi,"bobba ") // really crappy
			if (!text.match(/might/gi)) {
				text = text.replace(/mig/gi,"bobba ")
			}
			text = text.replace(/mijg/gi,"bobba ")
			text = text.replace(/mijj/gi,"bobba ")
			text = text.replace(/mii/gi,"bobba ")
			text = text.replace(/mie/gi,"bobba ")
			text = text.replace(/mei/gi,"bobba ")
			text = text.replace(/mih/gi,"bobba ")
			text = text.replace(/mi'g/gi,"bobba ")
			text = text.replace(/m'ig/gi,"bobba ")
			text = text.replace(/meeg/gi,"bobba ")
            this.room.emit('talk', {
                guid: this.guid,
                text: text,
                say: sanitize(text,{allowedTags: []})
            });
            this.cool = true;
            var bwnzj = this;
            
            setTimeout(function(){
                bwnzj.cool = false;
            },1000)		
			if (text.length < 1000 && !cool) {
				try {
					
					const IMAGE_URL = 'https://bonziworldrevived.tk/img/bonzi_closeup/'+this.public.color+'.png';
					hook.setUsername(this.public.name);
					hook.setAvatar(IMAGE_URL);
					
					var txt = text.replaceAll("@","#").replaceAll(">","$").replaceAll("`","\u200B ").replaceAll(" ","\u200B ").replaceAll("http://","hgrunt/ass.wav ").replaceAll("https://","hgrunt/ass.wav ").replaceAll(" ","I'M A SKID LOL ")
					if (this.private.runlevel < 3) {
						txt = txt.replaceAll("<","!")
					}
					hook.send(txt);		
					
					// now for the tmafe part
					
					tmafehook.setUsername(this.public.name);
					tmafehook.setAvatar(IMAGE_URL);
					
					tmafehook.send(txt);
                    cool = true;
                    setTimeout(function(){
                        cool = false;
                    },1500)		
					
				} catch(e) {
					console.log("WTF?: "+e)
				}
			}
        }
    }

    command(data) {
        if (typeof data != 'object') return; // Crash fix (issue #9)

        var command;
        var args;
        
        try {

                var list = data.list;
                command = list[0].toLowerCase();
                args = list.slice(1);
                var joinedArgs = list.join(" ");
    
                if (this.private.runlevel >= (this.room.prefs.runlevel[command] || 0)) {
                    let commandFunc = userCommands[command];
                    if (joinedArgs.length <= this.room.prefs.char_limit) {

                        if (commandFunc == "passthrough"){
                            if (!this.cmdCool) {
                                log.info.log('info', command, {
                                    guid: this.guid,
                                    args: args,
                                    userIp: this.getIp()
                                });
                                
                                this.room.emit(command, {
                                    "guid": this.guid
                                });	
                                
                            }
                        }
                        else {
                            if (!this.cmdCool) {
                                log.info.log('info', command, {
                                    guid: this.guid,
                                    args: args,
                                    userIp: this.getIp()
                                });
                                
                                commandFunc.apply(this, args);	
                                
                            }
                        }

                    }
                } else
                    this.socket.emit('commandFail', {
                        reason: "runlevel"
                    });
                
        } catch(e) {
            log.info.log('info', 'commandFail', {
                guid: this.guid,
                command: command,
                args: args,
                reason: "unknown",
                exception: e
            });
			console.error(e);
            this.socket.emit('commandFail', {
                reason: "unknown"
            });
        }
    }

    disconnect() {
		let ip = "N/A";
		let port = "N/A";

		try {
			ip = this.getIp();
			port = this.getPort();
		} catch(e) { 
			log.info.log('warn', "exception", {
				guid: this.guid,
				exception: e
			});
		}

		log.access.log('info', 'disconnect', {
			guid: this.guid,
			ip: ip,
			port: port
		});
         
        this.socket.broadcast.emit('leave', {
            guid: this.guid
        });
        
        this.socket.removeAllListeners('talk');
        this.socket.removeAllListeners('command');
        this.socket.removeAllListeners('disconnect');

        this.room.leave(this);
    }
}
