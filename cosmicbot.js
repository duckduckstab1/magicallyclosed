var io = require("socket.io-client")

// Variables


// Custom Fonts
var a_circle = "🅐";
var b_circle = "🅑";
var c_circle = "🅒";
var d_circle = "🅓";
var e_circle = "🅔";
var f_circle = "🅕";
var g_circle = "🅖";
var h_circle = "🅗";
var i_circle = "🅘";
var j_circle = "🅙";
var k_circle = "🅚";
var l_circle = "🅛";
var m_circle = "🅜";
var n_circle = "🅝";
var o_circle = "🅞";
var p_circle = "🅟";
var q_circle = "🅠";
var r_circle = "🅡";
var s_circle = "🅢";
var t_circle = "🅣";
var u_circle = "🅤";
var v_circle = "🅥";
var w_circle = "🅦";
var x_circle = "🅧";
var y_circle = "🅨";
var z_circle = "🅩";
var one_circle = "➊";
var two_circle = "➋";
var three_circle = "➌";
var four_circle = "➍";
var five_circle = "➎";
var six_circle = "➏";
var seven_circle = "➐";
var eight_circle = "➑";
var nine_circle = "➒";
var zero_circle = "⓿";
var a_circle_outline_capital = "Ⓐ";
var b_circle_outline_capital = "Ⓑ";
var c_circle_outline_capital = "Ⓒ";
var d_circle_outline_capital = "Ⓓ";
var e_circle_outline_capital = "Ⓔ";
var f_circle_outline_capital = "Ⓕ";
var g_circle_outline_capital = "Ⓖ";
var h_circle_outline_capital = "Ⓗ";
var i_circle_outline_capital = "Ⓘ";
var j_circle_outline_capital = "Ⓙ";
var k_circle_outline_capital = "Ⓚ";
var l_circle_outline_capital = "Ⓛ";
var m_circle_outline_capital = "Ⓜ";
var n_circle_outline_capital = "Ⓝ";
var o_circle_outline_capital = "Ⓞ";
var p_circle_outline_capital = "Ⓟ";
var q_circle_outline_capital = "Ⓠ";
var r_circle_outline_capital = "Ⓡ";
var s_circle_outline_capital = "Ⓢ";
var t_circle_outline_capital = "Ⓣ";
var u_circle_outline_capital = "Ⓤ";
var v_circle_outline_capital = "Ⓥ";
var w_circle_outline_capital = "Ⓦ";
var x_circle_outline_capital = "Ⓧ";
var y_circle_outline_capital = "Ⓨ";
var z_circle_outline_capital = "Ⓩ";
var a_circle_outline_lowercase = "ⓐ";
var b_circle_outline_lowercase = "ⓑ";
var c_circle_outline_lowercase = "ⓒ";
var d_circle_outline_lowercase = "ⓓ";
var e_circle_outline_lowercase = "ⓔ";
var f_circle_outline_lowercase = "ⓕ";
var g_circle_outline_lowercase = "ⓖ";
var h_circle_outline_lowercase = "ⓗ";
var i_circle_outline_lowercase = "ⓘ";
var j_circle_outline_lowercase = "ⓙ";
var k_circle_outline_lowercase = "ⓚ";
var l_circle_outline_lowercase = "ⓛ";
var m_circle_outline_lowercase = "ⓜ";
var n_circle_outline_lowercase = "ⓝ";
var o_circle_outline_lowercase = "ⓞ";
var p_circle_outline_lowercase = "ⓟ";
var q_circle_outline_lowercase = "ⓠ";
var r_circle_outline_lowercase = "ⓡ";
var s_circle_outline_lowercase = "ⓢ";
var t_circle_outline_lowercase = "ⓣ";
var u_circle_outline_lowercase = "ⓤ";
var v_circle_outline_lowercase = "ⓥ";
var w_circle_outline_lowercase = "ⓦ";
var x_circle_outline_lowercase = "ⓧ";
var y_circle_outline_lowercase = "ⓨ";
var z_circle_outline_lowercase = "ⓩ";
var one_circle_outline = "①";
var two_circle_outline = "②";
var three_circle_outline = "③";
var four_circle_outline = "④";
var five_circle_outline = "⑤";
var six_circle_outline = "⑥";
var seven_circle_outline = "⑦";
var eight_circle_outline = "⑧";
var nine_circle_outline = "⑨";
var zero_circle_outline = "⓪";
var a_small = "🇦​​​​​";
var b_small = "​​​​​🇧";
var c_small = "🇨";
var d_small = "🇩";
var e_small = "​​​​​🇪";
var f_small = "🇫";
var g_small = "🇬";
var h_small = "🇭";
var i_small = "​​​​​🇮​​​​​";
var j_small = "🇯";
var k_small = "🇰";
var l_small = "​​​​​🇱​​​​​";
var m_small = "🇲";
var n_small = "🇳";
var o_small = "🇴​​​​​";
var p_small = "🇵";
var q_small = "🇶​​​​​";
var r_small = "🇷";
var s_small = "🇸​​​​​";
var t_small = "​​​​​🇹";
var u_small = "​​​​​🇺";
var v_small = "🇻";
var w_small = "🇼";
var x_small = "🇽";
var y_small = "🇾";
var z_small = "🇿";
var one_small = "¹";
var two_small = "²";
var three_small = "³";
var four_small = "⁴";
var five_small = "⁵";
var six_small = "⁶";
var seven_small = "⁷";
var eight_small = "⁸";
var nine_small = "⁹";
var zero_small = "⁰";
var one_Times_New_Roman = "𝟷";
var two_Times_New_Roman = "𝟸";
var three_Times_New_Roman = "𝟹";
var four_Times_New_Roman = "𝟺";
var five_Times_New_Roman = "𝟻";
var six_Times_New_Roman = "𝟼";
var seven_Times_New_Roman = "𝟽";
var eight_Times_New_Roman = "𝟾";
var nine_Times_New_Roman = "𝟿";
var zero_Times_New_Roman = "𝟶";
var one_Times_New_Roman_bold = "𝟏";
var two_Times_New_Roman_bold = "𝟐";
var three_Times_New_Roman_bold = "𝟑";
var four_Times_New_Roman_bold = "𝟒";
var five_Times_New_Roman_bold = "𝟓";
var six_Times_New_Roman_bold = "𝟔";
var seven_Times_New_Roman_bold = "𝟕";
var eight_Times_New_Roman_bold = "𝟖";
var nine_Times_New_Roman_bold = "𝟗";
var zero_Times_New_Roman_bold = "𝟎";
var one_Times_New_Roman_outline = "𝟙";
var two_Times_New_Roman_outline = "𝟚";
var three_Times_New_Roman_outline = "𝟛";
var four_Times_New_Roman_outline = "𝟜";
var five_Times_New_Roman_outline = "𝟝";
var six_Times_New_Roman_outline = "𝟞";
var seven_Times_New_Roman_outline = "𝟟";
var eight_Times_New_Roman_outline = "𝟠";
var nine_Times_New_Roman_outline = "𝟡";
var zero_Times_New_Roman_outline = "𝟘";

