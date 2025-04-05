const colors = require('colors');
const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
const fs = require('fs');
const readline = require('readline');
const { DateTime } = require('luxon');

(function () {
    const colors = {
        reset: "\x1b[0m",
        bright: "\x1b[1m",
        dim: "\x1b[2m",
        underscore: "\x1b[4m",
        blink: "\x1b[5m",
        reverse: "\x1b[7m",
        hidden: "\x1b[8m",
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        bgBlack: "\x1b[40m",
        bgRed: "\x1b[41m",
        bgGreen: "\x1b[42m",
        bgYellow: "\x1b[43m",
        bgBlue: "\x1b[44m",
        bgMagenta: "\x1b[45m",
        bgCyan: "\x1b[46m",
        bgWhite: "\x1b[47m"
    };

const bannerLines = [
    `${colors.bright}${colors.green}░▀▀█░█▀█░▀█▀░█▀█${colors.reset}\n` +
    `${colors.bright}${colors.cyan}░▄▀░░█▀█░░█░░█░█${colors.reset}\n` +
    `${colors.bright}${colors.yellow}░▀▀▀░▀░▀░▀▀▀░▀░▀${colors.reset}`,
        `${colors.bright}${colors.bgBlue}╔══════════════════════════════════╗${colors.reset}`,
        `${colors.bright}${colors.bgBlue}║                                  ║${colors.reset}`,
        `${colors.bright}${colors.bgBlue}║  ${colors.magenta}ZAIN ARAIN                      ${colors.bgBlue}║${colors.reset}`,
        `${colors.bright}${colors.bgBlue}║  ${colors.cyan}AUTO SCRIPT MASTER              ${colors.bgBlue}║${colors.reset}`,
        `${colors.bright}${colors.bgBlue}║                                  ║${colors.reset}`,
        `${colors.bright}${colors.bgBlue}║  ${colors.yellow}JOIN TELEGRAM CHANNEL NOW!      ${colors.bgBlue}║${colors.reset}`,
        `${colors.bright}${colors.bgBlue}║  ${colors.green}https://t.me/AirdropScript6     ${colors.bgBlue}║${colors.reset}`,
        `${colors.bright}${colors.bgBlue}║  ${colors.red}@AirdropScript6 - OFFICIAL      ${colors.bgBlue}║${colors.reset}`,
        `${colors.bright}${colors.bgBlue}║  ${colors.cyan}CHANNEL                         ${colors.bgBlue}║${colors.reset}`,
        `${colors.bright}${colors.bgBlue}║                                  ║${colors.reset}`,
        `${colors.bright}${colors.bgBlue}║  ${colors.green}FAST - RELIABLE - SECURE        ${colors.bgBlue}║${colors.reset}`,
        `${colors.bright}${colors.bgBlue}║  ${colors.yellow}SCRIPTS EXPERT                  ${colors.bgBlue}║${colors.reset}`,
        `${colors.bright}${colors.bgBlue}║                                  ║${colors.reset}`,
        `${colors.bright}${colors.bgBlue}╚══════════════════════════════════╝${colors.reset}`
    ];

    // Print each line separately
    bannerLines.forEach(line => console.log(line));
})();
console.log('Farmer Airdrop - Do not be afraid to use it. - If you are afraid, do not use it.'.blue);

