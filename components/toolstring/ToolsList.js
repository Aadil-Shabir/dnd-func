import { useContext } from 'react'
import { ToolstringContext } from '../../context/ToolstringContext';
import TodoListItem from './ToolsListItem'

export default function ToolsList() {
  const { filteredTools, isTag, filterTagList } = useContext(ToolstringContext)

  console.log(filteredTools, "Filtered Tools")

  return (
    <div>
      {!isTag &&
        filteredTools?.map((item, index) => (
          <TodoListItem item={item} index={index} />
        ))}
      {isTag &&
        filterTagList.map((item, index) => (
          <TodoListItem item={item} index={index} />
        ))}
    </div>
  )
}
