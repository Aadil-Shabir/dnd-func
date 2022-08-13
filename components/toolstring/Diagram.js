import { useContext, forwardRef, useEffect, useState, useCallback } from "react"
import {
  Flex,
  Text,
  Center,
  Input,
  IconButton,
  Grid,
  GridItem,
  Box,
  Button,
  Image,
} from "@chakra-ui/react"
import { ToolstringContext } from "../../context/ToolstringContext"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { nanoid } from "nanoid"
import {
  SmallAddIcon,
  SmallCloseIcon,
  DeleteIcon,
  CopyIcon,
} from "@chakra-ui/icons"
import { useDrop } from "react-dnd"
import { Reorder } from "framer-motion"

const Diagram = forwardRef((props, ref) => {
  const {
    lengthUnits,
    diameterUnits,
    weightUnits,
    columns,
    setColumns,
    setShowDiagram,
    grid,
    handleSubmit,
    register,
    watch,
    getValues,
    fields,
    append,
    remove,
    swap,
    move,
    insert,
    handleSaveToolstring,
    maxOd,
    totalLength,
    totalWeight,
    setName,
  } = useContext(ToolstringContext)
  const [isBrowser, setIsBrowser] = useState(false)
  const [showIcons, setShowIcons] = useState(null)

  // Dnd
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "tool",
    drop: (item) => {
      append(item)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = isOver && canDrop

  // Dnd

  useEffect(() => {
    setIsBrowser(process.browser)
  }, [])

  const handleDragRow = ({ source, destination }) => {
    if (destination) {
      move(source.index, destination.index)
    }
  }

  useEffect(() => {
    const subscription = watch((data) => {
      console.log(`Diagram`, { data })

      // const totalLength = data.tools
      //   .map((item) => item.length)
      //   .reduce((a, b) => a + b, 0)
      //   .toFixed(2);
      // const totalWeight = data.tools
      //   .map((item) => item.weight)
      //   .reduce((a, b) => a + b, 0)
      //   .toFixed(2);

      // const idArray = data.tools.map((item) => item.maxOd);
      // const maxOd = Math.max(...idArray).toFixed(2);
      // setTotalLength(Number(totalLength));
      // setTotalWeight(Number(totalWeight));
      // setMaxOd(Number(maxOd));
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [watch])

  const [numIncr, setNumIncr] = useState(0)

  useEffect(() => {
    setNumIncr(Math.floor(Math.random() * 10))
  }, [fields])

  console.log("Fields", fields)

  return (
    <form onSubmit={handleSubmit(handleSaveToolstring)} autoComplete="off">
      <Button size="xs" type="submit">
        Save
      </Button>
      <Flex w="full" justify="space-between">
        <IconButton
          variant="outline"
          colorScheme="blue"
          size="xs"
          aria-label="Add tool"
          icon={<SmallAddIcon />}
          onClick={() =>
            append({
              _id: nanoid(),
              imageURL: "",
              description: "",
              connection: "",
              weight: "",
              fishneck: "",
              maxOd: "",
              length: "",
            })
          }
        />
        <IconButton
          variant="outline"
          size="xs"
          aria-label="Reset search"
          icon={<SmallCloseIcon />}
          onClick={() => setShowDiagram(false)}
        />
      </Flex>
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index
          const desI = param.destination.index
          swap(desI, srcI)
        }}
      >
        <Flex
          ref={drop}
          style={{
            opacity: isActive ? 0.6 : 1,
            background: canDrop ? "#ffffff33" : undefined,
          }}
          w="full"
          mt={3}
          flexDir="column"
          borderWidth="1px"
        >
          <Flex w="fill" h="32px" justify="center" borderBottomWidth="1px">
            <Input
              w="300px"
              size="sm"
              textAlign="center"
              variant="unstyled"
              placeholder="Enter name"
              {...register("name", {
                required: true,
                onChange: (e) => setName(e.target.value),
              })}
            />
          </Flex>

          <Flex w="full" h="24px" borderBottomWidth="1px">
            <Center borderRightWidth="1px" w="36px">
              <Text fontSize="xs">No.</Text>
            </Center>
            <Reorder.Group axis="x" values={columns} onReorder={setColumns}>
              <Grid
                templateColumns={`repeat(${columns?.length}, 1fr)`}
                gap={2}
                w="125%"
              >
                {columns?.map((item, index) => (
                  <GridItem
                    w="100%"
                    h="full"
                    key={index}
                    justify="center"
                    align="center"
                    borderRightWidth={
                      index === columns?.length - 1 ? null : "1px"
                    }
                  >
                    <Box mt="1px">
                      <Text fontSize="xs">
                        <Reorder.Item key={item} value={item}>
                          {item}
                        </Reorder.Item>
                      </Text>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            </Reorder.Group>
          </Flex>
          {!fields.length && (
            <div style={{ padding: "4rem" }}>
              Drag a item from the left panel or add a empty row.
            </div>
          )}
          {!!fields.length && (
            <Droppable droppableId={`droppable-${numIncr}`} type="tools">
              {(provided) => (
                <div
                  className="overflow-y-auto scrollbar-hide"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {fields.map((item, index) => (
                    <Draggable draggableId={index.toString()} index={index}>
                      {(provided) => (
                        <Flex
                          w="full"
                          h="80px"
                          key={index}
                          pos="relative"
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          onMouseEnter={() => setShowIcons(index)}
                          onMouseLeave={() => setShowIcons(null)}
                        >
                          <Center
                            w="36px"
                            borderRightWidth={
                              grid === "vertical" ? "1px" : null
                            }
                          >
                            <Text fontSize="xs">{index + 1}</Text>
                          </Center>

                          <Grid
                            templateColumns={`repeat(${columns?.length}, 1fr)`}
                            gap={0}
                            w="full"
                          >
                            <GridItem
                              w="100%"
                              h="80px"
                              justify="center"
                              align="center"
                              borderRightWidth={
                                grid === "vertical" ? "1px" : null
                              }
                            >
                              <Center w="100%" h="100%">
                                <Image
                                  boxSize="81px"
                                  src={getValues(`tools.${index}.imageURL`)}
                                  width={
                                    getValues(`tools.${index}.width`)
                                      ? getValues(`tools.${index}.width`) + "px"
                                      : "80px"
                                  }
                                />
                                {/* <Input
                      fontSize='xs'
                      p={1}
                      variant='unstyled'
                      textAlign='center'
                      placeholder='Drop here'
                      {...register(`tools[${index}].imageURL`)}
                    /> */}
                              </Center>
                            </GridItem>
                            <GridItem
                              w="100%"
                              h="80px"
                              justify="center"
                              align="center"
                              borderRightWidth={
                                grid === "vertical" ? "1px" : null
                              }
                              _hover={{
                                borderWidth: "1px",
                                borderColor: "blue.300",
                              }}
                            >
                              <Center w="100%" h="100%">
                                <Input
                                  fontSize="xs"
                                  p={1}
                                  variant="unstyled"
                                  textAlign="center"
                                  {...register(`tools[${index}].description`)}
                                />
                              </Center>
                            </GridItem>
                            <GridItem
                              w="100%"
                              h="80px"
                              justify="center"
                              align="center"
                              borderRightWidth={
                                grid === "vertical" ? "1px" : null
                              }
                              _hover={{
                                borderWidth: "1px",
                                borderColor: "blue.300",
                                // borderRadius: '6px',
                              }}
                            >
                              <Center w="100%" h="100%">
                                <Input
                                  fontSize="xs"
                                  p={1}
                                  variant="unstyled"
                                  textAlign="center"
                                  {...register(`tools[${index}].connection`)}
                                />
                              </Center>
                            </GridItem>
                            <GridItem
                              w="100%"
                              h="80px"
                              justify="center"
                              align="center"
                              borderRightWidth={
                                grid === "vertical" ? "1px" : null
                              }
                              _hover={{
                                borderWidth: "1px",
                                borderColor: "blue.300",
                                // borderRadius: '6px',
                              }}
                            >
                              <Center w="100%" h="100%">
                                <Input
                                  fontSize="xs"
                                  p={1}
                                  variant="unstyled"
                                  textAlign="center"
                                  {...register(`tools[${index}].fishneck`)}
                                />
                              </Center>
                            </GridItem>
                            <GridItem
                              w="100%"
                              h="80px"
                              justify="center"
                              align="center"
                              borderRightWidth={
                                grid === "vertical" ? "1px" : null
                              }
                              _hover={{
                                borderWidth: "1px",
                                borderColor: "blue.300",
                                // borderRadius: '6px',
                              }}
                            >
                              <Center w="100%" h="100%">
                                <Input
                                  fontSize="xs"
                                  p={1}
                                  variant="unstyled"
                                  textAlign="center"
                                  {...register(`tools[${index}].weight`, {
                                    valueAsNumber: true,
                                    required: true,
                                  })}
                                />
                              </Center>
                            </GridItem>
                            <GridItem
                              w="100%"
                              h="80px"
                              justify="center"
                              align="center"
                              borderRightWidth={
                                grid === "vertical" ? "1px" : null
                              }
                              _hover={{
                                borderWidth: "1px",
                                borderColor: "blue.300",
                                // borderRadius: '6px',
                              }}
                            >
                              <Center w="100%" h="100%">
                                <Input
                                  fontSize="xs"
                                  p={1}
                                  variant="unstyled"
                                  textAlign="center"
                                  {...register(`tools[${index}].maxOd`, {
                                    valueAsNumber: true,
                                    required: true,
                                  })}
                                />
                              </Center>
                            </GridItem>
                            <GridItem
                              w="100%"
                              h="80px"
                              justify="center"
                              align="center"
                              _hover={{
                                borderWidth: "1px",
                                borderColor: "blue.300",
                                // borderRadius: '6px',
                              }}
                            >
                              <Center w="100%" h="100%">
                                <Input
                                  fontSize="xs"
                                  p={1}
                                  variant="unstyled"
                                  textAlign="center"
                                  {...register(`tools[${index}].length`, {
                                    valueAsNumber: true,
                                    required: true,
                                  })}
                                />
                              </Center>
                            </GridItem>
                          </Grid>

                          {showIcons === index && (
                            <Flex pos="absolute" top="2px" left="4px">
                              <IconButton
                                size="xs"
                                aria-label="Duplicate item"
                                icon={<CopyIcon />}
                                onClick={() => {
                                  const myValues = getValues(`tools.${index}`)
                                  // clean
                                  // Todo: Handle NaN case.
                                  const clean = Object.keys(myValues).reduce(
                                    (acc, k) => ({
                                      ...acc,
                                      [k]: !!myValues[k]
                                        ? myValues[k]
                                        : undefined,
                                    }),
                                    {}
                                  )
                                  insert(index + 1, {
                                    ...clean,
                                    _id: nanoid(),
                                  })
                                }}
                              />
                            </Flex>
                          )}
                          {showIcons === index && (
                            <Flex pos="absolute" top="54px" left="4px">
                              <IconButton
                                size="xs"
                                aria-label="Remove item"
                                icon={<DeleteIcon />}
                                onClick={() => remove(index)}
                              />
                            </Flex>
                          )}
                        </Flex>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
          <Flex w="full" h="24px" borderTopWidth="1px" justify="space-between">
            <Center ml={2}>
              <Text fontSize="xs" mr={2}>
                Total Items:
              </Text>
              <Text fontSize="xs" mr={2}>
                {fields?.length}
              </Text>
            </Center>

            <Flex>
              <Center w="110px">
                <Text fontSize="xs">{`Weight: ${totalWeight} ${weightUnits}`}</Text>
              </Center>
              <Center w="110px">
                <Text fontSize="xs">{`Max OD: ${maxOd} ${diameterUnits}`}</Text>
              </Center>
              <Center w="110px">
                <Text fontSize="xs">{`Length: ${totalLength} ${lengthUnits}`}</Text>
              </Center>
            </Flex>
          </Flex>
        </Flex>
      </DragDropContext>
    </form>
  )
})

export default Diagram
