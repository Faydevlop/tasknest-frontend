import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { Task } from '../types/calendarTypes'
import { formatDate } from '../utils/dateUtils'
import { TaskAPI } from '../services/api'
import { RootState } from '../store' // Adjust the import path according to your project structure
import { useSelector } from 'react-redux'


interface CalendarContextType {
  currentDate: Date
  setCurrentDate: (date: Date) => void
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  tasks: Task[]
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
  modalDate: Date | null
  setModalDate: (date: Date | null) => void
  taskTitle: string
  setTaskTitle: (title: string) => void
  addTask: (date: Date, title: string,description:string,status:string,assignedTo:string) => void
  deleteTask:(taskId:string) => void
  updateTask:(taskData:any) => void
  taskDescription: string
  setTaskDescription: (description: string) => void
  taskStatus: "pending" | "completed" | "in-progress"
  setTaskStatus: (status: "pending" | "completed" | "in-progress") => void
  assignedTo: string
  setAssignedTo: (assignedTo: string) => void
  isLoading: boolean
  error: string | null
  users: { _id: string; name: string }[]
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined)

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1))
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 16))
  const [tasks, setTasks] = useState<Task[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalDate, setModalDate] = useState<Date | null>(null)
  const [users, setUsers] = useState([])
  const [taskTitle, setTaskTitle] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskStatus, setTaskStatus] = useState<"pending" | "completed" | "in-progress">("pending")
  const [assignedTo, setAssignedTo] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useSelector((state: RootState) => state.auth);   


  useEffect(() => {
    const fetchUsers = async () => {
      try {
      if (user) {
        const response = await TaskAPI.getAllUsers()
        const Employee = response.users.filter((user: { role: string }) => user.role === "Employee")
        setUsers(Employee)
      } else {
        setError('User is not authenticated.')
      }
        
        
      } catch (err) {
        console.error('Error fetching users:', err)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const fetchTasks = async () => {
        if (!user?._id) return  

      setIsLoading(true)
      try {

        const tasksData = await TaskAPI.getAllTasks()
        setTasks(tasksData)
        
        
      } catch (err) {
        setError('Failed to load tasks. Please try again later.')
        console.error('Error loading tasks:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTasks()
  }, [])

  const addTask = async (date: Date, title: string,description:string,status:string,assignedTo:string) => {
    
    setIsLoading(true)
    if (!user) {
      setError('User is not authenticated.')
      setIsLoading(false)
      return
    }
    const newTask = { date: formatDate(date), title, description: description, status: status, assignedTo, assignedBy: user._id }
    
    
    try {
      const createdTask = await TaskAPI.createTask(newTask as Omit<Task, "id">)

       // Re-fetch tasks after adding a new task
    const tasksData = await TaskAPI.getAllTasks();
    setTasks(tasksData);

      setTasks(prevTasks => [...prevTasks, createdTask])
      setIsModalOpen(false)
      setTaskTitle("")
      setTaskDescription("")
      setTaskStatus("pending")
      setAssignedTo("")
    } catch (err) {
      setError('Failed to create task. Please try again.')
      console.error('Error creating task:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTask = async(taskId:any)=>{

    await TaskAPI.deleteTask(taskId)
    const tasksData = await TaskAPI.getAllTasks()
    setTasks(tasksData)

  }

  const updateTask = async(taskData:any)=>{
    await TaskAPI.updateTask(taskData)
    const tasksData = await TaskAPI.getAllTasks()
    setTasks(tasksData)
  }

  return (
    <CalendarContext.Provider
      value={{ currentDate, setCurrentDate, selectedDate, setSelectedDate, tasks, isModalOpen, setIsModalOpen, modalDate, setModalDate, taskTitle, setTaskTitle, addTask, taskDescription, setTaskDescription, taskStatus, setTaskStatus, assignedTo, setAssignedTo, isLoading, error, users,deleteTask,updateTask }}>
      {children}
    </CalendarContext.Provider>
  )
}

export const useCalendar = () => {
  const context = useContext(CalendarContext)
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider')
  }
  return context
}