const network = "bwr";
const dash = " - ";
const dot = ".";
const slash = "/";
const colon = ":";
const space = " ";
// Taken from https://stackoverflow.com/a/54707844
const date = new Date();
const months = ["jan", "feb", "mar", "apr", "may", "jun", "july", "aug", "sep", "oct", "nov", "dec"];
const month = date.getMonth();
const year = new Date().getFullYear();
const day = new Date().getDay();
const hours = new Date().getHours();
const minutes = new Date().getMinutes();
const seconds = new Date().getSeconds();
const log_timestamp = space + hours + colon + minutes + colon + seconds;

// Bot config
const prefix = "c#";
const prefix_bb = "b#";
const developer = "Cosmic";
const co_developer = "";
const version = one_Times_New_Roman_bold + dot + eight_Times_New_Roman_bold + dot + zero_Times_New_Roman_bold;
const version_utf8 = "1.8.0";
const version_bb = one_Times_New_Roman_bold + dot + zero_Times_New_Roman_bold + dot + one_Times_New_Roman_bold;
const bot_name = "𝘾𝙤𝙨𝙢𝙞𝙘𝐁𝐎𝐓";
const bot_name_bb = "𝓑𝓸𝓸𝓶𝔹𝕆𝕋";
const bot_name_bb_extended = " 🅴🆇🆃🅴🅽🅳🅴🅳";
const bot_name_utf8 = "CosmicBOT";
const bot_name_bb_utf8 = "BoomBOT";
const bot_subname = "  {" + prefix + "hub}";
const bot_login_name = bot_name_utf8 + bot_subname;
const bot_login_channel = "bonziuniverse-revived";
const bot_login_room = "";
const bot_login_url = "http://bonziworldrevived.tk";
const bot_login_godword = "doyouhateunbojihhatersidoalsomokenaworldisdeadyay";

// Socials
const discord_url = "https://bit.ly/3C1wDDO";
const github_url = "https://tinyurl.com/ykx6s9hj";
const pastebin_url = "https://bit.ly/3k1DiYM";
const twitter_url = "";
const reddit_url = "";
const insta_url = "";
const replit_url = "";


console.log('								        ')
console.log(' ▄████████  ▄██████▄     ▄████████    ▄▄▄▄███▄▄▄▄    ▄█   ▄████████ ▀█████████▄   ▄██████▄      ███     ')
console.log('███    ███ ███    ███   ███    ███  ▄██▀▀▀███▀▀▀██▄ ███  ███    ███   ███    ███ ███    ███ ▀█████████▄ ')
console.log('███    █▀  ███    ███   ███    █▀   ███   ███   ███ ███▌ ███    █▀    ███    ███ ███    ███    ▀███▀▀██ ')
console.log('███        ███    ███   ███         ███   ███   ███ ███▌ ███         ▄███▄▄▄██▀  ███    ███     ███   ▀ ')
console.log('███        ███    ███ ▀███████████  ███   ███   ███ ███▌ ███        ▀▀███▀▀▀██▄  ███    ███     ███     ')
console.log('███    █▄  ███    ███          ███  ███   ███   ███ ███  ███    █▄    ███    ██▄ ███    ███     ███     ')
console.log('███    ███ ███    ███    ▄█    ███  ███   ███   ███ ███  ███    ███   ███    ███ ███    ███     ███     ')
console.log('████████▀   ▀██████▀   ▄████████▀    ▀█   ███   █▀  █▀   ████████▀  ▄█████████▀   ▀██████▀     ▄████▀   ')
console.log('   ║		  ║						 ')
console.log('█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█')
console.log('█       Developed by: ' + developer + '      █')
console.log('█       Version: ' + version_utf8 + '	          █')
console.log('█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█')
console.log('								        ')

