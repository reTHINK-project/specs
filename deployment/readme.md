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


* [apache2](https://httpd.apache.org/)
* or [nginx](https://www.nginx.com/) instead of apache2
* reverse proxy compatible with apache or nginx
* [docker-compose](https://docs.docker.com/compose/install/)

If you choose a default apache2 server, for each sub-domain you need to use a config file, where you config the reverse proxy, you can check [here](https://github.com/reTHINK-project/specs/tree/master/deployment/registry-ssl.conf) a config for registry component. 

https free trusted certificates can be obtained on [let's encrypt](https://letsencrypt.org/).  


<img src="https://cloud.githubusercontent.com/assets/10738516/19760714/2f4bfb90-9c33-11e6-9463-a827f5d4ffab.png" width="700">



## Installation process
We will first install a CSP, then the application from scratch. To illustrate our text, we will consider that the DNS of the platform is ___csp.rethink.com___


### Communication Service Provider

As mentionned above, the communication service providers consists in __3__ components. We will install first the domain registry, then the messaging node, and finally the catalogue. 



On next steps, we will build a docker-compose file, for each component we will build a service.

#### Domain Registry 
Domain registry is installable with a [docker image](https://hub.docker.com/r/rethink/registry-domain-server/). As the Domain Registry is necessary to run the messaging node, it has to be running first. The default port of the domain registry is 4567.
The default DNS for our domain registry will be: __registry.csp.rethink.com__.  

```
service for docker-compose file

'domain-registry':
    image: 'rethink/registry-domain-server:latest'
    container_name: 'domain-registry'
    networks:
      rethink:
        ipv4_address: 172.18.0.4
    environment:
      - STORAGE_TYPE=RAM
      - EXPIRES=3600
    expose:
      - '4568'
      - '4567'
```


__To test if installation is OK: https://registry.csp.rethink.com/live gives a view of the current status of the registry.__  
___WARNING___

* The urls of the domain users  are encoded to be able to be sent to the domain registry. For apache reverse proxy users the directives _AllowEncodedSlashes On_ AND _ProxyPass_ with _nocanon_.




#### Messaging node
This is the core plateform. ReTHINK has provided four implementations but only one is necessary to be installed:
* [VertX](https://github.com/reTHINK-project/dev-msg-node-vertx) 
* [Matrix](https://github.com/reTHINK-project/dev-msg-node-matrix)
* [NodeJS](https://github.com/reTHINK-project/dev-msg-node-nodejs)
* [no Matrix](https://github.com/reTHINK-project/dev-msg-node-nomatrix)  

___WARNING___
*  _vertx installation_: the node.config.json contains a parameter that will be used during the docker run through an environment variable. The domain parameter must contain the DNS of the full platform (here csp.rethink.com), and it will be used then to build the DNS of the componants (msg-node.csp.rethink.com, registry.csp.rethink.com, etc...). The registry url must be filled here, but it is not sure if it can be tuned. To install you can use [docker image](https://hub.docker.com/r/rethink/msg-node-vertx/) 
*  _nodejs installation_: the docker-compose must be configured. If you use the script "start.sh", it will also build the domain registry. The url to provide in the "environment" section is the _domain_ of the plateform (here csp.rethink.com).
*  _no Matrix installation_: after building the docker image, the simplest is to use the dockerStart.sh script. Be carefull to enter the good folder for the volume mapping, suppress the parameters _--net=rethink -p 8001:8001_ when used with a proxy. Note also that the default is exposed on HTTP on 8001. The MatrixProtoStub example is showing an URL of WebSocket with wss on 443, which is what the reverse proxy will provide.

```
service for docker-compose file

'msg-node-vertx':
    image: 'rethink/msg-node-vertx:master'
    container_name: 'msg-node-vertx'
    environment:
      - MSG_NODE_CONFIG=env
      - NODE_DOMAIN=csp.rethink.com
      - NODE_PORT=9090
      - NODE_REGISTRY_URL=http://172.18.0.4:4567
      - NODE_GLOBAL_REGISTRY_URL=http://130.149.22.133:5002
      - NODE_REGISTRY_RETRIES=2
      - NODE_REGISTRY_SSL=false
      - NODE_REGISTRY_OWN_CERTIFICATES=false
    networks:
      rethink:
        ipv4_address: 172.18.0.2
    expose:
      - '443'
```



__To test if installation is OK: https://msg-node.csp.rethink.com/live gives a view of the current status of the nodejs node.__  

#### Catalogue
The catalogue is made out of two main components. A broker, that is needed to access the different services, and one or more databases. You can use this [database](https://github.com/reTHINK-project/testbeds/tree/master/nodes/PT-node/production), that should be possible to use on a production mode. Documentation can be accessed [here](https://github.com/reTHINK-project/dev-catalogue/tree/master/doc).  
First of all, the broker has to be installed. A dockerhub [image](https://hub.docker.com/r/rethink/catalogue-broker/) is available. 

```
broker component for docker-compose file

'catalogue-broker':
    image: rethink/catalogue-broker
    container_name: 'catalogue-broker'
    networks:
      rethink:
        ipv4_address: 172.18.0.8
    hostname: 'catalogue.csp.rethink.com'
    command: [-host, 'catalogue.csp.rethink.com', -default, protocolstub/VertxProtoStub, -default, protocolstub/VertxProtoStubNode]

    expose:
      - '443'
      - '5683'
```

```
catalogue database component using local database

'catalogue-database-ptinovacao':
    build: "./catalogue-database"
    container_name: 'catalogue-database-ptinovacao'
    network_mode: "service:catalogue-broker"
    command: [-host, catalogue.csp.rethink.com]
    depends_on:
      - 'catalogue-broker'
```



___WARNING___  
* The google idpproxy provided is working with an account that authorizes authentication process on a test platform, which probably does not include the one under installation. This means that by default, it is not possible to use google. To be able to do this, you have to:
* edit the sourceCode.js of the google idpproxy
   * change the account and secret of the google account
   * authorize on this account the use of google auth API (https://console.developers.google.com/apis/), with the authorized redirect URI https://csp.rethink.com.  

__To test if installation is OK: https://catalogue.csp.rethink.com/ gives a view of the current status of the catalogue node. It also allow to see connected databases and componants__  



Full docker-compose file, should be something like [this](https://github.com/reTHINK-project/specs/tree/master/deployment/docker-compose.yml)

```
On directory of docker-compose.yml file you should have catalogue-database folder with all objects, after this run command

docker-compose up -d

```



### Application Deployment

#### Hello World
The Hello World is published in the repository [dev-hello](https://github.com/reTHINK-project/dev-app), and its installation manual is provided there. It can be deploied simply behind an HTTP server.  

#### Complete Setup
After all these steps, application should be running. Last verifications:  
___WARNING___  
* The Browser Runtime has to be uploaded from .well-known/runtime/ must contain the last version of the runtime. It have to be filled with [these files](https://github.com/reTHINK-project/dev-runtime-browser/tree/master/bin)  (rethink.js, index.html, core.js, context-service.js, identities-gui.js, policies-gui.js)
* The Core Runtime has to be deployed in the catalogue. The core runtime is the Runtime.js file [here](https://github.com/reTHINK-project/dev-runtime-core/tree/master/dist). Its hould be accessible on CSP catalogue: https://catalogue.csp.rethink.com/.well-known/runtime/Runtime .


When all of this is done you can try to connect on the index.html of the hello-app. First step, you should be able to load the runtime, then to load an hyperty, then to contact hyperties.

Here is a view of the technical flows involved:
<img src="https://cloud.githubusercontent.com/assets/10738516/19762069/b2b01b38-9c38-11e6-99c9-03f79e353b4e.png" width="700"/>
