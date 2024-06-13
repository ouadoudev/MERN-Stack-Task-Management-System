import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  changeTaskStatus,
  markTaskAsComplete,
} from "@/store/taskSlice";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { loggedUser } from "@/store/authSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { LayoutGridIcon, TableIcon } from "lucide-react";

const Task = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const error = useSelector((state) => state.tasks.error);

  const [displayMode, setDisplayMode] = useState("cards");
  const user = useSelector(loggedUser);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);
  const myTask = tasks.filter((task) => task.user.username === user.username);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    if (title && description && deadline) {
      dispatch(createTask({ title, description, deadline, user: user.id }));
      setTitle("");
      setDescription("");
      setDeadline("");
    }
  };

  const handleOpenUpdateDrawer = (task) => {
    setSelectedTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setDeadline(task.deadline);
    setUpdateDrawerOpen(true);
  };

  const handleCloseUpdateDrawer = () => {
    setUpdateDrawerOpen(false);
    setSelectedTask(null);
    setTitle("");
    setDescription("");
    setDeadline("");
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Task?"
      );
      if (confirmDelete) {
        await dispatch(deleteTask(taskId));
        toast.success("Task deleted successfully", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Error deleting task", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleUpdateTask =async (event) => {
    event.preventDefault();
    if (selectedTask && title && description && deadline) {
      dispatch(
        updateTask({
          taskId: selectedTask._id,
          taskData: { title, description, deadline },
        })
      );
      await dispatch(fetchTasks());
      handleCloseUpdateDrawer();
    }
  };

  const handleChangeTaskStatus = (task) => {
    const newStatus = task.taskStatus === "todo" ? "in progress" : "todo";

    dispatch(
      changeTaskStatus({
        taskId: task._id,
        taskStatus: newStatus,
      })
    );
     dispatch(fetchTasks());
  };

  const handleMarkAsComplete = (taskId) => {
    dispatch(markTaskAsComplete(taskId));
     dispatch(fetchTasks());
  };
  const handleDisplayModeChange = (mode) => {
    setDisplayMode(mode);
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4">
        <Button
          variant="outline"
          onClick={() => handleDisplayModeChange("table")}
          className={displayMode === "table" ? "hidden" : ""}
        >
          <TableIcon className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          onClick={() => handleDisplayModeChange("cards")}
          className={displayMode === "cards" ? "hidden" : ""}
        >
          <LayoutGridIcon className="h-5 w-5" />
        </Button>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="mt-2 ml-8 h-10 w-44">
              Add New Task
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Create New Task</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <form onSubmit={handleAddTask}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <Input
                      label="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                      label="Deadline"
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Textarea
                      label="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit">Create Task</Button>
                </form>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <main className="flex-1 p-6">
        <div className="my-4">
          {displayMode === "cards" ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {myTask.map((task) => (
  <Card key={task.id} className="shadow-lg rounded-lg overflow-hidden">
  <CardHeader className="p-4 bg-white border-b border-gray-200">
    <div className="flex items-center justify-between">
      <div
        className={`px-3 py-1 rounded-full text-xs text-center font-medium cursor-pointer ${
          task.completed === false
            ? task.taskStatus === "todo"
              ? "bg-red-100 text-red-500"
              : task.taskStatus === "in progress"
              ? "bg-yellow-100 text-yellow-500"
              : "bg-green-100 text-green-500"
            : "bg-green-100 text-green-500"
        }`}
        onClick={() => handleChangeTaskStatus(task)}
      >
        {task.taskStatus}
      </div>
    </div>
    <div className="mt-2">
      <div className="text-lg font-semibold">{task.title}</div>
      {task.user && task.user.username && (
        <div className="mt-1 text-sm text-gray-600">
          <h6>by: {task.user.username}</h6>
          <p>
            at:{" "}
            {new Date(task.createdAt).toLocaleDateString("en-US", {
              timeZone: "UTC",
            })}
          </p>
        </div>
      )}
    </div>
  </CardHeader>
  <CardContent className="p-4">
    <div className="mb-2">
      <span className="font-medium">Objectif: </span> {task.description}
    </div>
    <div className="flex justify-between items-center text-sm text-gray-500">
      <div>
        <span className="font-medium">Due: </span>
        {new Date(task.deadline).toLocaleDateString("en-US", {
          timeZone: "UTC",
        })}
      </div>
    </div>
  </CardContent>
  <CardFooter className="p-4 bg-gray-50 border-t border-gray-200 flex justify-around items-center">
    {!task.completed && (
      <div className="flex gap-2">
        <Button size="sm" onClick={() => handleMarkAsComplete(task._id)}>
          Mark as Done
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleOpenUpdateDrawer(task)}>
          Update
        </Button>
      </div>
    )}
    <Button variant="outline" size="sm" onClick={() => handleDeleteTask(task._id)}>
      Delete
    </Button>
  </CardFooter>
</Card>

              ))}
            </div>
          ) : (
<Table className="min-w-full leading-normal shadow-lg rounded-lg overflow-hidden">
  <TableHeader className="bg-gray-100">
    <TableRow>
      <TableHead className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</TableHead>
      <TableHead className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</TableHead>
      <TableHead className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Deadline</TableHead>
      <TableHead className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</TableHead>
      <TableHead className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {myTask.map((task) => (
      <TableRow key={task.id} className="bg-white hover:bg-gray-100">
        <TableCell className="px-5 py-2 border-b border-gray-200 text-center text-sm">{task.title}</TableCell>
        <TableCell className="px-5 py-2 border-b border-gray-200 text-center text-sm">{task.description}</TableCell>
        <TableCell className="px-5 py-2 border-b border-gray-200 text-center text-sm">{new Date(task.deadline).toLocaleDateString()}</TableCell>
        <TableCell className="px-5 py-2 border-b border-gray-200 text-center text-sm">
          {task.completed === false ? (
            <div
              className={`px-2 py-1 rounded-full text-xs text-center font-medium cursor-pointer ${
                task.taskStatus === "todo"
                  ? "bg-red-100 text-red-500"
                  : task.taskStatus === "in progress"
                  ? "bg-yellow-100 text-yellow-500"
                  : "bg-green-100 text-green-500"
              }`}
              onClick={() => handleChangeTaskStatus(task)}
            >
              {task.taskStatus}
            </div>
          ) : (
            <div className="px-2 py-1 rounded-full text-xs font-medium cursor-pointer bg-green-100 text-green-500">
              {task.taskStatus}
            </div>
          )}
        </TableCell>
        <TableCell className="px-5 py-2 mt-2  border-gray-200  text-center text-sm flex">
          <Button variant="outline" size="sm" onClick={() => handleDeleteTask(task._id)}>
            Delete
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleOpenUpdateDrawer(task)}>
            Update
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

          )}
        </div>
      </main>
      <Drawer open={updateDrawerOpen} onClose={handleCloseUpdateDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Update Task</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <form onSubmit={handleUpdateTask}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  label="Deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <Textarea
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" onClick={handleUpdateTask}>
                Update Task
              </Button>
            </form>
          </div>
          <DrawerFooter>
            <DrawerClose asChild onClick={handleCloseUpdateDrawer}>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Task;
