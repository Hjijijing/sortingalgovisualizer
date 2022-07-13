export async function quickSortDraw(array, drawArray, onCompletion) {
  await drawArray();
  await quickSort(array, 0, array.length - 1, drawArray);
  onCompletion();
}

export async function quickSort(array, p, r, drawArray) {
  if (p < r) {
    let pi = await partition(array, p, r, drawArray);
    await quickSort(array, p, pi - 1, drawArray);
    await quickSort(array, pi + 1, r, drawArray);
  }
}

export async function partition(array, p, r, drawArray) {
  let pi = array[r];

  let i = p - 1;

  for (let j = p; j <= r; j++) {
    if (array[j] < pi) {
      i++;
      [array[j], array[i]] = [array[i], array[j]];
      await drawArray({
        highlights: [{ index: i, value: array[i] }],
        dividers: [p, i, r + 1],
      });
    }
  }

  [array[i + 1], array[r]] = [array[r], array[i + 1]];
  await drawArray({
    highlights: [{ index: i + 1, value: array[i + 1] }],
    dividers: [p, i, r + 1],
  });
  return i + 1;
}
