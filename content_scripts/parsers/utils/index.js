export const nodeListToChecklistItems = nodeList => {
  return Array.from(nodeList)
    .map(item => item.innerText)
    .filter(item => !!item)
};
