import { useState,useContext } from "react";
import { Box, TextField, Button, styled , Typography} from "@mui/material";
import {API} from '../../service/api';
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";


// we passed Box here so update box wrapper with component
// it is a styled component
const Component = styled(Box)`
  background-color:#e6e6e6;
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;


// css for error
const Error=styled(Typography)`
  font-size:10px;
  color:#ff6161;
  font-weight:600;
  margin-top:10px;
  line-height:0;

`;
// here css properties declared as a object variables
const Image = styled("img")({
  width: 200,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const LoginButton=styled(Button)`
  background:#FB603A;
  font-size:15px;
box-shadow: 3px 7px 13px #888888;
`

const SignUpButton=styled(Button)`
box-shadow: 3px 5px 10px #888888;
`
// we have to apply css on box which contains buttons
const Wrapper=styled(Box)`
  padding:25px 35px;
  display:flex;
  flex:1;
  flex-direction:column;
  gap: 15px;
`

// object to store the values
const signupInitialValues={
  name:'',
  username:'',
  password:''
}

// object to store initial values of login
const loginInitialValues={
  username:'',
  password:''
}
const Login = ({isUserAuthenticated}) => {
  const imageURL =
    "https://cdn.pixabay.com/photo/2012/05/07/18/57/blog-49006_1280.png";

    const [account,toggleAccount]=useState('login');

    const [signup,setSignup]=useState(signupInitialValues);

    const [error,setError]=useState('');
 
    const [login,setLogin]=useState(loginInitialValues)

    const {setAccount}=useContext(DataContext);

    const navigate=useNavigate();

    const toggleSignUp=()=>{
      account==='login'? toggleAccount('signup') : toggleAccount('login')
    }

    const onInputChange=(e)=>{
      setSignup({...signup,[e.target.name]:e.target.value});
    }

    const onValueChange=(e)=>{
      setLogin({ ...login ,[e.target.name]:e.target.value});
    }

    const loginUser=async ()=>{
        let response=await API.userLogin(login);
        if(response.isSuccess){
            setError('');
            sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);
            setAccount({username:response.data.username,name:response.data.name})

            // if user is authenticated ,set as true
            isUserAuthenticated(true);
            // if login successful 
            navigate('/');
        }
        else{
          setError('Something went wrong!Please try again later');
        }
      }

    const signupUser =async()=>{
      let response=await API.userSignup(signup);
      if(response.isSuccess){
        setError('');
        setSignup(signupInitialValues);
        toggleAccount('login');
      }
      else{
        setError('Something went wrong!Please try again later');
      }
    }
  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="Login" />
        {
          account==='login' ?
                <Wrapper>
                <TextField variant="standard" value={login.username} onChange={(e)=>onValueChange(e)} name="username" label="Enter the Username"/>
                <TextField variant="standard" value={login.password} onChange={(e)=>onValueChange(e)} name="password" label="Enter the Password"/>
                {error && <Error>{error}</Error>}
                <LoginButton variant="contained" onClick={()=>loginUser()}>Login</LoginButton>
               
                <Typography style={{textAlign:'center',color:'#878787'}}>OR</Typography>
               
                <SignUpButton onClick={()=>toggleSignUp()}>Create an account</SignUpButton>
              </Wrapper>
            
        :


              <Wrapper>
              <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='name' label="Enter the Name"/>
              <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='username' label="Enter the Username"/>
              <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='password' label="Enter the Password"/>


              {/* showing error , show it only when error occurs*/}
              {/* {error && <Typography>{error}</Typography>} */}
              {/* after defining css typography->Error */}
              {error && <Error>{error}</Error>}

              {/* calling api using onclick signupUser func */}
              <SignUpButton onClick={()=>signupUser()}>SignUp</SignUpButton> 
              
              <Typography style={{textAlign:'center',color:'#878787'}}>OR</Typography>
              <LoginButton variant="contained" onClick={()=>toggleSignUp()}> Already have an account</LoginButton>
              
            </Wrapper>

        }
      </Box>
    </Component>
  );
};

export default Login;