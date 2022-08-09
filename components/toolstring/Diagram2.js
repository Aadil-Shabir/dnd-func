import { useContext, forwardRef, useEffect, useState, useCallback, useMemo } from 'react';
import { db, storage } from '../../firebase';
import { doc, setDoc, getDoc, updateDoc, collection } from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import {
  Flex,
  Text,
  Center,
  Input,
  IconButton,
  Grid,
  GridItem,
  Box,
  Textarea,
  Button,
  useToast,
  Image,
} from '@chakra-ui/react';
import { ToolstringContext } from '../../context/ToolstringContext';
import { AuthContext } from '../../context/AuthContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { nanoid } from 'nanoid';
import omitBy from 'lodash/omitBy'
import {
  useForm,
  useFieldArray,
  useFormContext,
  FormProvider,
} from 'react-hook-form';
import {
  SmallAddIcon,
  SmallCloseIcon,
  DeleteIcon,
  CopyIcon,
  EditIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { useDrop } from "react-dnd"
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import {
  useTable,
  useSortBy,
  useResizeColumns,
  useBlockLayout,
} from "react-table"

const Diagram = forwardRef((props, ref) => {
  const {
    lengthUnits,
    diameterUnits,
    weightUnits,
    columns: columnsData,
    setColumns,
    showDiagram,
    setShowDiagram,
    defaultImage,
    setDefaultImage,
    selectedImage,
    setSelectedImage,
    grid,
  } = useContext(ToolstringContext)
  const [isBrowser, setIsBrowser] = useState(false)
  const [showIcons, setShowIcons] = useState(null)
  const [totalWeight, setTotalWeight] = useState(0)
  const [totalLength, setTotalLength] = useState(0)
  const [maxOd, setMaxOd] = useState(0)
  const [name, setName] = useState(null)
  const { currentUser } = useContext(AuthContext)
  const toast = useToast()

  const { handleSubmit, register, control, watch, setValue, getValues } =
    useForm({
      defaultValues: {
        tools: [],
      },
    })

  const { fields, append, remove, swap, move, insert } = useFieldArray({
    control,
    name: `tools`,
  })

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

  const images = ["/tools/wireline-stem.svg"]

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
      console.log(`Diagram 2`, { data })
      const totalLength = data.tools
        .map((item) => +item.length || 0)
        .reduce((a, b) => a + b, 0)
        .toFixed(2)
      const totalWeight = data.tools
        .map((item) => +item.weight || 0)
        .reduce((a, b) => a + b, 0)
        .toFixed(2)

      const idArray = data.tools.map((item) => item.maxOd)
      const maxOd = Math.max(...idArray).toFixed(2)
      setTotalLength(Number(totalLength))
      setTotalWeight(Number(totalWeight))
      setMaxOd(Number(maxOd))
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [watch])

  const docId = `${name}@${currentUser?.uid}`
  const docRef = doc(db, "toolstrings", docId)

  const handleSaveToolstring = async (data) => {
    const docSnap = await getDoc(docRef)
    const toolstringData = {
      _id: docId,
      ...data,
      uid: currentUser?.uid,
      email: currentUser?.email,
      lastModified: Date.now(),
      totalWeight,
      maxOd,
      totalLength,
      isFrequent: false,
      grid,
      units: {
        length: lengthUnits,
        diameter: diameterUnits,
        weight: weightUnits,
      },
    }
    try {
      if (!docSnap.exists()) {
        await setDoc(doc(db, "toolstrings", docId), toolstringData)
        toast({
          title: "Saved",
          position: "top-right",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      }
      if (docSnap.exists()) {
        await updateDoc(doc(db, "toolstrings", docId), toolstringData)
        toast({
          title: "Updated",
          position: "top-right",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      }

      console.log("saved", toolstringData)
    } catch (error) {
      console.log(error)
    }
  }

  const colsCellMap = useMemo(
    () => ({
      imageURL: (p) => {
        const { value, row } = p
        const index = row.index
        return (
          <div>
            {/* <IconButton
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
                    [k]: !!myValues[k] ? myValues[k] : undefined,
                  }),
                  {}
                )
                insert(index + 1, {
                  ...clean,
                  _id: nanoid(),
                })
              }}
            /> */}
            <Image boxSize="60px" src={value} />
            {/* <IconButton
              size="xs"
              aria-label="Remove item"
              icon={<DeleteIcon />}
              onClick={() => remove(index)}
            /> */}
          </div>
        )
      },
      description: (p) => {
        const { value, row } = p
        const index = row.index

        return (
          <Input
            fontSize="xs"
            p={1}
            variant="unstyled"
            textAlign="center"
            {...register(`tools[${index}].description`)}
          />
        )
      },
      connection: (p) => {
        const { value, row } = p
        const index = row.index
        return (
          <Input
            fontSize="xs"
            p={1}
            variant="unstyled"
            textAlign="center"
            {...register(`tools[${index}].connection`)}
          />
        )
      },
      weight: (p) => {
        const { value, row } = p
        const index = row.index
        return (
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
        )
      },
      fishneck: (p) => {
        const { value, row } = p
        const index = row.index
        return (
          <Input
            fontSize="xs"
            p={1}
            variant="unstyled"
            textAlign="center"
            {...register(`tools[${index}].fishneck`, {
              valueAsNumber: true,
              required: true,
            })}
          />
        )
      },
      maxOd: (p) => {
        const { value, row } = p
        const index = row.index
        return (
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
        )
      },
      length: (p) => {
        const { value, row } = p
        const index = row.index

        return (
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
        )
      },
    }),
    []
  )

  const colsLabelMap = {
    imageURL: "Image",
    description: "Description",
    connection: "Connection",
    weight: "Weight",
    fishneck: "Fish neck",
    maxOd: "MaxOd",
    length: "Length",
  }

  const columns = useMemo(
    () =>
      Object.keys(colsLabelMap).map((k) => ({
        Header: colsLabelMap[k],
        accessor: k,
        Cell:
          colsCellMap[k] ||
          (({ value }) => {
            if (k === "imageURL") console.log({ value }, "Hello")
            return value
          }),
      })),
    []
  )

  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 92,
      maxWidth: 400,
    }),
    []
  )

  const [numIncr, setNumIncr] = useState(0)

  useEffect(() => {
    setNumIncr(Math.floor(Math.random() * 10))
  }, [fields])

  console.log(numIncr)

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data: fields, defaultColumn },
      useSortBy,
      useBlockLayout,
      useResizeColumns
    )

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
        <DragDropContext
          onDragEnd={(param) => {
            const srcI = param.source.index
            const desI = param.destination.index
            console.log(srcI, desI, rows)
            rows.splice(desI, 0, rows.splice(srcI, 1)[0])
          }}
        >
          <Table {...getTableProps()}>
            <Thead w="full" h="12px" borderBottomWidth="1px">
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <Th
                      {...column.getHeaderProps()}
                      isNumeric={column.isNumeric}
                      w="100%"
                      h="full"
                      style={{
                        padding: "0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      key={index}
                      borderRightWidth={
                        index === columns?.length - 1 ? null : "1px"
                      }
                    >
                      <Box mt="1px">
                        <Text
                          style={{ fontSize: "10px", fontWeight: "lighter" }}
                        >
                          {column.Header}

                          <div
                            {...column.getResizerProps()}
                            className={`resizer ${
                              column.isResizing ? "isResizing" : ""
                            }`}
                          />
                        </Text>
                      </Box>

                      {/* <chakra.span pl="4">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                            <TriangleUpIcon aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span> */}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            {!fields.length && (
              <div style={{ padding: "4rem" }}>
                Drag a item from the left panel or add a empty row.
              </div>
            )}
            <Droppable droppableId={`droppable-${numIncr}`} type="tools">
              {(provided) => (
                <Tbody
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  {...getTableBodyProps()}
                  className="overflow-y-auto scrollbar-hide"
                >
                  {rows.map((row, index) => {
                    prepareRow(row)
                    return (
                      <Draggable draggableId={index.toString()} index={index}>
                        {(provided) => (
                          <Tr
                            {...row.getRowProps()}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            w="full"
                            h="80px"
                            key={index}
                            pos="relative"
                            onMouseEnter={() => setShowIcons(index)}
                            onMouseLeave={() => setShowIcons(null)}
                          >
                            {row.cells.map((cell) => (
                              <Td
                                {...cell.getCellProps()}
                                isNumeric={cell.column.isNumeric}
                                w="100%"
                                h="80px"
                                justify="center"
                                align="center"
                                borderRightWidth={
                                  grid === "vertical" ? "1px" : null
                                }
                              >
                                <Center
                                  w="full"
                                  borderRightWidth={
                                    grid === "vertical" ? "1px" : null
                                  }
                                >
                                  <Text fontSize="xs">
                                    {cell.render("Cell")}
                                  </Text>
                                </Center>
                              </Td>
                            ))}
                          </Tr>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </Tbody>
              )}
            </Droppable>
          </Table>
        </DragDropContext>

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
    </form>
  )
})

export default Diagram;
