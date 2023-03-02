let LoginForm = document.querySelector("form.login");
let SignupForm = document.querySelector("form.signup");
let loginBtn = document.querySelector("label.login");
let signupBtn = document.querySelector("label.signup");
let signupLink = document.querySelector(".signup-link a");
let loginText = document.querySelector(".title-text .login");
let signupText = document.querySelector(".title-text .signup");
let logoutBtn = document.querySelector(".logout");

//by clicking the signup botton, move the css to display other half of the form.
signupBtn.onclick = (() =>{
    LoginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (() =>{
    LoginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
})

//by clicking the link, switch the form to sign up.
signupLink.onclick = (() =>{
    signupBtn.click();
    return false;
});

document.querySelector('input.register').addEventListener('click', (e) => {
    e.preventDefault()

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const data = {name, email, password}

    const handleFormData = async () => {
       const sent = await fetch('https://bitpurplemonkey.herokuapp.com/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        // try {
        //     const response = await sent.json()
        //     console.log(response)
        //     li.textContent = '${response.name} => ${response.email}'
        // } catch (error) {
        //    console.log(error)
        // }
    }

    handleFormData()
})

document.querySelector('input.login').addEventListener('click', (e) => {
    e.preventDefault()

    const email = document.getElementById('loginemail').value
    const password = document.getElementById('loginpassword').value

    const data = {email, password}

    const handleFormData = async () => {
       const sent = await fetch('https://bitpurplemonkey.herokuapp.com/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        try {
            const response = await sent.json()
            console.log(response.token)

            let login_msg =document.querySelector(".login_msg")
            login_msg.append(response.msg);

            sessionStorage.setItem("token", response.token)
        } catch (error) {
           console.log(error)
        }
    }

    handleFormData()
})

//Logout on click event function
document.querySelector('.logout').addEventListener('click', (e) => {
    e.preventDefault()

    const handleFormData = async () => {
        const sent = await fetch('https://bitpurplemonkey.herokuapp.com/api/v1/auth/logout', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },

         })
         try {
            const response = await sent.json()
            //by removing the session token, it's acting as a temporary log out function
            sessionStorage.removeItem("token", response.token)
        } catch (error) {
           console.log(error)
        }
    }
    handleFormData()
})