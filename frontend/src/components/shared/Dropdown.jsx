import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'; 
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'; 
import { Input } from '../ui/input'; 

const Dropdown = ({ value, onChangeHandler }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  // Function to create a new category
  const handleAddCategory = async () => {
    try {
      const response = await fetch('http://localhost:8001/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cat_name: newCategory.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      const data = await response.json();
      const addedCategory = { id: data.id, cat_name: newCategory.trim() };
      
      setCategories(prevState => [
        ...prevState,
        addedCategory,
      ]);
      setNewCategory('');
      
      // Set the newly added category as selected
      onChangeHandler(addedCategory.id);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8001/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoryList = await response.json();
        setCategories(categoryList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

 

  return (
    <Select value={value} onValueChange={onChangeHandler}>
      <SelectTrigger className="select-field">
      <SelectValue placeholder='Category' />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 && categories.map((category) => (
          <SelectItem key={category.id} value={category.id} className="select-item p-regular-14">
            {category.cat_name}
          </SelectItem>
        ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAddCategory}>
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;