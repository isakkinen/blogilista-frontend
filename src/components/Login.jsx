import { useState } from 'react'
import PropTypes from 'prop-types'

const Login = ({ handleSubmit }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event, username, password)}>
                username <input id="username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                <br></br>
                password <input id="password" type='password' value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

Login.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
}

export default Login