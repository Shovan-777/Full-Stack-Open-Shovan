const List = ({ persons, onDelete }) => {
    return (
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name} {person.num}
            <button onClick={() => onDelete(person.id, person.name)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default List;
  
