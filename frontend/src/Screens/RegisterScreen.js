import React, {useState, useEffect} from 'react'
import { Link, useLocation} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Message from '../Components/Message.js'
import Loader from '../Components/Loader.js'
import { Form, Button, Row, Col } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { register } from '../actions/userActions.js'
import FormContainer from '../Components/FormContainer.js'

const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const location = useLocation()
    const navigate = useNavigate()
    
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading , error , userInfo} = userRegister

    useEffect(()=> {
        if(userInfo)
            navigate(redirect)
    },[navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage("Passowords Don't Match")
        }else {
            dispatch(register(name, email, password))
        }
    }
  return (
    <FormContainer>
        <h1>Register</h1>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter Name' value={name} onChange = {(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' value={email} onChange = {(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Passoword</Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password} onChange = {(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPwd'>
                <Form.Label>Confirm Passoword</Form.Label>
                <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Sign In
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Have an Account ?{' '}
                <Link to = {redirect ? `/login?redirect=${redirect}` : '/register'}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen