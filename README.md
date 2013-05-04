# Official documentation site for Emmet toolkit

Currently, the main web-site skeleton is finished (maybe a few bugs out there), and I’m currently writing documentation for Emmet toolkit. Documentation itself is located in `src/documents` folder.

The web-site uses [DocPad](https://github.com/bevry/docpad) for static site generation and [Grunt.js](http://gruntjs.com) for building front-end assets. Both of these project uses custom plugins for building and documents generation, which might be described later.

## Local setup

To run this web-site locally, you need the following dependencies:

1. Node.JS >= v0.6
2. NPM
3. DocPad and Grunt.js installed globally: `npm install -g docpad && npm install -g grunt`

### Running local web-site instance

1. Clone this repo (note that this project uses submodules, please use --recursive option) and go to the cloned folder
2. Run `npm install` to install all project local dependencies
3. Run `docpad run`. This command will build all JS & CSS assets, generate static HTML-page and set-up local web-server (usually http://localhost:9778/) where generated web-site can be viewed.

Note that you should view the web-site _only_ with local web-server since generated pages contains absolute, cache-busted references to CSS and JS files.