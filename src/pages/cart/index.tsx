import dynamic from 'next/dynamic';

const Cart = dynamic(() => import('@/components/cart'), {
  ssr: false,
});

const Order: React.FC = () => {
  return (
    <Cart />
  )
};

export default Order;