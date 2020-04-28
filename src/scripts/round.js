import { Processor } from './algo'

export default class RoundRobin extends Processor {
  quantum = 2;

  select(queuedPs) {
    return queuedPs[0]
  }

  work(takenP, timestamp) {
    let timePassed = takenP.remainedTime >= this.quantum 
      ? this.quantum : takenP.remainedTime

    takenP.remainedTime = takenP.remainedTime - timePassed    
    let newTimestamp = timestamp + timePassed

    return newTimestamp
  }
}