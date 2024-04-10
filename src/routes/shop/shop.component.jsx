import { useContext } from 'react'
import SHOP_DATA from '../../shop-data.json';
import { ProductsContext } from '../../context/products.context';

const Shop = () => {
    const {products}= useContext(ProductsContext)
    return (
    <div>
    {SHOP_DATA.map(({id, name})=>{
        return (
            <div key={id}>
                <h1>{name}</h1>
            </div>
        )
    })}
        <h1></h1>
    </div>)
}
export default Shop;