const generateRandomUserAgent = () => {
    const os = [
        'Windows NT 10.0; Win64; x64',
        'Windows NT 6.1; Win64; x64',
        'Windows NT 11.0; Win64; x64',
        'Macintosh; Intel Mac OS X 10_15_7',
        'Macintosh; Intel Mac OS X 11_2_3',
        'Macintosh; Intel Mac OS X 12_0_1',
        'X11; Linux x86_64',
        'X11; Ubuntu; Linux x86_64',
        'iPhone; CPU iPhone OS 16_0 like Mac OS X',
        'iPad; CPU OS 15_0 like Mac OS X',
        'Android 12; Mobile',
        'Android 13; SM-G960F Build/R16NW',
    ];

    const browsers = [
        { name: 'Chrome', minVersion: 90, maxVersion: 133, suffix: 'Safari/537.36' },
        { name: 'Firefox', minVersion: 80, maxVersion: 128, suffix: '' },
        { name: 'Safari', minVersion: 14, maxVersion: 17, suffix: 'Version/#VERSION# Safari/605.1.15' },
        { name: 'Edge', minVersion: 90, maxVersion: 133, suffix: 'Safari/537.36' },
        { name: 'Opera', minVersion: 70, maxVersion: 100, suffix: 'Chrome/#VERSION# Safari/537.36' },
    ];

    const system = os[Math.floor(Math.random() * os.length)];
    const browser = browsers[Math.floor(Math.random() * browsers.length)];

    const version = Math.floor(Math.random() * (browser.maxVersion - browser.minVersion + 1)) + browser.minVersion;
    const versionString = `${version}.0.0${Math.floor(Math.random() * 10)}`;

    const engines = [
        'AppleWebKit/537.36 (KHTML, like Gecko)',
        'Gecko/20100101',
        'AppleWebKit/605.1.15 (KHTML, like Gecko)',
    ];
    const engine = engines[Math.floor(Math.random() * engines.length)];

    let ua = `Mozilla/5.0 (${system}) ${engine}`;
    
    if (browser.name === 'Safari') {
        ua += ` ${browser.suffix.replace('#VERSION#', versionString)}`;
    } else if (browser.name === 'Opera') {
        ua += ` ${browser.name}/${versionString} ${browser.suffix.replace('#VERSION#', versionString)}`;
    } else {
        ua += ` ${browser.name}/${versionString} ${browser.suffix}`;
    }

    const extras = [
        '',
        'OPR/' + Math.floor(Math.random() * 20 + 80) + '.0.0',
        'UCBrowser/' + Math.floor(Math.random() * 10) + '.0.0',
    ];
    const extra = extras[Math.floor(Math.random() * extras.length)];
    if (extra) ua += ` ${extra}`;

    return ua;
};

const generateAndSaveUserAgents = (count) => {
    const userAgents = [];
    for (let i = 0; i < count; i++) {
        userAgents.push(generateRandomUserAgent());
    }
    fs.writeFileSync('agent.txt', userAgents.join('\n'));
    console.log(`✅ Created and saved ${count} User-Agents vào agent.txt`.green);
    return userAgents;
};

const loadUserAgents = () => {
    try {
        const data = fs.readFileSync('agent.txt', 'utf8').trim();
        return data ? data.split('\n').map(line => line.trim()).filter(Boolean) : [];
    } catch {
        console.log('ℹ️ agent.txt not found, will create new.'.yellow);
        return [];
    }
};

const loadProxies = () => {
    try {
        const data = fs.readFileSync('proxy.txt', 'utf8').trim();
        return data ? data.split('\n').map(line => line.trim()).filter(Boolean) : [];
    } catch {
        return [];
    }
};

const getProxyAgent = (proxy) => {
    if (!proxy) return null;
    if (proxy.startsWith('http://') || proxy.startsWith('https://')) {
        return new HttpsProxyAgent(proxy);
    } else {
        console.log(`❌ Invalid proxy format: ${proxy}`.red);
        return null;
    }
};

const loadCredentials = () => {
    try {
        const data = fs.readFileSync('data.txt', 'utf8').trim();
        const credentials = data.split('\n').map(line => {
            const [email, password] = line.trim().split('|');
            return { email, password };
        }).filter(cred => cred.email && cred.password);
        console.log(`✅ Readable ${credentials.length} account from data.txt.`.green);
        return credentials;
    } catch {
        console.log('❌ Error: data.txt not found or empty.'.red);
        process.exit(1);
    }
};

const login = async (proxy, email, password, userAgent, retries = 3) => {
    const proxyAgent = getProxyAgent(proxy);
    const url = 'https://api.dashboard.3dos.io/api/auth/login';
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.post(url, { email, password }, {
                headers: {
                    'User-Agent': userAgent,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Origin': 'https://dashboard.3dos.io',
                    'Referer': 'https://dashboard.3dos.io/',
                },
                httpsAgent: proxyAgent,
                timeout: 60000,
            });
            if (response.data.status === 'Success') {
                console.log(`✅ Account ${email} has been successfully logged in!`.green);
                return response.data.data.access_token;
            } else {
                console.log(`❌ Account ${email} login failed: ${JSON.stringify(response.data)}`.red);
                return null;
            }
        } catch (error) {
            const errorMsg = error.response ? 
                `Status ${error.response.status}: ${JSON.stringify(error.response.data)}` : 
                error.message;
            console.log(`❌ Account ${email} encountered a login error (Attempted ${attempt}/${retries}): ${errorMsg}`.red);
            if (attempt < retries) {
                console.log(`ℹ️ Try again in 5 seconds...`.yellow);
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
            if (attempt === retries) return null;
        }
    }
};

