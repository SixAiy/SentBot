const config = {
    
    "systemNotice": "true",

    "version": "rev-0.1.1_45",

    "owner": [
		"188571987835092992", //SixAiy|Alyzza
        "268383799132291072" //PhoenixWolf|Vlad
    ],

    "ytkey": "AIzaSyAQCe_FaEJ8onr7-ocnN01Y3EZ1DDni7fE", // YOUTUBE API KEY FOR SEARCHING SONGS!

    //"token": 'MjkxOTE4OTQ2NjcwNzM5NDU3.D2F84A.lEdFhPyyCgJW-vnsjWj7jnS908c',//SENTBOT
    "token": 'NjAyNzIzOTM3NzU0ODA4MzM5.XZ5H1A.i5Ssr-Kx8hmSei193HfkH9xrUWM', //SENTBOT BETA

    "staff": [
        "112612543125520384", //Sorch
        "276209039363538945", //Rocky (FredBoat Staff)
        "120603326625742848"  //Trouble420|Brent
    ],

    "supportchannel": '557830398030381056',

    "defaultSettings": {
        "prefix": ">>",
        "modLogChannel": "modlogs",
        "modLogUpdates": "false",
        "modRole": "Moderators",
        "adminRole": "Admins",
        "welcomeChannel": "welcome",
        "welcomeMessage": "Say hello to {{user}}, everyone! We all need a warm welcome :D",
        "welcomeEnabled": "false",
    },

    permLevels: [
        {
            level: 0,
            name: "User",
            check: () => true
        },
        {
            level: 2,
            name: "Moderator",
            check: (message) => {
                try {
                    const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
                    if (modRole && message.member.roles.has(modRole.id)) return true;
                } catch (e) {
                    return false;
                }
            }
        },
        {
            level: 3,
            name: "Administrator",
            check: (message) => {
                try {
                    const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
                    return (adminRole && message.member.roles.has(adminRole.id));
                } catch (e) {
                    return false;
                }
            }
        },
        {
            level: 4,
            name: "Server Owner",
            check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
        },
        {
            level: 8,
            name: "Support Staff",
            check: (message) => config.staff.includes(message.author.id)
        },
        {
            level: 10,
            name: "Owner",
            check: (message) => config.owner.includes(message.author.id)
        }
    ]
};

module.exports = config;
