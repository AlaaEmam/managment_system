import React, { useEffect, useState } from "react";
import { axiosInstanc, privateAxiosInstance, TASKSURLS } from "../../../../constants/URLS";
import styles from "./TaskEmployee.module.css";

export default function TaskEmployee() {
  type Task = {
    id: number;
    title: string;
    description: string;
    status: "ToDo" | "InProgress" | "Done";
  };

  type UserTasksResponse = {
    pageNumber: number;
    pageSize: number;
    totalNumberOfRecords: number;
    totalNumberOfPages: number;
    data: Task[];
  };

  const [tasks, setTasks] = useState<Task[]>([]);

  // تصفية المهام بناءً على الحالة الخاصة بها
  const tasksTodo = tasks.filter(({ status }) => status === "ToDo");
  const tasksInProgress = tasks.filter(({ status }) => status === "InProgress");
  const tasksDone = tasks.filter(({ status }) => status === "Done");

  useEffect(() => {
    // دالة لجلب المهام من الـ API
    const getAllAssignedTasks = async () => {
      try {
        const response = await axiosInstanc.get<UserTasksResponse>(TASKSURLS.GET_ASSIGNED_TASKS);
        setTasks(response.data?.data); // حفظ المهام المستلمة في حالة state
      } catch (error) {
        console.log(error); // طباعة الخطأ إن وجد
      }
    };
    getAllAssignedTasks(); // استدعاء الدالة عند تحميل المكون
  }, []);

  // الدالة التي يتم استدعاؤها عند بدء السحب
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    e.dataTransfer.setData("task", JSON.stringify(task)); // حفظ بيانات المهمة داخل dataTransfer
  };

  // الدالة التي يتم استدعاؤها عند إفلات العنصر داخل عمود معين
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: Task["status"]) => {
    const droppedTask = JSON.parse(e.dataTransfer.getData("task")) as Task; // استعادة بيانات المهمة
    const updatedTasks = tasks.map((task) =>
      task.id === droppedTask.id ? { ...task, status: newStatus } : task
    ); // تحديث حالة المهمة لتناسب العمود الجديد
    setTasks(updatedTasks); // تحديث حالة state

    // استدعاء الـ API لتحديث الحالة على السيرفر
    changeStatus(droppedTask.id.toString(), newStatus);
  };

  // الدالة لتغيير الحالة عبر الـ API
  const changeStatus = async (id: string, status: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const response = await privateAxiosInstance.put(
        TASKSURLS.CHANGE_STATUS(id),
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Status changed successfully:", response.data);
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  // منع السلوك الافتراضي أثناء السحب فوق عمود
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className={styles.title}>Task Board</h1>
      <main className={styles["tasks-board"]}>
        {/* عمود المهام التي في حالة To Do */}
        <div
          className={styles.column}
          onDrop={(e) => handleDrop(e, "ToDo")} // عند إسقاط العنصر يتم تحديث حالته إلى "ToDo"
          onDragOver={handleDragOver} // منع السلوك الافتراضي
        >
          <div className={styles["column-title"]}>To Do</div>
          <div className={styles["cards"]}>
            {tasksTodo.map((task) => (
              <div
                key={task.id}
                className={styles["card"]}
                draggable // العنصر قابل للسحب
                onDragStart={(e) => handleDragStart(e, task)} // إعداد المهمة المسحوبة
              >
                {task.title}
              </div>
            ))}
          </div>
        </div>

        {/* عمود المهام التي في حالة In Progress */}
        <div
          className={styles.column}
          onDrop={(e) => handleDrop(e, "InProgress")}
          onDragOver={handleDragOver}
        >
          <div className={styles["column-title"]}>In Progress</div>
          <div className={styles["cards"]}>
            {tasksInProgress.map((task) => (
              <div
                key={task.id}
                className={styles["card"]}
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
              >
                {task.title}
              </div>
            ))}
          </div>
        </div>

        {/* عمود المهام التي في حالة Done */}
        <div
          className={styles.column}
          onDrop={(e) => handleDrop(e, "Done")}
          onDragOver={handleDragOver}
        >
          <div className={styles["column-title"]}>Done</div>
          <div className={styles["cards"]}>
            {tasksDone.map((task) => (
              <div
                key={task.id}
                className={styles["card"]}
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
              >
                {task.title}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
