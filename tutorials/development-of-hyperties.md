---
layout: documentation
title: How to develop new Hyperties
category: Getting Started
order: 3
---

<h1></h1>

Here you may find the basic steps any developer needs to undertake to develop Hyperties. The source code of the Hello World Hyperty used as example, can be found [here](https://github.com/reTHINK-project/dev-hyperty/tree/master/src/hello-world):

1- Clone the [Hyperty Toolkit Repo](https://github.com/reTHINK-project/dev-hyperty-toolkit/blob/master/README.md), the [Hyperty Repo](https://github.com/reTHINK-project/dev-hyperty) and follow the Hyperty Toolkit Installation Guideline.

2- Create a new folder for your Hyperty at `src` folder and work there.

3- Select or specify the descriptor of the Hyperty Data Objects handled by your Hyperty. These descriptors are defined in JSON-Schema with suffix ".ds.json" e.g. HelloWorldDataSchema.ds.json. Let's assume we define a simple Hello Hyperty object:

<pre class="line-numbers">
  <code class="language-javascript">
		{
			"$schema": "http://json-schema.org/draft-04/schema#",
			"id": "HelloObject",
			"type": "object",
			"required": ["scheme","hello"],
			"additionalProperties": false,
		  "properties": {
				"scheme": {
					"constant": "hello"
				},
				"hello": {
					"type": "string"
				}
			}
		}
	</code>
</pre>

This is optional in case you are reusing existing data schemas. In that situation, you just have to set in your Hyperty Descriptor the Catalogue URL that points to the data schema (see below).

4- Then we can start developing the Hyperty Reporter of the previously defined Hello Hyperty Object. First the constructor where we are going to instantiate the Hyperty syncher. For that, we take as input parameter the Hyperty address (HypertyURL), the MiniBus used to receive and send data synchronization messages (bus), and any required configuration data.

<pre class="line-numbers">
  <code class="language-javascript">
		constructor(hypertyURL, bus, configuration) {

		  let syncher = new Syncher(hypertyURL, bus, configuration);
		}
	</code>
</pre>

5- Then we prepare the creation of the Hyperty Hello Data Object by defining the Catalogue URL from where the previously defined Hyperty Data Object schema can be retrieved and initial data to be used in the creation:


<pre class="line-numbers">
  <code class="language-javascript">
		_this._objectDescriptorURL = 'hyperty-catalogue://example.com/.well-known/dataschemas/HelloWorldDataSchema';

		let hello = {
		   hello : "Hello World!!"
		};
 </code>
</pre>

6- The object is created and another Hyperty is invited to be an observer.

<pre class="line-numbers">
  <code class="language-javascript">
    syncher.create(_this._objectDescriptorURL, [invitedHypertyURL], hello).then(function(dataObjectReporter) {

    console.info('Hello Data Object was created: ', dataObjectReporter);
	</code>
</pre>

7- From the Observer side, in order to observe the Hello Data Object, it has to subscribe it, by passing its URL and the Catalogue URL from where its schema can be retrieved. As soon as the subscription is accepted the most updated version of the Hello Data Object is received

<pre class="line-numbers">
  <code class="language-javascript">
		syncher.subscribe(_this._objectDescriptorURL, ObjectUrl).then(function(dataObjectObserver) {}

		  console.info( dataObjectObserver);

	</code>
</pre>


8- Any change performed by the Reporter in the the object.

<pre class="line-numbers">
  <code class="language-javascript">
  	dataObjectReporter.data.hello = "Bye!!";
	</code>
</pre>


9- ... will be immediately received by the Observer:

<pre class="line-numbers">
  <code class="language-javascript">
	  dataObjectObserver.onChange('*', function(event) {
	          // Hello World Object was changed
	          console.info(dataObjectObserver);
	        });
	</code>
</pre>

10- Define the Hyperty descritor. The most important attributes are:

- constraints to be fullfilled by the Runtime, in this case the only constraint is to be executed in a browser: `browser: true`

- hypertyType or the schemes of the data objet: `"hypertyType": ["hello"]`

- the catalogue URL of the data object schemas supported by the Hyperty, in this case: `"dataObjects": ["https://%domain%/.well-known/dataschema/HelloWorldDataSchema"]`

The complete descriptor is:

<pre class="line-numbers">
  <code class="language-javascript">
	{
	  "language": "javascript",
	  "signature": "",
	  "configuration": {},
	  "constraints": {
	    "browser": true
	  },
	  "hypertyType": [
	    "hello"
	  ],
	  "dataObjects": [
	    "https://%domain%/.well-known/dataschema/HelloWorldDataSchema"
	  ]
	}
	</code>
</pre>

11- develop an App to test your Hyperty by using the [template used in "dev-hyperty" repo](https://github.com/reTHINK-project/dev-hyperty/tree/master/examples/hello-world).

12- test and run your Hyperty,

start the toolkit in development mode:

<pre class="line-numbers">
  <code class="language-shell">
		npm run start:dev
	</code>
</pre>

Open `https://catalogue.localhost/` and accept certificate

Open `https://localhost/` and select your Hyperty to be tested

Any changes performed in your Hyperty source code will be automaticaly loaded by the toolkit to be tested ... :fireworks: :rocket:  Cool? :stuck_out_tongue_winking_eye:


## Next steps:

Have a look on [available APIs](../service-framework/readme/) to facilitate the development of powerful Hyperties like the ones available in the [Hyperty Catalogue](../../../dev-hyperty)

## Criteria to use Hyperties

These are guidelines to help developers decide if they should provide specific service logic as Hyperty or via a simple JavaScript library. Consider these as guidelines and not instructions. Before you embark on a new feature development, ask yourself the following questions:

-- Is the feature delivery directly associated with a "User" (e.g. Human beings, physical objects, physical spaces, organizations)?

-- Does the feature delivery involve communication between "Users"?

-- Can the feature be delivered in cross-domain scenarios (i.e interoperability with other domains)?

If at least you have one "YES" answers to the above questions then most likely, you should go for the Hyperty Concept. Some examples are:

-- Video Chat between human beings;

-- a Human-being or a Data Analysis service collecting data from sensors in a Room.
