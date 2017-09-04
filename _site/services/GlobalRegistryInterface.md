The Global Registry is adressed via a REST-style interface allowing GET and PUT operations.

### GET /

Will return a message object with version and info about the daemon

    Request:
    GET / HTTP/1.1
    
    Response:
    {"Value":"gReg v0.1.1a 1235 (2016-01-20) [ 130.149.22.135 130.149.22.134 ]","Code":200,"Message":"OK"}

### GET /guid/{guid}

Returns the dataset (a signed JWT) for the given GUID in a message object. The parameter "Value" holds the JWT data.

#### Example: 
    Request:
    GET /guid/bXBhhJm-o40WBIcXQQECH0-_MqNux6p3ANxt7lFA-Mg HTTP/1.1
    
    Response:
    {"Message":"OK","Code":200,"Value":"eyJhbGciOiJFUzI1NiJ9.eyJkYXRhIjoiZXlKbmRXbGtJam9pWWxoQ2FHaEtiUzF2TkRCWFFrbGpXRkZSUlVOSU1DMWZUWEZPZFhnMmNETkJUbmgwTjJ4R1FTMU5aeUlzSW5CMVlteHBZMHRsZVNJNklpMHRMUzB0UWtWSFNVNGdVRlZDVEVsRElFdEZXUzB0TFMwdFRVWlpkMFZCV1VoTGIxcEplbW93UTBGUldVWkxORVZGUVVGdlJGRm5RVVZ1TWpVdlkwNDNTRGwwY0hwRFMwdzJRa3RoVWxWYVozZE1hekpzZFZaVmIzSTJhMWhNWlcxbFMxVlJTM2M1Tm0xSWNuQXlNRmxJUTFCdWFVMVdjRXAxVm1adFdFVkJWMnRFTDBoaFYxZGtLM0l3VVV4UVp6MDlMUzB0TFMxRlRrUWdVRlZDVEVsRElFdEZXUzB0TFMwdElpd2liR0Z6ZEZWd1pHRjBaU0k2SWpJd01UVXRNRGt0TWpSVU1EZzZNalE2TWpjck1EQTZNREFpTENKaFkzUnBkbVVpT2pFc0luVnpaWEpKUkhNaU9sc2ljbVZVU0VsT1N6b3ZMM05sWW1GemRHbGhiaTVuYjJWdVpHOWxjaTV1WlhRdklpd2ljbVZVU0VsT1N6b3ZMMlpoWTJWaWIyOXJMbU52YlM5bWJIVm1abmt4TWpNaVhTd2ljbVYyYjJ0bFpDSTZNQ3dpZEdsdFpXOTFkQ0k2SWpJd01qWXRNRGt0TWpSVU1EZzZNalE2TWpjck1EQTZNREFpTENKellXeDBJam9pVTNCSWRWaDNSVWQzY2s1alJXTkdiMDVUT0V0Mk56bFFlVWRHYkhocE1YWWlmUSJ9.MEQCICV56mMApYLytl4Zn0poYFO9kOHkUBpaoc6VE335v7FaAiBTFf8IKSHWswGoXXmK9CBhQx5tmc6QaGW_mzwzeUdXCA","errorCode":0}

### PUT /guid/{guid}

Writes (creates and updates) a dataset (a signed JWT) for the given GUID. The request body holds the JWT data.

