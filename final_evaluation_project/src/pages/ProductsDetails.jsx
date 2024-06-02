import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useToast } from "@chakra-ui/react";
import axios from "axios";
import LoadingIndicator from "../components/LoadingIndictor";
import ErrorIndictor from "../components/ErrorIndictor";
const ProductsDetails = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toast = useToast();

  const fetchProductDetails = async (productId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products/${productId}`);
      const data = response.data;
      setProductDetails(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchProductDetails(productId);
  }, [productId]);

  const handleAddToCart = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    toast({
      title: "Item added to cart",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndictor />;
  }

  return (
    <Box p={4}>
      {productDetails && (
        <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
          <Box mb={4}>
            <strong>Title:</strong> {productDetails.title}
          </Box>
          <Box mb={4}>
            <strong>Price:</strong> ${productDetails.price}
          </Box>
          <Box mb={4}>
            <strong>Description:</strong> {productDetails.description}
          </Box>
          <Button colorScheme="teal" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Box>
      )}

      <AlertDialog isOpen={isDialogOpen} onClose={handleCancel}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Add to Cart</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to add this item to cart?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button colorScheme="teal" onClick={handleConfirm} ml={3}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default ProductsDetails;
