import Header from "./header";
import Search from "./search";
import FeaturedJobListings from './categories'
import Footer from "./footer";

function Home()
{
    return(
        <main>
            
            <Search/>
            <FeaturedJobListings/>
        
            
        </main>
    )
}

export default Home;