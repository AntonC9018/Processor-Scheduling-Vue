
export class Process {
  id;
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

// Processor base class
// By default, a non-preemptive FCFS
// aka First-Come-First-Served
export class Processor {

  params = []

  constructor() {
    for (let param of this.params) {
      this[param.name] = param.defaultValue
    }
  }

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
    
    let processorStates = [initialState]
    let actives         = [null]
    let takenP

    function pushState() {
      processorStates.push({
        coming: comingPs,
        waiting: queuedPs,
        finished: finishedPs,
        timestamp: timestamp
      })
    }

    // for now, assume they come in sorted
    while (finishedPs.length !== processCount) {      

      // if no processes to process currently
      if (queuedPs.length == 0 && !takenP && comingPs[0].arrivalTime > timestamp) {
        // wait until the first processes arrives
        pushState()
        actives.push(null)
        timestamp = comingPs[0].arrivalTime
      }

      // let some processes in
      let updatedPs = this.letPsIn(comingPs, timestamp)
      queuedPs = queuedPs.concat(updatedPs.enteredPs)
      comingPs = updatedPs.comingPs 
      
      // put back the previous process
      queuedPs = this.updateQueueEnter(queuedPs, takenP)
      // select a new process
      takenP = this.select(queuedPs, timestamp)
      // remove process from list + shuffle it if needed
      queuedPs = this.updateQueueLeave(queuedPs, takenP)

      // from now until the next state using this process
      pushState()     
      actives.push(takenP)
      
      // work on the process
      takenP = Object.assign({}, takenP)
      timestamp = this.work(takenP, timestamp)

      if (takenP.remainedTime == 0) {
        // the process has finished
        finishedPs = finishedPs.concat(takenP)
        takenP = null
      }

    }
    // save the final state
    pushState()
    actives.push(null)

    // Could have debugged it further, but I'm kind of sick of it already
    return {
      processorStates,
      actives
    }
  }

  select(queuedPs) {
    return queuedPs[0]
  }

  work(takenP, timestamp) {
    let newTimestamp = timestamp + takenP.remainedTime
    takenP.remainedTime = 0
    return newTimestamp
  }

  updateQueueEnter(queuedPs, takenP) {
    if (takenP && takenP.remainedTime !== 0) {
      return [...queuedPs, takenP]
    }
    return queuedPs.slice(0)
  }

  updateQueueLeave(queuedPs, takenP) {
    return takenP ? queuedPs.slice(1) : queuedPs.slice(0)
  }

  computeArrivalStates(processorStates) {
    let arrivals = []

    for (let i = 0; i < processorStates.length - 1; i++) {
      arrivals[i] = [ processorStates[i] ]
      let nextTimestamp = processorStates[i + 1].timestamp
      let latestWaiting = processorStates[i].waiting
      for (let j = 0; j < processorStates[i].length; j++) {
        if (processorStates[i].coming[j].arrivalTime <= nextTimestamp) {
          latestWaiting = latestWaiting.concat(processorStates[i].coming[j])
          arrivals[i].push({
            timestamp: processorStates[i].coming[j].arrivalTime,
            processes: processorStates[i].coming.slice(j + 1),
            waiting: latestWaiting
          })
        } else { 
          break;
        }
      }
    }
    arrivals[processorStates.length - 1] = 
      processorStates[processorStates.length - 1]

    return arrivals;
  }

}
