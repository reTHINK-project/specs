# Quick installation guide of the reThink Platform.
# Table of Contents
1. [Components to install](#components-to-install)
 1. [Server-side components](#server-side-components)
 2. [Client-side components](#client-side-components)
2. [Installation process](#installation-process)
 1. [Communication Service Provider](#communication-service-provider)
   1. [Domain Registry](#domain-registry)
    2. [Messaging node](#messaging-node)
    3. [Catalogue](#catalogue)
 2. [Application Deployment](#application-deployment)
   1. [Hello World](#hello-world)
    2. [Complete setup](#complete-setup)
 

This page explains how to install a complete platform to be able to deploy services and applications based on the reThink framework.
After following this tutorial, you will be able to run the Hello World application available [here](https://github.com/reTHINK-project/dev-app).  
The installation guides can be found in the different folders. We don't provide here the full installation processes, but a view "as a whole", summaries and tips.   
__Please note that this section is dedicated to an operational platform__. Developpers should use the [toolkit](https://github.com/reTHINK-project/dev-hyperty-toolkit).   
If you already know how is the platform, go directly to [Installation Process](#installation-process).

## Components to install
A complete reThink platform consists on server-side components that are finally deployed in the browser. These components are shown in the following picture and described hereafter.  

All components are available in Docker images and the preferred host is an Ubuntu 14.04.  
It is recommended that the containers are deployed behind a reverse proxy for several reasons:
 * default DNS is used to access different components of the platform, adding a prefix. The reverse proxy can easily manage different virtual hosts thus simplifying access to these components.
 * All components are using different ports, using a reverse proxy is useful to allow using classical ports
 * It is recommanded that the certificates are managed on the front reverse proxy.
 
To find proxies you can refer to these projects:
 * [nude apache2](https://github.com/reTHINK-project/testbeds/tree/master/docker/apache2-reverse-proxy-baseline)
 * [Managed apache2 with GUI](https://github.com/zorglub42/OSA/) 
 * nginx is also an option.
 
https free trusted certificates can be obtained on [let's encrypt](https://letsencrypt.org/).  


<img src="https://cloud.githubusercontent.com/assets/10738516/19760714/2f4bfb90-9c33-11e6-9463-a827f5d4ffab.png" width="700">


### Server-side components

* Identity provider (optional): the identity provider is used for user authentication. It is currently possible to use Google account, Microsoft account, and a reThink account provided.

* Communication service provider (CSP). This is the masterpiece of the reThink platform. A CSP typically contains 3 building blocks: a Messaging Node, managing signaling part, a Registry (called domain registry) and a Catalogue. Whether these nodes can be independent or not is not the purpose of this guide. We consider them as a whole for a service provider.  
The catalogue actually consist of two parts: the catalogue-brocker and several catalogue databases (see [dev-catalogue](https://github.com/reTHINK-project/dev-catalogue) for more details).

* Web application server: A minimum demo is provided by the CSP, and relies on the 3 previous nodes. The Web application server will provide the application. This application will:
 * be deployed in the brower
 * download the runtime into the browser
 * download hyperties code from the catalogue to the runtime

* Global Registry (optional): the Global Registry (GREG) is a plateform independant from the service provider and thus will be accessed from the runtime independently. Some of them are already deployed. It is not necessary to deploy one on the first steps.

* QoS broker and TURN Servers (Optional): QoS broker allow to choose the TURN server used for quality of service purpose. As the QoS is managed on the CPE, an extra configuration is necessary and is not mandatory at this step.

* Discovery Service (FFS): under development.

### Client-side components
* The client-side components are the runtime and the application. This runtime is downloaded in the browser when the user connects to an application based on reThink. Thus, nothing has to be manually installed.

## Installation process
We will first install a CSP, then the application from scratch. To illustrate our text, we will consider that the DNS of the platform is ___csp.rethink.com___


###Communication Service Provider

As mentionned above, the communication service providers consists in __3__ componants. We will install first the domain registry, then the messaging node, and finally the catalogue. 

####Domain Registry 
Domain registry is installable from [here](https://github.com/reTHINK-project/dev-registry-domain/server). As the Domain Registry is necessary to run the messaging node, it has to be installed first. The default port of the domain registry is 4567.
The default DNS for our domain registry will be: __registry.csp.rethink.com__.  
__To test if installation is OK: https://registry.csp.rethink.com/live gives a view of the current status of the registry.__  
___WARNING___
* The urls of the domain users  are encoded to be able to be sent to the domain registry. For apache reverse proxy users the directives _AllowEncodedSlashes On_ AND _ProxyPass_ with _nocanon_.


####Messaging node
This is the core plateform. ReTHINK has provided four implementations but only one is necessary to be installed:
* [VertX](https://github.com/reTHINK-project/dev-msg-node-vertx) 
* [Matrix](https://github.com/reTHINK-project/dev-msg-node-matrix)
* [NodeJS](https://github.com/reTHINK-project/dev-msg-node-nodejs)
* [no Matrix](https://github.com/reTHINK-project/dev-msg-node-nomatrix)  

___WARNING___
 *  _vertx installation_: the node.config.json contains a parameter that will be used during the docker run through an environment variable. The domain parameter must contain the DNS of the full platform (here csp.rethink.com), and it will be used then to build the DNS of the componants (msg-node.csp.rethink.com, registry.csp.rethink.com, etc...). The registry url must be filled here, but it is not sure if it can be tuned.
 * _nodejs installation_: the docker-compose must be configured. If you use the script "start.sh", it will also build the domain registry. The url to provide in the "environment" section is the _domain_ of the plateform (here csp.rethink.com).
 * _no Matrix installation_: after building the docker image, the simplest is to use the dockerStart.sh script. Be carefull to enter the good folder for the volume mapping, suppress the parameters _--net=rethink -p 8001:8001_ when used with a proxy. Note also that the default is exposed on HTTP on 8001. The MatrixProtoStub example is showing an URL of WebSocket with wss on 443, which is what the reverse proxy will provide.

__To test if installation is OK: https://msg-node.csp.rethink.com/live gives a view of the current status of the nodejs node.__  

####Catalogue
The catalogue is made out of two main components. A broker, that is needed to access the different services, and one or more databases. Documentation can be accessed [here](https://github.com/reTHINK-project/dev-catalogue/tree/master/doc).  
First of all, the broker has to be installed. A dockerhub component is available.   

___WARNING___  
 * the broker and the databases are communicating 2 ways, using COAP. What does that mean? It means that if you want to deploy them on a testbed behind a firewall or a proxy, you have to take into account COAP. Otherwise you cannont proxy them. This means that the broker MUST be launched with _--net=host_ and that they don't use an already binded port. Here is an example of broker launch command (with -d for background, and the exposed ports):  
```
docker run -it --net=host -d --name="catalogue-broker"  rethink/catalogue-broker -host xxx.xxx.xxx.xxx -h 9011 -hs 9012 -default protocolstub/VertxProtoStub  
```
 * the catalogue broker has an important parameter to take into account: __default__ . To be able to run an application with a specific messaging node, the default protostub MUST be the one of the installed messaging node. Thus, if you want to use the nodejs messaging node, _-default protocolstub/NodejsProtoStub_ should be included in the "run" commande. For the vertx, _protocolstub/VertxProtoStub_ etc. This is important, because, _once the broker is launched, this cannot be changed_. The only way is to remove the broker instance, and to relaunch it.  
 I recommand to write such a script (for example in /usr/local/bin) to change easily if you try more than one message node:
```
#!/bin/bash
docker stop catalogue-broker
docker rm catalogue-broker
docker run -it --net=host  -d --name="catalogue-broker"  rethink/catalogue-broker -host xxx.xxx.xxx.xxx -h 9011 -hs 9012 -default protocolstub/$1
```
where $1 can be MatrixProtoStub, NodejsProtoStub or VertxProtoStub.  

An example of catalogue database is provided [here](https://github.com/reTHINK-project/dev-catalogue/tree/master/docker/catalogue-database-reTHINKdefault). It is recommanded to use it for this example (-h is the IP of the catalogue broker. -ch is the IP of the catalogue database):
```
docker run -it -d --name catalogue-db rethink/catalogue-database-reTHINKdefault -h xxx.xxx.xxx.xxx -ch xxx.xxx.xxx.xxx  
```

___WARNING___  
 * The google idpproxy provided is working with an account that authorizes authentication process on a test platform, which probably does not include the one under installation. This means that by default, it is not possible to use google. To be able to do this, you have to:
  * edit the sourceCode.js of the google idpproxy
  * change the account and secret of the google account
  * authorize on this account the use of google auth API (https://console.developers.google.com/apis/), with the authorized redirect URI https://csp.rethink.com.  
  
__To test if installation is OK: https://catalogue.csp.rethink.com/ gives a view of the current status of the catalogue node. It also allow to see connected databases and componants__  
  

###Application Deployment

####Hello World
The Hello World is published in the repository [dev-hello](https://github.com/reTHINK-project/dev-app), and its installation manual is provided there. It can be deploied simply behind an HTTP server.  

####Complete Setup
After all these steps, application should be running. Last verifications:  
___WARNING___  
 * The Browser Runtime has to be uploaded from .well-known/runtime/ must contain the last version of the runtime. It have to be filled with [these files](https://github.com/reTHINK-project/dev-runtime-browser/tree/master/bin)  (rethink.js, index.html, core.js, context-service.js, identities-gui.js, policies-gui.js)
 * The Core Runtime has to be deployed in the catalogue. The core runtime is the Runtime.js file [here](https://github.com/reTHINK-project/dev-runtime-core/tree/master/dist). Its hould be accessible on CSP catalogue: https://catalogue.csp.rethink.com/.well-known/runtime/Runtime .
 
 
When all of this is done you can try to connect on the index.html of the hello-app. First step, you should be able to load the runtime, then to load an hyperty, then to contact hyperties.

Here is a view of the technical flows involved:
<img src="https://cloud.githubusercontent.com/assets/10738516/19762069/b2b01b38-9c38-11e6-99c9-03f79e353b4e.png" width="700"/>
