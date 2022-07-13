export async function selectionSortDraw(array, drawArray, onCompletion) {
  await drawArray();
  await selectionSort(array, drawArray);
  onCompletion();
}

export async function selectionSort(array, drawArray) {
  for (let j = 0; j < array.length; j++) {
    let lowestIndex = j;
    let lowestValue = array[j];
    for (let i = j + 1; i < array.length; i++) {
      if (array[i] < lowestValue) {
        lowestIndex = i;
        lowestValue = array[i];
      }
      await drawArray({ highlights: [{ index: i, value: array[i] }] });
    }

    [array[j], array[lowestIndex]] = [array[lowestIndex], array[j]];
    await drawArray({ highlights: [{ index: j, value: array[j] }] });
  }
}
