import { useEffect, useState } from "react";
import { Box, Button, Flex, Input, SimpleGrid, Text } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import data from "../Data/data";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiSolidCoffeeTogo } from "react-icons/bi";

export const Product = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    setProducts(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
  };

  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", lg: "row" }}
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bg="gray.100"
    >
      <Box display="flex" flexDirection="column" w="70%" p={3}>
        <Flex
          alignItems="center"
          p={4}
          borderRadius="md"
          flexDirection={{ base: "column", md: "row" }}
          gap={4}
        >
          <Flex alignItems="center" flex="1">
            <Input
              placeholder="Search all product here..."
              size="md"
              borderRadius="md"
              bg="white"
              w={{ sm: "35%", lg: "50%" }}
              mr={2}
            />
            <Button
              bgColor="#FF8A65"
              size="md"
              borderRadius="md"
              _hover={{ bg: "#82B1FF" }}
            >
              <Text color="white" fontSize="md" fontWeight={600}>
                Search
              </Text>
            </Button>
          </Flex>
          <Box display={{ base: "none", lg: "block" }}>
            <RxHamburgerMenu size="24px" />
          </Box>
        </Flex>

        <Flex p={3} gap={4} wrap="wrap">
          {["Iced", "Latte", "Espresso", "Capp", "Mocha"].map((item, index) => (
            <Box
              key={index}
              p={2}
              bg="white"
              borderRadius="md"
              _hover={{ bg: "#82B1FF" }}
            >
              <Flex alignItems="center">
                <BiSolidCoffeeTogo size="24px" />
                <Text
                  ml={2}
                  fontFamily="sans-serif"
                  fontSize="md"
                  fontWeight={600}
                >
                  {item}
                </Text>
              </Flex>
            </Box>
          ))}
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.name}
              price={product.price}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </SimpleGrid>
      </Box>
      <Box
        w={{ base: "100%", lg: "400px" }}
        p="6"
        boxShadow="md"
        bg="white"
        borderRadius="md"
        mt={{ base: 6, lg: "-23%" }}
      >
        <Cart cart={cart} />
      </Box>
    </Box>
  );
};

export default Product;
