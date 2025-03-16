
export interface Event {
    id: number
    date: string
    title: string
    color: string
  }
  
  export interface Task {
    date: string
    title: string
    description: string
    status: 'pending' | 'in-progress' | 'completed'  
    assignedTo: string  

  }