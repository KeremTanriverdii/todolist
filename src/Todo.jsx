import React, { useEffect, useState } from 'react'
import TodoItems from './TodoItems';
import { Container, Card, InputGroup, CardHeader, CardBody } from 'react-bootstrap';


function Todo() {

    const [todos, setTodos] = useState(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        return storedTodos;
    });
    const [newTodo, setNewTodo] = useState('');
    const [state, setState] = useState('todo');
    const [alertType, setAlertType] = useState(null);
    const [showAlert, setShowAlert] = useState(false);


    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 1500);
            return () => clearTimeout(timer)
        }
    }, [showAlert])

    const uuidv42 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const addTodo = () => {
        const trimmedText = newTodo.trim();
        if (trimmedText !== "") {
            const items = {
                id: uuidv42(),
                text: trimmedText,
                isDone: false
            };
            setTodos(prevTodos => [...prevTodos, items]);
            setNewTodo("");
            getTodoList();
            setAlertType('success');
            setShowAlert(true);
        };
    };



    const completeItemHandler = id => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, isDone: !todo.isDone };
            }
            return todo;
        });
        setTodos(updatedTodos);
        getCompletedList();
    };

    const deleteItemHandler = id => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        setAlertType('danger');
        setShowAlert(true);
    };

    const getCompletedList = () => {
        setState('completed');
    }
    const getTodoList = () => {
        setState('todo');
    }

    const filteredTodos = state === 'todo' ? todos.filter(todo => !todo.isDone) : todos.filter(todo => todo.isDone);

    return (
        <>

            <Container className="custom w-100 p-5" >
                <Card >
                    <CardHeader>
                        <h3 className=''>Todo Uygulaması</h3>
                    </CardHeader>

                    <CardBody>

                        <InputGroup className="mb-4">
                            <input type="text" className='form-control' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                            <button className="btn btn-primary" type="button" onClick={addTodo}>Todo Ekle</button>

                        </InputGroup>
                        {showAlert && (
                            <div className={`alert alert-${alertType}  alert-dismissible fade show ms-auto alertDisplay text-center`} role="alert">
                                Todo {alertType === 'success' ? 'başarıyla eklendi' : 'başarıyla silindi'}
                            </div>
                        )}

                        <div className="d-flex align-items-center gap-2 mb-2">
                            <h5 className="me-auto mb-0">Todo Liste</h5>

                            <button type="button" className="btn btn-sm btn-success done"
                                onClick={getCompletedList}>Yapılanlar</button>

                            <button type="button" className="btn btn-sm btn-warning notDone"
                                onClick={getTodoList}>Yapılacaklar</button>
                        </div>

                        <ul className='list-group align-items-stretch'>
                            <TodoItems todos={filteredTodos}
                                completeItemHandler={completeItemHandler}
                                deleteItemHandler={deleteItemHandler} />
                        </ul>


                    </CardBody>
                </Card>
            </Container>
        </>

    )
}

export default Todo