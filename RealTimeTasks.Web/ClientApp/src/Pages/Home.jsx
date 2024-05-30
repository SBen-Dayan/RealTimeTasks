import axios from "axios";
import { useState, useEffect, useRef } from "react";
import TaskTableRow from "../components/TaskTableRow";
import { useUser } from "../components/UserContext";
import { HubConnectionBuilder } from "@microsoft/signalr";

export default function Home() {
    const [text, setText] = useState('');
    const [tasks, setTasks] = useState([]);
    const connectionRef = useRef(null);
    const { user : {id, firstName, lastName}} = useUser();

    useEffect(() => {
        (async function () {
            const { data } = await axios.get('/api/task/getAll');
            setTasks(data);
        })();
    }, [])

    useEffect(() => {
        (async function() {
            const connection = new HubConnectionBuilder().withUrl("/api/task").build();
            await connection.start();
            connectionRef.current = connection;

            connection.on('taskUpdate', value => {
                console.log(value);
                setTasks(value);
            });
        })();
    }, [])

    const onAddClick = async () => {
        await axios.post('/api/task/add', {title : text});
        setText('');
    }
   

    return <>
    <div className="text-center">
        <h4>Hello {firstName} {lastName}!</h4>
    </div>
        <div className="row">
            <div className="col-md-10">
                <input type="text" className="form-control" placeholder="Enter task title..."
                value={text} onChange={e => setText(e.target.value)} />
            </div>
            <div className="col-md-2">
                <button onClick={onAddClick} className="btn btn-primary w-100">Add Task</button>
            </div>
        </div>
        <table className="table table-hover table-striped table-bordered mt-3">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(t => <TaskTableRow
                    key={t.id}
                    task={t}
                    currentUserId={id}/>
                )}
            </tbody>
        </table>
    </>
}