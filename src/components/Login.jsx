import { useState } from "react"

const Login = ({handleSubmit}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event, username, password)}>
                username <input value={username} onChange={(event) => setUsername(event.target.value)}></input>
                <br></br>
                password <input type='password' value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login