# Google People API Sync test Project 

This is a test project that uses OAuth2 for downloading data from google people API

## Installation

Clone this repository

Install node dependecies

```bash
yarn add
```

To build the server you can use ts-node/babel or swc
```bash
npm buld

npm build:swc
```

Run the server build
 ```bash
npm start
```

You can also run the serve in dev mode, using ts-node
 ```bash
npm start:dev
```
## Demo



[https://sync-with.herokuapp.com/](https://sync-with.herokuapp.com/)

## API Reference

#### Redirection to Google OAuth2

```http
  GET /auth
```

If user  is not logged on google or app is not approved googleAPI will prompt the authorization consent screen.   

#### Get list of contacts

```http
  GET /people
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `connect.sid`      | `cookie` | **Required**. Local identification cookie. This session cookie will be created after authorization by Google OAth2|


## User navigation

##### The endpoints described above will be used by the user while navigating the app

#### Home Page

```http
  GET /
```
The user will be to navigate to /auth after pressing a button presented on the page 

#### Protected Route (DEV)

```http
  GET /protected
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `connect.sid`      | `cookie` | **Required**. Local identification cookie. This session cookie will be created after authorization by Google OAth2|


The user will be to navigate to /people and download contact list  after pressing a button presented on the page.

## Related

Related requirements document

[SyncWith Initial Project](https://getmicro.notion.site/SyncWith-Initial-Project-b48d64cf104545ffbab8e36ab670bcbf)

[Google’s People API](https://developers.google.com/people)

[SyncWith | Any API](https://workspace.google.com/marketplace/app/syncwith_any_api/449644239211?utm_source=syncwith.com)


