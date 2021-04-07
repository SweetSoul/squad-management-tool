# Squad Management Tool

Tags and badges

## Technologies used

This application was made using only the mostly needed technology within the application. Above is a descriptive list of everything used.

### Layout

- Pure-css3
- HTML5 native elements

### State Management

- [React Redux](https://react-redux.js.org/)

### Routing

- [React Router](https://reactrouter.com/web/guides/quick-start)

### API

- Comms via [Axios](https://github.com/axios/axios)
- Data from [AllSportApi](https://allsportsapi.com/) better organized at [MockApi](https://mockapi.io)
- [Teams endpoint](https://6040127af3abf00017785815.mockapi.io/api/v3/teams) & [Players endpoint](https://6040127af3abf00017785815.mockapi.io/api/v3/players)

----

## Table of Content

- [Squad Management Tool](#squad-management-tool)
  - [Technologies used](#technologies-used)
    - [Layout](#layout)
    - [State Management](#state-management)
    - [Routing](#routing)
    - [API](#api)
  - [Table of Content](#table-of-content)
  - [Installation](#installation)
  - [Code explaining](#code-explaining)
    - [Folder Structure](#folder-structure)
    - [Dashboard page](#dashboard-page)
      - [TeamsBoard (My teams)](#teamsboard-my-teams)

----

## Installation

This is just a showcase of my skills, but in case you want to see it in action on localhost, just follow the steps below.

Clone the repo

```bash
git clone https://github.com/SweetSoul/squad-management-tool
```

Enter folder and install deps

```bash
cd squad-management-tool 
npm i
```

Start node server as you would in create-react-app

```bash
npm start
```

Open any browser in [localhost:3000](http://localhost:3000)

----

## Code explaining

### Folder Structure

First in the folder structure i tried to be as clean as the time let me be. I had the objective to deliver all features working in the given time.

![Folder Structure](https://sweetsoul.sirv.com/Images/venturus/Screenshot_1.png)

src/components -> Contains every component child from the pages and its childs  
src/features -> Redux slices  
src/media -> Used media  
src/pages -> Parent pages to components (Are called in routes)  
src/styles -> Contains all css modules for pages and components  
src/utils -> Some reusable functions  

### Dashboard page

There is 4 components being loaded

![Dashboard](https://sweetsoul.sirv.com/Images/venturus/dashboard.png)

- Topbar - just the topbar
- TeamsBoard (My teams)
- AvgBoard (Top 5)
- PlayersHighlight (Most / Less pickeds player)
  
#### TeamsBoard (My teams)  

This component is composed by html title row and a table which is a child component named SortingTable.js that gets the dataSource for table mounting (in our case the teams redux store)  
Expect to see a fully functional table with pagination (10 to 10 rows) and sorting when clicking on one of the two table headings [Name || Description]  
By default it won't sort by anything  
  
P.S.: TablePagination is built inside utils and has some needed props. I've made it a reusable component in order to access it easily. Props needed:

- count > Total length of table items
- page > Current page (state controlled)
- rowsPerPage > # of rows shown per page
- onChangePage > Function that will handle what happens when clicking the next/previous buttons