import React,{useState, useEffect} from 'react'
import { useParams,useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './add-edit.css';

const initialState={
    name: "",
    email: "",
    contact: ""
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const {name, email, contact} = state;
    const navigate = useNavigate();
    const {id}= useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email || !contact){
            toast.error("Please enter all the details in a form");
        } else {
            if(!id){
                axios.post("http://localhost:8000/api/post",{name, email,contact}).then(() => {
                setState(initialState);
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Added Successfully");
            } else {
                axios.put(`http://localhost:8000/api/update/${id}`,{name, email,contact}).then(() => {
                setState(initialState);
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Updated Successfully");
            }
            setTimeout(()=>{
                navigate("/");
            },500);
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value});
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/get/${id}`).then((resp) => setState({...resp.data[0]}));
    },[id])

    return (
        <div style={{marginTop: '100px'}}>
            <form style={{margin: "auto", padding: '15px', maxWidth: "400px", alignContent: "center"}} onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input type="text" id="name" placeholder='Enter a name' name="name" value={name || ''} onChange={handleInputChange}/>
                <label htmlFor='email'>Email</label>
                <input type="text" id="email" name="email" placeholder='Enter a email' value={email || ''} onChange={handleInputChange}/>
                <label htmlFor='contact'>Contact</label>
                <input type="number" id="contact" name="contact"placeholder='Enter a contact No' value={contact || ''} onChange={handleInputChange}/>
                <input type="submit" value={ id ? "Update" : "Save"}/>
                <Link to="/">
                    <input type="button" value="Go Back"/>
                </Link>
            </form>
        </div>
    )
}

export default AddEdit;