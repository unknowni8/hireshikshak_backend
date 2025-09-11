import mongoose from 'mongoose';
import { envConfig } from "../utilities/envKeysUtil.js";

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 5000;

class MongoDBConnection {
    constructor() {
        this.uri = envConfig.mongo_uri;
        this.options = {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 100,
            socketTimeoutMS: 45000,
            heartbeatFrequencyMS: 30000,
            retryWrites: true,
            retryReads: true,
        };
    }

    async connect() {
        try {
            await mongoose.connect(this.uri, this.options);
            this.retryAttempts = 0;
            this.isConnected = true;
            console.log('✅ Successfully connected to MongoDB');

            // Set up event listeners
            mongoose.connection.on('connected', () => {
                console.log('ℹ️ Mongoose connected to DB');
                this.isConnected = true;
            });

            mongoose.connection.on('error', (err) => {
                console.error('❌ Mongoose connection error:', err);
                this.isConnected = false;
            });

            mongoose.connection.on('disconnected', () => {
                console.warn('⚠️ Mongoose disconnected from DB');
                this.isConnected = false;
                this.handleDisconnection();
            });

            process.on('SIGINT', this.gracefulShutdown.bind(this));
            process.on('SIGTERM', this.gracefulShutdown.bind(this));

        } catch (error) {
            console.error('❌ Failed to connect to MongoDB:', error.message);
            this.handleConnectionFailure();
        }
    }

    async handleConnectionFailure() {
        this.retryAttempts++;

        if (this.retryAttempts <= MAX_RETRY_ATTEMPTS) {
            console.log(`🔄 Retrying connection (attempt ${this.retryAttempts}/${MAX_RETRY_ATTEMPTS})...`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
            await this.connect();
        } else {
            console.error(`⛔ Max retry attempts (${MAX_RETRY_ATTEMPTS}) reached. Giving up.`);
            process.exit(1);
        }
    }

    handleDisconnection() {
        if (!this.isConnected && this.retryAttempts <= MAX_RETRY_ATTEMPTS) {
            console.log('🔁 Attempting to reconnect to MongoDB...');
            setTimeout(() => this.connect(), RETRY_DELAY_MS);
        }
    }

    async gracefulShutdown() {
        try {
            await mongoose.disconnect();
            console.log('🛑 Mongoose connection closed through app termination');
            process.exit(0);
        } catch (err) {
            console.error('❌ Error during disconnection:', err);
            process.exit(1);
        }
    }

    getConnection() {
        return mongoose.connection;
    }

    checkConnection() {
        return this.isConnected;
    }
}

const mongoDBConnection = new MongoDBConnection();


export default mongoDBConnection;