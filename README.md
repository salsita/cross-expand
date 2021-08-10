# cross-expand
Expand glob patterns consistently across multiple platforms when executing command-line programs.

## Problem
Windows CMD which is still the default in majority of cases doesn't support wildcard
pattern expansion out of the box. Unlike in bash and similar unix shells, the patterns
are provided to the program as they are.

## Solution
This simple package unifies glob pattern expansion across platforms by delegating
the resolution to [glob](https://www.npmjs.com/package/glob). Expanded arguments
are then passed to [cross-env](https://www.npmjs.com/package/cross-env) to ensure
further cross-platform compatibility.

## Installation
As usual:
```shell
npm install cross-expand --save-dev
```
or
```shell
yarn add cross-expand --dev
```


## Usage

```shell
cross-expand <argument-offsets> <command> [arguments]
```

### Example
Compile all packages from a mono-repo using typescript compiler.

```shell
cross-expand 2 tsc -b "packages/**/tsconfig.json"
```
Note that `2` defines that the second argument passed to `tsc` command should
be expanded. This makes the `-b` forwarded directly to the command.

**Important:** Make sure you wrap the pattern in quotes to prevent it from
being expanded by the shell itself.

### `<argument-offsets>`

Unfortunately with `cross-expand` we don't have the luxury of using quotes
to decide which arguments should be expanded and which not as we have with Unix
shells. That's why we have a dedicated leading argument tha defines this.

Value provided through this argument is one or more offsets of arguments that should
be expanded. The offset is 1-based and applies to the `[arguments]` passed to the
actual command.

We currently support:
- specific offsets: e.g. `1`, `2`, `1,2`, , `1,2,6`
- offset ranges: e.g. `1-5`, `1-3,5-7`
- unterminated ranges: e.g. `5+` (applies to fifth and any further argument)
- any combination of the above 

### `<command>`

The command that is to receive the expanded arguments. `cross-expand` will call it
internally and pipe any output.

### `[arguments]`

Arguments to pass to the `<command>`. Depending on `<argument-offets>` some of the
arguments will be expanded prior passing them to `<command>`.

## Licence

MIT
