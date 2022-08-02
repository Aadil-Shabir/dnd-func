import { useContext, useRef, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Flex,
  Text,
  VStack,
  Stack,
  Checkbox,
  CheckboxGroup,
  Select,
} from '@chakra-ui/react';
import { ToolstringContext } from '../../context/ToolstringContext';
import { SmallAddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useForm, Controller } from 'react-hook-form';

export default function AddTool() {
  const {
    showSettings,
    setShowSettings,
    columns,
    setColumns,
    lengthUnits,
    setLengthUnits,
    diameterUnits,
    setDiameterUnits,
    weightUnits,
    setWeightUnits,
    grid,
    setGrid,
  } = useContext(ToolstringContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      columns: columns,
    },
  });

  const handleSaveSettings = (data) => {
    // setColumns({ tabs: data?.tabs });
    console.log('data', data);
  };

  return (
    <Drawer
      isOpen={showSettings}
      placement='right'
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <form onSubmit={handleSubmit(handleSaveSettings)}>
        <DrawerContent>
          <DrawerCloseButton size='sm' onClick={() => setShowSettings(false)} />
          <DrawerHeader>Settings</DrawerHeader>

          <DrawerBody>
            <VStack spacing='8px'>
              <Flex w='full'>
                <Text fontSize='md' justify='start' fontWeight='bold'>
                  Units
                </Text>
              </Flex>

              <Flex w='full' justify='space-between' align='center'>
                <Flex>
                  <Text fontSize='sm' justify='start'>
                    Length
                  </Text>
                </Flex>

                <Select
                  size='xs'
                  borderRadius='6px'
                  w='100px'
                  {...register('lengthUnits', {
                    onChange: (e) => setLengthUnits(e.target.value),
                  })}
                >
                  <option value='ft'>ft</option>
                  <option value='m'>m</option>
                </Select>
              </Flex>
              <Flex w='full' justify='space-between' align='center'>
                <Flex w='180px'>
                  <Text fontSize='sm' justify='start'>
                    Diameter
                  </Text>
                </Flex>
                <Select
                  size='xs'
                  borderRadius='6px'
                  maxW='100px'
                  {...register('diameterUnits', {
                    onChange: (e) => setDiameterUnits(e.target.value),
                  })}
                >
                  <option value='in'>in</option>
                  <option value='mm'>mm</option>
                </Select>
              </Flex>
              <Flex w='full' justify='space-between' align='center'>
                <Flex w='180px'>
                  <Text fontSize='sm' justify='start'>
                    Weight
                  </Text>
                </Flex>
                <Select
                  size='xs'
                  borderRadius='6px'
                  maxW='100px'
                  {...register('weightUnits', {
                    onChange: (e) => setWeightUnits(e.target.value),
                  })}
                >
                  <option value='lbs'>lbs</option>
                  <option value='kg'>kg</option>
                </Select>
              </Flex>
              <Flex w='full'>
                <Text fontSize='md' justify='start' fontWeight='bold'>
                  Columns
                </Text>
              </Flex>
              <Flex w='full' align='start' justify='space-between'>
                <Controller
                  name='columns'
                  control={control}
                  render={({ field: { ref: _ref, ...field } }) => (
                    <Stack w='full' spacing={0}>
                      <CheckboxGroup {...field}>
                        <Checkbox value='Image' size='sm'>
                          Image
                        </Checkbox>
                        <Checkbox value='Description' size='sm'>
                          Description
                        </Checkbox>
                        <Checkbox value='Connection' size='sm'>
                          Connection
                        </Checkbox>
                        <Checkbox value='Fishneck' size='sm'>
                          Fishneck
                        </Checkbox>
                        <Checkbox value='Weight' size='sm'>
                          Weight
                        </Checkbox>
                        <Checkbox value='Max OD' size='sm'>
                          Max OD
                        </Checkbox>
                        <Checkbox value='Length' size='sm'>
                          Length
                        </Checkbox>
                      </CheckboxGroup>
                    </Stack>
                  )}
                />
              </Flex>
              <Flex w='full' justify='space-between' align='center'>
                <Text fontSize='md' justify='start' fontWeight='bold'>
                  Grid
                </Text>
                <Select
                  size='xs'
                  borderRadius='6px'
                  maxW='100px'
                  {...register('grid', {
                    onChange: (e) => setGrid(e.target.value),
                  })}
                >
                  <option value='none'>None</option>
                  <option value='vertical'>Vertical</option>
                  {/* <option value='horizontal'>Horizontal</option> */}
                </Select>
              </Flex>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Flex w='full' justify='space-between'>
              <Button
                variant='outline'
                size='sm'
                w='70px'
                onClick={() => setShowSettings(false)}
              >
                Close
              </Button>
              <Button colorScheme='blue' size='sm' w='70px' type='submit'>
                Save
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
}
