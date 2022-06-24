import React, {useState, useEffect} from 'react'
import { Link, useLocation} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Message from '../Components/Message.js'
import Loader from '../Components/Loader.js'
import { Form, Button, Row, Col } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { getUserDetails,updateUserProfile } from '../actions/userActions.js'
import FormContainer from '../Components/FormContainer.js'

const ProfileScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const navigate = useNavigate()
    

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading , error , user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile
    useEffect(()=> {
        if(!userInfo){
            navigate('/login')
        }else {
            if(!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch, navigate, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage("Passowords Don't Match")
        }else {
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
    }
  return <Row>
    <Col md={3}>
    <h1>User Details</h1>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="danger">Profile Updated</Message>}
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
                Update
            </Button>
        </Form>

    </Col>
    <Col md={9}>
        My Orders
    </Col>
  </Row>
}

export default ProfileScreen