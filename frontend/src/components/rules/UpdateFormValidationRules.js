export default function validate(values) {
    let errors = {};

    if(!values.Name) {
        errors.Name = "Name is required";
    }
    else if(values.Name.length < 7) {
        errors.Name = "Minimum length should be 7 characters";
    }
    else if(!/^[A-Za-z ]*$/.test(values.Name)) {
        errors.Name = "Invalid full name";
    }

    if(!values.Email) {
        errors.Email = "Email is required";
    }
    else if(!/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(values.Email)) {
        errors.Email = "Invalid email address";
    }

    if(!values.Username) {
        errors.Username = "Username is required";
    }
    else if(values.Username.length < 5) {
        errors.Username = "Minimum length should be 5 characters";
    }
    else if(!/^[A-Za-z]+$/.test(values.Username)) {
        errors.Username = "Must have alphabets characters only";
    }

    if(!values.Password) {
        errors.Password = "Password is required";
    }
    else if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(values.Password)) {
        errors.Password = "Atleast 8 characters, 1 UPPER and lower case, 1 special character";
    }

    if(!values.DOB) {
        errors.DOB = "Choose date";
    }

    if(!values.Gender) {
        errors.Gender = "Select gender";
    }

    return errors;
}