var socket = io("" + bot_login_url + "",{query:{ channel: '' + bot_login_channel + '' }})
socket.emit('login',{name:'' + bot_name_utf8 + bot_subname + '',room:bot_login_room})
socket.emit("command", { list: ["godmode", bot_login_godword] });
socket.emit("command", { list: ["sanitize", "off"] });
socket.emit("command", { list: ["pope"] });
socket.on('reconnected',reconnect)
var reconnect = function(){
    var socket = io("" + bot_login_url + "",{query:{ channel: '' + bot_login_channel + '' }})
	socket.emit('login',{name:'' + bot_name_utf8 + bot_subname + '',room:bot_login_room})
	socket.emit("command", { list: ["godmode", bot_login_godword] });
	socket.emit("command", { list: ["sanitize", "off"] });
	socket.emit("command", { list: ["pope"] });
    socket.on('talk',function(data){
        var text = data.text
        if(text.startsWith(prefix)){
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
	// Merge BoomBOT
    socket.on('talk',function(data){
        var text = data.text
        if(text.startsWith(prefix_bb)){
	text = text.slice(2)
	var bb_cmd = text.split(' ')[0]
	var bb_oth = text.slice(bb_cmd.length+1)
	if(Object.keys(commands_boombot).includes(cmd)){
	    var command_bb = commands_boombot[bb_cmd](bb_oth)
	    setTimeout(function(){
	        socket.emit('talk',{text:command_bb})
	    },100)
	}
        }
    })
    socket.on('reconnected',reconnect)
}

socket.emit("command", { list: ["name", bot_login_name] });
socket.emit("command", { list: ["godmode", bot_login_godword] });
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
var wtf = [	
	"i cut a hole in my computer so i can fuck it",
	"i hate minorities",
	"i said /godmode password and it didnt work",
	"i like to imagine i have sex with my little pony characters",
	"ok yall are grounded grounded grounded grounded grounded grounded grounded grounded grounded for 64390863098630985 years go to ur room",
	"i like to eat dog crap off the ground",
	"i can use inspect element to change your name so i can bully you",
	"i can ban you, my dad is seamus",
	"why do woman reject me, i know i masturbate in public and dont shower but still",
	"put your dick in my nose and lets have nasal sex",
	"my cock is 6 ft so ladies please suck it",
	"please make pope free",
	"whats that color",
	"I got a question. but it's a serious, yes, serious thing that I have to say! AAAAAAAAAAA! I! am! not! made! by! Pixel works! Pixel works doesn't make microsoft agent videos! Kieran G&A Doesn't exist! Anymore! So, if you guys keep mocking me that i am made by Pixel works (Originally Aqua) or Kieran G&A, then i am gonna commit kill you! huff, puff, that is all.",
	"This PC cannot run Windows 11. The processor isn't supported for Windows 11. While this PC doesn't meet the system requirements, you'll keep getting Windows 10 Updates.",
	"I made Red Brain Productions, and i deny that i am made by Pixelworks",
	"100. Continue.",
	"418. I'm a teapot.",
	"I am SonicFan08 and i like Norbika9Entertainment and grounded videos! Wow! I also block people who call me a gotard!",
	"When BonziWORLD leaks your memory, your system will go AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
	"Bonkey sugar. Anything that makes one physically satisfied. By extension, anything good or desirable. The following are examples of things which are most certainly bonkey sugar...",
	"i like to harass bonziworld fans on bonziworld",
	"there is a fucking white bird in my chest please get him out",
	"i am that frog that is speaking chinese",
	"Crypt Moment! Crypt Moment! Crypt Moment! Crypt Moment! Crypt Moment! Crypt Moment! Crypt Moment! Crypt Moment!",
	"i don't let anyone have any fun like holy shit i hate bonziworld soooooooooo much!",
	"i make gore art out of dream as fucking usual",
	"yummy yummy two letter object in my tummy! yummy in my tummy! i pretend to be david and terrorize the fuck out of my friends!",
	"why the fuck are you hating Twitter?! what did they do to you?!",
	"seamus has a weird- NO YOU FUCKING DONT! YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY! [[ IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII",
	"This is not a test. You have been caught as a 'funny child harassment' moment. you will be banned. You got banned! Why? Being retarded? IDK. You literally harass BonziWORLD Fans. How dare you!",
	"fingerprinting on bonzi.world is giving out your location! real! not fake!",
	"how many fucking times have i told you? GIVE ME THE MARIO 64 BETA ROM NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW NOW!",
	"<p hidden> i have nothing to say </p>",
	"I am getting fucking tired of you using this command. Fucking take a break already!",
	"<script></script>",
	"DeviantArt",
	"You're a [['fVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVkjng]] asshole!",
	"javascript",
	"hi i'm crypt and i have a internet explorer fetish daddy please hate on seamus for cutting ties with me and ziggymoncher",
	"BonziWORLD.exe has encountered and error and needs to close. Nah, seriously, you caused this error to happen because you used /wtf.",
	"/amplitude is best command",
	"moo!",
	"host bathbomb",
	"Hi.",
	"hiii i'm soundcard from mapper league",
	"I injected some soundcard syringes into your browser. <small>this is obviously fake</small>",
	'<img src="https://cdn.discordapp.com/emojis/854164241527209995.gif?v=1"></img>',
	"i listen to baby from justin bieber",
	"i watch numberblocks",
	"i watch doodland and now people are calling me a doodtard",
	"i watch bfdi and now people are calling me a objecttard",
	"i post klasky csupo effects and now people are calling me a logotard",
	"i inflate people, and body inflation is my fetish.",
	"i installed BonziBUDDY on my pc and now i have a virus",
	"i deleted system32",
	"i flood servers, and that makes me cool.",
	"I unironically do ERPs that has body inflation fetishism with people. Do you have a problem with that? YES! INFLATION FUCKING SUCKS YOU STUPID PERSON NAMED GERI!",
	"I unironically do ERPs that has body inflation fetishism with people. Do you have a problem with that? YES! INFLATION FUCKING SUCKS YOU STUPID PERSON NAMED BOWGART!",
	"I unironically do ERPs that has body inflation fetishism with people. Do you have a problem with that? YES! INFLATION FUCKING SUCKS YOU STUPID PERSON NAMED POM POM!",
	"I unironically do ERPs that has body inflation fetishism with people. Do you have a problem with that? YES! INFLATION FUCKING SUCKS YOU STUPID PERSON NAMED WHITTY!",
	"Hi. My name is DanielTR52 and i change my fucking mind every 1 picosecond. Also, ICS fucking sucks. Nope, now he doesnt. Now he does. Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.  Now he doesnt. Now he does.",
	"i still use the wii u&trade;",
	"i used homebrew on my nintendo switch and i got banned",
	"i bricked my wii",
	"muda muda muda muda!",
	'i am going to post inflation videos because, remember: "I inflate people and inflation is my fetish."',
	"i copy other people's usernames",
	"i use microsoft agent scripting helper for fighting videos against innocent people that did nothing wrong by just friendly commenting",
	"i use microsoft agent scripting helper for gotard videos",
	"i use hotswap for my xbox 360",
	"i boycotted left 4 dead 2",
	"CAN U PLZ UNBAN ME PLZ PLZ PLZ PLZ PLZ PLZ PLZ PLZ",
	"I use an leaked build of Windows 11 on my computer.",
	"Do you know how much /wtf quotes are there?",
	"Fun Fact: You're a fucking asshole",
	"Crypt: HAHA HEY GUYS I LIKE TO USE AUTISM AS A INSULT LOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLO",
	"i watch body inflation videos on youtube",
	"ItzCrazyScout, No! More like.... ekfheiophjeodxenwobifuodhndoxnwsiohbdeiowdhn2werifhwefief! He banned euhdeioqwdheiwohjixzojqsioh r23oipwshnwq! End of rant.",
	"Pro Hacker: NEAGEUR! [[llllllllllllll]] NEAGEUR!",
	"i play left 4 dead games 24/7",
	"i am so cool. i shit on people, add reactions  that make fun of users on discord, and abuse my admin powers. i am really so cool.",
	"This product will not operate when connected to a device which makes unauthorized copies. Please refer to your instruction booklet for more information.",
	"hey medic i like doodland",
	"i installed windows xp on my real computer",
	"i am whistler and i like to say no u all the time",
	"HEY EVERYONE LOOK AT ME I USE NO U ALL THE TIME LMAO",
	"i like to give my viewers anxiety",
	"how to make a bonziworld server?",
	"shock, blood loss, infection; [['oU: hoUhoUhoUhoU]]! i love stabbing!",
	"I AM ANGRY BECAUSE I GOT BANNED! I WILL MAKE A MASH VIDEO OUT OF ME GETTING BANNED!",
	"oh you're approaching me!",
	"MUTED! HEY EVERYONE LOOK AT ME I SAY MUTED IN ALL CAPS WHEN I MUTE SOMEONE LMAO",
	"can you boost my server? no? you're mean! >:(",
	"no u",
	"numberblocks is my fetish",
	"Jy: OOOOOOOOOOOOO look at me i'm the guy who likes to harass children as well HAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHA",
	"#inflation big haram",
	"Sorry, i don't want you anymore.",
	"Twitter Cancel Culture! Twitter Cancel Culture! Twitter Cancel Culture! Twitter Cancel Culture! Twitter Cancel Culture!",
	"cry about it",
	"<p hidden>[[??????????????????????????????????????????????????????????????????????????????????????]] Hello? Is anyone there? Please help me!</p>",
	"SyntaxError: Unexpected string",
	"i post random gummibar videos on bonziworld",
	"i support meatballmars",
	"PLEASE GIVE THIS VIDEO LIKES!!!!! I CANNOT TAKE IT ANYMORE!",
	"I WILL MAKE A BAD VIDEO OUT OF YOU! GRRRRRRRRRRRR!",
	"Muted",
	"i keep watching doodland like forever now",
	"i mined diamonds with a wooden pickaxe",
	"i kept asking for admin and now i got muted",
	"I FAP TO FEMMEPYRO NO JOKE",
	"i like to imagine that i am getting so fat for no reason at all",
	"i am not kid",
	"i want mario beta rom hack now!",
	"i am a gamer girl yes not man no im not man i am gamer girl so give me money and ill giv you my adress <3",
];

var answers = [
	"- 🎱 It is certain", 
	"- 🎱 It is decidedly so ", 
	"- 🎱 Without a doubt", 
	"- 🎱 Yes - definitely",
	"- 🎱 You may rely on it", 
	"- 🎱 As I see it, yes", 
	"- 🎱 Most likely", 
	"- 🎱 Outlook good", 
	"- 🎱 Yes", "- 🎱 Signs point to yes",
	"- 🎱 Don't count on it", 
	"- 🎱 My reply is no", "- 🎱 No",
	"- 🎱 My sources say no", 
	"- 🎱 Outlook not so good",
	"- 🎱 Very doubtful", 
	"- 🎱 Reply hazy, try again", 
	"- 🎱 Ask again later", 
	"- 🎱 Better not tell you now",
	"- 🎱 Cannot predict now", 
	"- 🎱 Concentrate and ask again"
];

var commands = {
    echo(txt){
        if(txt.startsWith(prefix)){
	return "hahahaha nice spam lmao hahaha fuck you"
        }
        return txt
    },
	asshole(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice asshole... no homo lmao"
        }
		console.log('Assholed ' + txt + dash + network)
		cmdcount++
		socket.emit('command', {list:['asshole',txt]})
    },
	owo(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice boner... no homo lmao"
        }
		console.log('Owo\'ed ' + txt + dash + network)
		cmdcount++
		socket.emit('command', {list:['owo',txt]})
    },
	cmds:function(){
		console.log('Loaded commands menu.' + dash + network)
		cmdcount++
		return "- - <h3>" + bot_name + "</h3><h5>⌬ Developed by: " + developer + " ⌬</h5> <hr /><li>" + prefix + "hub</li> <hr /><b>✰Commands:✰</b><hr /><li>" + prefix + "copypastas</li><br /> <li>" + prefix + "utilities</li><br /> <li>" + prefix + "fun</li><br /> <li>" + prefix + "misc</li><br /> <hr /><h6>Commands.</h6><hr />"
	},
		copypastas(txt){
		console.log('Loaded copypastas menu.' + dash + network)
		cmdcount++
		return '- - <h3>' + bot_name + '</h3><h5>⌬ Developed by: ' + developer + ' ⌬</h5> <hr /><li>' + prefix + 'hub</li> <hr /><b>✰Copypastas:✰</b><hr /> <li>' + prefix + 'bigsmoke</li><br /> <li>' + prefix + 'drivepower</li><br /> <li>' + prefix + 'gabe</li><br />  <li>' + prefix + 'pacertest</li><br /> <li>' + prefix + 'triggered</li><br /> <li>' + prefix + 'cyberpunk</li><br /> <li>' + prefix + 'bonzibuddy</li><br /> <li>' + prefix + 'bonzibuddy2</li><br /> <li>' + prefix + 'bees</li><br /> <li>' + prefix + 'pawn</li><br /> <li>' + prefix + 'linux</li><br /> <li>' + prefix + 'wtf</li><br /> <hr /><h6>Copypastas.</h6><hr />'
	},
	utilities(txt){
		console.log('Loaded utilities menu.' + dash + network)
		cmdcount++
		return '- - <h3>' + bot_name + '</h3><h5>⌬ Developed by: ' + developer + ' ⌬</h5> <hr /><li>' + prefix + 'hub</li> <hr /><b>✰Utilities:✰</b><hr /> <li>' + prefix + 'message</li><br /> <li>' + prefix + 'date</li><br /> <li>' + prefix + 'cmd_count</li><br /> <li>' + prefix + 'google</li><br /> <li>' + prefix + 'ddg</li><br /> <li>' + prefix + 'bing</li><br /> <li>' + prefix + 'video</li><br /> <li>' + prefix + 'emotes</li><br /> <li>' + prefix + 'colors</li><br /> <hr /><h6>Utilities.</h6><hr />'
	},
	fun(txt){
		console.log('Loaded fun menu.' + dash + network)
		cmdcount++
		return '- - <h3>' + bot_name + '</h3><h5>⌬ Developed by: ' + developer + ' ⌬</h5> <hr /><li>' + prefix + 'hub</li> <hr /><b>✰Fun Commands:✰</b><hr /> <li>' + prefix + 'joke</li><br /> <li>' + prefix + 'fact</li><br /> <li>' + prefix + 'skiddie</li><br /> <li>' + prefix + 'asshole</li><br /> <li>' + prefix + 'owo</li><br /> <li>' + prefix + 'vaporwave</li><br /> <li>' + prefix + 'unvaporwave</li><br /> <li>' + prefix + 'echo</li><br /> <li>' + prefix + '8ball</li><br /> <li>' + prefix + 'kill</li><br /> <li>' + prefix + 'iq</li><br /> <hr /><h6>Fun.</h6><hr />'
	},
	misc(txt){
		console.log('Loaded misc menu.' + dash + network)
		cmdcount++
		return '- - <h3>' + bot_name + '</h3><h5>⌬ Developed by: ' + developer + ' ⌬</h5> <hr /><li>' + prefix + 'hub</li> <hr /><b>✰Misc Commands:✰</b><hr /> <li>' + prefix + 'fakeerrors</li><br /> <li>' + prefix + 'logo</li><br /> <hr /><h6>Miscellaneous.</h6><hr />'
	},
	changelog(txt){
		console.log('Loaded changelog menu.' + dash + network)
		cmdcount++
		return '- - <h3>' + bot_name + '</h3><h5>⌬ Developed by: ' + developer + ' ⌬</h5> <hr /><li>' + prefix + 'hub</li> <hr /><b>✰' + version + ' Changelog:✰</b><hr /> <li>Updated to <b>' + version + '</b></li><br /> <li>Made some tweaks specifically for bonziverse</li><br /> <hr /><h6>Changelog.</h6><hr />'
	},
	hub(txt){
		if(txt.startsWith(prefix)){
	return "jajajajaa cool command lmao hahaha shut the fuck up"
        }
		console.log('Loaded hub menu.' + dash + network)
		cmdcount++
		return '- - <h3>' + bot_name + '</h3><br /><h5>⌬ Developed by: ' + developer + ' ⌬</h5> <hr /><b>✰Commands:✰</b><hr /> <li>' + prefix + 'cmds</li><br /> <li>' + prefix_bb + 'cmds (BoomBOT)</li><br /> <li>' + prefix + 'changelog</li><br /> <li>c#aboutme</li><br /> <li>' + prefix + 'links</li><br /> <hr /><h6>Hub.</h6><hr />'
	},
	links(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice command lmao hahaha fuck you"
        }
		console.log('Loaded links menu.' + dash + network)
		cmdcount++
		return '- - <hr /><h4>⚜My Discord Server:</h4> <br /><h5>' + discord_url + '</h5><br /><hr /> <h4>📝My Pastebin Profile:</h4> <br /><h5>' + pastebin_url + '</h5><br /><hr /> <h4>🌐My Github Profile:</h4> <br /><h5>' + github_url + '</h5><br /><hr /> <h6>Links.</h6><hr />'
	},
	aboutme(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice command lmao hahaha fuck you"
        }
		console.log('Loaded aboutme menu.' + dash + network)
		cmdcount++
		return '- - <h3>' + bot_name + '</h3><div><h4>Version ' + version + '</h4><br><hr>Hello, I am <b>' + bot_name + '</b>! If you need my assistance please start by using <b>' + prefix + 'hub</b>. <hr><div><h5>⌬ Developed by: ' + developer + ' ⌬</h5></div></p>'
	},
	fakeerrors(txt){
		if(txt.startsWith(prefix)){
	return "haha cool command lmao hahaha shut the fuck up"
        }
		console.log('Loaded fakeerrors menu.' + dash + network)
		cmdcount++
		return '- - <h3>' + bot_name + '</h3><h5>⌬ Developed by: ' + developer + ' ⌬</h5> <hr /><b>✰Fake Errors:✰</b><hr /><li>' + prefix + 'nojavascript</li><br /> <li>' + prefix + 'error</li><br /> <li>' + prefix + 'banned</li><br /> <li>' + prefix + 'kicked</li><br /> <li>' + prefix + 'unsupported</li><br /><hr /><h6>Fake Errors.</h6><hr />'
	},
	colors(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice command lmao hahaha fuck you"
        }
		console.log('Loaded colors menu.' + dash + network)
		cmdcount++
		return '- - <h3>' + bot_name + '</h3><h5>⌬ Developed by: ' + developer + ' ⌬</h5> <hr /><b>✰Colors:✰</b><hr /> <li>' + prefix + 'red</li><br /> <li>' + prefix + 'orange</li><br /> <li>' + prefix + 'yellow</li><br /> <li>' + prefix + 'green</li><br /> <li>' + prefix + 'blue</li><br /> <li>' + prefix + 'purple</li><br /> <li>' + prefix + 'pink</li><br /> <li>' + prefix + 'black</li><br /> <li>' + prefix + 'brown</li><br /> <li>' + prefix + 'pope</li><br /> <hr /><h6>Color Picker.</h6><hr />'
	},
	emotes(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice command lmao hahaha fuck you"
        }
		console.log('Loaded emotes menu.' + dash + network)
		cmdcount++
		return '- - <h3>' + bot_name + '</h3><h5>⌬ Developed by: ' + developer + ' ⌬</h5> <hr /><b>✰Emotes:✰</b><hr /><li>' + prefix + 'backflip</li><br /> <li>' + prefix + 'swagflip</li><br /> <li>' + prefix + 'swag</li><br /> <li>' + prefix + 'clap</li><br /> <li>' + prefix + 'praise</li><br /> <li>' + prefix + 'think</li><br /> <li>' + prefix + 'sad</li><br /> <li>' + prefix + 'shrug</li><br /> <li>' + prefix + 'grin</li><br /> <li>' + prefix + 'earth</li><br /> <hr /><h6>Emote Picker.</h6><hr />'
	},
	skiddie(txt){
		cmdcount++
		console.log('Called somebody a script kiddie' + dash + network)
        return ([txt]+[' is a skiddie'])
    },
	video(txt){
		console.log('Played a Youtube video. URL: https://www.youtube.com/watch?=' + txt + dash + network)
		socket.emit('command', {list:['youtube',txt]})
    },
	google(txt){
		if(txt==""){
			return 'Please enter this value, if you wish to enter for Google search.'
		} else {
		cmdcount++
		console.log('Searched on Google. URL: https://www.google.com/search?q=' + txt + dash + network)
        return ('Google Link: https://www.google.com/search?q=' + [txt])
		}
    },
	ddg(txt){
		if(txt==""){
			return 'Please enter this value, if you wish to enter for DuckDuckGo search.'
		} else {
		cmdcount++
		console.log('Searched on DuckDuckGo. URL: https://duckduckgo.com/?q=' + txt + dash + network)
        return ('DuckDuckGo Link: https://duckduckgo.com/?q=' + [txt])
		}
    },
	bing(txt){
		if(txt==""){
			return 'Please enter this value, if you wish to enter for Bing search.'
		} else {
		cmdcount++
		console.log('Searched on Bing. URL: https://www.bing.com/search?q=' + txt + dash + network)
        return ('Bing Link: https://www.bing.com/search?q=' + [txt])
		}
    },
	pope(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Gave a non-admin pope.' + dash + network)
		cmdcount++
		socket.emit('command', {list:['pope', 'this.userPublic.name']})
	},
	pope_joke(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Attempted to give a non-admin pope.' + dash + network)
		cmdcount++
		return 'HEY, EVERYONE LOOK AT THIS IDIOT WHO IS TRYING TO GET POPE IN A PUBLIC ROOM HAHAHAHHAAA!! LMAO' 
	},
	red(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to red.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['color','red','this.userPublic.name']})
	},
	orange(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to orange.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['color','orange','this.userPublic.name']})
	},
	yellow(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to yellow.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['color','yellow','this.userPublic.name']})
	},
	green(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to green.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['color','green','this.userPublic.name']})
	},
	blue(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to blue.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['color','blue','this.userPublic.name']})
    },
	purple(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to purple.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['color','purple','this.userPublic.name']})
    },
	pink(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to pink.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['color','pink','this.userPublic.name']})
    },
	black(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to black.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['color','black','this.userPublic.name']})
    },
	brown(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice color lmao hahaha fuck you"
        }
		console.log('Changed the bot color to brown.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['color','brown','this.userPublic.name']})
    },
	
	swag(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played swag animation.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['swag','this.userPublic.name']})
    },
	cool(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played swag animation.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['swag','this.userPublic.name']})
    },
	praise(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('All hail the lord, Jesus Christ.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['praise','this.userPublic.name']})
    },
	sad(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played depression animation.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['sad','this.userPublic.name']})
    },
	frown(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played depression animation.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['sad','this.userPublic.name']})
    },
	clap(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played clapping animation.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['clap','this.userPublic.name']})
    },
	earth(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played globe spin animation.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['earth','this.userPublic.name']})
    },
	globe(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played globe spin animation.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['earth','this.userPublic.name']})
    },
	grin(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played grin animation.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['grin','this.userPublic.name']})
    },
	smirk(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played grin animation.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['grin','this.userPublic.name']})
    },
	smile(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played grin animation.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['grin','this.userPublic.name']})
    },
	think(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played thinking animation.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['think','this.userPublic.name']})
    },
	shrug(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played shrug animation.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['shrug','this.userPublic.name']})
    },
	backflip(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played backflip animation.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['backflip','this.userPublic.name']})
    },
	back_flip(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played backflip animation.' + dash + network)
		cmdcount++
        socket.emit('command', {list:['backflip','this.userPublic.name']})
    },
	swagflip(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played swagflip animation' + dash + network)
		cmdcount++
        socket.emit('command', {list:['backflip','swag','this.userPublic.name']})
    },
	backflip_swag(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played swagflip animation' + dash + network)
		cmdcount++
        socket.emit('command', {list:['backflip','swag','this.userPublic.name']})
    },
	swag_backflip(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice emote lmao hahaha fuck you"
        }
		console.log('Played swagflip animation' + dash + network)
		cmdcount++
        socket.emit('command', {list:['backflip','swag','this.userPublic.name']})
    },
	wtf(txt){
		cmdcount++
		var num = Math.floor(Math.random() * wtf.length);
		return(wtf[num])
    },
	cyberpunk(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice copypasta lmao hahaha fuck you"
    }
	cmdcount++
	return 'WAKE THE FUCK UP SAMURAI, WE GOT A CITY TO BURN!!'
    },
	drivepower(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice copypasta lmao hahaha fuck you"
    }
	cmdcount++
	return 'Its about drive, its about power, we stay hungry, we devour Put in the work, put in the hours and take whats ours Black and Samoan in my veins, my culture bangin with Strange I change the game so whats my motherfuckin name? Rock!!'
    },
	bigsmoke(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice copypasta lmao hahaha fuck you"
    }
	cmdcount++
	return 'Ill have two number 9s, a number 9 large, a number 6 with extra dip, a number 7, two number 45s, one with cheese, and a large soda.'
    },
	gabe(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice copypasta lmao hahaha fuck you"
    }
	cmdcount++
	return 'Good Evening, my name is Gabe Newell from the Microsoft team, and from analyzing your browser history we are here to inform you that your Windows XP Operating system is not valid. Your OS will be locked in 2 hours and it will stay this way until you have paid for the Microsoft product. If you have any questions or concerns please do not hesitate to go fucking kill yourself!'
    },
	behh(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice spam lmao hahaha fuck you"
    }
	cmdcount++
	return 'behh behh behh behh behh behh behh behh behh behh behh behh behh behh behh behh behh behh'
    },
	bonzibuddy(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice copypasta lmao hahaha fuck you"
    }
	cmdcount++
	return 'Welcome to my world of BonziBUDDY! I will explore the Internet with you as your very own friend and sidekick!  I can talk, walk, joke, browse, search, e-mail, and download like no other friend you have ever had!  I even have the ability to compare prices on the products you love and help you save money! Best of all, I AM FREE!'
    },
	bonzibuddy2(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice copypasta lmao hahaha fuck you"
    }
	cmdcount++
	return 'Well, hello there! I do not believe we have been properly introduced. I am BonziBUDDY! Nice to meet you! Since this is the first time we have met, I would like to tell you a little about myself. I am your friend and BonziBUDDY! I have the ability to learn from you. The more we browse, search, and travel the internet together, the smarter I will become! Not that I am not already smart!'
    },
	pacertest(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice copypasta lmao hahaha fuck you"
    }
	cmdcount++
	return 'The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.'
    },
	logo_old(txt){
	if(txt.startsWith(prefix)){
        return "- - <h5>⌬ Developed by: " + developer + " ⌬</h5>"
    }
	cmdcount++
	return '- - <h3>' + bot_name + '</h3>'
    },
	logo(txt){
	if(txt.startsWith(prefix)){
        return "- - <h5>⌬ Developed by: " + developer + " ⌬</h5>"
    }
	cmdcount++
	socket.emit('command', {list:['image','https://i.ibb.co/7n2mWJg/cosmic-bot.png'] });
    },
	joke(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice joke lmao hahaha fuck you"
    }
		console.log('Telling a joke.' + dash + network)
	   	cmdcount++
        socket.emit('command', {list:['joke']})
    },
	fact(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice fact lmao hahaha fuck you"
    }
		console.log('Spitting fax.' + dash + network)
	   	cmdcount++
        socket.emit('command', {list:['fact']})
    },
	bees(txt){
	if(txt.startsWith(prefix)){
        return "ya like jazz?"
    }
		cmdcount++
        socket.emit('command', {list:['bees']})
    },
	linux(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice linux distro xD hahaha fuck you windows is better"
    }
		console.log('Flexing on Windows.' + dash + network)
	   	cmdcount++
        socket.emit('command', {list:['linux']})
    },
	triggered(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice command lmao hahaha fuck you"
    }
	   	cmdcount++
        socket.emit('command', {list:['triggered']})
    },
	pawn(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice command lmao hahaha fuck you"
    }
	   	cmdcount++
        socket.emit('command', {list:['pawn']})
    },
	vaporwave(txt){
	if(txt.startsWith(prefix)){
        return "ᴀ ᴇ s ᴛ ʜ ᴇ ᴛ ɪ ᴄ"
    }
	   	cmdcount++
		console.log('ᴀ ᴇ s ᴛ ʜ ᴇ ᴛ ɪ ᴄ' + dash + network)
        socket.emit('command', {list:['vaporwave']})
    },
	unvaporwave(txt){
	if(txt.startsWith(prefix)){
        return "ᴀ ɴ ᴛ ɪ ~ ᴀ ᴇ s ᴛ ʜ ᴇ ᴛ ɪ ᴄ"
    }
		cmdcount++
		console.log('ᴀ ɴ ᴛ ɪ ~ ᴀ ᴇ s ᴛ ʜ ᴇ ᴛ ɪ ᴄ' + dash + network)
        socket.emit('command', {list:['unvaporwave']})
    },
	coinflip(txt){
    if (Math.random() < 0.5) {
        setTimeout(function () {
            socket.emit("talk", { text: "-- <br>The coin has landed on, <b>tails</b><div><h6>Dont ask where sonic is</h6>" });
        }, 500);
    } else {
        setTimeout(function () {
            socket.emit("talk", { text: "-- <br>The coin has landed on, <b>heads</b>" });
        }, 500);
    }
	},
	"8ball"(txt){
    var num = Math.floor(Math.random() * Math.floor(answers.length));
    setTimeout(function () {
        socket.emit("talk", { text: answers[num] });
    }, 500);
	},
	kill(txt){
        setTimeout(function () {
            socket.emit("talk", { text: "-- <br>" + usersPublic[data.guid].name + "</b> has killed <b>" + txt + "</b>, ouch!" });
        }, 500);
	},
	iq(txt){
        setTimeout(function () {
            socket.emit("talk", { text: "-- <br>" + txt + "'s IQ is: <b>" + Math.floor(Math.random() * 200) + "</b>" });
        }, 500);
	},
	bagelchip(txt){
        return "hahaha nice fake id lmao im gonna call the cops hahahaha fuck you"
    },
	botver(txt){
	cmdcount++
	return '- - <h3>' + bot_name + '</h3><div><h4>Version: ' + version + '</h4><hr><h4>Bug Fixes & Update</h4><hr>'
    },
	message(txt){
		cmdcount++
		console.log('You have a new message!!\n"' + txt + '"')
        return ("<h3>A message has been sent into the command terminal. An admin monitoring the terminal will see your message!</h3>\n\n\n Your sent message: " + [txt])
    },
	date(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice command lmao hahaha fuck you"
        }
		console.log('Told somebody the date and time.' + dash + network)
		cmdcount++
		return '-- <br>The date and time is: ' + date + '.';
	},
	cmd_count(txt){
		if(txt.startsWith(prefix)){
	return "hahahaha nice command lmao hahaha fuck you"
        }
		console.log('Told somebody the command count.' + dash + network)
		cmdcount++
		return 'The current command count is: ' + cmdcount + '.';
	},
	ban(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice command lmao hahaha fuck you"
    }
	cmdcount++
	return 'HEY, EVERYONE LOOK AT THIS RETARD WHO IS TRYING TO USE ADMIN COMMANDS WITHOUT ELEVATED PERMISSION!!! JAJAJAJAJAJAJAJAAAA!! LMAO XD'
    },
	kick(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice command lmao hahaha fuck you"
    }
	cmdcount++
	return 'HEY, EVERYONE LOOK AT THIS RETARD WHO IS TRYING TO USE ADMIN COMMANDS WITHOUT ELEVATED PERMISSION!!! JAJAJAJAJAJAJAJAAAA!! LMAO XD'
    },
	nojavascript(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice fake error lmao hahaha fuck you"
    }
	console.log('Loaded javascript error message.' + dash + network)
	cmdcount++	
	return '- - <h2>Hey! You have JavaScript disabled!</h2> <br>BonziWORLD cannot run in this browser because you have JavaScript disabled.<br>Please enable it in the page settings, and then BonziWORLD will start working correctly.'
    },
	error(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice fake error lmao hahaha fuck you"
    }
	console.log('Loaded generic error message.' + dash + network)
	cmdcount++
	return '- - <br><h2>BonziWORLD has encountered an error and needs to close.</h2><br> Nah, but seriously there was an error and you got disconnected from the server. Chances are, your internet just died out for a brief moment or your device went to sleep. Otherwise the server just screwed up.<br> <br> Try and reload the page. If that does not work and your internet is okay, then panic. We will probably be back up Soon™ though.<br> <br> <b>Reload?</b></a><br> <br>'
    },
	banned(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice fake error lmao hahaha fuck you"
    }
	console.log('Loaded ban message. Reason: ' + [txt] + dash + network)
	cmdcount++
	return '- - <br><h2>You got banned!</h2><br><br><b>Why? </b><br> ' + [txt] + ' <br><br><br><b>When is it over?</b><br>idk I guess whenever this message goes away xD'
    },
	kicked(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice fake error lmao hahaha fuck you"
    }
	console.log('Loaded kick message. Reason: ' + [txt] + dash + network)
	cmdcount++
	return '- - <br><h2>You got kicked!</h2><br> <br><b>Why? </b><br> ' + [txt] + ''
    },
	unsupported(txt){
	if(txt.startsWith(prefix)){
        return "hahahaha nice fake error lmao hahaha fuck you"
    }
	console.log('Loaded unsupported error message.' + dash + network)
	cmdcount++
	return '- - <br><h2>BonziWORLD cannot run on this platform.</h2><br>Unfortunately, BonziWORLD cannot run in this browser!<br>You can try to download a BonziWORLD app that works on your device, or update your browser.'
    }
	};
	
