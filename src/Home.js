const Home = () => {

    const handleClick = () => {
        console.log('hello, ninjas');
    }

    const handleClickAgain = (name) => {
        console.log('Hello ' + name)
    }
    return ( 
        <div className="home">
            <h2> Homepage 1</h2>
           <h1> {localStorage.getItem('Name')}</h1>
        </div>

     );
}
 
export default Home;