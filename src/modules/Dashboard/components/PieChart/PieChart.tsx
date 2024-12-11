// import React, { useEffect, useState } from "react";
// import { Chart as ChartJS, defaults } from "chart.js/auto";
// import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
// import {
//   privateAxiosInstance,
//   requestHeader,
//   TASKSURLS,
//   USERSSURLS,
// } from "../../../../constants/URLS";
// import { AxiosHeaders } from "axios";

// import Progress from "../../../../assets/icons/progress.svg";
// import Tasks from "../../../../assets/icons/task.svg";
// import Projects from "../../../../assets/icons/projects.svg";

// defaults.maintainAspectRatio = true;
// defaults.responsive = true;
// defaults.plugins.title.display = true;
// defaults.plugins.title.align = "start";
// defaults.plugins.title.color = "red";

// interface taskcount {
//   toDo: number;
//   inProgress: number;
//   done: number;
// }
// interface userState_IF {
//   activatedEmployeeCount: number;
//   deactivatedEmployeeCount: number;
// }

// export const PieChart = () => {
//   const [alltaskCount, setTaskCount] = useState<taskcount>({
//     toDo: 0,
//     inProgress: 0,
//     done: 0,
//   });

//   const [userState, setuserState] = useState<userState_IF>({
//     activatedEmployeeCount: 0,
//     deactivatedEmployeeCount: 0,
//   });

//   useEffect(() => {
//     const getCountTaskes = async () => {
//       const res = await privateAxiosInstance.get<taskcount>(
//         TASKSURLS.getCount,
//         requestHeader
//       );
//       setTaskCount(res.data);
//       console.log("1res", res);
//     };

//     const getUserState = async () => {
//       const res = await privateAxiosInstance.get<userState_IF>(
//         USERSSURLS.userState,
//         requestHeader
//       );
//       setuserState(res.data);
//       console.log("secres", res);
//     };
//     getCountTaskes();
//     getUserState();
//   }, []);
//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row p-4">
//         <div className="col-md-6">
//             <div className=" ">
//               <div className="dashboard-box">
//                 <div className="header-text">
//                   <div className="fw-bold">Tasks</div>
//                   <div className="description fw-lighter">
//                     Lorem ipsum dolor sit amet, consectetur.
//                   </div>
//                 </div>
//                 <div className="cards">
//                   <div className="card">
//                     <div className="icon-card color-icon-bg-1">
//                       <img
//                         className="icon"
//                         src={Progress}
//                         alt="Progress Icon"
//                       />
//                     </div>
//                     <div className="label">toDo</div>
//                     <div className="value">{alltaskCount.toDo}</div>
//                   </div>
//                   <div className="card"><div className="icon-card color-icon-bg-2">
//                     <img className="icon" src={Tasks} alt="Inactive Icon"/></div>
//                     <div className="label">inProgress</div>
//                     <div className="value">{alltaskCount.inProgress}</div></div>

//                     <div className="card"><div className="icon-card color-icon-bg-3">
//                       <img className="icon" src={Projects} alt="Projects Number Icon"/></div>
//                     <div className="label">done </div>
//                     <div className="value">{alltaskCount.done}</div></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className=" ">
//               <div className="dashboard-box">
//                 <div className="header-text">
//                   <div className="fw-bold">User</div>
//                   <div className="description fw-lighter">
//                     Lorem ipsum dolor sit amet, consectetur.
//                   </div>
//                 </div>
//                 <div className="cards">
//                   <div className="card">
//                     <div className="icon-card color-icon-bg-1">
//                       <img
//                         className="icon"
//                         src={Progress}
//                         alt="Progress Icon"
//                       />
//                     </div>
//                     <div className="label">Active</div>
//                     <div className="value">{userState.activatedEmployeeCount}</div>
//                   </div>
//                   <div className="card"><div className="icon-card color-icon-bg-2">
//                     <img className="icon" src={Tasks} alt="Inactive Icon"/></div>
//                     <div className="label">Inactive</div>
//                     <div className="value">{userState.deactivatedEmployeeCount}</div></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6   mt-4">
//             <div className="shadow  px-5 rounded-3">
//               <Pie
//                 data={{
//                   labels: Object.keys(alltaskCount).map((key) => [key]),

//                   //["January", "February","February"],

//                   datasets: [
//                     {
//                       data: [
//                         alltaskCount.done,
//                         alltaskCount.inProgress,
//                         alltaskCount.toDo,
//                       ],
//                       backgroundColor: ["#3588772b", "#E4E4BC", "#E7C3D7"], // Custom colors
//                       borderColor: ["#fff", "#fff", "#fff"], // Border colors (optional)
//                       borderWidth: 2,
//                     },
//                   ],
//                 }}
//               />
//             </div>
//           </div>

//           <div className=" col-md-6   mt-4   ">
//             <div className="shadow   text-center px-5 rounded-3">
//               <Doughnut
//                 data={{
//                   labels: Object.keys(userState).map((key) => [key]),

//                   datasets: [
//                     {
//                       data: [
//                         userState.activatedEmployeeCount,
//                         userState.deactivatedEmployeeCount,
//                       ],
//                       backgroundColor: ["#acd3cb", "#f4f4e5"], // Custom colors
//                       borderColor: ["#fff", "#fff"], // Border colors (optional)
//                       borderWidth: 2,
//                     },
//                   ],
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
