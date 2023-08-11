# 🥫 Tin Can Phone

*A CLI tool for sending and receiving messages over unsecured networks*

<div style="text-align:center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Fig_7_Le_Telephone_by_T_du_Moncel_Paris_1880_%28Large%29.jpg/271px-Fig_7_Le_Telephone_by_T_du_Moncel_Paris_1880_%28Large%29.jpg" />
</div>

## 🛠 Build Instructions

### Prerequisites

- Make sure you have [Node.js](https://nodejs.org/) installed
- Clone the repository to your local machine

```bash
$ git clone https://github.com/sebprest/tin-can-phone.git
```


### Setting up the project

1. Navigate to the project directory:

```bash
cd tin-can-phone
```

2. Install dependencies:

```bash
npm install
```

### Building the Application

1. Compile the application:

```bash
npm run build
```

2. Upon completion, the bundled output will be in the `dist` directory.

## 🚀 Usage

To encrypt a message, use the `encrypt` command:

```bash
node tincanphone.js encrypt --sender alice --receiver bob --message "Hello, Bob!"
```


This will encrypt the message "Hello, Bob!" using Alice's public key and Bob's public key, and print the encrypted message to the console.

To decrypt a message, use the `decrypt` command:

```bash
node tincanphone.js decrypt --sender alice --receiver bob --message "encrypted message"
```


This will decrypt the encrypted message using Alice's private key and Bob's public key, and print the decrypted message to the console.

To create a new user, use the `create-user` command:

```bash
node tincanphone.js create-user --user alice
```


This will generate a new public-private key pair for the user "alice" and store the keys in the user's home directory.

## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for details.