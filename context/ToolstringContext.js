import { createContext, useState, useEffect, useMemo, useContext, useCallback } from 'react';
import { toolsData } from '../data/toolsData';
import { auth, db, storage } from '../firebase';
// import { collection } from "firebase/firestore"
import { AuthContext } from "../context/AuthContext"
import {
  collection,
  onSnapshot,
  getDocs,
  orderBy,
  where,
  query,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore"
import { defaultTools } from "../data/defaultTools"
import { useForm, useFieldArray } from "react-hook-form"
import { ExportToCsv } from "export-to-csv"

export const ToolstringContext = createContext()

const initialUnits = {
  length: "ft",
  weight: "lbs",
  diameter: "in",
  // pressure: 'psi',
  // temperature: 'c',
}

export const ToolstringProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  const [tools, setTools] = useState([])
  const [toolstrings, setToolstrings] = useState([])
  const [searchTools, setSearchTools] = useState("")
  const [searchToolstrings, setSearchToolstrings] = useState("")
  const [units, setUnits] = useState(initialUnits)
  const [showDiagram, setShowDiagram] = useState(false)
  const [addTool, setAddTool] = useState(false)
  const [defaultImage, setDefaultImage] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const [toolData, setToolData] = useState(null)
  const [showSelectImage, setShowSelectImage] = useState(false)
  const [searchDefaultTools, setSearchDefaultTools] = useState("")
  const [selectedImage, setSelectedImage] = useState(null)
  const [filterByTag, setFilterByTag] = useState(null)
  const [grid, setGrid] = useState(null)
  const [lengthUnits, setLengthUnits] = useState("ft")
  const [diameterUnits, setDiameterUnits] = useState("in")
  const [totalWeight, setTotalWeight] = useState(0)
  const [totalLength, setTotalLength] = useState(0)
  const [maxOd, setMaxOd] = useState(0)
  const [name, setName] = useState(null)
  const [weightUnits, setWeightUnits] = useState("lbs")
  const [columns, setColumns] = useState([
    "Image",
    "Description",
    "Connection",
    `Fishneck`,
    `Weight`,
    `Max OD`,
    `Length`,
  ])
  const [isTag, setIsTag] = useState(false)
  const [filterTagList, setFilterTagList] = useState([])

  const filteredToolstrings = useMemo(() => {
    if (!searchToolstrings) {
      return toolstrings.sort((a, b) => {
        if (a.isFrequent !== b.isFrequent) {
          return a.isFrequent ? -1 : 1
        } else {
          return a.lastModified > b.lastModified ? -1 : 1
        }
      })
    }

    return toolstrings.filter((item) => {
      return item.name.toLowerCase().includes(searchToolstrings.toLowerCase())
    })
  }, [searchToolstrings, toolstrings])

  const filteredDefaultTools = useMemo(() => {
    if (!searchDefaultTools) return defaultTools

    return defaultTools.filter((item) => {
      return item.description
        .toLowerCase()
        .includes(searchDefaultTools.toLowerCase())
    })
  }, [defaultTools, searchDefaultTools])

  const filteredTools = useMemo(() => {
    if (!searchTools && !filterByTag) return tools

    return tools.filter((item) => {
      return (
        item.description.toLowerCase().includes(searchTools.toLowerCase()) ||
        item.idNumber.toLowerCase().includes(searchTools.toLowerCase()) ||
        item.tag === filterByTag
      )
    })
  }, [searchTools, tools, filterByTag])

  const getToolstrings = async () => {
    if (currentUser) {
      const q = query(
        collection(db, "toolstrings"),
        where("uid", "==", currentUser?.uid)
      )
      await onSnapshot(q, (querySnapshot) => {
        const toolstrings = []
        querySnapshot.forEach((doc) => {
          toolstrings.push({ ...doc.data(), _id: doc.id })
        })
        setToolstrings(toolstrings)
      })
    }
  }

  useEffect(() => {
    getToolstrings()
  }, [currentUser])

  const getTools = async () => {
    if (currentUser) {
      const q = query(
        collection(db, "tools"),
        where("uid", "==", currentUser?.uid)
      )
      await onSnapshot(q, (querySnapshot) => {
        const tools = []
        querySnapshot.forEach((doc) => {
          tools.push({ ...doc.data(), _id: doc.id })
        })
        setTools(tools)
      })
    }
  }

  console.log("Tools", tools)

  useEffect(() => {
    getTools()
  }, [currentUser])

  const openToolForm = useCallback((id) => {
    setAddTool(id)
    console.log("TOools", tools)
  }, [])

  // Filter By Tag
  const filterByTagHandler = (tag) => {
    if (tag === "green" || tag === "red" || tag === "yellow" || !tag) {
      setIsTag(true)
    }
    // if (tag === "none" || !tag) {
    //   setIsTag(false)
    // }
    const myFilteredTools = tools.filter((tool) => tool.tag === tag)
    setFilterTagList(myFilteredTools)
  }

  // Export to CSV

  const options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: true,
    title: "My Awesome CSV",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  }

  const exportToCSV = () => {
    console.log("Export to CSV")
    const csvExporter = new ExportToCsv(options)
    csvExporter.generateCsv(isTag ? filterTagList : tools)
  }

  //Save the Diagram
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

  // react-hook-form
  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: {
      tools: [],
    },
  })

  const { fields, append, remove, swap, move, insert, update } = useFieldArray({
    control,
    name: `tools`,
  })

  return (
    <ToolstringContext.Provider
      value={{
        tools,
        setTools,
        toolstrings,
        setToolstrings,
        filteredToolstrings,
        searchToolstrings,
        setSearchToolstrings,
        units,
        setUnits,
        showDiagram,
        setShowDiagram,
        addTool,
        setAddTool,
        showSettings,
        setShowSettings,
        columns,
        setColumns,
        toolData,
        setToolData,
        showSelectImage,
        setShowSelectImage,
        searchDefaultTools,
        setSearchDefaultTools,
        filteredDefaultTools,
        searchTools,
        setSearchTools,
        filteredTools,
        defaultImage,
        setDefaultImage,
        selectedImage,
        setSelectedImage,
        filterByTag,
        setFilterByTag,
        grid,
        setGrid,
        lengthUnits,
        setLengthUnits,
        diameterUnits,
        setDiameterUnits,
        weightUnits,
        setWeightUnits,
        openToolForm,
        handleSubmit,
        register,
        control,
        watch,
        setValue,
        getValues,
        dirtyFields,
        fields,
        append,
        remove,
        swap,
        move,
        insert,
        filterByTagHandler,
        isTag,
        filterTagList,
        exportToCSV,
        handleSaveToolstring,
        totalLength,
        maxOd,
        totalWeight,
        name,
        setName,
        reset,
        update,
        watch
      }}
    >
      {children}
    </ToolstringContext.Provider>
  )
}
