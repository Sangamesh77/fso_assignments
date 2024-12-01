import phoneBookService from "../services/phoneBook"

const FilteredDisplay = ({
    phonebookList,
    filterString,
    deleteHandler
}) => {
    return(
      <ul>
        {phonebookList.filter(
            (personObj) => personObj.name.toLowerCase().startsWith(filterString.toLowerCase())
          ).map(
            (personItem) => {
              return(
                <li key={personItem.id}>
                  {personItem.name} {personItem.number} 
                  <button onClick={() => deleteHandler(personItem)}>delete</button>
                </li>
            )
            }
          )
    }
    </ul>
    )
}

export default FilteredDisplay