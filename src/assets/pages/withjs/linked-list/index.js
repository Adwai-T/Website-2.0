import { Canvas, Circle, Line, Point, Vector2i, Rectangle } from "../../../library/Canvas.js";

//--- LinkedList DataStructure
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class LinkedList {
  head;
  tail;
  length;
  constructor(value) {
    this.head = new Node(value);
    this.tail = this.head;
    this.length = 1;
  }

  _initiateEmptyList(value) {
    this.head = new Node(value);
    this.tail = this.head;
    this.length++;
    return;
  }

  append(value) {
    if (this.length === 0) {
      this._initiateEmptyList(value);
      return this;
    }
    const newNode = new Node(value);
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
  }

  prepend(value) {
    if (this.length === 0) {
      this._initiateEmptyList(value);
      return this;
    }
    let currentHead = this.head;
    this.head = new Node(value);
    this.head.next = currentHead;
    this.length++;
  }

  insert(value, index) {
    if (this.length === 0) {
      this._initiateEmptyList(value);
      return this;
    }

    if (index >= this.length) {
      this.append(value);
      return this;
    }

    if (index <= 0) {
      this.prepend(value);
      return this;
    }

    let prevNode = this.traverseToIndex(index - 1);
    let laterNode = prevNode.next;
    prevNode.next = new Node(value);
    prevNode.next.next = laterNode;
    this.length++;
    return this;
  }

  search(value) {
    let index = 0;
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.value === value) return index;
      index++;
      currentNode = currentNode.next;
    }
    return null;
  }

  traverseToIndex(index) {
    if (index >= this.length) index = this.length - 1;
    if (index <= 0) return this.head;

    let counter = 0;
    let currentNode = this.head;
    while (counter !== index && currentNode !== null) {
      currentNode = currentNode.next;
      counter++;
    }
    return currentNode;
  }

  removeAtIndex(index) {
    if (index >= this.length || index < 0) return null;

    if (index === 0) {
      if (this.length === 1) this.tail = null;
      const removedValue = this.head.value;
      this.head = this.head.next;
      this.length--;
      return removedValue;
    }

    let prevNode = this.traverseToIndex(index - 1);
    if (index === this.length - 1) this.tail = prevNode;
    let toRemoveNode = prevNode.next;
    let removedValue = toRemoveNode.value;
    prevNode.next = toRemoveNode.next;
    this.length--;
    return removedValue;
  }

  remove(value) {
    let counter = 0;
    let currentNode = this.head;
    let prevNode = null;
    while (currentNode !== null) {
      if (currentNode.value === value) {
        let removedValue = currentNode.value;

        if (prevNode !== null) prevNode.next = currentNode.next;
        else this.head = currentNode.next;

        if (counter === this.length - 1) this.tail = prevNode;
        this.length--;
        return removedValue;
      }
      prevNode = currentNode;
      currentNode = currentNode.next;
      counter++;
    }
    return null;
  }

  printToConsole() {
    if (this.length === 0) {
      console.log(
        `Length : ${this.length}. Head : ${this.head}, Tail : ${this.tail}`
      );
      return;
    }
    console.log(
      `Length : ${this.length}, Head : ${this.head.value}, Tail : ${this.tail.value}`
    );
    let currentNode = this.head;
    while (currentNode !== null) {
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
  }
}

//--- Canvas Demo
//- Variables
let _screenWidth = screen.width;
let _screenHeight = screen.height;
const MAX_CANVAS_WIDTH = 600;
const MAX_CANVAS_HEIGHT = MAX_CANVAS_WIDTH * 2/3;
let currentWindowWidth = window.innerWidth;
let currentWindowHeight = window.innerHeight;
const CANVAS_HEIGHT = _screenWidth > MAX_CANVAS_WIDTH ? MAX_CANVAS_HEIGHT : _screenWidth * 2/3;
const CANVAS_WIDTH = _screenWidth > MAX_CANVAS_WIDTH ? MAX_CANVAS_WIDTH : _screenWidth * 0.95;
const CIRCLE_RADIUS = _screenWidth > MAX_CANVAS_WIDTH ? 25 : CANVAS_WIDTH * 0.04;
const DISTANCE_BETWEEN_CIRCLES = _screenWidth > MAX_CANVAS_WIDTH ? 30 : CANVAS_WIDTH * 0.04;;
const DISTANCE_BETWEEN_CENTER_OF_CIRCLES = 2*CIRCLE_RADIUS + DISTANCE_BETWEEN_CIRCLES;
const START_POINT_X = CANVAS_WIDTH * 0.1;
const START_POINT_Y = CANVAS_WIDTH * 0.1;
const FONT = 'bold 20px serif';
const TEXT_ALIGN = 'alphabetic';
const NUMBER_OF_NODES_IN_A_ROW = 7;
const CANVAS_BACKGROUND_COLOR = '#F7F7F7'

