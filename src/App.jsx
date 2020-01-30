import React, { createContext, useState, useContext} from 'react';

import { BrowserRouter as Router, Link, Switch, Route, useParams, NavLink } from 'react-router-dom';



export const TodoActions = createContext({});
export const TodoState = createContext([]);

function App() {
  const [list, setList] = useState([]);
  
  const store = ()=> {
    return {
      addTodo(){
        setList([...list, `Item ${list.length}`])
      },
      updateTodo(id, newTodo){
        //ELIMINAR REFERENCIA AL OBJETO ORIGINAL
        const localList = JSON.parse(JSON.stringify(list));
        
        //REEMPLAZAR EL OBJETO
        localList.splice(id, 1, newTodo);
        
        //NUEVO ESTADO
        setList(localList); 
      }
    }
  }
  console.log(list)
  return (
    <div >
      
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
                <div>
                  
                  <button onClick={()=>{setList([...list, `Item ${list.length}`])}}>
                    Add Item
                  </button>

                  <TodoList></TodoList>
                
                </div>
              </Route>
              <Route path="/">
                <div>
                  <br />
                  <h1>
                    BIENVENIDOS A ROMPIENDO CON NICO
                  </h1>
                  
                </div>
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
  const todoList = useContext(TodoState)
  return( 
    <div>
      Number of items:{todoList.length}
      <hr />
      {todoList[id]}
      <hr />
      <button onClick={todoStore.addTodo}>
        MAGIC
      </button>
      <button onClick={()=>todoStore.updateTodo(id, `I'm the todo number ${id}`)}>
        CHANGE MY NAME
      </button>
    </div>
  )
}




export default App;
