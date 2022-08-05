import { useContext } from 'react'
import { ToolstringContext } from '../../context/ToolstringContext';
import TodoListItem from './ToolsListItem'

export default function ToolsList() {
  const { filteredTools } = useContext(ToolstringContext)

  return (
    <div>
      {filteredTools?.map((item, index) => (
        <TodoListItem item={item} index={index} />
      ))}
    </div>
  );
}
