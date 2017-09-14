## Hyperty Life-cycle

### Product Conception
The Product Manager specifies the purpose, functionalities and requirements to be fulfilled by the new Hyperty.

The product concept is described by reusing as much as possible existing requirements and product concepts e.g. directories, tags, etc

According to feedback received from technical designers the Product Manager may have to update the product concept description. (this workflow is not illustrate)

<!-- 1.	Product Manager accesses the SCE with his credentials that are associated to a certain Product Management role 
2.	Product Manager is able to discover the product Catalogue to check if the requested product is a new one and to receive recommendations about similar products to help him/her in the product conception
3.	The product is specified by using as much as possible tools that facilitate reuse of product concepts e.g. directories, tags, etc and it should define at least the following information and requirements types (more information is needed for business reasons but they are not relevant for the project purposes):
a.	Unique product name.
b.	Product description.
c.	Tangible Entities to be associated with.
d.	Data needed. 
e.	Processes needed. 

4.	Existing and new Tangible Entities needed are identified. 

5.	After successful validation, the Product Catalogue Manager registers the Product Concept into the Product Catalogue.
-->

**Input**

The following input is needed:
•	Product Catalogue
•	Tangible Entities Catalogue

**Output**

Business requirements are defined.

**Automation analysis**

Semi-automation may be possible with assisting tools providing advanced search features on existing concepts and requirements.

### Product Design

The Product Manager designs the Hyperty offer by specifying Business Policies to be applied to the Hyperty.

The product business policies are designed by reusing as much as possible existing business policies.  
The following types of policies should be considered:
*	Access Control
*	Performance (QoS, QoE) - Definition of SLAs per Hyperty (e.g. latency). Definition of Rules to be used to generate KPIs reports to measure SLAs fulfillment
*	Billing - revenue model that Provider wants to put in place, with or without partners (consolidate with Partnership Model). Definition of the value chain. Who will pay resources like sensors, or network side resources like media servers or big data services? Who will pay for the service: the end-user, some advertiser, the government?


**Input**

* Applicable Business Reference Data (e.g. product access constraints, performance, customer care, revenue sharing among partners, Draft Pricing / Charging Matrix and rules etc...)
* Business Policies Catalogue.

**Output**

Hyperty Business Policies to Support Hyperties delivery are defined and Product Catalogue is Updated

**Automation analysis**

Semi-automation may be possible with assisting tools providing advanced search features on existing business policies.

### Hyperty Design, Implementation and Test

Developer validates and specify in detail how the Hyperty will comply with the Business requirements. 

The implementation and tests are done by reusing as much as possible existing source code, including unit tests, that can be cloned or extended as a starting point. Hyperties 

As soon as all test cases are successful, the Hyperty is submitted to be approved by the Service Provider.


**Note**

During this activity it should be identified the need to use new Hyperty Message types or to extend existing Message Types with new data fields.
In case there is a business requirement to ensure cross domain interoperability, this would imply to perform a Hyperty Message Standardisation activity involving some Standardisation authority. In this initial version, such activity is not specified.

**Input**

The following input is needed:
•	Product Requirements defined by Product Analysts
•	Hyperty Catalogue

**Output**

•	Hyperty Metadata with description of the Hyperty 
•	Hyperty Artifacts including source code, test cases and testing reports, hyperty configuration requirements and data
•	Updated Hyperty Catalogue

**Automation analysis**

Semi-automation may be possible with assisting tools providing advanced search features on existing Hyperty catalogue. 
Full automation may also be possible depending on the Hyperty complexity by reusing reusable Hyperty components (to be validated in T3.4).

### Hyperty Provisioning

Service Provider validates submitted Hyperty by performing end-to-end tests including Non-functional tests according to associated business policies notably Security policies and SLAs to be signed between Service Providers and the Consumer.
Therefore, the Service Provider has to assure that he can provide a specified level of robustness and QoS under different behaviour conditions. 

As soon as the Hyperty is succesfuly tested by the Service Provider, it will be certified as ready to be provisioned by creating the different deployable packages targeting different runtime environments as defined in the Business Requirments.

The Service binding is defined in terms of protocols, APIs, addresses, etc. notably for its components. The service is packaged and the runtime environment type is chosen according to Non-functional/business policies requirements (e.g. load, performance, etc.) and availability of dependencies on Service Capabilities and Service Support.

Support Services and Systems required by the Hyperty operation will be provisioned and configured according to technical dependencies (e.g. data storage) and business constraints (e.g. network and computing load forecast, charging and identity management policies).

Finaly, Hyperty is published in the Hyperty Catalogue as ready to be consumed.

**Input**

* Design Metadata
* Developed artifacts (e.g. source, binary files)
* Business Policies

**Output**

* end-to-end reports
* Hyperty Certification
* Deployable Packages
* Resources configured
* Operation Metadata
* Product and Hyperty catalogue updated

**Automation analysis**

Hyperty provisioning should be as much as possible automated. However, it is recommended to have the Hyperty certification activity approved and signed by an authorised Human.

### Access

As soon as the Hyperty is published in the Hyperty Catalogue it is discoverable to be consumed by end-users applications.

**Note:** According to Hyperty concept (see ?), Hyperties are services and not applications. I.e. Hyperties are not directly consumed by End-user Consumers but by Applications (i.e. other software programs). The life-cycle of Applications that consume Hyperties are out-scope of this task. However, the need to consider in the Hyperty life-cycle activities to support the registration of Applications consuming Hyperties should be further studied.

