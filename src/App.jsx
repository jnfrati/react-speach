import React, { createContext, useState, useContext} from 'react';

import { BrowserRouter as Router, Link, Switch, Route, useParams, NavLink } from 'react-router-dom';



export const TodoActions = createContext({});
export const TodoState = createContext([]);

function App() {
  const [list, setList] = useState([]);
  
  const store = ()=> {
    console.log(list)
    console.log(this)
    return {
      addTodo(){
        setList([...list, "asd"])
      }
    }
  }
  console.log(list)
  return (
    <div >
      
      <button onClick={()=>{setList([...list, "asd"])}}>
        UseStore
      </button>
      <Router>        
      
        <Link to="/todos">
          All todos
        </Link>
        <Link to="/">
          Home
        </Link>
        <TodoState.Provider value={list}>
          <TodoActions.Provider value={store()}>
            <Switch>
              <Route path="/todos/:id">
                <TodoItem></TodoItem>
              </Route>
              <Route path="/todos">
                <TodoList></TodoList>
              </Route>
              <Route path="/">
                This is the Home
              </Route>
            </Switch>
          </TodoActions.Provider>
      
        </TodoState.Provider>
            
      </Router>
    </div>
  );
}

function TodoList(){
  const todoList = useContext(TodoState)
  return (
    <div>
      <ul>
        {todoList && todoList.map((item, index) => (
          <li key={index}>
            <NavLink to={`/todos/${index}`}>
              {item}
            </NavLink>
          </li>
        ))
        }
      </ul>
      
    </div>
  )
}

function TodoItem(){
  const {id} = useParams();
  const todoStore = useContext(TodoActions)
  return( 
    <div>
      {id}
      <button onClick={todoStore.addTodo}>
        MAGIC
      </button>
    </div>
  )
}




export default App;
