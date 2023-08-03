import React, { useContext } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Home from "../Home/Home"
import Companies from "../companies/Companies"
import LoginForm from "../profile/LoginForm"
import UserContext from "../profile/UserContext"
import CompanyDetails from "../companies/CompanyDetail"
import Jobs from "../jobs/Jobs"
import NewUserForm from "../profile/NewUserForm"
import EditUserForm from "../profile/EditUserForm"






const MyRoutes = () => {
    const { loginUser, registerUser, updateUser } = useContext(UserContext);

    return (
        <div>
            <Routes>
                
                <Route path = "/" element = {<Home />} />

                <Route path = "/companies" element = {<Companies />} />

                <Route path ="/companies/:handle" element={<CompanyDetails />} />

                <Route path="/jobs" element={<Jobs />} />

                <Route path="/login" element={<LoginForm loginUser={loginUser}/>} />

                <Route path="/signup" element={<NewUserForm registerUser={registerUser} />} />

                <Route path="/profile" element={<EditUserForm updateUser={updateUser} />} />


                <Route path="*" element={<Navigate replace to="/" />} />

            </Routes>
        </div>

    )
}

export default MyRoutes;