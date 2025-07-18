require('dotenv').config();
const { Wallet } = require('ethers');
const fs = require('fs');

const keystorePath = process.env.KEYSTORE_PATH || '';
const password = 'hlf';

function getPrivateKeyFromKeystore() {
    try {
        const keystoreContent = JSON.parse(fs.readFileSync(keystorePath, "utf-8"));
        const keystoreString = JSON.stringify(keystoreContent);
        const wallet = Wallet.fromEncryptedJsonSync(keystoreString, password);
        return wallet.privateKey;
    } catch (error) {
        console.error("Error reading keystore from environment path:", error);
        throw error; // Re-throw the error after logging it
    }
}

function getPrivateKeyFromKeystoreParameter(keystorePathPtr, passwordPtr) {
    try {
        const keystoreContent = JSON.parse(fs.readFileSync(keystorePathPtr, "utf-8"));
        const keystoreString = JSON.stringify(keystoreContent);
        const wallet = Wallet.fromEncryptedJsonSync(keystoreString, passwordPtr);
        return wallet.privateKey;
    } catch (error) {
        console.error(`Error reading keystore from provided path: ${keystorePath}`, error);
        throw error; // Re-throw the error after logging it
    }
}

module.exports = {
    loadPrivate: {
        getPrivateKeyFromKeystore,
        getPrivateKeyFromKeystoreParameter
    }
};