//-Create Canvas
const canvas = new Canvas(CANVAS_WIDTH, CANVAS_HEIGHT, "canvas-div", "demo");
canvas.setStyle(
  "border:none;" +
    "box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
);
const ctx = canvas.ctx;
//- Set Control panel according to canvas size.
document.getElementById("control-panel").style= `width:${CANVAS_WIDTH *0.9}; height:auto;`;

//- Support functions
function getLineJoiningCirclesHorizontally(center, radius, dist, direction) {
  let pointOnCircle;
  let endPoint;

  if(direction === 'right') {
    pointOnCircle = new Point(center.x - radius, center.y);
    endPoint = new Point(center.x-radius-dist, center.y)
  }
  else if(direction === 'down') {
    pointOnCircle = new Point(center.x, center.y-radius);
    endPoint = new Point(center.x, center.y-radius-dist);
  }
  else if(direction === 'left') {
    pointOnCircle = new Point(center.x+radius, center.y);
    endPoint = new Point(center.x+radius+dist, center.y)
  }
  return new Line(pointOnCircle, endPoint);
}

/**
 * @param {LinkedList} list 
 * @param {HTMLCanvasElement.context} ctx
 * @param {number} markIndex - array at which the circles are filled;
 * @returns 
 */
function drawCircleForEachElement(list, ctx, markIndex) {
  if(!list) return;
  let currentNode = list.head;
  let drawAt = new Vector2i(START_POINT_X, START_POINT_Y);
  let goRight = true;
  let firstNodeDown = false;

  let counter = 0;
  while(currentNode) {
    let circleColor = 'pink';
    let fontColor = 'darkblue'
    if(counter === 0) circleColor = 'green'; //for head
    else if(counter === list.length -1) circleColor = 'red'; //for tail
    let isSolid = counter === markIndex ? true : false; //for selected/searched
    
    new Circle(drawAt, CIRCLE_RADIUS, circleColor, false, 3)
      .drawWithStringInside(ctx, circleColor, currentNode.value.toString(), fontColor, FONT, TEXT_ALIGN, null, isSolid);

    //-- Joining Line
    if(counter > 0) {
      let direction = '';
      if(goRight) direction = 'right';
      if(!goRight) direction = 'left';
      if(counter%NUMBER_OF_NODES_IN_A_ROW === 0) direction = 'down';
      let lineConnect = getLineJoiningCirclesHorizontally(drawAt, CIRCLE_RADIUS, DISTANCE_BETWEEN_CIRCLES, direction);
      lineConnect.draw(ctx, 'black', 2);

      //-Arrows
      let arrowHeight = 10;
      let arrowThickness = 6;
      let arrowEnd = lineConnect.point1;
      let pointTop;
      let pointBottom;
      if(direction === 'right') {
        pointTop = new Point(arrowEnd.x-arrowHeight, arrowEnd.y-arrowThickness);
        pointBottom = new Point(arrowEnd.x-arrowHeight, arrowEnd.y+arrowThickness);
      }else if(direction === 'left') {
        pointTop = new Point(arrowEnd.x+arrowHeight, arrowEnd.y-arrowThickness);
        pointBottom = new Point(arrowEnd.x+arrowHeight, arrowEnd.y+arrowThickness);
      }else if(direction === 'down') {
        pointTop = new Point(arrowEnd.x+arrowThickness, arrowEnd.y-arrowHeight);
        pointBottom = new Point(arrowEnd.x-arrowThickness, arrowEnd.y-arrowHeight);
      }
      new Line(arrowEnd, pointTop).draw(ctx, 'black', 3);
      new Line(arrowEnd, pointBottom).draw(ctx, 'black', 3);
      new Line(pointTop, pointBottom).draw(ctx, 'black', 3);
    }
    
    counter++;
    firstNodeDown = false;
    if(counter%NUMBER_OF_NODES_IN_A_ROW === 0 && counter !== 0) {
      drawAt.addVector(new Vector2i(0, DISTANCE_BETWEEN_CENTER_OF_CIRCLES));
      goRight = !goRight;
      firstNodeDown = true;
    }

    if(goRight && !firstNodeDown) drawAt.addVector(new Vector2i(DISTANCE_BETWEEN_CENTER_OF_CIRCLES, 0));
    else if(!goRight && !firstNodeDown) drawAt.addVector(new Vector2i(-DISTANCE_BETWEEN_CENTER_OF_CIRCLES, 0));
    currentNode = currentNode.next;
  }
  return true;
}

//--- Linked List Displayed
let list;
//---

//--- Functions
function clearCanvasAndReDrawList(markIndex) {
  canvas.clearCanvas();
  new Rectangle(new Vector2i(0, 0), new Vector2i(CANVAS_WIDTH, CANVAS_HEIGHT)).draw(ctx, CANVAS_BACKGROUND_COLOR);
  drawCircleForEachElement(list, ctx, markIndex);
}

