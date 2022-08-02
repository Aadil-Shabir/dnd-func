import { useContext, useState } from 'react';
import {
  Flex,
  Text,
  Radio,
  Image,
  Box,
  Checkbox,
  Center,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { ToolstringContext } from '../../context/ToolstringContext';

export default function DefaultToolsList() {
  const { filteredDefaultTools, selectedImage, setSelectedImage } =
    useContext(ToolstringContext);
  const [selected, setSelected] = useState(null);

  console.log('sel', selectedImage);
  return (
    <>
      {filteredDefaultTools.map((item, index) => (
        <Flex
          key={index}
          maxH='60px'
          w='full'
          justify='start'
          align='center'
          my={1}
          _hover={{
            cursor: 'pointer',
            borderLeftWidth: '1px',
            borderLeftColor: 'blue.500',
          }}
          p={5}
          onClick={() => {
            setSelected(item._id);
            setSelectedImage(item.imageURL);
          }}
          onDoubleClick={() => {
            setSelected(item._id);
            setSelectedImage(item.imageURL);
          }}
        >
          {item._id === selected ? (
            <Center
              boxSize='16px'
              borderWidth='1px'
              borderColor='blue.500'
              borderRadius='3px'
            >
              <CheckIcon color='blue.500' boxSize='3' />
            </Center>
          ) : (
            <Center
              boxSize='16px'
              borderWidth='1px'
              borderColor=''
              borderRadius='3px'
            ></Center>
          )}

          <Image boxSize='60px' src={item.imageURL} />
          <Text fontSize='12px'>{item.description}</Text>
        </Flex>
      ))}
    </>
  );
}
