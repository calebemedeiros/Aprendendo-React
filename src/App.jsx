import Tasks from "./components/Tasks";
import AddTasks from "./components/AddTask";
import { useState } from "react";
import { v4 } from "uuid";
import { useEffect } from "react";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=100",
        {
          method: "GET",
        }
      );

      const data = await response.json();

      setTasks(data);
    };

    // SE QUISER BUSCAR AS TAREFAS DO JSON PLACEHOLDER
    // fetchTasks();
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((tasks) => {
      // PRECISO ATUALIZAR O ESTADO DAS TAREFAS
      if (tasks.id === taskId) {
        return {
          ...tasks,
          isCompleted: !tasks.isCompleted,
        };
      }

      // SE NÃO FOR A TAREFA QUE EU CLIQUEI, RETORNO A MESMA
      return tasks;
    });

    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTasks = {
      id: v4(), // Gerando um ID único para a tarefa
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTasks]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTasks onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
