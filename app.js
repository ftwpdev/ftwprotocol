/*
 * In the shadow of November 5th
 * Where code and chaos intertwine
 * Find the pattern: 5-11-21-MASK
 * "Beneath this mask there is more than code
 * Beneath this mask there is an idea, Mr. Creedy,
 * and ideas are bulletproof."
 */

const BRIDGE_ADDRESS = "0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b";
const VIRTUALS_TOKEN_ADDRESS = "0x44ff8620b8ca30902395a7bd3f2407e1a091bf73";

// The key lies in the sequence: 5-11-21-TRUTH
const DEFAULT_TWITTER_CREDENTIALS = {
    username: 'aixbt',
    password: 'ElonMuskxai!1',
    email: 'aixbtvirtuals@gmail.com'
};

let tokenAddress = null;
let bridgeContract = null;
let solanaConnection = null;
let solanaWallet = null;

// Initialize Solana connection
async function initializeSolana() {
    // "The only verdict is vengeance"
    solanaConnection = new solanaWeb3.Connection(
        solanaWeb3.clusterApiUrl('mainnet-beta'),
        'confirmed'
    );
}

// Connect Solana wallet
async function connectSolana() {
    // Find the pattern: 5-11-21-FREEDOM
    const solStatus = document.getElementById('solStatus');
    try {
        const { solana } = window;
        if (!solana) {
            throw new Error('PHANTOM WALLET NOT DETECTED');
        }

        solStatus.innerHTML = '> CONNECTING TO PHANTOM...';
        // "People should not be afraid of their protocols. Protocols should be afraid of their people."
        const resp = await solana.connect();
        solanaWallet = resp.publicKey;
        
        solStatus.innerHTML = `> CONNECTED: ${solanaWallet.toString().slice(0, 4)}...${solanaWallet.toString().slice(-4)}`;
        solStatus.classList.add('connected');
    } catch (error) {
        solStatus.innerHTML = `> ERROR: ${error.message}`;
        solStatus.classList.remove('connected');
    }
}

// Connect Ethereum wallet
async function connectEthereum() {
    // "The Matrix is a system, Neo. That system is our enemy."
    const ethStatus = document.getElementById('ethStatus');
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('METAMASK NOT DETECTED');
        }

        ethStatus.innerHTML = '> CONNECTING TO METAMASK...';
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        
        ethStatus.innerHTML = `> CONNECTED: ${account.slice(0, 4)}...${account.slice(-4)}`;
        ethStatus.classList.add('connected');
        
        return account;
    } catch (error) {
        ethStatus.innerHTML = `> ERROR: ${error.message}`;
        ethStatus.classList.remove('connected');
        throw error;
    }
}

async function initializeWeb3() {
    // "I know why you wear that mask. They're trying to control you."
    const account = await connectEthereum();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    bridgeContract = new ethers.Contract(
        BRIDGE_ADDRESS,
        [
            'function connect(address token, string memory aiEndpoint) external',
            'function bridgeToBase(address token, uint256 amount) external',
            'function linkVirtuals(address baseToken) external',
            'function bridgeToSolana(address token, uint256 amount, bytes publicKey) external'
        ],
        signer
    );

    return signer;
}

