import React from 'react'

function TodoItems({ todos, deleteItemHandler, completeItemHandler }) {

    const handleCheckboxChange = (id) => {
        completeItemHandler(id);
    }

    return (
        <div>
            {todos.map(todo => (
                <li className='list-group-item rounded border mt-1' key={todo.id}>
                    {todo.isDone ? (
                        <div className='d-flex list-item'>
                            <p className='m-0 me-auto'>{todo.text}</p>
                            <button className='btn btn-sm btn-close btn-danger ms-auto'
                                type='button' onClick={() => deleteItemHandler(todo.id)}></button>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center">
                            <input
                                className="complete-check me-2"
                                type="checkbox"
                                checked={false}
                                onChange={() => handleCheckboxChange(todo.id)}
                            />
                            <label className='m-0'>{todo.text}</label>
                            <button className='btn btn-sm btn-danger ms-auto'
                                onClick={() => deleteItemHandler(todo.id)}>Delete</button>
                        </div>
                    )}
                </li>
            ))}
        </div>
    )
}

export default TodoItems