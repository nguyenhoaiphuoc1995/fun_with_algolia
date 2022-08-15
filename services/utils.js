function handleDoubleQuote(str) {
  return str.replace(/"/g, '\\"');
}

function handleSingleQuote(str) {
  return str.replace(/'/g, "\\'");
}

function handleQuotes(str) {
  return this.handleDoubleQuote(this.handleSingleQuote(str));
}

function isString(str) {
  return typeof str === "string" || str instanceof String;
}

function generateRandomFourLetterNumber() {
  const max = 9999;
  const min = 1000;
  return `${Math.floor(Math.random() * (max - min + 1) + min)}`;
}

async function delayFnc(ms) {
  await new Promise((resolve) => setTimeout(() => resolve(""), ms));
}

module.exports = {
  handleDoubleQuote,
  handleSingleQuote,
  handleQuotes,
  isString,
  generateRandomFourLetterNumber,
  delayFnc,
};
