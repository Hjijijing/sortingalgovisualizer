export async function bubbleSortDraw(array, drawArray, onCompletion) {
  await drawArray();
  await bubbleSort(array, drawArray);
  onCompletion();
}

export async function bubbleSort(array, drawArray) {
  for (let j = array.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        await drawArray({ highlights: [{ index: i, value: array[i + 1] }] });
      }
    }
  }
}
