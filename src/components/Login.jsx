import { useState } from "react"

const Login = ({handleSubmit, username, setUsername, password, setPassword}) => {
    return (
        <div>
            <form onSubmit={() => handleSubmit(event, username, password)}>
                username <input value={username} onChange={(event) => setUsername(event.target.value)}></input>
                <br></br>
                password <input type='password' value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login