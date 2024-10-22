import { useState, useEffect } from 'react';
import phoneService from './services/serverstuff';
import Message from './components/message';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import List from './components/List';

const App = () => {
  
  const [persons, setPersons] = useState([]);
  useEffect(
    ()=>{
      phoneService.getAll()
      .then(initialpersons =>{
        setPersons(initialpersons)
      })
    },
    []
  );
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [newFilter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('success');

  


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
    const existingPerson = persons.find(person => person.name === newName);
    const newPerson = {
      name: newName,
      num: newNum
    };

    if (existingPerson) {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with the new one?`)) {
        phoneService.update(existingPerson.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : updatedPerson
            ));
            setNewName('');
            setNewNum('');
            setNotificationMessage(`Updated ${newName}'s number`);
            setNotificationType('success');
            setTimeout(() => {
              setNotificationMessage(null);
            }, 7000);
          })
          .catch(error => {
            setNotificationMessage(`Failed to update ${newName}'s number`);
            setNotificationType('error');
            setTimeout(() => {
              setNotificationMessage(null);
            }, 7000);
          });
      }
    } else {
      phoneService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNum('');
          setNotificationMessage(`Updated ${newName}'s number`);
          setNotificationType('success');
          setTimeout(() => {
            setNotificationMessage(null);
          }, 7000);
        })
        .catch(error => {
          setNotificationMessage(`Failed to add ${newName} to the server`);
            setNotificationType('error');
            setTimeout(() => {
              setNotificationMessage(null);
            }, 7000);
        });
    }

  };

  const showPersons = newFilter
    ? persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))
    : persons;

    const deletePerson = (id, name) => {
      if (window.confirm(`Delete ${name}?`)) {
        console.log(id);
        phoneService.remove(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id)); 
            setNotificationMessage(`Deleted ${name}`);
          setNotificationType('success');
          setTimeout(() => {
            setNotificationMessage(null);
          }, 7000)
          })
          .catch(error => {
            setNotificationMessage(`The person '${name}' is not in the server.`);
            setNotificationType('error');
            setTimeout(() => {
              setNotificationMessage(null);
            }, 7000);
          });
      }
    };
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={notificationMessage} type={notificationType} />

      <Filter filter={newFilter} onFilterChange={forFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        newName={newName} 
        newNum={newNum} 
        onNameChange={forNameChange} 
        onNumChange={forNumChange} 
        onSubmit={addPerson} 
      />
      <h2>Numbers</h2>
      <List persons={showPersons} onDelete={deletePerson} />
    </div>
  );
};

export default App;
