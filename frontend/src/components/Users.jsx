import { useCallback, useEffect, useState } from "react";
import { Button } from "./Button";
import { routes } from "../utils/routes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { debounce } from "../utils/utils";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const getUsers = async (searchValue="") => {
    try {
      let token = localStorage.getItem("paytmToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${routes.baseUrl}${routes.findUser}?filter=` + searchValue,
        config
      );
      setUsers(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const debounceSearch = useCallback(
    debounce((searchValue) => {
      getUsers(searchValue);
    }, 2000),
    []
  );

  const handleSearch = (searchInput) => {
    setFilter(searchInput);
    debounceSearch(searchInput);
  };

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user, index) => (
          <User user={user} key={index} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  const handleSendMoney = () => {
    navigate(`/send?userId=${user._id}&name=${user.firstName}`);
  };
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button onClick={handleSendMoney} label={"Send Money"} />
      </div>
    </div>
  );
}
