"use client";

import CreateTask from "@/components/tasks/CreateTask";
import TaskCard from "@/components/tasks/TaskCard";
import TaskNavbar from "@/components/tasks/TaskNavbar";
import ToolBar from "@/components/tasks/ToolBar";
import { taskFormType, taskType } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import TaskSkeleton from "@/components/TaskSkeleton";
import { useToast } from "@/components/ui/use-toast";
import { useGetCrewList } from "@/lib/react-query/queriesAndMutations/crew";
import {
  useCreateNewTask,
  useDeleteTask,
  useCompleteTask,
  useTaskCompletionApproval,
  useGetProjectTasks,
} from "@/lib/react-query/queriesAndMutations/tasks";
import { useCrewOptions } from "@/hooks/useCrewOptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TaskPage = ({ params }: { params: { id: string } }) => {
  const { data: tasksList, isPending: isLoadingTask } = useGetProjectTasks(params.id);
  const { mutateAsync: createNewTaskMutation } = useCreateNewTask();
  const { mutateAsync: deleteTaskMutation } = useDeleteTask();
  const { mutateAsync: completeTaskMutation } = useCompleteTask();
  const { mutateAsync: taskApprovalMutation, isPending: isLoadingApprovedTask } =
    useTaskCompletionApproval();
  const { crewList, isCrewLoading, isCrewError } = useCrewOptions(params.id);

  const [tasks, setTasks] = useState<taskType[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (tasksList) setTasks([...tasksList.data]);
  }, [params.id, tasksList]);

  const completeTask = (task: taskType) => {
    const updatedTasks = { ...task, completed: !task.completed };
    completeTaskMutation({ taskId: task.id, taskData: updatedTasks });
  };

  const deleteTask = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTaskMutation(id);
        toast({
          title: "Task Deleted",
          description: "The task has been successfully deleted.",
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Deletion Failed",
          description: "An error occurred while trying to delete the task.",
        });
      }
    }
  };

  const createTask = async (task: taskFormType) => {
    const newTask = {
      project: params.id,
      title: task.title,
      tags: task.status,
      created_by: task.created_by,
      attachment: task.attachment,
      description: task.description,
      assigned_to: task.assigned_to,
      due_date: task.due_date,
      status: task.status || "in-progress",
      // completion_requested: false,
      // requester: null,
    };
    try {
      await createNewTaskMutation({ taskData: newTask, projectId: params.id });
    } catch (error) {
      console.log("failed to create new task", error);
    }
  };

  const editTask = (id: number, task: taskType) => {
    const updatedTasks = {
      ...task,
      project: params.id,
      title: task.title,
      desc: task.description,
      deadline: task.due_date,
      assigned_to: task.assigned_to,
    };
    completeTaskMutation({ taskId: id, taskData: updatedTasks });
  };

  const approveTaskCompletion = async (taskId: number) => {
    const res = await taskApprovalMutation(taskId);
    if (res) {
      toast({ title: "Success fully approved task" });
    } else {
      toast({ title: "Failed approved task", variant: "destructive" });
    }
  };

  const [sortBy, setSortBy] = useState<"id" | "due_date" | "title" | "completed">("id");
  const [taskFilter, setTaskFilter] = useState("all-task");
  const [searchFilter, setSearchFilter] = useState("");

  const getSortTasks = useCallback(() => {
    let filteredTasks = [...tasks].filter((task) => {
      return task.title.toLowerCase().includes(searchFilter.toLowerCase());
    });
    if (taskFilter === "pending") {
      filteredTasks = [...filteredTasks].filter((task) => !task.completed);
    } else if (taskFilter === "completed-task") {
      filteredTasks = [...filteredTasks].filter((task) => task.completed);
    } else if (taskFilter === "requested-approval") {
      filteredTasks = [...filteredTasks].filter((task) => task.completion_requested);
    }
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if (sortBy === "id") {
        return b.id - a.id;
      }
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });
    return sortedTasks;
  }, [sortBy, tasks, taskFilter, searchFilter]);

  const sortedTasks = getSortTasks();

  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="p-4">
      <h1 className=" text-xl md:text-2xl font-poppins-semibold my-4">Task</h1>

      <TaskNavbar taskFilter={taskFilter} setTaskFilter={setTaskFilter} />
      <ToolBar
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        sortBy={sortBy}
        handleSort={(value: "id" | "due_date" | "title" | "completed") => setSortBy(value)}
      />
      <CreateTask
        setFormOpen={setFormOpen}
        formOpen={formOpen}
        handleSubmission={createTask}
        crewList={crewList}
      />
      {isLoadingTask ? (
        <TaskSkeleton />
      ) : (
        <div className="w-full mt-4 flex flex-col gap-2">
          {sortedTasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks found</p>
          ) : (
            sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                completeTask={completeTask}
                deleteTask={deleteTask}
                editTask={editTask}
                crewList={crewList}
                approveTaskCompletion={approveTaskCompletion}
                isLoading={isLoadingApprovedTask}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TaskPage;
