export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function createUnshuffledDataSet(numberOfElements) {
  let result = [];
  for (let i = 0; i < numberOfElements; i++) {
    result[i] = i;
  }
  return result;
}

export function createDataSet(numberOfElements) {
  const result = createUnshuffledDataSet(numberOfElements);
  const comparison = [...result];
  shuffleArray(result);

  return [result, comparison];
}
