export class ArrayShifter {
  private intervalReference: number;

  constructor(private arrayLimit: number = 6, private interval: number = 2500) {
  }

  set intervalLength(interval: number) {
    this.interval = interval;
  }
  set arraySize(arrayLimit: number) {
    this.arrayLimit = arrayLimit;
  }

  shift(array, buffer) {
    let arrayLength = array.length;    
    let bufferLength = buffer.length;
    let newItems: any;

    if (arrayLength === 0) {
      let chunkSize = (bufferLength > this.arrayLimit) ? this.arrayLimit : bufferLength;
      newItems = buffer.splice(0, chunkSize);
      array.unshift(...newItems);
    }

    this.intervalReference = setInterval(() => {
      if (bufferLength > 0) {
        newItems = buffer.splice(0, 1);
        array.unshift(...newItems);
        array.pop();
      } else {
        this.reset();
      }

      arrayLength = array.length;
      bufferLength = buffer.length;

    }, this.interval);
  }

  reset() {
    clearInterval(this.intervalReference);
  }
}

