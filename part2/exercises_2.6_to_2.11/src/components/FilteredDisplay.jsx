const FilteredDisplay = ({
    phonebookList,
    filterString
}) => {
    return(
        phonebookList.filter(
            (personObj) => personObj.name.toLowerCase().startsWith(filterString.toLowerCase())
          ).map(
            (personItem) => {
              return(<p key={personItem.name}>{personItem.name} {personItem.number}</p>)
            }
          )
    )
}

export default FilteredDisplay