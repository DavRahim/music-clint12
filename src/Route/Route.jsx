import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../components/Home/Home/Home";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import InstructorsPage from "../components/InstructorsPage/InstructorsPage";
import ClassPage from "../components/ClassPage/ClassPage";
import Dashboard from "../components/Dashbord/Dashbord/Dashbord";
import MySelectClass from "../components/Dashbord/StudentDashbord/MySelectClass";
import MyEnrolledClass from "../components/Dashbord/StudentDashbord/MyEnrolledClass";
import MyPaymentHistory from "../components/Dashbord/StudentDashbord/MyPaymentHistory";
import AddClass from "../components/Dashbord/InstructorDashboard/AddClass";
import MyClasses from "../components/Dashbord/InstructorDashboard/MyClasses";
import TotalEnrolledStudent from "../components/Dashbord/InstructorDashboard/TotalEnrolledStudent";
import Feedback from "../components/Dashbord/InstructorDashboard/Feedback";
import UpdateClass from "../components/Dashbord/InstructorDashboard/UpdateClass";
import ManageClasses from "../components/Dashbord/AdminDashbord/ManageClasses";

import ManageUsers from "../components/Dashbord/AdminDashbord/ManageUsers";
import AdminRoute from "../components/Providers/AdminRoute";
import Payment from "../components/Payment/Payment";
import InstructorsRoute from "../components/Providers/InstructorsRoute";
import AdminFeedback from "../components/Dashbord/AdminDashbord/AdminFeedback";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import PrivateRoute from "../components/Providers/PrivateRoute";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "instructor", element: <InstructorsPage /> },
      {
        path: "classes",
        element: <ClassPage></ClassPage>,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      // student route
      {
        path: "myselectclass",
        element: (
          <PrivateRoute>
            {" "}
            <MySelectClass />
          </PrivateRoute>
        ),
      },
      {
        path: "myenrolledclass",
        element: (
          <PrivateRoute>
            <MyEnrolledClass />
          </PrivateRoute>
        ),
      },
      {
        path: "paymenthistory",
        element: (
          <PrivateRoute>
            {" "}
            <MyPaymentHistory />
          </PrivateRoute>
        ),
      },
      // instructor route
      {
        path: "addclass",
        element: (
          <InstructorsRoute>
            <AddClass />
          </InstructorsRoute>
        ),
      },
      {
        path: "myclass",
        element: (
          <InstructorsRoute>
            <MyClasses />
          </InstructorsRoute>
        ),
      },
      {
        path: "totalenrolle",
        element: (
          <InstructorsRoute>
            <TotalEnrolledStudent />
          </InstructorsRoute>
        ),
      },
      {
        path: "feedback",
        element: (
          <InstructorsRoute>
            <Feedback />
          </InstructorsRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          <InstructorsRoute>
            <UpdateClass />
          </InstructorsRoute>
        ),
        loader: ({ params }) =>
          fetch(` https://music-server-davrahim.vercel.app/addclass/${params.id}`),
      },
      //admin route
      {
        path: "manageclass",
        element: (
          <AdminRoute>
            <ManageClasses />
          </AdminRoute>
        ),
      },
      {
        path: "manageuser",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "adminfeedback/:id",
        element: (
          <AdminRoute>
            <AdminFeedback />
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(` https://music-server-davrahim.vercel.app/addAllclass/${params.id}`),
      },
      //payment
      {
        path: "payment",
        element: <Payment />,
      },
    ],
  },
]);

export default Route;