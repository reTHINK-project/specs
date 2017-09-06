---
layout: documentation
title: Data Object Delete
category: How it Works - Data Synchronization
order: 5
---


![Figure @data-object-delete Request to delete a Sync Data Object](data-object-delete.png)

The Data Object reporter post a [Delete Message](../../messages/data-sync-messages.md#delete-data-object-requested-by-reporter) to stop the Data Object synchronisation.

The Core Police Engine applies policies to check whether Alice has permissions to delete the data object. If yes, the Sync Manager removes its subscription listener from the Msg BUS.

In case the data object deletion is authorised, the Sync Manager removes its subscription listener from the Msg BUS and [sends a Delete message to all object Observers](../../messages/data-sync-messages.md#all-observers-are-requested-to-delete-data-object).

Optionally, Observers may confirm with a [Response Message](../../messages/data-sync-messages.md#response-to-object-delete) to acknowledge the reception of the delete.

Each Observer asks its Sync Manager to remove its listeners from the Bus through a [Unsubscribe message](../../messages/data-sync-messages.md#data-object-unsubscription-request-by-observer-hyperty) (similar to the [Unsubscription procedure](data-object-unsubscription.md) ) and also asks the [Message Node to Unsubscribe](../../messages/data-sync-messages.md#request-to-remove-data-sync-routing-path-at-observer-message-node) from the deleted ObjectURL address.

The Sync Manager removes all authorised observerListeners that were added in the Msg BUS to receive the Data object updates (<ObjectURL>/changes resource).

The data object is unregistered from the Registry with a [Delete Message](../../messages/registration-messages.md#unregistration-request).

Steps : the Sync Manager removes all listeners that were added in the Msg BUS to be notified when new observers are added or removed (<ObjectURL>/observers resource).
