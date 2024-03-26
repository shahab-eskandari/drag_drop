import { useState, useRef } from 'react';
import { items } from './data/items';
import { Item } from './types/item';
 
const App = () => {
  
  const draggedItemIndex = useRef<number>(0);
  const dragOverItemIndex = useRef<number>(0);
  const [list, setList] = useState<Item[]>(items);
 
  const dragStart = (index: number) => {
    draggedItemIndex.current = index;
  };
 
  const dragEnter = (index: number) => {
    dragOverItemIndex.current = index;
  };
 
  const drop = () => {
    const copyListItems = [...list];
    // Swapping dragged item with draggedOver item by using destructuring assignment
    [copyListItems[draggedItemIndex.current],copyListItems[dragOverItemIndex.current]] = [copyListItems[dragOverItemIndex.current], copyListItems[draggedItemIndex.current]];
    // resetting the indexes of dragged Item and draggedOver items
    draggedItemIndex.current = 0;
    dragOverItemIndex.current = 0;
    setList(copyListItems);
  };
 
  return (
    <>
    {
    list&&
    list.map((item, index) => (
      <div style={{backgroundColor:'lightblue', margin:'20px', textAlign:'center'}}
        onDragStart={() => dragStart(index)}
        onDragEnter={() => dragEnter(index)}
        onDragEnd={()=>drop()}
        key={item.id}
        draggable>
          <h3>{item.title}</h3>
          <p style={{fontSize:12}}>{item.description}</p>
      </div>
      ))}
    </>
  );
};
export default App;