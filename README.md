# kinpost

[![npm version](https://badge.fury.io/js/kinpost.svg)](https://badge.fury.io/js/kinpost)
[![Build Status](https://secure.travis-ci.org/t-kojima/kinpost.png?branch=master)](http://travis-ci.org/t-kojima/kinpost)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Kinpost can upload any files to custom JavaScript (or CSS) forms via kintone REST API.

## Installation

```bash
npm install --save-dev kinpost
```

or

```bash
yarn add --dev kinpost
```

## Usage

Append any files to custom JavaScript (or CSS) form, if the same filename exists, overwrite an old file.

```js
const kinpost = require('kinpost');

kinpost({
  domain: 'example.cybozu.com',
  app: 1,
  username: 'user@example.com',
  password: '**********',
  files: [
    { path: './js/sample.js' },
    { path: './js/mobile.js', platform: 'mobile' },
    { path: './css/global.css', type: 'css' },
  ],
});
```

## Parameters

| name     | type   | required | description                               |
| -------- | ------ | -------- | ----------------------------------------- |
| domain   | string | yes      | Your kintone sub domain name              |
| app      | number | yes      | Target kintone app ID                     |
| username | string | yes      | Login user name                           |
| password | string | yes      | Login user's password                     |
| files    | array  | yes      | File config list, please see next section |

### File Config

| name     | type   | required | default | description                            |
| -------- | ------ | -------- | ------- | -------------------------------------- |
| path     | string | yes      |         | Path of the file for upload            |
| encoding | string | no       | utf-8   | File encoding                          |
| platform | string | no       | desktop | Target Platform. `desktop` or `mobile` |
| type     | string | no       | js      | File type. `js` or `css`               |

## Examples

Upload a `sample.js` file to custom JavaScript form for PC.

```js
const kinpost = require('kinpost');

kinpost({
  domain: 'example.cybozu.com',
  app: 1,
  username: 'user@example.com',
  password: '**********',
  files: [
    {
      path: './sample.js',
    },
  ],
});
```

Upload a `mobile.js` file to custom JavaScript form for Mobile.

```js
const kinpost = require('kinpost');

kinpost({
  domain: 'example.cybozu.com',
  app: 1,
  username: 'user@example.com',
  password: '**********',
  files: [
    {
      path: './js/mobile.js',
      platform: 'mobile',
    },
  ],
});
```

Upload a `sample.js` file to custom JavaScript form for PC, and `global.css` file to custom CSS form for PC.

```js
const kinpost = require('kinpost');

kinpost({
  domain: 'example.cybozu.com',
  app: 1,
  username: 'user@example.com',
  password: '**********',
  files: [
    {
      path: './js/sample.js',
    },
    {
      path: '/css/global.css',
      type: 'css',
    },
  ],
});
```

## Licence

MIT License.
