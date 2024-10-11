import {
  BookHeadphones,
  Bug,
  Database,
  FlaskConical,
  LayoutDashboard,
  Mail,
  Rocket,
  Wrench,
} from "lucide-react";

export type TaskCategoryValueUnion =
  | "Refactor"
  | "Frontend"
  | "Database"
  | "Email"
  | "Learning"
  | "Feature"
  | "Bug"
  | "Test";

export const taskCategoryIcon: Record<TaskCategoryValueUnion, React.ReactNode> =
  {
    // Tomato Red - signifies changes/improvements
    Refactor: (
      <Wrench color="#FF6347" className=" bg-inherit ml-4 h-4 w-4 font-bold" />
    ),
    // Dodger Blue - clean and bright for UI work
    Frontend: (
      <LayoutDashboard
        color="#1E90FF"
        className="bg-inherit ml-4 h-4 w-4 font-bold"
      />
    ),
    // Slate Blue - represents stability and depth for database
    Database: (
      <Database
        color="#6A5ACD"
        className=" bg-inherit ml-4 h-4 w-4 font-bold"
      />
    ),

    // Orange Red - high-priority communication
    Email: (
      <Mail color="#FF4500" className=" bg-inherit ml-4 h-4 w-4 font-bold" />
    ),

    // Lime Green - growth and education
    Learning: (
      <BookHeadphones
        color="#32CD32"
        className=" bg-inherit ml-4 h-4 w-4 font-bold"
      />
    ),

    // Gold - represents launching or introducing something new
    Feature: (
      <Rocket color="#FFD700" className="bg-inherit ml-4 h-4 w-4 font-bold" />
    ),
    // Crimson - alerts, error fixing
    Bug: <Bug color="#DC143C" className=" bg-inherit ml-4 h-4 w-4 font-bold" />,

    // Light Sea Green - experimentation and testing
    Test: (
      <FlaskConical
        color="#20B2AA"
        className=" bg-inherit ml-4 h-4 w-4 font-bold"
      />
    ),
  };