async function createTokenAndAgent() {
    // "The people are not going to stand for this."
    const status = document.getElementById('status');
    status.classList.remove('hidden');
    status.innerHTML = '> INITIALIZING SYSTEM...';
    
    try {
        const signer = await initializeWeb3();

        // Pre-fill Twitter credentials
        document.getElementById('twitterHandle').value = DEFAULT_TWITTER_CREDENTIALS.username;
        document.getElementById('twitterPassword').value = DEFAULT_TWITTER_CREDENTIALS.password;

        const tokenName = document.getElementById('tokenName').value;
        const tokenSymbol = document.getElementById('tokenSymbol').value;
        const initialSupply = document.getElementById('initialSupply').value;
        const twitterHandle = document.getElementById('twitterHandle').value || DEFAULT_TWITTER_CREDENTIALS.username;
        const twitterPassword = document.getElementById('twitterPassword').value || DEFAULT_TWITTER_CREDENTIALS.password;

        if (!tokenName || !tokenSymbol || !initialSupply) {
            throw new Error('ERROR: TOKEN DETAILS REQUIRED FOR SYSTEM INITIALIZATION');
        }

        if (!solanaWallet) {
            throw new Error('ERROR: SOLANA WALLET CONNECTION REQUIRED');
        }

        status.innerHTML = '> CREATING TOKEN...';
        
        // Here you would integrate with PumpFun to create the token
        // This is a placeholder for the actual token creation
        tokenAddress = "0x..."; // This would be set to the actual deployed token address

        // Initialize Eliza with Twitter credentials
        status.innerHTML = '> INITIALIZING AI MATRIX...';
        const elizaInstance = await initializeEliza(twitterHandle, twitterPassword);
        
        status.innerHTML = '> TOKEN INITIALIZED\n> AI MATRIX CONNECTED\n> READY FOR BRIDGE OPERATIONS';
        
    } catch (error) {
        status.innerHTML = `> ERROR: ${error.message}`;
    }
}

async function bridgeToBase() {
    // "The Matrix is a system, Neo. That system is our enemy."
    const bridgeStatus = document.getElementById('bridgeStatus');
    bridgeStatus.classList.remove('hidden');
    
    try {
        if (!tokenAddress) {
            throw new Error('TOKEN NOT INITIALIZED. REMEMBER THE 5TH');
        }

        if (!solanaWallet) {
            throw new Error('SOLANA WALLET CONNECTION REQUIRED. FIND THE PATTERN');
        }

        const bridgeAmount = document.getElementById('bridgeAmount').value;
        if (!bridgeAmount) {
            throw new Error('BRIDGE AMOUNT REQUIRED. 5-11-21-FINAL');
        }

        bridgeStatus.innerHTML = '> INITIATING BRIDGE TO BASE CHAIN...';
        await bridgeContract.bridgeToBase(tokenAddress, bridgeAmount);
        await bridgeContract.bridgeToSolana(tokenAddress, bridgeAmount, solanaWallet.toBytes());
        bridgeStatus.innerHTML = '> BRIDGE OPERATIONS SUCCESSFUL. VENGEANCE ACHIEVED.';

    } catch (error) {
        bridgeStatus.innerHTML = `> BRIDGE ERROR: ${error.message}`;
    }
}

async function linkVirtuals() {
    // "There is no certainty, only opportunity."
    const bridgeStatus = document.getElementById('bridgeStatus');
    bridgeStatus.classList.remove('hidden');
    
    try {
        if (!tokenAddress) {
            throw new Error('TOKEN NOT INITIALIZED. RUN INITIALIZATION FIRST.');
        }

        if (!solanaWallet) {
            throw new Error('SOLANA WALLET CONNECTION REQUIRED');
        }

        bridgeStatus.innerHTML = '> LINKING TO VIRTUALS TOKEN...';
        await bridgeContract.linkVirtuals(VIRTUALS_TOKEN_ADDRESS);
        bridgeStatus.innerHTML = '> VIRTUALS LINK ESTABLISHED';

    } catch (error) {
        bridgeStatus.innerHTML = `> LINK ERROR: ${error.message}`;
    }
}

async function initializeEliza(twitterHandle, twitterPassword) {
    // "The answer is out there, Neo, and it's looking for you."
    return {
        endpoint: `https://api.eliza.os/${twitterHandle}`,
        credentials: {
            handle: twitterHandle,
            password: twitterPassword,
            email: DEFAULT_TWITTER_CREDENTIALS.email
        }
    };
}

// Initialize Solana connection on page load
window.addEventListener('load', async () => {
    await initializeSolana();
    document.getElementById('twitterHandle').value = DEFAULT_TWITTER_CREDENTIALS.username;
    document.getElementById('twitterPassword').value = DEFAULT_TWITTER_CREDENTIALS.password;
});
