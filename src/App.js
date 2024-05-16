import React, {useState} from 'react';
import "./App.css"
// const toDoList=[];

class Item {
  constructor(content, completed, index) {
    this.content = content;
    this.completed = completed;
    this.index=index;
    this.timeAdded = new Date();
    this.timeCompleted = null;
  }
}

function App() {
  const [item, setItem] = useState(new Item("",false,0));
  const [filter, setFilter] = useState(0);
  const filterText=["All", "Completed", "Active"];
  const sorterText=["A-Z", "Z-A", "Active First", "Completed First", "Time added", "Latest"];
  const [toDoList, setToDoList]=useState([]);
  const [sorter, setSorter] = useState(0);
  const [filterList, setFilterList] = useState([]);

  function sort(){
    if (sorter === 0){
      setFilterList(toDoList.slice().sort((a, b) => a.content.localeCompare(b.content)));
      setSorter(sorter+1);
    } else if (sorter === 1) {
      setFilterList(toDoList.slice().sort((a, b) => b.content.localeCompare(a.content)));
      // console.log(toDoList, "E")
      setSorter(sorter+1);
    } else if (sorter === 2) {
      setFilterList(toDoList.slice().sort((a, b) => Number(a.completed)- Number(b.completed)));
      setSorter(sorter + 1);
    } else if (sorter === 3) {
      setFilterList(toDoList.slice().sort((a, b) => Number(!a.completed)- Number(!b.completed)));
      setSorter(sorter + 1);
    } else if (sorter === 4) {
      setFilterList(toDoList.slice().sort((a, b) => a.timeAdded - b.timeAdded));
      setSorter(sorter + 1);
    } else if (sorter === 5) {
      setFilterList(toDoList.slice().sort((a, b) => b.timeAdded - a.timeAdded));
      setSorter(0);
    }
      // for (let i = 0; i < toDoList.length; i++) {
    //   // console.log(toDoList[i].index);
    //   // console.log(i);
    //   toDoList[i].index=i;
    //   // console.log(toDoList[i].index);
    //   // console.log(toDoList[i]);
    // }
    // console.log(toDoList)

    return sorter;
  }

  function findTimeText( item , isCompleted) {
    let addedDate;
    if (isCompleted) {
      addedDate = new Date(item.timeCompleted);
    } else {
      addedDate = new Date(item.timeAdded);
    }

    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - addedDate.getTime();

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let timeAgo;
    if (days > 0) {
      timeAgo = `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (hours > 0) {
      timeAgo = `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (minutes > 0) {
      timeAgo = `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (seconds!==0){
      timeAgo = `${seconds} second${seconds === 1 ? '' : 's'} ago`;
    } else {
      timeAgo = "just now"
    }
    if (isCompleted) {
      timeAgo = "Completed " +timeAgo
    } else {
      timeAgo = "Added " +timeAgo
    }
    return timeAgo;
  }

  function ListItem({ item }) {
    return (
        <button key={item.index} className="list-group-item" onClick={(e) => onCompleteChange(e, item.index)}>
          <div className="d-flex flex-row">
            <div className="me-auto">
              <input type="checkbox" className="form-check-input me-3"
                     id={item.index} checked={item.completed} readOnly/>
            </div>
            <div className="flex-fill">
              <label className="form-check-label ms-1 d-block" htmlFor={item.index}>{item.content}</label>
            </div>
            <div className="ms-auto">
              <label className="form-check-label ms-1 d-block">{findTimeText(item, item.completed)}</label>
            </div>
          </div>
        </button>
    );
  }

  function onSubmit(e) {
    e.preventDefault();
    if (item.content !== "") {
      toDoList.push(item)
      setItem(new Item("", false))
    }
  }

  function onItemChange(e) {
    setItem(new Item(e.target.value, false, toDoList.length));
  }

  function onCompleteChange(e, index) {
    const updatedList = [...toDoList];
    updatedList[index].completed = !toDoList[index].completed;
        if (updatedList[index].completed) {
          updatedList[index].timeCompleted = new Date();
        } else {
          updatedList[index].timeCompleted = null;
        }
    // updatedList[index].time = !toDoList[index].completed;
    setToDoList(updatedList);
    // updatedList[index].completed = !toDoList[index].completed;
  }

  function onCompleteFilterChange() {
    if (filter === 2) {
      setFilter(0);
    } else {
      setFilter(filter + 1);
    }
  }

  return (
      <>
        <head>
          <title>Todo</title>
          {/*<meta name="description" content="Your Video Stream App" />*/}
          <meta charSet="utf-8"/>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
                crossOrigin="anonymous"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          {/*<link rel="icon" href="/favicon.ico" />*/}
        </head>
        <h1 className="d-flex justify-content-center pt-2">Todo list</h1>
        {/*Input*/}
        <div className="mt-n1">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"
                 onChange={(e) => onCompleteFilterChange()}/>
          <div className="d-flex justify-content-center">
            <form className="row g-3" onSubmit={(e) => onSubmit(e)}>
              <input
                  className="col-auto form-control"
                  placeholder='What do you need to do today?'
                  id=""
                  type="text"
                  value={item.content}
                  onChange={(e) => onItemChange(e)}
              />
              <button
                  type="submit"
                  className="btn btn-primary mb-3"
              >
                <span className="ml-3">Add</span>
              </button>
            </form>
          </div>
          {/*Today + Visuals*/}
          <hr/>
          <div className="d-flex justify-content-around">
            <h2>Today:</h2>
            <button type="button" className="ml-auto btn btn-secondary"
                    onClick={(e) => onCompleteFilterChange()}>{filterText[filter]}</button>
            <button type="button" className="ml-auto btn btn-secondary"
                    onClick={(e) => sort()}>{sorterText[sorter]}</button>
          </div>
          {/*List of todos*/}
          <div className="mt-1 container">
            <div className="row justify-content-center ">
              <div className="col-md-8">
              <ul className="list-group">
                {filter === 1
                    ? toDoList.filter((i) => i.completed).map((item) => (
                        <ListItem key={item.index} item={item}/>
                    ))
                    : filter === 2
                        ? toDoList.filter((i) => !i.completed).map((item) => (
                            <ListItem key={item.index} item={item}/>
                        ))
                        : toDoList.map((item) => (
                            <ListItem key={item.index} item={item}/>
                        ))}
              </ul>
            </div>
          </div>
          </div>
        </div>
      </>
  );

}

export default App;