#### Example: 

    Request:
    PUT /guid/bXBhhJm-o40WBIcXQQECH0-_MqNux6p3ANxt7lFA-Mg HTTP/1.1
    
    eyJhbGciOiJFUzI1NiJ9.eyJkYXRhIjoiZXlKbmRXbGtJam9pWWxoQ2FHaEtiUzF2TkRCWFFrbGpXRkZSUlVOSU1DMWZUWEZPZFhnMmNETkJUbmgwTjJ4R1FTMU5aeUlzSW5CMVlteHBZMHRsZVNJNklpMHRMUzB0UWtWSFNVNGdVRlZDVEVsRElFdEZXUzB0TFMwdFRVWlpkMFZCV1VoTGIxcEplbW93UTBGUldVWkxORVZGUVVGdlJGRm5RVVZ1TWpVdlkwNDNTRGwwY0hwRFMwdzJRa3RoVWxWYVozZE1hekpzZFZaVmIzSTJhMWhNWlcxbFMxVlJTM2M1Tm0xSWNuQXlNRmxJUTFCdWFVMVdjRXAxVm1adFdFVkJWMnRFTDBoaFYxZGtLM0l3VVV4UVp6MDlMUzB0TFMxRlRrUWdVRlZDVEVsRElFdEZXUzB0TFMwdElpd2liR0Z6ZEZWd1pHRjBaU0k2SWpJd01UVXRNRGt0TWpSVU1EZzZNalE2TWpjck1EQTZNREFpTENKaFkzUnBkbVVpT2pFc0luVnpaWEpKUkhNaU9sc2ljbVZVU0VsT1N6b3ZMM05sWW1GemRHbGhiaTVuYjJWdVpHOWxjaTV1WlhRdklpd2ljbVZVU0VsT1N6b3ZMMlpoWTJWaWIyOXJMbU52YlM5bWJIVm1abmt4TWpNaVhTd2ljbVYyYjJ0bFpDSTZNQ3dpZEdsdFpXOTFkQ0k2SWpJd01qWXRNRGt0TWpSVU1EZzZNalE2TWpjck1EQTZNREFpTENKellXeDBJam9pVTNCSWRWaDNSVWQzY2s1alJXTkdiMDVUT0V0Mk56bFFlVWRHYkhocE1YWWlmUSJ9.MEQCICV56mMApYLytl4Zn0poYFO9kOHkUBpaoc6VE335v7FaAiBTFf8IKSHWswGoXXmK9CBhQx5tmc6QaGW_mzwzeUdXCA
    
    Response:
    {"Message":"OK","Code":200,"Value":""}

## Dataset

The dataset is expected to be a valid JSON Object of the following form:

### JSON Schema:

```
{
	"$schema": "http://json-schema.org/draft-04/schema#",
	"type": "object",
	"properties": {
		"guid": {
			"type": "string"
		},
		"userIDs": {
			"type": "array",
			"items": {
				"type": "object",
				"properties": {
					"uid": {
						"type": "string"
					},
					"domain": {
						"type": "string"
					}
				},
				"required": ["uid", "domain"]
			}
		},
		"lastUpdate": {
			"type": "string"
		},
		"timeout": {
			"type": "string"
		},
		"publicKey": {
			"type": "string"
		},
		"salt": {
			"type": "string"
		},
		"active": {
			"type": "integer"
		},
		"revoked": {
			"type": "integer"
		},
		"defaults": {
			"type": "object",
			"properties": {
				"voice": {
					"type": "string"
				},
				"chat": {
					"type": "string"
				},
				"video": {
					"type": "string"
				}
			},
			"required": ["voice", "chat", "video"]
		}
	},
	"required": ["guid", "userIDs", "lastUpdate", "timeout", "publicKey", "salt", "active", "revoked", "defaults"]
}
```

### Example:

```
{
  "guid": "iTCLxibssOUXC2BeKctCxDRejbEw2YlvXsJQgdFa06c",
  "userIDs": [{
    "uid": "user://sebastian.goendoer.net/",
    "domain": "google.com"
  },{
    "uid": "user://facebook.com/fluffy123",
    "domain": "google.com"
  }],
  "lastUpdate":"2015-09-24T08:24:27+00:00",
  "timeout":"2026-09-24T08:24:27+00:00",
  "publicKey":"-----BEGIN PUBLIC KEY-----MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE0ptQ88nO42/WDfuNNiNrHlaCGTRswXvbvfY9Ttg9RkVfqhBVKK+V1tHkNPp/WRzIQKwLKDgAzujAxzN8LhI7Hg==-----END PUBLIC KEY-----",
  "salt": "SpHuXwEGwrNcEcFoNS8Kv79PyGFlxi1v",
  "active": 1,
  "revoked": 0,
  "defaults": {
    "voice": "a",
    "chat": "b",
    "video": "c"
  }
}
```
