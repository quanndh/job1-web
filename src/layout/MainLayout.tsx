import React, { ReactNode, useEffect } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  UnorderedList,
  ListItem,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import {
  FiUser,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { IconType } from "react-icons";
import { AppRoutes } from "../routes";
import { useLocation, useNavigate } from "react-router-dom";
import { Const } from "../constants";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Injected } from "../connectors";
import Blockchain from "../uilts/Blockchain";

interface LinkItemProps {
  name: string;
  icon: IconType;
  children?: Omit<LinkItemProps, "icon">[];
  path?: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Account", icon: FiUser, path: AppRoutes.root },
  {
    name: "Presales",
    icon: FaFire,
    children: [
      { name: "ApeSale", path: AppRoutes.apesale },
      { name: "PinkSale", path: AppRoutes.pinksale },
      { name: "Unicrypt", path: AppRoutes.unicrypt },
      { name: "Gempad", path: AppRoutes.gempad },
      { name: "Pandasale", path: AppRoutes.pandasale },
    ],
  },
  { name: "Settings", icon: FiSettings },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { account, active, activate, chainId } = useWeb3React<Web3Provider>();

  const isLogin = true;

  const handleSwitchNetwork = async () => {
    if (active && Const.CHAIN_ID !== chainId) {
      const rpcUrls =
        Const.CHAIN_ID === 56
          ? [
              "https://bsc-dataseed1.binance.org/",
              "https://bsc-dataseed2.binance.org/",
              "https://bsc-dataseed4.binance.org/",
            ]
          : [
              "https://data-seed-prebsc-1-s1.binance.org:8545/",
              "https://data-seed-prebsc-2-s1.binance.org:8545/",
              "http://data-seed-prebsc-2-s2.binance.org:8545/",
            ];

      try {
        await (window as any).ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: `0x${Const.CHAIN_ID.toString(16)}`,
            },
          ],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await (window as any).ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${Const.CHAIN_ID.toString(16)}`,
                  chainName: "Binance Smart Chain",
                  rpcUrls: rpcUrls /* ... */,
                },
              ],
            });
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
    }
  };

  useEffect(() => {
    handleSwitchNetwork();
  }, [chainId]);

  const handleConnectMetamask = async () => {
    await activate(Injected);
  };
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          EzBot
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <Flex
        alignItems={"center"}
        display={{ base: "block", md: "none" }}
        mx={8}
        mb={4}
      >
        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
          >
            <HStack>
              <Avatar size={"sm"} />
              <VStack alignItems="flex-start" spacing="1px" ml="2">
                <Text color="white" fontSize="sm">
                  Justina Clark
                </Text>
              </VStack>
              <Box display={{ base: "none", md: "flex" }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg={useColorModeValue("white", "gray.900")}
            borderColor={useColorModeValue("gray.200", "gray.700")}
          >
            <MenuItem>Profile</MenuItem>
            <MenuDivider />
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {isLogin && (
        <Button
          mb={4}
          onClick={handleConnectMetamask}
          colorScheme={active && chainId !== Const.CHAIN_ID ? "red" : "teal"}
          variant="outline"
          display={{ base: "block", md: "none" }}
          mx="8"
        >
          {active
            ? chainId === Const.CHAIN_ID
              ? Blockchain.formatAddress(account ?? "")
              : "Wrong network"
            : "Connect to Metamask"}
        </Button>
      )}

      {LinkItems.map((link, index) => {
        return (
          <NavItem
            key={link.path ?? "" + index}
            path={link.path ?? ""}
            icon={link.icon}
            list={link.children}
          >
            {link.name}
          </NavItem>
        );
      })}
      <IconButton
        size="lg"
        mt={4}
        variant="ghost"
        aria-label="open menu"
        onClick={toggleColorMode}
        icon={colorMode === "dark" ? <FiSun /> : <FiMoon />}
        display={{ base: "block", md: "none" }}
        className="flex justify-center"
        mx="8"
      />
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: any;
  list?: Omit<LinkItemProps, "icon">[];
  path: string;
}
const NavItem = ({ icon, children, list, path, ...rest }: NavItemProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (list && list.length) {
    return (
      <Accordion allowToggle>
        <AccordionItem
          flexDirection="column"
          display="flex"
          alignItems="center"
          role="group"
          cursor="pointer"
          border="none"
          p="4"
          mx="4"
        >
          <AccordionButton p={0} borderRadius="lg" _hover={{}}>
            <Link
              style={{ textDecoration: "none" }}
              _focus={{ boxShadow: "none" }}
              color={
                pathname.includes(path) && path !== "/" && path !== ""
                  ? "teal"
                  : "gray.500"
              }
              fontWeight={
                pathname.includes(path) && path !== "/" && path !== ""
                  ? "semibold"
                  : "normal"
              }
            >
              <Flex {...rest} align="center">
                {icon && (
                  <Icon mr="4" fontSize="16" _groupHover={{}} as={icon} />
                )}
                {children}
              </Flex>
            </Link>
            <AccordionIcon
              ml={10}
              color={
                pathname.includes(path) && path !== "/" && path !== ""
                  ? "teal"
                  : "gray.500"
              }
              fontWeight={
                pathname.includes(path) && path !== "/" && path !== ""
                  ? "semibold"
                  : "normal"
              }
            />
          </AccordionButton>
          <AccordionPanel>
            <UnorderedList className="space-y-5">
              {list.map((item) => (
                <ListItem
                  key={item.path}
                  color={pathname === item.path ? "teal" : "gray.500"}
                  fontWeight={pathname === item.path ? "semibold" : "normal"}
                  onClick={() => navigate(item.path ?? "")}
                >
                  {item.name}
                </ListItem>
              ))}
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Link
      color={pathname === path ? "teal" : "gray.500"}
      fontWeight={pathname === path ? "semibold" : "normal"}
      onClick={() => navigate(path)}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { account, active, activate, chainId } = useWeb3React<Web3Provider>();

  const isLogin = true;

  const handleSwitchNetwork = async () => {
    if (active && Const.CHAIN_ID !== chainId) {
      const rpcUrls =
        Const.CHAIN_ID === 56
          ? [
              "https://bsc-dataseed1.binance.org/",
              "https://bsc-dataseed2.binance.org/",
              "https://bsc-dataseed4.binance.org/",
            ]
          : [
              "https://data-seed-prebsc-1-s1.binance.org:8545/",
              "https://data-seed-prebsc-2-s1.binance.org:8545/",
              "http://data-seed-prebsc-2-s2.binance.org:8545/",
            ];

      try {
        await (window as any).ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: `0x${Const.CHAIN_ID.toString(16)}`,
            },
          ],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await (window as any).ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${Const.CHAIN_ID.toString(16)}`,
                  chainName: "Binance Smart Chain",
                  rpcUrls: rpcUrls /* ... */,
                },
              ],
            });
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
    }
  };

  useEffect(() => {
    handleSwitchNetwork();
  }, [chainId]);

  const handleConnectMetamask = async () => {
    await activate(Injected);
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        EzBot
      </Text>

      <HStack spacing={{ base: "4" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          onClick={toggleColorMode}
          icon={colorMode === "dark" ? <FiSun /> : <FiMoon />}
          display={{ base: "none", md: "block" }}
        />

        {isLogin && (
          <Button
            onClick={handleConnectMetamask}
            colorScheme={active && chainId !== Const.CHAIN_ID ? "red" : "teal"}
            variant="outline"
            display={{ base: "none", md: "block" }}
          >
            {active
              ? chainId === Const.CHAIN_ID
                ? Blockchain.formatAddress(account ?? "")
                : "Wrong network"
              : "Connect"}
          </Button>
        )}

        <Flex alignItems={"center"} display={{ base: "none", md: "display" }}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
