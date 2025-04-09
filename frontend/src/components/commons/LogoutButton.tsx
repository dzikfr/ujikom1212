import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      sessionStorage.removeItem("is_login");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("role");
      navigate("/");
    }
  };

  return (
    <button className="btn btn-error m-8 mr-16" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
