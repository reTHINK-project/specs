# Quick installation guide of the reThink Platform.

This page explains how to install a complete platform to be able to deploy services and applications based on the reThink framework.
After following this tutorial, you will be able to run the Hello World application available [here](https://github.com/reTHINK-project/testbeds/tree/dev/dev-hello).

## Components to install
A complete reThink platform consists on server side componants that are finally deployed in the browser. These componants are showed in the following picture and described hereafter.  
__Please note that this section is dedicated to an operational plateform__. Developpers should use the [toolkit](https://github.com/reTHINK-project/dev-hyperty-toolkit).
All componants are available in Docker images and the prefered host is an ubuntu 14.04.  
It is recommended that the containers are deployed behind a reverse proxy for several reasons:
 * default DNS is used to access different componants of the platform, adding a prefix. The reverse proxy can easily manage different virtual host thus simplifying access to these componants.
 * All componants are using different ports, using a proxy is usefull to allow using classical ports
 * It is recommanded that the certificates are managed on the front reverse proxy.
 
To find proxies you can refer to these folders
 * [nude apache2](https://github.com/reTHINK-project/testbeds/tree/master/docker/apache2-reverse-proxy-baseline)
 * [Managed apache2 with GUI](https://github.com/zorglub42/OSA/)) 
 * nginx is alos an option.
 
https free trusted certificates can be obtained on [let's encrypt](https://letsencrypt.org/).  


<img src="https://github.com/reTHINK-project/testbeds/blob/master/docs/Testbed-Design/figures/pfTechView.png" width="350">


### Server side components

* Identity provider (optional): the identity provider is used for user authentication. It is currently possible to use Google account, Microsoft account, and a reThink account provided.

* Communication service provider (CSP). This is the masterpiece of the reThink plateform. A CSP contains normally 3 building blocks, a Messaging Node, managing signaling part, a registry (called domain registry) and a catalogue. Whether these nodes can be independent or not is not the purpose of this guide. We consider them as a whole for a service provider.  
The catalogue actually consist of two parts: the catalogue-brocker and several catalogue databases (see [dev-catalogue](https://github.com/reTHINK-project/dev-catalogue) for more details).

* Web application server: A minimum demo is provided by the CSP, and relies on the 3 previous nodes. The Web application server will provide the application. This application will:
 * be deployed in the brower
 * download the runtime into the browser
 * download hyperties code from the catalogue to the runtime

* Global Registry (optional): the Global Registry (GREG) is a plateform independant from the service provider and thus will be accessed from the runtime independently. Some of them are already deployed. It is not necessary to deploy one on the first steps.

* QoS broker and TURN Servers (Optional): QoS broker allow to choose the TURN server used for quality of service purpose. As the QoS is managed on the CPE, an extra configuration is necessary and is not mandatory at this step.

* Discovery Service (FFS): under development.

### Client side components
* The client side components are included in the runtime. This runtime is downloaded in the browser when the user connects to an application based on the runtime server. Thus, nothing has to be manually installed.

##Let's rock
###Identity Provider

ReThink provides two identity providers available: a [Node.js](https://github.com/reTHINK-project/dev-IdPServer) and a [php](https://github.com/reTHINK-project/dev-IdPServer-phpOIDC) one. First one is recommanded (and dockerized).
These two IdPs are providing OIDC (installation guide is provided in README) and we have implemented IdP Proxy as specified in [ietf WebRTC Security draft](https://tools.ietf.org/html/draft-ietf-rtcweb-security-arch-11).  
After installing one of these two IdPs, at least two users, Alice and Bob have to be created in the database.

###Communication Service Provider

As mentionned above, the communication service providers consists in three services.

####Domain Registry 
Domain registry is installable from [here](https://github.com/reTHINK-project/dev-registry-domain/server). As the Domain Registry is necessary to run the messaging node, it has to be installed first. The default port of the domain registry is 4567.

####Messaging node
This is the first platform to install (core plateform). ReTHINK has provided three implementations: [VertX](https://github.com/reTHINK-project/dev-msg-node-vertx), [Matrix](https://github.com/reTHINK-project/dev-msg-node-matrix) and [NodeJS](https://github.com/reTHINK-project/dev-msg-node-nodejs).  
Only one is necessary to be installed (currently [VertX](https://github.com/reTHINK-project/dev-msg-node-vertx) is prefered).  

####Catalogue
The catalogue is made out of two main components. A broker, that is needed to access the different services, and one or more database. Documentation can be accessed [here](https://github.com/reTHINK-project/dev-catalogue/tree/master/doc).  
__To be able to run an example, the catalogue database must provide:__ <b>  
 * A reThink runtime  
 * One protostub that allow the usage of the installed messaging node  
 * The Hyperty code and datashema that will be used by the example.</b>    
A specific database is proposed to run the HelloWorld example.

####Configuration and tests of the CSP
Configuration of the Messaging node:  
Domain Registry have to be accessed by the messaging node.  
Catalogue is only refered by its URL.


###Support Services

####Global Registry (Optional)
The [Global Registry](https://github.com/reTHINK-project/dev-registry-global) is an optional module allowing access to the GUID of users in order to find the services where they are registered.
Global Registry is exposing two ports: one for the REST insterface, and one for the P2P connections (this second one should be let to 5002).  
<img src="https://github.com/reTHINK-project/testbeds/blob/master/docs/Testbed-Design/figures/gregdeployment.png" width="400">

####QoS Broker (Optional)
The Qod broker is usable by the service provider. The plateform and Installation Guide is available here  [Qos](https://github.com/reTHINK-project/dev-qos-support/broker)  
QoS Broker necessitates to be installed with TURN servers and some configuration. To be used, a CSP has to be referenced in the administration interface of the Broker.

####TURN Server (Optional)

###Application Deployment

####Hello World
The Hello World is published in the repository [dev-hello](https://github.com/reTHINK-project/testbeds/tree/dev/dev-hello), and its installation manual is provided there.
The HelloWorld application is distinguished from the Hyperty HelloWorld which provides the real service.

To be able to run the new application, using Google ID or any OIDC serveur, you must register this application as a "client" of the IdP.

Two google accounts are provided for test purpose:
openidtest10@gmail.com / testOpenID10  
openidtest20@gmail.com / testOpenID20  
To use these accounts for authentication, one has to configure in the Google could platform the callback url of the service deployed (accessible throught Internet). URL must begin with ___msg-node.___  (e.g. msg-node.powercommunication.rethink.orange-labs.fr).   

