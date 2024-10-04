const List = ({ persons }) => {
    return (
      <ul>
        {persons.map(person => (
          <li key={person.name}>
            {person.name} {person.num}
          </li>
        ))}
      </ul>
    );
  };
  
  export default List;
  