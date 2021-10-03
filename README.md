## Introduction

Jota provides an excellent UX to read and search Bible. Can be deployed as a web, desktop, PWA and mobile app.

Main features and design principles:
1. Extremely flexible search - for example: "John 1", "J 1,2", "j 1 1 2 3-4", "any text J 1,1 containing references - Mt 2: 3-4", "faith", regular expressions: "/john|peter/".
1. Can browse found verses in the context of an entire chapter.
1. Copying passages with references to the clipboard formatted according to custom templates.
1. Clear, minimalistic graphical design.
1. Speed of operation - searching less than half a second, no pagination, all search results available at once, key navigation, changing of translation automatically changes the text of the displayed chapter and searched fragments.
1. Ergonomics - minimize the number of operation to perform the most common tasks. For example remembers user settings in local storage to minimize repetition of some actions.

Major limitations:
1. Originally designed for web on large displays with good internet speed. It is not optimized for mobile and poor internet.
1. Supports only Polish language for the user interface at the moment.

The app is hosted at [http://netanel.pl/jota](http://netanel.pl/jota).

## Architecture

Is is single page application written in JS using [Vue](https://vuejs.org) and [Quasar](https://quasar.dev), which allows it to be packaged as SPA, PWA, electron app or native mobile apps.

[Bible Passage Reference Parser](https://github.com/openbibleinfo/Bible-Passage-Reference-Parser) is used to identify bible passage references in the search term. 

Format of Bible translation is a zero-indexed, three dimensional array, where apocrypha books are at the end. The whole bible translation content is loaded to the client at once when the application is starting (or when changing the current translation) in order to provide fast processing within the scope of the given translation.

## Documentation

The user documentation is in Polish [here](https://docs.google.com/document/d/1unCVgpMRlzlaRRXdxdDkmNyVxqG7honM49lSKS9TTnU/edit#heading=h.xdw3mzx17rvr).

## Development
### Install the dependencies
```bash
npm install
```
A non-npm external dependency is [Bible Passage Reference Parser](https://github.com/openbibleinfo/Bible-Passage-Reference-Parser). Two language bundles of it (pl and en) are included in `src/static/bcv-parsers`. In order for the BCV Parser file to be consumable by Jota, the last two lines of need to be modified by replacing "this" with "window".

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Build the app for production
```bash
quasar build -m pwa
```

### Unit test
```bash
npm run test:unit
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

## Future plans
See [Roadmap.md](Roadmap.md)

## Authors
Jota app was created by [Jacek Kołodziejczyk](https://github.com/virtuecoder) and has contributions from [https://github.com/birdbird314](https://github.com/birdbird314).

## Licence
GNU General Public License v3.0 or later. See [Licence.txt](Licence.txt) for a full text.
