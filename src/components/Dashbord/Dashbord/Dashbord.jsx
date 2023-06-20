import { NavLink, Outlet } from "react-router-dom";
import useMyClass from "../../hooks/useMyClass";
import useAdmin from "../../hooks/useAdmin";
import useInstructors from "../../hooks/useInstructors";
const Dashboard = () => {
 const [myClass] = useMyClass();

//  const isInstructor = false; 
//  const isAdmin = false;

const [isAdmin] = useAdmin(); 
const [isInstructor] = useInstructors();



  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center py-8 bg-gray-50">
        {/* Page content here */}
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu p-4 w-80 h-full bg-[#B38B37] text-base-content">
          {/* Sidebar content here */}

          {isInstructor ? (
            <>
              <h2 className="text-2xl font-semibold text-center mb-5">
                Instructor Dashboard
              </h2>
              <li>
                <NavLink to="/dashboard/addclass">Add a Class</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myclass">My Classes</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/totalenrolle">
                  Total Enrolled Students
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/feedback">Feedback</NavLink>
              </li>
            </>
          ) : isAdmin ? (
            <>
              <h2 className="text-2xl font-semibold text-center mb-5">
                Admin Dashboard
              </h2>
              <li>
                <NavLink to="/dashboard/manageclass">Manage Classes</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageuser">Manage Users</NavLink>
              </li>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-center mb-5">
                Student Dashboard
              </h2>
              <li>
                <NavLink to="/dashboard/myselectclass">
                  My Selected Classes{" "}
                  <div className="badge">+ {myClass.length}</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myenrolledclass">
                  My Enrolled Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymenthistory">
                  My payment history
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
