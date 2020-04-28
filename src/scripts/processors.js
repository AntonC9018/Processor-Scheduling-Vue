
import { Processor } from './algo'
import RoundRobin from './round'
import SJF from './sjf'
import SRTF from './srtf'

export default [
  [ 'First Come First Served', Processor ],
  [ 'Round Robin', RoundRobin ],
  [ 'Shortest Job First', SJF ],
  [ 'Shortest Remaining Time', SRTF ]
]
