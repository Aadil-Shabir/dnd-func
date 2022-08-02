import { useContext } from 'react';
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

export default function ToolsList() {
  const { filteredTools } = useContext(ToolstringContext);
  const toast = useToast();

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

  return (
    <>
      {filteredTools?.map((item, index) => (
        <Flex
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
            alert('open side drawer with tool data form to EDIT'),
              console.log(item);
          }}
          my={1}
        >
          <Flex>
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
                    onClick={() =>
                      alert('open side drawer with tool data form to EDIT')
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
      ))}
    </>
  );
}
