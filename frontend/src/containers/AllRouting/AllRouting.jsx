import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../UserAuth/LoginPage'
import Reg from '../UserAuth/Reg'
import ForgotPassword from '../UserAuth/ForgotPassword'
import ResetPassword from '../UserAuth/ResetPassword'
import ConfirmPasswordReset from '../UserAuth/ConfirmPasswordReset'
import ChangePassword from '../UserAuth/ChangePassword'
import UserDashboard from '../UserDashboard/UserDashboard'
import Quizz from '../Quizes/Quizz'
import Score from '../Quizes/Score'
import About from '../About/About'
import Footer from '../Footer/Footer'
import Blogs from '../Blogs/Blogs'
import Page0 from '../Blogs/BlogsPages/Page0'
import Page1 from '../Blogs/BlogsPages/Page1'
import Page2 from '../Blogs/BlogsPages/Page2'
import Page3 from '../Blogs/BlogsPages/Page3'
import Page4 from '../Blogs/BlogsPages/Page4'
import Page5 from '../Blogs/BlogsPages/Page5'
import Page6 from '../Blogs/BlogsPages/Page6'
import Page7 from '../Blogs/BlogsPages/Page7'
import Page8 from '../Blogs/BlogsPages/Page8'
import ExtraBlogs from '../Blogs/ExtraBlogs'
import Home from '../Landing/Home'

const AllRouting = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Reg/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/resetpassword' element={<ResetPassword/>}/>
            <Route path='/confirmpasswordreset' element={<ConfirmPasswordReset/>}/>
            <Route path='/changepassword' element={<ChangePassword/>}/>
            <Route path='/userdashboard' element={<UserDashboard/>}/>
            <Route path='/quizz/:difficulty' element={<Quizz/>}/>
            <Route path='/score/:result' element={<Score/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/blogs' element={<Blogs/>}/>
            <Route path='/extra' element={<ExtraBlogs/>}/>
            <Route path='/blogs/page0' element={<Page0/>}/>
            <Route path='/blogs/page1' element={<Page1/>}/>
            <Route path='/blogs/page2' element={<Page2/>}/>
            <Route path='/blogs/page3' element={<Page3/>}/>
            <Route path='/blogs/page4' element={<Page4/>}/>
            <Route path='/blogs/page5' element={<Page5/>}/>
            <Route path='/blogs/page6' element={<Page6/>}/>
            <Route path='/blogs/page7' element={<Page7/>}/>
            <Route path='/blogs/page8' element={<Page8/>}/>
            <Route path='/login' element={<LoginPage/>}/>
        </Routes>
        <Footer/>
    </div>
  )
}

export default AllRouting