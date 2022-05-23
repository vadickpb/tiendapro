import React, {useState, useEffect} from 'react'

import { Col, ListGroup, Row, Image, ListGroupItem, Button } from 'react-bootstrap';
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

import Rating from '../components/Rating';

const ProductScreen = () => {
  const {id} = useParams();



  // const product = products.find((p) => p._id === id);

  const [product, setProduct] = useState([])
  
  useEffect(()=>{
    const fetchProduct = async() => {
      const {data} = await axios.get(`/api/products/${id}`)
      setProduct(data)

    }
    fetchProduct()
  },[])

   
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Regresar
      </Link>
      <Row>
        <Col md={6}>
          <Image src= {product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{ product.name }</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} Reseñas`}/>
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
              <Button className='btn-block' type='button' disabled = {product.countInStock === 0}>Add to cart</Button>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen