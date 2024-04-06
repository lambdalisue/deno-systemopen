# systemopen

[![jsr](https://img.shields.io/jsr/v/%40lambdalisue/systemopen?logo=javascript&logoColor=white)](https://jsr.io/@lambdalisue/systemopen)
[![denoland](https://img.shields.io/github/v/release/lambdalisue/deno-systemopen?logo=deno&label=denoland)](https://github.com/lambdalisue/deno-systemopen/releases)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/systemopen/mod.ts)
[![Test](https://github.com/lambdalisue/deno-systemopen/workflows/Test/badge.svg)](https://github.com/lambdalisue/deno-systemopen/actions?query=workflow%3ATest)

Open a file or URL using the default application of the user's OS. It supports
Windows, macOS, and Linux.

## Usage

```ts
import { systemopen } from "./mod.ts";

if (await systemopen("https://deno.land")) {
  console.log("Success");
} else {
  console.log("Failed");
}
```

## License

The code follows MIT license written in [LICENSE](./LICENSE). Contributors need
to agree that any modifications sent in this repository follow the license.
