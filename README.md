# FunBox API Blueprint Tutorial

### Introduction

[API Blueprint](https://apiblueprint.org/) (APIB) is a language for describing client-server
interactions with JSON payload. APIB allows developers to describe the format of server requests,
server responses, URL parameters, and much more.

APIB uses Markdown syntax as a basis. To describe data structures in APIB documentation
[MSON](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md) syntax is used.
With help of MSON, it is easy to define structures of requests and responses or to define
named types and use them throughout the document.

## Why API Blueprint

A lot of companies across the world use JSON API in their projects, and so do we.
API description is one of the essential tasks, which helps to support and develop projects
that a large team is working on. That is why we felt a strong need for convenient tools
to work with documentation.

Historically, the battle was between [API Blueprint](https://apiblueprint.org/)
and [Swagger](https://swagger.io/).
We chose API Blueprint for two reasons. Firstly, the source code of documentation
that is described using API Blueprint is more readable to humans.
Secondly, at the time of research conducted, Swagger lacked several important features,
as `One Of` support.

## APIB tools

To start working with APIB documentation you need:

- A text editor — [VS Code](https://code.visualstudio.com/), [Vim](https://www.vim.org/)
or any other. Enabling Markdown syntax highlighting can be useful.
- A tool to render a document to an HTML page.
- A tool to parse APIB documentation. In most cases, a parser is a part of a renderer,
but sometimes you can use it explicitly to build other APIB utilities.

API Blueprint standard is mostly maintained by [Apiary](https://apiary.io/),
which owns the official parser [Drafter](https://github.com/apiaryio/drafter).
Other enthusiasts help to develop some [tools](https://apiblueprint.org/tools.html)
to work with API Blueprint, including renderers.

## FunBox APIB tools

For some time a standard set of tools to work with APIB documentation
had been including [Drafter](https://github.com/apiaryio/drafter) as a parser
and [aglio](https://github.com/danielgtaylor/aglio) as a renderer.

Drafter is a great tool that had been helping us a lot with documentation,
but it lacks some desired features like multi-file support or the ability to describe
complex data types with JSON Schema.

We'd had a personal vision of the functionalities to implement, so we had built our own set of tools
and utilities to work with APIB documentation. Our implementations are written in plain JavaScript,
because we use this language a lot in our projects.

---

<img align="left" width="120" height="120"
     alt="Crafter logo"
     src="./assets/crafter-logo.png">

### [Crafter](https://github.com/funbox/crafter)

**Crafter** is an API Blueprint parser, heavily inspired by Drafter. Crafter is mostly compatible
with Drafter and supports the majority of its functionality, but our library offers additional features:
<br></br>
- **Modules**. Now it is possible to split one giant file into parts, which makes documentation easy to use.
- **Resource Prototypes** allow you to set up common responses in one place and reuse them through the documentation.
- Support of **arrays in query strings**.
- **JSON Schema based types**. In case of complex types it is possible to describe them directly as JSON Schema.
- **String validation** attributes that describe the expected length of parameters and regular expressions they should match.
- Describe a **non-HTTP interaction** (as WebSocket) by means of Message section.
- **Extended sourcemaps**. Crafter generates detailed sourcemaps for APIB elements, that allowed us to develop our own
extension for VSCode.

Additional information about Crafter you can find in project [README](https://github.com/funbox/crafter/blob/master/README.md).

---

<img align="left" width="120" height="120"
     alt="Blueprinter logo"
     src="./assets/blueprinter-logo.png">

### [Blueprinter](https://github.com/funbox/blueprinter)

**Blueprinter** is an API Blueprint renderer. It uses source `.apib` documentation
to generate API AST in the form of [API Elements](https://apielements.org/) and
create an HTML page with documentation.

Blueprinter advantages:

- **Modern design.** Dark theme included!
- **Search support.** You can search for groups, resources, and actions using provided search field.
If the custom search field is not enough, you can use standard browser search on the special manual search page.
- **Printer-friendly.**
- **Deep integration with APIB parser.** Parsing errors and warnings are not swallowed but have pretty representation.

Here is an example of how a Blueprinter page looks like:

<img
    align="center"
    alt="Blueprinter demo"
    src="./assets/blueprinter-demo.png">

Additional information about Blueprinter you can find in project [README](https://github.com/funbox/blueprinter/blob/master/README.md).

---

<img align="left" width="120" height="120"
     alt="APIB language server logo"
     src="./assets/vs-code-apib-ls-logo.png">

### [APIB Language Server](https://github.com/funbox/vscode-apib-ls)

**APIB Language Server** is a VS Code extension that allows to enhance
developer experience when creating and editing API Blueprint documentation.

This extension brings you:

- Syntax highlighting.
- Diagnostic messages.
- Breadcrumbs of documentation sections.
- “Go to definition” implementation for data structures and resource prototypes.
- Autocomplete for types and structure names.

See demo of how the extension could be useful:

<img
  align="center"
  alt="VS Code plugin demo"
  src="./assets/vscode-apib-demo.gif">

Additional information about how to install and use VS Code plugin you can find
in project [README](https://github.com/funbox/vscode-apib-ls/blob/master/README.md).

---

### [API Validator](https://github.com/funbox/api-validator)

**API Validator** is a frontend tool to validate server response against API Blueprint documentation.

To minimize the number of errors on the frontend side associated with incorrect backend responses,
we developed a tool for automatic validation. It extracts JSON schema from the API Blueprint documentation
and allows to automatically check correspondence between the backend response and the documentation for this request.

Additional information about how to use API Validator you can find
in project [README](https://github.com/funbox/api-validator/blob/master/README.md).


## API Blueprint specifications

An API Blueprint documentation relies on two original specifications:

- [API Blueprint Specification](https://apiblueprint.org/documentation/specification.html),
- [MSON Specification](https://apiblueprint.org/documentation/mson/specification.html).

FunBox APIB tools introduce a lot of new features, described in the following specifications:

- [our fork of API Blueprint spec](https://github.com/funbox/api-blueprint),
- [our fork of MSON spec](https://github.com/funbox/mson).

In these specifications, you can find out what sections the typical documentation consists of,
and what rules you should follow when you work with the content of API Blueprint documentation.

### Differences between original and forked API Blueprint specification

- Dropped support of Resource model section and Relation section.
- [Resource prototypes][resource-prototypes-section] section definition was added.
This allows you to set up common responses in one place and reuse them through the documentation.
- [Import][import-section] section definition was added.
This allows to to split big documentation into several files.
- Definitions of [SubGroup][subgroup-section] and [Message][message-section] sections were added.
This allows to describe interactions that do not rely on massively beloved REST+HTTP, e.g. WebSocket messages
or Apache Kafka messages.
- [Schema Structures][schema-structures-section] section definition was added. This allows to describe complex
data structures directly in JSON Schema format.
- A few other non-significant improvements.

### Differences between original and forked MSON specification

- New type attributes for a string value: format and pattern. See [Type Attribute][mson-type-attribute] section.
These attributes give you more precise control over the value validation within JSON Schema.
- New type attributes for an array value to specify array size: `min-length` and `max-length`.
See [Size Range][mson-size-range] section.
- New type attributes `minimum` and `maximum` for a numeric value to validate a number
against the specified range of values. See [Range Of Numbers][mson-num-range] section.
- Removed definition of the fixed-type attribute for arrays.
- Described opportunity to define description of One Of elements.
- A few other non-significant improvements.

## APIB project setup

First, you need to install Node.js to work with APIB documentation. You can get it from the
[official site](https://nodejs.org/en/), via Homebrew (MacOS X) or a repository (Linux).
Recommended Node.js version is 14.18.0 or higher.

In the root of your APIB project create `package.json` with the next content:

```json
{
  "name": "project-name-apib",
  "version": "1.0.0",
  "description": "API Blueprint documentation for the project 'Project Name'",
  "scripts": {
    "dev": "npx @funboxteam/blueprinter -i doc.apib -s -p 3000",
    "doc": "npx @funboxteam/blueprinter -i doc.apib -o index.html"
  },
  "dependencies": {
    "@funboxteam/blueprinter": "5.1.0"
  }
}
```

- In the `name` section, write the name of your project instead of `project-name`.
Postfix `-apib` specifies that this is a project for APIB documentation.
- In the `description` section, write your product name instead of `Project Name`.
- Specify the [latest version](https://github.com/funbox/blueprinter/blob/master/package.json#L3)
of `@funboxteam/blueprinter` instead of `5.1.0`.

When you're done with `package.json`, run `npm install` to install `@funboxteam/blueprinter`
as a dependency.

## How to write APIB documentation

In your project root folder add the `doc.apib` file with documentation. If you use another file as an entry point,
replace `doc.apib` argument in `dev` and `doc` npm scripts with the corresponding path.
You can split documentation into separate parts and include them in the root file with the `Import` keyword.

### Documentation splitting tips

Our implementation of the `Import` statement sets several restrictions on how a documentation
can be split into parts and how these parts can be imported into each other. 

1. Imported APIB files must contain a standalone top-level APIB section.
At this moment, the next sections are regarded as top-level:

    * [Group][group-section],
    * [Resource][resource-section],
    * [Data Structures][data-structures-section],
    * [Schema Structures][schema-structures-section],
    * [Resource Prototypes][resource-prototypes-section],
    * [Import][import-section].

2. All APIB file dependencies should be imported explicitly. You can not define
data structures or resource prototypes in a separate file, import them in the root `doc.apib` file,
and then implicitly use them in other imported files.

    **Example.**

    Wrong APIB doc, where the file _resources.apib_ uses data structures from _data-structures.apib_:

    _doc.apib_
    ```apib
    # My Doc
 
    # Import data-structures.apib
    # Import resources.apib
    ```

    Correct APIB doc, where data structures are explicitly included in the file where they are used:

    _doc.apib_
    ```apib
    # My Doc

    # Import resources.apib
    ```

    _resources.apib_
    ```apib
    # Import data-structures.apib

    # GET /user

    + Response 200
      + Attributes (User)
    ```

## Examples

[Examples](https://github.com/funbox/api-blueprint-tutorial/tree/master/examples) folder contains available
examples of common APIB cases.

## Contributing and support

If you spot a problem, want to offer some improvements or have a question, create a new [issue](https://github.com/funbox/api-blueprint-tutorial/issues) in the project.

## Credits

Logos for projects were made by [Igor Garybaldi](https://pandabanda.com/).

[![Sponsored by FunBox](https://funbox.ru/badges/sponsored_by_funbox_centered.svg)](https://funbox.ru)

[resource-prototypes-section]: https://github.com/funbox/api-blueprint/blob/master/API%20Blueprint%20Specification.md#resource-prototypes-section
[import-section]: https://github.com/funbox/api-blueprint/blob/master/API%20Blueprint%20Specification.md#import-section
[message-section]: https://github.com/funbox/api-blueprint/blob/master/API%20Blueprint%20Specification.md#message-section
[subgroup-section]: https://github.com/funbox/api-blueprint/blob/master/API%20Blueprint%20Specification.md#subgroup-section
[group-section]: https://github.com/funbox/api-blueprint/blob/master/API%20Blueprint%20Specification.md#group-section
[resource-section]: https://github.com/funbox/api-blueprint/blob/master/API%20Blueprint%20Specification.md#resource-section
[schema-structures-section]: https://github.com/funbox/api-blueprint/blob/master/API%20Blueprint%20Specification.md#def-schema-structures
[data-structures-section]: https://github.com/funbox/api-blueprint/blob/master/API%20Blueprint%20Specification.md#data-structures-section

[mson-type-attribute]: https://github.com/funbox/mson/blob/master/MSON%20Specification.md#353-type-attribute
[mson-size-range]: https://github.com/funbox/mson/blob/master/MSON%20Specification.md#3533-size-range
[mson-num-range]: https://github.com/funbox/mson/blob/master/MSON%20Specification.md#3534-range-of-numbers
[mson-one-of-type]: https://github.com/funbox/mson/blob/master/MSON%20Specification.md#52-one-of-type
