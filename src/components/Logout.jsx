import PropTypes from 'prop-types'

const Logout = ({ user, handleLogout }) => {
    return (
        <div>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

Logout.propTypes = {
    user: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired,
}

export default Logout