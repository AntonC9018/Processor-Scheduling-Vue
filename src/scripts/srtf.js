import SJF from './sjf'

// Shortest remaining time
// Preemtive version of SJF
export default class SRTF extends SJF {
  
  params = [
    { name: 'quantum', defaultValue: 2 }
  ]


  // same logic as Round Robin + SJF
  work(takenP, timestamp) {
    let timePassed = takenP.remainedTime >= this.quantum 
      ? this.quantum : takenP.remainedTime

    takenP.remainedTime = takenP.remainedTime - timePassed    
    let newTimestamp = timestamp + timePassed

    return newTimestamp
  }
}