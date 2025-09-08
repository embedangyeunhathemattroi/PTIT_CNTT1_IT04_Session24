
import './App.css'
import BookManager from './components/BookManager'
import CourseManager from './components/CourseManager'
import CustomerManager from './components/CustomerManager'
import EmployeeManager from './components/EmployeeManager'
import LessonManager from './components/LessonManager'
import OrderManager from './components/OrderManager'
import QuizManager from './components/QuizManager'
import RoomManager from './components/RoomManager'
import ScoreManager from './components/ScoreManager'
import StudentManager from './components/StudentManager'
import SubjectManager from './components/SubjectManager'
import TicketManager from './components/TicketManager'

function App() {

  return (
    <>
    <BookManager></BookManager>
    <CourseManager></CourseManager>
    <CustomerManager></CustomerManager>
    <EmployeeManager></EmployeeManager>
    <LessonManager></LessonManager>
    <OrderManager></OrderManager>
    <QuizManager></QuizManager>
    <RoomManager></RoomManager>
    <ScoreManager></ScoreManager>
    <StudentManager></StudentManager>
    <SubjectManager></SubjectManager>
    <TicketManager></TicketManager>
    </>
  )
}

export default App
