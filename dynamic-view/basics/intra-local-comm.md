---
layout: documentation
title: Intra-runtime Msg Delivery
category: How it Works - Basics
order: 8
---

Communication between two Hyperties running in the same Runtime instance can be performed locally by using some non-standard function or through the Runtime BUS using postMessage standard function.

<!--
@startuml "intradomain-local-communication.png"

autonumber

!define SHOW_RuntimeA

!define SHOW_SP1SandboxAtRuntimeA
!define SHOW_ServiceProvider1HypertyAtRuntimeA
!define SHOW_ServiceProvider1Hyperty2AtRuntimeA

!define SHOW_CoreRuntimeA
!define SHOW_MsgBUSAtRuntimeA


!include ../runtime_objects.plantuml

alt

SP1H@A -> SP1H2@A :  message

else

SP1H@A -> BUS@A : postMessage( message )
BUS@A -> SP1H2@A : postMessage( message )

end

@enduml
-->


![Figure @runtime-intra-local-comm: Intra-domain Local Communication](intradomain-local-communication.png)
