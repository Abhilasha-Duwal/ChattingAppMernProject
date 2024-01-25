// Function to check if a number is prime
function isPrime(num) {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return num > 1;
  }
  
  // Function to find the greatest common divisor (GCD) of two numbers
  function gcd(a, b) {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
  
  // Function to find the modular inverse using the Extended Euclidean Algorithm
  function modInverse(a, m) {
    for (let i = 1; i < m; i++) {
      if ((a * i) % m === 1) {
        return i;
      }
    }
    return 1;
  }
  
  // Function to generate key pair
  function generateKeyPair() {
    let p, q, n, phiN, e, d;
  
    // Choose two large prime numbers (for simplicity, these are small primes)
    do {
      p = 17;
      q = 19;
    } while (!isPrime(p) || !isPrime(q));
  
    // Compute n and Euler's totient function (phiN)
    n = p * q;
    phiN = (p - 1) * (q - 1);
  
    // Choose a public exponent e (commonly 65537)
    e = 65537;
  
    // Compute the private exponent d
    d = modInverse(e, phiN);
  
    return { publicKey: { n, e }, privateKey: { n, d } };
  }
  
  // Function to encrypt a message using the public key
  function encrypt(message, publicKey) {
    const encryptedMessage = [];
    for (let i = 0; i < message.length; i++) {
      const charCode = message.charCodeAt(i);
      const encryptedChar = modExp(charCode, publicKey.e, publicKey.n);
      encryptedMessage.push(encryptedChar);
    }
    return encryptedMessage;
  }
  
  // Function to decrypt a message using the private key
  function decrypt(encryptedMessage, privateKey) {
    let decryptedMessage = "";
    for (let i = 0; i < encryptedMessage.length; i++) {
      const encryptedChar = encryptedMessage[i];
      const decryptedChar = modExp(encryptedChar, privateKey.d, privateKey.n);
      decryptedMessage += String.fromCharCode(decryptedChar);
    }
    return decryptedMessage;
  }
  
  // Function for modular exponentiation
  function modExp(base, exponent, modulus) {
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
      if (exponent % 2 === 1) {
        result = (result * base) % modulus;
      }
      exponent = Math.floor(exponent / 2);
      base = (base * base) % modulus;
    }
    return result;
  }
  
  // Example usage
  // const { publicKey, privateKey } = generateKeyPair();
  // const message = "Hello, World!";
  
  // const encryptedMessage = encrypt(message, publicKey);
  // console.log("Encrypted Message:", encryptedMessage);
  
  // const decryptedMessage = decrypt(encryptedMessage, privateKey);
  // console.log("Decrypted Message:", decryptedMessage);
  
module.exports = {
    generateKeyPair,
    encrypt,
    decrypt
}
