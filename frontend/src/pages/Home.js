import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Items from '../components/Items';
import { Chartss } from '../components/Chartss';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import LoadingBar from 'react-top-loading-bar';
import { createExpense, getUserExpenses } from '../utils/renders';
import NavBar from '../components/NavBar';
import { useRef } from 'react';

function Home() {
  const navigate = useNavigate();
  const [selectDate, setSelectedDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [userdata] = useState(JSON.parse(localStorage.getItem('User')));
  const [userexp, setUserexp] = useState([]);
  const ref = useRef(null);

  document.title = 'Home';

  useEffect(() => {
    if (!localStorage.getItem('User')) {
      navigate('/login');
    }
    setUserexp(Promise.resolve(getUserExpenses(userdata._id)).then((data) => setUserexp(data)));
  }, [userdata._id, navigate]);

  const getTotal = () => {
    let sum = 0;
    for (const item in userexp) {
      sum += userexp[item].amount;
    }
    return sum;
  }

  return (
    <div className="h-screen bg-gray-900 text-white font-mont">
      <LoadingBar color="orange" ref={ref} />
      <NavBar data={userexp} />

      <div className="flex w-full h-full p-10">
        {/* Left Section (Chart) */}
        <div className="flex-1 p-6 bg-gray-800 rounded-xl shadow-lg">
          <Chartss exdata={userexp} />
        </div>

        {/* Right Section (Transaction Form & Expense List) */}
        <div className="flex-1 pl-8 pr-8">
          {/* Create Transaction */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-xl mb-10">
            <div className="font-bold text-2xl mb-6">Create Transaction</div>
            <div className="flex space-x-4 mb-4">
              <input
                type="number"
                placeholder="Amount"
                onChange={(e) => setAmount(e.target.value)}
                className="p-4 w-full rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-4 w-full rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">--Select--</option>
                <option value="Grocery">Grocery</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Fun">Fun</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-6">
              <DatePicker
                selected={selectDate}
                onChange={(date) => setSelectedDate(date)}
                className="p-4 w-full rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="Date"
                showYearDropdown
              />
            </div>

            <button
              onClick={() => {
                const expInfo = { usersid: userdata._id, category, date: selectDate, amount };
                ref.current.staticStart();
                createExpense(expInfo);
                ref.current.complete();
              }}
              className="w-full py-3 bg-blue-600 rounded-xl text-xl text-white hover:bg-blue-700 transition duration-300"
            >
              Add Expense
            </button>
          </div>

          {/* Total Expense & Expense List */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-xl">
            <div className="text-2xl mb-4">Total Expense: $ {getTotal()}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.keys(userexp).map((item) => (
                <Items key={userexp[item]._id} data={userexp[item]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;