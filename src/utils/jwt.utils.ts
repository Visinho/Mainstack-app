import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

// import dotenv from "dotenv"; 

// Load environment variables from .env file
// dotenv.config();

// Retrieve private and public keys from environment variables
// const privateKey = process.env.PRIVATE_KEY as string;
// const publicKey = process.env.PUBLIC_KEY as string;

// This is a more suitable option as a .env file will be a lot safer but for the purposes of this test, we can use the keys I have generated.


export function signJwt(object: Object, options?:
    jwt.SignOptions | undefined
) {
return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256"
});
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (e: any) {
        return {
        valid: false,
        expired: e.message === "jwt expired",
        decoded: null
    }
}
}