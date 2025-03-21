import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Items from '../components/Items';
import { Chartss } from '../components/Chartss';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import LoadingBar from 'react-top-loading-bar';
import { createExpense, getUserExpenses } from '../utils/renders';
import NavBar from '../components/NavBar';

function Home() {
  const navigate = useNavigate();
  const [selectDate, setSelectedDate] = useState("");
  const [amount , setAmount] = useState(0);
  const [category , setCategory] = useState("");
  const [userdata] = useState(JSON.parse(localStorage.getItem('User')));
  const [userexp , setUserexp] = useState([]);
  const ref = useRef(null);

  document.title='Home';

  useEffect(()=>{
    if(!localStorage.getItem('User')) {
      navigate('/login');
    }
    setUserexp(Promise.resolve(getUserExpenses(userdata._id)).then((data)=>setUserexp(data)));
  }, [userdata._id, navigate]);

  const getTotal = () => {
    let sum = 0;
    for(const item in userexp) {
      sum += userexp[item].amount;
    }
    return sum;
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <LoadingBar color='orange' ref={ref}  />
      <NavBar data={userexp} />
      
      {/* Main Feed */}
      <div className="flex w-full min-h-screen">
        <div className="leftbox w-1/2 h-full p-6">
          <Chartss exdata={userexp} />
        </div>
        
        <div className="rightbox w-1/2 flex flex-col gap-10 items-center">
          {/* Create Transaction Section */}
          <div className="createnew bg-gray-800 rounded-3xl p-10 flex flex-col items-center gap-2">
            <div className="font-bold text-3xl">Create Transaction</div>
            <div className="flex gap-4">
              <input 
                type="number" 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Amount" 
                className="h-12 p-4 rounded-xl text-black outline-none" 
              />
              <select 
                onChange={(e) => setCategory(e.target.value)} 
                defaultValue="selected" 
                className="bg-white p-2.5 rounded-xl text-gray-900 outline-none"
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

            <div className="w-full grid grid-flow-col">
              <DatePicker
                selected={selectDate}
                onChange={(date) => setSelectedDate(date)}
                className="p-3 rounded-xl outline-none bg-gray-900 text-white"
                placeholderText="Date"
                showYearDropdown
              />
            </div>

            <a 
              onClick={() => {
                const expInfo = {
                  usersid: userdata._id,
                  category,
                  date: selectDate,
                  amount,
                };
                ref.current.staticStart();
                createExpense(expInfo);
                ref.current.complete();
              }} 
              href="#_" 
              className="relative h-fit text-center w-full rounded-xl px-5 py-2 overflow-hidden group bg-gray-800 text-white border-2 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-600"
            >
              <span className="absolute right-0 w-8 h-10 -mt-12 transition-all ease"></span>
              <span className="relative font-bold text-2xl">+</span>
            </a>
          </div>

          {/* User Expenses */}
          <div className="w-5/6 p-7 rounded-xl border-2 border-white grid gap-7 overflow-y-scroll">
            <div className="text-3xl font-bold">Total Expense: ₹ {getTotal()}</div>
            <div className="grid grid-cols-2 gap-7">
              {Object.keys(userexp).map((items) => (
                <Items key={userexp[items]._id} data={userexp[items]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;