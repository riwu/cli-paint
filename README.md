# CLI Paint

## Overview

A simple console version of a drawing/paint program.

## Commands

### Create Canvas

```
C w h
```

Creates a new canvas of width `w` and height `h`, replacing any existing canvas created previously.

### Draw Line

```
L x1 y1 x2 y2
```

Creates a new line from `(x1, y1)` to `(x2, y2)`.

- Lines will be displayed with the 'x' character
- Allows drawing over existing shapes and colors
- Throws an error if neither `x1` and `x2` nor `y1` and `y2` are equal (only horizontal or vertical lines are supported)

### Draw Rectangle

```
R x1 y1 x2 y2
```

Creates a new rectangle, whose upper left corner is `(x1, y1)` and lower right corner is `(x2, y2)`.

- Horizontal and vertical lines will be displayed with the 'x' character
- Allows drawing over existing shapes and colors
- Throws an error if `x1 > x2` or `y1 > y2`

### Fill area

```
B x y c
```

Fills the entire area connected to `(x, y)` with "color" `c`.

- Behaves similarly to the "bucket fill" tool in paint programs
- Allows filling over previously colored regions
- Allows filling with the shape border display symbol ('x'), while retaining its property as a color fill (e.g. can be overridden with another color later)
- Throws an error if
  - `c` is not a single letter (causes shape distortion on the CLI)
  - `(x, y)` is on any shape borders (displayed with 'x')

### Exit

```
Q
```

Quits the program.

### General instructions

- Commands are case insensitive and extra spaces are trimmed
- For user input, the top-left most coordinate is `(1, 1)`, not `(0, 0)`

### Errors

The following actions will result in a friendly error being shown:

- Provide any command not listed above
- Command options specified are incomplete or excessive (eg. `Q extraOption`)
- Create a shape or filling before canvas is created
- Coordinates, width or height specified are not non-zero positive integers
- Coordinates specified are outside canvas bounds

### Sample I/O

```
enter command: C 20 4
----------------------
|                    |
|                    |
|                    |
|                    |
----------------------
enter command: L 1 2 6 2
----------------------
|                    |
|xxxxxx              |
|                    |
|                    |
----------------------
enter command: L 6 3 6 4
----------------------
|                    |
|xxxxxx              |
|     x              |
|     x              |
----------------------
enter command: R 14 1 18 3
----------------------
|             xxxxx  |
|xxxxxx       x   x  |
|     x       xxxxx  |
|     x              |
----------------------
enter command: B 10 3 o
----------------------
|oooooooooooooxxxxxoo|
|xxxxxxooooooox   xoo|
|     xoooooooxxxxxoo|
|     xoooooooooooooo|
----------------------
```

## Setup

- Install node version >= 8
- `yarn install`

## Development

- `yarn dev`

## Test

- `yarn test`: run all tests once
- `yarn watch`: run tests on watch mode

## Run

- `yarn start`
