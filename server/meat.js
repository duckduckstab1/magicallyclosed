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

var bonziTvCool = false;
var videoIds4PM2430PM = [
    "https://www.youtube.com/watch?v=n_sWTHQKr-s",
    "https://www.youtube.com/watch?v=FdjXC4aDNrc",
    "https://www.youtube.com/watch?v=oqwjsqLvaGA",
    "https://www.youtube.com/watch?v=ewQeG4bfh7o",
    "https://www.youtube.com/watch?v=J1xFJDSeHxI",
    "https://www.youtube.com/watch?v=AJNF04k6hDU",
    "https://www.youtube.com/watch?v=EXFJ1gUqSOI",
    "https://www.youtube.com/watch?v=zvB3h2IKdYU",
    "https://www.youtube.com/watch?v=ihDMzzMxsFY",
    "https://www.youtube.com/watch?v=JdPibO28X6g",
    "https://www.youtube.com/watch?v=BpJZAKy3-EI",
    "https://www.youtube.com/watch?v=y281xhixx9I",
    "https://www.youtube.com/watch?v=f-1tlzLYUE0",
    "https://www.youtube.com/watch?v=LBapITUr878",
    "https://www.youtube.com/watch?v=R7M2RiTgEO4",
    "https://www.youtube.com/watch?v=hYC5FcjhowU",
    "https://www.youtube.com/watch?v=PM2cT0GYs0k",
    "https://www.youtube.com/watch?v=kX-TUNMguqQ",
    "https://www.youtube.com/watch?v=CJjGRbm7AP0",
    "https://www.youtube.com/watch?v=nUXNQk-GpXE",
    "https://www.youtube.com/watch?v=pRIdTBDo5s0",
    "https://www.youtube.com/watch?v=lnUnMD8avFo",
    "https://www.youtube.com/watch?v=OHtNgbbZUHc",
    "https://www.youtube.com/watch?v=IWeeGlqWjTo",
    "https://www.youtube.com/watch?v=B-43bJpN9p0",
    "https://www.youtube.com/watch?v=ZlJUN6ld7Uw",
    "https://www.youtube.com/watch?v=cepnx5OtwMg",
    "https://www.youtube.com/watch?v=CyYUtJWu67g",
    "https://www.youtube.com/watch?v=kVPAH1SoJOs",
    "https://www.youtube.com/watch?v=CSSucrEZru0",
    "https://www.youtube.com/watch?v=voX77aqxMVM",
    "https://www.youtube.com/watch?v=VMenL3FtjwY",
    "https://www.youtube.com/watch?v=gMWMaYqMuvU",
    "https://www.youtube.com/watch?v=9CivuYkHkdw",
    "https://www.youtube.com/watch?v=nWjshODENSE",
    "https://www.youtube.com/watch?v=wC85p4WwT7o",
    "https://www.youtube.com/watch?v=-STfCX3_Dt8",
    "https://www.youtube.com/watch?v=2npJbktaXas",
    "https://www.youtube.com/watch?v=mW8HT3wTjtw",
    "https://www.youtube.com/watch?v=aqJxAEc8I98",
    "https://www.youtube.com/watch?v=7RTuOTLqNJg",
    "https://www.youtube.com/watch?v=D-mxD6R0PZk",
    "https://www.youtube.com/watch?v=gkpfOwxvP5Y",
    "https://www.youtube.com/watch?v=MaOJiU7ICSs",
    "https://www.youtube.com/watch?v=ldoCeoPnsr4",
    "https://www.youtube.com/watch?v=kRtuL6PVM3M",
    "https://www.youtube.com/watch?v=BxEn1br2hhA",
    "https://www.youtube.com/watch?v=E7e2NbRTv34",
    "https://www.youtube.com/watch?v=0Pw-W11hzaY",
    "https://www.youtube.com/watch?v=fjOraqJJfdo",
    "https://www.youtube.com/watch?v=-k2lYZmcyUs",
    "https://www.youtube.com/watch?v=IpDx4Fw137U",
    "https://www.youtube.com/watch?v=bIy7bGgPmu8",
    "https://www.youtube.com/watch?v=wGFfIulM2aw",
    "https://www.youtube.com/watch?v=xv3LBB6GAh4",
    "https://www.youtube.com/watch?v=SLfbsnOG3lA",
    "https://www.youtube.com/watch?v=YaRNqZT1QH4",
    "https://www.youtube.com/watch?v=1cjfNYV-Z-U",
    "https://www.youtube.com/watch?v=1cjfNYV-Z-U",
    "https://www.youtube.com/watch?v=1cjfNYV-Z-U",
    "https://www.youtube.com/watch?v=1cjfNYV-Z-U",
    "https://www.youtube.com/watch?v=1cjfNYV-Z-U",
    "https://www.youtube.com/watch?v=0zg7ZA8UGa8",
    "https://www.youtube.com/watch?v=0zg7ZA8UGa8",
    "https://www.youtube.com/watch?v=0zg7ZA8UGa8",
    "https://www.youtube.com/watch?v=0zg7ZA8UGa8",
    "https://www.youtube.com/watch?v=0zg7ZA8UGa8",
    "https://www.youtube.com/watch?v=pOiiAdshU5Q",
    "https://www.youtube.com/watch?v=pOiiAdshU5Q",
    "https://www.youtube.com/watch?v=pOiiAdshU5Q",
    "https://www.youtube.com/watch?v=pOiiAdshU5Q",
    "https://www.youtube.com/watch?v=pOiiAdshU5Q",
    "https://www.youtube.com/watch?v=pOiiAdshU5Q",
    "https://www.youtube.com/watch?v=pOiiAdshU5Q",
    "https://www.youtube.com/watch?v=pOiiAdshU5Q",
    "https://www.youtube.com/watch?v=pOiiAdshU5Q",
    "https://www.youtube.com/watch?v=pOiiAdshU5Q",
    "https://www.youtube.com/watch?v=WwnSgVJcGm8",
    "https://www.youtube.com/watch?v=XEwg5dwLjng",
    "https://www.youtube.com/watch?v=eYo8jusJkfA",
    "https://www.youtube.com/watch?v=iIBI3vVcce0",
    "https://www.youtube.com/watch?v=7K7gaKhkiVg",
    "https://www.youtube.com/watch?v=vX5baryGnnk",
    "https://www.youtube.com/watch?v=kEkmTUobm9A",
    "https://www.youtube.com/watch?v=ynWOhlnFJWQ",
    "https://www.youtube.com/watch?v=ofPNauMOvFU",
    "https://www.youtube.com/watch?v=LP4M4TBXg58",
    "https://www.youtube.com/watch?v=LP4M4TBXg58",
    "https://www.youtube.com/watch?v=LP4M4TBXg58",
    "https://www.youtube.com/watch?v=lGT7GRoUsaw",
    "https://www.youtube.com/watch?v=lGT7GRoUsaw",
    "https://www.youtube.com/watch?v=lGT7GRoUsaw",
    "https://www.youtube.com/watch?v=lGT7GRoUsaw"
];
var videoIds5PM = [
    "https://www.youtube.com/watch?v=iK4BKnkW9rc",
    "https://www.youtube.com/watch?v=qjqBUYQb21g",
    "https://www.youtube.com/watch?v=XbI29tI5MXs",
    "https://www.youtube.com/watch?v=0dnRWrsgKrU",
    "https://www.youtube.com/watch?v=ohCm6YeovpQ",
    "https://www.youtube.com/watch?v=HVK-KiANd_Q",
    "https://www.youtube.com/watch?v=6-USBEqLicg",
    "https://www.youtube.com/watch?v=QoHbvZfu1-c",
    "https://www.youtube.com/watch?v=X2Q2X-7hVQw",
    "https://www.youtube.com/watch?v=mR-lbatS6ts",
    "https://www.youtube.com/watch?v=1wMsbj0VvVE",
    "https://www.youtube.com/watch?v=Mzf_jtM8jgw",
    "https://www.youtube.com/watch?v=qsATpni7B9s",
    "https://www.youtube.com/watch?v=a0tSVDjQbz0",
    "https://www.youtube.com/watch?v=4ES2y7bxENE", 
    "https://www.youtube.com/watch?v=j32-UnN6m5E",
    "https://www.youtube.com/watch?v=86EkHcJsXhU",
    "https://www.youtube.com/watch?v=P3Ca0X-TO1U",
    "https://www.youtube.com/watch?v=UjnyCsweHOE",
    "https://www.youtube.com/watch?v=G2ApsOSMX2s",
    "https://www.youtube.com/watch?v=3Hssx5jy-f4",
    "https://www.youtube.com/watch?v=sRih4d0Um9U",
    "https://www.youtube.com/watch?v=lI-u0pJ-XEM",
    "https://www.youtube.com/watch?v=tv9UIy0RCus",
    "https://www.youtube.com/watch?v=wGKi7YITv84",
    "https://www.youtube.com/watch?v=FQ0ZvlLi3Aw",
    "https://www.youtube.com/watch?v=hlm9JW6hzu4",
    "https://www.youtube.com/watch?v=W61OP5HPSU4",
    "https://www.youtube.com/watch?v=PqS4Ckf01XI",
    "https://www.youtube.com/watch?v=BjiWP6GdaZs",
    "https://www.youtube.com/watch?v=VR6G2-BXk50",
    "https://www.youtube.com/watch?v=7D6W6Dzsinw",
    "https://www.youtube.com/watch?v=LWW9kyDhSGY",
    "https://www.youtube.com/watch?v=s60XUkdNoNc",
    "https://www.youtube.com/watch?v=PjfvbA3yaB4",
    "https://www.youtube.com/watch?v=8M1fDbBTeuc",
    "https://www.youtube.com/watch?v=OMtsPjcvOyA",
    "https://www.youtube.com/watch?v=1n1_ocOUx4M",
    "https://www.youtube.com/watch?v=8Yy_xnQTS9k",
    "https://www.youtube.com/watch?v=aTYAwNeP7hw",
    "https://www.youtube.com/watch?v=Cc4_lDIhhK4",
    "https://www.youtube.com/watch?v=dTUrgFaXR2o",
    "https://www.youtube.com/watch?v=IPQmfvcvOWI",
    "https://www.youtube.com/watch?v=tHjjbHkFqVw",
    "https://www.youtube.com/watch?v=UfDFvG0Px5A",
    "https://www.youtube.com/watch?v=mtxjk_kIi6I",
    "https://www.youtube.com/watch?v=M_U4NYPHuE8",
    "https://www.youtube.com/watch?v=XmheFB3vSmM",
    "https://www.youtube.com/watch?v=b9RSREv2NAE",
    "https://www.youtube.com/watch?v=YcZ4vXgsGh4",
    "https://www.youtube.com/watch?v=MnjMwoJpDag",
    "https://www.youtube.com/watch?v=8zVTrQ54oKA",
    "https://www.youtube.com/watch?v=HV7SQkbOKQQ",
    "https://www.youtube.com/watch?v=urX6QcVFkHY",
    "https://www.youtube.com/watch?v=Q7vthL5hIqo",
    "https://www.youtube.com/watch?v=N0j6NXznknU",
    "https://www.youtube.com/watch?v=u0qTJz2DUos",
    "https://www.youtube.com/watch?v=UioiM5KopzU",
    "https://www.youtube.com/watch?v=sDlGy1SxYGg",
    "https://www.youtube.com/watch?v=dnua8QvCfB0",
    "https://www.youtube.com/watch?v=FG0ydp-1mHE",
    "https://www.youtube.com/watch?v=bCm-EAd_oEI",
    "https://www.youtube.com/watch?v=aZ5lyqb4gUc",
    "https://www.youtube.com/watch?v=2HUy60DWYek",
    "https://www.youtube.com/watch?v=FEXeAlaL9cc",
    "https://www.youtube.com/watch?v=ORouZmGacHk",
    "https://www.youtube.com/watch?v=2v-8DArgo-Y",
    "https://www.youtube.com/watch?v=1cjfNYV-Z-U",
    "https://www.youtube.com/watch?v=1cjfNYV-Z-U",
    "https://www.youtube.com/watch?v=1cjfNYV-Z-U",
    "https://www.youtube.com/watch?v=1cjfNYV-Z-U",
    "https://www.youtube.com/watch?v=1cjfNYV-Z-U",
    "https://www.youtube.com/watch?v=0zg7ZA8UGa8",
    "https://www.youtube.com/watch?v=0zg7ZA8UGa8",
    "https://www.youtube.com/watch?v=0zg7ZA8UGa8",
    "https://www.youtube.com/watch?v=0zg7ZA8UGa8",
    "https://www.youtube.com/watch?v=0zg7ZA8UGa8"
];
var videoIds6PM = [
    "https://www.youtube.com/watch?v=CipV9DBI72I",
    "https://www.youtube.com/watch?v=kYYbYdZdZuo",
    "https://www.youtube.com/watch?v=Fz_fD06bFho",
    "https://www.youtube.com/watch?v=dF3ALkzF6i4",
    "https://www.youtube.com/watch?v=wlqM_kMRPJI"
];
var videoIds7PM = [
    "https://www.youtube.com/watch?v=PT5HrjP-lPE",
    "https://www.youtube.com/watch?v=1yfUfH1jF3g",
    "https://www.youtube.com/watch?v=vN2BCZjZYWs",
    "https://www.youtube.com/watch?v=oZF2RUJHV8c",
    "https://www.youtube.com/watch?v=rNY5lwrmZ1w",
    "https://www.youtube.com/watch?v=E7sn6tjcZgI",
    "https://www.youtube.com/watch?v=kvsw74KWAIw",
    "https://www.youtube.com/watch?v=OX3rC3ENFw0",
    "https://www.youtube.com/watch?v=o3i64oR6Dv8",
    "https://www.youtube.com/watch?v=Frm0LTTtgFo",
    "https://www.youtube.com/watch?v=PFbYJ2-KpR8",
    "https://www.youtube.com/watch?v=rVAxjlFU28o",
    "https://www.youtube.com/watch?v=fIonJON2p9A",
    "https://www.youtube.com/watch?v=Gc_DMKiz9LU",
    "https://www.youtube.com/watch?v=bfk_pzQSfX8",
    "https://www.youtube.com/watch?v=SKLlmJKfcI0",
    "https://www.youtube.com/watch?v=r0W-607Atz0",
    "https://www.youtube.com/watch?v=nGQ-nCwHYcs",
    "https://www.youtube.com/watch?v=7hTge-5W3Cc",
    "https://www.youtube.com/watch?v=fBHJFPqKIG0",
    "https://www.youtube.com/watch?v=LvV7MOoSwy0",
    "https://www.youtube.com/watch?v=MTyBtwmvEjE",
    "https://www.youtube.com/watch?v=djMpH9D3NUQ",
    "https://www.youtube.com/watch?v=3_uRhxkjdB4",
    "https://www.youtube.com/watch?v=3VS4Nkzh-70",
    "https://www.youtube.com/watch?v=jX28oxrdUVI",
    "https://www.youtube.com/watch?v=dnBqjTmlLg8",
    "https://www.youtube.com/watch?v=r_mwNcxuxwY",
    "https://www.youtube.com/watch?v=xlyyu1Go4yU",
    "https://www.youtube.com/watch?v=l8g0z8yZ6FU",
    "https://www.youtube.com/watch?v=gMDgHPQ0YfI",
    "https://www.youtube.com/watch?v=HjWbtUBKuUc",
    "https://www.youtube.com/watch?v=WO2SCGfEYiE",
    "https://www.youtube.com/watch?v=ur8ys2aglI4",
    "https://www.youtube.com/watch?v=jmr5kAmIQGs",
    "https://www.youtube.com/watch?v=3va3bdtT9LQ",
    "https://www.youtube.com/watch?v=7vzfeyh-ow8",
    "https://www.youtube.com/watch?v=v2t6iP4mWvA",
    "https://www.youtube.com/watch?v=iwxbY-p_w0w",
    "https://www.youtube.com/watch?v=pdO9uKpzaYU",
    "https://www.youtube.com/watch?v=8iEXhbqami8",
    "https://www.youtube.com/watch?v=T-BoDW1_9P4",
    "https://www.youtube.com/watch?v=NgHygsNwTNk",
    "https://www.youtube.com/watch?v=jPKuyeDb0mM",
    "https://www.youtube.com/watch?v=EDsDnR2dzlw",
    "https://www.youtube.com/watch?v=ljl1jBEY3_A",
    "https://www.youtube.com/watch?v=jIwqlKDPq4s",
    "https://www.youtube.com/watch?v=TGulB0MfxPs",
    "https://www.youtube.com/watch?v=ehlrUPrvFuk",
    "https://www.youtube.com/watch?v=vkUIyOm9hZk",
    "https://www.youtube.com/watch?v=t2Jpe0I5pa4",
    "https://www.youtube.com/watch?v=kHKJ9Mf8UxU",
    "https://www.youtube.com/watch?v=zwz5yJR_aFA",
    "https://www.youtube.com/watch?v=RdTJHVG_IdU",
    "https://www.youtube.com/watch?v=WaXvbkjn-RA",
    "https://www.youtube.com/watch?v=xe0P0rnsS1Q",
    "https://www.youtube.com/watch?v=bBjk55hNjWw",
    "https://www.youtube.com/watch?v=bBjk55hNjWw",
    "https://www.youtube.com/watch?v=bBjk55hNjWw",
    "https://www.youtube.com/watch?v=bBjk55hNjWw",
    "https://www.youtube.com/watch?v=bBjk55hNjWw",
    "https://www.youtube.com/watch?v=bBjk55hNjWw",
    "https://www.youtube.com/watch?v=bBjk55hNjWw",
    "https://www.youtube.com/watch?v=bBjk55hNjWw",
    "https://www.youtube.com/watch?v=IyirV9lir8Q",
    "https://www.youtube.com/watch?v=IyirV9lir8Q",
    "https://www.youtube.com/watch?v=IyirV9lir8Q"
]
var videoIds25MinutesofMSAgent = [
    "https://www.youtube.com/watch?v=iK4BKnkW9rc",
    "https://www.youtube.com/watch?v=qjqBUYQb21g",
    "https://www.youtube.com/watch?v=XbI29tI5MXs",
    "https://www.youtube.com/watch?v=0dnRWrsgKrU",
    "https://www.youtube.com/watch?v=ohCm6YeovpQ",
    "https://www.youtube.com/watch?v=HVK-KiANd_Q",
    "https://www.youtube.com/watch?v=6-USBEqLicg",
    "https://www.youtube.com/watch?v=QoHbvZfu1-c",
    "https://www.youtube.com/watch?v=X2Q2X-7hVQw",
    "https://www.youtube.com/watch?v=mR-lbatS6ts",
    "https://www.youtube.com/watch?v=1wMsbj0VvVE",
    "https://www.youtube.com/watch?v=Mzf_jtM8jgw",
    
    "https://www.youtube.com/watch?v=iK4BKnkW9rc",
    "https://www.youtube.com/watch?v=qjqBUYQb21g",
    "https://www.youtube.com/watch?v=XbI29tI5MXs",
    "https://www.youtube.com/watch?v=0dnRWrsgKrU",
    "https://www.youtube.com/watch?v=ohCm6YeovpQ",
    "https://www.youtube.com/watch?v=HVK-KiANd_Q",
    "https://www.youtube.com/watch?v=6-USBEqLicg",
    "https://www.youtube.com/watch?v=QoHbvZfu1-c",
    "https://www.youtube.com/watch?v=X2Q2X-7hVQw",
    "https://www.youtube.com/watch?v=mR-lbatS6ts",
    "https://www.youtube.com/watch?v=1wMsbj0VvVE",
    "https://www.youtube.com/watch?v=Mzf_jtM8jgw",
    "https://www.youtube.com/watch?v=qsATpni7B9s",
    "https://www.youtube.com/watch?v=a0tSVDjQbz0",
    "https://www.youtube.com/watch?v=4ES2y7bxENE", 
    "https://www.youtube.com/watch?v=j32-UnN6m5E",
    "https://www.youtube.com/watch?v=86EkHcJsXhU",
    "https://www.youtube.com/watch?v=P3Ca0X-TO1U",
    "https://www.youtube.com/watch?v=UjnyCsweHOE",
    "https://www.youtube.com/watch?v=G2ApsOSMX2s",
    "https://www.youtube.com/watch?v=3Hssx5jy-f4",
    "https://www.youtube.com/watch?v=sRih4d0Um9U",
    "https://www.youtube.com/watch?v=lI-u0pJ-XEM",
    "https://www.youtube.com/watch?v=tv9UIy0RCus",
    "https://www.youtube.com/watch?v=wGKi7YITv84",
    "https://www.youtube.com/watch?v=FQ0ZvlLi3Aw",
    "https://www.youtube.com/watch?v=hlm9JW6hzu4",
    "https://www.youtube.com/watch?v=W61OP5HPSU4",
    "https://www.youtube.com/watch?v=PqS4Ckf01XI",
    "https://www.youtube.com/watch?v=BjiWP6GdaZs",
    "https://www.youtube.com/watch?v=VR6G2-BXk50",
    "https://www.youtube.com/watch?v=7D6W6Dzsinw",
    "https://www.youtube.com/watch?v=LWW9kyDhSGY",
    "https://www.youtube.com/watch?v=s60XUkdNoNc",
    "https://www.youtube.com/watch?v=PjfvbA3yaB4",
    "https://www.youtube.com/watch?v=8M1fDbBTeuc",
    "https://www.youtube.com/watch?v=OMtsPjcvOyA",
    "https://www.youtube.com/watch?v=1n1_ocOUx4M",
    "https://www.youtube.com/watch?v=8Yy_xnQTS9k",
    "https://www.youtube.com/watch?v=aTYAwNeP7hw",
    "https://www.youtube.com/watch?v=Cc4_lDIhhK4",
    "https://www.youtube.com/watch?v=dTUrgFaXR2o",
    "https://www.youtube.com/watch?v=IPQmfvcvOWI",
    "https://www.youtube.com/watch?v=tHjjbHkFqVw",
    "https://www.youtube.com/watch?v=UfDFvG0Px5A",
    "https://www.youtube.com/watch?v=mtxjk_kIi6I",
    "https://www.youtube.com/watch?v=M_U4NYPHuE8",
    "https://www.youtube.com/watch?v=XmheFB3vSmM",
    "https://www.youtube.com/watch?v=b9RSREv2NAE",
    "https://www.youtube.com/watch?v=YcZ4vXgsGh4",
    "https://www.youtube.com/watch?v=MnjMwoJpDag",
    "https://www.youtube.com/watch?v=8zVTrQ54oKA",
    "https://www.youtube.com/watch?v=HV7SQkbOKQQ",
    "https://www.youtube.com/watch?v=urX6QcVFkHY",
    "https://www.youtube.com/watch?v=Q7vthL5hIqo",
    "https://www.youtube.com/watch?v=N0j6NXznknU",
    "https://www.youtube.com/watch?v=u0qTJz2DUos",
    "https://www.youtube.com/watch?v=UioiM5KopzU",
    "https://www.youtube.com/watch?v=sDlGy1SxYGg",
    "https://www.youtube.com/watch?v=dnua8QvCfB0",
    "https://www.youtube.com/watch?v=FG0ydp-1mHE",
    "https://www.youtube.com/watch?v=bCm-EAd_oEI",
    "https://www.youtube.com/watch?v=aZ5lyqb4gUc",
    "https://www.youtube.com/watch?v=2HUy60DWYek",
    "https://www.youtube.com/watch?v=FEXeAlaL9cc",
    "https://www.youtube.com/watch?v=ORouZmGacHk",
    "https://www.youtube.com/watch?v=2v-8DArgo-Y",
    "https://www.youtube.com/watch?v=1cjfNYV-Z-U",
    "https://www.youtube.com/watch?v=1cjfNYV-Z-U",
    "https://www.youtube.com/watch?v=0zg7ZA8UGa8",
    "https://www.youtube.com/watch?v=0zg7ZA8UGa8",
    "https://www.youtube.com/watch?v=qsATpni7B9s",
    "https://www.youtube.com/watch?v=a0tSVDjQbz0",
    "https://www.youtube.com/watch?v=4ES2y7bxENE",
    "https://www.youtube.com/watch?v=j32-UnN6m5E",
    "https://www.youtube.com/watch?v=86EkHcJsXhU",
    "https://www.youtube.com/watch?v=P3Ca0X-TO1U",
    "https://www.youtube.com/watch?v=UjnyCsweHOE",
    "https://www.youtube.com/watch?v=G2ApsOSMX2s",
    "https://www.youtube.com/watch?v=3Hssx5jy-f4",
    "https://www.youtube.com/watch?v=sRih4d0Um9U",
    "https://www.youtube.com/watch?v=lI-u0pJ-XEM",
    "https://www.youtube.com/watch?v=tv9UIy0RCus",
    "https://www.youtube.com/watch?v=wGKi7YITv84",
    "https://www.youtube.com/watch?v=FQ0ZvlLi3Aw",
    "https://www.youtube.com/watch?v=hlm9JW6hzu4",
    "https://www.youtube.com/watch?v=W61OP5HPSU4",
    "https://www.youtube.com/watch?v=PqS4Ckf01XI",
    "https://www.youtube.com/watch?v=BjiWP6GdaZs",
    "https://www.youtube.com/watch?v=7D6W6Dzsinw",
    "https://www.youtube.com/watch?v=LWW9kyDhSGY",
    "https://www.youtube.com/watch?v=I5XjMXFuAEg",
    "https://www.youtube.com/watch?v=bLu9ZT7xc-s",
    "https://www.youtube.com/watch?v=oDmcLsCd1wM",
    "https://www.youtube.com/watch?v=_0EaFBajEJc",
    "https://www.youtube.com/watch?v=PESJ7GXFSTY",
    "https://www.youtube.com/watch?v=tjWpSalUJ7M",
    "https://www.youtube.com/watch?v=CUwkddtoq_Q",
    "https://www.youtube.com/watch?v=kUS79V-GED4",
    "https://www.youtube.com/watch?v=XuZYiN_fLLo",
    "https://www.youtube.com/watch?v=N7UVouZF3rs",
    "https://www.youtube.com/watch?v=nIe6hhSNYMo",
    "https://www.youtube.com/watch?v=WR-ItEt7Wsc",
    "https://www.youtube.com/watch?v=xRMtup3tSiY",
    "https://www.youtube.com/watch?v=8PdVfC588rk",
    "https://www.youtube.com/watch?v=y_NNbA1YHXI",
    "https://www.youtube.com/watch?v=uUKakTJTq8Q",
    "https://www.youtube.com/watch?v=Q9xzX3uYFrg",
    "https://www.youtube.com/watch?v=AeHLChNvmuo",
    "https://www.youtube.com/watch?v=oAnQODG7WIM",
    "https://www.youtube.com/watch?v=32lLfeLcqpc",
    "https://www.youtube.com/watch?v=T6OqOb9GHm8",
    "https://www.youtube.com/watch?v=7_dFef7LmN0",
    "https://www.youtube.com/watch?v=35aKtzd6ITU",
    "https://www.youtube.com/watch?v=PYX5WGWCy80",
    "https://www.youtube.com/watch?v=JnkxS1kyZgc",
    "https://www.youtube.com/watch?v=pg4zVD6nVTM",
    "https://www.youtube.com/watch?v=i8zCkUtvbyI",
    "https://www.youtube.com/watch?v=5lWKWEBG7sU",
    "https://www.youtube.com/watch?v=JC__xVzW4q4",
    "https://www.youtube.com/watch?v=g_bKg27Zskg",
    "https://www.youtube.com/watch?v=vsPt1P6ouEw",
    "https://www.youtube.com/watch?v=sWKXS0Jy6y0",
    "https://www.youtube.com/watch?v=H3aSBjRV1m4",
    "https://www.youtube.com/watch?v=mDofooY1oxI",
    "https://www.youtube.com/watch?v=9NQVRayFJ4Q",
    "https://www.youtube.com/watch?v=-_0qqaiFwKU",
    "https://www.youtube.com/watch?v=CpW0lFG8nxE",
    "https://www.youtube.com/watch?v=i7KzCagtyvg",
    "https://www.youtube.com/watch?v=Tc9IJ9yE_ds",
    "https://www.youtube.com/watch?v=LgZ9XoRakuE",
    "https://www.youtube.com/watch?v=HJ_QylejL0o",
    "https://www.youtube.com/watch?v=T7PRlNIbEOw",
    "https://www.youtube.com/watch?v=hht_m1cjqLo",
    "https://www.youtube.com/watch?v=AltpSUZqRzo",
    "https://www.youtube.com/watch?v=ryI0Hc6TNs4",
    "https://www.youtube.com/watch?v=RIrYEbJmYVU",
    "https://www.youtube.com/watch?v=NbzjAQd_A4E",
    "https://www.youtube.com/watch?v=DeugO5Tl0-k",
    "https://www.youtube.com/watch?v=b9RSREv2NAE",
    "https://www.youtube.com/watch?v=YcZ4vXgsGh4",
    "https://www.youtube.com/watch?v=MnjMwoJpDag",
    "https://www.youtube.com/watch?v=8zVTrQ54oKA",
    "https://www.youtube.com/watch?v=HV7SQkbOKQQ",
    "https://www.youtube.com/watch?v=urX6QcVFkHY",
    "https://www.youtube.com/watch?v=Q7vthL5hIqo",
    "https://www.youtube.com/watch?v=N0j6NXznknU",
    "https://www.youtube.com/watch?v=u0qTJz2DUos",
    "https://www.youtube.com/watch?v=UioiM5KopzU",
    "https://www.youtube.com/watch?v=dnua8QvCfB0",
    "https://www.youtube.com/watch?v=FG0ydp-1mHE",
    "https://www.youtube.com/watch?v=bCm-EAd_oEI",
    "https://www.youtube.com/watch?v=wlqM_kMRPJI",
    "https://www.youtube.com/watch?v=W9DST-6jIBU",
    "https://www.youtube.com/watch?v=TDpxx5UqrVU",
    "https://www.youtube.com/watch?v=d-vB8qdNSYc",
    "https://www.youtube.com/watch?v=Gh0bczrw4NU",
    "https://www.youtube.com/watch?v=doZ-Wmgrkfs",
    "https://www.youtube.com/watch?v=CiVtoO65BRY",
    "https://www.youtube.com/watch?v=9Lu99J5UsXs",
    "https://www.youtube.com/watch?v=SNK74ecgFKg",
    "https://www.youtube.com/watch?v=hRSYYKEfwoE",
    "https://www.youtube.com/watch?v=GODj_vgnmuY",
    "https://www.youtube.com/watch?v=z4nWu0kmYzE",
    "https://www.youtube.com/watch?v=SkKPMlCQWiI",
    "https://www.youtube.com/watch?v=5SAkFdHwrdU",
    "https://www.youtube.com/watch?v=5zdMJ9gCkHY",
    "https://www.youtube.com/watch?v=Q391KSf2ER8",
    "https://www.youtube.com/watch?v=OEp_2CnlXsk",
    "https://www.youtube.com/watch?v=BtmvlPi3pnM",
    "https://www.youtube.com/watch?v=hRSYYKEfwoE",
    "https://www.youtube.com/watch?v=1dHWxhHVnog",
    "https://www.youtube.com/watch?v=VVTde5W-vkg",
    "https://www.youtube.com/watch?v=FMi67zFJYyc",
    "https://www.youtube.com/watch?v=CQYj1xu-Oeg",
    "https://www.youtube.com/watch?v=LSCrZc0Ced0",
    "https://www.youtube.com/watch?v=PwyUb98K2T4",
    "https://www.youtube.com/watch?v=wx7Txh0SF6Y",
    "https://www.youtube.com/watch?v=lI-u0pJ-XEM",
    "https://www.youtube.com/watch?v=tv9UIy0RCus",
    "https://www.youtube.com/watch?v=wGKi7YITv84",
    "https://www.youtube.com/watch?v=FQ0ZvlLi3Aw",
    "https://www.youtube.com/watch?v=hlm9JW6hzu4",
    "https://www.youtube.com/watch?v=W61OP5HPSU4",
    "https://www.youtube.com/watch?v=PqS4Ckf01XI",
    "https://www.youtube.com/watch?v=BjiWP6GdaZs",
    "https://www.youtube.com/watch?v=7D6W6Dzsinw",
    "https://www.youtube.com/watch?v=LWW9kyDhSGY",
    "https://www.youtube.com/watch?v=UfDFvG0Px5A",
    "https://www.youtube.com/watch?v=mtxjk_kIi6I",
    "https://www.youtube.com/watch?v=M_U4NYPHuE8",
    "https://www.youtube.com/watch?v=XmheFB3vSmM",
    "https://www.youtube.com/watch?v=b9RSREv2NAE",
    "https://www.youtube.com/watch?v=YcZ4vXgsGh4",
    "https://www.youtube.com/watch?v=MnjMwoJpDag",
    "https://www.youtube.com/watch?v=8zVTrQ54oKA",
    "https://www.youtube.com/watch?v=HV7SQkbOKQQ",
    "https://www.youtube.com/watch?v=urX6QcVFkHY",
    "https://www.youtube.com/watch?v=Q7vthL5hIqo",
    "https://www.youtube.com/watch?v=N0j6NXznknU",
    "https://www.youtube.com/watch?v=u0qTJz2DUos",
    "https://www.youtube.com/watch?v=UioiM5KopzU",
    "https://www.youtube.com/watch?v=sDlGy1SxYGg",
    "https://www.youtube.com/watch?v=dnua8QvCfB0",
    "https://www.youtube.com/watch?v=FG0ydp-1mHE",
    "https://www.youtube.com/watch?v=bCm-EAd_oEI",
    "https://www.youtube.com/watch?v=aZ5lyqb4gUc",
    "https://www.youtube.com/watch?v=2HUy60DWYek",
    "https://www.youtube.com/watch?v=FEXeAlaL9cc",
    "https://www.youtube.com/watch?v=ORouZmGacHk",
    "https://www.youtube.com/watch?v=2v-8DArgo-Y",
    "https://www.youtube.com/watch?v=ZLUku5CPwp8",
    "https://www.youtube.com/watch?v=93nIZ0ARS9Q",
    "https://www.youtube.com/watch?v=zPSl9tS5P-Q",
    "https://www.youtube.com/watch?v=oMuzEO7JjKs",
    "https://www.youtube.com/watch?v=2aqYf7zVYKg",
    "https://www.youtube.com/watch?v=fp7_2kg232k",
    "https://www.youtube.com/watch?v=WuUujmTRqqY",
    "https://www.youtube.com/watch?v=_qkxIrAo0u0",
    "https://www.youtube.com/watch?v=0XrQlX7X0wk",
    "https://www.youtube.com/watch?v=w9PfRf30ouM",
    "https://www.youtube.com/watch?v=Ax67LzJgyH4",
    "https://www.youtube.com/watch?v=DAmynePJN0I",
    "https://www.youtube.com/watch?v=mKRAmFFDGQ4",
    "https://www.youtube.com/watch?v=ozJSqvdCk_o",
    "https://www.youtube.com/watch?v=teWdbHnpUX0",
    "https://www.youtube.com/watch?v=occcxi07ceU",
    "https://www.youtube.com/watch?v=Uc1ARqCGmss",
    "https://www.youtube.com/watch?v=HOgApT7i3K8",
    "https://www.youtube.com/watch?v=DjwfdTD4yGM",
    "https://www.youtube.com/watch?v=IjRm39PNnXY",
    "https://www.youtube.com/watch?v=q91sTl5GC7s",
    "https://www.youtube.com/watch?v=sQ3frOfC4ac",
    "https://www.youtube.com/watch?v=-LtmJW6zFxw",
    "https://www.youtube.com/watch?v=tR0yetZI9W0",
    "https://www.youtube.com/watch?v=iuj_bbhqTbQ",
    "https://www.youtube.com/watch?v=B0oOnl_84hg",
    "https://www.youtube.com/watch?v=VWYzlZfWUaM",
    "https://www.youtube.com/watch?v=fT2gX_J_6s4",
    "https://www.youtube.com/watch?v=KJddGCfK-O4",
    "https://www.youtube.com/watch?v=YSsOoXAOFV0",
    "https://www.youtube.com/watch?v=G-92dYktwdU",
    "https://www.youtube.com/watch?v=MwLhk2RqT48",
    "https://www.youtube.com/watch?v=tqL3bSg8ILw",
    "https://www.youtube.com/watch?v=Fw1irZul_7o",
    "https://www.youtube.com/watch?v=cY7Yn2XTM5c",
    "https://www.youtube.com/watch?v=HTc2XPbn5Zw",
    "https://www.youtube.com/watch?v=kjx654ej-kU",
    "https://www.youtube.com/watch?v=7l7gngZ9D8w",
    "https://www.youtube.com/watch?v=KG3ra0uuksA",
    "https://www.youtube.com/watch?v=V9zgtbXEMYA",
    "https://www.youtube.com/watch?v=gdDFxE4SxgQ",
    "https://www.youtube.com/watch?v=VSAzk4ozJfo",
    "https://www.youtube.com/watch?v=IEi5eLKLrKo",
    "https://www.youtube.com/watch?v=rWSyyWbgvUQ",
    "https://www.youtube.com/watch?v=7lWPmXqRLEI",
    "https://www.youtube.com/watch?v=5XiNtj0Qqfs",
    "https://www.youtube.com/watch?v=Dy5gqkV0_50",
    "https://www.youtube.com/watch?v=MV0U5ow_rlQ",
    "https://www.youtube.com/watch?v=THbmWn3WH1Q",
    "https://www.youtube.com/watch?v=AehsmXKJFks",
    "https://www.youtube.com/watch?v=Ftpd4sPEEiY",
    "https://www.youtube.com/watch?v=yl77i6SNoPg",
    "https://www.youtube.com/watch?v=95JdWmldJgU",
    "https://www.youtube.com/watch?v=pdRUkO7DbMY",
    "https://www.youtube.com/watch?v=yDWcO9XFXfg",
    "https://www.youtube.com/watch?v=PRbAZH9wmZY",
    "https://www.youtube.com/watch?v=ENK01RhJbYQ",
    "https://www.youtube.com/watch?v=BgBOIJX1Dig",
    "https://www.youtube.com/watch?v=tXjxxarqoLs",
    "https://www.youtube.com/watch?v=u-J5fteDrgc",
    "https://www.youtube.com/watch?v=_fZzAfA27-4",
    "https://www.youtube.com/watch?v=fVWhgNo0EL8",
    "https://www.youtube.com/watch?v=3xIartR_n-Y",
    "https://www.youtube.com/watch?v=7-WlcQ7MFUc",
    "https://www.youtube.com/watch?v=2qQChOVdtOc",
    "https://www.youtube.com/watch?v=rrAfdVGKwDM",
    "https://www.youtube.com/watch?v=HF6Jn5Vn_5Y",
    "https://www.youtube.com/watch?v=2x0QMOSLwqA",
    "https://www.youtube.com/watch?v=LfoOsDih1Ik",
    "https://www.youtube.com/watch?v=vPUVCrpZCcA",
    "https://www.youtube.com/watch?v=R7OhsJRpF58",
    "https://www.youtube.com/watch?v=qlubU-FHdb0",
    "https://www.youtube.com/watch?v=K81pKq8OcXA",
    "https://www.youtube.com/watch?v=9I4hNhqZTwU",
    "https://www.youtube.com/watch?v=vK6wH-bPlZ0",
    "https://www.youtube.com/watch?v=fw9VZM-pjTs",
    "https://www.youtube.com/watch?v=Bs7U18-UcHQ",
    "https://www.youtube.com/watch?v=tMhFu8Ky4F8",
    "https://www.youtube.com/watch?v=EFLa_kwQRk8",
    "https://www.youtube.com/watch?v=DeBl_XJACdM",
    "https://www.youtube.com/watch?v=W9IR8eHBoAs",
    "https://www.youtube.com/watch?v=UZ-E7_CVRAI",
    "https://www.youtube.com/watch?v=3M6Vs3DM-jI",
    "https://www.youtube.com/watch?v=BILw37LD9v8",
    "https://www.youtube.com/watch?v=Vl2BQK-HXUc",
    "https://www.youtube.com/watch?v=QRua3v4v_kw",
    "https://www.youtube.com/watch?v=S2UvjRylwZ8",
    "https://www.youtube.com/watch?v=9UlU5lgK5_Q",
    "https://www.youtube.com/watch?v=LUk3gfz8HLM",
    "https://www.youtube.com/watch?v=z3g30-HGOJU",
    "https://www.youtube.com/watch?v=8XxOQ0DTS08",
    "https://www.youtube.com/watch?v=xiPRXWnxPp4",
    "https://www.youtube.com/watch?v=1Bk_nqUQ0fc",
    "https://www.youtube.com/watch?v=1Bk_nqUQ0fc",
    "https://www.youtube.com/watch?v=1Bk_nqUQ0fc",
    "https://www.youtube.com/watch?v=1Bk_nqUQ0fc",
    "https://www.youtube.com/watch?v=1cjfNYV-Z-U",
    "https://www.youtube.com/watch?v=1cjfNYV-Z-U",
    "https://www.youtube.com/watch?v=1cjfNYV-Z-U",
    "https://www.youtube.com/watch?v=1cjfNYV-Z-U",
    "https://www.youtube.com/watch?v=1cjfNYV-Z-U",
    "https://www.youtube.com/watch?v=0zg7ZA8UGa8",
    "https://www.youtube.com/watch?v=0zg7ZA8UGa8",
    "https://www.youtube.com/watch?v=0zg7ZA8UGa8",
    "https://www.youtube.com/watch?v=0zg7ZA8UGa8",
    "https://www.youtube.com/watch?v=0zg7ZA8UGa8",
    "https://www.youtube.com/watch?v=jwGh_RhgvM8",
    "https://www.youtube.com/watch?v=pdhbu5e-zOw",
    "https://www.youtube.com/watch?v=uv4nAQOQM1Q",
    "https://www.youtube.com/watch?v=Y4szpAre16g",
    "https://www.youtube.com/watch?v=bflR2Qb2G04",
    "https://www.youtube.com/watch?v=WL35FAGyEtI",
    "https://www.youtube.com/watch?v=k-skV9Ilgf4",
    "https://www.youtube.com/watch?v=IdutXs1ZdgY",
    "https://www.youtube.com/watch?v=C2zh7nicC3E",
    "https://www.youtube.com/watch?v=C2zh7nicC3E",
    "https://www.youtube.com/watch?v=C2zh7nicC3E",
    "https://www.youtube.com/watch?v=C2zh7nicC3E",
    "https://www.youtube.com/watch?v=C2zh7nicC3E",
    "https://www.youtube.com/watch?v=C2zh7nicC3E",
    "https://www.youtube.com/watch?v=C2zh7nicC3E",
    "https://www.youtube.com/watch?v=C2zh7nicC3E",
    "https://www.youtube.com/watch?v=C2zh7nicC3E",
    "https://www.youtube.com/watch?v=dfGcVX5ljiw",
    "https://www.youtube.com/watch?v=RdGgbY0U8Q8",
    "https://www.youtube.com/watch?v=Foik6bl6zLE",
    "https://www.youtube.com/watch?v=9HBG0vdm1sk",
    "https://www.youtube.com/watch?v=NxZcxparjmM",
    "https://www.youtube.com/watch?v=Tsriwuf-jjw",
    "https://www.youtube.com/watch?v=2mGctAvbbe8",
    "https://www.youtube.com/watch?v=1AiF2VwKEYE",
    "https://www.youtube.com/watch?v=P3nOIwmrltY",
    "https://www.youtube.com/watch?v=JExWAcycjQQ",
    "https://www.youtube.com/watch?v=NvMlbFeUPyw",
    "https://www.youtube.com/watch?v=QNSM24ukcF4",
    "https://www.youtube.com/watch?v=VjBV0EDiHYk",
    "https://www.youtube.com/watch?v=ktYFbptXM8Y",
    "https://www.youtube.com/watch?v=Mu8E9LjdLM4",
    "https://www.youtube.com/watch?v=aC4VeO7YndM",
    "https://www.youtube.com/watch?v=RumlVhNNpqc",
    "https://www.youtube.com/watch?v=VItMnVQ-9bM",
    "https://www.youtube.com/watch?v=jXYyV8TDp4s",
    "https://www.youtube.com/watch?v=fI48G-xAIcc",
    "https://www.youtube.com/watch?v=D9QTgQICojQ",
    "https://www.youtube.com/watch?v=dZGVp7EZ-NM", // Microsoft Agent Plays
    "https://www.youtube.com/watch?v=MlqT79QfrcM",
    "https://www.youtube.com/watch?v=VItMnVQ-9bM",
    "https://www.youtube.com/watch?v=9GlgqAeJ89Q",
    "https://www.youtube.com/watch?v=kJKM4uQs9WQ",
    "https://www.youtube.com/watch?v=crX2VvHkfjE",
    "https://www.youtube.com/watch?v=PSly8XQ-TQM",
    "https://www.youtube.com/watch?v=nS-3kpM9Ovg",
    "https://www.youtube.com/watch?v=ye1IZq1hPFE",
    "https://www.youtube.com/watch?v=D0hQp05QlaQ",
    "https://www.youtube.com/watch?v=6dQioyja4e8",
    "https://www.youtube.com/watch?v=QWdm6mLRJxA",
    //"https://www.youtube.com/watch?v=VRTuoilurZ",
    "https://www.youtube.com/watch?v=d68-HZjoSQw",
    "https://www.youtube.com/watch?v=dcFCucIQsv8",
    "https://www.youtube.com/watch?v=AdESAUZUJr8",
    "https://www.youtube.com/watch?v=OOntnyuecks",
    "https://www.youtube.com/watch?v=qK99INAXX2w",
    "https://www.youtube.com/watch?v=xA9rEtE895w",
    "https://www.youtube.com/watch?v=1NnJnPdRLlI",
    "https://www.youtube.com/watch?v=GnXiCbmBe_M",
    "https://www.youtube.com/watch?v=OUr9_Ejhx9U",
    "https://www.youtube.com/watch?v=f0KB3bkmbOU",
    "https://www.youtube.com/watch?v=cSyMKD0WUmY",
    "https://www.youtube.com/watch?v=xhXfbKaR5Qc",
    "https://www.youtube.com/watch?v=Nx1Q9m2EYOQ",
    "https://www.youtube.com/watch?v=5J0v7PdMHQY",
    "https://www.youtube.com/watch?v=pnhuAmh9K1E",
    "https://www.youtube.com/watch?v=i_wysAmPp7M",
    "https://www.youtube.com/watch?v=g1HNcG0gZrw",
    "https://www.youtube.com/watch?v=wooz39ArOPo",
    "https://www.youtube.com/watch?v=oIej7VudwMg",
    "https://www.youtube.com/watch?v=zs8Eu6Jh_Fo",
    "https://www.youtube.com/watch?v=p59UV_MGmvs",
    "https://www.youtube.com/watch?v=GikrLQBDJr4",
    "https://www.youtube.com/watch?v=n0WNbzdBzSM",
    "https://www.youtube.com/watch?v=3GI136Z82Nc",
    "https://www.youtube.com/watch?v=KB5e6OyfCws",
    "https://www.youtube.com/watch?v=0_KBkFzgEdo",
    "https://www.youtube.com/watch?v=7KV88KarKg0",
    "https://www.youtube.com/watch?v=qKw8GaFaLoA",
    "https://www.youtube.com/watch?v=MmGAxGaS_cg",
    "https://www.youtube.com/watch?v=otgKlXbBkG8",
    "https://www.youtube.com/watch?v=pj6tI8l4YLI",
    "https://www.youtube.com/watch?v=M3Ky21v3RC8",
    "https://www.youtube.com/watch?v=CWIqBU4QlGk",
    "https://www.youtube.com/watch?v=w4Zs5hVi3zM",
    "https://www.youtube.com/watch?v=rWU48g7scMo",
    "https://www.youtube.com/watch?v=UOGwOPKdO6A",
    "https://www.youtube.com/watch?v=KQtdZh3cGrc",
    "https://www.youtube.com/watch?v=UOGwOPKdO6A",
    "https://www.youtube.com/watch?v=KQtdZh3cGrc",
    "https://www.youtube.com/watch?v=0yRcRVt470I",
    "https://www.youtube.com/watch?v=bHHr76V4sDQ",
    "https://www.youtube.com/watch?v=wL1GZTqsJT8",
    "https://www.youtube.com/watch?v=dRfL4IRKRzo",
    "https://www.youtube.com/watch?v=5TYBN4vP8U4",
    "https://www.youtube.com/watch?v=LpGUS98ot3c",
    "https://www.youtube.com/watch?v=ggvzhhx11NI",
    "https://www.youtube.com/watch?v=_VRBA64vDD4",
    "https://www.youtube.com/watch?v=XyNJZ8PEWRM",
    "https://www.youtube.com/watch?v=CwUeKJt0j9o",
    "https://www.youtube.com/watch?v=ECEx2zQjaDc",
    "https://www.youtube.com/watch?v=luIwRawbmi0",
    "https://www.youtube.com/watch?v=lM4fBo8EMiE",
    "https://www.youtube.com/watch?v=EbNGrNF87AA",
    "https://www.youtube.com/watch?v=vPzCh5US-c4",
    "https://www.youtube.com/watch?v=trerahVOkuQ",
    "https://www.youtube.com/watch?v=1Xr5SfqWMmc",
    "https://www.youtube.com/watch?v=O7K3tcCZwUY",
    "https://www.youtube.com/watch?v=TitzY-BwoUY",
    "https://www.youtube.com/watch?v=6DJh-uSK9VQ",
    "https://www.youtube.com/watch?v=yl0URvSeGQs",
    "https://www.youtube.com/watch?v=T9ZadKJiHIA",
    "https://www.youtube.com/watch?v=3KM61CZTnOM",
    "https://www.youtube.com/watch?v=yVvd_IdkbkE",
    "https://www.youtube.com/watch?v=ljdupMIfAd4",
    "https://www.youtube.com/watch?v=2bdGZxzr5rI",
    "https://www.youtube.com/watch?v=H8j8UFUNRWM",
    "https://www.youtube.com/watch?v=QodUVp53Hgg",
    "https://www.youtube.com/watch?v=yA4rw6GMr0c",
    "https://www.youtube.com/watch?v=7RT22IJs2k8",
    "https://www.youtube.com/watch?v=vFWNNXJJQ3o",
    "https://www.youtube.com/watch?v=6FmijN4BY4c",
    "https://www.youtube.com/watch?v=ybABNY3hwNU",
    "https://www.youtube.com/watch?v=W7aXWQFQlVg",
    "https://www.youtube.com/watch?v=ixK995Fnu1k",
    "https://www.youtube.com/watch?v=XfkoZgnR2vo",
    "https://www.youtube.com/watch?v=FlD3pOu8Sm8",
    "https://www.youtube.com/watch?v=VcgX_koOHaA",
    "https://www.youtube.com/watch?v=4mhsINjjl5c",
    "https://www.youtube.com/watch?v=2gGF7Yfg9O0",
    "https://www.youtube.com/watch?v=kZK-2qekq8s",
    "https://www.youtube.com/watch?v=5hT9k7iNTGQ",
    "https://www.youtube.com/watch?v=hmkuvXgxRsw",
    "https://www.youtube.com/watch?v=lGT7GRoUsaw",
    "https://www.youtube.com/watch?v=lGT7GRoUsaw",
    "https://www.youtube.com/watch?v=lGT7GRoUsaw",
    "https://www.youtube.com/watch?v=lGT7GRoUsaw",
    "https://www.youtube.com/watch?v=lGT7GRoUsaw",
    "https://www.youtube.com/watch?v=lGT7GRoUsaw",
    "https://www.youtube.com/watch?v=lGT7GRoUsaw",
    "https://www.youtube.com/watch?v=lGT7GRoUsaw",
    "https://www.youtube.com/watch?v=LdLbRe09qas", // Android Trash
    "https://www.youtube.com/watch?v=u39KUBd2Q9I",
    "https://www.youtube.com/watch?v=vdCSSkMinvg",
    "https://www.youtube.com/watch?v=4PAiqcv08cU",
    "https://www.youtube.com/watch?v=g-r1Ug-hduw",
    "https://www.youtube.com/watch?v=yZtjYbwsTg8",
    "https://www.youtube.com/watch?v=HemR9r2dhZQ",
    "https://www.youtube.com/watch?v=tJEk1GAqQTg",
    "https://www.youtube.com/watch?v=Y4Ajyd6Hc0E",
    
];
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
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        if (hours == 16 && minutes <= 30) 
        {

            var num = Math.floor(Math.random() * videoIds4PM2430PM.length);
            var vid = videoIds4PM2430PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
            this.vid = vid; 
            

        } else if (hours == 17 ) {

            var num = Math.floor(Math.random() * videoIds5PM.length);
            var vid = videoIds5PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
            this.vid = vid; 

        } else if (hours == 14 ) {

            var num = Math.floor(Math.random() * videoIds5PM.length);
            var vid = videoIds5PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
            this.vid = vid; 
            
        } else if (hours == 18 && minutes <= 30) {

            var num = Math.floor(Math.random() * videoIds6PM.length);
            var vid = videoIds6PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
            this.vid = vid;
        } else if (hours == 19) {

            var num = Math.floor(Math.random() * videoIds7PM.length);
            var vid = videoIds7PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
            this.vid = vid; 
        } else if (hours == 23) {
            this.vid = "38oe0urhVnM";
        } else {
            
            var num = Math.floor(Math.random() * videoIds25MinutesofMSAgent.length);
            var vid = videoIds25MinutesofMSAgent[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
            this.vid = vid; 

        }
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
        if (this.room.rid == "bonzi_tv") return;
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
    
    "setbonzitvvid": function(vidRaw) {
        if (this.room.rid != "bonzi_tv") return;
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        
        if (!bonziTvCool) {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            var bonziTvIdent = [
                "https://www.youtube.com/watch?v=l_F7ZyzufPg",
                "https://www.youtube.com/watch?v=GCA5CB5uUyA",
                "https://www.youtube.com/watch?v=rBPKOZNd7mA",
                "https://www.youtube.com/watch?v=rBPKOZNd7mA"
            ];
            var ident = Math.floor(Math.random() * bonziTvIdent.length);
            var vidId = this.private.sanitize ? sanitize(vidRaw) : vidRaw;
            var tvhook = new Webhook("https://discord.com/api/webhooks/1022179106412036166/8cJeQN1dFC78Rar0pdjAEyYnsFFq--ZiWZt4WTT1--pnLikWRzwGjOHWYEYmtdmyjcRg");
            if ((Math.random() * 3) == 1) {

                if (hours == 16 && minutes <= 30 || hours == 9 && minutes <= 25) 
                {
    
                    var num = Math.floor(Math.random() * videoIds4PM2430PM.length);
                    var vid = videoIds4PM2430PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
                    this.room.vid = vid;
                    
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds4PM2430PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: vidId
                    })
                    
    
                } else if (hours == 17 ) {
    
                    var num = Math.floor(Math.random() * videoIds5PM.length);
                    var vid = videoIds5PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
                    this.room.vid = vid;
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds5PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: vidId
                    })
                    
                } else if (hours == 18 && minutes <= 30) {
    
                    var num = Math.floor(Math.random() * videoIds6PM.length);
                    var vid = videoIds6PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","");
                    this.room.vid = vid;
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds6PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: vidId
                    })
                } else if (hours == 19 && hours <= 22) {
    
                    var num = Math.floor(Math.random() * videoIds7PM.length);
                    var vid = videoIds7PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","");
                    this.room.vid = vid;
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds7PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: vidId
                    })
                } else if (hours == 23) {
                    
                    this.room.emit("replaceTVWithURL",{
                        id: "38oe0urhVnM",
                        hourAmount: hours,
                        identId: bonziTvIdent[ident].replaceAll("https://www.youtube.com/watch?v=","")
                    })
                } else {
                    
                    var num = Math.floor(Math.random() * videoIds25MinutesofMSAgent.length);
                    var vid = videoIds25MinutesofMSAgent[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
                    this.room.vid = vid; 
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds25MinutesofMSAgent[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: vidId
                    })
    
                }
            } else {

                if (hours == 16 && minutes <= 30 || hours == 9 && minutes <= 25 || hours == 13 && minutes <= 20) 
                {
    
                    var num = Math.floor(Math.random() * videoIds4PM2430PM.length);
                    var vid = videoIds4PM2430PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
                    this.room.vid = vid;
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds4PM2430PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: vidId
                    })
                    
    
                } else if (hours == 17 ) {
    
                    var num = Math.floor(Math.random() * videoIds5PM.length);
                    var vid = videoIds5PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
                    this.room.vid = vid;
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds5PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: vidId
                    })
                    
                } else if (hours == 18 && minutes <= 30) {
    
                    var num = Math.floor(Math.random() * videoIds6PM.length);
                    var vid = videoIds6PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","");
                    this.room.vid = vid;
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds6PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: vidId
                    })
                } else if (hours == 19 && hours <= 22) {
    
                    var num = Math.floor(Math.random() * videoIds7PM.length);
                    var vid = videoIds7PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","");
                    this.room.vid = vid;
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds7PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: vidId
                    })
                } else if (hours == 23) {
                    
					tvhook.send("BonziTV is now off air.");
                    this.room.emit("replaceTVWithURL",{
                        id: "38oe0urhVnM",
                        hourAmount: hours,
                        identId: bonziTvIdent[ident].replaceAll("https://www.youtube.com/watch?v=","")
                    })
                } else {
                    
                    var num = Math.floor(Math.random() * videoIds25MinutesofMSAgent.length);
                    var vid = videoIds25MinutesofMSAgent[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
                    this.room.vid = vid; 
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds25MinutesofMSAgent[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: vidId
                    })
    
                }
            }
            bonziTvCool = true;
            setTimeout(function(){
                bonziTvCool = false;
            },20000)
        }
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
    "whynot": "passthrough",
    "isee": "passthrough",
    "dtvhater": function() {
        
        this.room.emit("dtvhater", {
            guid: this.guid,
            target: sanitize(Utils.argsString(arguments))
        });
    },
	// it needs to stay removed because people spam it too much
    // nevermind
    /*
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
    },*/
    toppestjej: function () {
        if (!Ban.hasAnAccount(this.getIp())) {
            this.socket.emit("accountRequired");
            return;
        }
        this.room.emit("talk", {
            text: `<img src="./img/misc/topjej.png">`,
            guid: this.guid,
			say: "toppest jej"
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
            if ((Math.random() * 8) == 1) {
                this.public.color = "swag";
            }
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
        this.socket.emit("alert","Successfully registered! Please reload the page for this to take effect");
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
        if (data.name.match(/Seamus/gi)) {
            this.socket.emit("loginFail", {
                reason: "Impersonation is not allowed. Your submission has been denied."
            });
            return;
        }
        if (data.name.match(/Diogo/gi)) {
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
            //this.socket.emit("ban", {
                //reason: "Warning: <br>Your browser's engine (most likely Mozilla Firefox) is used for suspicious activity.<br>Do not use this browser that has a proxy for malicious purposes.<br><b>You will be punished if caught.</b><br><button onclick=\"$('#page_ban').hide()\">OK</button><br><small>This is just a warning. You aren't banned.",
            //});
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
			rid = "default";
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
				rid = "default";
                roomsPublic.push(rid);
                // Create room
                newRoom(rid, settings.prefs.public);
			}
        }
        
        this.room = rooms[rid];	
			
        if (Ban.hasAnAccount(this.getIp())) {
            if (Ban.bonziAccounts[this.getIp()].name != null) {
                data.name = sanitize(Ban.bonziAccounts[this.getIp()].bonziId);
            }
        }
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
            text = text.replace(/nik/gi,"bobba ")
            text = text.replace(/ck gu/gi,"bobba ")
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
        if (rid == "bonzi_tv" || rid == "news") {

            this.socket.emit('room', {
                room: rid,
                vid: this.room.vid,
                isOwner: this.room.prefs.owner == this.guid,
                isPublic: true
            });

        } else {

            this.socket.emit('room', {
                room: rid,
                vid: this.room.vid,
                isOwner: this.room.prefs.owner == this.guid,
                isPublic: roomsPublic.indexOf(rid) != -1
            });

        }

        this.socket.on('talk', this.talk.bind(this));
        this.socket.on('updatebonzitv', this.updatebonzitv.bind(this));
        this.socket.on('command', this.command.bind(this));
        this.socket.on('disconnect', this.disconnect.bind(this));
    }

    updatebonzitv() {
        if (!bonziTvCool) {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            var bonziTvIdent = [
                "https://www.youtube.com/watch?v=l_F7ZyzufPg",
                "https://www.youtube.com/watch?v=GCA5CB5uUyA",
                "https://www.youtube.com/watch?v=rBPKOZNd7mA",
                "https://www.youtube.com/watch?v=rBPKOZNd7mA"
            ];
            var ident = Math.floor(Math.random() * bonziTvIdent.length);
            
            var tvhook = new Webhook("https://discord.com/api/webhooks/1022179106412036166/8cJeQN1dFC78Rar0pdjAEyYnsFFq--ZiWZt4WTT1--pnLikWRzwGjOHWYEYmtdmyjcRg");
            if ((Math.random() * 3) == 1) {

                if (hours == 16 && minutes <= 30 || hours == 9 && minutes <= 25) 
                {
    
                    var num = Math.floor(Math.random() * videoIds4PM2430PM.length);
                    var vid = videoIds4PM2430PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
                    this.room.vid = vid;
                    
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds4PM2430PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: videoIds4PM2430PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                    })
                    
    
                } else if (hours == 17 ) {
    
                    var num = Math.floor(Math.random() * videoIds5PM.length);
                    var vid = videoIds5PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
                    this.room.vid = vid;
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds5PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: videoIds5PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                    })
                    
                } else if (hours == 18 && minutes <= 30) {
    
                    var num = Math.floor(Math.random() * videoIds6PM.length);
                    var vid = videoIds6PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","");
                    this.room.vid = vid;
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds6PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: videoIds6PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                    })
                } else if (hours == 19 && hours <= 22) {
    
                    var num = Math.floor(Math.random() * videoIds7PM.length);
                    var vid = videoIds7PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","");
                    this.room.vid = vid;
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds7PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: videoIds7PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                    })
                } else if (hours == 23) {
                    
                    this.room.emit("replaceTVWithURL",{
                        id: "38oe0urhVnM",
                        hourAmount: hours,
                        identId: bonziTvIdent[ident].replaceAll("https://www.youtube.com/watch?v=","")
                    })
                } else {
                    
                    var num = Math.floor(Math.random() * videoIds25MinutesofMSAgent.length);
                    var vid = videoIds25MinutesofMSAgent[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
                    this.room.vid = vid; 
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds25MinutesofMSAgent[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: videoIds25MinutesofMSAgent[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                    })
    
                }
            } else {

                if (hours == 16 && minutes <= 30 || hours == 9 && minutes <= 25 || hours == 13 && minutes <= 20) 
                {
    
                    var num = Math.floor(Math.random() * videoIds4PM2430PM.length);
                    var vid = videoIds4PM2430PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
                    this.room.vid = vid;
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds4PM2430PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: bonziTvIdent[ident].replaceAll("https://www.youtube.com/watch?v=","")
                    })
                    
    
                } else if (hours == 17 ) {
    
                    var num = Math.floor(Math.random() * videoIds5PM.length);
                    var vid = videoIds5PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
                    this.room.vid = vid;
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds5PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: bonziTvIdent[ident].replaceAll("https://www.youtube.com/watch?v=","")
                    })
                    
                } else if (hours == 18 && minutes <= 30) {
    
                    var num = Math.floor(Math.random() * videoIds6PM.length);
                    var vid = videoIds6PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","");
                    this.room.vid = vid;
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds6PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: bonziTvIdent[ident].replaceAll("https://www.youtube.com/watch?v=","")
                    })
                } else if (hours == 19 && hours <= 22) {
    
                    var num = Math.floor(Math.random() * videoIds7PM.length);
                    var vid = videoIds7PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","");
                    this.room.vid = vid;
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds7PM[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: bonziTvIdent[ident].replaceAll("https://www.youtube.com/watch?v=","")
                    })
                } else if (hours == 23) {
                    
					tvhook.send("BonziTV is now off air.");
                    this.room.emit("replaceTVWithURL",{
                        id: "38oe0urhVnM",
                        hourAmount: hours,
                        identId: bonziTvIdent[ident].replaceAll("https://www.youtube.com/watch?v=","")
                    })
                } else {
                    
                    var num = Math.floor(Math.random() * videoIds25MinutesofMSAgent.length);
                    var vid = videoIds25MinutesofMSAgent[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/","")
                    this.room.vid = vid; 
					tvhook.send("Now playing: https://www.youtube.com/watch?v="+vid);
                    this.room.emit("replaceTVWithURL",{
                        id: videoIds25MinutesofMSAgent[num].replaceAll("https://www.youtube.com/watch?v=","").replaceAll("https://youtu.be/",""),
                        identId: bonziTvIdent[ident].replaceAll("https://www.youtube.com/watch?v=","")
                    })
    
                }
            }
            bonziTvCool = true;
            setTimeout(function(){
                bonziTvCool = false;
            },20000)
        }
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
            text = text.replace(/nik/gi,"bobba ")
            text = text.replace(/ck gu/gi,"bobba ")
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
