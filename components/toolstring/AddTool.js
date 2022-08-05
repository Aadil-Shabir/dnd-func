import { useContext, useRef, useState, useEffect, useCallback } from 'react';
import { db, storage } from '../../firebase';
import { doc, setDoc, getDoc, updateDoc, collection, query } from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
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
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Text,
  VStack,
  Select,
  SimpleGrid,
  Circle,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Box,
  Center,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  CloseButton,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Checkbox,
  Lorem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ToolstringContext } from '../../context/ToolstringContext';
import {
  SmallAddIcon,
  DeleteIcon,
  EditIcon,
  ChevronDownIcon,
  AttachmentIcon,
  SearchIcon,
  SmallCloseIcon,
} from '@chakra-ui/icons';
import { useForm, Controller } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { toolsData } from '../../data/toolsData';
import { defaultTools } from '../../data/defaultTools';
import PulseLoader from 'react-spinners/PulseLoader';
import DefaultToolsList from './DefaultToolsList';
import { AuthContext } from '../../context/AuthContext';

export default function AddTool() {
  const { currentUser } = useContext(AuthContext);

  const {
    addTool,
    setAddTool,
    showSelectImage,
    setShowSelectImage,
    searchDefaultTools,
    setSearchDefaultTools,
    filteredDefaultTools,
    defaultImage,
    setDefaultImage,
    selectedImage,
    setSelectedImage,
  } = useContext(ToolstringContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState('inside');
  const btnRef = useRef();
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const imagePicker = useRef();
  const filePicker = useRef();
  const [tag, setTag] = useState(null);
  const toast = useToast();
  const [color, setColor] = useState('#3182CE');
  const [uploading, setUploading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [editMode, setEditMode] = useState(false)

  // console.log('attachments', attachments);

  const { handleSubmit, register, reset, setValue, getValues } = useForm();

  //upload attachment funcs

  const handleSelectFile = (e) => {
    const [idNumber, description] = getValues(['idNumber', 'description'])
    if (!idNumber || !description) {
      toast({
        title: 'Please enter ID number and description',
        position: 'top-right',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    filePicker.current.click();
  };
  const handleUploadFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        position: 'top-right',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const fileName = selectedFile['name'];
    const arr = fileName.split('.');
    const extension = arr.pop();
    const uniqueFileName = `${arr}@${timestamp}.${extension}`;
    const storageRef = ref(storage, `attachments/${uniqueFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percentage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploading(true);
      },
      (error) => { },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const newAttachment = {
            fileName,
            fileURL: downloadURL,
            uploadedAt: timestamp,
            fileRef: uniqueFileName,
          };
          setUploading(false);
          setAttachments([...attachments, newAttachment]);
          toast({
            title: 'Uploaded',
            position: 'top-right',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        });
      }
    );
  };
  //upload attachment funcs

  const handleSelectImage = (e) => {
    const [idNumber, description] = getValues(['idNumber', 'description'])
    if (!idNumber || !description) {
      toast({
        title: 'Please enter ID number and description',
        position: 'top-right',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    imagePicker.current.click();
  };

  const handleUploadImage = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        position: 'top-right',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const fileName = selectedFile['name'];
    const arr = fileName.split('.');
    const extension = arr.pop();
    const uniqueFileName = `${arr}@${timestamp}.${extension}`;
    const storageRef = ref(storage, `tools-images/${uniqueFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percentage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadingImage(true);
      },
      (error) => { },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // const newAttachment = {
          //   fileName,
          //   fileURL: downloadURL,
          //   uploadedAt: timestamp,
          //   fileRef: uniqueFileName,
          // };
          setUploadingImage(false);
          setSelectedImage(downloadURL);
          toast({
            title: 'Uploaded',
            position: 'top-right',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        });
      }
    );
  };

  const timestamp = Date.now();

  const handleDeleteAttachment = (index, _id) => {
    const fileRef = ref(storage, `attachments/${_id}`);
    try {
      const files = [...attachments];
      files.splice(index, 1);
      setAttachments(files);

      deleteObject(fileRef).then(() =>
        toast({
          title: 'Deleted',
          status: 'success',
          position: 'top-right',
          duration: 2000,
          isClosable: true,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getDocId = useCallback((id) => `${id}@${currentUser?.uid}`, [currentUser?.uid])



  const handleSave = async (data) => {
    const idNumber = getValues(['idNumber'])
    const docId = getDocId(idNumber)
    console.log({ idNumber, docId })
    const docRef = doc(db, 'tools', docId);
    const docSnap = await getDoc(docRef);
    const toolData = {
      _id: docId,
      ...data,
      attachments,
      uid: currentUser?.uid,
      email: currentUser?.email,
      imageURL: selectedImage,
    };
    try {
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'tools', docId), toolData);
        toast({
          title: 'Saved',
          position: 'top-right',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      if (docSnap.exists()) {
        await updateDoc(doc(db, 'tools', docId), toolData);
        toast({
          title: 'Updated',
          position: 'top-right',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ((async () => {
      // reset the form and state.
      reset()
      setEditMode(false)
      // get the initial data and load the state.
      if (typeof addTool === 'string') {
        // we have a id and we are in edit mode.
        const docRef = doc(db, 'tools', addTool);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data()
          console.log('AddTodo: useEffect: setting initial data', { data })
          // Setting the data to the form state.
          setValue('idNumber', data.idNumber)
          setValue('description', data.description)
          setEditMode(true)
          // setAttachments(data.attachments)
          // setImage()

        } else {
          // show error and close the modal.
          alert("Invalid id given")
          setAddTool(false)
        }

      }
    })())

  }, [addTool])

  return (
    <>
      {/* select default image drawer start */}
      <Drawer
        isOpen={defaultImage}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='xs'
      >
        <DrawerOverlay />
        <DrawerContent zIndex={9999}>
          <DrawerCloseButton size='sm' onClick={() => setDefaultImage(false)} />
          <DrawerHeader>Select Image</DrawerHeader>
          <Flex w='full' p={5}>
            <InputGroup w='280px' size='sm'>
              <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='gray.300' />}
              />
              <Input
                borderRadius='6px'
                type='text'
                placeholder='Search images'
                value={searchDefaultTools}
                onChange={(e) => setSearchDefaultTools(e.target.value)}
                borderWidth='1px'
                fontSize='sm'
              />
              <InputRightElement>
                <IconButton
                  size='xs'
                  aria-label='Reset search'
                  icon={<SmallCloseIcon />}
                  variant='ghost'
                  onClick={(e) => setSearchDefaultTools('')}
                  _hover={{ bg: 'none' }}
                />
              </InputRightElement>
            </InputGroup>
          </Flex>
          <DrawerBody p={0}>
            <div className='overflow-y-auto scrollbar-hide'>
              <DefaultToolsList />
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Flex w='full' justify='space-between'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  setSelectedImage(null);
                  setDefaultImage(false);
                }}
                w='70px'
              >
                Cancel
              </Button>
              <Button
                colorScheme='blue'
                size='sm'
                w='70px'
                onClick={() => setDefaultImage(false)}
              >
                Select
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {/* select default image drawer end */}

      {/* add tool drawer start */}
      <Drawer
        isOpen={addTool}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <form onSubmit={handleSubmit(handleSave)} autoComplete='off'>
          <DrawerContent zIndex={9998}>
            <DrawerCloseButton size='sm' onClick={() => setAddTool(false)} />
            <DrawerHeader>Tool Information</DrawerHeader>

            <DrawerBody>
              <VStack spacing='6px'>
                <FormControl>
                  <FormLabel fontSize='xs' fontWeight='normal'>
                    ID Number
                  </FormLabel>
                  <Input
                    size='xs'
                    fontSize='xs'
                    disabled={editMode}
                    borderRadius='6px'
                    {...register('idNumber', {
                      required: true,
                    })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize='xs' fontWeight='normal'>
                    Description
                  </FormLabel>
                  <Textarea
                    fontSize='xs'
                    rows={2}
                    resize='none'
                    {...register('description', {
                      required: true,
                    })}
                    mb={2}
                  />
                </FormControl>

                <Flex w='full' justify='space-between' align='center' mb={3}>
                  <Flex>
                    {selectedImage ? (
                      <Image
                        src={selectedImage}
                        alt='Tool Image'
                        mr={3}
                        boxSize='80px'
                        borderWidth='1px'
                        borderRadius='1px'
                      />
                    ) : (
                      <Center
                        boxSize='80px'
                        borderWidth='1px'
                        borderRadius='1px'
                        justify='center'
                        align='center'
                        mr={3}
                      >
                        {uploadingImage ? (
                          <PulseLoader
                            color={color}
                            loading={uploadingImage}
                            size={6}
                          />
                        ) : (
                          <Text fontSize='xs'>Image</Text>
                        )}
                      </Center>
                    )}

                    <Flex flexDir='column' justify='space-between'>
                      <Flex>
                        <IconButton
                          icon={<EditIcon />}
                          size='xs'
                          onClick={handleSelectImage}
                        />
                        <input
                          ref={imagePicker}
                          className='hidden'
                          type='file'
                          onChange={handleUploadImage}
                          accept='image/.png,.jpg,.jpeg,.svg'
                        />
                      </Flex>
                      <Flex>
                        <IconButton
                          icon={<ChevronDownIcon />}
                          size='xs'
                          onClick={() => setDefaultImage(true)}
                        />
                      </Flex>
                      <Flex>
                        <IconButton
                          icon={<DeleteIcon />}
                          size='xs'
                          onClick={() => setSelectedImage(null)}
                        />
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex flexDir='column'>
                    <Select
                      size='xs'
                      borderRadius='6px'
                      maxW='100px'
                      placeholder='Select tag'
                      {...register('tag', {
                        onChange: (e) => {
                          setTag(e.target.value);
                        },
                      })}
                    >
                      <option
                        value='green'
                        style={{ backgroundColor: 'green' }}
                      >
                        Green tag
                      </option>
                      <option value='yellow'>Yellow tag</option>
                      <option value='red'>Red tag</option>
                      <option value='none'>No tag</option>
                    </Select>
                    <Flex
                      w='full'
                      align='center'
                      justify='space-between'
                      mt={3}
                    >
                      {!tag && (
                        <Center
                          w='100px'
                          h='22px'
                          borderRadius='6px'
                          borderWidth='1px'
                        >
                          <Text fontSize='xs'>No tag</Text>
                        </Center>
                      )}
                      {tag === 'green' && (
                        <Center
                          w='100px'
                          h='22px'
                          bg='green.300'
                          borderRadius='6px'
                        >
                          <Text fontSize='xs' color='black'>
                            Green tag
                          </Text>
                        </Center>
                      )}
                      {tag === 'yellow' && (
                        <Center
                          w='100px'
                          h='22px'
                          bg='yellow.300'
                          borderRadius='6px'
                        >
                          <Text fontSize='xs' color='black'>
                            Yellow tag
                          </Text>
                        </Center>
                      )}
                      {tag === 'red' && (
                        <Center
                          w='100px'
                          h='22px'
                          bg='red.500'
                          borderRadius='6px'
                        >
                          <Text fontSize='xs' color='black'>
                            Red tag
                          </Text>
                        </Center>
                      )}
                      {tag === 'none' && (
                        <Center
                          w='100px'
                          h='22px'
                          borderRadius='6px'
                          borderWidth='1px'
                        >
                          <Text fontSize='xs'>No tag</Text>
                        </Center>
                      )}
                    </Flex>
                  </Flex>
                </Flex>

                <Flex w='full' align='center' justify='space-between'>
                  <Text w='80px' fontSize='xs'>
                    Max OD:
                  </Text>
                  <Input
                    size='xs'
                    borderRadius='6px'
                    w='80px'
                    {...register('maxOd', {
                      // validate: {
                      //   positive: (v) => parseInt(v) > 0,
                      // },
                      // valueAsNumber: true,
                      // setValueAs: (v) => parseFloat(v),
                    })}
                  />
                  <Select
                    size='xs'
                    borderRadius='6px'
                    maxW='80px'
                    {...register('units.maxOd')}
                  >
                    <option value='in'>in</option>
                    <option value='mm'>mm</option>
                  </Select>
                </Flex>
                <Flex w='full' align='center' justify='space-between'>
                  <Text w='80px' fontSize='xs'>
                    Fishneck:
                  </Text>
                  <Input
                    size='xs'
                    borderRadius='6px'
                    w='80px'
                    {...register('fishneck', {
                      // validate: {
                      //   positive: (v) => parseInt(v) > 0,
                      // },
                      // valueAsNumber: true,
                    })}
                  />
                  <Select
                    size='xs'
                    borderRadius='6px'
                    maxW='80px'
                    {...register('units.fishneck')}
                  >
                    <option value='in'>in</option>
                    <option value='mm'>mm</option>
                  </Select>
                </Flex>

                <Flex w='full' align='center' justify='space-between'>
                  <Text w='80px' fontSize='xs'>
                    Length:
                  </Text>
                  <Input
                    size='xs'
                    borderRadius='6px'
                    w='80px'
                    {...register('length', {
                      // validate: {
                      //   positive: (v) => parseInt(v) > 0,
                      // },
                      // valueAsNumber: true,
                    })}
                  />
                  <Select
                    size='xs'
                    borderRadius='6px'
                    maxW='80px'
                    {...register('units.length')}
                  >
                    <option value='ft'>ft</option>
                    <option value='m'>m</option>
                  </Select>
                </Flex>

                <Flex w='full' align='center' justify='space-between'>
                  <Text w='80px' fontSize='xs'>
                    Weight:
                  </Text>
                  <Input
                    size='xs'
                    borderRadius='6px'
                    w='80px'
                    {...register('weight', {
                      // validate: {
                      //   positive: (v) => parseInt(v) > 0,
                      // },
                      // valueAsNumber: true,
                    })}
                  />
                  <Select
                    size='xs'
                    borderRadius='6px'
                    w='80px'
                    {...register('units.weight')}
                  >
                    <option value='lbs'>lbs</option>
                    <option value='kg'>kg</option>
                  </Select>
                </Flex>

                <Flex w='full' align='center' justify='space-between'>
                  <Text w='80px' fontSize='xs' mr={3}>
                    Top Connection:
                  </Text>
                  <Input
                    size='xs'
                    borderRadius='6px'
                    w='176px'
                    {...register('topConnection')}
                  />
                </Flex>
                <Flex w='full' align='center' justify='space-between'>
                  <Text w='80px' fontSize='xs' mr={3}>
                    Bottom Connection:
                  </Text>
                  <Input
                    size='xs'
                    borderRadius='6px'
                    w='176px'
                    {...register('bottomConnection')}
                  />
                </Flex>

                <Flex w='full' align='center' justify='space-between'>
                  <Text w='80px' fontSize='xs' mr={3}>
                    Set reminder:
                  </Text>
                  <Input
                    size='xs'
                    type='date'
                    borderRadius='6px'
                    w='176px'
                    {...register('reminderDate')}
                  />
                </Flex>
                <FormControl>
                  <FormLabel fontSize='xs' fontWeight='normal'>
                    Reminder note
                  </FormLabel>
                  <Textarea
                    rows={2}
                    fontSize='xs'
                    resize='none'
                    {...register('reminderNote')}
                  />
                </FormControl>
                <Flex w='full' align='center' justify='space-between'>
                  <Flex>
                    <Text fontSize='xs' mr={3}>
                      Attachments:
                    </Text>
                    <Circle w='20px' h='20px' bg='blue.500'>
                      <Text fontSize='8px' textColor='white'>
                        {attachments?.length}
                      </Text>
                    </Circle>
                  </Flex>
                  <Flex align='center'>
                    <PulseLoader color={color} loading={uploading} size={6} />

                    <IconButton
                      variant='outline'
                      colorScheme='blue'
                      size='xs'
                      aria-label='Add attachment'
                      icon={<SmallAddIcon />}
                      ml={3}
                      onClick={handleSelectFile}
                    />
                    <input
                      ref={filePicker}
                      className='hidden'
                      type='file'
                      onChange={handleUploadFile}
                    // accept='image/.png,.jpg,.jpeg,.svg'
                    />
                  </Flex>
                </Flex>
                <Flex w='full' flexDir='column'>
                  {attachments?.map((item, index) => (
                    <Flex
                      w='full'
                      align='center'
                      justify='space-between'
                      key={index}
                    >
                      <Flex w='full' align='center'>
                        <AttachmentIcon w={3} h={3} mr={2} />
                        <a href={item.fileURL} target='_blank' download>
                          <Text fontSize='xs'>{item.fileName}</Text>
                        </a>
                      </Flex>
                      <Flex>
                        <DeleteIcon
                          w={3}
                          h={3}
                          onClick={() =>
                            handleDeleteAttachment(index, item.fileRef)
                          }
                          _hover={{ cursor: 'pointer' }}
                        />
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              </VStack>
            </DrawerBody>

            <DrawerFooter>
              <Flex w='full' justify='space-between'>
                {!editMode && <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    setSelectedImage(null);
                    setTag(null);
                    reset()
                  }}
                  w='70px'
                >
                  Clear
                </Button>}
                <Button colorScheme='blue' size='sm' w='70px' type='submit'>
                  {editMode ? "Update" : "Save"}
                </Button>
              </Flex>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
      {/* add tool drawer end */}
    </>
  );
}