Selected Hyperty will be securely associated to Tangible Entity (in some cases this might not be needed eg for network side hyperties. To be further studied) which may imply to authenticate the consumer with the same Service Provider or witj another separated Identity Service Provider. *question: scould this operation be suported by another Hyperty.*

Access to Hyperties should be subject to authorisation according to associated access control policies defined by the service provider.

Authorization evaluates conditions expressed in the policy that may include:

* Evaluate if Tangible Entity identity associated to Hyperty belongs to a Role Consumer (or Consumer Group) that have permissions to use the Hyperty capabilities. If false, subscription or authentication action may be requested
* Evaluate if contracted QoS can be reached. If evaluation is false some resources may be allocated
* Evaluate that consumer have charging credit. If false some amount can be allocated.

If access is granted, Hyperty is deployed into user device runtime, instantiated and registered with the service provider. The Hyperty instance registration will include Hyperty instance contextual data that will depend on its type and the runtime resource capabilities e.g. network constraints (including networking addresses needed to make the Hyperty instance reachable), availability, etc

**input**

* Hyperty Operation Metadata
* Hyperty address
* Hyperty Access Control Policies

**output**

* Hyperty registry updated with Hyperty instance registration data

### Hyperty Instance Usage

Hyperty instance is used by the user, according to associated policies that are enforced localy or remotely according to associated usage events triggered by the Hyperty instance execution.

Hyperty instance may move to another device on user request or automaticaly on certain conditions (e.g. smartphone battery load is low) according to operational policies. Hyperty instance move and resume will imply a change in the Hyperty Instance status.

Hyperty instance may be removed on user request or automaticaly on certain conditions (e.g. keep-alive events are not received by the registry due to network connectivity problems) according to operational policies. In this case the Hyperty instance is unregister from the Hyperty registry. *question: what about situations where Hyperties instance may run without connectivity?*

**input**

* Hyperty Operation Metadata
* Hyperty instance address
* Hyperty Runtime Policies

**output**

* Hyperty registry updated with Hyperty Instance Events including unregistering

**question:** should include additional activities for:

1. Hyperty Instance discovery 
1. Communication between Hyperty Instances?


### Hyperty Instance Charging

The Hyperty instance usage may be charged by the Service Provider according to usages events received and business charging policies which is applied to usage context identified in the event. The charging policies may enforce actions like:
•	Perform charging requests at the Billing system 
•	Releases previously allocated credit amounts
•	Increase usage credits/points

**Input**
The following input is needed:
•	Operation Metadata
•	Business Charging Policies

**Output**
Charging actions.

### Hyperty Instance Monitoring

The Hyperty Instance is monitored by the Service Provider according to received Service Usage event or to Hyperty health reports that are requested according to conditions defined in the Operation Metadata.

Such data will be processed to calculate the KPIs required to support SLA management of the Hyperty.  
If the Hyperty SLA is violated, it may be necessary to trigger some adaptation actions to correct the deviations (e.g., reserve more resources for the Hyperty, etc). 

Calculated KPIs will be evaluated by Product Managers which may decide to update the Hyperty or to remove from the Catalogue.

### Hyperty Update

Product Managers may decide to update the Hyperty which will imply to restart the life-cycle by starting to review the Product Business requirements (Product Conception).

### Hyperty Removal

Product Managers may decide to remove the Hyperty from the catalogue which will imply to perform some reconfiguration activities on Support Services and Systems that are no longer required (e.g. free data storage,  reease network and computing allocated resources etc).



<!--
@startuml "hyperty-life-cycle.png"

|Service Provider|
start
:Catalog]

partition ProductConception {
    :conceive product;
    :business requirements]
}

    fork
partition ProductDesign {
	    :design product;
	    :business policies]
	    :Catalog]
}
	fork again

|#AntiqueWhite|Developer|

partition HypertyImplementation {
	:analyse requirements;
    :design, implement\nand test Hyperty;
    :define Hyperty configuration;
    :submit Hyperty;
    :Hyperty artifacts]
    :Hyperty Metadata]
}

|Service Provider|
    end fork
partition HypertyProvisioning {
	:end-to-end testing;
	:certify;
	:Hyperty Metadata]
	:resources configuration;
	:publish Hyperty;
	}

|#LightRed|Consumer|

partition Access {
	:Catalog]
	:discover;
	:associate to\nTangible Entity;

	:access request;

	|Service Provider|
	:Product Policies]
	:authorise access;
	|Consumer|
	:deploy Hyperty;
	:register\nHyperty Instance;
	}

	repeat

		partition Usage {
			:Runtime Policies]
			:use;
			:event]
		}
		if () is (usage event) then


		|Service Provider|

			if () then 
				partition Monitoring {
				:Policies]
				:monitor;
				:KPIs]
				:evaluate KPIs;
				}

				if () then (update Hyperty)
				partition Update {
					:Policies]
					:update Hyperty;
					detach;
				}
				else (remove Hyperty)

				partition Removal {
					:Policies]
					:remove Hyperty;
				}

				stop

				endif
			else
				partition Charging {
				:charge;
				}
				detach

			endif

		else

	partition Usage {

	|Consumer|

		if (context event?) then (yes)
			:update context;
		elseif (time to\nmove event?) then (yes)
			:move Hyperty;
			elseif (unregister event?) then (yes)
				:unregister;
				stop
	
		endif
		}


		endif

	repeat while (user is authorised)



@enduml
-->

![Hyperty Life-cycle](hyperty-life-cycle.png)
