export default function validate(values) {
    let errors = {};
    if(!values.Email) {
        errors.Email = "Email address is required";
    }
    else if(!/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(values.Email)) {
        errors.Email = "Invalid email address";
    }
    if(!values.Password) {
        errors.password = "Password is required";
    }
    else if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(values.Password)) {
        errors.Password = "Atleast 8 characters, 1 UPPER and lower case, 1 special character";
    }
    return errors;
}