function toggleElementVisibility(element) {
  element.style.display = element.style.display === 'none' ? 'block' : 'none';
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * eg '[10, 20, 30]' -> [10, 20, 30]. Might contain NaN if the array has non-integer values
 * @param {string} string 
 * @returns {number[]}
 */
function numberArrayFromString(string) {
  let values = string.split(",");
  values[0] = values[0].substring(1)
  let lastValue = values[values.length-1];
  lastValue = lastValue.substring(0, lastValue.length-1);
  values[values.length-1] = lastValue;
  values.forEach((value, i)=>values[i]=parseInt(value));
  values = values.filter(value=>!isNaN(value));
  return values;
}

function createRandomList(length) {
  list = null;
  list = new LinkedList(getRandomInt(100));
  while(length-1 > 0) {
    list.append(getRandomInt(100));
    length--;
  }
}

function clearList() {
  list = null;
}

function insertAtTail(value) {
  if(!list) list = new LinkedList(value);
  else list.append(value); 
}

function insertAtHead(value) {
  if(!list) list = new LinkedList(value);
  else list.prepend(value);
}

function insertAtIndex(value, index) {
  if(!list) list = new LinkedList(value);
  else list.insert(value, index);
}

//--- Assign Buttons
const controls = {
  //-- create linked list
  create : document.getElementById('button-create'),
  createText : document.getElementById('text-create'),
  random : document.getElementById('button-create-random'),
  fromArray : document.getElementById('button-create-array'),

  //-- insert in linked list
  insert : document.getElementById('button-insert'),
  insertText : document.getElementById('text-insert'),
  atTail : document.getElementById('button-insert-tail'),
  atHead : document.getElementById('button-insert-head'),
  insertAtIndex : document.getElementById('button-insert-at-index'),

  //-- search
  search : document.getElementById('button-search'),
  searchText : document.getElementById('text-search'),

  //-- remove
  remove : document.getElementById('button-remove'),
  removeText : document.getElementById('text-remove'),
  removeByValue : document.getElementById('button-remove-by-value'),
  removeAtIndex : document.getElementById('button-remove-at-index'),
  
  //-- clear linked list
  clear : document.getElementById('button-clear'),
}

controls.create.onclick = ()=>{
  toggleElementVisibility(controls.createText);
  toggleElementVisibility(controls.random);
  toggleElementVisibility(controls.fromArray);
}

controls.insert.onclick = ()=>{
  toggleElementVisibility(controls.atHead);
  toggleElementVisibility(controls.atTail);
  toggleElementVisibility(controls.insertAtIndex);
  toggleElementVisibility(controls.insertText);
}

controls.remove.onclick= ()=>{
  toggleElementVisibility(controls.removeText);
  toggleElementVisibility(controls.removeAtIndex);
  toggleElementVisibility(controls.removeByValue);
}

controls.search.onclick = ()=>{
  let value = parseInt(controls.searchText.value);
  if(isNaN(value)) return;
  let index = list.search(value);
  clearCanvasAndReDrawList(index);
}

controls.random.onclick=()=>{
  let value = parseInt(controls.createText.value);
  if(isNaN(value)) return;
  createRandomList(value);
  clearCanvasAndReDrawList();
}

controls.fromArray.onclick=()=>{
  clearList();
  let value = controls.createText.value;
  let arr = numberArrayFromString(value);
  arr.forEach(value=> insertAtTail(value));
  clearCanvasAndReDrawList();
}

controls.atHead.onclick =()=>{
  let value = parseInt(controls.insertText.value);
  if(isNaN(value)) return;
  insertAtHead(value);
  clearCanvasAndReDrawList();
}

controls.atTail.onclick =()=>{
  let value = parseInt(controls.insertText.value);
  if(isNaN(value)) return;
  insertAtTail(value);
  clearCanvasAndReDrawList();
}

controls.insertAtIndex.onclick =()=>{
  let values = controls.insertText.value.split(',');
  const value = parseInt(values[0]);
  const index = parseInt(values[1]);
  if(isNaN(value) || isNaN(index)) return;
  insertAtIndex(value, index);
  clearCanvasAndReDrawList();
}

controls.removeByValue.onclick= ()=>{
  let value = parseInt(controls.removeText.value);
  if(isNaN(value)) return;
  list.remove(value);
  clearCanvasAndReDrawList();
}

controls.removeAtIndex.onclick= ()=>{
  let index = parseInt(controls.removeText.value);
  if(isNaN(index)) return;
  list.removeAtIndex(index);
  clearCanvasAndReDrawList();
}

controls.clear.onclick = ()=>{
  clearList();
  canvas.clearCanvas();
}