const sendPing = async (proxy, secret, userAgent) => {
    const proxyAgent = getProxyAgent(proxy);
    const url = `https://api.dashboard.3dos.io/api/profile/api/${secret}`;
    try {
        const response = await axios.post(url, null, {
            headers: {
                'User-Agent': userAgent,
                'Accept': '*/*',
                'Origin': 'chrome-extension://lpindahibbkakkdjifonckbhopdoaooe',
            },
            httpsAgent: proxyAgent,
        });
        if (response.data?.status === 'Success') {
            console.log(`✅ Ping success ${secret}: Success`.green);
        } else {
            console.log(`❌ Ping unsuccessful ${secret}.`.red);
        }
    } catch (error) {
        console.log(`❌ Error ping ${secret}: ${error.message}`.red);
    }
};

const refreshPoints = async (proxy, secret, userAgent) => {
    const proxyAgent = getProxyAgent(proxy);
    const url = `https://api.dashboard.3dos.io/api/refresh-points/${secret}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': userAgent,
                'Accept': '*/*',
                'Origin': 'chrome-extension://lpindahibbkakkdjifonckbhopdoaooe',
            },
            httpsAgent: proxyAgent,
        });
        if (response.data?.data?.total_points !== undefined) {
            const logMessage = `✅ Total points for ${secret}: ${response.data.data.total_points}`;
            console.log(logMessage.green);
            const timestamp = new Date().toISOString();
            fs.appendFileSync('log.txt', `[${timestamp}] ${logMessage}\n`, 'utf8');
        }
    } catch (error) {
    }
};

const claimDailyReward = async (proxy, token, email, userAgent) => {
    const proxyAgent = getProxyAgent(proxy);
    const url = 'https://api.dashboard.3dos.io/api/claim-reward';
    try {
        const response = await axios.post(url, { id: 'daily-reward-api' }, {
            headers: {
                'User-Agent': userAgent,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Origin': 'https://dashboard.3dos.io',
                'Referer': 'https://dashboard.3dos.io/',
                'Authorization': `Bearer ${token}`,
            },
            httpsAgent: proxyAgent,
        });
        if (response.data.status === 'Success') {
            console.log(`✅ Get daily reward successfully | ${response.data.data.points} points`.green);
            return true;
        } else {
            console.log(`❌ Cannot claim daily rewards for account ${email}`.red);
            return false;
        }
    } catch (error) {
        console.log(`❌ Error receiving daily reward account ${email}: ${error.message}`.red);
        return false;
    }
};

const getProfile = async (proxy, token, email, userAgent, retries = 100) => {
    const proxyAgent = getProxyAgent(proxy);
    const url = 'https://api.dashboard.3dos.io/api/profile/me';
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.post(url, {}, {
                headers: {
                    'User-Agent': userAgent,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Origin': 'https://dashboard.3dos.io',
                    'Referer': 'https://dashboard.3dos.io/',
                    'Authorization': `Bearer ${token}`,
                },
                httpsAgent: proxyAgent,
            });
            if (response.data.status === 'Success') {
                const { todays_earning, loyalty_points, api_secret, daily_reward_claim } = response.data.data;
                console.log(`✅ Account ${email} - Today's Earning: ${todays_earning}, Loyalty Points: ${loyalty_points}`.green);

                const now = DateTime.now();
                if (!daily_reward_claim) {
                    await claimDailyReward(proxy, token, email, userAgent);
                } else {
                    const lastClaim = DateTime.fromISO(daily_reward_claim);
                    const diff = now.diff(lastClaim, 'hours').hours;
                    if (diff >= 24.0167) {
                        await claimDailyReward(proxy, token, email, userAgent);
                    } else {
                        console.log(`ℹ️ You checked in daily at ${lastClaim.setZone(DateTime.local().zoneName).toLocaleString(DateTime.DATETIME_FULL)}`.yellow);
                    }
                }

                return { api_secret, success: true };
            } else {
                console.log(`❌ Unable to read account profile ${email}`.red);
                return { api_secret: null, success: false };
            }
        } catch (error) {
            console.log(`❌ Error reading account profile ${email} (Attempt ${attempt}/${retries}): ${error.message}`.red);
            if (attempt < retries) await new Promise(resolve => setTimeout(resolve, 3000));
            if (attempt === retries) return { api_secret: null, success: false };
        }
    }
};

