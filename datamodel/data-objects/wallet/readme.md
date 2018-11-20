---
layout: documentation
title: Wallet Data Object
category: Data Object Models
order: 6
---

![Wallet Object Model](Wallet-Data-Object-Model.png)

The Wallet model is comprised by its balance in terms of amount of tokens and a set of transactions.

**Wallet**

* `address` wallet address e.g. `wallet://sharing-cities/etuyetrhgfjhf`
* `owner` the wallet owner GUID URL (user public key)
* `created` timestamp creation
* `balance` amount of tokens
* `transactions` all transactions performed with this wallet. See below
* `accounts` all accounts associated with this wallet. See below
* `status` active or deleted
* `profile` a JSON object with any attributes describing the wallet or the wallet owner e.g. age range, workplace, etc
* `bonus-credit` amount of tokens available to spend on bonus.

**Transaction**

* `recipient` wallet address of the recipient
*  `data` data that was used to generate this transaction e.g. walking distance
*  `source` data stream address that was used to generate this transaction
*  `date` transaction date.
* `value` amount of tokens in the transaction. If `-1` it is an unsuccessful transaction
*  `nonce` the count of the number of performed mining transactions, starting with 0
* `description` optional text to describe or identify the transaction. For unsuccessful transactions it may be used to describe the reason.
*  `bonus` true if transaction is related to a bonus item false otherwise.

**Account**

An Account represents a source from where tokens are transferred e.g. "Walk Activity" account provide data about how the Wallet owner has earned tokens with Walk Activities.

* `name` name of the account e.g. "Caminhada".
* `totalBalance` the total ammount of tokens of this account
* `totalData` the total ammount of data that was used to generated the total ammount of tokens. Example, "20" of Walk Activity Total data accounts 20 km of walking distance for wallet owner.
* `lastBalance` the ammount of tokens earned in the last period of time.
* `lastData` the ammount of data accounted in the last period of time.
* `dataUnit` the measurement unit used for data. Example, "km" for Walking Activities.
* `lastPeriod` the period of time used to calculate `lastBalance` and `lastData`
* `description` optional text to describe the Account.