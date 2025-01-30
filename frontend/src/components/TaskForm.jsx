// src/components/TaskForm.jsx
// You need to write the code for TaskForm component in the TaskForm.jsx file.
import { useState } from "react";
import axios from "axios";

export default function TaskForm({onTaskCreated}) {
    const [formData, setFormData] = useState({
        title: "",
        dueDate: "",
        priority: "",
        status: ""
    })
    const [error, setError] = useState("");

    const styler = {
        error:{
            color: "red"
        },
        txt: {
            color: "black"
        },
        inpBox: {
            padding: "0.5rem"
        }
    }

    const handleChange = (e)=>{
        const name = e.target.name;
        const val = e.target.value;
        setFormData(prev=>({
            ...prev,
            [name]: val
        }));
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(formData.title=="" || formData.dueDate=="" || formData.priority=="" || formData.status==""){
            setError("all the fields are required");
            return;
        }

        try {
            const res = await axios.post('http://localhost:3000/create-task', formData);
            console.log('task created');
            onTaskCreated();
            setError("");
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        }
        
    }

    return (
        <div>
            <div style={styler.error}>{error}</div>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection:'column'}}>
                <label htmlFor="title" style={styler.txt}>Title</label>
                <input type="text" style={styler.inpBox} name="title" value={formData.title} onChange={handleChange} />
                <label htmlFor="dueDate" style={styler.txt}>Due Date</label>
                <input type="date" style={styler.inpBox} name="dueDate" value={formData.dueDate} onChange={handleChange}/>
                <label htmlFor="priority" style={styler.txt}>Priority</label>
                <select name="priority"style={styler.inpBox}  value={formData.priority} onChange={handleChange}>
                    <option value=""></option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <label htmlFor="status" style={styler.txt}>Status</label>
                <select name="status" style={styler.inpBox} value={formData.status} onChange={handleChange}>
                    <option value=""></option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                <br />
                <button onSubmit={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}