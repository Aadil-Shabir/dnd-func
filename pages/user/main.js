import { useState, useContext, useEffect } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Flex,
  IconButton,
  Image,
  Avatar,
  Button,
  useColorMode,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Circle,
  Divider,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  useToast,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import {
  AddIcon,
  MoonIcon,
  SunIcon,
  SearchIcon,
  SmallCloseIcon,
  SmallAddIcon,
} from '@chakra-ui/icons';
import Diagram from '../../components/toolstring/Diagram';
import { BsPrinterFill } from 'react-icons/bs';
import { FaFileCsv, FaCog } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { ToolstringContext } from '../../context/ToolstringContext';
import { useRouter } from 'next/router';
import ToolsList from '../../components/toolstring/ToolsList';
import DiagramsList from '../../components/toolstring/DiagramsList';
import AddTool from '../../components/toolstring/AddTool';
import Settings from '../../components/toolstring/Settings';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { Offline, Online, Detector } from 'react-detect-offline';

import { nanoid } from 'nanoid';

const tabList = [
  {
    name: 'Toolstring',
  },
];

const Redirect = ({ to }) => {
  const router = useRouter();
  useEffect(() => {
    router.replace(to);
  }, [to]);

  return null;
};

export default function main() {
  const { currentUser, handleLogout } = useContext(AuthContext);

  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const {
    showDiagram,
    setShowDiagram,
    searchToolstrings,
    setSearchToolstrings,
    addTool,
    setAddTool,
    showSettings,
    setShowSettings,
    filteredToolstrings,
    searchTools,
    setSearchTools,
    filteredTools,
    filterByTag,
    setFilterByTag,
  } = useContext(ToolstringContext);

  // if (!currentUser) {
  //   return <Redirect to='/login' />;
  // }

  return (
    <>
      <Settings />
      <AddTool />
      <div className='relative'>
        <Tabs variant='unstyled' size='md'>
          <div className='fixed top-0 left-0 right-0'>
            <Flex w='full' justify='space-between'>
              <TabList>
                <Tab>
                  <Image boxSize='32px' src='/logo.svg' />
                </Tab>

                {tabList.map((item, index) => (
                  <Tab
                    key={index}
                    _selected={{
                      color: 'blue.600',
                    }}
                    p={3}
                  >
                    <Text fontSize='12px'>{item.name}</Text>
                  </Tab>
                ))}
              </TabList>
              <Flex mt={2}>
                {colorMode === 'light' ? (
                  <IconButton
                    variant='outline'
                    aria-label='Toggle Dark'
                    icon={<MoonIcon />}
                    onClick={toggleColorMode}
                    colorScheme='blue'
                    size='sm'
                  />
                ) : (
                  <IconButton
                    variant='outline'
                    aria-label='Toggle Light'
                    icon={<SunIcon />}
                    onClick={toggleColorMode}
                    colorScheme='blue'
                    size='sm'
                  />
                )}
                <Avatar
                  size='sm'
                  name={currentUser ? currentUser?.email : ''}
                  ml={6}
                  src={currentUser ? currentUser?.photoURL : ''}
                />
                <Button
                  size='sm'
                  variant='outline'
                  colorScheme='blue'
                  ml={3}
                  mr={6}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Flex>
            </Flex>
          </div>
          <div className='fixed top-12 left-0 right-0'>
            <Flex w='full' h='full'>
              <TabPanels>
                <TabPanel p={0}></TabPanel>
                {/* toolstring panel start */}

                <TabPanel p={0}>
                  <Flex w='full' align='center' justify='space-between'>
                    <Flex
                      w='full'
                      h='48px'
                      borderTopWidth='1px'
                      borderBottomWidth='1px'
                      align='center'
                    >
                      <IconButton
                        variant='outline'
                        colorScheme='blue'
                        size='sm'
                        icon={<AddIcon />}
                        mx={4}
                        onClick={() => setShowDiagram(true)}
                      />
                      <Divider orientation='vertical' />
                      <Flex w='full' align='center' justify='space-between'>
                        <HStack spacing='16px' ml={4}>
                          <Button
                            variant='solid'
                            colorScheme='blue'
                            size='sm'
                            w='70px'
                            onClick={() =>
                              alert(
                                'save toolstring diagram to Firebase. if !doc.exists() setDoc() else updateDoc()'
                              )
                            }
                          >
                            Save
                          </Button>
                          <IconButton
                            variant='outline'
                            colorScheme='blue'
                            size='sm'
                            icon={<FaFileCsv />}
                            onClick={() =>
                              alert(
                                'export to CSV the filtered tools list. Either full list or filtered'
                              )
                            }
                          />
                          <IconButton
                            variant='outline'
                            colorScheme='blue'
                            size='sm'
                            icon={<BsPrinterFill />}
                            onClick={() =>
                              alert('react to print the toolstring diagram')
                            }
                          />
                          <IconButton
                            variant='outline'
                            colorScheme='blue'
                            size='sm'
                            icon={<FaCog />}
                            onClick={() => setShowSettings(true)}
                          />
                          <IconButton
                            variant='outline'
                            colorScheme='blue'
                            size='sm'
                            icon={<BsQuestionCircleFill />}
                            onClick={() => alert('open help drawer')}
                          />
                        </HStack>
                      </Flex>
                      <Flex mr={6}>
                        <Online>
                          <Tag size='sm' colorScheme='green'>
                            <TagLabel>online</TagLabel>
                          </Tag>
                        </Online>
                        <Offline>
                          <Tag size='sm' colorScheme='red'>
                            <TagLabel>offline</TagLabel>
                          </Tag>
                        </Offline>
                        {/* <Detector
                          render={({ online }) => (
                            <>
                              {online
                                ? null
                                : toast({
                                    title: 'You are currently offline',
                                    description:
                                      'Data will be stored locally and synced when appear back online',
                                    status: 'warning',
                                    duration: 5000,
                                    isClosable: true,
                                    position: 'top-right',
                                  })}
                            </>
                          )}
                        /> */}
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex w='full' minH='full' justify='space-between'>
                    <Flex
                      w='220px'
                      h='100vh'
                      borderRightWidth='1px'
                      flexDir='column'
                      p={3}
                    >
                      <Flex
                        w='full'
                        mb={3}
                        justify='space-between'
                        align='center'
                      >
                        <Flex>
                          <Text fontSize='xs' mr={3}>
                            Tools:
                          </Text>
                          <Circle
                            size='20px'
                            color='white'
                            bg='blue.400'
                            mr={3}
                          >
                            <Text fontSize='8px'>{filteredTools?.length}</Text>
                          </Circle>
                        </Flex>
                        <Flex>
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label='Filter options'
                              variant='outline'
                              colorScheme='blue'
                              icon={<TbAdjustmentsHorizontal />}
                              size='xs'
                              mr={3}
                              zIndex={9999}
                            />
                            <MenuList>
                              <MenuItem
                                type='radio'
                                onClick={() => alert('filter by green tag')}
                              >
                                <Box w='30px' h='15px' bg='green.500' mr={3} />
                                <span>Green tag</span>
                              </MenuItem>

                              <MenuItem
                                type='radio'
                                onClick={() => alert('filter by yellow tag')}
                              >
                                <Box w='30px' h='15px' bg='yellow.300' mr={3} />
                                <span>Yellow tag</span>
                              </MenuItem>
                              <MenuItem
                                type='radio'
                                onClick={() => alert('filter by red tag')}
                              >
                                <Box w='30px' h='15px' bg='red.500' mr={3} />
                                <span>Red tag</span>
                              </MenuItem>
                              <MenuItem
                                type='radio'
                                onClick={() => alert('filter by no tag')}
                              >
                                <Box
                                  w='30px'
                                  h='15px'
                                  borderWidth='1px'
                                  mr={3}
                                />
                                <span>No tag</span>
                              </MenuItem>
                            </MenuList>
                          </Menu>
                          <IconButton
                            variant='outline'
                            colorScheme='blue'
                            size='xs'
                            aria-label='Reset search'
                            icon={<SmallAddIcon />}
                            onClick={() => setAddTool(true)}
                          />
                        </Flex>
                      </Flex>
                      <Flex mb={3}>
                        <InputGroup w='420px' size='sm'>
                          <InputLeftElement
                            pointerEvents='none'
                            children={<SearchIcon color='gray.300' />}
                          />
                          <Input
                            borderRadius='6px'
                            type='text'
                            placeholder='Search tools'
                            value={searchTools}
                            onChange={(e) => setSearchTools(e.target.value)}
                            borderWidth='1px'
                            fontSize='sm'
                          />
                          <InputRightElement>
                            <IconButton
                              size='xs'
                              aria-label='Reset search'
                              icon={<SmallCloseIcon />}
                              variant='ghost'
                              onClick={(e) => setSearchTools('')}
                              _hover={{ bg: 'none' }}
                            />
                          </InputRightElement>
                        </InputGroup>
                      </Flex>
                      <div className='overflow-y-auto scrollbar-hide'>
                        <ToolsList />
                      </div>
                    </Flex>

                    <Flex w='654px' h='100vh' px={2}>
                      <div className='overflow-y-auto scrollbar-hide'>
                        {showDiagram && <Diagram />}
                      </div>
                    </Flex>

                    <Flex
                      w='220px'
                      h='100vh'
                      borderLeftWidth='1px'
                      flexDir='column'
                      p={3}
                    >
                      <Flex w='full' mb={4}>
                        <Text fontSize='xs' mr={3}>
                          Diagrams:
                        </Text>
                        <Circle size='20px' color='white' bg='blue.400' mr={3}>
                          <Text fontSize='8px'>
                            {filteredToolstrings?.length}
                          </Text>
                        </Circle>
                      </Flex>
                      <Flex>
                        <InputGroup w='420px' size='sm'>
                          <InputLeftElement
                            pointerEvents='none'
                            children={<SearchIcon color='gray.300' />}
                          />
                          <Input
                            borderRadius='6px'
                            type='text'
                            placeholder='Search diagrams'
                            value={searchToolstrings}
                            onChange={(e) =>
                              setSearchToolstrings(e.target.value)
                            }
                            borderWidth='1px'
                            fontSize='sm'
                          />
                          <InputRightElement>
                            <IconButton
                              size='xs'
                              aria-label='Reset search'
                              icon={<SmallCloseIcon />}
                              variant='ghost'
                              onClick={(e) => setSearchToolstrings('')}
                              _hover={{ bg: 'none' }}
                            />
                          </InputRightElement>
                        </InputGroup>
                      </Flex>
                      <div className='overflow-y-auto scrollbar-hide mt-3'>
                        <DiagramsList />
                      </div>
                    </Flex>
                  </Flex>
                </TabPanel>
                {/* toolstring panel end */}
              </TabPanels>
            </Flex>
          </div>
        </Tabs>
      </div>
    </>
  );
}
