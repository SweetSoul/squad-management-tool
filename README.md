<h1 align='center'> 
  <img src='https://sweetsoul.sirv.com/Images/venturus/logo192.png' width='50' align='center'/> 
  <b>Squad Management Tool</b>
</h1>

<p align='center'>
<img src='https://img.shields.io/github/license/sweetsoul/squad-management-tool' align='center'>
<img src='https://img.shields.io/tokei/lines/github/sweetsoul/squad-management-tool' align='center'>
</p>
<p align='center'>
👉 <img src='https://img.shields.io/badge/Demo-online-brightgreen' href='https://squad-management-tool-ochre.vercel.app/'> 👈
</p>

## 1. <b>Technologies used</b>

This application was made using only the mostly needed technology within the application. Above is a descriptive list of everything used.

### 1.1. <b>Layout</b>

- Pure-css3
- HTML5 native elements

### 1.2. <b>State Management</b>

- [React Redux](https://react-redux.js.org/)

### 1.3. <b>Routing</b>

- [React Router](https://reactrouter.com/web/guides/quick-start)

### 1.4. <b>API</b>

- Comms via [Axios](https://github.com/axios/axios)
- Data from [AllSportApi](https://allsportsapi.com/) better organized at [MockApi](https://mockapi.io)
- [Teams endpoint](https://6040127af3abf00017785815.mockapi.io/api/v3/teams) & [Players endpoint](https://6040127af3abf00017785815.mockapi.io/api/v3/players)

----

## 2. <b>Table of Content</b>

- [1. <b>Technologies used</b>](#1-btechnologies-usedb)
  - [1.1. <b>Layout</b>](#11-blayoutb)
  - [1.2. <b>State Management</b>](#12-bstate-managementb)
  - [1.3. <b>Routing</b>](#13-broutingb)
  - [1.4. <b>API</b>](#14-bapib)
- [2. <b>Table of Content</b>](#2-btable-of-contentb)
- [3. <b>Installation</b>](#3-binstallationb)
- [4. <b>Code explaining</b>](#4-bcode-explainingb)
  - [4.1. <b>Folder Structure</b>](#41-bfolder-structureb)
  - [4.2. <b>Dashboard page</b> 📊](#42-bdashboard-pageb-)
    - [4.2.1. <b>TeamsBoard (My teams) 📋</b>](#421-bteamsboard-my-teams-b)
    - [4.2.2. <b>AvgBoard</b> ➗](#422-bavgboardb-)
    - [4.2.3. <b>PlayersHighlight</b> 🌟](#423-bplayershighlightb-)
  - [4.3. <b>TeamEditor Page</b> ✏️](#43-bteameditor-pageb-️)
    - [4.3.1. <b> TeamInfoForm </b>](#431-b-teaminfoform-b)
    - [4.3.2. <b>Team Information Section (TeamInformationSection.js)</b> ✍️](#432-bteam-information-section-teaminformationsectionjsb-️)
    - [4.3.3. <b>Configure Squad Section(ConfigureSquadSection.js)</b> ⚙️](#433-bconfigure-squad-sectionconfiguresquadsectionjsb-️)
    - [4.3.4. <b>Save Button</b> 💾](#434-bsave-buttonb-)
    - [4.3.5. <b>Unsaved validation</b> ⚠️](#435-bunsaved-validationb-️)
- [Testing Scope](#testing-scope)

----

## 3. <b>Installation</b>

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

## 4. <b>Code explaining</b>

### 4.1. <b>Folder Structure</b>

First in the folder structure i tried to be as clean as the time let me be. I had the objective to deliver all features working in the given time.

![Folder Structure](https://sweetsoul.sirv.com/Images/venturus/Screenshot_1.png)

src/components -> Contains every component child from the pages and its childs  
src/features -> Redux slices  
src/media -> Used media  
src/pages -> Parent pages to components (Are called in routes)  
src/styles -> Contains all css modules for pages and components  
src/utils -> Some reusable functions  

### 4.2. <b>Dashboard page</b> 📊

There is 4 components being loaded

![Dashboard](https://sweetsoul.sirv.com/Images/venturus/dashboard.png)

- Topbar - just the topbar
- TeamsBoard (My teams)
- AvgBoard (Top 5)
- PlayersHighlight (Most / Less pickeds player)
  
#### 4.2.1. <b>TeamsBoard (My teams) 📋</b>

This component is composed by html title row and a table which is a child component named SortingTable.js that gets the dataSource for table mounting (in our case the teams redux store)  
Expect to see a fully functional table with pagination (10 to 10 rows) and sorting when clicking on one of the two table headings [Name || Description]  
By default it won't sort by anything  

```javascript
<SortingTable 
  teams={teamStore} //Redux teams store
/>
```
  
P.S.: TablePagination is built inside utils and has some needed props. I've made it a reusable component in order to access it easily. Props needed:

```javascript
<TablePaginationActions 
  count={items.length} //Total length of table items
  rowsPerPage={10} // Current page (state controlled)
  page={page} // # of rows shown per page
  onChangePage={handleChangePage} //Function that will handle what happens when clicking the next/previous buttons
/>
```

#### 4.2.2. <b>AvgBoard</b> ➗

This components loads the playerStore from redux that was accessed by the page Dashboard and passed through props and calculates the averages after the first render, then it renders a list of divs organizing as requested.

```javascript
<AvgBoard 
  players={playerStore} //Redux players store
/>
```

Inside the component we have all the logic that is needed.

#### 4.2.3. <b>PlayersHighlight</b> 🌟

As AvgBoard, it will access the playerStore passed from props and do his math. It uses the utils/ImageFromText.js to generate the image from given player name. If user access the teams and save players to new positions it will recalculate once going back to dashboard.

```javascript
<PlayersHighlight 
  players={playerStore} //Redux players store
/>
```

### 4.3. <b>TeamEditor Page</b> ✏️

There are two ways of accessing the TeamEditor page component. First if we access directly throug '<i>/team</i>' route or '<i>/team/:id</i>' route. In either way the components are the same, only changing it's content and save action.

Eg.: If you enter through '<i>/team</i>' route you'll see the following title in rendered card

![Create team title](https://sweetsoul.sirv.com/Images/venturus/create_team.png)

Now if you enter through route that passes id as a URL param you'll see

![Edit team title](https://sweetsoul.sirv.com/Images/venturus/edit_team.png)

That's one of the many content that are loaded dynamically. Most of them accessing the teamStore and retrieving the correct value for the specified field.

#### 4.3.1. <b> TeamInfoForm </b>

Receives the two sections of inputs and perform some data gathering.

#### 4.3.2. <b>Team Information Section (TeamInformationSection.js)</b> ✍️

This section of the page holds many fields that could be filled with team information or empty in case you're trying to add a new team. <b>VALIDATION OF THE FIELDS ARE ASYNCHRONOUS AND ON THE FLY, except Team type</b>

![Team info form](https://sweetsoul.sirv.com/Images/venturus/teamInfoForm.png)

On the left side we have a col holding two form inputs. Plain and simple. Just the Team name will be validated.  
On the right side there is two normal inputs, one text and one radio and a tag with a textarea. Team website is validated through  The expected behaviour is to add a new tag when the user press 'ENTER', ';' or try to click out of the field with text inside the input. In this particular field there is a simple validation of tags, if you try to put a tag that is already present it would not accept it.

#### 4.3.3. <b>Configure Squad Section(ConfigureSquadSection.js)</b> ⚙️

In this section there is two cols, one with the formation select and the field (with the dropzone) and other with a serch input and the rendered cards of the players.

![Configure Squad](https://sweetsoul.sirv.com/Images/venturus/configure_squad2.png)

If you change the formation, the field would arrange the drop zones accordingly.  
To assign a player, just drag its card and drop at spot that you want it to be. When doing this, it will generate an image with the First Name and Last Name letters. If you hover the player in field it will show a popover with further information of the player. As seen below. If you want to remove the player, you could just replace it for another player or click on it in the field.

![Hover image](https://sweetsoul.sirv.com/Images/venturus/hover_field.png)

You will notice that uppon dragging the player and putting it into the field will remove it from the player list. And uppon entering some text in the search input you'll see the list being filtered by the name and everything working as they should.

#### 4.3.4. <b>Save Button</b> 💾

The save button will only be enabled if you change any information on the page. However, it will only save if you have filled the minimun required fields such as Team Name, Team Website and Team type fields.  

#### 4.3.5. <b>Unsaved validation</b> ⚠️

If you try to exit the page without saving and having made some change, it will trigger a modal showing you what you are about to do.  

![ModalShown](https://sweetsoul.sirv.com/Images/venturus/modal.png)

----

## Testing Scope

Coding...

![Coding Gif](https://media.giphy.com/media/LmNwrBhejkK9EFP504/source.gif)
