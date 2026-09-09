function Greeting(props) {
    return (
        <div>
            <h2>Welcome {props.name}</h2>
            <p>age {props.age}</p>
            <p>city {props.city}</p>
        </div>
    );
}
export default Greeting;