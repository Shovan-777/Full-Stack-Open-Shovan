import { useState } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import List from './components/List';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', num: '987777777' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [newFilter, setFilter] = useState('');

  const forNameChange = (event) => {
    setNewName(event.target.value);
  };

  const forNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const forFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      num: newNum
    };
    if (!persons.some(person => person.name === newName)) {
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNum('');
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const showPersons = newFilter
    ? persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} onFilterChange={forFilterChange} />
      <h3>add a new</h3>
      <PersonForm 
        newName={newName} 
        newNum={newNum} 
        onNameChange={forNameChange} 
        onNumChange={forNumChange} 
        onSubmit={addPerson} 
      />
      <h3>Numbers</h3>
      <List persons={showPersons} />
    </div>
  );
};

export default App;
