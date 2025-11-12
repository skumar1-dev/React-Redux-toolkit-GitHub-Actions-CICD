import React, { useEffect, useState } from 'react'
import './addTask.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addToTask, toggleTask, deleteTask, filteredTask } from '../feature/tasks/taskSlice'


const AddTask = () => {
    const [val, setVal] = useState();

    const dispatch = useDispatch();
    
    const {posts,status,error} = useSelector(state => state.task);
    const items= useSelector(state => state.task.items);



    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]); // run once on mount

    const addtoTask = (e) => {
        debugger;
        e.preventDefault();
        if (val !== "" || val === "undefined") {
            dispatch(addToTask(val));
            setVal("");
        }
        else {
            alert("please enter task");
        }
    }
    // const deleteTask = (e) => {
    //     debugger;
    //     dispatch(deleteTask(e.target.value));
    // }

    if (status === "loading") return <p>Loading tasks...</p>;
    if (status === "failed") return <p>Error: {error}</p>;
    return (
        <div style={{ margin: '50px' }}>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.name}</li>
                ))}
            </ul>

            <form onSubmit={addtoTask}>
                <h2 style={{ textAlign: 'center' }}>Add Task</h2>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <input
                        type='text'
                        className='text'
                        value={val}
                        name='val'
                        placeholder='enter task'
                        onChange={e => setVal(e.target.value)}
                    />
                    <button
                        type='submit'
                        className='btn'
                    >Add Task
                    </button>
                </div>


                <span
                    style={{
                        display: 'flex', gap: '5px',
                        justifyContent: 'center', margin: '15px'
                    }}>
                    <button type='button' onClick={() => dispatch(filteredTask('all'))}>All</button>
                    <button type='button' onClick={() => dispatch(filteredTask('completed'))}>completed</button>
                </span>


                <table style={{
                    margin: '20px auto',      // centers the table horizontally
                    borderCollapse: 'collapse',
                    width: '80%',             // table width (adjust as needed)
                    textAlign: 'center',      // center text inside cells
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)', // subtle shadow
                    fontFamily: 'Arial, sans-serif',
                }}>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Id</th>
                            <th>Text</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="4">No tasks available</td>
                            </tr>
                        ) : (
                            items.map((task, index) => (
                                <tr key={task.id}>
                                    <td>{index + 1}</td>
                                    <td>{task.id}</td>
                                    <td>
                                        <span
                                            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                            {task.val}
                                        </span>
                                    </td>

                                    <td >
                                        <span style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                                            <button type='button' onClick={() => dispatch(toggleTask(task.id))}>Complete</button>
                                            <button type='button' onClick={() => dispatch(deleteTask(task.id))}>X</button>
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </form>
        </div>
    )
}

export default AddTask