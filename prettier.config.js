/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  semi: false,
  singleQuote: true,
  // remove unnecessary blank lines
  insertPragma: true,
};
