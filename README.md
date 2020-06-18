<h1 align="center">
 Client policies assessment
</h1>

> Policies API built using Express.js

### Global Requirements

* [Yarn](https://docs.docker.com/compose/) 
* [Nodemon](https://www.npmjs.com/package/nodemon/v/1.17.3) 

### Setup

Clone the repository, install the dependencies and get started right away.

    $ git clone https://github.com/kadriand/users-policies-assessment
    $ npm install -g nodemon
    $ yarn   # or npm install

Make a copy of `.env.example` as `.env` and update your application details.

Then, start the application.

    $ yarn start:dev (For development)
    $ NODE_ENV=production yarn start (For production)

Navigate to http://localhost:8848/api/ to check the installation.

To run tests.

    $ yarn test
    $ yarn test:coverage (with coverage)


The file [test/requests/samples.http](https://github.com/kadriand/users-policies-assessment/blob/master/test/requests/samples.http) contains useful requests samples to make with the Jetbrains tool Http Client

### API call samples

#### Login 

`POST /api/login`

The default password for each client is the respective `clientId`  

Body:
```json
{
  "email": "<email>",
  "password": "<password>"
}
```

###### Response
For the request:
```curl
$ curl -XPOST -H "Content-type: application/json" -d '{"email": "britneyblankenship@quotezart.com","password": "a0ece5db-cd14-4f21-812f-966633e7be86"}' 'http://localhost:8848/api/login'
```

`200 OK` response:

```json
{
  "token": "eaebefa9e74be396cc911949d4f8fed786a2b64e76e69697e38d49489b32"
}
```
This is a json web token to be used as Bearer token with the header _Authorization_. It expires after ten minutes.

#### Get client by id

`GET /api/clients/<client-id>`

###### Response
For the request:
```curl
$ curl -XGET -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImEwZWNlNWRiLWNkMTQtNGYyMS04MTJmLTk2NjYzM2U3YmU4NiIsInNjb3BlIjoiYWRtaW4iLCJpYXQiOjE1OTI1MDg2MTksImV4cCI6MTU5MjUwOTIxOX0.Isb2IA8IzB5SJLr6gFOjxxtaf36mZJL-NYJjzT5y4yLKPbdYRLbMzDG5w-ed62lVTmDN0v_sF2dKmqGA3HdviGb-9ju4v1XqXEevCI0z5Szf2-pJP3ybDVNu53H2RffuEfub0IFUo0ysaIEBSbYYXVGaUV0jhgwjopLNYcpplhfucMMFhIolAm-3hEmlnhym6y2J4BMhK-APNbLY5y7s-Yi5eyhAhJnybyqp1sdOWTZ4MIx0cInZe1NGDYTYuR5eaxTjaLNTL0WyV1QwS_8mkyBDUsL39MXRrsfu_tHQdHKltWGDTeoHOVnPsOrDVsO1dSZzTEEHWiGcIrAhhYQCmQ' 'http://localhost:8848/api/clients/44e44268-dce8-4902-b662-1b34d2c10b8e'
```

`200 OK` response:

```json
{
  "data": {
    "id": "44e44268-dce8-4902-b662-1b34d2c10b8e",
    "name": "Merrill",
    "email": "merrillblankenship@quotezart.com",
    "role": "user"
  }
}
```

#### Find clients by custom attribute

`GET /api/clients/search?field=<field-name>&value=<value>`

This endpoint finds the clients whose values for the attribute `<field-name>` matches the value `<value>`

###### Response
For the request:
```curl
$ curl -XGET -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImEwZWNlNWRiLWNkMTQtNGYyMS04MTJmLTk2NjYzM2U3YmU4NiIsInNjb3BlIjoiYWRtaW4iLCJpYXQiOjE1OTI1MDg2MTksImV4cCI6MTU5MjUwOTIxOX0.Isb2IA8IzB5SJLr6gFOjxxtaf36mZJL-NYJjzT5y4yLKPbdYRLbMzDG5w-ed62lVTmDN0v_sF2dKmqGA3HdviGb-9ju4v1XqXEevCI0z5Szf2-pJP3ybDVNu53H2RffuEfub0IFUo0ysaIEBSbYYXVGaUV0jhgwjopLNYcpplhfucMMFhIolAm-3hEmlnhym6y2J4BMhK-APNbLY5y7s-Yi5eyhAhJnybyqp1sdOWTZ4MIx0cInZe1NGDYTYuR5eaxTjaLNTL0WyV1QwS_8mkyBDUsL39MXRrsfu_tHQdHKltWGDTeoHOVnPsOrDVsO1dSZzTEEHWiGcIrAhhYQCmQ' 'http://localhost:8848/api/clients/search?field=name&value=Barnett'
```

`200 OK` response:

```json
{
  "data": [
    {
      "id": "a3b8d425-2b60-4ad7-becc-bedf2ef860bd",
      "name": "Barnett",
      "email": "barnettblankenship@quotezart.com",
      "role": "user"
    }
  ]
}
```

#### Get policies by client name

`GET /api/policies/search/client?field=<field-name>&value=<value>`

This endpoint finds the policies of the clients whose value for the attribute `<field-name>` matches the value `<value>`

###### Response
For the request:
```curl
$ curl -XGET -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImEwZWNlNWRiLWNkMTQtNGYyMS04MTJmLTk2NjYzM2U3YmU4NiIsInNjb3BlIjoiYWRtaW4iLCJpYXQiOjE1OTI1MDg2MTksImV4cCI6MTU5MjUwOTIxOX0.Isb2IA8IzB5SJLr6gFOjxxtaf36mZJL-NYJjzT5y4yLKPbdYRLbMzDG5w-ed62lVTmDN0v_sF2dKmqGA3HdviGb-9ju4v1XqXEevCI0z5Szf2-pJP3ybDVNu53H2RffuEfub0IFUo0ysaIEBSbYYXVGaUV0jhgwjopLNYcpplhfucMMFhIolAm-3hEmlnhym6y2J4BMhK-APNbLY5y7s-Yi5eyhAhJnybyqp1sdOWTZ4MIx0cInZe1NGDYTYuR5eaxTjaLNTL0WyV1QwS_8mkyBDUsL39MXRrsfu_tHQdHKltWGDTeoHOVnPsOrDVsO1dSZzTEEHWiGcIrAhhYQCmQ' 'http://localhost:8848/api/policies/search/client?field=name&value=Britney'
```

`200 OK` response:

```json
{
  "data": [
    {
      "id": "7b624ed3-00d5-4c1b-9ab8-c265067ef58b",
      "amountInsured": 399.89,
      "email": "inesblankenship@quotezart.com",
      "inceptionDate": "2015-07-06T06:55:49Z",
      "installmentPayment": true,
      "clientId": "a0ece5db-cd14-4f21-812f-966633e7be86"
    },
    {
      "id": "6f514ec4-1726-4628-974d-20afe4da130c",
      "amountInsured": 697.04,
      "email": "inesblankenship@quotezart.com",
      "inceptionDate": "2014-09-12T12:10:23Z",
      "installmentPayment": false,
      "clientId": "a0ece5db-cd14-4f21-812f-966633e7be86"
    }]
}
```

#### Get the client for a given policy

`GET /api/api/policies/<policy-id>/client`

This endpoint returns the client associated with a policy

###### Response
For the request:
```curl
$ curl -XGET -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImEwZWNlNWRiLWNkMTQtNGYyMS04MTJmLTk2NjYzM2U3YmU4NiIsInNjb3BlIjoiYWRtaW4iLCJpYXQiOjE1OTI1MDg2MTksImV4cCI6MTU5MjUwOTIxOX0.Isb2IA8IzB5SJLr6gFOjxxtaf36mZJL-NYJjzT5y4yLKPbdYRLbMzDG5w-ed62lVTmDN0v_sF2dKmqGA3HdviGb-9ju4v1XqXEevCI0z5Szf2-pJP3ybDVNu53H2RffuEfub0IFUo0ysaIEBSbYYXVGaUV0jhgwjopLNYcpplhfucMMFhIolAm-3hEmlnhym6y2J4BMhK-APNbLY5y7s-Yi5eyhAhJnybyqp1sdOWTZ4MIx0cInZe1NGDYTYuR5eaxTjaLNTL0WyV1QwS_8mkyBDUsL39MXRrsfu_tHQdHKltWGDTeoHOVnPsOrDVsO1dSZzTEEHWiGcIrAhhYQCmQ' 'http://localhost:8848/api/policies/7b624ed3-00d5-4c1b-9ab8-c265067ef58b/client'
```

`200 OK`

```json
{
  "data": {
    "id": "a0ece5db-cd14-4f21-812f-966633e7be86",
    "name": "Britney",
    "email": "britneyblankenship@quotezart.com",
    "role": "admin"
  }
}
```
