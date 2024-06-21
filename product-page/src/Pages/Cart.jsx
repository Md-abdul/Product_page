import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Text, VStack, HStack, Button, Box, Flex } from "@chakra-ui/react";
import { PiUserCircleLight } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";

const Cart = () => {
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setCart(JSON.parse(localStorage.getItem("cart")) || []);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const totalAmount = cart.reduce((total, item) => total + item.price, 0);
  const discount = totalAmount * 0.1;
  const gratuity = totalAmount * 0.04;
  const finalAmount = totalAmount - discount + gratuity;

  return (
    <VStack spacing="4">
      <Box bg="gray.100" p={4} width="100%">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <PiUserCircleLight size="24px" />
            <Text ml={2}>Jimmy Sulliv</Text>
          </Flex>
          <Box>
            <FaRegEdit size="20px" />
          </Box>
        </Flex>
      </Box>

      {cart.map((item, index) => (
        <HStack key={index} justify="space-between" width="100%">
          <Text fontFamily="sans-serif" fontSize="large" fontWeight="600">
            {item.title}
          </Text>
          <Text fontFamily="sans-serif" fontSize="large" fontWeight="600">
            ${item.price.toFixed(2)}
          </Text>
        </HStack>
      ))}

      <HStack
        justify="space-between"
        width="100%"
        pt="4"
        borderTop="3px solid gray"
        mt={5}
      >
        <Text fontFamily="sans-serif" fontSize="large" fontWeight="600">
          Subtotal:
        </Text>
        <Text fontFamily="sans-serif" fontSize="large" fontWeight="600">
          ${totalAmount.toFixed(2)}
        </Text>
      </HStack>
      <HStack justify="space-between" width="100%">
        <Text>Discount (10%):</Text>
        <Text>-${discount.toFixed(2)}</Text>
      </HStack>
      <HStack justify="space-between" width="100%">
        <Text>Gratuity (4%):</Text>
        <Text>${gratuity.toFixed(2)}</Text>
      </HStack>
      <HStack justify="space-between" width="100%" pt="4">
        <Text fontFamily="sans-serif" fontSize="large" fontWeight="600">
          Total:
        </Text>
        <Text fontFamily="sans-serif" fontSize="large" fontWeight="600">
          ${finalAmount.toFixed(2)}
        </Text>
      </HStack>
      <Button width="100%" mt={20} border="2px dashed black" p={8}>
        Add Voucher Code
      </Button>
      <Button bgColor="#FF8A65" width="100%" mt={3} p={8}>
        <Text color="white" fontSize="x-large" fontWeight={600}>
          Print Receipt
        </Text>
      </Button>
    </VStack>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Cart;
