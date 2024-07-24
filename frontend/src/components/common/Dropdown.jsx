import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { fetchCategories, addCategory } from '../../services/categoryService';
import {
  setCategories,
  addCategory as addCategoryAction,
  setLoading,
  setSucceeded,
  setFailed,
} from '../../redux/categorySlice';

const Dropdown = ({ value, onChangeHandler }) => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(state => state.categories);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = async () => {
    dispatch(setLoading());
    try {
      const data = await addCategory(newCategory.trim());
      dispatch(addCategoryAction({ id: data.id, cat_name: newCategory.trim() }));
      setNewCategory('');
      onChangeHandler(data.id);
      dispatch(setSucceeded());
    } catch (error) {
      console.error('Error creating category:', error);
      dispatch(setFailed(error.message));
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      dispatch(setLoading());
      try {
        const categoryList = await fetchCategories();
        dispatch(setCategories(categoryList));
        dispatch(setSucceeded());
      } catch (error) {
        console.error('Error fetching categories:', error);
        dispatch(setFailed(error.message));
      }
    };

    loadCategories();
  }, [dispatch]);

  return (
    <Select value={value} onValueChange={onChangeHandler}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 && categories.map(category => (
          <SelectItem key={category.id} value={category.id.toString()} className="select-item p-regular-14">
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