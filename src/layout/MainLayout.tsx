import React, { ReactNode } from "react";
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
          EzDex
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => {
        return (
          <NavItem
            key={link.name}
            path={link.path ?? ""}
            icon={link.icon}
            list={link.children}
          >
            {link.name}
          </NavItem>
        );
      })}
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
        EzDex
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          onClick={toggleColorMode}
          icon={colorMode === "dark" ? <FiSun /> : <FiMoon />}
        />
        <Flex alignItems={"center"}>
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
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
