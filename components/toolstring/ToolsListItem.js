import { useCallback, useContext } from 'react';
import { db, storage } from '../../firebase';
import { doc, collection, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { ToolstringContext } from '../../context/ToolstringContext';
import {
  Flex,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Image,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiBookmark } from 'react-icons/fi';
import { useDrag } from 'react-dnd';

export default function ToolsList({ item, index }) {
  const toast = useToast()
  // dnd
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'tool',
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const opacity = isDragging ? 0.4 : 1
  const { openToolForm } = useContext(ToolstringContext)
  const handleDeleteTool = async (_id) => {
    try {
      const collectionRef = collection(db, 'tools');
      const docRef = doc(collectionRef, _id);
      // const fileRef = ref(storage, `/tools/${_id}`);
      await deleteDoc(docRef).then(() =>
        toast({
          title: 'Deleted',
          status: 'success',
          position: 'top-right',
          duration: 2000,
          isClosable: true,
        })
      );
    } catch (error) {
      const errorMessage = error.message;
      toast({
        title: errorMessage,
        status: 'error',
        position: 'top-right',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleEditTool = useCallback((id) => {
    openToolForm(id)
  }, [])


  return (
    <Flex
      style={{ opacity }}
      w='full'
      key={index}
      h='60px'
      justify='space-between'
      align='center'
      borderWidth='1px'
      borderRadius='6px'
      _hover={{
        cursor: 'pointer',
        borderColor: 'blue.500',
      }}
      p={1}
      onDoubleClick={() => {
        handleEditTool(item._id)
      }}
      my={1}
    >
      <Flex ref={drag}>
        <Flex p={1} boxSize='60px' justify='center'>
          <Image src={item?.imageURL} />
        </Flex>

        <Flex w='96px' flexDir='column' h='full' align='start' mt={2}>
          <Text fontSize='10px' fontWeight='extrabold'>
            ID: {item.idNumber}
          </Text>
          <Text fontSize='9px'>Item: {item.description}</Text>
        </Flex>
      </Flex>

      <Flex flexDir='column' justify='space-between' h='full'>
        <Flex>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              variant='ghost'
              icon={<BsThreeDotsVertical />}
              size='xs'
            />
            <MenuList>
              <MenuItem
                icon={<EditIcon />}
                onClick={() => {
                  handleEditTool(item._id)
                }
                }
              >
                Edit
              </MenuItem>

              <MenuItem
                icon={<DeleteIcon />}
                onClick={() => handleDeleteTool(item._id)}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex>
          {item.tag === 'green' && (
            <Flex
              w='16px'
              h='8px'
              bg='green.400'
              mb={1}
              borderRadius='1px'
            />
          )}
          {item.tag === 'yellow' && (
            <Flex
              w='16px'
              h='8px'
              bg='yellow.300'
              mb={1}
              borderRadius='1px'
            />
          )}
          {item.tag === 'red' && (
            <Flex w='16px' h='8px' bg='red.500' mb={1} borderRadius='1px' />
          )}

          {!item.tag === '' && (
            <Flex w='16px' h='8px' mb={1} borderRadius='1px' />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
