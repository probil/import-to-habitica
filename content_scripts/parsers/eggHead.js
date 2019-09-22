export default () => {
  const getText = doc => doc.querySelector('h1').innerText;

  const getChecklistItems = (doc) => {
    const selectors = doc.querySelectorAll('.black.ma0.mb1.no-underline.db.pl0.tl.f4.fw5.sans-serif.pointer.lh-text.relative');
    return nodeListToChecklistItems(selectors);
  };

  return { getText, getChecklistItems }
};
