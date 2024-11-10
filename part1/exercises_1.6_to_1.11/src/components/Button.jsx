const Button = ({children, onClickAction}) => {
    return(
        <button onClick={onClickAction}>{children}</button>
    )
}

export default Button