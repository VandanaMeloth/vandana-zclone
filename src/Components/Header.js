import React from 'react';
import '../Styles/header.css';
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login'
import Modal from 'react-modal';
import axios from "axios";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: '1px solid brown',
        
    },
};
class Header extends React.Component{

    constructor()
    {
        super();
        this.state={
            isLoginModalIsOpen : false,
            createAccountModalIsOpen:false,
            isLoggedIn:false,
            loggedInUser:undefined,
            email:'',
            password:'',
            firstName: undefined
        }
    }

    handleUserLogin = () => {
        const { email, password,firstName } = this.state;
        
        const loginObj = {
            email: email,
            password: password,
           
        };
        console.log(loginObj);
        axios({
            method: 'POST',
            url: 'https://limitless-headland-80936.herokuapp.com/login',
            headers: { 'Content-Type': 'application/json' },
            data: loginObj,
            
        })
            .then(response => {
                if (!email || !password ) {
                    //this.setState({ isLoginModalIsOpen: false});
                     alert("Please enter valid Details!");
                    
                 }
                 else
                {
                    this.setState({
                    isLoggedIn: response.data.isAuthenticated,
                    isLoginModalIsOpen: false,
                    email: '',
                    password: '',
                    
                });
                this.setState({isLoggedIn:true,isLoginModalIsOpen:false,loggedInUser:"Welcome"});
                alert("Login Successfull !",{position:"top-center"});
               
            }
            
            })
        
            .catch(err => console.log(err))
            
    }

    handleNavigate= () =>{
        this.props.history.push('/');
    }
    handleLogin =() =>{
        this.setState({ isLoginModalIsOpen:true });
    }
    responseGoogle = (response) => 
    {   
        this.setState({loggedInUser:response.profileObj.name,isLoggedIn:true,isLoginModalIsOpen:false});
        console.log(response)
    }
    handleLogout =()=>
    {
        this.setState({isLoggedIn: false,loggedInUser:undefined});
        this.props.history.push('/');
    }

    handleChange = (event, state) => {
        this.setState({ [state]: event.target.value })
    }

    componentClicked= (data)=>{
        console.warn(data);
    }

    responseFacebook = (response) => 
    {
        this.setState({isLoggedIn: true, loggedInUser: response.name, isLoginModalIsOpen: false});
        console.log(response);
    }
    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }
    
    render(){
        const {isLoginModalIsOpen,isLoggedIn,loggedInUser,email,password}=this.state;
        return(
            <div className="header">
                <div className="header-logo" onClick={this.handleNavigate}>
                    <b>vs!</b>
                </div>
                {isLoggedIn ? <div className="user-login">
                    <div className="login" >{loggedInUser}</div>
                    <div className="signup" onClick={this.handleLogout}>Logout</div>
                </div>  : <div className="user-login">
                    <div className="login" onClick={this.handleLogin}>Login</div>
                   
                </div>}

                <Modal
                    isOpen={isLoginModalIsOpen}
                    style={customStyles}
                >
                     <div style={{ float: 'right' }} className="fas fa-times" onClick={() => this.handleModal('isLoginModalIsOpen', false)}></div>
                    <div class="col-xs-16 col-sm-14 col-sm-offset-1 login-col"><p className="text-center">Login</p>
                    
                    <div >
                        <GoogleLogin
                        clientId="346880393414-ca2dsjpiat0hglmvad3211spv7ah4kf8.apps.googleusercontent.com"
                        buttonText="Continue with Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        className="google-signup"
                        />

                    </div>
                    <div >
                        <FacebookLogin
                            appId="903847573671006"
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={this.componentClicked}
                            callback={this.responseFacebook}
                            textButton="Continue with Facebook"
                            cssClass="facebook-signup"
                            icon="fa-facebook-square"
                         />
                    </div>
                   
                    <div class="f-16 col-xs-4 col-xs-offset-1 m-t-lg text-center fs-5" >OR</div>

                    <div>
                        <input type="text"  placeholder="Email" required="Email required" className="input-login" onChange={(event) => this.handleChange(event, 'email')} ></input>
                    </div>
                    
                    <div>
                        <input type="password" placeholder="Password " required="Enter valid password" className="input-login" onChange={(event) => this.handleChange(event, 'password')}></input>
                    </div>

                    <div className="d-grid gap-2 col-6 mx-auto" >
                        <button className="btn btn-danger login-btn btn-lg" onClick={this.handleUserLogin}>Login</button>
                    </div>
                   

                    </div>
                    

                </Modal>
            </div>
        )
        
    
    }
}
export default withRouter(Header);