import { useState } from 'react';

interface CheckListProps {
  items: string[]; // List of items to display in the checklist
  onSelect: (checkedItems: string[]) => void; // Callback for selected items
}

function CheckList({ items = [], onSelect }: CheckListProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // Handle checkbox state changes
  const handleCheckboxChange = (item: string) => {
    const isChecked = checkedItems.includes(item);

    // Update the checked items
    const updatedCheckedItems = isChecked
      ? checkedItems.filter((checkedItem) => checkedItem !== item) // Remove
      : [...checkedItems, item]; // Add

    setCheckedItems(updatedCheckedItems);

    // Notify the parent component
    onSelect(updatedCheckedItems);
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={checkedItems.includes(item)}
                onChange={() => handleCheckboxChange(item)}
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CheckList;