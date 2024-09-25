# Db Schema

## Task table
```
| Column         | Type     | Description                                                         |
|----------------|----------|---------------------------------------------------------------------|
| id             | string   | Unique identifier (provided by Convex)                              |
| title          | string   | Title of the task                                                   |
| description    | string   | Detailed description of the task                                    |
| priority       | string   | Priority level (e.g., "high", "medium", "low")                      |
| category       | string   | Task category (e.g., "development", "email", "setup", "learning")   |
| status         | string   | Current status (e.g., "not started", "in progress", "completed")     |
| dueDate        | date     | The deadline for the task                                           |
| goalId         | string   | Foreign key referencing the related goal in the Goals table         |
| _creationTime  | date     | Automatically created by Convex (task creation time)                |
| lastUpdatedAt  | date     | Tracks when the task was last updated                               |

```

##  Goal table

```
| Column         | Type       | Description                                                        |
|----------------|------------|--------------------------------------------------------------------|
| id             | string     | Unique identifier (provided by Convex)                             |
| title          | string     | Title of the goal                                                  |
| description    | string     | Detailed description of the goal                                   |
| status         | string     | Current status of the goal (e.g., "not started", "in progress", "completed") |
| priority       | string     | Priority level of the goal ("high", "medium", "low")               |
| startDate      | date       | The start date of the goal                                         |
| dueDate        | date       | Deadline or target date for the goal                               |
| completedAt    | date/null  | Date when the goal was completed (can be null if not completed)     |
| _creationTime  | date       | Automatically created by Convex (goal creation time)               |
| lastUpdatedAt  | date       | Tracks when the goal was last updated                              |
```

