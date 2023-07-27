// To enable the string replacement in Gruntfile.js, we need the __VF_XXXX__ tokens below to not be strings.
// This causes a TS error, since the symbols are not defined. So we disable compiler checks for this file.

// eslint-disable-next-line
// @ts-nocheck
export const VERSION: string = __VF_VERSION__;
export const ID: string = __VF_GIT_COMMIT_ID__;
export const DATE: string = __VF_BUILD_DATE__;
