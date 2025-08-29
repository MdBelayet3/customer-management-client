import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  // function for handle form
  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user)
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log("Insight fetch function", data);

        form.reset();
      })
      .catch(error => console.error("fetch error : ", error))

  }

  return (
    <>
      <h1>Customer management client</h1>
      <p>Total users : {users.length}</p>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder='Your name' id="" /><br />
        <input type="email" name="email" placeholder='Your email' id="" /><br />
        <input type="submit" value="Add user" />
      </form>
      <div>
        {
          users.map(user => <p key={user.id}>{user.id} : {user.name} : {user.email}</p>)
        }
      </div>
    </>
  )
}

export default App
