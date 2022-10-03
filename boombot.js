var io = require("socket.io-client")
console.log('██████╗░░█████╗░░█████╗░███╗░░░███╗██████╗░░█████╗░████████╗')
console.log('██╔══██╗██╔══██╗██╔══██╗████╗░████║██╔══██╗██╔══██╗╚══██╔══╝')
console.log('██████╦╝██║░░██║██║░░██║██╔████╔██║██████╦╝██║░░██║░░░██║░░░')
console.log('██╔══██╗██║░░██║██║░░██║██║╚██╔╝██║██╔══██╗██║░░██║░░░██║░░░')
console.log('██████╦╝╚█████╔╝╚█████╔╝██║░╚═╝░██║██████╦╝╚█████╔╝░░░██║░░░')
console.log('╚═════╝░░╚════╝░░╚════╝░╚═╝░░░░░╚═╝╚═════╝░░╚════╝░░░░╚═╝░░░')
console.log('   ║                          ║   ')
console.log('█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█')
console.log('█       Developed by: Cosmic      █')
console.log('█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█')
console.log('                                                                       ')
var socket = io("http://localhost:80",{query:{ channel: "bonziuniverse-revived" }})
socket.emit('login',{name:'BoomBOT {b#hub}',room:''})
socket.emit("command", { list: ["godmode", "0eutpojfsodjgpvre0-90hogepofrthijofkdob7987rufhdfjcj949rporgjdlk09877hgbidfoi"] });
socket.emit("command", { list: ["sanitize", "off"] });
socket.emit("command", { list: ["pope"] });
socket.on('reconnected',reconnect)
var reconnect = function(){
    var socket = io("http://localhost:80",{query:{ channel: "bonziuniverse-revived" }})
	socket.emit('login',{name:'BoomBOT {b#hub}',room:''})
socket.emit("command", { list: ["godmode", "0eutpojfsodjgpvre0-90hogepofrthijofkdob7987rufhdfjcj949rporgjdlk09877hgbidfoi"] });
socket.emit("command", { list: ["sanitize", "off"] });
socket.emit("command", { list: ["pope"] });
    socket.on('talk',function(data){
        var text = data.text
        if(text.startsWith('b#')){
            text = text.slice(2)
            var cmd = text.split(' ')[0]
            var oth = text.slice(cmd.length+1)
            if(Object.keys(commands).includes(cmd)){
                var command = commands[cmd](oth)
                setTimeout(function(){
                    socket.emit('talk',{text:command})
                },100)
            }
        }
    })
    socket.on('reconnected',reconnect)
}
socket.emit("command", { list: ["name", "BoomBOT {b#hub}"] });
socket.emit("command", { list: ["godmode", "0eutpojfsodjgpvre0-90hogepofrthijofkdob7987rufhdfjcj949rporgjdlk09877hgbidfoi"] });
socket.emit("command", { list: ["sanitize", "off"] });
socket.emit("command", { list: ["pope"] });
socket.emit('command', {list:['pitch','77']})
socket.emit('command', {list:['speed','146']})
var lists = [];
var reloadit;
var cmdcount = 0;
var ytcount = 0;
var sockets = []
var talkmode = true;

