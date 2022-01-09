import {
  Col,
  DraggableItem,
  DroppableContainer,
  DroppableTitle,
  SobDragDropContext,
} from '@laazyry/sobrus-design-system';
import React, { useState, useEffect } from 'react';

import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { ArticlesCurrent } from 'Services/Options';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const DragDrop = ({ data, selected, setSelected }) => {
  const { id } = useParams();

  const [menuItems, setMenuItems] = useState(data.articleModels);
  const test = ArticlesCurrent(id);
  useEffect(() => {
    id && setSelected(test);
  }, [setSelected, test, id]);
  useEffect(() => {
    setMenuItems((prev) =>
      prev?.filter(({ id: id1 }) => !selected.some(({ id: id2 }) => id2 === id1))
    );
  }, [selected]);
  const reorder2 = (src, dest, startIndex, endIndex) => {
    const [removed] = src.splice(startIndex, 1);
    dest.splice(endIndex, 0, removed);
    return { src, dest };
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      if (destination.index === source.index) return;
      const quotes = reorder(
        source.droppableId === 'selected' ? selected : menuItems,
        source.index,
        destination.index
      );
      console.log(quotes);
      destination.droppableId === 'selected' ? setSelected(quotes) : setMenuItems(quotes);
      return;
    } else {
      console.log(result);
      const { src, dest } = reorder2(
        source.droppableId === 'selected' ? selected : menuItems,
        destination.droppableId === 'selected' ? selected : menuItems,
        source.index,
        destination.index
      );
      source.droppableId === 'selected' ? setSelected(src) : setMenuItems(src);
      destination.droppableId === 'selected' ? setSelected(dest) : setMenuItems(dest);
    }
  };

  return (
    <SobDragDropContext onDragEnd={onDragEnd}>
      <Col>
        <Droppable droppableId='selected'>
          {(provided) => (
            <DroppableContainer ref={provided.innerRef} {...provided.droppableProps}>
              <DroppableTitle>Liste des articles choisis par order</DroppableTitle>
              {selected?.map((item, index) => (
                <Draggable key={index + 1} draggableId={'list B' + (index + 1)} index={index}>
                  {(provided, snapshot) => (
                    <DraggableItem
                      ref={provided.innerRef}
                      isDragging={snapshot.isDragging}
                      draggableStyle={provided.draggableProps.style}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {index + 1} - {item?.name}
                    </DraggableItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </DroppableContainer>
          )}
        </Droppable>
      </Col>
      <Col>
        <Droppable droppableId='menuItems'>
          {(provided) => (
            <DroppableContainer ref={provided.innerRef} {...provided.droppableProps}>
              <DroppableTitle>Liste de tous les modèles d'articles</DroppableTitle>
              {menuItems?.map((item, index) => (
                <Draggable key={index + 1} draggableId={'list A ' + (index + 1)} index={index}>
                  {(provided, snapshot) => (
                    <DraggableItem
                      ref={provided.innerRef}
                      isDragging={snapshot.isDragging}
                      draggableStyle={provided.draggableProps.style}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {index + 1} - {item?.name}
                    </DraggableItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </DroppableContainer>
          )}
        </Droppable>
      </Col>
    </SobDragDropContext>
    // <div>test</div>
  );
};

export default DragDrop;
