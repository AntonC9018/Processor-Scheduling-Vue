
export class Process {
  arrivalTime;
  executionTime;
  remainedTime;

  constructor(data) {
    this.id = data.id;
    this.arrivalTime = data.arrivalTime;
    this.executionTime = data.executionTime;
    this.remainedTime = data.executionTime;
  }
}

// type State {
//   waiting;
//   active;
//   finished;
//   coming;
//   timestamp;
// }

export class Processor {

  test = "test";

  letPsIn(comingPs, timestamp) {
    // let new process come
    let lastIndex = -1
    for (let i = 0; i < comingPs.length; i++) {
      if (comingPs[i].arrivalTime <= timestamp) {
        lastIndex = i
      }
      else {
        break;
      }
    }
    return {
      enteredPs: comingPs.slice(0, lastIndex + 1),
      comingPs: comingPs.slice(lastIndex + 1)
    }
  }

  computeStates(initialState) {
    let processCount =
      initialState.waiting.length
      + initialState.coming.length
      + initialState.finished.length
    let queuedPs = initialState.waiting
    let comingPs = initialState.coming
    let finishedPs = initialState.finished
    let timestamp = initialState.timestamp
    let states = [initialState]
    // for now, assume they come in sorted
    while (finishedPs.length !== processCount) {
      // if no processes to process currently
      if (queuedPs.length == 0 && comingPs[0].arrivalTime > timestamp) {
        // wait until the first processes arrives
        timestamp = comingPs[0].arrivalTime
      }

      // let some processes in
      let updatedPs =
        this.letPsIn(comingPs, timestamp)
      // update lists
      queuedPs =
        queuedPs.concat(updatedPs.enteredPs)
      comingPs = updatedPs.comingPs

      let takenP
      ({ takenP, timestamp } =
        this.work(queuedPs, timestamp))

      queuedPs =
        this.updateQueue(queuedPs, takenP)

      if (takenP.remainedTime == 0) {
        // the process has finished
        finishedPs = finishedPs.concat(takenP)
      }
      // save states of objects
      states.push(
        {
          waiting: queuedPs,
          coming: comingPs,
          finished: finishedPs,
          active: takenP,
          timestamp
        }
      )
    }
    return states
  }

  work(queuedPs, timestamp) {
    // just go with the first process for now
    let takenP = Object.assign({}, queuedPs[0])
    let newTimestamp = timestamp + takenP.remainedTime
    takenP.remainedTime = 0
    return {
      takenP,
      timestamp: newTimestamp
    }
  }

  updateQueue(queuedPs) {
    return queuedPs.slice(1)
  }

}

export var processors = {
  simple: Processor
}