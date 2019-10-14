module.exports = {
  content: ['./popup/index.html', './popup/*.vue'],
  extractors: [
    {
      extensions: ['html', 'vue', 'js'],
      extractor: class TailwindExtractor {
        static extract (content) {
          return content.match(/[A-Za-z0-9-_:/]+/g) || []
        }
      },
    },
  ],
};
