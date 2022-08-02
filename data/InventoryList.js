import { useState, useContext, forwardRef } from 'react';
import {
  Flex,
  Text,
  Button,
  Circle,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Grid,
  GridItem,
  Center,
  SimpleGrid,
  Box,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import {
  SunIcon,
  MoonIcon,
  SmallCloseIcon,
  SearchIcon,
  AddIcon,
  EditIcon,
  DeleteIcon,
} from '@chakra-ui/icons';
import moment from 'moment';
import _ from 'lodash';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ToolstringContext } from '../context/ToolstringContext';

const InventoryList = forwardRef((props, ref) => {
  const { filteredTools } = useContext(ToolstringContext);
  const sectionBg = useColorModeValue('gray.100', 'gray.700');
  const toast = useToast();

  const now = moment.utc();

  const getDaysToExpire = (expiryDate) => {
    const end = moment(expiryDate);
    const days = now.diff(end, 'days');
    return days;
  };

  return (
    <>
      <Flex flexDir='column' ref={ref} className='printComponent'>
        <Flex w='full' mb={3} justifyItems='start' align='center'>
          <Flex mr={3}>
            <Text>Records:</Text>
          </Flex>
          <Flex>
            <Circle bg='blue.500' color='white' size='18px'>
              <Text fontSize='11px'>{filteredTools?.length}</Text>
            </Circle>
          </Flex>
        </Flex>

        <Flex
          w='full'
          h='36px'
          bg={sectionBg}
          align='center'
          justify='space-between'
        >
          <Center w='30px'>
            <Text fontSize='xs'>No.</Text>
          </Center>

          <Flex w='120px'>
            <Text fontSize='xs'>Description</Text>
          </Flex>
          <Center w='100px'>
            <Text fontSize='xs'>ID Number</Text>
          </Center>

          <Center w='100px'>
            <Text fontSize='xs'>Category</Text>
          </Center>

          <Center w='100px'>
            <Text fontSize='xs'>Manufactured</Text>
          </Center>

          <Center w='100px'>
            <Text fontSize='xs'>Status</Text>
          </Center>
          <Center w='100px'>
            <Text fontSize='xs'>Expiry</Text>
          </Center>
          <Center mr={6}></Center>
        </Flex>

        {filteredTools?.map((item, index) => (
          <Flex
            w='full'
            h='42px'
            align='center'
            justify='space-between'
            key={index}
            _hover={{
              borderLeftWidth: '1px',
              borderLeftColor: 'blue.500',
              cursor: 'pointer',
            }}
            onDoubleClick={() => alert(item._id)}
          >
            <Flex w='30px' pl={1}>
              <Text fontSize='11px'>1</Text>
            </Flex>

            <Flex w='120px'>
              <Text fontSize='11px' textAlign='left'>
                {item.description}
              </Text>
            </Flex>
            <Center w='100px'>
              <Text fontSize='11px'>{item.idNumber}</Text>
            </Center>

            <Center w='100px'>
              <Text fontSize='11px' textAlign='center'>
                {_.upperFirst(item.category)}
              </Text>
            </Center>

            <Center w='100px'>
              <Text fontSize='11px'>
                {moment(item.manufactureDate).format('DD/MM/YYYY')}
              </Text>
            </Center>

            <Center w='100px'>
              <Text fontSize='11px'>{_.upperFirst(item.status)}</Text>
            </Center>
            <Center w='100px'>
              {item.expiryDate && getDaysToExpire(item.expiryDate) === 1 && (
                <Text fontSize='11px' color='red.500'>
                  {Math.abs(getDaysToExpire(item.expiryDate))} day ago
                </Text>
              )}
              {item.expiryDate && getDaysToExpire(item.expiryDate) > 1 && (
                <Text fontSize='11px' color='red.500'>
                  {Math.abs(getDaysToExpire(item.expiryDate))} days ago
                </Text>
              )}
              {item.expiryDate && getDaysToExpire(item.expiryDate) < 0 && (
                <Text fontSize='11px' color='green.500'>
                  after {Math.abs(getDaysToExpire(item.expiryDate))} days
                </Text>
              )}

              {item.expiryDate && getDaysToExpire(item.expiryDate) === 0 && (
                <Text fontSize='11px' color='red.500'>
                  Today
                </Text>
              )}
            </Center>
            <Center>
              <Menu>
                <MenuButton
                  as={IconButton}
                  size='xs'
                  aria-label='Options'
                  variant='ghost'
                  icon={<BsThreeDotsVertical />}
                />
                <MenuList>
                  <MenuItem
                    icon={<EditIcon />}
                    // onClick={() => getReport(item._id)}
                  >
                    Edit
                  </MenuItem>

                  <MenuItem
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteItem(item._id)}
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </Center>
          </Flex>
        ))}
      </Flex>
    </>
  );
});

export default InventoryList;
