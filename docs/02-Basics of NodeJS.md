# The basics of node

## Installing Node
Check [the official page](https://nodejs.org/download) for packages for the target operating system or use the system package manager (apt, chocolatey).

To keep different versions it is recommended to use [Node version manager](https://github.com/creationix/nvm), [nvmw on Windows](https://github.com/hakobera/nvmw).

## Run a simple script

On a terminal, execute

``` bash
$ node helloworld.js
```

to run the script in the `helloworld.js` file.

## Using modules

### Requiring built-in modules

Use the `require` function and assign the returning value to a variable. Then use that variable to access the module members.

```javascript
var url = require('url')
// note this method is deprecated
var p = url.parse("http://example.com/somepage?param1=a");
```

### Requiring third-party modules with `package.json` and `npm`
On every Node project there's a `package.json` file which defines project metadata (project name, version, authors, dependencies, ...). Third-party modules are declared as project dependencies and they are managed with `npm`, a Node companion which helps to manage packages.

A simple package.json file looks like

```json
{
    "name": "my-fun-project",
    "author": "itsMe",
    "private": true,
    "version": "0.0.1",
    "dependencies": {}
}
```

To add a dependency run the command

```shell
$ npm install package_name --save
```

in the directory where the `package.json` file lives. `npm` will create the `node_modules` directory to store the dependencies, and the `package-lock.json` file, which describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.

Dependencies can be manually added to the `package.json` file, but then you must run `npm install` to download those dependencies. [Check ``npm install`` documentation.](https://docs.npmjs.com/cli/v11/commands/npm-install)

`npm` can generate the initial `package.json` file using the `npm init` command. The generated file is editable.

### Defining own modules

To create a module, create a file, add some functions, constants, ... and export what is needed.

```
function f(){...}

module.exports = f;
```

Then require the file using dot syntax.
```
var myf = require('./mymod.js');
var r = myf.f();
```
