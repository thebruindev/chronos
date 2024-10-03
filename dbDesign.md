# Database Schema

### Project Table:
Stores details about the project.

### Goal Table:
Each goal belongs to a project and has tasks associated with it.

### Task Table:
Tasks are created and initially placed in the project’s backlog, but they are associated with a goal. Later, they can be moved to the board (a separate status flag or table can handle this).

### Backlog Table:
This keeps track of tasks that are in the backlog but not yet scheduled for the board (the week’s work).

------------------------------------------------------------------------------------------------------------

## Project table

```
| Column         | Type     | Description                                                        |
|----------------|----------|--------------------------------------------------------------------|
| id             | string   | Unique identifier for the project                                  |
| title          | string   | Title of the project                                               |
| description    | string   | Detailed description of the project                                |
| ownerId        | string   | Foreign key linking to the User table (project creator)            |
| _creationTime  | date     | Automatically generated when the project is created                |
| lastUpdatedAt  | date     | Tracks when the project was last updated                           |

```

## Goal table
```
| Column         | Type       | Description                                                        |
|----------------|------------|--------------------------------------------------------------------|
| id             | string     | Unique identifier for the goal                                     |
| projectId      | string     | Foreign key linking to the Project table                           |
| title          | string     | Title of the goal                                                  |
| description    | string     | Detailed description of the goal                                   |
| status         | string     | Current status of the goal                                         |
| priority       | string     | Priority level of the goal                                         |
| startDate      | date       | Start date of the goal                                             |
| dueDate        | date       | Deadline for the goal                                              |
| _creationTime  | date       | Automatically generated when the goal is created                   |
| lastUpdatedAt  | date       | Tracks when the goal was last updated                              |

```

##  Task table

Tasks are tied to a goal and project. 
They start in the backlog but can be flagged for the board.

```
| Column         | Type     | Description                                                         |
|----------------|----------|---------------------------------------------------------------------|
| id             | string   | Unique identifier for the task                                      |
| title          | string   | Title of the task                                                   |
| description    | string   | Detailed description of the task                                    |
| priority       | string   | Priority level of the task                                          |
| category       | string   | Task category                                                       |
| status         | string   | Current status (e.g., "backlog", "on board", "in progress", "done") |
| dueDate        | date     | Deadline for the task                                               |
| goalId         | string   | Foreign key linking to the Goal table                               |
| projectId      | string   | Foreign key linking to the Project table                            |
| _creationTime  | date     | Automatically generated when the task is created                    |
| lastUpdatedAt  | date     | Tracks when the task was last updated                               |

```

##  Backlog Table

Tasks that are in the backlog but not yet scheduled for the board can be managed here. 
This ensures the task’s association with the backlog before moving it to the board.

```
| Column         | Type     | Description                                                         |
|----------------|----------|---------------------------------------------------------------------|
| id             | string   | Unique identifier for the backlog entry                             |
| projectId      | string   | Foreign key linking to the Project table                            |
| taskId         | string   | Foreign key linking to the Task table                               |
| addedAt        | date     | The date the task was added to the backlog                          |

```


A user has (or is part of) a project. 
A project has several goals. 
A goal has one or several tasks. 
A project also has backlog which contains tasks from different goals

on Home page, user is shown all of his projects. if no projects are here, he can create one. 
user clicks on a project
he is redirected to the board right away (much like the jira board) for the week/ the period span the goal has.
4 items in form of columns are visibile

##  Quick frontend design prototype

```
Project: Build Task Manager in Nodejs

| TO DO                     | IN PROGRESS               | TO BE APPROVED                |  DONE                   |
|---------------------------|---------------------------|-------------------------------|-------------------------|
| fix disable button        | respond to email          | fill new Resume               | Build Modal for creation|
| call IT service           | respond to email          | fill new Resume               | Fill replicon info      |
```


TODO: when clicking on a project, right now we get all the goals but eventually I want to first click on a project and be redirectd to a page where I have :

- a grid of two items:
    - a sort of paper of 4 spaces that acts as a fixed drawer and enables us to choose either a sprint/period, to choose a goal and later maybe more.

    - another grid that takes the remaining 8 spaces and is the content we are looking for:
        - in the case of clicking on goals: we get a paginated lists of all our goals and can crud it w/ filtering
        - in the case of clicking on period: we get a jira like 4/5 columns about the progression of my tasks
        - in the case of clicking on insight: we get a graph that shows us data about our progress (to refine)


TODO: add a graphs that shows you insight on the tasks that you completed in time, what you are late about


