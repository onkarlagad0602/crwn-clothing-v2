import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFieldValues = {
    email:'',
    password:'',
}

const SignInForm = () => {
    const [formFields, setFormFields]=useState(defaultFormFieldValues);
    const {email, password}=formFields;

const handleSubmit = async (event) =>{
    event.preventDefault();

   

    try{
        const response = await signInAuthUserWithEmailAndPassword(email, password);
        console.log(response);
        resetFormFields();
    }catch(error){
        switch (error){
            case 'auth/wrong-password':
                alert("incorrect password for email")
                break;
            case 'auth/user-not-found':
                alert("user not found for given email")
                break;
            default:
                console.log("User creation encountered an error", error)
                break;


        }
         
    }
}
    console.log(formFields)

    const resetFormFields = () =>{
        setFormFields(defaultFormFieldValues);
    }
    const handleChange=(event)=>{
        const {name, value}=event.target;
        setFormFields({...formFields, [name]:value})

    }
    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
      };
    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
               
                <FormInput 
                label="Email"
                type = "text"
                onChange={handleChange}
                name="email"
                value={email}
                required/>
                
                <FormInput 
                label="Password"
                type = "text"
                onChange={handleChange}
                name="password"
                value={password}
                required/>                

                <div className="buttons-container">         
                    <Button type="submit">Sign In</Button>
                    <Button buttonType='google' type='button' onClick={signInWithGoogle }>Google Sign In</Button>
                </div>
            </form>
        </div>

    )
} 
    
    export default SignInForm;