import React, { useEffect, useState } from 'react'

import { Col, ListGroup, Row, Image, ListGroupItem, Button, Form } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';

import Rating from '../components/Rating';
import { ListProductDetails } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({}) => {

  const [qty, setQty] = useState(0)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { id } = useParams();
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(ListProductDetails(id))
  }, [dispatch])

  
  const addToCartHandler = () => {
    
    navigate(`/cart/${id}?qty=${qty}`)
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Regresar
      </Link>

      {
        loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} Reseñas`}
                  />
                </ListGroup.Item>
                <ListGroupItem>
                  Precio: ${product.price}
                </ListGroupItem>
                <ListGroupItem>
                  Descripción: {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col md={6}>
                      Precio:
                    </Col>
                    <Col md={6}>
                      {product.price}
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>
                      Stado:
                    </Col>
                    <Col>
                      {product.countInStock > 0 ? 'Disponible' : 'Agotado'}
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>
                      Cantidad:
                    </Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {
                          [...Array(product.countInStock).keys()].map(x => (
                            <option key={x + 1}> {x + 1}</option>
                          ))
                        }

                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}>
                    Add to cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>

        )
      }
    </>
  )
}

export default ProductScreen