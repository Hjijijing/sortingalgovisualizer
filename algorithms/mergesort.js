async function merge(A, p, q, r, drawArray) {
  let n1 = q - p + 1;
  let n2 = r - q;
  let L = [];
  let R = [];
  for (let i = 1; i <= n1; i++) {
    L[i] = A[p + i - 1];
  }
  for (let j = 1; j <= n2; j++) {
    R[j] = A[q + j];
  }
  L[n1 + 1] = Infinity;
  R[n2 + 1] = Infinity;

  let i = 1;
  let j = 1;
  for (let k = p; k <= r; k++) {
    if (L[i] <= R[j]) {
      A[k] = L[i];
      await drawArray({
        highlights: [{ index: k, value: A[k] }],
        dividers: [p, r + 1, q + 1],
      });
      i += 1;
    } else {
      A[k] = R[j];
      await drawArray({
        highlights: [{ index: k, value: A[k] }],
        dividers: [p, r + 1, q + 1],
      });
      j += 1;
    }
  }
}

export async function mergeSort(A, p, r, drawArray) {
  if (p < r) {
    let q = Math.floor((p + r) / 2);
    await mergeSort(A, p, q, drawArray);
    await mergeSort(A, q + 1, r, drawArray);
    await merge(A, p, q, r, drawArray);
  }
}

export async function mergeSortDraw(array, drawArray, onCompletion) {
  await drawArray();
  await mergeSort(array, 0, array.length - 1, drawArray);
  onCompletion();
}
