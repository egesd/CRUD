import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
    const [foodName, setFoodName] = useState("");
    const [days, setDays] = useState(0);

    const addToList = () => {
        Axios.post("http://localhost:3001/insert", {
            foodName: foodName,
            days: days,
        });
    };

    return (
        <div className="App">
            <h1> CRUD App with MERN</h1>

            <label>Food Name:</label>
            <input
                type="text"
                onChange={(event) => {
                    setFoodName(event.target.value);
                }}
            ></input>

            <label>Days Since You Ate It</label>
            <input
                type="number"
                onChange={(event) => {
                    setDays(event.target.value);
                }}
            ></input>
            <button onClick={addToList}>Add To List</button>
        </div>
    );
}

export default App;
