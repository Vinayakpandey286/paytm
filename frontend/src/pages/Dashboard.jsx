import React, { useEffect, useState } from "react";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { routes } from "../utils/routes";

const Dashboard = () => {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const getBalance = async () => {
      try {
        let token = localStorage.getItem("paytmToken")
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${routes.baseUrl}${routes.balance}`, config);
        setBalance(response.data.balance);
      } catch (error) {
        console.log(error);
      }
    };

    getBalance();
  }, []);
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
