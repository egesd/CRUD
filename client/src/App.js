import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import logo from './assets/bucket.png'; // with import


function App() {
    const [itemName, setItemName] = useState(0);
    const [itemDescription, setItemDescription] = useState("");
    const [newItemName, setNewItemName] = useState("");
    const [bucketList, setBucketList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/read").then((response) => {
            setBucketList(response.data);
        });
    });

    const addToList = () => {
        Axios.post("http://localhost:3001/insert", {
            itemName: itemName,
            itemDescription: itemDescription,
        });
    };

    const updateFood = (id) => {
        Axios.put("http://localhost:3001/update", {
            id: id,
            newItemName: newItemName,
        });
    };

    const deleteFood = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`);
    };

    return (
        <div className="App">
            <div className="App__Container">
                <div className="App__Header">
                    <img className="App__Header__Logo" src={logo} alt="App icon"/>
                    <h1>Bucketlist</h1>
                </div>
                <div className="App__Input">
                    <label>Name:</label>
                    <input
                        type="text"
                        onChange={(event) => {
                            setItemName(event.target.value);
                        }}
                    ></input>

                    <label>Description</label>
                    <input
                        type="text"
                        onChange={(event) => {
                            setItemDescription(event.target.value);
                        }}
                    ></input>
                    <button onClick={addToList}>Add To List</button>
                </div>
                <div className="App__List">
                    <div className="App__List__Wrapper">
                        {bucketList.map((val, key) => {
                            return (
                                <div key={key} className="App__List__Single">
                                    <h1> {val.itemName}</h1>
                                    <h3> {val.itemDescription}</h3>
                                    <input
                                        type="text"
                                        placeholder="New Name..."
                                        onChange={(event) => {
                                            setNewItemName(event.target.value);
                                        }}
                                    />
                                    <div className="App__List__Single__Buttons">
                                        <button
                                            onClick={() => updateFood(val._id)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => deleteFood(val._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
