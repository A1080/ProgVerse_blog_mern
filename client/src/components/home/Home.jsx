
// components
import { Box, Typography,Grid } from "@mui/material";
import Banner from "../banner/Banner";
import Categories from "./Categories";
import Posts from "./post/Posts"; 

const Home=()=>{
    return(
        // <div>Hello From Home</div>
        <>
        <Banner/>
        <Grid container>
            <Grid item lg={2} sm={2} xs={12}>
                <Categories/>
            </Grid>
            <Grid container xs={12} sm={10} lg={10}>
                {/* Posts */}
                <Posts/>
            </Grid>
        </Grid>
        {/* <Categories/> */}
        </>
    )
}

export default Home;