import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import Rating from '../Components/Rating'
import {detailProducts} from '../actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const ProductScreen = () => {
    let {id} = useParams()
    let navigate = useNavigate()

    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    useEffect(()=>{
        dispatch(detailProducts(id))
    },[id, dispatch])

    const addToCartHandler = () => {
        navigate(`../cart/${id}?qty=${qty}`)
    }

  return (
    <div>
        <Link className='btn btn-dark my-3' to='/'>
            Go Back
        </Link>
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
        (<Row>
        <Col md={6}>
            <Image src ={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews}`}/>
                </ListGroup.Item>
                <ListGroup.Item>
                    Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                    Description: ${product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup.Item variant='flush'>
                    <Row>
                        <Col>Price</Col>
                        <Col>
                            <strong>${product.price}</strong>    
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item variant='flush'>
                    <Row>
                        <Col>Status: </Col>
                        <Col>
                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}   
                        </Col>
                    </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && 
                <ListGroup.Item>
                    <Row>
                        <Col>Qty</Col>
                        <Col>
                            <Form.Select size="sm" value={qty} onChange={(e) => setQty(e.target.value)}>
                                {[...Array(product.countInStock).keys()].map(x => (
                                    <option key = {x + 1} value={x + 1} >    
                                        {x + 1}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                </ListGroup.Item>}

                <ListGroup.Item>
                    <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>Add to Cart</Button>
                </ListGroup.Item>
            </Card>
        </Col>
    </Row>)}
    </div>
  )
}

export default ProductScreen