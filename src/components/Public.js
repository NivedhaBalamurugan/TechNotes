import { Link } from 'react-router-dom'

const Public = () => {

    return (

        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Bala Repairs!</span></h1>
            </header>

            <main className="public__main">
                <p>Located in chennai city, Bala Repairs  provides a trained staff ready to meet your tech repair needs.</p>
                <address className="public__addr">
                    Bala Repairs<br />
                    555 GST Drive<br />
                    chennai , 600049 <br />
                    <a href="tel:+9589652348">9589652348</a>
                </address>
                <br />
                <p>Owner: Balamurugan</p>
            </main>

            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    
   
}
export default Public