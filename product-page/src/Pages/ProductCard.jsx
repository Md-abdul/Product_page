import PropTypes from "prop-types";
import {
  Box,
  Image,
  Text,
  Stack,
  Heading,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ id, image, title, price }) => {
  const handleAddToCart = () => {
    const product = { id, image, title, price };
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage")); 
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      _hover={{ boxShadow: "md" }}
      transition="all 0.3s"
      p={2}
    >
      <Box>
        <Image
          bg="gray.200"
          src={image}
          alt={title}
          maxH="100%"
          objectFit="cover"
        />
      </Box>
      <Box p="3">
        <Stack spacing="2">
          <Heading as="h6" size="sm" textAlign="left" fontFamily="sans-serif">
            {title}
          </Heading>
          <HStack justifyContent="space-between">
            <Text fontSize="xl" color="red.500" textAlign="left">
              ${price}
            </Text>
            <Icon
              as={FaShoppingCart}
              color="teal.500"
              cursor="pointer"
              onClick={handleAddToCart}
            />
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductCard;
