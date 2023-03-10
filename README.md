# Taskger

This is a project to manage tasks of team works.

## Clone Project

First you should clone this repository, you can run:

### `git clone https://github.com/MarielaRH/taskger_react.git`

## Run Project

After in the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\

When the project is running it will be necessary add into the file App.tsx the token for the project can make the queries and mutations to the API. Into this file there is a variable named 'token'.

## About Project

This project has the ability to create, update and delete tasks, each task need a name, user assignee, due date, status and tags to be clasificate.

Within the project there are three main routes:

##### `/` and `/tasger` shows dashboard-page
##### `/mytasks` shows my-tasks-page
##### `/settings` shows profile-page

Core this project is the dashboard page, because in this page is where we can manage tasks, within dashboard page there are five columns in which tasks will be clasificated by status, that columns are:

* `Todo`
* `In Progress`
* `Backlog`
* `Cancelled`
* `Done`

The following libraries were used to build this project:

* [React 18.2.0](https://es.reactjs.org/) for build the project
* [Tailiwind css](https://tailwindcss.com/) for styles
* [MUI](https://mui.com/) for some components
* [Material Tailwind](https://www.material-tailwind.com/) for some components
* [Graphql](https://graphql.org/) and [Apollo Client](https://www.apollographql.com/docs/react/) for connect with the API

## Project Images

### Dashboard page with sidebar hide
<img src="https://github.com/MarielaRH/taskger_react/blob/main/src/public/screenshots/dashboard2.png">

### Dashboard page showing sidebar 
<img src="https://github.com/MarielaRH/taskger_react/blob/main/src/public/screenshots/dashboard.png">

### Profile page
<img src="https://github.com/MarielaRH/taskger_react/blob/main/src/public/screenshots/profile.png">

### Task car
<img src="https://github.com/MarielaRH/taskger_react/blob/main/src/public/screenshots/taskcard.png">

### Form for create and update a task
<img src="https://github.com/MarielaRH/taskger_react/blob/main/src/public/screenshots/tasksform.png">

