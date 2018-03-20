---
layout: documentation
title: Wallet Data Object
category: Data Object Models
order: 6
---

![Wallet Object Model](wallet-model.png)

The Wallet model is comprised by its balance in terms of amount of tokens and a set of transactions.

**Wallet**

* `address` wallet address e.g.  
* `wallet://sharing-cities/etuyetrhgfjhf`
* `identity` wallet owner identity
* `created` timestamp creation
* `balance` amount of tokens
* `transactions` all transactions performed with this wallet. See below
* `status` active or deleted

**Transaction**

* `recipient` wallet address of the recipient
*  `source` data stream address that was used to generate this transaction
*  `date` transaction date.
* `value` amount of tokens in the transaction
*  `nonce` the count of the number of performed mining transactions, starting with 0
