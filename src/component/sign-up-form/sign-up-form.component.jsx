import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";
const defaultFormFieldValues = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm = () => {
    const [formFields, setFormFields]=useState(defaultFormFieldValues);
    const {displayName, email, password, confirmPassword}=formFields;


const handleSubmit = async (event) =>{
    event.preventDefault();

    if(password!==confirmPassword){
        alert("passwords does not match")
        return;
    }

    try{
        const {user} = await createAuthUserWithEmailAndPassword(email, password);
        // console.log(response);
        await createUserDocumentFromAuth(user, {displayName});
        resetFormFields();
    }catch(error){
        if(error.code === 'auth/email-already-in-use'){
            alert("Cannot create user, email already in use")
        }else{
        console.log("User creation encountered an error", error)
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
    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                label="Display Name"
                type = "text"
                onChange={handleChange}
                name="displayName"
                value={displayName}
                required/>

                <FormInput 
                label="Email"
                type = "email"
                onChange={handleChange}
                name="email"
                value={email}
                required/>
                
                <FormInput 
                label="Password"
                type = "password"
                onChange={handleChange}
                name="password"
                value={password}
                required/>                
                
                <FormInput
                label="Confirm Password" 
                type = "password"
                onChange={handleChange}
                name="confirmPassword"
                value={confirmPassword}
                required/>                
                <Button type="submit">Sign Up</Button>
            </form>
        </div>

    )
} 
    
    export default SignUpForm;