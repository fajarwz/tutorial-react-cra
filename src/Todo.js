import { useState } from "react";

export default function Todo() {
    const [activity, setActivity] = useState("");
    const [edit, setEdit] = useState({});
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState("");

    function generateId() {
        return Date.now();
    }

    function saveTodoHandler(event) {
        event.preventDefault();

        if (!activity) {
            return setMessage("Nama aktifitas wajib diisi");
        }

        setMessage("");

        if (edit.id) {
            const updatedTodo = {
                ...edit,
                activity,
            };

            const editTodoIndex = todos.findIndex(function (todo) {
                return todo.id === edit.id;
            });

            const updatedTodos = [...todos];
            updatedTodos[editTodoIndex] = updatedTodo;

            setTodos(updatedTodos);
            setEdit({});
            setActivity("");

            return;
        }

        setTodos([
            ...todos,
            {
                id: generateId(),
                activity,
                isDone: false,
            },
        ]);
        setActivity("");
    }

    function editTodoHandler(todo) {
        setActivity(todo.activity);
        setEdit(todo);
    }

    function cancelEditHandler() {
        setEdit({});
        setActivity("");
    }

    function removeTodoHandler(todoId) {
        const filteredTodos = todos.filter(function (todo) {
            return todo.id !== todoId;
        });

        setTodos(filteredTodos);

        if (edit.id) cancelEditHandler();
    }

    function doneTodoHandler(todo) {
        const updatedTodo = {
            ...todo,
            isDone: todo.isDone ? false : true
        }

        const editTodoIndex = todos.findIndex(function (currentTodo) {
            return currentTodo.id === todo.id;
        });

        const updatedTodos = [...todos];
        updatedTodos[editTodoIndex] = updatedTodo;

        setTodos(updatedTodos)
    }

    return (
        <>
            <h1>Simple Todo List</h1>
            {message && <div style={{ color: "red" }}>{message}</div>}
            <form onSubmit={saveTodoHandler}>
                <input
                    type="text"
                    placeholder="Nama aktifitas"
                    value={activity}
                    onChange={function (event) {
                        setActivity(event.target.value);
                    }}
                ></input>
                <button type="submit">
                    {edit.id ? "Simpan perubahan" : "Tambah"}
                </button>
                {edit.id && (
                    <button onClick={cancelEditHandler}>Batal edit</button>
                )}
            </form>
            {todos.length > 0 ? (
                <ul>
                    {todos.map(function (todo) {
                        return (
                            <li>
                                <input type="checkbox" checked={todo.isDone} onChange={doneTodoHandler.bind(this, todo)}></input>
                                {todo.activity}
                                ({todo.isDone ? 'Selesai' : 'Belum selesai'})
                                <button
                                    onClick={editTodoHandler.bind(this, todo)}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={removeTodoHandler.bind(
                                        this,
                                        todo.id
                                    )}
                                >
                                    Hapus
                                </button>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p><i>Tidak ada todo</i></p>
            )}
        </>
    );
}