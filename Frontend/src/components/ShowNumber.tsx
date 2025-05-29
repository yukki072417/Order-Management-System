import 'react'
import './styles/ShowOrder.css'
import { Container } from 'react-bootstrap'

const ShowNumber = () => {
  return (
    <>
      <Container className='order-number-container'>
        <h4 className='order-number-label'>注文番号</h4>
        <h1 className='order-number-text'>101</h1>
      </Container>
    </>
  )
}

export default ShowNumber