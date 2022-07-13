import { insertionSortDraw } from "./algorithms/insertionsort.js";
import { mergeSortDraw } from "./algorithms/mergesort.js";
import { bubbleSortDraw } from "./algorithms/bubblesort.js";
import { selectionSortDraw } from "./algorithms/selectionsort.js";
import { quickSortDraw } from "./algorithms/quicksort.js";
import { createDataSet } from "./datasets/datasets.js";

let maxValue = 100;
let drawDelay = 10;
let backgroundColor = "black";
let borderColor = "white";
let dividerColor = "white";
let dividerWidth = 0.3;
let highlightColor = "#FFFFFFC8";
let frameSize = 5;
let margin = 20;

let rows = 3;
let columns = 2;

const visualize = [
  { label: "Insertion Sort", algo: insertionSortDraw },
  { label: "Merge Sort", algo: mergeSortDraw },
  { label: "Bubble Sort", algo: bubbleSortDraw },
  { label: "Selection Sort", algo: selectionSortDraw },
  { label: "Quick Sort", algo: quickSortDraw },
];

window.setup = function () {
  createCanvas(innerWidth, innerHeight).position(0, 0);
  noLoop();
  background(backgroundColor);

  let [dataset, comparison] = createDataSet(maxValue);

  let visW = width / columns;
  let visH = height / rows;

  for (let i = 0; i < visualize.length; i++) {
    const { label, algo } = visualize[i];
    const column = i % columns;
    const row = floor(i / columns);

    let set = [...dataset];

    let visualizer = visualizeArray(
      column * visW + margin,
      row * visH + margin,
      visW - margin * 2,
      visH - margin * 2,
      set,
      comparison,
      label
    );

    algo(set, visualizer.draw, () => {
      visualizer.setLabel(label + " - complete");
      visualizer.draw();
    });
  }

  push();
  fill("white");
  noStroke();

  for (let column = 1; column < columns; column++) {
    rect(column * visW - frameSize / 2, 0, frameSize, height);
  }

  for (let row = 1; row < rows; row++) {
    rect(0, row * visH - frameSize / 2, width, frameSize);
  }

  pop();
};

const visualizeArray = (visX, visY, visW, visH, array, comparison, label) => {
  let graphics = createGraphics(visW, visH);

  return {
    setLabel: (l) => {
      label = l;
    },
    draw: async ({ dividers = [], highlights = [] } = {}) => {
      graphics.push();

      graphics.fill(backgroundColor);
      graphics.rect(0, 0, visW, visH);

      const barWidth = visW / array.length;

      if (barWidth > 10) {
        graphics.stroke(borderColor);
        graphics.strokeWeight(barWidth * 0.1);
      } else graphics.noStroke();

      graphics.noStroke();

      for (let i = 0; i < array.length; i++) {
        let barColor = getColor(i, array, comparison);
        graphics.fill(barColor);

        let barHeight = (array[i] / maxValue) * visH;
        graphics.rect(barWidth * i, visH, barWidth, -barHeight);
      }

      for (let i = 0; i < highlights.length; i++) {
        let { index, value } = highlights[i];
        graphics.fill(highlightColor);
        let barHeight = (value / maxValue) * visH;
        graphics.rect(barWidth * index, visH, barWidth, -barHeight);
      }

      for (let i = 0; i < dividers.length; i++) {
        let index = dividers[i];
        graphics.fill(dividerColor);
        let w = Math.max(1, barWidth * dividerWidth);
        graphics.rect(barWidth * index - w / 2, visH, w, -visH);
      }

      if (label) {
        graphics.fill(borderColor);
        graphics.textSize(visH * 0.1);
        graphics.textAlign(LEFT, TOP);
        graphics.text(label, 0, 0);
      }

      graphics.pop();

      image(graphics, visX, visY, visW, visH);

      await wait(drawDelay);
    },
  };
};

function wait(time) {
  return new Promise((res) => {
    setTimeout(res, time);
  });
}

function getColor(index, dataset) {
  push();
  colorMode(HSB);

  let ratio = (dataset[index] / maxValue) * 40 + 60;
  let result = color(240, 75, ratio);
  pop();
  return result;
}
