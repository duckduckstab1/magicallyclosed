var io = require("socket.io-client")
console.log('░█████╗░░█████╗░░██████╗███╗░░░███╗██╗░█████╗░██████╗░░█████╗░████████╗')
console.log('██╔══██╗██╔══██╗██╔════╝████╗░████║██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝')
console.log('██║░░╚═╝██║░░██║╚█████╗░██╔████╔██║██║██║░░╚═╝██████╦╝██║░░██║░░░██║░░░')
console.log('██║░░██╗██║░░██║░╚═══██╗██║╚██╔╝██║██║██║░░██╗██╔══██╗██║░░██║░░░██║░░░')
console.log('╚█████╔╝╚█████╔╝██████╔╝██║░╚═╝░██║██║╚█████╔╝██████╦╝╚█████╔╝░░░██║░░░')
console.log('░╚════╝░░╚════╝░╚═════╝░╚═╝░░░░░╚═╝╚═╝░╚════╝░╚═════╝░░╚════╝░░░░╚═╝░░░')
console.log('   ║                          ║   ')
console.log('█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█')
console.log('█       Developed by: Cosmic      █')
console.log('█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█')
console.log('                                                                       ')
var socket = io("http://localhost:80")
socket.emit('login',{name:'CosmicBOT {c#hub}',room:''})
socket.on('reconnected',reconnect)
var reconnect = function(){
    var socket = io("http://localhost:80")
	socket.emit('login',{name:'CosmicBOT {c#hub}',room:''})
    socket.on('talk',function(data){
        var text = data.text
        if(text.startsWith('c#')){
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

/* socket.emit('command', {list:['aboutme','<div><h4>Version ①.⑦.①</h4><br><hr>Hello, I am <b>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</b>! If you need my assistance please start by using <b>c#hub</b>. <hr><div><h5>⌬ Developed by: Cosmic ⌬</h5></div></p>']}) */

socket.emit('command', {list:['pitch','77']})
socket.emit('command', {list:['speed','146']})
var lists = [];
var reloadit;
var cmdcount = 0;
var ytcount = 0;
var sockets = []
var talkmode = true;

var commands = {
    echo(txt){
        if(txt.startsWith('c#')){
            return "hahahaha nice spam lmao hahaha fuck you"
        }
        return txt
    },
	asshole(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice asshole... no homo lmao"
        }
		setTimeout(function () {
		console.log('Assholed ' + txt + ' - bwe')
		cmdcount++
		socket.emit('command', {list:['asshole',txt]})
		}, 990);
    },
	owo(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice boner... no homo lmao"
        }
		setTimeout(function () {
		console.log('OwO\'ed ' + txt + ' - bwe')
		cmdcount++
		socket.emit('command', {list:['owo',txt]})
		}, 990);
    },
	uwu(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice boner... no homo lmao"
        }
		setTimeout(function () {
		console.log('UwU\'ed ' + txt + ' - bwe')
		cmdcount++
		socket.emit('command', {list:['uwu',txt]})
		}, 990);
    },
	cmds:function(){
		console.log('Loaded commands menu.' + ' - bwe')
		cmdcount++
		return "- - <h3>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</h3><h5>⌬ Developed by: Cosmic ⌬</h5> <hr /><li>c#hub</li> <hr /><b>✰Commands:✰</b><hr /><li>c#copypastas</li><br /> <li>c#utilities</li><br /> <li>c#fun</li><br /> <li>c#misc</li><br /> <hr /><h6>Commands.</h6><hr />"
	},
	commands:function(){
		console.log('Loaded commands menu.' + ' - bwe')
		cmdcount++
		return "- - <h3>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</h3><h5>⌬ Developed by: Cosmic ⌬</h5> <hr /><li>c#hub</li> <hr /><b>✰Commands:✰</b><hr /><li>c#copypastas</li><br /> <li>c#utilities</li><br /> <li>c#fun</li><br /> <li>c#misc</li><br /> <hr /><h6>Commands.</h6><hr />"
	},
		copypastas(txt){
		console.log('Loaded copypastas menu.' + ' - bwe')
		cmdcount++
		return '- - <h3>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</h3><h5>⌬ Developed by: Cosmic ⌬</h5> <hr /><li>c#hub</li> <hr /><b>✰Copypastas:✰</b><hr /> <li>c#bigsmoke</li><br /> <li>c#drivepower</li><br /> <li>c#gabe</li><br />  <li>c#pacertest</li><br /> <li>c#triggered</li><br /> <li>c#cyberpunk</li><br /> <li>c#bonzibuddy</li><br /> <li>c#bonzibuddy2</li><br /> <li>c#bees</li><br /> <li>c#pawn</li><br /> <li>c#linux</li><br /> <hr /><h6>Copypastas.</h6><hr />'
	},
	utilities(txt){
		console.log('Loaded utilities menu.' + ' - bwe')
		cmdcount++
		return '- - <h3>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</h3><h5>⌬ Developed by: Cosmic ⌬</h5> <hr /><li>c#hub</li> <hr /><b>✰Utilities:✰</b><hr /> <li>c#message</li><br /> <li>c#google</li><br /> <li>c#ddg</li><br /> <li>c#bing</li><br /> <li>c#video</li><br /> <li>c#emotes</li><br /> <li>c#colors</li><br /> <hr /><h6>Utilities.</h6><hr />'
	},
	fun(txt){
		console.log('Loaded fun menu.' + ' - bwe')
		cmdcount++
		return '- - <h3>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</h3><h5>⌬ Developed by: Cosmic ⌬</h5> <hr /><li>c#hub</li> <hr /><b>✰Fun Commands:✰</b><hr /> <li>c#joke</li><br /> <li>c#fact</li><br /> <li>c#nigger</li><br /> <li>c#skiddie</li><br /> <li>c#asshole</li><br /> <li>c#owo</li><br /> <li>c#vaporwave</li><br /> <li>c#unvaporwave</li><br /> <li>c#echo</li><br /> <hr /><h6>Fun.</h6><hr />'
	},
	misc(txt){
		console.log('Loaded misc menu.' + ' - bwe')
		cmdcount++
		return '- - <h3>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</h3><h5>⌬ Developed by: Cosmic ⌬</h5> <hr /><li>c#hub</li> <hr /><b>✰Misc Commands:✰</b><hr /> <li>c#fakeerrors</li><br /> <li>c#logo</li><br /> <hr /><h6>Miscellaneous.</h6><hr />'
	},
	changelog(txt){
		console.log('Loaded changelog menu.' + ' - bwe')
		cmdcount++
		return '- - <h3>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</h3><h5>⌬ Developed by: Cosmic ⌬</h5> <hr /><li>c#hub</li> <hr /><b>✰①.⑦.① Changelog:✰</b><hr /> <li>Updated to <b>①.⑦.①</b></li><br /> <li>Added new emotes and colors</li><br /> <li>Added alternate names to some commands</li><br /> <li>Added delay before running commands to reduce spam</li><br /> <hr /><h6>Changelog.</h6><hr />'
	},
	hub(txt){
		if(txt.startsWith('c#')){
            return "jajajajaa cool command lmao hahaha shut the fuck up"
        }
		console.log('Loaded hub menu.' + ' - bwe')
		cmdcount++
		return '- - <h3>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</h3><br /><h5>⌬ Developed by: Cosmic ⌬</h5> <hr /><b>✰Commands:✰</b><hr /> <li>c#cmds</li><br /> <li>c#changelog</li><br /> <li>c#aboutme</li><br /> <li>c#links</li><br /> <hr /><h6>Hub.</h6><hr />'
	},
	help(txt){
		if(txt.startsWith('c#')){
            return "jajajajaa cool command lmao hahaha shut the fuck up"
        }
		console.log('Loaded help menu.' + ' - bwe')
		cmdcount++
		return '- - <h3>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</h3><br /><h5>⌬ Developed by: Cosmic ⌬</h5> <hr /><b>✰Commands:✰</b><hr /> <li>c#cmds</li><br /> <li>c#changelog</li><br /> <li>c#aboutme</li><br /> <li>c#links</li><br /> <hr /><h6>Help.</h6><hr />'
	},
	links(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice command lmao hahaha fuck you"
        }
		console.log('Loaded links menu.' + ' - bwe')
		cmdcount++
		return '- - <hr /><h4>⚜My Discord Server:</h4> <br /><h5>https://bit.ly/3C1wDDO</h5><br /><hr /> <h4>📝My Pastebin Profile:</h4> <br /><h5>https://bit.ly/3k1DiYM</h5><br /><hr /> <h4>🌐My Github Profile:</h4> <br /><h5>https://tinyurl.com/ykx6s9hj</h5><br /><hr /> <h4>🟪My BonziWORLD Server:</h4> <br /><h5>http://147.185.221.180:35473</h5><br /><hr /> <h6>Links.</h6><hr />'
	},
	aboutme(txt){ 
		if(txt.startsWith('c#')){
            return "hahahaha nice command lmao hahaha fuck you"
        }
		console.log('Loaded aboutme menu.' + ' - bwe')
		cmdcount++
		return '- - <h3>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</h3><div><h4>Version ①.⑦.①</h4><br><hr>Hello, I am <b>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</b>! If you need my assistance please start by using <b>c#hub</b>. <hr><div><h5>⌬ Developed by: Cosmic ⌬</h5></div></p>'
	},
	about(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice command lmao hahaha fuck you"
        }
		console.log('Loaded about menu.' + ' - bwe')
		cmdcount++
		return '- - <h3>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</h3><div><h4>Version ①.⑦.①</h4><br><hr>Hello, I am <b>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</b>! If you need my assistance please start by using <b>c#hub</b>. <hr><div><h5>⌬ Developed by: Cosmic ⌬</h5></div></p>'
	},
	fakeerrors(txt){
		if(txt.startsWith('c#')){
            return "haha cool command lmao hahaha shut the fuck up"
        }
		console.log('Loaded fakeerrors menu.' + ' - bwe')
		cmdcount++
		return '- - <h3>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</h3><h5>⌬ Developed by: Cosmic ⌬</h5> <hr /><b>✰Fake Errors:✰</b><hr /><li>c#nojavascript</li><br /> <li>c#error</li><br /> <li>c#banned</li><br /> <li>c#kicked</li><br /> <li>c#unsupported</li><br /><hr /><h6>Fake Errors.</h6><hr />'
	},
	fake_errors(txt){
		if(txt.startsWith('c#')){
            return "haha cool command lmao hahaha shut the fuck up"
        }
		console.log('Loaded fake_errors menu.' + ' - bwe')
		cmdcount++
		return '- - <h3>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</h3><h5>⌬ Developed by: Cosmic ⌬</h5> <hr /><b>✰Fake Errors:✰</b><hr /><li>c#nojavascript</li><br /> <li>c#error</li><br /> <li>c#banned</li><br /> <li>c#kicked</li><br /> <li>c#unsupported</li><br /><hr /><h6>Fake Errors.</h6><hr />'
	},
	colors(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice command lmao hahaha fuck you"
        }
		console.log('Loaded colors menu.' + ' - bwe')
		cmdcount++
		return '- - <h3>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</h3><h5>⌬ Developed by: Cosmic ⌬</h5> <hr /><b>✰Colors:✰</b><hr /><li>c#dark_red</li><br /> <li>c#red</li><br /> <li>c#orange</li><br /> <li>c#yellow</li><br /> <li>c#lemon</li><br /> <li>c#green</li><br /> <li>c#lime</li><br /> <li>c#blue</li><br /> <li>c#cyan</li><br /> <li>c#dark_purple</li><br /> <li>c#purple</li><br /> <li>c#magenta</li><br /> <li>c#pink</li><br /> <li>c#black</li><br /> <li>c#grey</li><br /> <li>c#white</li><br /> <li>c#ghost</li><br /> <li>c#brown</li><br /> <li><del>c#pope</del></li><br /> <li>c#god</li><br /> <hr /><h6>Color Picker.</h6><hr />'
	},
	emotes(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice command lmao hahaha fuck you"
        }
		console.log('Loaded emotes menu.' + ' - bwe')
		cmdcount++
		return '- - <h3>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</h3><h5>⌬ Developed by: Cosmic ⌬</h5> <hr /><b>✰Emotes:✰</b><hr /><li>c#backflip</li><br /> <li>c#swagflip</li><br /> <li>c#swag</li><br /> <li>c#clap</li><br /> <li>c#praise</li><br /> <li>c#think</li><br /> <li>c#sad</li><br /> <li>c#shrug</li><br /> <li>c#grin</li><br /> <li>c#earth</li><br /> <hr /><h6>Emote Picker.</h6><hr />'
	},
	nigger(txt){
		cmdcount++
		console.log('Called somebody a nigger' + ' - bwe')
        return ([txt]+[' is a nigger'])
    },
	nigga(txt){
		cmdcount++
		console.log('Called somebody a nigga' + ' - bwe')
        return ([txt]+[' is a nigga'])
    },
	skiddie(txt){
		cmdcount++
		console.log('Called somebody a script kiddie' + ' - bwe')
        return ([txt]+[' is a skiddie'])
    },
	skid(txt){
		cmdcount++
		console.log('Called somebody a script kiddie' + ' - bwe')
        return ([txt]+[' is a skid'])
    },
	video(txt){
		console.log('Played a Youtube video. URL: https://www.youtube.com/watch?=' + txt + ' - bwe')
		socket.emit('command', {list:['youtube',txt]})
    },
	google(txt){
		if(txt==""){
			return 'Please enter this value, if you wish to enter for Google search.'
		} else {
		cmdcount++
		console.log('Searched on Google. URL: https://www.google.com/search?q=' + txt + ' - bwe')
        return ('Google Link: https://www.google.com/search?q=' + [txt])
		}
    },
	ddg(txt){
		if(txt==""){
			return 'Please enter this value, if you wish to enter for DuckDuckGo search.'
		} else {
		cmdcount++
		console.log('Searched on DuckDuckGo. URL: https://duckduckgo.com/?q=' + txt + ' - bwe')
        return ('DuckDuckGo Link: https://duckduckgo.com/?q=' + [txt])
		}
    },
	bing(txt){
		if(txt==""){
			return 'Please enter this value, if you wish to enter for Bing search.'
		} else {
		cmdcount++
		console.log('Searched on Bing. URL: https://www.bing.com/search?q=' + txt + ' - bwe')
        return ('Bing Link: https://www.bing.com/search?q=' + [txt])
		}
    },
	pope(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Attempted to give a non-admin pope.' + ' - bwe')
		cmdcount++
		return 'HEY, EVERYONE LOOK AT THIS IDIOT WHO IS TRYING TO GET POPE IN A PUBLIC ROOM HAHAHAHHAAA!! LMAO' 
	},
	god(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Became Jesus.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','god','this.userPublic.name']})
	},
	dark_red(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to dark red.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','dark_red','this.userPublic.name']})
	},
	red(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to red.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','red','this.userPublic.name']})
	},
	orange(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to orange.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','orange','this.userPublic.name']})
	},
	yellow(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to yellow.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','yellow','this.userPublic.name']})
	},
	green(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to green.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','green','this.userPublic.name']})
	},
	lime(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to lime.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','lime','this.userPublic.name']})
	},
	lemon(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Turned into a lemon.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','lemon','this.userPublic.name']})
	},
	blue(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to blue.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','blue','this.userPublic.name']})
    },
	cyan(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to cyan.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','cyan','this.userPublic.name']})
    },
	dark_purple(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to dark purple.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','dark_purple','this.userPublic.name']})
    },
	purple(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to purple.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','purple','this.userPublic.name']})
    },
	magenta(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to magenta.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','magenta','this.userPublic.name']})
    },
	pink(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to pink.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','pink','this.userPublic.name']})
    },
	black(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to black.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','black','this.userPublic.name']})
    },
	grey(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to grey.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','grey','this.userPublic.name']})
    },
	white(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to white.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','white','this.userPublic.name']})
    },
	ghost(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('OoOOOooOOOoo Spooky! A ghost....' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','ghost','this.userPublic.name']})
    },
	casper(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('OoOOOooOOOoo Spooky! A ghost....' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','ghost','this.userPublic.name']})
    },
	brown(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to brown.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['color','brown','this.userPublic.name']})
    },
	swag(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played swag animation.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['swag','this.userPublic.name']})
    },
	cool(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played swag animation.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['swag','this.userPublic.name']})
    },
	praise(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('All hail the lord, Jesus Christ.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['praise','this.userPublic.name']})
    },
	sad(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played depression animation.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['sad','this.userPublic.name']})
    },
	frown(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played depression animation.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['sad','this.userPublic.name']})
    },
	clap(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played clapping animation.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['clap','this.userPublic.name']})
    },
	earth(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played globe spin animation.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['earth','this.userPublic.name']})
    },
	globe(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played globe spin animation.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['earth','this.userPublic.name']})
    },
	grin(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played grin animation.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['grin','this.userPublic.name']})
    },
	smirk(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played grin animation.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['grin','this.userPublic.name']})
    },
	smile(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played grin animation.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['grin','this.userPublic.name']})
    },
	think(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played thinking animation.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['think','this.userPublic.name']})
    },
	shrug(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played shrug animation.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['shrug','this.userPublic.name']})
    },
	backflip(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played backflip animation.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['backflip','this.userPublic.name']})
    },
	back_flip(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played backflip animation.' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['backflip','this.userPublic.name']})
    },
	swagflip(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played swagflip animation' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['backflip','swag','this.userPublic.name']})
    },
	backflip_swag(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played swagflip animation' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['backflip','swag','this.userPublic.name']})
    },
	swag_backflip(txt){
		if(txt.startsWith('c#')){
            return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played swagflip animation' + ' - bwe')
		cmdcount++
        socket.emit('command', {list:['backflip','swag','this.userPublic.name']})
    },
	cyberpunk(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice copypasta lmao hahaha fuck you"
    }
	cmdcount++
	return 'WAKE THE FUCK UP SAMURAI, WE GOT A CITY TO BURN!!'
    },
	drivepower(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice copypasta lmao hahaha fuck you"
    }
	cmdcount++
	return 'Its about drive, its about power, we stay hungry, we devour Put in the work, put in the hours and take whats ours Black and Samoan in my veins, my culture bangin with Strange I change the game so whats my motherfuckin name? Rock!!'
	},
	bigsmoke(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice copypasta lmao hahaha fuck you"
    }
	cmdcount++
	return 'Ill have two number 9s, a number 9 large, a number 6 with extra dip, a number 7, two number 45s, one with cheese, and a large soda.'
    },
	gabe(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice copypasta lmao hahaha fuck you"
    }
	cmdcount++
	return 'Good Evening, my name is Gabe Newell from the Microsoft team, and from analyzing your browser history we are here to inform you that your Windows XP Operating system is not valid. Your OS will be locked in 2 hours and it will stay this way until you have paid for the Microsoft product. If you have any questions or concerns please do not hesitate to go fucking kill yourself!'
	},
	behh(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice spam lmao hahaha fuck you"
    }
	cmdcount++
	return 'behh behh behh behh behh behh behh behh behh behh behh behh behh behh behh behh behh behh'
	},
	bonzibuddy(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice copypasta lmao hahaha fuck you"
    }
	cmdcount++
	return 'Welcome to my world of BonziBUDDY! I will explore the Internet with you as your very own friend and sidekick!  I can talk, walk, joke, browse, search, e-mail, and download like no other friend you have ever had!  I even have the ability to compare prices on the products you love and help you save money! Best of all, I AM FREE!'
	},
	bonzibuddy2(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice copypasta lmao hahaha fuck you"
    }
	cmdcount++
	return 'Well, hello there! I do not believe we have been properly introduced. I am BonziBUDDY! Nice to meet you! Since this is the first time we have met, I would like to tell you a little about myself. I am your friend and BonziBUDDY! I have the ability to learn from you. The more we browse, search, and travel the internet together, the smarter I will become! Not that I am not already smart!'
	},
	pacertest(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice copypasta lmao hahaha fuck you"
    }
	cmdcount++
	return 'The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.'
	},
	logo(txt){
	if(txt.startsWith('c#')){
        return "- - <h5>⌬ Developed by: Cosmic ⌬</h5>"
    }
	cmdcount++
	socket.emit('command', {list:['image','https://media.discordapp.net/attachments/804346548586676237/1011931887679328256/logo.png'] });
    },
	joke(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice joke lmao hahaha fuck you"
    }
	setTimeout(function () {
		console.log('Telling a joke.' + ' - bwe')
	   	cmdcount++
        socket.emit('command', {list:['joke']})
		}, 990);
    },
	fact(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice fact lmao hahaha fuck you"
    }
	setTimeout(function () {
		console.log('Spitting fax.' + ' - bwe')
	   	cmdcount++
        socket.emit('command', {list:['fact']})
		}, 990);
    },
	bees(txt){
	if(txt.startsWith('c#')){
        return "ya like jazz?"
    }
		setTimeout(function () {
		cmdcount++
        socket.emit('command', {list:['bees']})
		}, 990);
    },
	linux(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice linux distro xD hahaha fuck you windows is better"
    }
	setTimeout(function () {
		console.log('Flexing on Windows.' + ' - bwe')
	   	cmdcount++
        socket.emit('command', {list:['linux']})
		}, 990);
    },
	triggered(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice command lmao hahaha fuck you"
    }
	setTimeout(function () {
	   	cmdcount++
        socket.emit('command', {list:['triggered']})
		}, 990);
    },
	pawn(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice command lmao hahaha fuck you"
    }
	setTimeout(function () {
	   	cmdcount++
        socket.emit('command', {list:['pawn']})
		}, 990);
    },
	vaporwave(txt){
	if(txt.startsWith('c#')){
        return "ᴀ ᴇ s ᴛ ʜ ᴇ ᴛ ɪ ᴄ"
    }
	   	cmdcount++
		console.log('ᴀ ᴇ s ᴛ ʜ ᴇ ᴛ ɪ ᴄ' + ' - bwe')
        socket.emit('command', {list:['vaporwave']})
    },
	unvaporwave(txt){
	if(txt.startsWith('c#')){
        return "ᴀ ɴ ᴛ ɪ ~ ᴀ ᴇ s ᴛ ʜ ᴇ ᴛ ɪ ᴄ"
    }
		cmdcount++
		console.log('ᴀ ɴ ᴛ ɪ ~ ᴀ ᴇ s ᴛ ʜ ᴇ ᴛ ɪ ᴄ' + ' - bwe')
        socket.emit('command', {list:['unvaporwave']})
    },
	bagelchip(txt){
        return "hahaha nice fake id lmao im gonna call the cops hahahaha fuck you"
    },
	botver(txt){
	cmdcount++
	return '- - <h3>𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓</h3><div><h4>Version: ①.⑦.①</h4><hr><h4>Bug Fixes & Update</h4><hr>'
    },
	message(txt){
		cmdcount++
		console.log('You have a new message!!\n"' + txt + '"')
        return ("<h3>A message has been sent into the command terminal. An admin monitoring the terminal will see your message!</h3>\n\n\n Your sent message: " + [txt])
    },
	ban(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice command lmao hahaha fuck you"
    }
	cmdcount++
	return 'HEY, EVERYONE LOOK AT THIS RETARD WHO IS TRYING TO USE ADMIN COMMANDS WITHOUT ELEVATED PERMISSION!!! JAJAJAJAJAJAJAJAAAA!! LMAO XD'
    },
	kick(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice command lmao hahaha fuck you"
    }
	cmdcount++
	return 'HEY, EVERYONE LOOK AT THIS RETARD WHO IS TRYING TO USE ADMIN COMMANDS WITHOUT ELEVATED PERMISSION!!! JAJAJAJAJAJAJAJAAAA!! LMAO XD'
    },
	nojavascript(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice fake error lmao hahaha fuck you"
    }
	console.log('Loaded javascript error message.' + ' - bwe')
	cmdcount++	
	return '- - <h2>Hey! You have JavaScript disabled!</h2> <br>BonziWORLD cannot run in this browser because you have JavaScript disabled.<br>Please enable it in the page settings, and then BonziWORLD will start working correctly.'
    },
	error(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice fake error lmao hahaha fuck you"
    }
	console.log('Loaded generic error message.' + ' - bwe')
	cmdcount++
	return '- - <br><h2>BonziWORLD has encountered an error and needs to close.</h2><br> Nah, but seriously there was an error and you got disconnected from the server. Chances are, your internet just died out for a brief moment or your device went to sleep. Otherwise the server just screwed up.<br> <br> Try and reload the page. If that does not work and your internet is okay, then panic. We will probably be back up Soon™ though.<br> <br> <b>Reload?</b></a><br> <br>'
    },
	banned(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice fake error lmao hahaha fuck you"
    }
	console.log('Loaded ban message. Reason: ' + [txt] + ' - bwe')
	cmdcount++
	return '- - <br><h2>You got banned!</h2><br><br><b>Why? </b><br> ' + [txt] + ' <br><br><br><b>When is it over?</b><br>idk I guess whenever this message goes away xD'
    },
	kicked(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice fake error lmao hahaha fuck you"
    }
	console.log('Loaded kick message. Reason: ' + [txt] + ' - bwe')
	cmdcount++
	return '- - <br><h2>You got kicked!</h2><br> <br><b>Why? </b><br> ' + [txt] + ''
    },
	unsupported(txt){
	if(txt.startsWith('c#')){
        return "hahahaha nice fake error lmao hahaha fuck you"
    }
	console.log('Loaded unsupported error message.' + ' - bwe')
	cmdcount++
	return '- - <br><h2>BonziWORLD cannot run on this platform.</h2><br>Unfortunately, BonziWORLD cannot run in this browser!<br>You can try to download a BonziWORLD app that works on your device, or update your browser.'
    }
	};
socket.on('talk',function(data){
    var text = data.text
    if(text.startsWith('c#')){
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
setInterval(function(){
if(socket.connected==false) {
	console.log('Disconnected from the server. Attempting to re-connect...' + ' - bwe')
	socket.on('disconnected',reconnect)
}
}, 3000);