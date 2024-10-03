const Header = (props)=> {
    return (
      <h2>{props.course}</h2>
    );
  }
  
  const Part = (props)=> {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    );
  }
  
  const Content = (props)=> {
    return (
      <div>
        {props.parts.map(note=> 
          <Part key={note.id} part={note.name} exercises={note.exercises}></Part>
        )}
      </div>
    );
  }
  
  const Total = (props)=> {
    const total = props.parts.reduce((s, p) =>s+p.exercises,0);
    return (
      <p><h3>total of {total} exercises</h3></p>
    );
  }
  
  const Course=({course})=>{
    return(
    <>
    <Header course={course.name} />
    <Content parts={course.parts}/>
    <Total parts={course.parts} />
    </>
    );
  }

  export default Course