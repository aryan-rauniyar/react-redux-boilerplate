//import { pbkdf2Sync, randomBytes, createHash, createSign, createVerify } from 'crypto-browserify';
import {crypto} from 'crypto-browserify';
import { ec as EC } from 'elliptic';
import {printHelloWorld} from '../services/testUtility';

export function testsChain(): void {
  console.log(printHelloWorld());
}


export function generate_keypair(): any {
  const ec = new EC('secp256k1');

  // Function to generate a private key
  const generatePrivateKey = () => {
    // Generate a random 32-byte (256-bit) private key
    const privateKey = randomBytes(32);
    return privateKey.toString('hex');
  };

  const privateKey = generatePrivateKey();
  console.log('Private Key:', privateKey);

  // Verify the private key using elliptic
  const keyPair = ec.keyFromPrivate(privateKey, 'hex');
  console.log('Public Key:', keyPair.getPublic('hex'));
  return keyPair;
}
/*
export function generate_hash(): void {
  const key = pbkdf2Sync('hhhhhpassword', 'salt', 100000, 64, 'sha512');
  console.log('Key Hex:', key.toString('hex'));
}

export function verify_hash(): boolean {
  const verifySignature = (hash: string, signature: string, publicKey: string) => {
    const verifier = createVerify('sha512');
    verifier.update(hash);
    verifier.end();
    const isVerified = verifier.verify(publicKey, signature, 'hex');
    return isVerified;
  };
 
  // Example usage
  const message = 'This is a message to be signed';
  const hash = createHash('sha512').update(message).digest('hex');

  // For demonstration purposes, we'll use a fixed key pair
  // In a real application, you should use a proper key generation method
  const privateKey = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7XKdCRxUZXjdN\n8ybK1YH2IEJw4O79UGr6Sdu8htTC7mFj8pS9MMF3iAwCSxbh2wYVSr8KvHIUNhqf\nWjnnJtmdQBXKs/MX48szB9TZL0Nf2HnSYo61tzM8L+2fVhkI1G01zbrdO0jZetZC\n9PvMQP6UmQTf9Mj227X5mVdtDwh+ySvmjLgJcv4HjaePu27kN+YMIRZs9qbvvqJv\nrVt8yrBxWGytZytpaJru/Zr4mRzFSuM7tlYrFV0Tr6t9vvRkSfQ6qvG5+ZnSzk1o\nn4iFRS/qfpBeXsZHzf1FAEDbpIuJJ1DBrRH2Pq81cbDaL7ZDYYDyGj2u9SI8+p3U\nLBBWRk6dAgMBAAECggEADzX4pn1/iZ1WI/UkiPD2EpT+tG/vnIt4gPc+vKL65vEu\ntFiTCyJO2QK6W2vaoVkZZDh3oY39zZAEGDp+Ks71jU8sDf9ftipJeAprMJ0+7luX\nX/J0SxfKJRWELwD/vPJBKGsmA1Ym+X5IZlxdya12CfPZZs3LrbGxzOrlJaEZiA7J\nq1kMz24z0W1pyVTXVxo2lBbf5ZWfie+1QbBqHWh/kZbJZyLKKz88yrchBB9kgC3P\nkrx2eBt4GUop9+reZ8qRiX/D8Hc1Yt0x7WxKBtf36a4zVm8dtq+MfdMoHt8ZKG0n\nqX3rEbY7y87w1g3Vq8M5B9pxgqt1m4hmhPG+4d90QQKBgQDNTxRkH4IpY6N9qhI6\nB5VzvIr6p6wU+B2Q3VVqWY1TBH7CqJN/KTRp4MTfMjHM7Vnn2G9YGG7TIgcyoZBB\nw0rvE8QQV9SXuhqgRVQQ4z04g/JnV4+MxNaUvC/nFJbOb5vy2/JXN9KAgAp0kMxx\nHvnNtZbh6vMqRmrSQU6r9nUNHQKBgQDrCm/iEfNhvVb2xHDjDpB//NyKymNEdVf0\ncAKH6k8xG/9yoayTIWZNB0x7bZmZHF3T+aPmjqNBqZqJH1EnVlBHqK4hV2vNwjYK\nXi3BwJt8xzwcG5oj/ZNuNnRAmJtYMBxhD4MIJvAyPLp1JRJ4FaxqqNSzXL2QXZug\nYVj8FOC+IQKBgQCtOjmCe1tISsAMp9y7RqpWOqtc7BSRs69MJc16QNUZbmBXj0f4\nngoxHTPFHHLh8QiCXY4rF/Mxv66aRsZAcm9jXATj1/t6USTRbHX3p9uEJmovh9Jk\n6NcSLz4FO39hVuS2Cxr8lJ9NnGUbw3NwZHxw8XtgvqrX+1yF/9O4L2+mvQKBgH+B\nrcgdLtGU0U5P3FpT7KxdatXJ/IUVY7uXl5qLEVy/ys04ysFQ7Sd6JQvWy6rL9UNe\nLRXZlGv1MFu2jVQ9PSlUxk1J0cV+7eAPGAqLLVyDDxnP6gNgb82KTKYgHAtBDEiB\nnuJM1VJPQ1OV9LDsMEkqyFkyQFtLkfHcHlQWb3yBAoGBALM/vAOdO4FUa3tPz8Hq\nQtVHoIIGtJYSdaVvjirkmHlOjZi4+qEOMVVrA8TZUmQ2nL3VEHiE2fYbkkhOLj91\nAwkXQbIBh8lWWf1HG4RzKFt/B6tGMMXH7Fv3KSJnzPwM6aTdFrr4SYHuovVPDXQF\nwEVIZ7SyGAVmWXBiZsfP8+bn\n-----END PRIVATE KEY-----';
  const publicKey = '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1ynQkcVGV43TfMmytWB\n9iBCcODu/VBq+knbvIbUwu5hY/KUvTDBd4gMKEsW4dsGFUq/CrxyFDYan1o55ybZ\nnUAVyrPzF+PLMwfU2S9DX9h50mKOtbczPC/tn1YZCNRtNc263TtI2XrWQvT7zED+\nlJkE3/TI9tu1+ZlXbQ8Ifskr5oy4CXL+B42nj7tu5DfmDCEWbPam776ib61bfMqw\ncVhsrWcraWia7v2a+JkcxUrjO7ZWKxVdE6+rfb70ZEn0OqrxufmZ0s5NaJ+IhUUv\n6n6QXl7GR839RQBA26SLiSdQwa0R9j6vNXGw2i+2Q2GA8ho9rvUiPPqd1CwQVkZO\nnQIDAQAB\n-----END PUBLIC KEY-----';

  // Sign the hash
  const signer = createSign('sha512');
  signer.update(hash);
  signer.end();
  const signature = signer.sign(privateKey, 'hex');

  console.log('Original Hash:', hash);
  console.log('Signature:', signature);

  // Verify the signature
  const isValid = verifySignature(hash, signature, publicKey);
  console.log('Is the signature valid?', isValid);
  return isValid;
}
*/
// Uncomment these lines if you want to run the functions
//printHelloWorld();
// generate_keypair();
// generate_hash();
// verify_hash();

export const updated_protector_utility = {
  testsChain,
};