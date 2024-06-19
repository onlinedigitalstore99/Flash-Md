const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0o1WHdqUHZXeWtCelliTjBtSGZnblVvTHRvb25JT0hJSEZLOGR2RUszTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidjEvd3BwZzBBKzZZelhLaUdwK3VQa282UVFRSXo3OTFENUtiOEhEL1RVRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLQVJwdkplTmlab3BhbEZtbXpGcUROcTZUMXN5T2ZvMWZsRTRBTElmU0ZZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1b1R4OVVpdCtiZWVjYmduSmUzWldLeFhPWVFjb3JyZEpUa2lvTHVwNDAwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNFZXZsYWdLS2NCZTlQWldVOGdhVTB5YzFRRDZ4bkNyVHJVTm4vQjdkMVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZtSWl4aXpuUjFybmFGeEpsbXlHTGdEaTJmdy9Cd08wOEs0MXFpMXRPVWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUZvY3Vsd1dwT1YwRndaWFhBWVJSMVBSUEwxQzNNb2hXTHdTMGVnNzMxcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTkswYzl4M21CYjI4YzlaT3NBR0l6WFloS0o0R011am1rSjJ3QWcvTldCTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImF5WmJvU0QrcWY0VU52RDhBNUdLUzViM3lyaDNweGo3MWtnSTBQazdTemM1R1BzcWtranhWNm1keW9ZbFAwLzJQckdyUUM2L3NQYm9DRFY1ZGhHekN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjEsImFkdlNlY3JldEtleSI6IlFjYkpNc0FhTDlvLzdHdytNaWtmSTI2eHNLSHZmQXVMRVhQMkcwWUFwTkE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlVpRWZCYjI4UzJtSENEaUhkVXhONEEiLCJwaG9uZUlkIjoiMTIzM2JiYjAtZDgyYi00Y2Q3LThjYTEtMzM4MTEzYjUyNzcxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InEwWURIdzh4TzI3S3YxODdHTFAxSUZ5NVBQdz0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQzFFZDFqaGQxSkJKWWttZFJtY0Q2ZjNtRDNVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUFd4MDVvRUVNam95ck1HR0FnZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZjBkM2hQUG1ZaE4zcHEyTW5iUURKa05JYTVPZWp4VEd2S1l4ZCtMZUF3dz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMWxEZmsva21kenIveWg2SWk1U284NjJ5TVdLaHZwbzNDdVFCVnJpc3FXNDhJQWZTVThqS0N5ZlIrRWp1QjhjdWk0aTBMQU5xOURKdmc0WFh3NEl3Q0E9PSIsImRldmljZVNpZ25hdHVyZSI6ImpRVWhqVzFVSGlkam5EaUdIWTlZSkRwQTUwNXJwWlArTDY1Vmk4V0RRZ0ZOUkpHTUJVU20xRXVKTGpCNlA0TE85N3BVc1JBTm1CTjNWZnR5ZHdzN0NnPT0ifSwibWUiOnsiaWQiOiI5MjM0MDQ4MTIwOTc6MzRAcy53aGF0c2FwcC5uZXQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzNDA0ODEyMDk3OjM0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlg5SGQ0VHo1bUlUZDZhdGpKMjBBeVpEU0d1VG5vOFV4cnltTVhmaTNnTU0ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTg3OTMyOTEsIm15QXBwU3RhdGVLZXlJZCI6IkFCd0FBRlUzIn0=
;;;=>',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Bhatti king",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "923404812097", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
