import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SubcourseItem } from "@/components/courses/subcourse-item";

const SortableItem = ({ id, subcourse, deleteItem, isActive, onClick, onUpdate }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <SubcourseItem
        deleteItem={deleteItem}
        subcourse={subcourse}
        isActive={isActive}
        onClick={onClick}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default SortableItem;
