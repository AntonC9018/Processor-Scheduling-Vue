import { Processor } from './algo'

export default class RoundRobin extends Processor {
  params = [
    { name: 'quantum', defaultValue: 2 }
  ]

  // just work on the process less time
  work(takenP, timestamp) {
    let timePassed = takenP.remainedTime >= this.quantum 
      ? this.quantum : takenP.remainedTime

    takenP.remainedTime = takenP.remainedTime - timePassed    
    let newTimestamp = timestamp + timePassed

    return newTimestamp
  }
}