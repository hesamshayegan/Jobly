import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import UserContext from "../profile/UserContext";
import "./Home.css";

const Home = () => {
    // const { currUser } = useContext(UserContext);
    // const content = currUser ? (
    //     <div>
    //         <h2> Hi <span> {currUser.username} </span></h2>
    //         <p> Search your future jobs here ! </p>
    //     </div>
    // ) : (
    //     <div>
    //         <p> All the jobs in one, convenient place. </p>
    //         <Button color="secondary" className="mx-2">
    //             <Link to="/login"> Login </Link>
    //         </Button>
    //         <Button color="secondary" className="mx-2">
    //             <Link to="/Signup"> Signup </Link>
    //         </Button>
    //     </div>
    // );

    const { currentUser } = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);

    useEffect(() => {
        // Add the class to hide overflow
        document.body.classList.add('overflow-hidden');
    
        // Clean up by removing the class when the component unmounts
        return () => {
          document.body.classList.remove('overflow-hidden');
        };
      }, []);

    return (
        <div className="Home-container">
           <div className="container text-center">
            <h1 className="mb-3 font-weight-bold">Explore & Apply for Jobs with Jobly</h1>
            <p className="lead">
            Apply discreetly through one-click applications. Review compensation details, including salary and equity.
            </p>
            
          {currentUser
              ? <h2>
                Welcome Back, {currentUser.firstName || currentUser.username}!
              </h2>
              : (
                  <p>
                    <Button color="secondary" className="mx-2">
                        <Link to="/login"> Login </Link>
                    </Button>
                    <Button color="secondary" className="mx-2">
                        <Link to="/Signup"> Signup </Link>
                    </Button>
                    <p> To explore and test out the features, feel free to log in using the username 'testuser' and the password 'password'. </p>
                  </p>
                  
              )}
        </div> 
        </div>
    );
};

export default Home;
