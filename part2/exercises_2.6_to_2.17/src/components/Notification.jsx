const Notification = ({notificationObj}) => {
    const {message, type} = notificationObj
    if(message === null){
        return null
    }
    let style = {
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    switch(type){
        case 'info':
            style = {...style, color: "green"}
            break;
        case 'error':
            style = {...style, color: "red"}
            break;
    }

    return(
        <div style={style}>
            {message}
        </div>
    )
}

export default Notification