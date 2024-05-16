import React, {useState} from 'react';
import "./App.css"
// const toDoList=[];

class Item {
  constructor(content, completed, index) {
    this.content = content;
    this.completed = completed;
    this.index=index;
  }
}

function App() {
  const [item, setItem] = useState(new Item("",false,0));
  const [filter, setFilter] = useState(0);
  const filterText=["All", "Completed", "Active"];
  const [toDoList, setToDoList]=useState([]);

  function ListItem({ item }) {
    return (
        <li key={item.index} className="list-group-item">
          <input type="checkbox" className="form-check-input me-3"
                 id={item.index} checked={item.completed}
                 onChange={(e) => onCompleteChange(e, item.index)}/>
          <label className="form-check-label ms-1 d-block" htmlFor={item.index}>{item.content}</label>
        </li>
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
    const updatedList = [...toDoList]; // Create a copy of the array
    // updatedList[index] = {...updatedList[index], completed: !updatedList[index].completed}; // Update the completed property
    updatedList[index].completed = !toDoList[index].completed;
    setToDoList(updatedList);
    // updatedList[index].completed = !toDoList[index].completed;
  }

  function onCompleteFilterChange() {
    console.log("eeee")
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
