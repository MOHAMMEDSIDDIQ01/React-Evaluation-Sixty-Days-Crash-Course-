import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Link as ChakraLink,
  Flex,
  Heading,
  useColorModeValue,
  Stack,
  Collapse,
  IconButton,
  useDisclosure
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const links = [
  {
    to: "/",
    label: "Home"
  },
  {
    to: "/about",
    label: "About"
  },
  {
    to: "/contact",
    label: "Contact"
  },
  {
    to: "/products",
    label: "Products"
  }
];

const NavLink = ({ to, label }) => (
  <ChakraLink
    as={RouterLink}
    to={to}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}>
    {label}
  </ChakraLink>
);

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { authDetails, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Heading size="lg" color="gray.600">
            ShopEase
          </Heading>
        </Flex>
        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
          <Stack direction={'row'} spacing={8}>
            {authDetails.isAuthenticated
              ? links.map((link) => (
                <NavLink key={link.to} to={link.to} label={link.label} />
              ))
              : <NavLink to="/login" label="Login" />
            }
          </Stack>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          {authDetails.isAuthenticated && (
            <>
              <span>{authDetails.email}</span>
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'md'}
                fontWeight={400}
                h={8}
                variant="outline"
                colorScheme="teal"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </>
          )}
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg={useColorModeValue('white', 'gray.800')}
          p={4}
          display={{ md: 'none' }}>
          {authDetails.isAuthenticated
            ? links.map((link) => (
              <NavLink key={link.to} to={link.to} label={link.label} />
            ))
            : <NavLink to="/login" label="Login" />
          }
        </Stack>
      </Collapse>
    </Box>
  );
}
