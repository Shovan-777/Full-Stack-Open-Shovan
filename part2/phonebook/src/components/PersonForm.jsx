const PersonForm = ({ newName, newNum, onNameChange, onNumChange, onSubmit }) => {
    return (
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={newNum} onChange={onNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
  };
  
  export default PersonForm;
  