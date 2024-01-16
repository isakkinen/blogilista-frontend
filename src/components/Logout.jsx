const Logout = ({user, handleLogout}) => {
    return (
        <div>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Logout