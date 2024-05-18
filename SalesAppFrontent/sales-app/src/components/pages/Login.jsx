import { useState } from 'react'; 
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button'; 
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';

import axios from 'axios'
import { API_BASE_URL } from '../../config'
import Swal from 'sweetalert2'

function Login() {
    const [formData, setFormData] = useState({ // Using useState hook to manage form data
        email: '', // Initializing email state
        password: '', // Initializing password state
    });

    const handleChange = (e) => { // Event handler for input changes
        const { name, value } = e.target;
        setFormData((prevData) => ({ // Updating form data state
            ...prevData,
            [name]: value,
        }));
    };


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => { // Event handler for form submission
        e.preventDefault();

        const requestData = {
            email: formData.email,
            password: formData.password,
        }
        axios.post(`${API_BASE_URL}/login`, requestData)
            .then((result) => {
                if (result.status == 200) {

                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem('user', JSON.stringify(result.data.result.user));
                    dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });

                    navigate('/Addsales');
                }
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.error
                })
            })
    };

    return (
        <>
            <h1>Login Form</h1>
            <br></br>
            <div className="form-container">
                <Form onSubmit={handleSubmit} className="form"> {/* Form component with onSubmit event */}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email} // Binding input value to email state
                            onChange={handleChange} // Binding onChange event to handleChange function
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password} // Binding input value to password state
                            onChange={handleChange} // Binding onChange event to handleChange function
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="btn-submit">
                        Login
                    </Button>
                </Form>
                <br />
                <p>OR</p>
                <br />
                <Link to="/Register">New USer Signup Please</Link>

            </div>
        </>
    );
}

export default Login; // Exporting the Login component
