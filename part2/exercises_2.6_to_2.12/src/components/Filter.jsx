const Filter = ({ filterString, filterEventHandler }) => {
    return(
        <div>
            filter shown with: <input value={filterString} onChange={filterEventHandler}/>
        </div>
    )
}

export default Filter