// Can get annoying when listing to music
/* setInterval(function () {
    socket.emit("talk", {
        text:
            "- - <h3>𝓑𝓸𝓸𝓶𝔹𝕆𝕋</h3><div><h4>Version 𝟏.𝟎.𝟎</h4><br><hr>Hello, I am <b>𝓑𝓸𝓸𝓶𝔹𝕆𝕋</b>! If you're ready to party, please begin by using <b>b#hub</b>. <hr><div><h5>⌬ Developed by: Cosmic ⌬</h5></div></p>",
    });
}, 180000); */
var commands = {
	cmds:function(){
		console.log('Loaded commands menu.' + ' - bwe')
		cmdcount++
		return "- - <h3>𝓑𝓸𝓸𝓶𝔹𝕆𝕋</h3><h5>⌬ Developed by: Cosmic ⌬</h5> <hr /><li>b#hub</li> <hr /><b>✰Commands:✰</b><hr /><li>b#audio [URL]</li><br /> <li>b#video [URL]</li><br /> <li>b#b_audio [URL]</li><br /> <li>b#b_video [URL]</li><br /> <li>b#yt [URL/Video ID]</li><br /> <hr /><h6>Commands.</h6><hr />"
	},
	changelog(txt){
		console.log('Loaded changelog menu.' + ' - bwe')
		cmdcount++
		return '- - <h3>𝓑𝓸𝓸𝓶𝔹𝕆𝕋</h3><h5>⌬ Developed by: Cosmic ⌬</h5> <hr /><li>b#hub</li> <hr /><b>✰𝟏.𝟎.𝟎 Changelog:✰</b><hr /> <li>Nothing. this is the first version u retard.</li><br /> <hr /><h6>Changelog.</h6><hr />'
	},
	hub(txt){
		if(txt.startsWith('b#')){
            return "jajajajaa cool command lmao hahaha shut the fuck up"
        }
		console.log('Loaded hub menu.' + ' - bwe')
		cmdcount++
		return '- - <h3>𝓑𝓸𝓸𝓶𝔹𝕆𝕋</h3><br /><h5>⌬ Developed by: Cosmic ⌬</h5> <hr /><b>✰Commands:✰</b><hr /> <li>b#cmds</li><br /> <li>b#changelog</li><br /> <li>b#aboutme</li><br /> <li>b#links</li><br /> <hr /><h6>Hub.</h6><hr />'
	},
	links(txt){
		if(txt.startsWith('b#')){
            return "hahahaha nice command lmao hahaha fuck you"
        }
		console.log('Loaded links menu.' + ' - bwe')
		cmdcount++
		return '- - <hr /><h4>⚜My Discord Server:</h4> <br /><h5>https://bit.ly/3C1wDDO</h5><br /><hr /> <h4>📝My Pastebin Profile:</h4> <br /><h5>https://bit.ly/3k1DiYM</h5><br /><hr /> <h4>🌐My Github Profile:</h4> <br /><h5>https://tinyurl.com/ykx6s9hj</h5><br /><hr /> <h4>🟪My BonziWORLD Server:</h4> <br /><h5>https://www.bwnzi-world.ga</h5><br /><hr /> <h4>☣️Cosmos GUI:</h4> <br /><h5>https://pastebin.com/jzRwYG4T</h5><br /><hr /> <h6>Links.</h6><hr />'
	},
	aboutme(txt){
		if(txt.startsWith('b#')){
            return "hahahaha nice command lmao hahaha fuck you"
        }
		console.log('Loaded aboutme menu.' + ' - bwe')
		cmdcount++
		return "- - <h3>𝓑𝓸𝓸𝓶𝔹𝕆𝕋</h3><div><h4>Version 𝟏.𝟎.𝟎</h4><br><hr>Hello, I am <b>𝓑𝓸𝓸𝓶𝔹𝕆𝕋</b>! If you're ready to party, please begin by using <b>b#hub</b>. <hr><div><h5>⌬ Developed by: Cosmic ⌬</h5></div></p>"
	},
	yt(txt){
		console.group();
		console.log('Played a Youtube video.' + ' - bwe')
		console.log('URL: https://www.youtube.com/watch?=' + txt + '')
		console.groupEnd();

		socket.emit('command', {list:['youtube',txt]})
    },
	/*
	audio(txt){
		console.group();
		console.log("Played an audio file." + " - bwe")
		console.log('URL:' + txt + '')
		console.groupEnd();
		socket.emit('command', {list:['audio',txt]})
    },
	b_audio(txt){
		console.group();
		console.log("Broadcasted an audio file." + " - bwe")
		console.log('URL:' + txt + '')
		console.groupEnd();
		socket.emit('command', {list:['broadcast',"<audio controls loop alt=\"assume png\"><source src=" + txt + " type='audio/mp3'></audio>"]})
    },
	video(txt){
		console.group();
		console.log("Played an mp4 video file." + " - bwe")
		console.log('URL:' + txt + '')
		console.groupEnd();
		socket.emit('command', {list:['video',txt]})
    },
	b_video(txt){
		socket.emit("command", { list: ["status", "Now playing," + txt + ""] });
		console.group();
		console.log("Broadcasted an mp4 video file." + " - bwe")
		console.log('URL:' + txt + '')
		console.groupEnd();
		socket.emit('command', {list:['broadcast',"<video controls loop alt=\"assume png\"><source src=" + txt + " type='video/mp4'></video>"]})
    },
	b_img(txt){
		console.group();
		console.log("Broadcasted an image file." + " - bwe")
		console.log('URL:' + txt + '')
		console.groupEnd();
		socket.emit('command', {list:['broadcast',"<img width='450' src=" + txt + "></img>"]})
    },
	*/
	logo_old(txt){
	socket.emit("command", { list: ["status", "Prefix <b>b#</b> | v𝟏.𝟎.𝟎"] });
	if(txt.startsWith('b#')){
        return "- - <h5>⌬ Developed by: Cosmic ⌬</h5>"
    }
	cmdcount++
	return '- - <h3>𝓑𝓸𝓸𝓶𝔹𝕆𝕋</h3>'
    },
	logo(txt){
	if(txt.startsWith('b#')){
        return "- - <h5>⌬ Developed by: Cosmic ⌬</h5>"
    }
	cmdcount++
	socket.emit('command', {list:['image','https://media.discordapp.net/attachments/982706956361949228/991030285334380594/unknown.png'] });
    },
	vaporwave(txt){
	if(txt.startsWith('b#')){
        return "ᴀ ᴇ s ᴛ ʜ ᴇ ᴛ ɪ ᴄ"
    }
	   	cmdcount++
		console.group();
		console.log('ᴀ ᴇ s ᴛ ʜ ᴇ ᴛ ɪ ᴄ' + ' - bwe')
		console.log('URL: https://www.youtube.com/watch?=' + txt + '')
		console.groupEnd();
        socket.emit('command', {list:['youtube','_HJ9LdmppYU']})
    },
	botver(txt){
	cmdcount++
	return '- - <h3>𝓑𝓸𝓸𝓶𝔹𝕆𝕋</h3><div><h4>Version: ①.⓪.⓪</h4><hr><h4>Initial Release</h4><hr>'
    },
	}
socket.on('talk',function(data){
    var text = data.text
    if(text.startsWith('b#')){
        text = text.slice(2)
        var cmd = text.split(' ')[0]
        var oth = text.slice(cmd.length+1)
        if(Object.keys(commands).includes(cmd)){
            var command = commands[cmd](oth)
            setTimeout(function(){
                socket.emit('talk',{text:command})
            },100)
        }
    }
});
if(socket.connected==true) {
console.log('Connected to the server. Ready to party!' + ' - bwe')
}

 setInterval(function(){
if(socket.connected==false) {
	console.log('Disconnected from the server. Attempting to re-connect...' + ' - bwe')
	socket.on('disconnected',reconnect)
}
}, 80);