const generateApiKey = async (proxy, token, email, userAgent, retries = 100) => {
    const proxyAgent = getProxyAgent(proxy);
    const url = 'https://api.dashboard.3dos.io/api/profile/generate-api-key';
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.post(url, {}, {
                headers: {
                    'User-Agent': userAgent,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Origin': 'https://dashboard.3dos.io',
                    'Referer': 'https://dashboard.3dos.io/',
                    'Authorization': `Bearer ${token}`,
                },
                httpsAgent: proxyAgent,
            });
            if (response.data.status === 'Success') {
                const api_secret = response.data.data.api_secret;
                console.log(`✅ Created api key for account ${email}: ${api_secret}`.green);
                return api_secret;
            } else {
                console.log(`❌ Unable to generate api key for account ${email}`.red);
                return null;
            }
        } catch (error) {
            console.log(`❌ Error generating api key account ${email} (Attempt ${attempt}/${retries}): ${error.message}`.red);
            if (attempt < retries) await new Promise(resolve => setTimeout(resolve, 3000));
            if (attempt === retries) return null;
        }
    }
};

const askProxyUsage = () => {
    return new Promise((resolve) => {
        readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        }).question('Do you use a proxy?? (y/n): ', (answer) => {
            resolve(answer.trim().toLowerCase() === 'y');
        });
    });
};

const main = async () => {
    const useProxy = await askProxyUsage();
    const proxies = useProxy ? loadProxies() : [];
    const credentials = loadCredentials();

    let userAgents = loadUserAgents();
    if (userAgents.length < credentials.length) {
        userAgents = generateAndSaveUserAgents(credentials.length);
    }

    if (useProxy) {
        if (proxies.length < credentials.length) {
            console.log(`❌ Quantity proxy (${proxies.length}) not enough for ${credentials.length} account. At least ${credentials.length} proxy.` .red);
            process.exit(1);
        }
    }

    const apiSecrets = [];
    const maxAccounts = useProxy ? credentials.length : 1;

    for (let i = 0; i < maxAccounts; i++) {
        const { email, password } = credentials[i];
        const proxy = useProxy ? proxies[i] : null;
        const userAgent = userAgents[i];

        console.log(`ℹ️ Use User-Agent for ${email}: ${userAgent}`.yellow);
        if (useProxy) console.log(`ℹ️ Proxy give ${email}: ${proxies[i]}`.yellow);

        const token = await login(proxy, email, password, userAgent);
        if (!token) continue;

        let { api_secret, success } = await getProfile(proxy, token, email, userAgent);
        if (!success) continue;

        if (!api_secret) {
            api_secret = await generateApiKey(proxy, token, email, userAgent);
        }

        if (api_secret) {
            apiSecrets.push(api_secret);
        }
    }

    if (apiSecrets.length === 0) {
        console.log('❌ No api found...'.red);
        process.exit(1);
    }

    let refreshIndex = 0;
    setInterval(async () => {
        const proxy = useProxy ? proxies[refreshIndex % apiSecrets.length] : null;
        for (let i = 0; i < apiSecrets.length; i++) {
            await refreshPoints(proxy, apiSecrets[i], userAgents[i]);
        }
        refreshIndex++;
    }, 360000);

    let pingIndex = 0;
    console.log('🔄 Start pinging every 3 seconds.'.blue);
    setInterval(async () => {
        const proxy = useProxy ? proxies[pingIndex % apiSecrets.length] : null;
        const secret = apiSecrets[pingIndex % apiSecrets.length];
        const userAgent = userAgents[pingIndex % apiSecrets.length];
        await sendPing(proxy, secret, userAgent);
        pingIndex++;
    }, 3000);
};

main();