var commands_boombot = {
	cmds:function(){
		console.log('Loaded commands menu.' + dash + network)
		cmdcount++
		return "- - <h3>" + bot_name_bb + "</h3><h5>⌬ Developed by: " + developer + " ⌬</h5> <hr /><li>" + prefix_bb +"hub</li> <hr /><b>✰Commands:✰</b><hr /><li>" + prefix_bb +"audio [URL]</li><br /> <li>" + prefix_bb +"video [URL]</li><br /> <li>" + prefix_bb +"b_audio [URL]</li><br /> <li>" + prefix_bb +"b_video [URL]</li><br /> <li>" + prefix_bb +"yt [URL/Video ID]</li><br /> <hr /><h6>BoomBOT Commands.</h6><hr />"
	},
	changelog(txt){
		console.log('Loaded BoomBOT changelog menu.' + dash + network)
		cmdcount++
		return '- - <h3>' + bot_name_bb + '</h3><h5>⌬ Developed by: ' + developer + ' ⌬</h5> <hr /><li>' + prefix_bb + 'hub</li> <hr /><b>✰' + version_bb + ' Changelog:✰</b><hr /> <li>Nothing. this is the first version u retard.</li><br /> <hr /><h6>Changelog.</h6><hr />'
	},
	hub(txt){
		if(txt.startsWith(prefix_bb)){
	return "jajajajaa cool command lmao hahaha shut the fuck up"
        }
		console.log('Loaded hub menu.' + dash + network)
		cmdcount++
		return '- - <h3>' + bot_name_bb + '</h3><br /><h5>⌬ Developed by: ' + developer + ' ⌬</h5> <hr /><b>✰Commands:✰</b><hr /> <li>' + prefix_bb + 'cmds</li><br /> <li>' + prefix + 'cmds (CosmicBOT)</li><br /> <li>' + prefix_bb + 'changelog</li><br /> <li>' + prefix_bb + 'aboutme</li><br /> <li>' + prefix_bb + 'links</li><br /> <hr /><h6>BoomBOT Hub.</h6><hr />'
	},
	links(txt){
		if(txt.startsWith(prefix_bb)){
	return "hahahaha nice command lmao hahaha fuck you"
        }
		console.log('Loaded links menu.' + dash + network)
		cmdcount++
		return '- - <hr /><h4>⚜My Discord Server:</h4> <br /><h5>' + discord_url + '</h5><br /><hr /> <h4>📝My Pastebin Profile:</h4> <br /><h5>' + pastebin_url + '</h5><br /><hr /> <h4>🌐My Github Profile:</h4> <br /><h5>' + github_url + '</h5><br /><hr /> <h6>Links.</h6><hr />'
	},
	aboutme(txt){
		if(txt.startsWith(prefix_bb)){
	return "hahahaha nice command lmao hahaha fuck you"
        }
		console.log('Loaded aboutme menu.' + dash + network)
		cmdcount++
		return '- - <h3>' + bot_name_bb + '</h3><div><h4>Version ' + version_bb + '</h4><br><hr>Hello, I am <b>' + bot_name_bb + '</b>! If you are ready to party, please begin by using <b>' + prefix_bb + 'hub</b>. <hr><div><h5>⌬ Developed by: ' + developer + ' ⌬</h5></div></p>'
	},
	yt(txt){
		console.group();
		console.log('Played a Youtube video.' + dash + network)
		console.log('URL: https://www.youtube.com/watch?=' + txt + '')
		console.groupEnd();

		socket.emit('command', {list:['youtube',txt]})
    },
	audio(txt){
		console.group();
		console.log("Played an audio file." + dash + network)
		console.log('URL:' + txt + '')
		console.groupEnd();
		socket.emit('command', {list:['audio',txt]})
    },
	b_audio(txt){
		console.group();
		console.log("Broadcasted an audio file." + dash + network)
		console.log('URL:' + txt + '')
		console.groupEnd();
		socket.emit('command', {list:['broadcast',"<audio controls autoplay loop><source src=" + txt + " type='audio/mp3'></audio>"]})
    },
	video(txt){
		console.group();
		console.log("Played an mp4 video file." + dash + network)
		console.log('URL:' + txt + '')
		console.groupEnd();
		socket.emit('command', {list:['video',txt]})
    },
	b_video(txt){
		console.group();
		console.log("Broadcasted an mp4 video file." + dash + network)
		console.log('URL:' + txt + '')
		console.groupEnd();
		socket.emit('command', {list:['broadcast',"<video controls height='270' width='100%' autoplay loop><source src=" + txt + " type='video/mp4'></video>"]})
    },
	/*b_img(txt){
		console.group();
		console.log("Broadcasted an image file." + " - bwe")
		console.log('URL:' + txt + '')
		console.groupEnd();
		socket.emit('command', {list:['broadcast',"<img width='450' src=" + txt + "></img>"]})
    },*/
	logo_old(txt){
	if(txt.startsWith(prefix_bb)){
        return "- - <h5>⌬ Developed by: " + developer + " ⌬</h5>"
    }
	cmdcount++
	return '- - <h3>' + bot_name_bb + '</h3>'
    },
	logo(txt){
	if(txt.startsWith(prefix_bb)){
        return "- - <h5>⌬ Developed by: " + developer + " ⌬</h5>"
    }
	cmdcount++
	socket.emit('command', {list:['image','https://i.ibb.co/cbjJBzZ/boom-bot.png'] });
    },
	vaporwave(txt){
	if(txt.startsWith(prefix_bb)){
        return "ᴀ ᴇ s ᴛ ʜ ᴇ ᴛ ɪ ᴄ"
    }
	   	cmdcount++
		console.group();
		console.log('ᴀ ᴇ s ᴛ ʜ ᴇ ᴛ ɪ ᴄ' + dash + network)
		console.log('URL: https://www.youtube.com/watch?=' + txt + '')
		console.groupEnd();
        socket.emit('command', {list:['youtube','_HJ9LdmppYU']})
    },
	botver(txt){
	cmdcount++
	return '- - <h3>' + bot_name_bb + '</h3><div><h4>Version: ' + version_bb + '</h4><hr><h4>Initial Release</h4><hr>'
    },
	}
socket.on('talk',function(data){
    var text = data.text
    if(text.startsWith(prefix)){
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
socket.on('talk',function(data){
    var text = data.text
    if(text.startsWith(prefix_bb)){
        text = text.slice(2)
        var cmd = text.split(' ')[0]
        var bb_oth = text.slice(cmd.length+1)
        if(Object.keys(commands_boombot).includes(cmd)){
	var command_bb = commands_boombot[cmd](bb_oth)
	setTimeout(function(){
	    socket.emit('talk',{text:command_bb})
	},100)
        }
    }
});

if(socket.connected==true) {
console.log('Connected to the server using' + bot_login_channel + dash + network + dot)
}

setInterval(function(){
if(socket.connected==false) {
	console.log('Disconnected from the server. Attempting to re-connect...' + dash + network)
	socket.on('disconnected',reconnect)
}
}, 3000);
