const AddNewRecord = ({
    nameValue,
    nameInputHandler,
    numberValue,
    numberInputHandler,
    onSubmitHandler
}) => {
    return(
        <form onSubmit={onSubmitHandler}>
            <div>
                name: <input value={nameValue} onChange={nameInputHandler}/>
            </div>
            <div>
                number: <input value={numberValue} onChange={numberInputHandler}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AddNewRecord