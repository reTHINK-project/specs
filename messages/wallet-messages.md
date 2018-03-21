---
layout: documentation
title: Wallet management
category: Messages Specification
order: 4
---

This doc specifies Messages to be used to manage wallets and token transactions, where,

-	`<Wallet>` is a JSON object compliant with [Wallet data model](../datamodel/data-objects/wallet).
-	`<Transaction>` is a JSON object compliant with [Wallet Transaction data model](../datamodel/data-objects/wallet).

#### Wallet creation request

Message sent by the Wallet Hyperty to the Wallet Manager hyperty, requesting a wallet creation.

```
"id" : 1,
"type" : "create",
"from" : "hyperty://<wallet-manager-domain>/<wallet-hyperty-identifier>",
"to" : "hyperty://<wallet-manager-domain>/<wallet-manager-hyperty-identifier>"
```

**Response**

```
"id" : 1,
"type" : "response",
"from" : "hyperty://<wallet-manager-domain>/<wallet-manager-hyperty-identifier>",
"to" :  "hyperty://<wallet-manager-domain>/<wallet-hyperty-identifier>"
"body": {
  "code": 200,
  "value": {<Wallet>}
}
```

#### Wallet delete request

Message sent by the Wallet Hyperty to the Wallet Manager hyperty, requesting a wallet removal.

```
"id" : 1,
"type" : "delete",
"from" : "hyperty://<wallet-manager-domain>/<wallet-hyperty-identifier>",
"to" : "hyperty://<wallet-manager-domain>/<wallet-manager-hyperty-identifier>"
```

**Response**

```
"id" : 1,
"type" : "response",
"from" : "hyperty://<wallet-manager-domain>/<wallet-manager-hyperty-identifier>",
"to" :  "hyperty://<wallet-manager-domain>/<wallet-hyperty-identifier>"
"body": {
  "code": 200
}
```

#### Wallet Address request

Message sent to the Wallet Manager hyperty, requesting the wallet address of a certain user.

```
"id" : 1,
"type" : "read",
"from" : "hyperty://<sp-domain>/<hyperty-identifier>",
"to" : "hyperty://<wallet-manager-domain>/<wallet-manager-hyperty-identifier>",
"body": {
  "resource": 'user',
  "value": "userId"
}
```

**Response**

```
"id" : 1,
"type" : "response",
"from" : "hyperty://<wallet-manager-domain>/<wallet-manager-hyperty-identifier>",
"to" :  "hyperty://<sp-domain>/<hyperty-identifier>",
"body": {
  "code": 200,
  "value": "<wallet-address>"
}
```

#### Read Wallet

Message sent to the Wallet address, requesting to read the full wallet of a certain user, including all transactions.

```
"id" : 1,
"type" : "read",
"from" : "hyperty://<sp-domain>/<hyperty-identifier>",
"to" : "wallet://<wallet-manager-domain>/<wallet-identifier>"
```

**Response**

```
"id" : 1,
"type" : "response",
"from" : "wallet://<wallet-manager-domain>/<wallet-identifier>",
"to" :  "hyperty://<sp-domain>/<hyperty-identifier>",
"body": {
  "code": 200,
  "value": "{<Wallet>}"
}
```

#### Wallet Transfer

Message sent to the Wallet address, requesting to transfer a certain amount.

```
"id" : 1,
"type" : "create",
"from" : "hyperty://<sp-domain>/<hyperty-identifier>",
"to" : "hyperty://<sp-domain>/<wallet-identifier>",
"body": {
  "value": "{<Transaction>}"
}
```

**Response**

```
"id" : 1,
"type" : "response",
"from" : "wallet://<wallet-manager-domain>/<wallet-identifier>",
"to" :  "hyperty://<sp-domain>/<hyperty-identifier>",
"body": {
  "code": 200,
  "value": "{<Transaction>}"
}
```

#### Wallet update

Message sent by the Wallet Manager Hyperty, publishing an update of a certain wallet.

```
"id" : 1,
"type" : "update",
"from": "hyperty://<wallet-manager-domain>/<wallet-manager-hyperty>,
"to" : "hyperty://<sp-domain>/<wallet-identifier>/changes",
"body": {
  "value": "{<Transaction>}"
}
```

**Response**

```
"id" : 1,
"type" : "response",
"from" : "wallet://<wallet-manager-domain>/<wallet-identifier>",
"to" :  "hyperty://<sp-domain>/<hyperty-identifier>",
"body": {
  "code": 200,
  "value": "{<Transaction>}"
}
```
