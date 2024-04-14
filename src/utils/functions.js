export const validation = (type, value) => {


    switch (type) {
        case "first_name":
        case "firstName":
        case "lastName":
        case "last_name":
        case "name":
        case "nombre":
        case "surname":

            if (value.length < 3) {
                return "The name must be at least 3 characters long."
            }

            return ""

        case "email":

            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

            if (!emailRegex.test(value)) {
                return "The format of the email must be correct.";
            }

            return "";

        case "password_hash":
        case "passwordHash":
        case "password":

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,12}$/;
            if (!passwordRegex.test(value)) {
                return "Must contain between 7 and 12 characters, one lower case, one upper case and numbers.";
            }

            return "";

        case "description":

            if (value.length < 1) {
                return "Description is necessary"
            }

            return "";

        case "image":

            if (value.length < 1) {
                return "Image is necessary"
            }

            return "";

        default:
            console.log("errrrror");
    }

}