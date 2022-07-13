export async function insertionSortDraw(array, drawFunction, onCompletion) {
  await drawFunction();
  await insertionSort(array, drawFunction);
  onCompletion();
}

export async function insertionSort(array, drawFunction) {
  for (let j = 1; j < array.length; j++) {
    let key = array[j];
    let i = j - 1;
    while (i >= 0 && array[i] > key) {
      array[i + 1] = array[i];
      await drawFunction({ highlights: [{ index: i + 1, value: key }] });
      i -= 1;
    }

    array[i + 1] = key;
    await drawFunction({ highlights: [{ index: i + 1, value: key }] });
  }
}
