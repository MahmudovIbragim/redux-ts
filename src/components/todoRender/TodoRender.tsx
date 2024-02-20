import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import scss from "./TodoRender.module.scss";

interface Todo {
  id: number;
  name: string;
  image: string;
  isCompleted: boolean;
}

const TodoRender = () => {
  const todos: Todo[] = useSelector((store: Todo[]) => store);
  const dispatch = useDispatch();
  const [newName, setNewName] = useState<string>("");
  const [newImage, setNewImage] = useState<string>("");
  const [isAuth, setIsAuth] = useState<number | null>(null);

  const deleteTodo = (id: number) => {
    dispatch({ type: "delete", payload: { id } });
  };

  const updateTodo = (id: number) => {
    const updatedTodos: Todo[] = todos.map((item: Todo) => {
      if (item.id === id) {
        return {
          ...item,
          name: newName,
          image: newImage,
        };
      }
      return item;
    });

    dispatch({ type: "update", payload: updatedTodos });
    setIsAuth(null);
  };

  const toggleCompleted = (id: number) => {
    const updatedTodos: Todo[] = todos.map((item: Todo) => {
      if (item.id === id) {
        return {
          ...item,
          isCompleted: !item.isCompleted,
        };
      }
      return item;
    });

    dispatch({ type: "update", payload: updatedTodos });
  };

  return (
    <>
      {todos.map((item: Todo) => (
        <div className={scss.container} key={item.id}>
          {isAuth === item.id ? (
            <div className={scss.update_form}>
              <input
                type="text"
                placeholder="New Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                type="text"
                placeholder="New Image"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
              />
              <button onClick={() => updateTodo(item.id)}>Сохранить</button>{" "}
              <button onClick={() => setIsAuth(null)}>Отмена</button>{" "}
            </div>
          ) : (
            <div className={scss.card}>
              <h2 className={item.isCompleted ? scss.line : scss.noline}>
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => toggleCompleted(item.id)}
                />
                {item.name}
              </h2>
              <img src={item.image} alt={item.name} />{" "}
              <div className={scss.card_btn}>
                <button onClick={() => deleteTodo(item.id)}>Удалить</button>{" "}
                <button onClick={() => setIsAuth(item.id)}>Изменить</button>{" "}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default TodoRender;
