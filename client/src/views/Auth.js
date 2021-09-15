import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/Registerform";

const Auth = ({authRoute}) => {
    return(
        <div>
            Task

            {authRoute == 'login' && <LoginForm/>}
            {authRoute == 'register' && <RegisterForm/>}
        </div>
    );
};

export default Auth;