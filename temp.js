<Tabs variant='unstyled' size='md'>
  <Flex w='full' justify='space-between'>
    <TabList>
      <Tab>
        <Image boxSize='32px' src='/logo.svg' />
      </Tab>

      {tabList.map((item, index) => (
        <Tab key={index} _selected={{ color: 'blue.600' }} p={3}>
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
      <Avatar size='sm' name='John Doe' ml={6} />
      <Button size='sm' variant='outline' colorScheme='blue' ml={3} mr={6}>
        Logout
      </Button>
    </Flex>
  </Flex>

  <TabPanels>
    <TabPanel p={0}></TabPanel>
    <TabPanel p={0}>
      <Flex
        w='full'
        h='48px'
        borderTopWidth='1px'
        borderBottomWidth='1px'
        align='center'
        px={3}
      ></Flex>
    </TabPanel>
    <TabPanel p={0}>
      <Flex
        w='full'
        h='48px'
        borderTopWidth='1px'
        borderBottomWidth='1px'
        align='center'
        px={3}
      >
        <IconButton
          variant='outline'
          colorScheme='blue'
          size='sm'
          icon={<AddIcon />}
        />
      </Flex>
    </TabPanel>
    <TabPanel p={0}>
      <Flex
        w='full'
        h='48px'
        borderTopWidth='1px'
        borderBottomWidth='1px'
        align='center'
        px={3}
      >
        <IconButton
          variant='outline'
          colorScheme='blue'
          size='xs'
          icon={<AddIcon />}
        />
      </Flex>
    </TabPanel>

    {/* toolstring panel start */}
    <TabPanel p={0}>
      <Flex
        w='full'
        h='42px'
        borderTopWidth='1px'
        borderBottomWidth='1px'
        align='center'
        px={3}
      >
        <IconButton
          variant='outline'
          colorScheme='blue'
          size='sm'
          icon={<AddIcon />}
        />
      </Flex>
      <Flex w='full' h='100%' justify='space-between'>
        <Flex w='220px' borderRightWidth='1px'>
          nav
        </Flex>
        <Flex>main</Flex>
        <Flex w='220px' h='100vh' borderLeftWidth='1px'>
          aside
        </Flex>
      </Flex>
    </TabPanel>
    {/* toolstring panel end */}
  </TabPanels>
</Tabs>;
