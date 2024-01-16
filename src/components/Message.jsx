const Message = ({ message }) => {
    if (!message) return <></>

    const style = {
        color: message.isError ? "red" : "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px"
    }

    return (
        <div style={style}>
            {message.message}
        </div>
    )
}

export default Message