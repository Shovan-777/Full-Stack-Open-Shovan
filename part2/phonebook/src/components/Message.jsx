
const Message = ({ message,type}) => {
    if (message === null) {
      return null
    }
    const messageStyle = {
        color: type === 'success' ? 'green' : 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      };
  
    return (
      <div style={messageStyle}>
        {message}
      </div>
    );
  }

  export default Message;