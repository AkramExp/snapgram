import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useLogoutUser } from "@/react-query/user";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { logoutUser } = useLogoutUser();
  const { user } = useUserContext();

  return (
    <div className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => logoutUser()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user?._id}`} className="flex-center gap-3">
            <img
              src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
