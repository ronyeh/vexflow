# Using VexFlow in Node JS

You can use VexFlow in Node JS by calling `const VexFlow = require(...)` on the CJS build of the library.

`node svg.js > output.svg` creates a SVG image file containing the VexFlow output.

`node pdf.js` produces a PDF file containing the VexFlow output.

`node customcontext.js` demonstrates how to use VexFlow with a custom RenderContext.

NOTE: The `require('vexflow')` statement in these demos works because of the `vexflow/package.json` exports field.
