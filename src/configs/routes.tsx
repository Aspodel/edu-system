import { RouteObject } from "react-router-dom";
import { IconType } from "react-icons/lib";
import {
  AppLayout,
  ClassDetailPage,
  ClassPage,
  MajorProgramPage,
  CourseRegistrationPage,
  LoginPage,
  RoomPage,
  ViewTimetablePage,
  DepartmentPage,
  DepartmentDetailPage,
  GradesPage,
} from "containers";
import {
  CiBank,
  CiBoxes,
  CiCalendar,
  CiCoins1,
  CiLogout,
  CiMedal,
  CiMedicalClipboard,
  CiShop,
  CiViewBoard,
} from "react-icons/ci";

export const routePath = {
  Root: "/",
  Detail: ":id",
  Any: "*",
  Login: "login",

  Dashboard: "dashboard",
  MajorProgram: "major-program",
  CourseRegistration: "course-registration",
  TimeTable: "time-table",
  Class: "class",
  Deparment: "deparment",
  Room: "room",
  Grades: "grades",
};

export const routeConfigs: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        path: routePath.Root,
        element: <div></div>,
      },
      {
        path: routePath.Deparment,
        children: [
          {
            index: true,
            element: <DepartmentPage />,
          },
          {
            path: routePath.Detail,
            element: <DepartmentDetailPage />,
          },
        ],
      },
      {
        path: routePath.Grades,
        element: <GradesPage />,
      },
      {
        path: routePath.CourseRegistration,
        element: <CourseRegistrationPage />,
      },
      {
        path: routePath.TimeTable,
        element: <ViewTimetablePage />,
      },
      {
        path: routePath.Class,
        children: [
          {
            index: true,
            element: <ClassPage />,
          },
          {
            path: routePath.Detail,
            element: <ClassDetailPage />,
          },
        ],
      },
      {
        path: routePath.MajorProgram,
        element: <MajorProgramPage />,
      },
    ],
  },
  {
    path: routePath.Login,
    element: <LoginPage />,
  },
];

export const sidebarConfigs = [
  {
    path: routePath.Root,
    name: "Dashboard",
    icon: CiBank,
  },
  // {
  //   path: routePath.Room,
  //   name: "Room",
  //   icon: CiBoxes,
  // },
  {
    path: routePath.Deparment,
    name: "Department",
    icon: CiShop,
  },
  {
    path: routePath.CourseRegistration,
    name: "Course Registration",
    icon: CiMedicalClipboard,
  },
  {
    path: routePath.TimeTable,
    name: "View Timetable",
    icon: CiCalendar,
  },
  {
    path: routePath.Class,
    name: "Classes",
    icon: CiCoins1,
  },
  {
    path: routePath.MajorProgram,
    name: "Major Program",
    icon: CiViewBoard,
  },
  {
    path: routePath.Grades,
    name: "Grades",
    icon: CiMedal,
  },
];
