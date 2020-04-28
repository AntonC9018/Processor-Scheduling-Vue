import { Processor } from './algo'

// Shortest Job First
export default class SJF extends Processor {

  // take the process with least time
  select(queuedPs) {
    if (queuedPs[0]) {
      return queuedPs.slice(1).reduce(
        (a, p) => a.remainedTime > p.remainedTime ? p : a,
        queuedPs[0]
      )
    }      
  }

  // remove taken process
  updateQueueLeave(queuedPs, takenP) {
    return takenP 
      ? queuedPs.filter(p => p.id != takenP.id) 
      : queuedPs.slice()
  }
}